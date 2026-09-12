import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("LOCALDATA 수집 실패는 기존 데이터를 일괄 삭제하지 않는다", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "etl/localdata/sync.ts"), "utf8");
  assert.match(source, /catch \(e\) \{[\s\S]*?break;/);
  assert.doesNotMatch(source, /db\s*\.\s*delete\s*\(\s*businesses\s*\)/);
});

test("복수 인허가는 관리번호 기반의 별도 레코드로 유지한다", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "etl/localdata/sync.ts"), "utf8");
  assert.match(source, /const id = `\$\{bsshCode\}-\$\{row\.mgtNo\}`/);
});
