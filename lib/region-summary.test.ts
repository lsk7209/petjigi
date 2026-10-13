import assert from "node:assert/strict";
import test from "node:test";
import { summarizeRegion } from "./region-summary";

const rows = [
  { dong: "역삼동", licenseDate: "2026-03-01", phone: "02-1" },
  { dong: "역삼동", licenseDate: "2025-01-10", phone: null },
  { dong: "삼성동", licenseDate: "2020-05-05", phone: " " },
  { dong: null, licenseDate: "bad", phone: "02-2" },
  { dong: "강변남로", licenseDate: null, phone: null },
];

test("집계: 전화 기재율·연도·읍면동 상위", () => {
  const s = summarizeRegion(rows, [], "강남구", 2026);
  assert.equal(s.total, 5);
  assert.equal(s.phoneCount, 2);
  assert.equal(s.phonePercent, 40);
  assert.ok(!s.topDongs.some((d) => d.name === "강변남로"));
  assert.deepEqual(
    s.yearCounts.map((y) => y.year),
    [2022, 2023, 2024, 2025, 2026],
  );
  assert.equal(s.yearCounts[4].count, 1);
  assert.equal(s.yearCounts[3].count, 1);
  assert.deepEqual(s.topDongs[0], { name: "역삼동", count: 2 });
  assert.equal(s.sido, null);
});

test("시도 순위: 동률은 같은 순위, 비교 불가면 생략", () => {
  const counts = [
    { sigungu: "A", count: 10 },
    { sigungu: "B", count: 10 },
    { sigungu: "C", count: 4 },
  ];
  assert.deepEqual(summarizeRegion([], counts, "B", 2026).sido, {
    rank: 1,
    of: 3,
    average: 8,
  });
  assert.deepEqual(summarizeRegion([], counts, "C", 2026).sido, {
    rank: 3,
    of: 3,
    average: 8,
  });
  assert.equal(
    summarizeRegion([], [{ sigungu: "A", count: 1 }], "A", 2026).sido,
    null,
  );
  assert.equal(summarizeRegion([], counts, "없음", 2026).sido, null);
});
