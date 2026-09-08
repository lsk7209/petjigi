import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { reviewQueue } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { addToReviewQueue } from "@/lib/review-queue";
import type { ReviewReason } from "@/lib/review-queue";
import { isReviewRequestAuthorized } from "@/lib/admin-auth";

// GET /api/review-queue?status=pending
export async function GET(req: NextRequest) {
  if (!isReviewRequestAuthorized(req.headers)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const rows = status
    ? await db
        .select()
        .from(reviewQueue)
        .where(eq(reviewQueue.status, status))
        .orderBy(asc(reviewQueue.priority), asc(reviewQueue.createdAt))
    : await db
        .select()
        .from(reviewQueue)
        .orderBy(asc(reviewQueue.priority), asc(reviewQueue.createdAt));

  return NextResponse.json({ items: rows, total: rows.length });
}

// POST /api/review-queue
// Body: { contentId, contentType, reason?, priority? }
export async function POST(req: NextRequest) {
  if (!isReviewRequestAuthorized(req.headers)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a JSON object" }, { status: 400 });
  }
  const { contentId, contentType, reason, priority } = body as {
    contentId?: string;
    contentType?: string;
    reason?: string;
    priority?: number;
  };

  if (typeof contentId !== "string" || !contentId.trim()) {
    return NextResponse.json(
      { error: "contentId is required" },
      { status: 400 },
    );
  }
  if (typeof contentType !== "string" || !contentType.trim()) {
    return NextResponse.json(
      { error: "contentType is required" },
      { status: 400 },
    );
  }

  if ((reason !== undefined && typeof reason !== "string")
      || (priority !== undefined && (typeof priority !== "number" || !Number.isFinite(priority)))) {
    return NextResponse.json({ error: "Invalid reason or priority type" }, { status: 400 });
  }

  const validReasons: ReviewReason[] = [
    "ymyl_required",
    "flagged_keyword",
    "periodic",
  ];
  const resolvedReason: ReviewReason =
    reason && validReasons.includes(reason as ReviewReason)
      ? (reason as ReviewReason)
      : "ymyl_required";

  const validPriorities = [1, 2, 3, 4, 5] as const;
  const resolvedPriority: 1 | 2 | 3 | 4 | 5 =
    priority && validPriorities.includes(priority as 1 | 2 | 3 | 4 | 5)
      ? (priority as 1 | 2 | 3 | 4 | 5)
      : 3;

  const result = await addToReviewQueue(
    contentId,
    contentType,
    resolvedReason,
    resolvedPriority,
  );

  if (!result.inserted) {
    return NextResponse.json(
      { ok: false, message: "Already in queue", id: result.id },
      { status: 200 },
    );
  }

  return NextResponse.json(
    { ok: true, message: "Added to review queue", id: result.id },
    { status: 201 },
  );
}
