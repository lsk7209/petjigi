import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// 빌드 시: embedded replica (local.db ← Turso sync) → BLOCKED 에러 회피
// 런타임: 직접 Turso 연결
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

export const client = createClient(
  isBuild && process.env.TURSO_DATABASE_URL
    ? {
        url: "file:local.db",
        syncUrl: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }
);

export const db = drizzle(client, { schema });
export type DB = typeof db;
