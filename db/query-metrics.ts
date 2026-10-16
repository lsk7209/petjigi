import { AsyncLocalStorage } from "node:async_hooks";
import { createHash } from "node:crypto";
import type { Client, ResultSet } from "@libsql/client";

type Query = { hash: string; count: number; durationMs: number; returnedRows: number; failures: number };
type Scope = { requestId: string; route: string; phase: string; started: number; queries: Map<string, Query>; unmeasuredOperations: number };
export type QueryMetrics = {
  kind: "db-query-metrics"; requestId: string; route: string; phase: string;
  durationMs: number; queryCount: number; duplicateQueries: number;
  returnedRows: number; rowsRead: null; unmeasuredOperations: number; queries: Query[];
};
const storage = new AsyncLocalStorage<Scope>();
export const metricsEnabled = () => process.env.DB_QUERY_METRICS === "1";
export function queryHash(sql: string) {
  const normalized = sql.replace(/'(?:''|[^'])*'/g, "?").replace(/\/\*[\s\S]*?\*\/|--[^\n]*/g, " ")
    .replace(/\b\d+(?:\.\d+)?\b/g, "?").replace(/\s+/g, " ").trim().toLowerCase();
  return createHash("sha256").update(normalized).digest("hex");
}

export async function measureQueries<T>(
  identity: { requestId: string; route: string; phase: string }, run: () => Promise<T>,
  sink: (report: QueryMetrics) => void = report => console.info(JSON.stringify(report)),
) {
  const scope: Scope = { ...identity, started: performance.now(), queries: new Map(), unmeasuredOperations: 0 };
  return storage.run(scope, async () => {
    try { return await run(); }
    finally {
      const queries = [...scope.queries.values()];
      const queryCount = queries.reduce((sum, query) => sum + query.count, 0);
      // No SQL, arguments, query strings, error messages, or database credentials.
      try { sink({ kind: "db-query-metrics", ...identity, durationMs: performance.now() - scope.started,
        queryCount, duplicateQueries: queryCount - queries.length,
        returnedRows: queries.reduce((sum, query) => sum + query.returnedRows, 0), rowsRead: null,
        unmeasuredOperations: scope.unmeasuredOperations, queries }); } catch { /* Logging cannot fail a request. */ }
    }
  });
}

export function instrumentClient(client: Client, enabled = metricsEnabled()): Client {
  if (!enabled) return client;
  return new Proxy(client, {
    get(target, property) {
      const value = Reflect.get(target, property, target);
      if (typeof value !== "function") return value;
      if (property !== "execute") return (...args: unknown[]) => {
        if (["batch", "transaction", "executeMultiple", "migrate"].includes(String(property))) {
          const scope = storage.getStore();
          if (scope) scope.unmeasuredOperations++;
        }
        return Reflect.apply(value, target, args);
      };
      return async (...args: unknown[]) => {
        const scope = storage.getStore();
        if (!scope) return Reflect.apply(value, target, args);
        const statement = args[0] as string | { sql: string };
        const hash = queryHash(typeof statement === "string" ? statement : statement.sql);
        const query = scope.queries.get(hash) ?? { hash, count: 0, durationMs: 0, returnedRows: 0, failures: 0 };
        scope.queries.set(hash, query);
        query.count++;
        const started = performance.now();
        try {
          const result = await Reflect.apply(value, target, args) as ResultSet;
          query.returnedRows += result.rows.length;
          return result;
        } catch (error) { query.failures++; throw error; }
        finally { query.durationMs += performance.now() - started; }
      };
    },
  });
}
