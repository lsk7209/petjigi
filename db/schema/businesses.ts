import { integer, real, sqliteTable, text, index } from "drizzle-orm/sqlite-core";

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
}, (table) => ({
  // WHERE addressSigungu=? AND type=? AND status='active' — 지역×업종 목록, 근처 영업장, 통계 COUNT
  sigunguTypeStatusIdx: index("businesses_sigungu_type_status_idx")
    .on(table.addressSigungu, table.type, table.status),
  // WHERE type=? AND name=? AND status!=? — 영업장 상세 페이지 조회
  typeNameStatusIdx: index("businesses_type_name_status_idx")
    .on(table.type, table.name, table.status),
}));

export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;
