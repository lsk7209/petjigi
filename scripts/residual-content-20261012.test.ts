import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "typescript";
import { evaluateChangedHighRiskContent } from "../lib/content-risk-gate";

const targets = [
  { file: "db/seeds/blog-posts-57.ts", slug: "cat-food-allergy-elimination-diet", id: "blog-407", publishedAt: "2026-08-06T11:00:00.000Z", credential: "반려동물 영양 정보 큐레이터" },
  { file: "db/seeds/blog-posts-57.ts", slug: "dog-liver-disease-early-signs", id: "blog-409", publishedAt: "2026-08-07T11:00:00.000Z", credential: "반려동물 건강 정보 큐레이터" },
  { file: "db/seeds/blog-posts-65.ts", slug: "dog-skin-lump-guide", id: "blog-450", publishedAt: "2026-08-28T09:00:00.000Z", credential: "반려동물 건강 정보 큐레이터" },
] as const;

function records(file: string): Map<string, Map<string, ts.Expression>> {
  const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const found = new Map<string, Map<string, ts.Expression>>();
  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map((prop) => [prop.name.getText(source), prop.initializer]));
      const slug = props.get("slug");
      if (slug && ts.isStringLiteral(slug)) {
        assert.equal(found.has(slug.text), false, `duplicate ${slug.text}`);
        found.set(slug.text, props);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return found;
}

function literal(props: Map<string, ts.Expression>, key: string): string {
  const value = props.get(key);
  assert.ok(value && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)), `${key} must be literal`);
  return value.text;
}

test("three published health records retain identity and include sourced consultation tools", () => {
  const cache = new Map<string, Map<string, Map<string, ts.Expression>>>();
  for (const target of targets) {
    if (!cache.has(target.file)) cache.set(target.file, records(target.file));
    const props = cache.get(target.file)?.get(target.slug);
    assert.ok(props, target.slug);
    assert.equal(literal(props, "id"), target.id);
    assert.equal(literal(props, "slug"), target.slug);
    assert.equal(literal(props, "type"), "blog");
    assert.equal(literal(props, "status"), "published");
    assert.equal(literal(props, "publishedAt"), target.publishedAt);
    assert.equal(literal(props, "authorCredential"), target.credential);
    assert.equal(props.get("ymyl")?.kind, ts.SyntaxKind.TrueKeyword);
    assert.equal(literal(props, "updatedAt"), "2026-10-12T00:00:00.000Z");
    assert.equal(props.has("reviewerName"), false);
    assert.equal(props.has("reviewedAt"), false);

    const body = literal(props, "body");
    assert.match(body, /<h2>진료에 가져갈 .*기록<\/h2>/);
    assert.match(body, /<h2>수의사에게 물어볼 질문<\/h2>/);
    assert.match(body, /<table>[\s\S]*?<\/table>/);
    const internal = [...body.matchAll(/href="(\/(?:guide|blog)\/[^"#]+)"/g)].map((match) => match[1]);
    assert.ok(new Set(internal).size >= 3, `${target.slug}: internal paths`);
    assert.ok(internal.includes("/guide/animal-hospital-guide"), target.slug);

    const sources = props.get("sources");
    assert.ok(sources && ts.isArrayLiteralExpression(sources), `${target.slug}: literal sources`);
    const urls = sources.elements.map((element) => {
      assert.ok(ts.isStringLiteral(element));
      return element.text.split(" — ")[0];
    });
    assert.ok(urls.length >= 2, target.slug);
    for (const url of urls) {
      assert.equal(new URL(url).protocol, "https:");
      assert.ok(body.includes(`href="${url}"`), `${target.slug}: unlinked source ${url}`);
    }
    assert.deepEqual(evaluateChangedHighRiskContent({
      slug: target.slug, category: Number(props.get("category")?.getText()), ymyl: props.get("ymyl")?.kind === ts.SyntaxKind.TrueKeyword,
      status: "published", sourceCount: urls.length, disclaimer: literal(props, "disclaimer"),
      metaTitle: literal(props, "metaTitle"), metaDescription: literal(props, "metaDescription"), body,
    }), [], target.slug);
  }
});

test("linked guides remain published public records", () => {
  const guides = records("db/seeds/contents.ts");
  for (const slug of ["animal-hospital-guide", "cat-food-guide", "pet-health-checkup-guide", "pet-first-aid-guide"]) {
    const props = guides.get(slug);
    assert.ok(props, slug);
    assert.equal(literal(props, "type"), "guide");
    assert.equal(literal(props, "status"), "published");
  }
});

test("food trial does not prescribe a duration or owner-led rechallenge", () => {
  const props = records("db/seeds/blog-posts-57.ts").get("cat-food-allergy-elimination-diet")!;
  const copy = ["title", "subtitle", "metaTitle", "metaDescription", "body"].map((key) => literal(props, key)).join("\n");
  assert.doesNotMatch(copy, /8\s*[~∼-]\s*12주|8주 이상|1\s*[~∼-]\s*9주|보통 8주/);
  assert.doesNotMatch(copy, /원래 먹던 음식을 다시 먹여|재도전은 수의사 지시에 따라 한 가지씩 진행/);
  assert.match(copy, /임의로 재도전을 시작하지 않는다/);
});
