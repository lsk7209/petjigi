"use server";

import { db } from "@/db/client";
import { reviewQueue } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { pingIndexNow } from "@/lib/seo/index-now";
import { notifyGoogleIndexing, submitSitemapToGSC } from "@/lib/seo/google-indexing";
import { requireReviewFormKey } from "@/lib/admin-auth";
import { approveReviewQueueItem } from "@/lib/review-queue";

export async function approveContent(id: string, formData: FormData): Promise<void> {
  requireReviewFormKey(formData);
  const result = await approveReviewQueueItem(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
  const contentUrl = `${siteUrl}${result.path}`;

  // Validation and both writes have committed before any external effect.
  await pingIndexNow([contentUrl, siteUrl]).catch(() => {});
  await notifyGoogleIndexing(contentUrl).catch(() => {});
  await submitSitemapToGSC(`${siteUrl}/`, `${siteUrl}/sitemap-content.xml`).catch(() => {});
  try {
    revalidateTag("guides", { expire: 0 });
    revalidatePath(result.path);
    revalidatePath(`/${result.content.type}`);
    revalidatePath("/");
    revalidatePath("/category/[slug]", "page");
    revalidatePath("/admin/review-queue");
  } catch {
    console.warn("Review approved; cache revalidation requires retry");
  }
}

export async function rejectContent(id: string, formData: FormData): Promise<void> {
  requireReviewFormKey(formData);
  const value = formData.get("notes");
  const notes = typeof value === "string" ? value : "검수 거부";

  await db
    .update(reviewQueue)
    .set({ status: "rejected", notes, resolvedAt: new Date().toISOString() })
    .where(eq(reviewQueue.id, id));

  revalidatePath("/admin/review-queue");
}
