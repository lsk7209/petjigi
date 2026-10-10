/**
 * 지정 slug의 body·metaDescription·sources를 시드 값으로 갱신하는 compare-and-swap 업데이터. 기본은 dry-run.
 *   dry-run : tsx scripts/apply-content-update.ts <slug...>
 *   반영    : tsx scripts/apply-content-update.ts --apply <slug...>   (명시적 승인 후에만, 적용 전 백업 자동 저장)
 *   복구    : tsx scripts/apply-content-update.ts --restore --yes <slug...>
 * 안전 계약: 시드에 정의된 컬럼 중 현재 값과 다른 것만 바꾼다. status/publishedAt/reviewer*는 불변.
 *   UPDATE는 id·slug·status='published'와 조회 시점의 세 컬럼 값이 모두 같을 때만 적용(CAS).
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import ts from "typescript";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const RESTORE = args.includes("--restore");
const slugs = args.filter((a) => !a.startsWith("--"));
const BACKUP_DIR = process.env.BACKUP_DIR ?? ".backup-prod";
if (!slugs.length) throw new Error("slug required");
if (APPLY && RESTORE) throw new Error("--apply and --restore are exclusive");

interface Fields {
  body: string;
  metaDescription: string | null;
  sources: string | null;
}

interface SeedRecord extends Fields {
  id: string | null;
}

function lit(e: ts.Expression | undefined): string | null {
  return e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e))
    ? e.text
    : null;
}

function sourcesJson(e: ts.Expression | undefined): string | null {
  if (!e || !ts.isArrayLiteralExpression(e)) return null;
  const items = e.elements.map((x) => lit(x));
  return items.every((x): x is string => x !== null)
    ? JSON.stringify(items)
    : null;
}

function seedRecords(slug: string): SeedRecord[] {
  const dir = path.join(process.cwd(), "db", "seeds");
  const out: SeedRecord[] = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts"))) {
    const src = ts.createSourceFile(
      f,
      fs.readFileSync(path.join(dir, f), "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const visit = (n: ts.Node) => {
      if (ts.isObjectLiteralExpression(n)) {
        const m = new Map<string, ts.Expression>();
        for (const p of n.properties)
          if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name))
            m.set(p.name.text, p.initializer);
        const body = lit(m.get("body"));
        if (lit(m.get("slug")) === slug && body) {
          out.push({
            id: lit(m.get("id")),
            body,
            metaDescription: lit(m.get("metaDescription")),
            sources: sourcesJson(m.get("sources")),
          });
        }
      }
      ts.forEachChild(n, visit);
    };
    visit(src);
  }
  return out;
}

const COLUMNS = {
  body: "body",
  metaDescription: "meta_description",
  sources: "sources",
} as const;
type Key = keyof typeof COLUMNS;
const KEYS = Object.keys(COLUMNS) as Key[];

/** 시드가 값을 정의했고(null 아님) 현재와 다른 컬럼만 변경 대상. */
function changes(current: Fields, next: Fields): Key[] {
  return KEYS.filter((k) => next[k] !== null && next[k] !== current[k]);
}

const backupFile = (slug: string, id: string) =>
  path.join(BACKUP_DIR, `${slug}.${id}.content.json`);

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  const results: unknown[] = [];
  for (const slug of slugs) {
    const row = (
      await client.execute({
        sql: "SELECT id, status, body, meta_description, sources FROM contents WHERE slug = ?",
        args: [slug],
      })
    ).rows[0];
    if (!row) {
      results.push({ slug, result: "skip_no_row" });
      continue;
    }
    const id = String(row.id);
    const current: Fields = {
      body: String(row.body),
      metaDescription:
        row.meta_description === null ? null : String(row.meta_description),
      sources: row.sources === null ? null : String(row.sources),
    };
    let next: Fields;
    if (RESTORE) {
      const file = backupFile(slug, id);
      if (!fs.existsSync(file)) {
        results.push({ slug, result: "skip_no_backup" });
        continue;
      }
      next = JSON.parse(fs.readFileSync(file, "utf8")) as Fields;
    } else {
      const seeds = seedRecords(slug);
      if (seeds.length !== 1 || seeds[0].id !== id) {
        results.push({
          slug,
          result: "skip_seed_ambiguous_or_id_mismatch",
          seeds: seeds.length,
        });
        continue;
      }
      next = seeds[0];
    }
    if (String(row.status) !== "published") {
      results.push({ slug, id, result: "skip_not_published" });
      continue;
    }
    // 복구는 null(원래 없던 값)도 되돌려야 하므로 백업의 모든 컬럼을 대상으로 한다.
    const keys = RESTORE
      ? KEYS.filter((k) => next[k] !== current[k])
      : changes(current, next);
    if (!keys.length) {
      results.push({ slug, id, result: "noop_identical" });
      continue;
    }
    const summary = keys.map((k) => ({
      column: COLUMNS[k],
      fromLen: current[k]?.length ?? null,
      toLen: next[k]?.length ?? null,
    }));
    if ((!APPLY && !RESTORE) || (RESTORE && !args.includes("--yes"))) {
      results.push({
        slug,
        id,
        result: RESTORE ? "would_restore" : "would_update",
        changes: summary,
      });
      continue;
    }
    if (APPLY) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
      const file = backupFile(slug, id);
      if (!fs.existsSync(file))
        fs.writeFileSync(file, JSON.stringify(current, null, 2), "utf8");
    }
    const sets = keys.map((k) => `${COLUMNS[k]} = ?`).join(", ");
    const res = await client.execute({
      sql: `UPDATE contents SET ${sets}, updated_at = ? WHERE id = ? AND slug = ? AND status = 'published' AND body IS ? AND meta_description IS ? AND sources IS ?`,
      args: [
        ...keys.map((k) => next[k]),
        new Date().toISOString(),
        id,
        slug,
        current.body,
        current.metaDescription,
        current.sources,
      ],
    });
    results.push({
      slug,
      id,
      result: res.rowsAffected === 1 ? "updated" : "cas_failed",
      rowsAffected: res.rowsAffected,
      changes: summary,
    });
  }
  console.log(
    JSON.stringify(
      { mode: APPLY ? "apply" : RESTORE ? "restore" : "dry-run", results },
      null,
      1,
    ),
  );
}
main().catch((e) => {
  process.stderr.write(String(e?.message ?? e) + "\n");
  process.exit(1);
});
