/**
 * 검색(및 유사 목록) 결과의 href를 서버에서 안전하게 만드는 단일 지점.
 * 클라이언트가 타입을 보고 임의로 경로를 추론하지 않도록, href 자체를 계약으로 전달한다.
 */
import { isPublicContentType, type PublicContentType } from "./content-publication";

const CONTENT_PATH_PREFIX: Record<PublicContentType, string> = {
  guide: "/guide",
  blog: "/blog",
  condition: "/condition",
};

/**
 * 콘텐츠 slug로 공개 href를 만든다.
 * 지원하지 않는 type이거나 slug가 없으면 null을 반환한다 — 호출자는 이 항목을
 * 결과에서 제외해야 하며, guide로 임의 fallback하거나 "#" 링크를 만들지 않는다.
 */
export function buildContentHref(type: string, slug: string | null | undefined): string | null {
  if (!slug) return null;
  if (!isPublicContentType(type)) return null;
  return `${CONTENT_PATH_PREFIX[type]}/${encodeURIComponent(slug)}`;
}

export interface BusinessHrefInput {
  bizType: string | null | undefined;
  sigunguSlug: string | null | undefined;
  name: string | null | undefined;
}

/**
 * 업체 상세 href를 만든다. 지역이 해소되지 않았거나 필수 값이 없으면 null을 반환한다.
 * 호출자는 null인 항목을 "#" 링크나 잘못된 지역 상세로 대체하지 않아야 한다.
 */
export function buildBusinessHref(input: BusinessHrefInput): string | null {
  const { bizType, sigunguSlug, name } = input;
  if (!bizType || !sigunguSlug || !name) return null;
  return `/${bizType}/${sigunguSlug}/${encodeURIComponent(name)}`;
}
