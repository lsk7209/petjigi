import assert from "node:assert/strict";
import test from "node:test";
import { estimateInsurancePayout } from "./insurance-estimate";
import { PRACTICAL_TOOLS } from "./practical-tools";

test("시범 도구 3종이 등록돼 있다", () => {
  assert.deepEqual(Object.keys(PRACTICAL_TOOLS).sort(), [
    "animal-hospital-guide",
    "animal-registration-chip-guide",
    "pet-insurance-guide",
  ]);
});

test("도구 문구에 근거 없는 가격·순위·검증 표현이 없다", () => {
  const text = JSON.stringify(PRACTICAL_TOOLS);
  for (const banned of [/추천 1위/, /인기/, /전문가 선정/, /직접 확인했/, /현장 검증/, /\d+\s?원/, /24시간 진료/]) {
    assert.doesNotMatch(text, banned);
  }
});

test("보험금 계산 예시: 정상 입력", () => {
  assert.equal(estimateInsurancePayout({ cost: "500000", rate: "70", fixed: "0", cap: "1000000" }), 350000);
  assert.equal(estimateInsurancePayout({ cost: "500000", rate: "70", fixed: "100000", cap: "1000000" }), 280000);
});

test("보험금 계산 예시: 한도 상한과 자기부담금 초과", () => {
  assert.equal(estimateInsurancePayout({ cost: "4000000", rate: "70", fixed: "0", cap: "1000000" }), 1000000);
  assert.equal(estimateInsurancePayout({ cost: "50000", rate: "70", fixed: "100000", cap: "1000000" }), 0);
});

test("보험금 계산 예시: 빈 값·음수·범위 초과는 null", () => {
  assert.equal(estimateInsurancePayout({ cost: "", rate: "70", fixed: "0", cap: "1" }), null);
  assert.equal(estimateInsurancePayout({ cost: "-1", rate: "70", fixed: "0", cap: "1" }), null);
  assert.equal(estimateInsurancePayout({ cost: "1", rate: "101", fixed: "0", cap: "1" }), null);
  assert.equal(estimateInsurancePayout({ cost: "abc", rate: "70", fixed: "0", cap: "1" }), null);
});
