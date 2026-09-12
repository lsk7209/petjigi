"use server";

import { db } from "@/db/client";
import { reviewQueue, contents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { pingIndexNow } from "@/lib/seo/index-now";
import { notifyGoogleIndexing, submitSitemapToGSC } from "@/lib/seo/google-indexing";
import { evaluatePublicationCandidate } from "@/lib/content-risk-gate";
import { isValidAdminSecret } from "@/lib/admin-auth";
import { canResolveReview } from "@/lib/review-workflow";

function assertAuthorized(key: string): void {
  if (!isValidAdminSecret(key)) throw new Error("Unauthorized");
}

export async function approveContent(id: string, key: string): Promise<void> {
  assertAuthorized(key);
  const item = await db
    .select()
    .from(reviewQueue)
    .where(eq(reviewQueue.id, id))
    .get();

  if (!item) throw new Error("검수 항목을 찾을 수 없습니다.");
  if (!canResolveReview(item.status)) throw new Error("이미 처리된 검수 항목입니다.");

  const now = new Date().toISOString();

  const content = await db
    .select({
      id: contents.id,
      slug: contents.slug,
      type: contents.type,
      category: contents.category,
      ymyl: contents.ymyl,
      sources: contents.sources,
      disclaimer: contents.disclaimer,
      metaTitle: contents.metaTitle,
      metaDescription: contents.metaDescription,
      body: contents.body,
    })
    .from(contents)
    .where(eq(contents.id, item.contentId))
    .get();

  if (content) {
    const issues = evaluatePublicationCandidate(content);
    if (issues.length > 0) {
      throw new Error(`발행 전 고위험 콘텐츠 검사를 통과하지 못했습니다: ${issues.join(", ")}`);
    }

    // 검사를 통과한 뒤에만 큐와 콘텐츠 상태를 변경한다.
    await db
      .update(reviewQueue)
      .set({ status: "approved", resolvedAt: now })
      .where(eq(reviewQueue.id, id));

    await db
      .update(contents)
      .set({ status: "published", publishedAt: now, updatedAt: now })
      .where(eq(contents.id, item.contentId));

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

    const TYPE_PATH: Record<string, string> = {
      guide: "guide",
      blog: "blog",
      condition: "condition",
    };
    const pathPrefix = TYPE_PATH[content.type] ?? "guide";
    const contentUrl = `${SITE_URL}/${pathPrefix}/${content.slug}`;

    // IndexNow 핑 (Naver + Bing) — 모든 발행 타입 대상
    await pingIndexNow([contentUrl, SITE_URL]).catch(() => {});

    // 4. Google Indexing API + 사이트맵 재제출 (서비스 계정 설정 시 자동 활성화)
    await notifyGoogleIndexing(contentUrl).catch(() => {});
    await submitSitemapToGSC(`${SITE_URL}/`, `${SITE_URL}/sitemap-content.xml`).catch(() => {});

    // 5. ISR 캐시 무효화
    revalidateTag("guides", { expire: 0 });
    revalidatePath(`/${pathPrefix}/${content.slug}`);
    revalidatePath("/");
    revalidatePath("/category/[slug]", "page");
  }

  revalidatePath("/admin/review-queue");
}

export async function rejectContent(id: string, key: string, formData: FormData): Promise<void> {
  assertAuthorized(key);
  const item = await db.select().from(reviewQueue).where(eq(reviewQueue.id, id)).get();
  if (!item) throw new Error("검수 항목을 찾을 수 없습니다.");
  if (!canResolveReview(item.status)) throw new Error("이미 처리된 검수 항목입니다.");

  const notes = (formData.get("notes") as string | null) ?? "검수 거부";

  await db
    .update(reviewQueue)
    .set({ status: "rejected", notes, resolvedAt: new Date().toISOString() })
    .where(eq(reviewQueue.id, id));

  revalidatePath("/admin/review-queue");
}
