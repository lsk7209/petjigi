// 읽기 전용: db/seeds를 실행하지 않고 AST로만 읽어 지정 slug의 레코드(id/type/status/본문 해시)를 출력한다.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const dir = path.join(process.argv[2] ?? process.cwd(), "db", "seeds");
const q = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const HEADER = "file,id,type,status,slug,category,publishedAt,body_len,body_sha256_12,title";
const records: { slug: string; line: string }[] = [];

function str(e: ts.Expression | undefined): string {
  if (!e) return "";
  if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return e.text;
  if (ts.isNumericLiteral(e)) return e.text;
  return `<expr:${e.getText().slice(0, 30)}>`;
}

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".ts"))) {
  const src = ts.createSourceFile(f, fs.readFileSync(path.join(dir, f), "utf8"), ts.ScriptTarget.Latest, true);
  const visit = (n: ts.Node) => {
    if (ts.isObjectLiteralExpression(n)) {
      const m = new Map<string, ts.Expression>();
      for (const p of n.properties) {
        if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) m.set(p.name.text, p.initializer);
      }
      if (m.has("slug") && m.has("id") && m.has("body")) {
        const body = str(m.get("body"));
        const h = createHash("sha256").update(body).digest("hex").slice(0, 12);
        records.push({ slug: str(m.get("slug")), line: [f, str(m.get("id")), str(m.get("type")), str(m.get("status")), str(m.get("slug")),
          str(m.get("category")), str(m.get("publishedAt")), body.length, h, q(str(m.get("title")))].join(",") });
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(src);
}
const counts = new Map<string, number>();
for (const r of records) counts.set(r.slug, (counts.get(r.slug) ?? 0) + 1);
// slug는 contents 테이블에서 전역 UNIQUE이므로 type이 달라도 같은 slug는 충돌한다.
const dup = records.filter((r) => (counts.get(r.slug) ?? 0) > 1).sort((a, b) => a.slug.localeCompare(b.slug));
console.log([HEADER, ...dup.map((r) => r.line)].join(String.fromCharCode(10)));
