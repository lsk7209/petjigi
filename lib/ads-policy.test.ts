import test from "node:test";
import assert from "node:assert/strict";
import { isAutoAdsEligiblePath } from "./ads-policy";

test("추모 카테고리에서는 Auto ads를 로드하지 않는다", () => {
  assert.equal(isAutoAdsEligiblePath("/category/memorial"), false);
  assert.equal(isAutoAdsEligiblePath("/category/memorial/archive"), false);
  assert.equal(isAutoAdsEligiblePath("/blog/pet-grief-recovery-guide"), false);
  assert.equal(isAutoAdsEligiblePath("/guide/pet-loss-care"), false);
  assert.equal(isAutoAdsEligiblePath("/hwaseong/funeral"), false);
  assert.equal(isAutoAdsEligiblePath("/hwaseong/funeral/example-business"), false);
  assert.equal(isAutoAdsEligiblePath("/funeral"), true);
  assert.equal(isAutoAdsEligiblePath("/hwaseong/funerals"), true);
  assert.equal(isAutoAdsEligiblePath("/hwaseong/funeral-home/example"), true);
});

test("관리, 검색, 문의, 정책 화면에서는 Auto ads를 로드하지 않는다", () => {
  for (const pathname of [
    "/admin",
    "/admin/review-queue",
    "/search",
    "/contact",
    "/privacy",
    "/terms",
    "/disclosure",
    "/advertising",
  ]) {
    assert.equal(isAutoAdsEligiblePath(pathname), false, pathname);
  }
});

test("일반 콘텐츠 경로에서는 Auto ads를 허용한다", () => {
  assert.equal(isAutoAdsEligiblePath("/guide/pet-first-aid-guide"), true);
  assert.equal(isAutoAdsEligiblePath("/hwaseong/boarding"), true);
});

test("404 또는 오류 화면의 DOM 정책 표시는 경로와 무관하게 Auto ads를 막는다", () => {
  assert.equal(isAutoAdsEligiblePath("/missing-page", true), false);
});

import { decideAdPage } from "./ads-policy";

test("장례 업체 상세 /funeral/{지역}/{업체} 도 자동광고 대상에서 제외된다", () => {
  assert.equal(isAutoAdsEligiblePath("/funeral/hwaseong/example-business"), false);
  assert.equal(isAutoAdsEligiblePath("/funeral/hwaseong"), false);
  assert.equal(isAutoAdsEligiblePath("/vet/hwaseong/example-business"), true);
});

test("구조동물 목록·상세는 광고 대상이 아니다", () => {
  assert.equal(isAutoAdsEligiblePath("/rescue"), false);
  assert.equal(isAutoAdsEligiblePath("/rescue/abc"), false);
});

test("decideAdPage: 렌더 완료 전에는 pending, 시간이 아니라 완료 신호로만 allow", () => {
  assert.equal(decideAdPage({ pathname: "/guide/x", marker: null, renderComplete: false }), "pending");
  assert.equal(decideAdPage({ pathname: "/guide/x", marker: null, renderComplete: true }), "allow");
  assert.equal(decideAdPage({ pathname: "/guide/x", marker: "pending", renderComplete: true }), "pending");
});

test("decideAdPage: 차단 경로·마커는 렌더 완료 전에도 block", () => {
  assert.equal(decideAdPage({ pathname: "/privacy", marker: null, renderComplete: false }), "block");
  assert.equal(decideAdPage({ pathname: "/guide/x", marker: "block", renderComplete: false }), "block");
  assert.equal(decideAdPage({ pathname: "/funeral/a/b", marker: null, renderComplete: true }), "block");
});
