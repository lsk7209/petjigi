/**
 * 검색엔진 알림(IndexNow/사이트맵 등) 대상 URL 후보를 만든다.
 *
 * 기존 scripts/notify-published.ts는 publishedAt >= since 만 검사해 미래
 * 예약 발행 글도 후보에 포함시켰고(F04), unknown 타입을 guide로 fallback해
 * breed처럼 실제로 다른 테이블·경로를 쓰는 콘텐츠에 잘못된 URL을 만들 수 있었다.
 * 이 모듈은 lib/content-publication.ts의 공개 판정과 lib/search-contract.ts의
 * href builder를 재사용해 그 두 문제를 함께 막는다.
 */
import { isPubliclyVisibleContent } from "../content-publication";
import { buildContentHref } from "../search-contract";

export interface NotificationSourceRow {
  slug: string;
  type: string;
  status: string;
  publishedAt: string | null;
}

export interface NotificationCandidate {
  slug: string;
  type: string;
  path: string;
  publishedAt: string | null;
}

/**
 * 지금 실제로 공개 상태인 행만 후보로 만든다. review_queue, 미래 발행,
 * 지원하지 않는 type(breed 등 별도 테이블/경로를 쓰는 것)은 제외한다.
 */
export function buildNotificationCandidates(
  rows: NotificationSourceRow[],
  now: Date = new Date()
): NotificationCandidate[] {
  const candidates: NotificationCandidate[] = [];
  for (const row of rows) {
    if (!isPubliclyVisibleContent(row, now)) continue;
    const path = buildContentHref(row.type, row.slug);
    if (!path) continue;
    candidates.push({ slug: row.slug, type: row.type, path, publishedAt: row.publishedAt });
  }
  return candidates;
}
