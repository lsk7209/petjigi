import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const regions = sqliteTable("regions", {
  code: text("code").primaryKey(), // 시군구 코드 (통계청)
  sido: text("sido").notNull(),
  sidoSlug: text("sido_slug").notNull(),
  sigungu: text("sigungu").notNull(),
  sigunguSlug: text("sigungu_slug").notNull(),
  fullName: text("full_name").notNull(),
}, (table) => ({
  // WHERE sigunguSlug=? — 모든 영업장/보호소 페이지 조회 (복수 결과 가능: 북구 등 전국 중복)
  sigunguSlugIdx: index("regions_sigungu_slug_idx").on(table.sigunguSlug),
  // WHERE sidoSlug=? — 시도 허브 페이지 범위 스캔
  sidoSlugIdx: index("regions_sido_slug_idx").on(table.sidoSlug),
}));

export type Region = typeof regions.$inferSelect;
export type NewRegion = typeof regions.$inferInsert;
