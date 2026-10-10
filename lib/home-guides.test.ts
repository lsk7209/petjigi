import assert from "node:assert/strict";
import test from "node:test";
import { pickHomeGuides, type HomeContentRow } from "./home-guides";

const row = (slug: string, category: number | null, publishedAt: string | null): HomeContentRow => ({
  slug,
  title: slug,
  category,
  publishedAt,
});

test("홈 가이드는 서로 다른 카테고리를 먼저 고르고 카테고리별 썸네일을 쓴다", () => {
  const cards = pickHomeGuides(
    [row("a", 5, "2026-10-08"), row("b", 5, "2026-10-07"), row("c", 3, "2026-10-06")],
    [row("d", 2, "2026-10-05"), row("e", 4, "2026-10-04")],
  );
  assert.deepEqual(cards.map((c) => c.categoryId), [5, 3, 2, 4]);
  assert.equal(new Set(cards.map((c) => c.thumb)).size, 4);
  assert.equal(cards[0].href, "/guide/a");
  assert.equal(cards[2].href, "/blog/d");
});

test("카테고리가 모자라면 최신순으로 채우고 값이 없으면 빈 배열이다", () => {
  const cards = pickHomeGuides([row("a", 5, "2026-10-08"), row("b", 5, "2026-10-07")], []);
  assert.deepEqual(cards.map((c) => c.href), ["/guide/a", "/guide/b"]);
  assert.deepEqual(pickHomeGuides([], []), []);
});

test("알 수 없는 카테고리는 케어·라이프로 처리한다", () => {
  const [card] = pickHomeGuides([row("x", 99, null)], []);
  assert.equal(card.categoryId, 5);
});
