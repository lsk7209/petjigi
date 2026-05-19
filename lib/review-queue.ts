import { db } from "@/db/client";
import { reviewQueue } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type ReviewReason = "ymyl_required" | "flagged_keyword" | "periodic";

/**
 * 검수 큐에 새 아이템을 추가합니다.
 * 이미 pending/in_review 상태의 동일 contentId가 있으면 추가하지 않습니다.
 */
export async function addToReviewQueue(
  contentId: string,
  contentType: string,
  reason: ReviewReason,
  priority: 1 | 2 | 3 | 4 | 5 = 3,
): Promise<{ inserted: boolean; id?: string }> {
  const existing = await db
    .select({ id: reviewQueue.id })
    .from(reviewQueue)
    .where(
      and(
        eq(reviewQueue.contentId, contentId),
        eq(reviewQueue.status, "pending"),
      ),
    )
    .get();

  if (existing) {
    return { inserted: false, id: existing.id };
  }

  const id = `rq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();

  await db.insert(reviewQueue).values({
    id,
    contentId,
    contentType,
    priority,
    reason,
    status: "pending",
    createdAt: now,
  });

  return { inserted: true, id };
}

/**
 * 해당 contentId가 현재 검수 큐(pending 또는 in_review)에 존재하는지 확인합니다.
 */
export async function isInReviewQueue(contentId: string): Promise<boolean> {
  const pending = await db
    .select({ id: reviewQueue.id })
    .from(reviewQueue)
    .where(
      and(
        eq(reviewQueue.contentId, contentId),
        eq(reviewQueue.status, "pending"),
      ),
    )
    .get();

  if (pending) return true;

  const inReview = await db
    .select({ id: reviewQueue.id })
    .from(reviewQueue)
    .where(
      and(
        eq(reviewQueue.contentId, contentId),
        eq(reviewQueue.status, "in_review"),
      ),
    )
    .get();

  return !!inReview;
}
