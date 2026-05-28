import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const rescuedAnimals = sqliteTable("rescued_animals", {
  id: text("id").primaryKey(), // desertionNo
  happenDate: text("happen_date"),
  happenPlace: text("happen_place"),
  kindCd: text("kind_cd"),
  colorCd: text("color_cd"),
  age: text("age"),
  weight: text("weight"),
  noticeNo: text("notice_no"),
  noticeSdt: text("notice_sdt"),
  noticeEdt: text("notice_edt"),
  imageUrl: text("image_url"),
  processState: text("process_state"),
  sexCd: text("sex_cd"),
  neuterYn: text("neuter_yn"),
  careNm: text("care_nm"),
  careTel: text("care_tel"),
  careAddr: text("care_addr"),
  chargeNm: text("charge_nm"),
  orgNm: text("org_nm"),
  noticeComment: text("notice_comment"),
  lastSyncedAt: text("last_synced_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  // ORDER BY noticeSdt DESC LIMIT 50 — 인덱스 순서 스캔으로 정렬 불필요 (YYYYMMDD 텍스트 = 정렬순 동일)
  noticeSdtIdx: index("rescued_animals_notice_sdt_idx").on(table.noticeSdt),
}));

export type RescuedAnimal = typeof rescuedAnimals.$inferSelect;
export type NewRescuedAnimal = typeof rescuedAnimals.$inferInsert;
