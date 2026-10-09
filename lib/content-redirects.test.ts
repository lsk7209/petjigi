import assert from "node:assert/strict";
import test from "node:test";
import { CONTENT_REDIRECTS } from "./content-redirects";

test("리디렉션에 체인·루프·자기참조가 없다", () => {
  const froms = new Set(CONTENT_REDIRECTS.map((r) => r.from));
  assert.equal(froms.size, CONTENT_REDIRECTS.length, "from 중복");
  for (const r of CONTENT_REDIRECTS) {
    assert.notEqual(r.from, r.to);
    assert.ok(!froms.has(r.to), `${r.from} → ${r.to}: 대상이 다시 리디렉션됨`);
    assert.ok(r.to.startsWith("/") && r.from.startsWith("/"));
  }
});
