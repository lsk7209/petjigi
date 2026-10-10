import assert from "node:assert/strict";
import test from "node:test";
import {
  outcomeFromError,
  outcomeFromHttp,
  summarizeOutcomes,
} from "./notification-outcome";

test("HTTP 2xx만 성공이고 401/429/500은 실패", () => {
  assert.equal(outcomeFromHttp("x", 200).status, "success");
  assert.equal(outcomeFromHttp("x", 202).status, "success");
  for (const code of [401, 403, 429, 500])
    assert.equal(outcomeFromHttp("x", code).status, "failed");
});

test("일부 실패는 전체 failed + exitCode 1", () => {
  const s = summarizeOutcomes([
    outcomeFromHttp("a", 200),
    outcomeFromHttp("b", 500),
  ]);
  assert.equal(s.overall, "failed");
  assert.equal(s.failed, 1);
  assert.equal(s.exitCode, 1);
});

test("미설정은 실패가 아니며 success로 위장되지 않는다", () => {
  const s = summarizeOutcomes([
    { service: "GSC", status: "not_configured" },
    { service: "IndexNow", status: "not_configured" },
  ]);
  assert.equal(s.overall, "not_configured");
  assert.equal(s.exitCode, 0);
});

test("설정된 일부만 성공하고 나머지가 미설정이면 success", () => {
  const s = summarizeOutcomes([
    { service: "GSC", status: "not_configured" },
    outcomeFromHttp("IndexNow", 200),
  ]);
  assert.equal(s.overall, "success");
});

test("대상 없음은 별도 상태", () => {
  assert.equal(
    summarizeOutcomes([{ service: "notify", status: "no_targets" }]).overall,
    "no_targets",
  );
});

test("예외는 failed로 기록된다", () => {
  assert.equal(outcomeFromError("x", new Error("boom")).status, "failed");
});
