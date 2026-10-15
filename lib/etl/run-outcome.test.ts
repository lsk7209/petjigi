import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyEtlRun, type PageOutcome } from "./run-outcome";

test("all pages ok and page count matches expected pages => complete", () => {
  const pages: PageOutcome[] = [
    { kind: "ok", itemCount: 1000 },
    { kind: "ok", itemCount: 1000 },
    { kind: "ok", itemCount: 500 },
  ];
  const result = classifyEtlRun(pages, { expectedPages: 3 });
  assert.equal(result.outcome, "complete");
});

test("an empty page before the declared last page => partial, not complete", () => {
  const pages: PageOutcome[] = [
    { kind: "ok", itemCount: 1000 },
    { kind: "ok", itemCount: 0 }, // 중간에 빈 페이지 — API가 데이터를 다 안 준 상황
  ];
  const result = classifyEtlRun(pages, { expectedPages: 3 });
  assert.equal(result.outcome, "partial");
});

test("any failed page makes the whole run failed, even if earlier pages were ok", () => {
  const pages: PageOutcome[] = [
    { kind: "ok", itemCount: 1000 },
    { kind: "failed", reason: "HTTP 500" },
  ];
  const result = classifyEtlRun(pages, { expectedPages: 3 });
  assert.equal(result.outcome, "failed");
});

test("zero total pages with a genuinely empty first page => complete with zero items", () => {
  const pages: PageOutcome[] = [{ kind: "ok", itemCount: 0 }];
  const result = classifyEtlRun(pages, { expectedPages: 1 });
  assert.equal(result.outcome, "complete");
  assert.equal(result.totalItems, 0);
});

test("no pages at all (e.g. first count call failed) => failed", () => {
  const result = classifyEtlRun([], { expectedPages: 3 });
  assert.equal(result.outcome, "failed");
});

test("only a 'complete' outcome should be allowed to update lastSuccessfulAt", () => {
  const complete = classifyEtlRun([{ kind: "ok", itemCount: 10 }], { expectedPages: 1 });
  const partial = classifyEtlRun(
    [{ kind: "ok", itemCount: 10 }, { kind: "ok", itemCount: 0 }],
    { expectedPages: 3 }
  );
  assert.equal(shouldRecordSuccess(complete.outcome), true);
  assert.equal(shouldRecordSuccess(partial.outcome), false);
  assert.equal(shouldRecordSuccess("failed"), false);
});

function shouldRecordSuccess(outcome: string): boolean {
  return outcome === "complete";
}

import { classifyEtlRun as classifyWithItems } from "./run-outcome";

test("expectedItems보다 적게 읽으면 페이지 수가 맞아도 partial", () => {
  const pages = [{ kind: "ok" as const, itemCount: 100 }, { kind: "ok" as const, itemCount: 60 }];
  assert.equal(classifyWithItems(pages, { expectedPages: 2, expectedItems: 200 }).outcome, "partial");
  assert.equal(classifyWithItems(pages, { expectedPages: 2, expectedItems: 160 }).outcome, "complete");
});
