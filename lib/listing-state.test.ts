import assert from "node:assert/strict";
import test from "node:test";
import { classifyListing } from "./listing-state";

const NOW = new Date("2026-10-10T00:00:00Z");

test("수집 이력이 있고 결과가 0건이면 정상 0건(empty_confirmed)", () => {
  assert.equal(classifyListing(0, "2026-10-09T03:00:00Z", NOW).state, "empty_confirmed");
});

test("수집 이력이 없으면 0건이 아니라 not_collected", () => {
  const r = classifyListing(0, null, NOW);
  assert.equal(r.state, "not_collected");
  assert.equal(r.asOf, null);
});

test("결과가 있으면 available, 오래된 기준일은 stale", () => {
  assert.equal(classifyListing(3, "2026-10-01", NOW).stale, false);
  const r = classifyListing(3, "2026-05-21T00:00:00Z", NOW);
  assert.equal(r.state, "available");
  assert.equal(r.stale, true);
});

test("잘못된 날짜는 수집 이력으로 보지 않는다", () => {
  assert.equal(classifyListing(0, "garbage", NOW).state, "not_collected");
});
