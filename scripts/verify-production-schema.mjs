import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required");
}

const client = createClient({ url, authToken });

try {
  const table = await client.execute(
    "select name from sqlite_master where type = 'table' and name = 'etl_sync_state'",
  );
  const columns = await client.execute("pragma table_info('etl_sync_state')");
  const actual = new Set(columns.rows.map((row) => String(row.name)));
  const required = [
    "job_name",
    "last_attempt_at",
    "last_successful_at",
    "updated_at",
  ];
  const missing = required.filter((name) => !actual.has(name));

  if (table.rows.length !== 1 || missing.length > 0) {
    throw new Error(`etl_sync_state verification failed; missing: ${missing.join(", ")}`);
  }

  console.log(JSON.stringify({ table: "etl_sync_state", verified: true, columns: required }));
} finally {
  client.close();
}
