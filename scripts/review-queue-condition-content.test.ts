import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const batch1 = fs.readFileSync("db/seeds/conditions-batch-1.ts", "utf8");
const batch2 = fs.readFileSync("db/seeds/conditions-batch-2.ts", "utf8");

test("all review-queue condition records include traceable sources", () => {
  const sourceDeclarations = `${batch1}\n${batch2}`.match(/sources:\s*\[/g) ?? [];
  assert.equal(sourceDeclarations.length, 11);
  assert.doesNotMatch(`${batch1}\n${batch2}`, /수의사 검토를 거쳐/);
});
test("condition drafts avoid unsupported prevalence, emergency delays and fixed protocols", () => {
  const content = `${batch1}\n${batch2}`;
  for (const unsupported of [
    "국내 소형견의 상당수",
    "하루 5회 이상",
    "소변이 12시간 이상",
    "24~48시간 내 사망",
    "10세 이상 노령묘의 30~40%",
    "국내 반려견의 약 30~40%",
    "월 1~2% 감량",
    "수술 성공률은 90% 이상",
    "재발률: 5~10%",
    "체중 1kg 감량만으로도",
  ]) {
    assert.doesNotMatch(content, new RegExp(unsupported.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
