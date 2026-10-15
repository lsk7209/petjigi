import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

// 지역 목록·통계·검색·주변 시설·상세·사이트맵이 같은 중복 제거 기준(lib/listing-identity.js)을 써야 한다.
// 동작 자체는 lib/listing-identity.test.ts가 SQLite로 검증하고, 여기서는 호출 지점을 고정한다.
test("db-queries의 중복 제거 조건은 공통 모듈에서 만든다", () => {
  const src = fs.readFileSync("lib/db-queries.ts", "utf8");
  assert.match(src, /export const notDuplicateListing = sql\.raw\(notDuplicateListingSql\("businesses"\)\)/);
  const listing = src.slice(src.indexOf("export const getCachedBusinessListing"), src.indexOf("getCachedTypeSourceAsOf"));
  assert.match(listing, /notDuplicateListing/);
});

test("사이트맵 조회는 목록과 같은 중복 제거 SQL을 쓴다", () => {
  const cfg = fs.readFileSync("next-sitemap.config.js", "utf8");
  assert.match(cfg, /listingSitemapSql\(\)/);
  assert.doesNotMatch(cfg, /FROM businesses b JOIN regions/);
});

for (const file of ["app/api/search/route.ts", "app/[sigungu]/[type]/[slug]/page.tsx", "lib/region-summary-query.ts", "lib/region-compare-query.ts"]) {
  test(`${file}의 업체 조회는 중복 제거를 적용한다`, () => {
    assert.match(fs.readFileSync(file, "utf8"), /notDuplicateListing/);
  });
}

test("상세 후보는 대표 1건으로 줄인 뒤 동명 업체를 판정한다", () => {
  assert.match(fs.readFileSync("lib/business-detail-resolve.ts", "utf8"), /matchBusinessInRegion\(region, collapseListingDuplicates\(candidates\)\)/);
});
