import { test } from "node:test";
import assert from "node:assert/strict";
import { isPubliclyVisibleContent, PUBLIC_CONTENT_TYPES } from "./content-publication";

const NOW = new Date("2026-09-30T00:00:00.000Z");

test("published guide with past publishedAt is publicly visible", () => {
  const ok = isPubliclyVisibleContent(
    { status: "published", type: "guide", publishedAt: "2026-09-01T00:00:00.000Z" },
    NOW
  );
  assert.equal(ok, true);
});

test("published blog with past publishedAt is publicly visible", () => {
  const ok = isPubliclyVisibleContent(
    { status: "published", type: "blog", publishedAt: "2026-09-01T00:00:00.000Z" },
    NOW
  );
  assert.equal(ok, true);
});

test("published condition with past publishedAt is publicly visible", () => {
  const ok = isPubliclyVisibleContent(
    { status: "published", type: "condition", publishedAt: "2026-09-01T00:00:00.000Z" },
    NOW
  );
  assert.equal(ok, true);
});

test("publishedAt exactly equal to now is included", () => {
  const ok = isPubliclyVisibleContent(
    { status: "published", type: "guide", publishedAt: NOW.toISOString() },
    NOW
  );
  assert.equal(ok, true);
});

test("publishedAt one second in the future is excluded", () => {
  const future = new Date(NOW.getTime() + 1000).toISOString();
  const ok = isPubliclyVisibleContent(
    { status: "published", type: "guide", publishedAt: future },
    NOW
  );
  assert.equal(ok, false);
});

test("review_queue status is excluded regardless of publishedAt", () => {
  const ok = isPubliclyVisibleContent(
    { status: "review_queue", type: "guide", publishedAt: "2020-01-01T00:00:00.000Z" },
    NOW
  );
  assert.equal(ok, false);
});

test("draft status is excluded", () => {
  const ok = isPubliclyVisibleContent(
    { status: "draft", type: "guide", publishedAt: "2020-01-01T00:00:00.000Z" },
    NOW
  );
  assert.equal(ok, false);
});

test("missing or invalid publishedAt is excluded even if status is published", () => {
  assert.equal(
    isPubliclyVisibleContent({ status: "published", type: "guide", publishedAt: null }, NOW),
    false
  );
  assert.equal(
    isPubliclyVisibleContent({ status: "published", type: "guide", publishedAt: "not-a-date" }, NOW),
    false
  );
});

test("unsupported content type is excluded even when published and past", () => {
  const ok = isPubliclyVisibleContent(
    { status: "published", type: "business_overlay", publishedAt: "2026-09-01T00:00:00.000Z" },
    NOW
  );
  assert.equal(ok, false);
});

test("PUBLIC_CONTENT_TYPES only exposes routes that actually exist", () => {
  assert.deepEqual([...PUBLIC_CONTENT_TYPES].sort(), ["blog", "condition", "guide"]);
});
