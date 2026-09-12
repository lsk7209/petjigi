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

test("toxic-plant guides keep species scope and remove unsupported timing/statistics", () => {
  const dog = recordSlice("db/seeds/blog-posts-20.ts", "pet-toxic-plants-dog-guide");
  const cat = recordSlice("db/seeds/blog-posts-20.ts", "pet-toxic-plants-cat-guide");

  assert.match(dog, /dogs-plant-list/);
  assert.doesNotMatch(dog, /25% 이상|자일리톨 함유 식물|30분 이내/);
  assert.match(cat, /Lilium·Hemerocallis/);
  assert.match(cat, /merckvetmanual\.com/);
  assert.doesNotMatch(cat, /백합\(Lily\) 전체 계열|18시간 이내|생존율이 유의미/);
});

test("emergency-kit guide uses AVMA sources without unsupported survival claims", () => {
  const article = recordSlice("db/seeds/blog-posts-17.ts", "pet-emergency-kit-guide");
  assert.match(article, /mcm-client-brochures-pet-first-aid-2025\.pdf/);
  assert.match(article, /disclaimer:/);
  assert.doesNotMatch(article, /생존율은 큰 차이가 없거나|5분 이상 압박|6개월마다 유효기간/);
});
