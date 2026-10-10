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
      /getCachedResolvedRegion|getCachedRegionSlugView|resolveBusinessDetail/,
      `${pagePath} should call getCachedResolvedRegion so an ambiguous sigungu slug (e.g. Seoul/Busan Gangseo) does not silently expose the first matching sido`
    );
    assert.doesNotMatch(
      source,
      /getCachedRegionBySlug\b/,
      `${pagePath} should not call the deprecated getCachedRegionBySlug, which returns an arbitrary first row when the slug is ambiguous`
    );
  });
}

test("업체 상세 resolver는 지역 slug view(모호 시 후보 전체)와 공통 매칭 규칙을 사용한다", () => {
  const source = fs.readFileSync("lib/business-detail-resolve.ts", "utf8");
  assert.match(source, /getCachedRegionSlugView/);
  assert.match(source, /matchBusinessInRegion/);
  assert.doesNotMatch(source, /getCachedRegionBySlug/);
});

test("db-queries exposes getCachedResolvedRegion built on resolveRegionIdentity", () => {
  const source = fs.readFileSync("lib/db-queries.ts", "utf8");
  assert.match(source, /export async function getCachedResolvedRegion/);
  assert.match(source, /resolveRegionIdentity\(candidates\)/);
  assert.match(source, /resolution\.kind === "resolved"/);
});

test("listing page uses the slug view so ambiguous sigungu is not queried by slug text", () => {
  const src = fs.readFileSync("app/[sigungu]/[type]/page.tsx", "utf8");
  assert.ok(src.includes("getCachedRegionSlugView"));
  assert.equal(src.includes("getCachedResolvedRegion"), false);
  assert.equal(src.includes('`/sido/${region?.sidoSlug ?? ""}`'), false);
  assert.ok(src.includes("robots: { index: false, follow: true }"));
});
