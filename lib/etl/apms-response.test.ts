import { test } from "node:test";
import assert from "node:assert/strict";
import { parseApmsResponse } from "./apms-response";

test("HTTP 200 with a normal single-page body is a successful page", () => {
  const result = parseApmsResponse({
    httpOk: true,
    httpStatus: 200,
    json: { response: { header: { resultCode: "00" }, body: { items: { item: [{ id: "1" }] }, totalCount: 1 } } },
  });
  assert.equal(result.kind, "ok");
  if (result.kind === "ok") {
    assert.equal(result.totalCount, 1);
    assert.deepEqual(result.items, [{ id: "1" }]);
  }
});

test("HTTP 500 is a hard failure, not an empty successful page", () => {
  const result = parseApmsResponse({ httpOk: false, httpStatus: 500, json: null });
  assert.equal(result.kind, "failed");
});

test("HTTP 200 with a business error resultCode is a failure, not success", () => {
  const result = parseApmsResponse({
    httpOk: true,
    httpStatus: 200,
    json: { response: { header: { resultCode: "99", resultMsg: "INVALID_REQUEST_PARAMETER_ERROR" }, body: null } },
  });
  assert.equal(result.kind, "failed");
});

test("missing body with HTTP 200 and no resultCode is a failure, not an empty success", () => {
  const result = parseApmsResponse({ httpOk: true, httpStatus: 200, json: {} });
  assert.equal(result.kind, "failed");
});

test("malformed JSON (parse already failed upstream) is represented as failed", () => {
  const result = parseApmsResponse({ httpOk: true, httpStatus: 200, json: null });
  assert.equal(result.kind, "failed");
});

test("a genuinely empty result set (totalCount 0, no items) is a distinct 'empty' success, not failed", () => {
  const result = parseApmsResponse({
    httpOk: true,
    httpStatus: 200,
    json: { response: { header: { resultCode: "00" }, body: { items: "", totalCount: 0 } } },
  });
  assert.equal(result.kind, "ok");
  if (result.kind === "ok") {
    assert.equal(result.totalCount, 0);
    assert.deepEqual(result.items, []);
  }
});

test("single item object (not array) is normalized to a one-element array", () => {
  const result = parseApmsResponse({
    httpOk: true,
    httpStatus: 200,
    json: { response: { header: { resultCode: "00" }, body: { items: { item: { id: "solo" } }, totalCount: 1 } } },
  });
  assert.equal(result.kind, "ok");
  if (result.kind === "ok") assert.deepEqual(result.items, [{ id: "solo" }]);
});
