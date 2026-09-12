import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("응급 동물병원 준비 글은 건강 카테고리와 확인 가능한 응급 출처를 사용한다", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "db/seeds/blog-posts-66.ts"), "utf8");
  const start = source.indexOf('slug: "pet-emergency-vet-preparation"');
  const end = source.indexOf('slug: "dog-degenerative-myelopathy-guide"', start);
  const record = source.slice(start, end);
  assert.ok(start >= 0 && end > start);
  assert.match(record, /category: 3/);
  assert.doesNotMatch(record, /category: 4|법률·제도 정보 큐레이터|발작이 5분 이상/);
  assert.match(record, /https:\/\/www\.aaha\.org\/resources\/help-is-this-a-pet-emergency\//);
  assert.match(record, /https:\/\/ebusiness\.avma\.org\/files\/ProductDownloads\/mcm-client-brochures-pet-first-aid-2025\.pdf/);
});
