import { test } from "node:test";
import assert from "node:assert/strict";
import { buildNotificationCandidates } from "./notification-candidates";

const NOW = new Date("2026-09-30T00:00:00.000Z");

test("published guide/blog/condition within the window become notification candidates", () => {
  const rows = [
    { slug: "a", type: "guide", status: "published", publishedAt: "2026-09-20T00:00:00.000Z" },
    { slug: "b", type: "blog", status: "published", publishedAt: "2026-09-21T00:00:00.000Z" },
    { slug: "c", type: "condition", status: "published", publishedAt: "2026-09-22T00:00:00.000Z" },
  ];
  const result = buildNotificationCandidates(rows, NOW);
  assert.equal(result.length, 3);
});

test("future-dated published rows are excluded even if status is published", () => {
  const rows = [
    { slug: "future", type: "guide", status: "published", publishedAt: "2026-10-01T00:00:00.000Z" },
  ];
  const result = buildNotificationCandidates(rows, NOW);
  assert.equal(result.length, 0);
});

test("review_queue rows are excluded", () => {
  const rows = [
    { slug: "draft", type: "guide", status: "review_queue", publishedAt: "2020-01-01T00:00:00.000Z" },
  ];
  const result = buildNotificationCandidates(rows, NOW);
  assert.equal(result.length, 0);
});

test("unsupported types (e.g. breed rows stored in contents) are excluded, not defaulted to guide", () => {
  const rows = [
    { slug: "poodle", type: "breed", status: "published", publishedAt: "2026-09-20T00:00:00.000Z" },
    { slug: "overlay", type: "business_overlay", status: "published", publishedAt: "2026-09-20T00:00:00.000Z" },
  ];
  const result = buildNotificationCandidates(rows, NOW);
  assert.equal(result.length, 0);
});

test("candidates carry the correct href for their type", () => {
  const rows = [{ slug: "pet-death-legal-guide", type: "blog", status: "published", publishedAt: "2026-09-01T00:00:00.000Z" }];
  const result = buildNotificationCandidates(rows, NOW);
  assert.equal(result[0].path, "/blog/pet-death-legal-guide");
});
