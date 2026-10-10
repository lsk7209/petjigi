import assert from "node:assert/strict";
import test from "node:test";
import { faqCountAnswer, listingScopeWording, regionCountSentence, statusBasis } from "./business-status-wording";

test("등록대행기관은 active여도 영업 중 증거가 아니라 '등록만 확인'으로 분류된다", () => {
  assert.equal(statusBasis("registration", "active"), "registered_only");
  assert.equal(statusBasis("registration", "paused"), "not_in_source");
  assert.equal(statusBasis("registration", "closed"), "not_in_source");
});

test("영업 상태를 제공하는 업종은 기존 분류를 유지한다", () => {
  assert.equal(statusBasis("vet", "active"), "operating_confirmed");
  assert.equal(statusBasis("vet", "paused"), "status_unverified");
});

test("같은 등록대행기관에 대해 목록 안내·지역 현황·FAQ가 '운영 중'이라고 말하지 않는다", () => {
  const texts = [
    listingScopeWording("registration"),
    regionCountSentence("registration", "부천시", "동물등록 대행기관", 12),
    faqCountAnswer("registration", "부천시", "동물등록 대행기관", 12),
  ];
  for (const text of texts) {
    assert.doesNotMatch(text, /운영 중|영업 중인/);
    assert.match(text, /등록/);
  }
  assert.match(texts[1], /영업 여부는 원본에 없어 확인되지 않/);
  assert.match(texts[2], /영업 여부는 원본에 없/);
});

test("영업 상태를 제공하는 다른 업종의 기존 표현은 유지된다", () => {
  assert.equal(listingScopeWording("vet"), "공공데이터 기준 영업 중인 업체");
  assert.equal(regionCountSentence("vet", "노원구", "동물병원", 3), "노원구 지역에는 현재 3개의 동물병원가 운영 중입니다.");
  assert.match(faqCountAnswer("vet", "노원구", "동물병원", 3), /현재 영업 중인 동물병원 3곳/);
});

test("0건 FAQ는 업종과 무관하게 영업 단정 없이 확인되지 않았다고 안내한다", () => {
  assert.match(faqCountAnswer("registration", "부천시", "동물등록 대행기관", 0), /확인되지 않았습니다/);
});
