import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { reviewQueue, contents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { pingIndexNow } from "@/lib/seo/index-now";
import { notifyGoogleIndexing } from "@/lib/seo/google-indexing";
import { revalidatePath } from "next/cache";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

type ValidStatus = "pending" | "in_review" | "approved" | "rejected";
const VALID_STATUSES: ValidStatus[] = ["pending", "in_review", "approved", "rejected"];

// PATCH /api/review-queue/[id]
// Body: { status?, notes?, assignedTo?, reviewerName? }
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

  const { status, notes, assignedTo, reviewerName } = body as {
    status?: string;
    notes?: string;
    assignedTo?: string;
    reviewerName?: string;
  };

  if (status && !VALID_STATUSES.includes(status as ValidStatus)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }

  const existing = await db
    .select()
    .from(reviewQueue)
    .where(eq(reviewQueue.id, id))
    .get();

  if (!existing) {
    return NextResponse.json({ error: "Review queue item not found" }, { status: 404 });
  }

  const isResolved = status === "approved" || status === "rejected";
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

  // approved 시: 콘텐츠 발행 + IndexNow + 캐시 무효화
  if (status === "approved") {
    const content = await db
      .select({ id: contents.id, slug: contents.slug, type: contents.type })
      .from(contents)
      .where(eq(contents.id, existing.contentId))
      .get();

    if (content) {
      const now = new Date().toISOString();

      await db
        .update(contents)
        .set({
          status: "published",
          publishedAt: now,
          updatedAt: now,
          ...(reviewerName ? { reviewerName, reviewedAt: now } : {}),
        })
        .where(eq(contents.id, content.id));

      // 콘텐츠 타입별 URL 구성
      const contentUrl =
        content.type === "guide"
          ? `${SITE_URL}/guide/${content.slug}`
          : `${SITE_URL}/guide/${content.slug}`;

      // IndexNow (Naver + Bing) 자동 핑
      await pingIndexNow([contentUrl, `${SITE_URL}/`]);

      // Google Indexing API (GOOGLE_SA_JSON 설정 시 활성화)
      await notifyGoogleIndexing(contentUrl).catch(() => {});

      // Next.js ISR 캐시 무효화
      revalidatePath(`/guide/${content.slug}`);
      revalidatePath("/");

      const updated = await db.select().from(reviewQueue).where(eq(reviewQueue.id, id)).get();
      return NextResponse.json({
        ok: true,
        item: updated,
        published: { slug: content.slug, url: contentUrl },
        indexNow: "pinged",
      });
    }
  }

  const updated = await db.select().from(reviewQueue).where(eq(reviewQueue.id, id)).get();
  return NextResponse.json({ ok: true, item: updated });
}
