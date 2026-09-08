import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { reviewQueue } from "@/db/schema";
import { eq } from "drizzle-orm";
import { pingIndexNow } from "@/lib/seo/index-now";
import { notifyGoogleIndexing } from "@/lib/seo/google-indexing";
import { revalidatePath, revalidateTag } from "next/cache";
import { isReviewRequestAuthorized } from "@/lib/admin-auth";
import { approveReviewQueueItem, ReviewApprovalError } from "@/lib/review-queue";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

type ValidStatus = "pending" | "in_review" | "approved" | "rejected";
const VALID_STATUSES: ValidStatus[] = ["pending", "in_review", "approved", "rejected"];

// PATCH /api/review-queue/[id]
// Body: { status?, notes?, assignedTo?, reviewerName? }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isReviewRequestAuthorized(req.headers)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a JSON object" }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;
  for (const field of ["status", "notes", "assignedTo", "reviewerName"]) {
    if (fields[field] !== undefined && typeof fields[field] !== "string") {
      return NextResponse.json({ error: `${field} must be a string` }, { status: 400 });
    }
  }
  const { status, notes, assignedTo, reviewerName } = fields as {
    status?: string;
    notes?: string;
    assignedTo?: string;
    reviewerName?: string;
  };

  if (status !== undefined && !VALID_STATUSES.includes(status as ValidStatus)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }

  if (status === "approved") {
    let result;
    try {
      result = await approveReviewQueueItem(id, { notes, assignedTo, reviewerName });
    } catch (error) {
      if (error instanceof ReviewApprovalError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }
      throw error;
    }
    const contentUrl = `${SITE_URL}${result.path}`;
    // A failed notification does not undo an already committed approval.
    const indexNow = await pingIndexNow([contentUrl, `${SITE_URL}/`])
      .then(() => "pinged" as const).catch(() => "failed" as const);
    await notifyGoogleIndexing(contentUrl).catch(() => {});
    let cache: "revalidated" | "failed" = "revalidated";
    try {
      revalidateTag("guides", { expire: 0 });
      revalidatePath(result.path);
      revalidatePath(`/${result.content.type}`);
      revalidatePath("/");
      revalidatePath("/category/[slug]", "page");
      revalidatePath("/admin/review-queue");
    } catch {
      cache = "failed";
    }
    return NextResponse.json({
      ok: true, item: result.item,
      published: { slug: result.content.slug, url: contentUrl }, indexNow, cache,
    });
  }

  const existing = await db
    .select()
    .from(reviewQueue)
    .where(eq(reviewQueue.id, id))
    .get();

  if (!existing) {
    return NextResponse.json({ error: "Review queue item not found" }, { status: 404 });
  }

  const isResolved = status === "rejected";
  const resolvedAt = isResolved ? new Date().toISOString() : undefined;

  const updateData: Record<string, string | undefined> = {};
  if (status) updateData.status = status;
  if (notes !== undefined) updateData.notes = notes;
  if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
  if (resolvedAt) updateData.resolvedAt = resolvedAt;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  await db.update(reviewQueue).set(updateData).where(eq(reviewQueue.id, id));

  const updated = await db.select().from(reviewQueue).where(eq(reviewQueue.id, id)).get();
  return NextResponse.json({ ok: true, item: updated });
}
