import assert from "node:assert/strict";
import test from "node:test";
import { parseStoredSources } from "./content-sources";

const LIST = ["가 출처", "나 출처"];

test("배열·JSON 문자열·이중 인코딩 문자열을 모두 배열로 정규화한다", () => {
  assert.deepEqual(parseStoredSources(LIST), LIST);
  assert.deepEqual(parseStoredSources(JSON.stringify(LIST)), LIST);
  assert.deepEqual(parseStoredSources(JSON.stringify(JSON.stringify(LIST))), LIST);
});

test("비어 있거나 해석 불가한 값은 빈 배열", () => {
  for (const v of [null, undefined, "", "  ", "not json", 3, {}, "[]", '"[]"']) {
    assert.deepEqual(parseStoredSources(v), []);
  }
});

test("빈 문자열 항목과 문자열이 아닌 항목은 제외한다", () => {
  assert.deepEqual(parseStoredSources(["a", " ", 1, null, " b "]), ["a", "b"]);
});
