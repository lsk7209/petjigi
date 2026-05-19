import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const businesses = sqliteTable("businesses", {
  id: text("id").primaryKey(),
  type: text("type").notNull(), // 'vet'|'grooming'|'funeral'|'boarding'|'sale'|'breeder'|'transport'|'exhibition'
  category: integer("category").notNull(), // 1~6
  name: text("name").notNull(),
  legalName: text("legal_name"),
  address: text("address").notNull(),
  addressSido: text("address_sido"),
  addressSigungu: text("address_sigungu"),
  addressDong: text("address_dong"),
  lat: real("lat"),
  lng: real("lng"),
  phone: text("phone"),
  licenseDate: text("license_date"),
  status: text("status").notNull().default("active"), // 'active'|'closed'|'paused'
  scale: text("scale"),
  source: text("source").notNull(),
  rawData: text("raw_data", { mode: "json" }),
  lastSyncedAt: text("last_synced_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;
