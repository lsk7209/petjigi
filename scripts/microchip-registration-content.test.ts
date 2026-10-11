import assert from "node:assert/strict";
import test from "node:test";
import { seedBody } from "../tests/e2e/seed-body.mjs";

const SLUG = "microchip-registration-complete-guide";
const body: string = seedBody(SLUG);
const rowText = (label: string) =>
  body.match(new RegExp(`<tr><td>${label}</td>(.*?)</tr>`))?.[1].replace(/<\/?t[dh]>/g, "|") ?? "";

test("미등록 과태료는 1차 20·2차 40·3차 이상 60만 원 부과 기준이다", () => {
  assert.match(rowText("등록대상동물 미등록"), /20만 원\|+40만 원\|+60만 원/);
  assert.equal(body.includes("1차 40만"), false);
  assert.equal(body.includes("3차 이상 100만"), false);
});

test("변경신고 미이행은 별도 기준(10·20·40만 원)이고 구 범위 표기를 쓰지 않는다", () => {
  assert.match(rowText("등록 변경사항 미신고"), /10만 원\|+20만 원\|+40만 원/);
  assert.equal(body.includes("10만~50만"), false);
});

test("부과 기준과 법정 한도를 구분하고 확인 불가한 조문 번호는 쓰지 않는다", () => {
  assert.ok(body.includes("부과 기준과 법정 한도는 다릅니다"));
  assert.equal(/제12조|제15조|제101조/.test(body), false);
});

test("지역·기간별 비용·지원사업을 일반화하지 않는다", () => {
  assert.equal(body.includes("1만~3만 원"), false);
  assert.equal(body.includes("연간 1~2회"), false);
});

test("변경신고 기한은 사망·변경 30일, 분실 10일을 구분한다", () => {
  assert.match(body, /30일 이내/);
  assert.match(body, /잃어버린 경우는 10일 이내/);
});
