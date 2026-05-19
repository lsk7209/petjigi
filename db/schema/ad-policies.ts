import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// 'adsense'|'pet_insurance'|'pet_food'|'pet_service'|'memorial'
export type AdType = "adsense" | "pet_insurance" | "pet_food" | "pet_service" | "memorial";
// 'allow'|'block'|'preferred'
export type AdPolicy = "allow" | "block" | "preferred";

export const adPolicies = sqliteTable("ad_policies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: integer("category").notNull(), // 1~6
  adType: text("ad_type").notNull().$type<AdType>(),
  policy: text("policy").notNull().$type<AdPolicy>(),
  notes: text("notes"),
});

export type AdPolicyRow = typeof adPolicies.$inferSelect;
