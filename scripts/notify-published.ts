/**
 * 배포 후 최근 발행 콘텐츠를 Google Indexing API + IndexNow(Naver·Bing)에 전송
 * deploy.yml의 "Notify search engines" 스텝에서 실행됨
 *
 * 기준: 최근 30일 이내 published 상태인 모든 콘텐츠 (guide|blog|condition|breed)
 */

import { db } from "../db/client";
import { contents } from "../db/schema";
import { eq, and, gte } from "drizzle-orm";
import { notifyGoogleBatch, submitSitemapToGSC } from "../lib/seo/google-indexing";
import { pingIndexNow } from "../lib/seo/index-now";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
const DAYS = 30; // 최근 N일 이내 발행분 대상

function contentUrl(type: string, slug: string): string {
  switch (type) {
    case "guide":      return `${SITE_URL}/guide/${slug}`;
    case "blog":       return `${SITE_URL}/blog/${slug}`;
    case "condition":  return `${SITE_URL}/condition/${slug}`;
    case "breed":      return `${SITE_URL}/breed/${slug}`;
    default:           return `${SITE_URL}/guide/${slug}`;
  }
}

async function run() {
  const since = new Date(Date.now() - DAYS * 86_400_000).toISOString();

  const rows = await db
    .select({ slug: contents.slug, type: contents.type, publishedAt: contents.publishedAt })
    .from(contents)
    .where(
      and(
        eq(contents.status, "published"),
        gte(contents.publishedAt, since)
      )
    );

  if (rows.length === 0) {
    console.log("[notify] 최근 발행 콘텐츠 없음 — 종료");
    return;
  }

  // publishedAt 내림차순 정렬 — 최신 콘텐츠 우선 전송 (200건 한도 초과 시 구글이 최신글 우선 처리)
  const urls = rows
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .map((r) => contentUrl(r.type, r.slug));
  console.log(`[notify] ${urls.length}개 URL 전송 대상 (최신순):`);
  urls.slice(0, 5).forEach((u) => console.log("  ", u));
  if (urls.length > 5) console.log(`  ... 외 ${urls.length - 5}건`);

  // Google Indexing API (GOOGLE_SA_JSON 없으면 자동 skip, 최대 200건/일)
  const { sent, skipped } = await notifyGoogleBatch(urls, 200);
  console.log(`[notify] Google Indexing API 완료 — 전송 ${sent}건, 생략 ${skipped}건`);

  // GSC 사이트맵 제출 (두 사이트맵 모두 — GSC가 최신 사이트맵 인식)
  await Promise.allSettled([
    submitSitemapToGSC(`${SITE_URL}/`, `${SITE_URL}/sitemap.xml`),
    submitSitemapToGSC(`${SITE_URL}/`, `${SITE_URL}/sitemap-content.xml`),
  ]);
  console.log("[notify] GSC 사이트맵 제출 완료");

  // IndexNow — Naver + Bing (한도 없음)
  const result = await pingIndexNow(urls);
  console.log("[notify] IndexNow 전송:", result.results.join(" | "));
}

run().catch((e) => {
  console.error("[notify] 오류:", e);
  process.exit(1);
});
