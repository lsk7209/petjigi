import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

// 출처 2곳(CSV·공공데이터포털)에서 중복 적재된 동일 업체가 목록에 두 번 나오지 않아야 한다.
test("지역×업종 목록 조회는 중복 업체 제외 조건을 사용한다", () => {
  const src = fs.readFileSync("lib/db-queries.ts", "utf8");
  assert.match(src, /export const notDuplicateListing = sql`NOT EXISTS/);
  const listing = src.slice(src.indexOf("export const getCachedBusinessListing"), src.indexOf("getCachedTypeSourceAsOf"));
  assert.match(listing, /notDuplicateListing/);
  assert.match(src, /d\.name = \$\{businesses\.name\}[\s\S]*d\.address = \$\{businesses\.address\}[\s\S]*d\.id < \$\{businesses\.id\}/);
});
