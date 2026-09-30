/**
 * 배포 후 최근 발행 콘텐츠를 IndexNow(Naver·Bing)에 전송하고 GSC에 사이트맵을 제출한다.
 * deploy.yml의 "Notify search engines" 스텝에서 실행됨
 *
 * 기준: 최근 30일 이내 실제로 공개 상태인 콘텐츠 (guide|blog|condition)
 *
 * 주의(F12): Google Indexing API는 JobPosting/BroadcastEvent 포함 VideoObject
 * 페이지로만 허용된다(공식 문서). 펫지기의 일반 가이드·블로그·질환 글은 대상이
 * 아니므로 이 스크립트는 그 API를 호출하지 않는다.
 */

import { db } from "../db/client";
import { contents } from "../db/schema";
import { eq, and, gte } from "drizzle-orm";
import { submitSitemapToGSC } from "../lib/seo/google-indexing";
import { pingIndexNow } from "../lib/seo/index-now";
import { buildNotificationCandidates } from "../lib/seo/notification-candidates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
const DAYS = 30; // 최근 N일 이내 발행분 대상

async function run() {
  const since = new Date(Date.now() - DAYS * 86_400_000).toISOString();
  const now = new Date();

  // status/publishedAt 상한 없이 폭넓게 조회한 뒤, buildNotificationCandidates가
  // 공개 판정(review_queue 제외, 미래 발행 제외, 지원 타입만 포함)을 적용한다.
  const rows = await db
    .select({ slug: contents.slug, type: contents.type, status: contents.status, publishedAt: contents.publishedAt })
    .from(contents)
    .where(and(eq(contents.status, "published"), gte(contents.publishedAt, since)));

  const candidates = buildNotificationCandidates(rows, now);

  if (candidates.length === 0) {
    console.log("[notify] 알림 대상 없음 — 종료");
    return;
  }

  // publishedAt 내림차순 정렬 — 최신 콘텐츠 우선 전송
  const sorted = candidates.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  const urls = sorted.map((c) => `${SITE_URL}${c.path}`);
  console.log(`[notify] ${urls.length}개 URL 알림 대상 (최신순):`);
  urls.slice(0, 5).forEach((u) => console.log("  ", u));
  if (urls.length > 5) console.log(`  ... 외 ${urls.length - 5}건`);

  // GSC 사이트맵 제출 (두 사이트맵 모두 — GSC가 최신 사이트맵 인식)
  await Promise.allSettled([
    submitSitemapToGSC(`${SITE_URL}/`, `${SITE_URL}/sitemap.xml`),
    submitSitemapToGSC(`${SITE_URL}/`, `${SITE_URL}/sitemap-content.xml`),
  ]);
  console.log("[notify] GSC 사이트맵 제출 완료");

  // IndexNow — Naver + Bing (한도 없음). 일반 콘텐츠 알림은 이 경로만 사용한다.
  const result = await pingIndexNow(urls);
  console.log("[notify] IndexNow 전송:", result.results.join(" | "));
}

run().catch((e) => {
  console.error("[notify] 오류:", e);
  process.exit(1);
});
