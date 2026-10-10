import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { desc } from "drizzle-orm";
import { contents } from "@/db/schema";
import { publicContentCondition } from "./content-publication-sql";
import { isPubliclyVisibleContent } from "./content-publication";

const NOW = new Date("2026-10-10T00:00:00Z");

interface Row { id: string; type: string; status: string; at: string | null }
const ROWS: Row[] = [
  { id: "ok-guide", type: "guide", status: "published", at: "2026-10-01T00:00:00.000Z" },
  { id: "ok-offset", type: "blog", status: "published", at: "2026-10-09T20:00:00+09:00" },
  { id: "future", type: "blog", status: "published", at: "2026-10-11T00:00:00.000Z" },
  { id: "future-offset", type: "blog", status: "published", at: "2026-10-10T10:00:00+09:00" },
  { id: "draft", type: "guide", status: "draft", at: "2026-10-01T00:00:00.000Z" },
  { id: "review", type: "condition", status: "review_queue", at: "2026-10-01T00:00:00.000Z" },
  { id: "null-date", type: "guide", status: "published", at: null },
  { id: "bad-date", type: "guide", status: "published", at: "not-a-date" },
  { id: "breed", type: "breed", status: "published", at: "2026-10-01T00:00:00.000Z" },
];

async function visibleIds(type?: "guide" | "blog" | "condition") {
  const client = createClient({ url: ":memory:" });
  await client.execute("CREATE TABLE contents (id TEXT PRIMARY KEY, slug TEXT, type TEXT, status TEXT, published_at TEXT)");
  for (const r of ROWS) {
    await client.execute({ sql: "INSERT INTO contents (id, slug, type, status, published_at) VALUES (?,?,?,?,?)", args: [r.id, r.id, r.type, r.status, r.at] });
  }
  const db = drizzle(client);
  const found = await db.select({ id: contents.id }).from(contents).where(publicContentCondition(type, NOW)).orderBy(desc(contents.id));
  client.close();
  return found.map((r) => r.id).sort();
}

test("공개 조건: draft·review_queue·미래·누락/잘못된 날짜·미지원 타입은 제외된다", async () => {
  assert.deepEqual(await visibleIds(), ["ok-guide", "ok-offset"]);
});

test("타입을 지정하면 해당 타입만 남는다", async () => {
  assert.deepEqual(await visibleIds("blog"), ["ok-offset"]);
  assert.deepEqual(await visibleIds("guide"), ["ok-guide"]);
  assert.deepEqual(await visibleIds("condition"), []);
});

test("SQL 판정은 JS 판정(isPubliclyVisibleContent)과 모든 행에서 일치한다", async () => {
  const sqlIds = new Set(await visibleIds());
  for (const r of ROWS) {
    const js = isPubliclyVisibleContent({ status: r.status, type: r.type, publishedAt: r.at }, NOW);
    assert.equal(sqlIds.has(r.id), js, r.id);
  }
});
