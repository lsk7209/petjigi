import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { sourceValues } from "../lib/content-seed-parser";
import { evaluateChangedHighRiskContent } from "../lib/content-risk-gate";
import { isRedirectedContent } from "../lib/content-redirects";

const targets = [
  ["dog-adoption-checklist", "seed-guide-dog-adoption-checklist", "guide", "2026-05-05T00:00:00.000Z"],
  ["dog-food-label-guide", "seed-guide-dog-food-label-guide", "guide", "2026-05-15T00:00:00.000Z"],
  ["animal-hospital-guide", "seed-guide-animal-hospital-guide", "guide", "2026-05-22T00:00:00.000Z"],
  ["pet-insurance-comparison-method", "blog-210", "blog", "2026-06-28T08:00:00.000Z"],
  ["indoor-cat-enrichment-guide", "seed-guide-indoor-cat-enrichment", "guide", "2026-05-19T00:00:00.000Z"],
  ["memorial-ceremony", "seed-guide-memorial-ceremony", "guide", "2026-05-22T00:00:00.000Z"],
];
const records = new Map<string, Map<string, ts.Expression>>();
for (const filename of fs.readdirSync("db/seeds").filter(name => name.endsWith(".ts"))) {
  const file = path.join("db/seeds", filename);
  const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const visit = (node: ts.Node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(source), p.initializer]));
      const slug = props.get("slug"), type = props.get("type");
      if (slug && type && ts.isStringLiteral(slug) && ts.isStringLiteral(type)) {
        const key = `/${type.text}/${slug.text}`;
        if (targets.some(([target, , targetType]) => target === slug.text && targetType === type.text)) assert.equal(records.has(key), false, `ambiguous target ${key}`);
        records.set(key, props);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}
function literal(props: Map<string, ts.Expression>, key: string): string | null {
  const expression = props.get(key);
  return expression && (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) ? expression.text : null;
}

test("six representatives preserve identity/publication and do not fabricate review metadata", () => {
  for (const [slug, id, type, published] of targets) {
    const record = records.get(`/${type}/${slug}`)!;
    assert.equal(literal(record, "id"), id);
    assert.equal(literal(record, "status"), "published");
    assert.equal(literal(record, "publishedAt"), published);
    assert.equal(literal(record, "updatedAt"), "2026-10-11T12:00:00.000Z");
    assert.equal(record.has("reviewerName"), false);
    assert.equal(record.has("reviewedAt"), false);
    assert.equal(isRedirectedContent(type, slug), false);
  }
  const draft = records.get("/guide/pet-insurance-before-joining")!;
  assert.equal(literal(draft, "status"), "review_queue");
  assert.equal(draft.get("publishedAt")?.kind, ts.SyntaxKind.NullKeyword);
});

test("representative sources and linked return paths are concrete and published", () => {
  for (const [slug, , type] of targets) {
    const record = records.get(`/${type}/${slug}`)!;
    const body = literal(record, "body")!;
    const sources = sourceValues(record.get("sources"));
    assert.ok(sources.length >= 2, slug);
    for (const url of sources) {
      assert.equal(new URL(url).protocol, "https:", slug);
      assert.ok(body.includes(`href="${url}"`), `unlinked source ${slug}: ${url}`);
    }
    const related = [...body.matchAll(/href="(\/(?:guide|blog)\/[^"#]+)"/g)].map(m => m[1]);
    assert.ok(new Set(related).size >= 3, slug);
    for (const url of related) {
      const destination = records.get(url);
      assert.ok(destination, `missing ${url}`);
      assert.equal(literal(destination, "status"), "published", url);
      const [, targetType, targetSlug] = url.split("/");
      assert.equal(isRedirectedContent(targetType, targetSlug), false, url);
      assert.ok(literal(destination, "body")?.includes(`href="/${type}/${slug}"`), `missing return ${url} -> ${slug}`);
    }
    assert.deepEqual(evaluateChangedHighRiskContent({slug, category: Number(record.get("category")?.getText()), ymyl: null, status: "published", sourceCount: sources.length, disclaimer: literal(record, "disclaimer"), metaTitle: literal(record, "metaTitle"), metaDescription: literal(record, "metaDescription"), body}), [], slug);
  }
});

test("unsupported legacy prescriptions and numeric generalizations stay out of revised content", () => {
  const body = (slug: string, type = "guide") => literal(records.get(`/${type}/${slug}`)!, "body")!;
  assert.doesNotMatch(body("dog-adoption-checklist"), /하루 최소 2시간|1~2만 원|최대 60만 원|2주 이상 식욕부진/);
  assert.doesNotMatch(body("dog-food-label-guide"), /나트륨은 0\.3%|25%\+ 권장|기초 영양은 보장|발암 가능성/);
  assert.match(body("dog-food-label-guide"), /8 ÷ \(100 − 75\) × 100 = 32%/);
  assert.match(body("dog-food-label-guide"), /미국 표시 제도의 설명/);
  assert.doesNotMatch(body("indoor-cat-enrichment-guide"), /은행나무|캐모마일|50~70%|최소 150cm/);
  assert.doesNotMatch(body("memorial-ceremony"), /자택 매장.*가능|일반 쓰레기봉투 폐기는 불법|24~48시간|4℃/);
  assert.match(body("memorial-ceremony"), /허가 대상/);
  assert.doesNotMatch(body("pet-insurance-comparison-method", "blog"), /30종 이상|1년 단위로 계약|가입 후 15일 이내/);
  assert.match(body("pet-insurance-comparison-method", "blog"), /가상 교육용 예시/);
});
