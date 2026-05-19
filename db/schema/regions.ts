import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const regions = sqliteTable("regions", {
  code: text("code").primaryKey(), // 시군구 코드 (통계청)
  sido: text("sido").notNull(),
  sidoSlug: text("sido_slug").notNull(),
  sigungu: text("sigungu").notNull(),
  sigunguSlug: text("sigungu_slug").notNull(),
  fullName: text("full_name").notNull(),
});

export type Region = typeof regions.$inferSelect;
export type NewRegion = typeof regions.$inferInsert;
