import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("지역 목록 페이지는 장례(카테고리 6)에 다른 업종 링크를 만들지 않는다", () => {
  const src = fs.readFileSync("app/[sigungu]/[type]/page.tsx", "utf8");
  assert.match(src, /meta\.categoryId === 6 \? \[\]/);
});

test("다른 업종 링크 하한이 사이트맵 하한과 같다", () => {
  const cfg = fs.readFileSync("next-sitemap.config.js", "utf8");
  const min = /LISTING_MIN_SITEMAP = (\d+);/.exec(cfg)?.[1];
  const comp = fs.readFileSync("components/business/region-cross-links.tsx", "utf8");
  assert.ok(min);
  assert.match(comp, new RegExp(`MIN_LINKED_COUNT = ${min};`));
});
