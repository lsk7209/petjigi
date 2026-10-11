import assert from "node:assert/strict";
import test from "node:test";
import { describeDataCoverage, collectedDateLabel } from "./business-data-coverage";

const base = { source: "mois_15045050", address: "경기도 화성시 1", phone: null, lat: 37.1, lng: 127.1, licenseDate: null };

test("등록된 항목만 나열하고 전화 없으면 제외한다", () => {
  const c = describeDataCoverage(base);
  assert.deepEqual(c.registered, ["주소", "좌표(지도 위치)"]);
  assert.match(c.provider, /행정안전부/);
});

test("미제공 항목에 직접 확인·현장 검증 표현을 쓰지 않는다", () => {
  const text = JSON.stringify(describeDataCoverage(base));
  assert.match(text, /확인을 하지 않았습니다/);
  assert.doesNotMatch(text, /현장 검증|직접 확인했|방문 추천/);
});

test("알 수 없는 출처는 일반 공공데이터로 표기", () => {
  assert.match(describeDataCoverage({ ...base, source: "fixture" }).provider, /공공데이터포털/);
});

test("collection date never renders a blank or malformed freshness value", () => {
  for (const value of [null, undefined, "", "not-a-date", "0", "2026-02-30", "2026-02-29", "2026-13-01"]) assert.equal(collectedDateLabel(value), "확인되지 않음");
  assert.equal(collectedDateLabel("2026-08-01T00:00:00.000Z"), "2026-08-01");
  assert.equal(collectedDateLabel("2024-02-29"), "2024-02-29");
});
