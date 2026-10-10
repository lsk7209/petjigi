import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file: string) => fs.readFileSync(file, "utf8");

test("공통 공개 조건은 published 상태·지원 타입·유효한 과거 발행시각을 모두 요구한다", () => {
  const source = read("lib/content-publication-sql.ts");
  assert.match(source, /eq\(contents\.status, "published"\)/);
  assert.match(source, /eq\(contents\.type, type\)|inArray\(contents\.type/);
  assert.match(
    source,
    /julianday\(\$\{contents\.publishedAt\}\) <= julianday\(/,
  );
});

test("blog and guide detail queries enforce their content type through the shared condition", () => {
  assert.match(
    read("app/blog/[slug]/page.tsx"),
    /publicContentCondition\("blog"\)/,
  );
  assert.match(
    read("app/guide/[slug]/page.tsx"),
    /publicContentCondition\("guide"\)/,
  );
});

test("content OpenGraph queries use the same type and publication-time boundary", () => {
  for (const [file, type] of [
    ["app/blog/[slug]/opengraph-image.tsx", "blog"],
    ["app/guide/[slug]/opengraph-image.tsx", "guide"],
    ["app/condition/[slug]/opengraph-image.tsx", "condition"],
  ]) {
    assert.match(
      read(file),
      new RegExp(`publicContentCondition[(]"${type}"[)]`),
      file,
    );
  }
});

test("related/adjacent/search/feed/sitemap 경로는 직접 status 조건 대신 공통 조건을 쓴다", () => {
  for (const file of [
    "app/blog/[slug]/page.tsx",
    "app/guide/[slug]/page.tsx",
    "app/condition/[slug]/page.tsx",
    "app/[sigungu]/[type]/[slug]/page.tsx",
    "app/api/search/route.ts",
    "app/feed.xml/route.ts",
    "app/sitemap-content.xml/route.ts",
    "lib/db-queries.ts",
  ]) {
    const source = read(file);
    assert.match(source, /publicContentCondition\(/, file);
    assert.doesNotMatch(
      source,
      /eq\(contents\.status, "published"\)/,
      `${file} must not hand-roll the status filter`,
    );
  }
});
