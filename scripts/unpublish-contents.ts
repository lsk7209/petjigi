/**
 * keep 목록(docs/keep-30-selection.json) 밖의 공개 guide/blog/condition을 status='draft'로 내린다. 본문·publishedAt은 불변.
 *   dry-run : tsx scripts/unpublish-contents.ts                       (기본, 쓰기 없음)
 *   반영    : tsx scripts/unpublish-contents.ts --apply               (명시적 승인 후에만, 전환 전 스냅샷 저장)
 *   복구    : tsx scripts/unpublish-contents.ts --restore --yes       (스냅샷의 행을 다시 published로)
 * 안전 계약: UPDATE는 id·status='published'가 모두 맞는 행만(CAS). keep 목록이 DB에 없거나 30건이 아니면 중단.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";

const ROOT = process.cwd();
const KEEP_PATH = path.join(ROOT, "docs", "keep-30-selection.json");
const BACKUP_DIR = process.env.BACKUP_DIR ?? ".backup-prod";
const SNAPSHOT_PATH = path.join(
  BACKUP_DIR,
  "unpublish-contents",
  "snapshot.json",
);
const PUBLIC_TYPES = ["guide", "blog", "condition"];
const EXPECTED_KEEP = 30;

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const RESTORE = args.includes("--restore");
const CONFIRMED = args.includes("--yes");

interface Row {
  id: string;
  slug: string;
  type: string;
  status: string;
  updated_at: string;
}

function loadKeepKeys(): Set<string> {
  const { keep } = JSON.parse(fs.readFileSync(KEEP_PATH, "utf8")) as {
    keep: { type: string; slug: string }[];
  };
  if (keep.length !== EXPECTED_KEEP)
    throw new Error(
      `keep 목록이 ${EXPECTED_KEEP}건이 아닙니다: ${keep.length}`,
    );
  return new Set(keep.map((k) => `${k.type}/${k.slug}`));
}

async function publishedRows(client: Client): Promise<Row[]> {
  const placeholders = PUBLIC_TYPES.map(() => "?").join(",");
  const res = await client.execute({
    sql: `SELECT id, slug, type, status, updated_at FROM contents WHERE status = 'published' AND type IN (${placeholders})`,
    args: PUBLIC_TYPES,
  });
  return res.rows.map((r) => ({
    id: String(r.id),
    slug: String(r.slug),
    type: String(r.type),
    status: String(r.status),
    updated_at: String(r.updated_at),
  }));
}

function countByType(rows: Row[]): Record<string, number> {
  return rows.reduce<Record<string, number>>(
    (acc, r) => ({ ...acc, [r.type]: (acc[r.type] ?? 0) + 1 }),
    {},
  );
}

async function unpublish(client: Client) {
  const keep = loadKeepKeys();
  const rows = await publishedRows(client);
  const present = new Set(rows.map((r) => `${r.type}/${r.slug}`));
  const missing = [...keep].filter((k) => !present.has(k));
  if (missing.length)
    throw new Error(
      `keep 중 운영에 공개 상태가 아닌 항목: ${missing.join(", ")}`,
    );
  const targets = rows.filter((r) => !keep.has(`${r.type}/${r.slug}`));
  const summary = {
    published: rows.length,
    keep: keep.size,
    toDraft: targets.length,
    byType: countByType(targets),
  };
  if (!APPLY) {
    console.log(JSON.stringify({ mode: "dry-run", ...summary }, null, 1));
    return;
  }
  fs.mkdirSync(path.dirname(SNAPSHOT_PATH), { recursive: true });
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(targets, null, 2), {
    encoding: "utf8",
    flag: "wx",
  });
  const results = await client.batch(
    targets.map((r) => ({
      sql: "UPDATE contents SET status = 'draft' WHERE id = ? AND slug = ? AND status = 'published'",
      args: [r.id, r.slug],
    })),
    "write",
  );
  const updated = results.reduce((n, r) => n + r.rowsAffected, 0);
  console.log(
    JSON.stringify(
      { mode: "apply", ...summary, updated, snapshot: SNAPSHOT_PATH },
      null,
      1,
    ),
  );
}

async function restore(client: Client) {
  const rows = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8")) as Row[];
  if (!CONFIRMED) {
    console.log(
      JSON.stringify(
        { mode: "would_restore", rows: rows.length, byType: countByType(rows) },
        null,
        1,
      ),
    );
    return;
  }
  const results = await client.batch(
    rows.map((r) => ({
      sql: "UPDATE contents SET status = 'published' WHERE id = ? AND slug = ? AND status = 'draft'",
      args: [r.id, r.slug],
    })),
    "write",
  );
  const restored = results.reduce((n, r) => n + r.rowsAffected, 0);
  fs.renameSync(SNAPSHOT_PATH, SNAPSHOT_PATH.replace(/\.json$/, `.restored-${Date.now()}.json`)); // 재적용 시 wx 충돌 방지
  console.log(
    JSON.stringify({ mode: "restore", rows: rows.length, restored }, null, 1),
  );
}

async function main() {
  if (APPLY && RESTORE) throw new Error("--apply and --restore are exclusive");
  if (!process.env.TURSO_DATABASE_URL)
    throw new Error("TURSO_DATABASE_URL 필요");
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  try {
    await (RESTORE ? restore(client) : unpublish(client));
  } finally {
    client.close();
  }
}

if (process.argv[1]?.endsWith("unpublish-contents.ts")) {
  main().catch((e) => {
    process.stderr.write(`${e?.message ?? e}\n`);
    process.exit(1);
  });
}
