import assert from "node:assert/strict";
import test from "node:test";
import { createClient, type Client } from "@libsql/client";
import { collapseListingDuplicates, listingSitemapSql, notDuplicateListingSql } from "./listing-identity";
import { sidoNameVariants } from "./sido-names";

interface Row {
  id: string; name: string; address: string | null; sigungu?: string; type?: string; status?: string; synced?: string;
}
const MAY = "2026-05-01T00:00:00.000Z";
const OCT = "2026-10-13T00:00:00.000Z";

async function setup(rows: Row[]): Promise<Client> {
  const c = createClient({ url: ":memory:" });
  await c.execute("CREATE TABLE businesses (id TEXT PRIMARY KEY, type TEXT NOT NULL, name TEXT NOT NULL, address TEXT, address_sigungu TEXT, status TEXT NOT NULL, last_synced_at TEXT NOT NULL)");
  await c.execute("CREATE TABLE regions (sigungu TEXT, sigungu_slug TEXT)");
  await c.execute({ sql: "INSERT INTO regions VALUES (?, ?)", args: ["테스트구", "test-gu"] });
  for (const r of rows) {
    await c.execute({
      sql: "INSERT INTO businesses VALUES (?,?,?,?,?,?,?)",
      args: [r.id, r.type ?? "vet", r.name, r.address, r.sigungu ?? "테스트구", r.status ?? "active", r.synced ?? OCT],
    });
  }
  return c;
}
const listed = async (c: Client) =>
  (await c.execute(`SELECT id FROM businesses WHERE status='active' AND ${notDuplicateListingSql("businesses")} ORDER BY id`)).rows.map((r) => String(r.id));
const sitemapHas = async (c: Client, min = 3) =>
  (await c.execute({ sql: listingSitemapSql(), args: [min] })).rows.length > 0;

test("실제 2곳이 출처별로 2번 저장된 4행: 목록 2곳, 사이트맵 제외", async () => {
  const c = await setup([
    { id: "a1", name: "가", address: "서울 테스트구 1" }, { id: "a2", name: "가", address: "서울 테스트구 1" },
    { id: "b1", name: "나", address: "서울 테스트구 2" }, { id: "b2", name: "나", address: "서울 테스트구 2" },
  ]);
  assert.equal((await listed(c)).length, 2);
  assert.equal(await sitemapHas(c), false);
});

test("서로 다른 실제 업체 3곳은 사이트맵 포함, 중복이 섞여도 목록 수와 같다", async () => {
  const c = await setup([
    { id: "a1", name: "가", address: "1" }, { id: "b1", name: "나", address: "2" }, { id: "c1", name: "다", address: "3" },
    { id: "c2", name: "다", address: "3" },
  ]);
  assert.equal((await listed(c)).length, 3);
  assert.equal(await sitemapHas(c), true);
});

test("동명·다른 주소 업체는 합치지 않는다", async () => {
  const c = await setup([{ id: "a1", name: "같은이름", address: "1" }, { id: "a2", name: "같은이름", address: "2" }]);
  assert.deepEqual(await listed(c), ["a1", "a2"]);
});

test("주소 NULL·빈 문자열·마스킹 주소는 같은 업체로 확정하지 않는다", async () => {
  const c = await setup([
    { id: "n1", name: "가", address: null }, { id: "n2", name: "가", address: null },
    { id: "e1", name: "나", address: "" }, { id: "e2", name: "나", address: "  " },
    { id: "m1", name: "다", address: "서울 테스트구 ***" }, { id: "m2", name: "다", address: "서울 테스트구 ***" },
  ]);
  assert.equal((await listed(c)).length, 6);
});

test("작은 id가 오래된 행이면 id 순서가 아니라 최신 동기화 행을 대표로 쓴다", async () => {
  const c = await setup([
    { id: "a1", name: "가", address: "1", synced: MAY }, { id: "a9", name: "가", address: "1", synced: OCT },
    { id: "t1", name: "나", address: "2" }, { id: "t2", name: "나", address: "2" },
  ]);
  assert.deepEqual(await listed(c), ["a9", "t1"]);
});

test("closed 행은 대표 선택과 건수에서 active 행을 가리지 않는다", async () => {
  const c = await setup([
    { id: "a1", name: "가", address: "1", status: "closed", synced: OCT }, { id: "a2", name: "가", address: "1", synced: MAY },
  ]);
  assert.deepEqual(await listed(c), ["a2"]);
});

test("SQL 판정은 JS 판정(collapseListingDuplicates)과 같은 행을 남긴다", async () => {
  const rows: Row[] = [
    { id: "a1", name: "가", address: "1", synced: MAY }, { id: "a9", name: "가", address: "1", synced: OCT },
    { id: "b1", name: "나", address: "2" }, { id: "b2", name: "나", address: "2" },
    { id: "m1", name: "다", address: "*" }, { id: "m2", name: "다", address: "*" },
    { id: "n1", name: "라", address: null }, { id: "x1", name: "마", address: "3", status: "closed" },
    { id: "d1", name: "바", address: "4", type: "boarding" }, { id: "d2", name: "바", address: "4", type: "vet" },
  ];
  const c = await setup(rows);
  const js = collapseListingDuplicates(rows.map((r) => ({ id: r.id, type: r.type ?? "vet", name: r.name, address: r.address, status: r.status ?? "active", lastSyncedAt: r.synced ?? OCT })))
    .filter((r) => r.status === "active").map((r) => r.id).sort();
  assert.deepEqual(await listed(c), js);
});

test("시도 표기 변형은 개명 전후만 묶고 다른 시도와 섞지 않는다", () => {
  assert.deepEqual(sidoNameVariants("강원특별자치도").sort(), ["강원도", "강원특별자치도"].sort());
  assert.deepEqual(sidoNameVariants("서울특별시"), ["서울특별시"]);
});
