import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("rescue page reads run-level attempt and success timestamps separately", () => {
  const query = fs.readFileSync("lib/db-queries.ts", "utf8");
  const page = fs.readFileSync("app/rescue/page.tsx", "utf8");

  assert.match(query, /etlSyncState\.lastAttemptAt/);
  assert.match(query, /etlSyncState\.lastSuccessfulAt/);
  assert.match(query, /eq\(etlSyncState\.jobName, "rescued-animals"\)/);
  assert.match(page, /수집 예정: 매일 05:00 KST/);
  assert.match(page, /마지막 수집 시도:/);
  assert.match(page, /마지막 성공 수집:/);
  assert.match(page, /원본 기준일은 각 공고의 공고일/);
  assert.doesNotMatch(page, /매일 05:00 갱신/);
});
