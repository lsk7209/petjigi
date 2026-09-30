import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyIndexingResponses } from "./indexing-outcome";

test("HTTP 200 counts as accepted", () => {
  const result = classifyIndexingResponses([{ url: "https://x/a", status: 200 }]);
  assert.equal(result.accepted, 1);
  assert.equal(result.failed, 0);
});

test("HTTP 401/429/500 count as failed, not accepted", () => {
  const result = classifyIndexingResponses([
    { url: "https://x/a", status: 401 },
    { url: "https://x/b", status: 429 },
    { url: "https://x/c", status: 500 },
  ]);
  assert.equal(result.accepted, 0);
  assert.equal(result.failed, 3);
});

test("mixed batch reports both counts accurately", () => {
  const result = classifyIndexingResponses([
    { url: "https://x/a", status: 200 },
    { url: "https://x/b", status: 200 },
    { url: "https://x/c", status: 500 },
  ]);
  assert.equal(result.accepted, 2);
  assert.equal(result.failed, 1);
});

test("network-level errors (no status) are also failed, not silently dropped", () => {
  const result = classifyIndexingResponses([{ url: "https://x/a", status: null, error: "timeout" }]);
  assert.equal(result.failed, 1);
  assert.equal(result.accepted, 0);
});
