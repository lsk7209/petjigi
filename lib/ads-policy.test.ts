import test from "node:test";
import assert from "node:assert/strict";
import { isAutoAdsEligiblePath } from "./ads-policy";

test("추모 카테고리에서는 Auto ads를 로드하지 않는다", () => {
  assert.equal(isAutoAdsEligiblePath("/category/memorial"), false);
  assert.equal(isAutoAdsEligiblePath("/category/memorial/archive"), false);
  assert.equal(isAutoAdsEligiblePath("/blog/pet-grief-recovery-guide"), false);
  assert.equal(isAutoAdsEligiblePath("/guide/pet-loss-care"), false);
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
});

test("404 또는 오류 화면의 DOM 정책 표시는 경로와 무관하게 Auto ads를 막는다", () => {
  assert.equal(isAutoAdsEligiblePath("/missing-page", true), false);
});
