import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reviewQueue = sqliteTable("review_queue", {
  id: text("id").primaryKey(),
  contentId: text("content_id").notNull(),
  contentType: text("content_type").notNull(),
  priority: integer("priority").notNull().default(3), // 1(highest)~5
  reason: text("reason"), // 'ymyl_required'|'flagged_keyword'|'periodic'
  assignedTo: text("assigned_to"),
  status: text("status").notNull().default("pending"), // 'pending'|'in_review'|'approved'|'rejected'
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
  resolvedAt: text("resolved_at"),
});

export type ReviewQueueItem = typeof reviewQueue.$inferSelect;
export type NewReviewQueueItem = typeof reviewQueue.$inferInsert;
