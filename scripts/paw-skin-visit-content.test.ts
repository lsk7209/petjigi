import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

function recordSlice(slug: string): string {
  const source = fs.readFileSync(path.join(process.cwd(), "db/seeds/blog-posts-17.ts"), "utf8");
  const start = source.indexOf(`slug: "${slug}"`);
  assert.notEqual(start, -1, `${slug} record should exist`);
  const next = source.indexOf("\n  {", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("paw guide uses source-scoped care without rigid home-treatment timers", () => {
  const article = recordSlice("dog-paw-care-guide");
  assert.match(article, /aaha\.org\/resources\/how-to-protect-dog-paws-from-hot-pavement/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /5초 테스트|10분 냉각|주 2-3회|3-4일|공기 온도가 32℃/);
});

test("skin guide avoids unsupported rankings and universal schedules", () => {
  const article = recordSlice("dog-skin-care-guide");
  assert.match(article, /merckvetmanual\.com\/integumentary-system\/atopic-skin-conditions/);
  assert.match(article, /merckvetmanual\.com\/dog-owners\/skin-disorders-of-dogs\/itching-pruritus/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /상위 5위|단모종은 4주|장모종은 2주|2주 이상 지속|pH는 5\.5|6\.5-7\.5|40-60%/);
});

test("vet visit guide defers fasting and triage to the treating team", () => {
  const article = recordSlice("pet-vet-visit-guide");
  assert.match(article, /aaha\.org\/resources\/preparing-your-pet-for-a-successful-veterinary-visit/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /AVMA의 2022년 조사|38%|24시간 이상 식음 전폐|다음 날 일반 병원 방문이 적합|병원 방문 1-2주 전|혈액 검사\(공복 기준/);
});
