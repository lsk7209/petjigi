import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { reviewQueue } from "@/db/schema";
import { eq } from "drizzle-orm";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

type ValidStatus = "pending" | "in_review" | "approved" | "rejected";
const VALID_STATUSES: ValidStatus[] = [
  "pending",
  "in_review",
  "approved",
  "rejected",
];

// PATCH /api/review-queue/[id]
// Body: { status?, notes?, assignedTo? }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { status, notes, assignedTo } = body as {
    status?: string;
    notes?: string;
    assignedTo?: string;
  };

  if (status && !VALID_STATUSES.includes(status as ValidStatus)) {
    return NextResponse.json(
      {
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      },
      { status: 400 },
    );
  }

  const existing = await db
    .select({ id: reviewQueue.id, status: reviewQueue.status })
    .from(reviewQueue)
    .where(eq(reviewQueue.id, id))
    .get();

  if (!existing) {
    return NextResponse.json(
      { error: "Review queue item not found" },
      { status: 404 },
    );
  }

  const isResolved =
    status === "approved" || status === "rejected";
  const resolvedAt = isResolved ? new Date().toISOString() : undefined;

  const updateData: {
    status?: string;
    notes?: string;
    assignedTo?: string;
    resolvedAt?: string;
  } = {};

  if (status) updateData.status = status;
  if (notes !== undefined) updateData.notes = notes;
  if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
  if (resolvedAt) updateData.resolvedAt = resolvedAt;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { error: "No fields to update" },
      { status: 400 },
    );
  }

  await db
    .update(reviewQueue)
    .set(updateData)
    .where(eq(reviewQueue.id, id));

  const updated = await db
    .select()
    .from(reviewQueue)
    .where(eq(reviewQueue.id, id))
    .get();

  return NextResponse.json({ ok: true, item: updated });
}
