import { test } from "node:test";
import assert from "node:assert/strict";
import { buildSearchEventPayload, queryLengthBucket } from "./search-telemetry";

test("payload never contains the raw query text", () => {
  const payload = buildSearchEventPayload({ query: "hong+gildong@example.com", resultsCount: 3 });
  const serialized = JSON.stringify(payload);
  assert.equal(serialized.includes("hong"), false);
  assert.equal(serialized.includes("example.com"), false);
});

test("payload never contains a phone-number-like query", () => {
  const payload = buildSearchEventPayload({ query: "010-1234-5678", resultsCount: 0 });
  const serialized = JSON.stringify(payload);
  assert.equal(serialized.includes("010-1234-5678"), false);
});

test("payload reports result count and a length bucket, not the query", () => {
  const payload = buildSearchEventPayload({ query: "강남구 동물병원", resultsCount: 5 });
  assert.equal(payload.results_count, 5);
  assert.equal(typeof payload.query_length_bucket, "string");
  assert.equal("search_term" in payload, false);
  assert.equal("query" in payload, false);
});

test("length bucket groups short/medium/long queries without exposing exact length", () => {
  assert.equal(queryLengthBucket(2), "1-5");
  assert.equal(queryLengthBucket(5), "1-5");
  assert.equal(queryLengthBucket(6), "6-15");
  assert.equal(queryLengthBucket(15), "6-15");
  assert.equal(queryLengthBucket(16), "16-50");
  assert.equal(queryLengthBucket(100), "51+");
});

test("cancelled/aborted searches are not represented by this payload builder at all", () => {
  // 취소된 검색은 애초에 buildSearchEventPayload를 호출하지 않아야 한다 — 계약 상 documented.
  // 여기서는 최소한 빈 쿼리에도 원문이 새지 않는지만 확인한다.
  const payload = buildSearchEventPayload({ query: "", resultsCount: 0 });
  assert.equal(JSON.stringify(payload).length > 0, true);
  assert.equal("search_term" in payload, false);
});
