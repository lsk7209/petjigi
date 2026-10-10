import { test } from "node:test";
import assert from "node:assert/strict";
import { describeRegionSlug, resolveRegionIdentity, type RegionCandidate } from "./region-identity";

const SEOUL_GANGSEO: RegionCandidate = {
  code: "11500", sido: "서울특별시", sidoSlug: "seoul",
  sigungu: "강서구", sigunguSlug: "gangseo", fullName: "서울특별시 강서구",
};
const BUSAN_GANGSEO: RegionCandidate = {
  code: "21130", sido: "부산광역시", sidoSlug: "busan",
  sigungu: "강서구", sigunguSlug: "gangseo", fullName: "부산광역시 강서구",
};
const NOWON: RegionCandidate = {
  code: "11350", sido: "서울특별시", sidoSlug: "seoul",
  sigungu: "노원구", sigunguSlug: "nowon", fullName: "서울특별시 노원구",
};

test("unique slug resolves cleanly", () => {
  const result = resolveRegionIdentity([NOWON]);
  assert.equal(result.kind, "resolved");
  if (result.kind === "resolved") assert.equal(result.region.fullName, "서울특별시 노원구");
});

test("duplicate slug across sido (Seoul/Busan Gangseo) is ambiguous, not silently first-row", () => {
  const result = resolveRegionIdentity([SEOUL_GANGSEO, BUSAN_GANGSEO]);
  assert.equal(result.kind, "ambiguous");
  if (result.kind === "ambiguous") {
    assert.equal(result.candidates.length, 2);
    const sidos = result.candidates.map((c) => c.sido).sort();
    assert.deepEqual(sidos, ["부산광역시", "서울특별시"]);
  }
});

test("no candidates resolves to missing", () => {
  const result = resolveRegionIdentity([]);
  assert.equal(result.kind, "missing");
});

test("ambiguous result never exposes only the first candidate as if it were the answer", () => {
  const result = resolveRegionIdentity([SEOUL_GANGSEO, BUSAN_GANGSEO]);
  // @ts-expect-error - ambiguous 타입에는 region 단일 필드가 없어야 한다
  assert.equal(result.region, undefined);
});

test("ambiguous slug exposes real sigungu name and every candidate sido, never the slug text", () => {
  const view = describeRegionSlug(resolveRegionIdentity([SEOUL_GANGSEO, BUSAN_GANGSEO]));
  assert.equal(view.sigunguName, "강서구");
  assert.deepEqual(view.ambiguousSidoNames, ["서울특별시", "부산광역시"]);
  assert.equal(view.sidoSlug, null);
});

test("resolved and missing slugs describe cleanly", () => {
  const resolved = describeRegionSlug(resolveRegionIdentity([NOWON]));
  assert.equal(resolved.sigunguName, "노원구");
  assert.deepEqual(resolved.ambiguousSidoNames, []);
  assert.equal(describeRegionSlug(resolveRegionIdentity([])).sigunguName, null);
});

test("describeRegionSlug는 missing/ambiguous/resolved를 kind로 구분한다", async () => {
  const { describeRegionSlug, resolveRegionIdentity } = await import("./region-identity");
  const mk = (sido: string) => ({ code: sido, sido, sidoSlug: sido, sigungu: "강서구", sigunguSlug: "gangseo", fullName: `${sido} 강서구` });
  assert.equal(describeRegionSlug(resolveRegionIdentity([])).kind, "missing");
  assert.equal(describeRegionSlug(resolveRegionIdentity([mk("서울"), mk("부산")])).kind, "ambiguous");
  assert.equal(describeRegionSlug(resolveRegionIdentity([mk("서울")])).kind, "resolved");
});
