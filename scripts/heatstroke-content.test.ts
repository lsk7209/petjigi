import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const seed = fs.readFileSync("db/seeds/guides-batch-3.ts", "utf8");
const start = seed.indexOf('slug: "pet-heatstroke-prevention-complete-guide"');
const end = seed.indexOf('slug: "dog-parasite-prevention-guide"');
const body = seed.slice(start, end);

test("heatstroke guide drops the contradicted tepid-water-only advice", () => {
  assert.ok(start > 0 && end > start);
  assert.equal(body.includes("차가운 물은 혈관을 수축시켜"), false);
  assert.equal(body.includes("25~30℃"), false);
  assert.ok(body.includes("먼저 체온을 낮추기 시작하고, 이동은 그다음"));
});

test("heatstroke guide has no unsourced fixed thresholds", () => {
  for (const banned of ["37.5~39.5", "41℃ 이상", "10분 내 40", "오전 7시", "오후 7시", "26℃ 이하", "2배 이상", "7초"]) {
    assert.equal(body.includes(banned), false, banned);
  }
});

test("heatstroke guide scopes evidence to dogs, defers cats to the vet, and links the source", () => {
  assert.ok(body.includes("개 대상 연구 기반"));
  assert.ok(body.includes("고양이의 냉각 방법은 연구가 상대적으로 적으므로"));
  assert.ok(body.includes("rvc.ac.uk/vetcompass/news/the-rvc-urges-owners-of-hot-dogs-to-cool-first-transport-second"));
});
