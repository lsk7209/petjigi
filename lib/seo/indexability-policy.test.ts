import assert from "node:assert/strict";
import test from "node:test";
import { classifyListing } from "../listing-state";
import {
  evaluateBusinessDetailEligibility,
  evaluateContentEligibility,
  evaluateListingEligibility,
  evaluateOperationalEligibility,
  type PageEligibility,
} from "./indexability-policy";

const NOW = new Date("2026-10-12T00:00:00Z");

/** 불변식: noindex이면 sitemap·광고·JSON-LD 모두 false */
function assertInvariant(e: PageEligibility) {
  if (!e.indexable) {
    assert.equal(e.sitemapEligible, false);
    assert.equal(e.adEligible, false);
    assert.equal(e.structuredDataEligible, false);
  }
}

test("empty_confirmed 0건은 noindex·sitemap·광고·JSON-LD 제외", () => {
  const e = evaluateListingEligibility({
    ambiguousRegion: false,
    status: classifyListing(0, "2026-10-01", NOW),
    categoryId: 3,
  });
  assert.deepEqual(e.reasons, ["EMPTY_CONFIRMED"]);
  assertInvariant(e);
  assert.equal(e.indexable, false);
});

test("not_collected 0건", () => {
  const e = evaluateListingEligibility({
    ambiguousRegion: false,
    status: classifyListing(0, null, NOW),
    categoryId: 3,
  });
  assert.deepEqual(e.reasons, ["NOT_COLLECTED"]);
  assertInvariant(e);
});

test("모호한 지역은 업체가 있어도 제외", () => {
  const e = evaluateListingEligibility({
    ambiguousRegion: true,
    status: classifyListing(5, "2026-10-01", NOW),
    categoryId: 3,
  });
  assert.deepEqual(e.reasons, ["AMBIGUOUS_REGION"]);
  assertInvariant(e);
});

test("최신 목록과 오래된 목록 모두 색인 가능 (stale만으로 noindex 하지 않음)", () => {
  for (const asOf of ["2026-10-10", "2025-01-01"]) {
    const e = evaluateListingEligibility({
      ambiguousRegion: false,
      status: classifyListing(3, asOf, NOW),
      categoryId: 3,
    });
    assert.equal(e.indexable, true);
    assert.equal(e.sitemapEligible, true);
    assert.equal(e.adEligible, true);
    assert.equal(e.structuredDataEligible, true);
  }
});

test("장례·추모 목록은 색인 가능하지만 광고 차단", () => {
  const e = evaluateListingEligibility({
    ambiguousRegion: false,
    status: classifyListing(3, "2026-10-10", NOW),
    categoryId: 6,
  });
  assert.equal(e.indexable, true);
  assert.equal(e.adEligible, false);
  assert.ok(e.reasons.includes("MEMORIAL_ADS_BLOCKED"));
});

test("업체 상세: 고유 정보 없음 / 정상 / 공백 문자열", () => {
  const empty = evaluateBusinessDetailEligibility({
    ambiguous: false,
    business: { address: "", phone: null, lat: null, lng: null, licenseDate: "  " },
    categoryId: 3,
  });
  assert.deepEqual(empty.reasons, ["INSUFFICIENT_UNIQUE_DATA"]);
  assertInvariant(empty);

  const ok = evaluateBusinessDetailEligibility({
    ambiguous: false,
    business: { address: "서울 강남구 1", phone: null },
    categoryId: 3,
  });
  assert.equal(ok.indexable, true);
  assert.equal(ok.adEligible, true);

  const coordOnly = evaluateBusinessDetailEligibility({
    ambiguous: false,
    business: { lat: 0, lng: 0 },
    categoryId: 3,
  });
  assert.equal(coordOnly.indexable, true);
});

test("업체 상세: 동명 업체 모호", () => {
  const e = evaluateBusinessDetailEligibility({
    ambiguous: true,
    business: { address: "서울" },
    categoryId: 3,
  });
  assert.deepEqual(e.reasons, ["AMBIGUOUS_REGION"]);
});

test("업체 상세: 장례 업체 광고 차단", () => {
  const e = evaluateBusinessDetailEligibility({ ambiguous: false, business: { phone: "02-1" }, categoryId: 6 });
  assert.equal(e.indexable, true);
  assert.equal(e.adEligible, false);
});

test("콘텐츠: 리디렉션(404/308)·비공개·운영 페이지", () => {
  const redirected = evaluateContentEligibility({ isPublic: true, redirected: true });
  assert.deepEqual(redirected.reasons, ["REDIRECTED"]);
  const hidden = evaluateContentEligibility({ isPublic: false, redirected: false });
  assert.deepEqual(hidden.reasons, ["CONTENT_NOT_PUBLIC"]);
  const memorial = evaluateContentEligibility({ isPublic: true, redirected: false, memorial: true });
  assert.equal(memorial.adEligible, false);
  assert.equal(memorial.indexable, true);
  const op = evaluateOperationalEligibility();
  assert.deepEqual(op.reasons, ["OPERATIONAL_PAGE"]);
  for (const e of [redirected, hidden, op]) assertInvariant(e);
});
