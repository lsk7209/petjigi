import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contents = sqliteTable("contents", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // 'guide'|'business_overlay'|'breed'|'condition'|'comparison'
  category: integer("category").notNull(), // 1~6
  title: text("title").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  body: text("body").notNull(), // markdown/MDX
  authorName: text("author_name"),
  authorCredential: text("author_credential"),
  reviewedAt: text("reviewed_at"),
  reviewerName: text("reviewer_name"),
  status: text("status").notNull().default("draft"), // 'draft'|'review_queue'|'published'|'archived'
  ymyl: integer("ymyl", { mode: "boolean" }).notNull().default(false),
  sources: text("sources", { mode: "json" }), // string[]
  disclaimer: text("disclaimer"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export type Content = typeof contents.$inferSelect;
export type NewContent = typeof contents.$inferInsert;
