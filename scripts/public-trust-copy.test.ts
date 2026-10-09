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

test("insurance CTAs do not promise free quotes or premium comparison the site does not provide", () => {
  for (const f of ["components/ads/ad-slot.tsx", "components/content/category-cta.tsx", "app/page.tsx"]) {
    const s = fs.readFileSync(f, "utf8");
    for (const banned of ["무료 비교", "비교견적", "보험료 비교", "보험료·보장 비교", "6대 손보사"]) {
      assert.equal(s.includes(banned), false, `${f}: ${banned}`);
    }
  }
});
