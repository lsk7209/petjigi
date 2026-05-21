"use server";

import { db } from "@/db/client";
import { reviewQueue, contents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { pingGuide } from "@/lib/seo/index-now";
import { notifyGoogleIndexing } from "@/lib/seo/google-indexing";

export async function approveContent(id: string): Promise<void> {
  const item = await db
    .select()
    .from(reviewQueue)
    .where(eq(reviewQueue.id, id))
    .get();

  if (!item) return;

  const now = new Date().toISOString();

  // 1. 리뷰큐 상태 업데이트
  await db
    .update(reviewQueue)
    .set({ status: "approved", resolvedAt: now })
    .where(eq(reviewQueue.id, id));

  // 2. 콘텐츠 발행
  const content = await db
    .select({ slug: contents.slug, type: contents.type })
    .from(contents)
    .where(eq(contents.id, item.contentId))
    .get();

  if (content) {
    await db
      .update(contents)
      .set({ status: "published", publishedAt: now, updatedAt: now })
      .where(eq(contents.id, item.contentId));

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
    const contentUrl = `${SITE_URL}/guide/${content.slug}`;

    // 3. IndexNow 핑 (Naver + Bing)
    if (content.type === "guide") {
      await pingGuide(content.slug).catch(() => {});
    }

    // 4. Google Indexing API (서비스 계정 설정 시 자동 활성화)
    await notifyGoogleIndexing(contentUrl).catch(() => {});

    // 4. ISR 캐시 무효화
    revalidatePath(`/guide/${content.slug}`);
    revalidatePath("/");
    revalidatePath("/category/[slug]", "page");
  }

  revalidatePath("/admin/review-queue");
}

export async function rejectContent(id: string, formData: FormData): Promise<void> {
  const notes = (formData.get("notes") as string | null) ?? "검수 거부";

  await db
    .update(reviewQueue)
    .set({ status: "rejected", notes, resolvedAt: new Date().toISOString() })
    .where(eq(reviewQueue.id, id));

  revalidatePath("/admin/review-queue");
}
