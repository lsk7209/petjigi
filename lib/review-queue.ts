import { db } from "@/db/client";
import { reviewQueue, contents } from "@/db/schema";
import type { ReviewQueueItem } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { CATEGORIES } from "@/lib/category";
import type { CategoryId } from "@/lib/category";
import { getReviewEvidence, scanProhibitedKeywords, validateEeat } from "@/lib/ymyl";

export type ReviewReason = "ymyl_required" | "flagged_keyword" | "periodic";

export class ReviewApprovalError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ReviewApprovalError";
  }
}

interface ApprovalOptions {
  notes?: string;
  assignedTo?: string;
  reviewerName?: string;
}

/** Authenticated entrypoints share this DB-only gate; external effects follow commit. */
export async function approveReviewQueueItem(id: string, options: ApprovalOptions = {}) {
  if (typeof id !== "string" || !id.trim()) {
    throw new ReviewApprovalError("Invalid review queue id", 400);
  }
  return db.transaction(async (tx) => {
    const item = await tx.select().from(reviewQueue).where(eq(reviewQueue.id, id)).get();
    if (!item) throw new ReviewApprovalError("Review queue item not found", 404);
    if (!["pending", "in_review"].includes(item.status)) {
      throw new ReviewApprovalError("Review queue item is already resolved", 409);
    }
    const content = await tx.select().from(contents).where(eq(contents.id, item.contentId)).get();
    if (!content) throw new ReviewApprovalError("Content not found", 404);
    if (!["guide", "blog", "condition"].includes(content.type) || item.contentType !== content.type) {
      throw new ReviewApprovalError("Unsupported or mismatched content type", 422);
    }
    const category = CATEGORIES[content.category as CategoryId];
    if (!category || !/^[\p{L}\p{N}][\p{L}\p{N}_-]*$/u.test(content.slug)) {
      throw new ReviewApprovalError("Invalid content category or slug", 422);
    }
    const periodic = item.reason === "periodic" && content.status === "published";
    if (!["draft", "review_queue"].includes(content.status) && !periodic) {
      throw new ReviewApprovalError("Content is not awaiting publication", 409);
    }

    const now = new Date().toISOString();
    const proposedReview = options.reviewerName !== undefined
      ? { reviewerName: options.reviewerName, reviewedAt: now }
      : { reviewerName: content.reviewerName, reviewedAt: content.reviewedAt };
    const review = getReviewEvidence(proposedReview);
    if (options.reviewerName !== undefined && !review) {
      throw new ReviewApprovalError("A non-placeholder reviewer name is required", 422);
    }
    if (category.ymyl || content.ymyl) {
      const sources = Array.isArray(content.sources)
        ? [...new Set(content.sources.filter((s): s is string => typeof s === "string")
          .map((s) => s.trim()).filter(Boolean))]
        : [];
      const missing = validateEeat({
        authorName: content.authorName?.trim(),
        authorCredential: content.authorCredential?.trim(),
        disclaimer: content.disclaimer?.trim(), sources,
        reviewedAt: review?.reviewedAt, reviewerName: review?.reviewerName,
      });
      if (missing.length || !review) {
        throw new ReviewApprovalError(`Review evidence required: ${missing.join(", ")}`, 422);
      }
    }
    const scan = scanProhibitedKeywords([
      content.title, content.subtitle, content.metaTitle, content.metaDescription, content.body,
    ].filter(Boolean).join("\n"));
    if (!scan.passed) {
      throw new ReviewApprovalError("Content contains flagged wording; editorial review required", 422);
    }

    // Presence checks do not establish the reviewer's real identity or source authority.
    await tx.update(contents).set({
      status: "published", publishedAt: periodic ? content.publishedAt : now, updatedAt: now,
      ...(options.reviewerName !== undefined && review ? review : {}),
    }).where(eq(contents.id, content.id));
    const queueUpdate: Partial<ReviewQueueItem> = {
      status: "approved", resolvedAt: now,
      ...(options.notes !== undefined ? { notes: options.notes } : {}),
      ...(options.assignedTo !== undefined ? { assignedTo: options.assignedTo } : {}),
    };
    await tx.update(reviewQueue).set(queueUpdate).where(eq(reviewQueue.id, id));
    return {
      item: { ...item, ...queueUpdate },
      content: { slug: content.slug, type: content.type },
      path: `/${content.type}/${encodeURIComponent(content.slug)}`,
    };
  });
}

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
