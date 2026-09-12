import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file: string) => fs.readFileSync(file, "utf8");

test("blog and guide detail queries enforce their content type", () => {
  assert.match(read("app/blog/[slug]/page.tsx"), /eq\(contents\.type, "blog"\)/);
  assert.match(read("app/guide/[slug]/page.tsx"), /eq\(contents\.type, "guide"\)/);
});

test("content OpenGraph queries use the same type and publication-time boundary", () => {
  for (const [file, type] of [
    ["app/blog/[slug]/opengraph-image.tsx", "blog"],
    ["app/guide/[slug]/opengraph-image.tsx", "guide"],
    ["app/condition/[slug]/opengraph-image.tsx", "condition"],
  ]) {
    const source = read(file);
    assert.match(source, new RegExp(`eq\\(contents\\.type, "${type}"\\)`), file);
    assert.match(source, /lte\(contents\.publishedAt, new Date\(\)\.toISOString\(\)\)/, file);
  }
});
