import assert from "node:assert/strict";
import test from "node:test";
import { resolveLastmod } from "./lastmod";

test("수정일이 발행일보다 과거이면 발행일을 사용한다", () => {
  assert.equal(resolveLastmod("2026-05-01T00:00:00.000Z", "2026-07-21T09:00:00.000Z"), "2026-07-21");
});

test("수정일이 더 최신이면 수정일을 사용한다", () => {
  assert.equal(resolveLastmod("2026-09-01T00:00:00.000Z", "2026-07-21T09:00:00.000Z"), "2026-09-01");
});

test("날짜가 없거나 잘못되면 null (임의 날짜를 만들지 않는다)", () => {
  assert.equal(resolveLastmod(null, null), null);
  assert.equal(resolveLastmod("not-a-date", null), null);
});
