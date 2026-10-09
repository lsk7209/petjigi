/**
 * 읽기 전용: 지정한 slug의 운영 DB 행과 시드 코드 값을 비교한다. SELECT 외 문장은 실행하지 않는다.
 * 사용: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... pnpm exec tsx scripts/compare-slugs-readonly.ts <slug> [slug...]
 * 운영 본문은 롤백용으로 BACKUP_DIR(기본 .backup-prod)에 저장한다(커밋 금지).
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import ts from "typescript";

const slugs = process.argv.slice(2);
if (slugs.length === 0) throw new Error("slug required");
const url = process.env.TURSO_DATABASE_URL ?? "";
if (!url) throw new Error("TURSO_DATABASE_URL required");
const BACKUP_DIR = process.env.BACKUP_DIR ?? ".backup-prod";
const sha = (v: string) => createHash("sha256").update(v).digest("hex").slice(0, 12);

function lit(e: ts.Expression | undefined): string | null {
  if (!e) return null;
  return ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e) ? e.text : null;
}

function seedRecord(slug: string) {
  const dir = path.join(process.cwd(), "db", "seeds");
  const found: { file: string; id: string | null; type: string | null; title: string | null; body: string | null }[] = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts"))) {
    const src = ts.createSourceFile(f, fs.readFileSync(path.join(dir, f), "utf8"), ts.ScriptTarget.Latest, true);
    const visit = (n: ts.Node) => {
      if (ts.isObjectLiteralExpression(n)) {
        const m = new Map<string, ts.Expression>();
        for (const p of n.properties) if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) m.set(p.name.text, p.initializer);
        if (lit(m.get("slug")) === slug && m.has("body")) {
          found.push({ file: f, id: lit(m.get("id")), type: lit(m.get("type")), title: lit(m.get("title")), body: lit(m.get("body")) });
        }
      }
      ts.forEachChild(n, visit);
    };
    visit(src);
  }
  return found;
}

async function main() {
  const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  for (const slug of slugs) {
    const sql = "SELECT id, type, status, category, title, body, published_at, updated_at FROM contents WHERE slug = ?";
    if (!/^SELECT\b/i.test(sql)) throw new Error("read-only guard");
    const rows = (await client.execute({ sql, args: [slug] })).rows;
    const seeds = seedRecord(slug);
    const prod = rows[0];
    const prodBody = prod ? String(prod.body) : "";
    if (prod) fs.writeFileSync(path.join(BACKUP_DIR, `${slug}.${prod.id}.body.html`), prodBody, "utf8");
    if (seeds[0]?.body) fs.writeFileSync(path.join(BACKUP_DIR, `${slug}.seed.html`), seeds[0].body, "utf8");
    console.log(JSON.stringify({
      slug,
      prod: prod ? { id: prod.id, type: prod.type, status: prod.status, category: prod.category, publishedAt: prod.published_at, updatedAt: prod.updated_at, bodyLen: prodBody.length, bodySha12: sha(prodBody), title: prod.title } : null,
      seedCandidates: seeds.map((s) => ({ file: s.file, id: s.id, type: s.type, bodyLen: s.body?.length ?? 0, bodySha12: sha(s.body ?? ""), idMatchesProd: prod ? s.id === prod.id : null, bodyEqualsProd: prod ? s.body === prodBody : null })),
    }));
  }
}
main().catch((e) => { process.stderr.write(String(e?.message ?? e) + "\n"); process.exit(1); });
