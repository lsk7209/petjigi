/**
 * 지정 slug의 본문(body)만 시드 값으로 갱신하는 compare-and-swap 업데이터. 기본은 dry-run.
 *   dry-run : tsx scripts/apply-body-update.ts <slug...>
 *   반영    : tsx scripts/apply-body-update.ts --apply <slug...>   (명시적 승인 후에만)
 *   복구    : tsx scripts/apply-body-update.ts --restore <slug...> (.backup-prod의 원본 본문으로 되돌림)
 * 안전 계약: body와 updated_at 외 컬럼은 건드리지 않는다(publishedAt/reviewedAt/reviewerName/status 불변).
 *   UPDATE는 WHERE id=? AND slug=? AND status='published' AND body=<조회 시점 본문> 일 때만 적용(CAS).
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

function lit(e: ts.Expression | undefined): string | null {
  return e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) ? e.text : null;
}

function seedBodies(slug: string): { id: string | null; body: string }[] {
  const dir = path.join(process.cwd(), "db", "seeds");
  const out: { id: string | null; body: string }[] = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts"))) {
    const src = ts.createSourceFile(f, fs.readFileSync(path.join(dir, f), "utf8"), ts.ScriptTarget.Latest, true);
    const visit = (n: ts.Node) => {
      if (ts.isObjectLiteralExpression(n)) {
        const m = new Map<string, ts.Expression>();
        for (const p of n.properties) if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) m.set(p.name.text, p.initializer);
        const body = lit(m.get("body"));
        if (lit(m.get("slug")) === slug && body) out.push({ id: lit(m.get("id")), body });
      }
      ts.forEachChild(n, visit);
    };
    visit(src);
  }
  return out;
}

async function main() {
  const client = createClient({ url: process.env.TURSO_DATABASE_URL ?? "", authToken: process.env.TURSO_AUTH_TOKEN });
  const results: unknown[] = [];
  for (const slug of slugs) {
    const row = (await client.execute({ sql: "SELECT id, status, body FROM contents WHERE slug = ?", args: [slug] })).rows[0];
    if (!row) { results.push({ slug, result: "skip_no_row" }); continue; }
    const id = String(row.id);
    const current = String(row.body);
    let next: string;
    if (RESTORE) {
      const file = path.join(BACKUP_DIR, `${slug}.${id}.body.html`);
      if (!fs.existsSync(file)) { results.push({ slug, result: "skip_no_backup" }); continue; }
      next = fs.readFileSync(file, "utf8");
    } else {
      const seeds = seedBodies(slug);
      if (seeds.length !== 1 || seeds[0].id !== id) { results.push({ slug, result: "skip_seed_ambiguous_or_id_mismatch", seeds: seeds.length }); continue; }
      next = seeds[0].body;
    }
    if (String(row.status) !== "published") { results.push({ slug, id, result: "skip_not_published" }); continue; }
    if (next === current) { results.push({ slug, id, result: "noop_identical" }); continue; }
    if (!APPLY && !RESTORE) { results.push({ slug, id, result: "would_update", fromLen: current.length, toLen: next.length }); continue; }
    if (RESTORE && !args.includes("--yes")) { results.push({ slug, id, result: "would_restore", toLen: next.length }); continue; }
    const res = await client.execute({
      sql: "UPDATE contents SET body = ?, updated_at = ? WHERE id = ? AND slug = ? AND status = 'published' AND body = ?",
      args: [next, new Date().toISOString(), id, slug, current],
    });
    results.push({ slug, id, result: res.rowsAffected === 1 ? "updated" : "cas_failed", rowsAffected: res.rowsAffected });
  }
  console.log(JSON.stringify({ mode: APPLY ? "apply" : RESTORE ? "restore" : "dry-run", results }, null, 1));
}
main().catch((e) => { process.stderr.write(String(e?.message ?? e) + "\n"); process.exit(1); });
