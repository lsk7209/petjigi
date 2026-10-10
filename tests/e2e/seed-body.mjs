// 시드 파일에서 slug의 body 문자열을 DB·네트워크 없이 추출한다 (fixture·단위 테스트 공용).
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const seedsDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../db/seeds');
const text = (e) => (e && (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) ? e.text : null);

export function seedBody(slug) {
  let found = null;
  for (const f of readdirSync(seedsDir).filter((n) => n.endsWith('.ts'))) {
    const src = ts.createSourceFile(f, readFileSync(resolve(seedsDir, f), 'utf8'), ts.ScriptTarget.Latest, true);
    const visit = (n) => {
      if (ts.isObjectLiteralExpression(n)) {
        const m = new Map();
        for (const p of n.properties) if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) m.set(p.name.text, p.initializer);
        if (text(m.get('slug')) === slug && text(m.get('body'))) found = text(m.get('body'));
      }
      ts.forEachChild(n, visit);
    };
    visit(src);
  }
  if (!found) throw new Error(`seed body not found: ${slug}`);
  return found;
}
