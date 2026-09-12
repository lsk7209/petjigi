import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const etlSyncState = sqliteTable("etl_sync_state", {
  jobName: text("job_name").primaryKey(),
  lastAttemptAt: text("last_attempt_at").notNull(),
  lastSuccessfulAt: text("last_successful_at"),
  updatedAt: text("updated_at").notNull(),
});

export type EtlSyncState = typeof etlSyncState.$inferSelect;
