import { test } from "node:test";
import assert from "node:assert/strict";
import {
  setBoundedSearchCache,
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

type Entry = { expires: number };
const NOW = 1_000_000;
const live = (): Entry => ({ expires: NOW + 60_000 });
const fill = (n: number) => {
  const cache = new Map<string, Entry>();
  for (let i = 0; i < n; i++) cache.set(`k-${i}`, live());
  return cache;
};

test("새 항목 삽입: 500개가 찬 상태에서도 삽입 직후 500을 넘지 않고 가장 오래된 키가 밀려난다", () => {
  const cache = fill(SEARCH_CACHE_HARD_CAP);
  setBoundedSearchCache(cache, "new", live(), NOW);
  assert.equal(cache.size, SEARCH_CACHE_HARD_CAP);
  assert.equal(cache.has("new"), true);
  assert.equal(cache.has("k-0"), false);
});

test("기존 키 갱신: 크기가 늘지 않고 최신 항목으로 이동한다", () => {
  const cache = fill(SEARCH_CACHE_HARD_CAP);
  setBoundedSearchCache(cache, "k-0", live(), NOW);
  assert.equal(cache.size, SEARCH_CACHE_HARD_CAP);
  assert.equal([...cache.keys()].at(-1), "k-0");
  setBoundedSearchCache(cache, "another", live(), NOW);
  assert.equal(cache.has("k-0"), true);
  assert.equal(cache.has("k-1"), false);
});

test("만료 항목 정리: 상한 초과 시 유효 항목보다 만료 항목을 먼저 제거한다", () => {
  const cache = fill(SEARCH_CACHE_HARD_CAP - 1);
  cache.set("expired", { expires: NOW - 1 });
  setBoundedSearchCache(cache, "new", live(), NOW);
  assert.equal(cache.size, SEARCH_CACHE_HARD_CAP);
  assert.equal(cache.has("expired"), false);
  assert.equal(cache.has("k-0"), true);
});

test("연속 삽입 1000건에도 상한을 넘지 않는다", () => {
  const cache = new Map<string, Entry>();
  for (let i = 0; i < 1000; i++) {
    setBoundedSearchCache(cache, `k-${i}`, live(), NOW);
    assert.ok(cache.size <= SEARCH_CACHE_HARD_CAP);
  }
});
