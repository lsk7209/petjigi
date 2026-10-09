import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { adsPolicyAttrs, isAutoAdsEligiblePath } from "../lib/ads-policy";

test("category 6 content gets a block marker regardless of static path list", () => {
  assert.deepEqual(adsPolicyAttrs(6), { "data-ads-policy": "block" });
  assert.deepEqual(adsPolicyAttrs(3), {});
});

test("marker overrides an otherwise eligible path", () => {
  assert.equal(isAutoAdsEligiblePath("/blog/brand-new-memorial-post"), true);
  assert.equal(isAutoAdsEligiblePath("/blog/brand-new-memorial-post", true), false);
});

test("content detail pages wire the category marker onto <main>", () => {
  for (const f of ["app/blog/[slug]/page.tsx", "app/guide/[slug]/page.tsx", "app/condition/[slug]/page.tsx"]) {
    assert.ok(fs.readFileSync(f, "utf8").includes("adsPolicyAttrs(categoryId)"), f);
  }
});

test("condition not-found state blocks ads", () => {
  assert.ok(fs.readFileSync("app/condition/[slug]/page.tsx", "utf8").includes('data-ads-policy="block"'));
});
