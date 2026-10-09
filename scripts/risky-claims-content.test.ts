import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (f: string) => fs.readFileSync(f, "utf8");

test("neutering guide does not claim blanket cancer prevention", () => {
  const s = read("db/seeds/blog-posts-14.ts");
  assert.equal(s.includes("고환암 100% 예방, 전립선"), false);
  assert.ok(s.includes("모든 암을 예방하는 것은 아니며"));
});

test("arthritis guide does not state a drug has no side effects", () => {
  const s = read("db/seeds/blog-posts-34.ts");
  assert.equal(s.includes("소화기 부작용 없음</li>"), false);
  assert.ok(s.includes("부작용이 전혀 없는 것은 아니므로"));
});

test("omega-3 guide gives no mg/kg dosing numbers", () => {
  const s = read("db/seeds/blog-posts-52.ts");
  assert.equal(/\d\s*mg\/kg|1kg당 EPA\+DHA|50~100mg\/일|150~300mg/.test(s), false);
  assert.ok(s.includes("용량은 수의사와 정하세요"));
});
