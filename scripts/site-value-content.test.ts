import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";
import { sourceValues } from "../lib/content-seed-parser";
import { isRedirectedContent } from "../lib/content-redirects";
import { evaluateChangedHighRiskContent } from "../lib/content-risk-gate";
import { OWNER_JOURNEYS } from "../lib/owner-journeys";

function stringValue(expression: ts.Expression | undefined): string | null {
  return expression && (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) ? expression.text : null;
}
const articles = new Map<string, Map<string, ts.Expression>>();
for (const file of fs.readdirSync("db/seeds").filter(file => file.endsWith(".ts"))) {
  const source = ts.createSourceFile(file, fs.readFileSync(path.join("db/seeds", file), "utf8"), ts.ScriptTarget.Latest, true);
  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(prop => [prop.name.getText(source), prop.initializer]));
      const slug = stringValue(props.get("slug")), type = stringValue(props.get("type"));
      if (slug && type) articles.set(`/${type}/${slug}`, props);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
const targets = ["/guide/pet-first-aid-guide", "/guide/pet-health-checkup-guide", "/blog/pet-insurance-claim-guide", "/blog/pet-insurance-exclusions-guide"];
const text = (route: string, key = "body") => stringValue(articles.get(route)?.get(key)) ?? "";

test("six reader journeys use published, non-retired article destinations", () => {
  assert.deepEqual(OWNER_JOURNEYS.map(item => item.category).sort(), ["adoption", "care", "health", "insurance", "memorial", "nutrition"]);
  for (const journey of OWNER_JOURNEYS) {
    assert.ok(journey.steps.length >= 2 && journey.steps.length <= 3, journey.category);
    for (const step of journey.steps) {
      const record = articles.get(step.href);
      assert.ok(record, step.href);
      assert.equal(stringValue(record.get("status")), "published");
      const [, type, slug] = step.href.split("/");
      assert.equal(isRedirectedContent(type, slug), false, step.href);
    }
  }
  const claims = OWNER_JOURNEYS.find(item => item.category === "insurance")!.steps.find(step => step.href.endsWith("pet-insurance-claim-guide"))!;
  assert.equal(claims.href, "/blog/pet-insurance-claim-guide", "observed production canonical type");
});

test("four revised topics expose source scope, practical preparation and linked primary references", () => {
  for (const route of targets) {
    const props = articles.get(route)!;
    const body = text(route);
    const sources = sourceValues(props.get("sources"));
    assert.ok(sources.length >= 2, route);
    assert.match(body, /자료 확인일: 2026-10-11/);
    assert.match(body, /<table>/);
    assert.ok([...body.matchAll(/href="\/(?:blog|guide)\//g)].length >= 3, route);
    for (const source of sources) assert.ok(body.includes(`href="${source}"`), `${route} unlinked source`);
    assert.equal(props.has("reviewerName"), false);
    assert.equal(props.has("reviewedAt"), false);
    assert.deepEqual(evaluateChangedHighRiskContent({ slug: route.split("/").at(-1)!, category: Number(props.get("category")?.getText()), ymyl: null, status: "published", sourceCount: sources.length, disclaimer: stringValue(props.get("disclaimer")), metaTitle: stringValue(props.get("metaTitle")), metaDescription: stringValue(props.get("metaDescription")), body }), [], route);
  }
});

test("removed clinical and product numbers cannot return through revised bodies or category FAQ", () => {
  assert.doesNotMatch(text(targets[0]), /5~10분|혈관을 수축시켜 역효과/);
  assert.doesNotMatch(text(targets[1]), /8~12시간|5~15만원|25~60만원|고양이 필수|치료 비용을 줄이는 가장 효과적인/);
  assert.doesNotMatch(text(targets[2]), /평균 2~5일|5~10일 소요|가입 후 30일\(수술 90일\)|치료일로부터 3년/);
  assert.match(text(targets[2]), /기산점/);
  assert.doesNotMatch(text(targets[3]), /금융상품 통합비교공시|거의 모든 펫보험의 공통/);
  const category = fs.readFileSync("app/category/[slug]/page.tsx", "utf8");
  assert.doesNotMatch(category, /면책 기간 적용 없이|DHPPL\) 5차|건식사료는 치아 관리에 유리/);
});
