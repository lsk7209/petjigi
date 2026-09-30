import { test } from "node:test";
import assert from "node:assert/strict";
import { parseShelterAddress, buildShelterUpsertValues } from "./shelter-upsert";

test("simple two-part address splits into sido and sigungu", () => {
  const parsed = parseShelterAddress("서울특별시 노원구 동일로 1234");
  assert.equal(parsed.sido, "서울특별시");
  assert.equal(parsed.sigungu, "노원구");
});

test("compound sigungu like 수원시 장안구 is preserved as a single unit", () => {
  const parsed = parseShelterAddress("경기도 수원시 장안구 조원로 123");
  assert.equal(parsed.sido, "경기도");
  assert.equal(parsed.sigungu, "수원시 장안구");
});

test("empty or missing address classifies as unknown rather than throwing", () => {
  const parsed = parseShelterAddress("");
  assert.equal(parsed.sido, null);
  assert.equal(parsed.sigungu, null);
});

test("upsert values keep sido/sigungu in both insert and update branches so relocation is reflected", () => {
  const values = buildShelterUpsertValues({
    id: "apms-shelter-123",
    name: "행복보호센터",
    address: "인천광역시 강화군 강화읍 123",
    phone: "032-000-0000",
    now: "2026-09-30T00:00:00.000Z",
  });
  assert.equal(values.insert.sido, "인천광역시");
  assert.equal(values.insert.sigungu, "강화군");
  // conflict update에서도 sido/sigungu가 갱신되어야 한다 (F10) — 기존 코드는 이 필드를 빼먹었다.
  assert.equal(values.updateOnConflict.sido, "인천광역시");
  assert.equal(values.updateOnConflict.sigungu, "강화군");
});

test("upsert values include address/lat/lng/phone in the conflict-update branch", () => {
  const values = buildShelterUpsertValues({
    id: "apms-shelter-456",
    name: "이전한보호센터",
    address: "경기도 수원시 장안구 456",
    phone: "031-111-1111",
    lat: 37.1,
    lng: 127.1,
    now: "2026-09-30T00:00:00.000Z",
  });
  assert.equal(values.updateOnConflict.address, "경기도 수원시 장안구 456");
  assert.equal(values.updateOnConflict.lat, 37.1);
  assert.equal(values.updateOnConflict.lng, 127.1);
  assert.equal(values.updateOnConflict.phone, "031-111-1111");
});
