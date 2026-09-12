import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

function recordSlice(file: string, slug: string): string {
  const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
  const start = source.indexOf(`slug: "${slug}"`);
  assert.notEqual(start, -1, `${slug} record should exist`);
  const next = source.indexOf("\n  {", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("online consultation guide avoids stale market claims and remote diagnosis promises", () => {
  const article = recordSlice("db/seeds/blog-posts-22.ts", "online-vet-consultation-guide");
  assert.match(article, /law\.go\.kr\/LSW\/lsInfoP\.do/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /약 28%|두 배 이상|펫닥\(VetDoc\)|어바웃펫|24시간 이상 식음 전폐|상담 정확도가 유의미하게/);
});

test("seasonal allergy guide keeps diagnosis and treatment individualized", () => {
  const article = recordSlice("db/seeds/blog-posts-20.ts", "pet-allergy-season-guide");
  assert.match(article, /merckvetmanual\.com\/integumentary-system\/atopic-skin-conditions/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /약 10~15%|방문 사유 1위|3–5월|8–10월|60°C 이상|월 1회 주사|6–12개월|주 1–2회 목욕/);
});

test("human pet allergy guide removes unsupported prevalence and efficacy percentages", () => {
  const article = recordSlice("db/seeds/blog-posts-24.ts", "pet-human-allergy-guide");
  assert.match(article, /niehs\.nih\.gov\/health\/topics\/agents\/allergens\/pets/);
  assert.match(article, /aaaai\.org\/conditions-treatments\/allergies\/pet-allergy/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /약 10~20%|약 절반|20~30분 내|최대 50~60%|3~5년 치료|주 1~2회 목욕/);
});
