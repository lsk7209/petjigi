import assert from "node:assert/strict";
import test from "node:test";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";
import { instrumentClient, measureQueries, queryHash, type QueryMetrics } from "../db/query-metrics";
import { measuredRoute } from "../lib/db-measured-route";

test("disabled route wrapper preserves arguments/result without requiring a Next request", async () => {
  const previous = process.env.DB_QUERY_METRICS;
  process.env.DB_QUERY_METRICS = "0";
  try {
    const route = measuredRoute("test", "page", async (value: number) => value + 1);
    assert.equal(await route(7), 8);
  } finally {
    if (previous === undefined) delete process.env.DB_QUERY_METRICS;
    else process.env.DB_QUERY_METRICS = previous;
  }
});

test("disabled metrics preserve client identity; hashes normalize literals without exposing them", () => {
  const client = createClient({ url: ":memory:" });
  try {
    assert.equal(instrumentClient(client, false), client);
    assert.equal(queryHash("SELECT 'private-email' AS x, 123"), queryHash("select 'other' as x, 456"));
  } finally { client.close(); }
});

test("actual ORM queries count duplicates, returned rows, failures; concurrent scopes stay isolated", async () => {
  const client = instrumentClient(createClient({ url: ":memory:" }), true);
  const db = drizzle(client);
  const reports: QueryMetrics[] = [];
  const identity = (requestId: string) => ({ requestId, route: "test", phase: "page" });
  try {
    await Promise.all([
      measureQueries(identity("a"), async () => {
        await db.all(sql`select ${"private-email"} as value`);
        await db.all(sql`select ${"private-phone"} as value`);
        await assert.rejects(client.execute("select * from absent_secret_table"));
      }, report => reports.push(report)),
      measureQueries(identity("b"), async () => { await db.all(sql`select 1 as second`); }, report => reports.push(report)),
    ]);
    const first = reports.find(report => report.requestId === "a")!;
    const second = reports.find(report => report.requestId === "b")!;
    assert.equal(first.queryCount, 3);
    assert.equal(first.duplicateQueries, 1);
    assert.equal(first.returnedRows, 2);
    assert.equal(first.queries.reduce((sum, query) => sum + query.failures, 0), 1);
    assert.equal(second.queryCount, 1);
    assert.equal(first.rowsRead, null);
    assert.doesNotMatch(JSON.stringify(reports), /private-email|private-phone|absent_secret_table|SELECT/i);
    let unsupported: QueryMetrics | undefined;
    await measureQueries(identity("batch"), async () => client.batch(["select 1"]), report => { unsupported = report; });
    assert.equal(unsupported?.unmeasuredOperations, 1);
    assert.equal(unsupported?.queryCount, 0);
    await measureQueries(identity("sink-error"), async () => client.execute("select 1"), () => { throw new Error("sink"); });
  } finally { client.close(); }
});
