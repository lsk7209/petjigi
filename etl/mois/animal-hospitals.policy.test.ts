import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

// ETL은 import 시 실행되므로 소스 정책만 정적으로 고정한다.
const src = fs.readFileSync("etl/mois/animal-hospitals.ts", "utf8");

test("포털 API 최대 페이지 크기(100)를 기준으로 전체 페이지를 순회한다", () => {
  assert.match(src, /const PAGE_SIZE = 100;/);
  assert.match(src, /Math\.ceil\(first\.total \/ PAGE_SIZE\)/);
  assert.equal(/numOfRows = 1000|total \/ 1000/.test(src), false);
});

test("영업 중(01) 외 상태는 모두 closed이고 신규 폐업 업체는 적재하지 않는다", () => {
  assert.match(src, /=== "01" \? "active" : "closed"/);
  assert.match(src, /!existing && status === "closed"/);
});

test("CSV 적재(ld-vet-)와 같은 관리번호는 중복 행을 만들지 않고 그 행을 갱신한다", () => {
  assert.match(src, /ld-vet-\$\{row\.MNG_NO\}/);
  assert.match(src, /if \(twin && twinId\)[\s\S]*continue;/);
});
