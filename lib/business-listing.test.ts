import assert from "node:assert/strict";
import test from "node:test";
import {
  businessListingPath,
  getAddressRegionConsistency,
  getPageWindow,
  parsePageParam,
} from "./business-listing";

for (const fixture of [0, 1, 49, 50, 51, 133]) {
  test(`page window preserves totalCount for ${fixture} records`, () => {
    const first = getPageWindow(fixture, 1, 50);
    assert.equal(first.page, 1);
    assert.equal(first.start, fixture === 0 ? 0 : 1);
    assert.equal(first.end, Math.min(fixture, 50));
    assert.equal(first.hasNext, fixture > 50);

    if (fixture > 50) {
      const seen = new Set<number>();
      for (let page = 1; page <= first.totalPages; page += 1) {
        const window = getPageWindow(fixture, page, 50);
        for (let position = window.start; position <= window.end; position += 1) {
          assert.equal(seen.has(position), false, `duplicate position ${position}`);
          seen.add(position);
        }
      }
      assert.equal(seen.size, fixture, "pagination must not omit positions");
    }
  });
}

test("invalid page values safely resolve to page 1", () => {
  for (const value of [undefined, "", "0", "-1", "1.5", "abc", "99999999999999999999"]) {
    assert.equal(parsePageParam(value), 1);
  }
  assert.equal(parsePageParam(["2", "3"]), 2);
});

test("out-of-range pages clamp to the last real page", () => {
  assert.deepEqual(getPageWindow(51, 99, 50), {
    page: 2,
    pageSize: 50,
    offset: 50,
    totalPages: 2,
    start: 51,
    end: 51,
    hasPrevious: true,
    hasNext: false,
  });
});

test("page URLs keep page one clean and later pages unique", () => {
  assert.equal(businessListingPath("hwaseong", "boarding", 1), "/hwaseong/boarding");
  assert.equal(businessListingPath("hwaseong", "boarding", 2), "/hwaseong/boarding?page=2");
});

test("주소 문자열과 목록 지역의 명백한 불일치를 구분한다", () => {
  assert.equal(
    getAddressRegionConsistency("경기도 부천시 원미구 중동 1", "부천시"),
    "consistent"
  );
  assert.equal(
    getAddressRegionConsistency("경기도 수원시 영통구 이의동 1335", "부천시"),
    "mismatch"
  );
  assert.equal(
    getAddressRegionConsistency("경기도 수원시 영통구 이의동 1335", "수원시 영통구"),
    "consistent"
  );
  assert.equal(getAddressRegionConsistency("경기도 ***", "부천시"), "unknown");
});
