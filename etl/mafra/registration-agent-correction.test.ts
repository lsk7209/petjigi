import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@libsql/client";
import { planCorrection, RETYPE_SQL, retypeArgs, type StoredAgentRow } from "./registration-agent-correction";

const row = (over: Partial<StoredAgentRow>): StoredAgentRow => ({
  id: "mafra-regagent-a", type: "sale", name: "가", address: "서울 강남구 1", addressSigungu: "강남구", status: "active", updatedAt: "2026-10-01", ...over,
});

test("계획: 재분류·절단 의심 ID·시군구 불일치를 각각 집계한다", () => {
  const plan = planCorrection([
    row({ id: "x".repeat(100) }),
    row({ id: "b", type: "registration" }),
    row({ id: "c", addressSigungu: "원미구", address: "경기도 부천시 원미구 1" }),
  ]);
  assert.equal(plan.total, 3);
  assert.equal(plan.retype.length, 2);
  assert.equal(plan.possiblyTruncatedIds.length, 1);
  assert.deepEqual(plan.sigunguMismatch, ["c"]);
});

test("CAS UPDATE: 조회 이후 행이 바뀌었으면 적용되지 않고, 같으면 재분류만 바뀐다", async () => {
  const client = createClient({ url: ":memory:" });
  await client.execute("CREATE TABLE businesses (id TEXT PRIMARY KEY, source TEXT, type TEXT, category INTEGER, name TEXT, updated_at TEXT)");
  await client.execute("INSERT INTO businesses VALUES ('a','mafra_registration_agent','sale',1,'가','2026-10-01')");
  await client.execute("INSERT INTO businesses VALUES ('b','mafra_registration_agent','sale',1,'나','2026-10-02')");
  await client.execute("INSERT INTO businesses VALUES ('c','localdata','sale',1,'다','2026-10-01')");
  const a = row({ id: "a" });
  const b = row({ id: "b", updatedAt: "2026-10-01" }); // 조회 후 b가 변경된 상황
  const c = row({ id: "c" }); // 다른 출처는 건드리지 않아야 함
  const res = await client.batch([a, b, c].map((r) => ({ sql: RETYPE_SQL, args: retypeArgs(r, "now") })), "write");
  assert.deepEqual(res.map((r) => r.rowsAffected), [1, 0, 0]);
  const rows = (await client.execute("SELECT id, type, name FROM businesses ORDER BY id")).rows.map((r) => [r.id, r.type, r.name]);
  assert.deepEqual(rows, [["a", "registration", "가"], ["b", "sale", "나"], ["c", "sale", "다"]]);
  client.close();
});
