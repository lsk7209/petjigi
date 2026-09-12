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

test("dog flea and tick guide fixes the permethrin species reversal", () => {
  const article = recordSlice("dog-flea-tick-guide");

  assert.match(article, /일부 개용 퍼메스린/);
  assert.match(article, /fda\.gov\/consumers\/consumer-updates\/safe-use-flea-and-tick-products-pets/);
  assert.match(article, /epa\.gov\/pets\/controlling-fleas-and-ticks-your-pet/);
  assert.match(article, /capcvet\.org\/guidelines\/fleas/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /고양이용 예방 제품에는 퍼메스린|24시간에 최대 50개|목욕 24시간|4-8개월/);
});

test("cat flea and tick guide keeps product timing label-specific", () => {
  const article = recordSlice("cat-flea-tick-prevention");

  assert.match(article, /완전히 마를 때까지/);
  assert.match(article, /fda\.gov\/consumers\/consumer-updates\/safe-use-flea-and-tick-products-pets/);
  assert.match(article, /epa\.gov\/pets\/controlling-fleas-and-ticks-your-pet/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /피부 질환 1위|24시간 이상 분리|60℃ 이상|2주 후 추가 약물/);
});

test("heartworm guide removes an unsupported cure rate and fixed follow-up date", () => {
  const article = recordSlice("dog-heartworm-treatment-guide");

  assert.match(article, /heartwormsociety\.org\/veterinary-resources\/american-heartworm-society-guidelines\/canine/);
  assert.match(article, /AHS는 멜라소민\(melarsomine\) 3회 주사 방식을 권고/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /95% 이상|완치된다|치료 종료 후 6개월|일시적 증가는 정상|최종 주사 후 30일까지/);
});
