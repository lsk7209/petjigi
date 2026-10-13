import assert from "node:assert/strict";
import test from "node:test";
import { groupBySido, type CompareRow } from "./region-compare";

const row = (
  sidoSlug: string,
  sigungu: string,
  count: number,
  phoneCount: number,
): CompareRow => ({
  sido: sidoSlug,
  sigungu,
  sigunguSlug: sigungu,
  count,
  phoneCount,
});

test("시도별 합계·전화 기재율·정렬", () => {
  const groups = groupBySido([
    row("a", "가", 1, 1),
    row("a", "나", 3, 0),
    row("b", "다", 10, 5),
    row("a", "라", 3, 3),
  ]);
  assert.deepEqual(
    groups.map((g) => g.sido),
    ["b", "a"],
  );
  assert.equal(groups[1].total, 7);
  assert.equal(groups[1].phonePercent, 57);
  assert.deepEqual(
    groups[1].sigungus.map((s) => s.sigungu),
    ["나", "라", "가"],
  );
  assert.equal(groupBySido([row("c", "마", 0, 0)])[0].phonePercent, 0);
});
