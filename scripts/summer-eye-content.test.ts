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

test("cat summer guide uses symptom-based emergency guidance", () => {
  const article = recordSlice("db/seeds/blog-posts-17.ts", "cat-summer-safety-guide");
  assert.match(article, /merckvetmanual\.com\/special-pet-topics\/emergencies/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /40\.5℃|39\.7℃|1초 이내|26℃ 이하|24-26℃/);
});

test("dog eye guide does not diagnose by discharge colour or prescribe a wait", () => {
  const article = recordSlice("db/seeds/blog-posts-17.ts", "dog-eye-care-guide");
  assert.match(article, /merckvetmanual\.com\/dog-owners\/eye-disorders-of-dogs\/disorders-of-the-cornea/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /세균성 결막염 또는 각막 감염 의심|48시간 내|장두종 대비 눈에 띄게 높다|생리식염수는 임시 세척/);
});

test("summer paw guide removes fabricated incidence and rigid clock rules", () => {
  const article = recordSlice("db/seeds/blog-posts-20.ts", "dog-summer-paw-protection");
  assert.match(article, /aaha\.org\/resources\/how-to-protect-dog-paws-from-hot-pavement/);
  assert.match(article, /ymyl: true/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /단 5초|80% 이상|기온 32°C|오전 7시 이전|오후 7시 이후|10–15분|주 2–3회/);
});
