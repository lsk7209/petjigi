import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
});

export type Shelter = typeof shelters.$inferSelect;
export type NewShelter = typeof shelters.$inferInsert;
