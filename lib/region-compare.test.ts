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

import { splitUnclassified } from "./region-compare";

test("세종 도로명처럼 시·군·구가 아닌 시군구 값은 미분류로 분리한다", () => {
  const rows: CompareRow[] = [
    { sido: "세종특별자치시", sigungu: "가름로", sigunguSlug: null, count: 4, phoneCount: 2 },
    { sido: "세종특별자치시", sigungu: "세종특별자치시", sigunguSlug: "sejong", count: 3, phoneCount: 3 },
    { sido: "경기도", sigungu: "신설구", sigunguSlug: null, count: 1, phoneCount: 0 },
    { sido: "", sigungu: "중구", sigunguSlug: null, count: 2, phoneCount: 0 },
  ];
  const { classified, unclassified } = splitUnclassified(rows);
  assert.deepEqual(classified.map((r) => r.sigungu), ["세종특별자치시", "신설구"]);
  assert.deepEqual(unclassified, { rows: 2, count: 6, phoneCount: 2 });
});

test("개명 전후 시도 표기는 한 시도로 합치고 슬러그는 보존한다", () => {
  const groups = groupBySido([
    { sido: "강원도", sigungu: "춘천시", sigunguSlug: null, count: 2, phoneCount: 1 },
    { sido: "강원특별자치도", sigungu: "춘천시", sigunguSlug: "chuncheon", count: 3, phoneCount: 3 },
    { sido: "강원도", sigungu: "원주시", sigunguSlug: null, count: 1, phoneCount: 0 },
  ]);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].sido, "강원특별자치도");
  assert.equal(groups[0].total, 6);
  assert.deepEqual(groups[0].sigungus.map((s) => [s.sigungu, s.count, s.sigunguSlug]), [["춘천시", 5, "chuncheon"], ["원주시", 1, null]]);
});

test("같은 시군구 이름이라도 시도가 다르면 합치지 않는다", () => {
  const groups = groupBySido([
    { sido: "서울특별시", sigungu: "중구", sigunguSlug: "jung-gu", count: 2, phoneCount: 0 },
    { sido: "부산광역시", sigungu: "중구", sigunguSlug: "jung-gu", count: 5, phoneCount: 0 },
  ]);
  assert.deepEqual(groups.map((g) => [g.sido, g.total]), [["부산광역시", 5], ["서울특별시", 2]]);
});
