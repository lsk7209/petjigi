// Opt-in local measurement builds only: reading headers makes measured pages dynamic.
// With the flag absent no request API is read and normal prerender/cache behavior stays intact.
export function measuredRoute<A extends unknown[], T>(route: string, phase: string, run: (...args: A) => Promise<T>) {
  return async (...args: A): Promise<T> => {
    if (process.env.DB_QUERY_METRICS !== "1") return run(...args);
    const [{ randomUUID }, { headers }, { measureQueries }] = await Promise.all([
      import("node:crypto"), import("next/headers"), import("@/db/query-metrics"),
    ]);
    const requestHeaders = await headers();
    const supplied = requestHeaders.get("x-db-measure-id") ?? "";
    const requestId = /^[a-f0-9]{32}$/.test(supplied) ? supplied : randomUUID();
    return measureQueries({ requestId, route, phase }, () => run(...args));
  };
}
