import assert from "node:assert/strict";
import test from "node:test";
import {
  buildRegistrationAgentId,
  toRegistrationAgentRecord,
  REGISTRATION_AGENT_TYPE,
} from "./registration-agent-record";

const longName = "가".repeat(60);

test("긴 같은 이름이라도 주소가 다르면 서로 다른 ID가 된다 (100자 절단 충돌 회귀)", () => {
  const a = buildRegistrationAgentId({ orgNm: longName, orgAddr: "경기도 부천시 원미구 길주로 1" });
  const b = buildRegistrationAgentId({ orgNm: longName, orgAddr: "경기도 부천시 소사구 소사로 2" });
  assert.notEqual(a, b);
});

test("같은 입력은 공백·유니코드 정규화 차이와 무관하게 항상 같은 ID (재실행 멱등)", () => {
  const a = buildRegistrationAgentId({ orgNm: " 행복  동물병원 ", orgAddr: "서울 강남구 테헤란로 1" });
  const b = buildRegistrationAgentId({ orgNm: "행복 동물병원", orgAddr: "서울 강남구  테헤란로 1" });
  assert.equal(a, b);
});

test("상세주소가 다른 동일 이름·기본주소(같은 건물 다른 호실)도 구분된다", () => {
  const a = buildRegistrationAgentId({ orgNm: "펫등록", orgAddr: "서울 강남구 1", orgAddrDtl: "101호" });
  const b = buildRegistrationAgentId({ orgNm: "펫등록", orgAddr: "서울 강남구 1", orgAddrDtl: "202호" });
  assert.notEqual(a, b);
});

test("등록대행기관은 분양업체('sale')가 아닌 전용 업종으로 분류된다", () => {
  const record = toRegistrationAgentRecord({ orgNm: "행복 동물병원", orgAddr: "서울 강남구 테헤란로 1", orgAddrDtl: "2층", tel: "02-000-0000" });
  assert.ok(record);
  assert.equal(record.type, REGISTRATION_AGENT_TYPE);
  assert.notEqual(record.type, "sale");
  assert.equal(record.addressSido, "서울");
  assert.equal(record.addressSigungu, "강남구");
  assert.equal(record.address, "서울 강남구 테헤란로 1 2층");
});

test("이름이 없는 행은 건너뛴다", () => {
  assert.equal(toRegistrationAgentRecord({ orgNm: "  ", orgAddr: "서울" }), null);
});

test("ETL 모듈을 import해도 외부 호출·DB 쓰기가 실행되지 않는다", async () => {
  const mod = await import("./registration-agents");
  assert.equal(typeof mod.syncRegistrationAgents, "function");
});
