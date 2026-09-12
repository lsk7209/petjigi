import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("public blog copy does not claim undocumented direct experience", () => {
  const sources = [
    fs.readFileSync("app/blog/page.tsx", "utf8"),
    fs.readFileSync("app/blog/[slug]/page.tsx", "utf8"),
  ].join("\n");
  assert.doesNotMatch(sources, /집사 에디터가 직접 경험|직접 경험하고 조사한/);
});
