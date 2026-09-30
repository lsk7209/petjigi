import { test } from "node:test";
import assert from "node:assert/strict";
import {
  enforceSearchCacheCap,
  isValidSearchQueryLength,
  likeLiteralPattern,
  isSupportedSearchType,
  SEARCH_CACHE_HARD_CAP,
} from "./search-query";

test("query shorter than 2 code points is invalid", () => {
  assert.equal(isValidSearchQueryLength("ا"), false);
  assert.equal(isValidSearchQueryLength(""), false);
});

test("2-character query is valid", () => {
  assert.equal(isValidSearchQueryLength("병원"), true);
});

test("101-character query is rejected, 100-character is accepted", () => {
  assert.equal(isValidSearchQueryLength("a".repeat(101)), false);
  assert.equal(isValidSearchQueryLength("a".repeat(100)), true);
});

test("unsupported type values are rejected", () => {
  assert.equal(isSupportedSearchType(null), true);
  assert.equal(isSupportedSearchType("business"), true);
  assert.equal(isSupportedSearchType("guide"), true);
  assert.equal(isSupportedSearchType("condition"), false);
  assert.equal(isSupportedSearchType("blog"), false);
});

test("% and _ are escaped as literals, not wildcards", () => {
  assert.equal(likeLiteralPattern("50%"), "%50\\%%");
  assert.equal(likeLiteralPattern("a_b"), "%a\\_b%");
  assert.equal(likeLiteralPattern("%%"), "%\\%\\%%");
});

test("cache never exceeds the hard cap of 500 active entries", () => {
  const cache = new Map<string, { expires: number }>();
  const now = 1_000_000;
  for (let i = 0; i < 501; i++) {
    cache.set(`key-${i}`, { expires: now + 60_000 }); // 모두 유효(만료 안 됨)
    enforceSearchCacheCap(cache, now);
  }
  assert.ok(cache.size <= SEARCH_CACHE_HARD_CAP, `cache size ${cache.size} exceeds hard cap`);
});

test("expired entries are purged before evicting active ones", () => {
  const cache = new Map<string, { expires: number }>();
  const now = 1_000_000;
  cache.set("expired-1", { expires: now - 1000 });
  cache.set("expired-2", { expires: now - 1000 });
  for (let i = 0; i < SEARCH_CACHE_HARD_CAP - 1; i++) {
    cache.set(`active-${i}`, { expires: now + 60_000 });
  }
  assert.equal(cache.size, SEARCH_CACHE_HARD_CAP + 1);
  enforceSearchCacheCap(cache, now);
  assert.equal(cache.has("expired-1"), false);
  assert.equal(cache.has("expired-2"), false);
  assert.ok(cache.size <= SEARCH_CACHE_HARD_CAP);
});
