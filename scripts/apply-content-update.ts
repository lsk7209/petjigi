/**
 * 지정 slug의 title·metaTitle·subtitle·body·metaDescription·sources·disclaimer·updatedAt을 시드 값으로 갱신하는 compare-and-swap 업데이터. 기본은 dry-run.
 *   dry-run : tsx scripts/apply-content-update.ts <slug...>
 *   반영    : tsx scripts/apply-content-update.ts --apply <slug...>   (명시적 승인 후에만, 적용 전 백업 자동 저장)
 *   복구    : tsx scripts/apply-content-update.ts --restore --yes <slug...>
 *   검증    : 각 모드에 --expected-snapshot <SELECT * JSON 배열 파일> 및 --manifest <changedFields JSON 파일> 추가 가능
 * 안전 계약: 시드에 정의된 컬럼 중 현재 값과 다른 것만 바꾼다. status/publishedAt/reviewer*는 불변.
 *   UPDATE는 id·slug·status='published'와 조회 시점의 기본 컬럼, 정의된 추가 컬럼 값이 같을 때만 적용(CAS).
 */
import fs from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { createClient } from "@libsql/client";
import ts from "typescript";

interface Fields {
  title: string;
  metaTitle: string | null;
  subtitle: string | null;
  body: string;
  metaDescription: string | null;
  sources: string | null;
  disclaimer: string | null;
  updatedAt: string;
}

interface SeedRecord extends Partial<Fields> {
  id: string | null;
  body: string;
}

function lit(e: ts.Expression | undefined): string | null {
  return e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e))
    ? e.text
    : null;
}

function sourcesJson(e: ts.Expression | undefined): string | undefined {
  if (!e || !ts.isArrayLiteralExpression(e)) return undefined;
  const items = e.elements.map((x) => lit(x));
  return items.every((x): x is string => x !== null)
    ? JSON.stringify(items)
    : undefined;
}

export function seedRecords(slug: string, dir = path.join(process.cwd(), "db", "seeds")): SeedRecord[] {
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
            title: lit(m.get("title")) ?? undefined,
            metaTitle: m.get("metaTitle")?.kind === ts.SyntaxKind.NullKeyword
              ? null : lit(m.get("metaTitle")) ?? undefined,
            subtitle: m.get("subtitle")?.kind === ts.SyntaxKind.NullKeyword
              ? null : lit(m.get("subtitle")) ?? undefined,
            body,
            metaDescription: m.has("metaDescription") ? lit(m.get("metaDescription")) : undefined,
            sources: sourcesJson(m.get("sources")),
            disclaimer: m.has("disclaimer")
              ? m.get("disclaimer")?.kind === ts.SyntaxKind.NullKeyword ? null : lit(m.get("disclaimer")) ?? undefined
              : undefined,
            updatedAt: lit(m.get("updatedAt")) ?? undefined,
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
  disclaimer: "disclaimer",
  updatedAt: "updated_at",
  title: "title",
  metaTitle: "meta_title",
  subtitle: "subtitle",
} as const;
type Key = keyof typeof COLUMNS;
const KEYS = Object.keys(COLUMNS) as Key[];

/** 기존 meta/sources null 생략 정책은 유지하고, 명시적 disclaimer null은 반영한다. */
export function changes(current: Fields, next: Partial<Fields>): Key[] {
  return KEYS.filter((k) => next[k] !== undefined &&
    (k === "disclaimer" || k === "updatedAt" || k === "metaTitle" || k === "subtitle" || next[k] !== null) && next[k] !== current[k]);
}

export function restoreChanges(current: Fields, backup: Partial<Fields>): Key[] {
  return KEYS.filter((k) => backup[k] !== undefined && (k !== "title" || backup.title !== null) && backup[k] !== current[k]);
}

export function buildUpdate(keys: Key[], current: Fields, next: Partial<Fields>, id: string, slug: string, touchUpdatedAt = true, expectedSnapshot?: Fields) {
  const sets = keys.map((k) => `${COLUMNS[k]} = ?`);
  const values = keys.map((k) => next[k] as string | null);
  if (touchUpdatedAt && !keys.includes("updatedAt")) {
    sets.push("updated_at = ?");
    values.push(new Date().toISOString());
  }
  const guardKeys = expectedSnapshot
    ? KEYS
    : KEYS.filter((key) => key === "body" || key === "metaDescription" || key === "sources" || next[key] !== undefined);
  const guards = guardKeys.map((key) => `${COLUMNS[key]} IS ?`);
  const snapshots = guardKeys.map((key) => (expectedSnapshot ?? current)[key]);
  return {
    sql: `UPDATE contents SET ${sets.join(", ")} WHERE id = ? AND slug = ? AND status = 'published' AND ${guards.join(" AND ")}`,
    args: [...values, id, slug, ...snapshots],
  };
}

/** 변경 전후 값 검증용 짧은 SHA-256. null은 null 그대로 둔다. */
export const shortHash = (value: string | null | undefined) =>
  value == null ? null : createHash("sha256").update(value).digest("hex").slice(0, 12);

const backupFile = (dir: string, slug: string, id: string) =>
  path.join(dir, `${slug}.${id}.content.json`);

function backupMatches(file: string, current: Fields): boolean {
  try {
    const saved = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
    return saved !== null && typeof saved === "object" &&
      KEYS.every((key) => Object.hasOwn(saved, key) && saved[key] === current[key]);
  } catch {
    return false;
  }
}

const SNAPSHOT_COLUMNS = ["id", "slug", "status", ...Object.values(COLUMNS)] as const;
function matchingSnapshot(rows: unknown[], row: Record<string, unknown>) {
  const matches = rows.filter((candidate): candidate is Record<string, unknown> =>
    candidate !== null && typeof candidate === "object" && !Array.isArray(candidate) &&
    (candidate as Record<string, unknown>).id === row.id && (candidate as Record<string, unknown>).slug === row.slug);
  if (matches.length !== 1 || !SNAPSHOT_COLUMNS.every((column) =>
    Object.hasOwn(matches[0], column) && matches[0][column] === row[column])) return null;
  return matches[0];
}

function snapshotFields(row: Record<string, unknown>): Fields {
  return {
    title: String(row.title),
    metaTitle: row.meta_title === null ? null : String(row.meta_title),
    subtitle: row.subtitle === null ? null : String(row.subtitle),
    body: String(row.body),
    metaDescription: row.meta_description === null ? null : String(row.meta_description),
    sources: row.sources === null ? null : String(row.sources),
    disclaimer: row.disclaimer === null ? null : String(row.disclaimer),
    updatedAt: String(row.updated_at),
  };
}

function manifestFields(entries: unknown[], id: string, slug: string): Key[] | null {
  const matches = entries.filter((entry): entry is Record<string, unknown> =>
    entry !== null && typeof entry === "object" && !Array.isArray(entry) &&
    (entry as Record<string, unknown>).id === id && (entry as Record<string, unknown>).slug === slug);
  if (matches.length !== 1 || !Array.isArray(matches[0].changedFields)) return null;
  return matches[0].changedFields.filter((field): field is Key => KEYS.includes(field as Key));
}

async function main() {
  const args = process.argv.slice(2);
  const APPLY = args.includes("--apply");
  const RESTORE = args.includes("--restore");
  const optionPaths = new Map<string, string>();
  const optionValueIndexes = new Set<number>();
  for (const flag of ["--expected-snapshot", "--manifest"]) {
    const indices = args.flatMap((arg, index) => arg === flag ? [index] : []);
    if (indices.length > 1) throw new Error(`${flag} may appear only once`);
    if (indices.length === 0) continue;
    const value = args[indices[0] + 1];
    if (!value || value.startsWith("--")) throw new Error(`${flag} requires a file`);
    optionPaths.set(flag, value);
    optionValueIndexes.add(indices[0] + 1);
  }
  const slugs = args.filter((arg, index) => !optionValueIndexes.has(index) && !arg.startsWith("--"));
  const BACKUP_DIR = process.env.BACKUP_DIR ?? ".backup-prod";
  if (!slugs.length) throw new Error("slug required");
  if (APPLY && RESTORE) throw new Error("--apply and --restore are exclusive");
  const snapshotPath = optionPaths.get("--expected-snapshot");
  const manifestPath = optionPaths.get("--manifest");
  const expectedRows: unknown[] | undefined = snapshotPath === undefined
    ? undefined : JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  if (snapshotPath !== undefined && !Array.isArray(expectedRows)) throw new Error("--expected-snapshot must contain a JSON array");
  const manifest = manifestPath === undefined ? undefined : JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const manifestEntries: unknown[] | undefined = manifest === undefined ? undefined : manifest.entries;
  if (manifestEntries && !Array.isArray(manifestEntries)) throw new Error("--manifest must contain an entries array");
  if (manifestPath && !manifestEntries) throw new Error("--manifest must contain an entries array");
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL ?? "",
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  try {
  const results: unknown[] = [];
  for (const slug of slugs) {
    const row = (
      await client.execute({
        sql: "SELECT id, slug, status, title, meta_title, subtitle, body, meta_description, sources, disclaimer, updated_at FROM contents WHERE slug = ?",
        args: [slug],
      })
    ).rows[0];
    if (!row) {
      results.push({ slug, result: expectedRows ? "skip_snapshot_conflict" : "skip_no_row" });
      continue;
    }
    const id = String(row.id);
    const expectedRow = expectedRows ? matchingSnapshot(expectedRows, row) : null;
    if (expectedRows && !expectedRow) {
      results.push({ slug, id, result: "skip_snapshot_conflict" });
      continue;
    }
    const current = snapshotFields(row);
    const expected = expectedRow ? snapshotFields(expectedRow) : undefined;
    const allowedFields = manifestEntries ? manifestFields(manifestEntries, id, slug) : undefined;
    if (manifestEntries && !allowedFields) {
      results.push({ slug, id, result: "skip_manifest_conflict" });
      continue;
    }
    let next: Partial<Fields>;
    if (RESTORE) {
      const file = backupFile(BACKUP_DIR, slug, id);
      if (!fs.existsSync(file)) {
        results.push({ slug, result: "skip_no_backup" });
        continue;
      }
      next = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<Fields>;
    } else {
      const seeds = seedRecords(slug);
      // 같은 slug의 중복 시드가 있어도 운영 id와 일치하는 시드가 정확히 1개면 그것만 쓴다.
      const matched = seeds.filter((x) => x.id === id);
      if (matched.length !== 1) {
        results.push({
          slug,
          result: "skip_seed_ambiguous_or_id_mismatch",
          seeds: seeds.length,
        });
        continue;
      }
      next = matched[0];
    }
    if (allowedFields) next = Object.fromEntries(allowedFields.map((key) => [key, next[key]]));
    if (String(row.status) !== "published") {
      results.push({ slug, id, result: "skip_not_published" });
      continue;
    }
    // 복구는 null(원래 없던 값)도 되돌려야 하므로 백업의 모든 컬럼을 대상으로 한다.
    const keys = RESTORE ? restoreChanges(current, next) : changes(current, next);
    if (!keys.length) {
      results.push({ slug, id, result: "noop_identical" });
      continue;
    }
    const summary = keys.map((k) => ({
      column: COLUMNS[k],
      fromLen: current[k]?.length ?? null,
      toLen: next[k]?.length ?? null,
      fromHash: shortHash(current[k]),
      toHash: shortHash(next[k]),
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
      const file = backupFile(BACKUP_DIR, slug, id);
      let conflict = fs.existsSync(file) && !backupMatches(file, current);
      if (!fs.existsSync(file)) {
        try {
          fs.writeFileSync(file, JSON.stringify(current, null, 2), { encoding: "utf8", flag: "wx" });
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
          conflict = !backupMatches(file, current);
        }
      }
      if (conflict) {
        results.push({ slug, id, result: "skip_backup_conflict", backup: file });
        continue;
      }
    }
    const res = await client.execute({
      ...buildUpdate(keys, current, next, id, slug, !RESTORE && (!allowedFields || allowedFields.includes("updatedAt")), expected),
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
  } finally {
    await client.close();
  }
}
if (process.argv[1]?.endsWith("apply-content-update.ts")) {
  main().catch((e) => {
    process.stderr.write(String(e?.message ?? e) + "\n");
    process.exit(1);
  });
}
