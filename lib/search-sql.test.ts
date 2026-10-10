import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { likeEscaped } from "./search-sql";
import { likeLiteralPattern } from "./search-query";

const items = sqliteTable("items", { name: text("name").notNull() });

async function search(rows: string[], q: string): Promise<string[]> {
  const client = createClient({ url: ":memory:" });
  const db = drizzle(client);
  await client.execute("CREATE TABLE items (name TEXT NOT NULL)");
  for (const name of rows) await client.execute({ sql: "INSERT INTO items (name) VALUES (?)", args: [name] });
  const found = await db.select().from(items).where(likeEscaped(items.name, likeLiteralPattern(q))).orderBy(items.name);
  client.close();
  return found.map((r) => r.name);
}

test("일반 한글 검색어는 부분 일치한다", async () => {
  assert.deepEqual(await search(["행복 동물병원", "사랑 미용"], "동물병원"), ["행복 동물병원"]);
});

test("% 는 와일드카드가 아니라 리터럴이다", async () => {
  assert.deepEqual(await search(["100% 만족", "1000 만족"], "100%"), ["100% 만족"]);
});

test("_ 는 한 글자 와일드카드가 아니라 리터럴이다", async () => {
  assert.deepEqual(await search(["A_B 병원", "AxB 병원"], "A_B"), ["A_B 병원"]);
});

test("역슬래시와 따옴표도 리터럴로 검색되고 SQL을 깨지 않는다", async () => {
  assert.deepEqual(await search(["a\b 병원", "ab 병원", "O'Neil 샵"], "a\b"), ["a\b 병원"]);
  assert.deepEqual(await search(["O'Neil 샵", "ONeil 샵"], "O'Neil"), ["O'Neil 샵"]);
  assert.deepEqual(await search(["x'; DROP TABLE items;-- 샵", "정상"], "'; DROP"), ["x'; DROP TABLE items;-- 샵"]);
});

test("한글·영문·이모지 혼합 검색", async () => {
  assert.deepEqual(await search(["Happy 펫샵🐶", "Happy 펫샵"], "펫샵🐶"), ["Happy 펫샵🐶"]);
});
