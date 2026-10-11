import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { isAutoAdsEligiblePath } from "./ads-policy";
import {
  ADVERTISING_DESCRIPTION,
  AFFILIATE_STATUS_TEXT,
  DISCLOSURE_DESCRIPTION,
  HAS_AFFILIATE_LINKS,
  MEMORIAL_ADS_POLICY_TEXT,
  REVENUE_METHOD_TEXT,
} from "./revenue-disclosure";

const disclosure = fs.readFileSync("app/disclosure/page.tsx", "utf8");
const advertising = fs.readFileSync("app/advertising/page.tsx", "utf8");

test("두 페이지가 같은 공통 문구와 날짜를 사용한다", () => {
  for (const src of [disclosure, advertising]) {
    assert.ok(src.includes("AFFILIATE_STATUS_TEXT"));
    assert.ok(src.includes("MEMORIAL_ADS_POLICY_TEXT"));
    assert.ok(src.includes("REVENUE_DISCLOSURE_UPDATED"));
  }
});

test("제휴 링크가 없는 현재 상태에서 특정 제휴 노출을 설명하지 않는다", () => {
  assert.equal(HAS_AFFILIATE_LINKS, false);
  for (const text of [disclosure, advertising, AFFILIATE_STATUS_TEXT, MEMORIAL_ADS_POLICY_TEXT, REVENUE_METHOD_TEXT]) {
    assert.equal(/굿즈 어필리에이트만|어필리에이트만 노출/.test(text), false);
  }
  assert.match(AFFILIATE_STATUS_TEXT, /제휴\(수수료\) 링크는 없습니다/);
  assert.match(MEMORIAL_ADS_POLICY_TEXT, /제휴 링크도 없습니다/);
});

test("추모 광고 제한은 펫지기 자체 정책으로 설명한다", () => {
  assert.match(MEMORIAL_ADS_POLICY_TEXT, /자체 정책/);
  assert.match(MEMORIAL_ADS_POLICY_TEXT, /Google의 일괄 금지 규칙이 아닙니다/);
});

test("메타 설명이 본문과 모순되지 않는다", () => {
  assert.match(DISCLOSURE_DESCRIPTION, /현재 제휴 링크는 없으며/);
  assert.equal(/어필리에이트만|노출됩니다/.test(ADVERTISING_DESCRIPTION), false);
});

test("Google 광고 차단은 기존대로 유지된다", () => {
  for (const p of ["/category/memorial", "/funeral/hwaseong/x", "/hwaseong/funeral", "/advertising", "/disclosure"]) {
    assert.equal(isAutoAdsEligiblePath(p), false, p);
  }
});
