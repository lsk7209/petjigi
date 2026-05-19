import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const breeds = sqliteTable("breeds", {
  id: text("id").primaryKey(),
  species: text("species").notNull(), // 'dog'|'cat'|'small'
  slug: text("slug").notNull().unique(),
  nameKo: text("name_ko").notNull(),
  nameEn: text("name_en"),
  origin: text("origin"),
  sizeCategory: text("size_category"), // 'tiny'|'small'|'medium'|'large'|'giant'
  lifespanMin: integer("lifespan_min"),
  lifespanMax: integer("lifespan_max"),
  commonConditions: text("common_conditions", { mode: "json" }), // string[]
  body: text("body"),
  status: text("status").notNull().default("draft"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export type Breed = typeof breeds.$inferSelect;
export type NewBreed = typeof breeds.$inferInsert;
