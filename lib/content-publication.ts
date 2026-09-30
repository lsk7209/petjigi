/**
 * 콘텐츠 공개 판정 — 검색, 알림, 사이트맵, 피드 등 여러 경로에서 공유해야 하는
 * "지금 실제로 공개 상태인 콘텐츠"의 단일 정의.
 *
 * 공개 조건: status='published' AND type이 실제 존재하는 라우트를 가리킴
 *            AND publishedAt이 유효한 날짜이며 now 이하.
 *
 * `now`는 항상 호출자가 주입한다 (테스트에서 고정 가능하게).
 */

/** 실제 /guide, /blog, /condition 라우트로 렌더링되는 contents.type 값만 포함한다.
 *  breed/business_overlay/comparison 등은 별도 테이블·라우트를 쓰므로 여기서 제외한다. */
export const PUBLIC_CONTENT_TYPES = new Set(["guide", "blog", "condition"] as const);

export type PublicContentType = "guide" | "blog" | "condition";

export interface ContentPublicationInput {
  status: string;
  type: string;
  publishedAt: string | null | undefined;
}

function isValidPastOrPresentDate(publishedAt: string | null | undefined, now: Date): boolean {
  if (!publishedAt) return false;
  const parsed = new Date(publishedAt);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.getTime() <= now.getTime();
}

export function isPublicContentType(type: string): type is PublicContentType {
  return PUBLIC_CONTENT_TYPES.has(type as PublicContentType);
}

/**
 * 검색·알림·피드·사이트맵·OG에서 공통으로 써야 하는 공개 판정.
 * status가 published가 아니거나, 지원하지 않는 type이거나, publishedAt이 없거나
 * 미래이면 false를 반환한다.
 */
export function isPubliclyVisibleContent(
  input: ContentPublicationInput,
  now: Date = new Date()
): boolean {
  if (input.status !== "published") return false;
  if (!isPublicContentType(input.type)) return false;
  return isValidPastOrPresentDate(input.publishedAt, now);
}
