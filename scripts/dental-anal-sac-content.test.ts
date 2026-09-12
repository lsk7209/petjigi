import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const source = fs.readFileSync(path.join(process.cwd(), "db/seeds/blog-posts-24.ts"), "utf8");

function recordSlice(slug: string): string {
  const start = source.indexOf(`slug: "${slug}"`);
  assert.notEqual(start, -1, `${slug} record should exist`);
  const next = source.indexOf("\n  {", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("dental scaling guide avoids universal schedules, prices and anesthesia statistics", () => {
  const article = recordSlice("dog-dental-scaling-guide");
  assert.match(article, /aaha\.org\/resources\/2019-aaha-dental-care-guidelines/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /80%|3배 이상|0\.05%|10만~20만|6~12개월에 1회|8~12시간 전부터/);
});

test("cat anal sac guide removes invented fixed risk and treatment claims", () => {
  const article = recordSlice("cat-anal-gland-guide");
  assert.match(article, /merckvetmanual\.com\/digestive-system\/diseases-of-the-rectum-and-anus\/anal-sac-disease/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /BCS 7\/9|가장 큰 위험 인자|세척 치료 1~2주/);
});

test("dog anal sac guide does not teach an unverified home procedure or fixed interval", () => {
  const article = recordSlice("dog-anal-gland-express-guide");
  assert.match(article, /집에서 무리하게 짜지 마세요/);
  assert.match(article, /merckvetmanual\.com\/digestive-system\/diseases-of-the-rectum-and-anus\/anal-sac-disease/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /엄지와 검지를 항문 좌우|안쪽으로 가볍게 누르면서|4~8주에 1회|2~4주에 1회|약 2~3배/);
});
