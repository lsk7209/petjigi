import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const files = ["app/guide/pet-loss-care/page.tsx", "db/seeds/contents.ts"];

test("pet-loss guidance lists 109 and no longer the retired 1393 number", () => {
  for (const f of files) {
    const s = fs.readFileSync(f, "utf8");
    assert.equal(s.includes("1393"), false, f);
  }
  assert.ok(fs.readFileSync(files[0], "utf8").includes("109 (24시간)"));
});

test("pet-loss guidance does not tell readers to wait six months for help", () => {
  const s = fs.readFileSync(files[0], "utf8");
  assert.equal(s.includes("6개월 이상 어려울"), false);
});

test("pet-loss guide does not claim an unverified expert review", () => {
  const s = fs.readFileSync(files[0], "utf8");
  assert.equal(s.includes("동물행동심리 전문가"), false);
  assert.equal(/reviewerName|reviewedAt/.test(s), false);
  assert.ok(s.includes("펫지기 편집팀 작성"));
});
