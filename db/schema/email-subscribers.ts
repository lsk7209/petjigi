import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const emailSubscribers = sqliteTable("email_subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  persona: text("persona"), // 'P1'|'P2'|'P3'|'P4'|'P5'
  source: text("source"), // 'pet_loss_guide'|'new_owner_guide'|...
  consentMarketing: text("consent_marketing"), // 'yes'|'no'
  subscribedAt: text("subscribed_at").notNull(),
  unsubscribedAt: text("unsubscribed_at"),
});

export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type NewEmailSubscriber = typeof emailSubscribers.$inferInsert;
