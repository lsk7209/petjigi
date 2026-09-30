import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// F07 — 서울/부산 강서구처럼 시군구 slug가 여러 시도에 걸쳐 모호한 경우, 지역을 노출하는
// 페이지가 deprecated `getCachedRegionBySlug`(모호하면 임의로 첫 행 반환)를 계속 쓰면
// 다른 시도의 지역명이 breadcrumb/메타데이터에 새어나갈 수 있다. 이 테스트는 해당 페이지들이
// `getCachedResolvedRegion`(모호하면 undefined로 안전하게 폴백)을 사용하는지 정적으로 확인한다.
const PAGES_MUST_USE_RESOLVED_REGION = [
  "app/shelter/[sigungu]/page.tsx",
  "app/[sigungu]/[type]/page.tsx",
  "app/[sigungu]/[type]/[slug]/page.tsx",
];

for (const pagePath of PAGES_MUST_USE_RESOLVED_REGION) {
  test(`${pagePath} uses getCachedResolvedRegion, not the deprecated ambiguous-first-row lookup`, () => {
    const source = fs.readFileSync(pagePath, "utf8");
    assert.match(
      source,
      /getCachedResolvedRegion/,
      `${pagePath} should call getCachedResolvedRegion so an ambiguous sigungu slug (e.g. Seoul/Busan Gangseo) does not silently expose the first matching sido`
    );
    assert.doesNotMatch(
      source,
      /getCachedRegionBySlug\b/,
      `${pagePath} should not call the deprecated getCachedRegionBySlug, which returns an arbitrary first row when the slug is ambiguous`
    );
  });
}

test("db-queries exposes getCachedResolvedRegion built on resolveRegionIdentity", () => {
  const source = fs.readFileSync("lib/db-queries.ts", "utf8");
  assert.match(source, /export async function getCachedResolvedRegion/);
  assert.match(source, /resolveRegionIdentity\(candidates\)/);
  assert.match(source, /resolution\.kind === "resolved"/);
});
