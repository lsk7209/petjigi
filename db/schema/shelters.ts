import { integer, real, sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const shelters = sqliteTable("shelters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  sido: text("sido"),
  sigungu: text("sigungu"),
  address: text("address"),
  lat: real("lat"),
  lng: real("lng"),
  phone: text("phone"),
  capacity: integer("capacity"),
  source: text("source").notNull(),
  lastSyncedAt: text("last_synced_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  // WHERE sigungu=? — 보호소 지역 페이지 조회
  sigunguIdx: index("shelters_sigungu_idx").on(table.sigungu),
}));

export type Shelter = typeof shelters.$inferSelect;
export type NewShelter = typeof shelters.$inferInsert;
