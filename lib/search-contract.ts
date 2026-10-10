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

export interface RegionSlugRow {
  sigungu: string;
  sigunguSlug: string;
}

/**
 * 시군구 이름 → slug 매핑. 같은 이름의 지역 행이 여럿이어도(서울/부산 강서구) 모두 같은 slug를 쓰면
 * 그 slug가 곧 URL이며, 상세 페이지가 저장된 시군구명으로 업체를 확정하므로 매핑에 포함한다.
 * 같은 이름에 서로 다른 slug가 섞여 있으면 어느 쪽인지 알 수 없으므로 제외한다 —
 * 호출자는 매핑이 없는 항목의 상세 링크를 만들지 않는다.
 */
export function buildUniqueRegionSlugMap(rows: RegionSlugRow[]): Map<string, string> {
  const slugs = new Map<string, string>();
  const conflicting = new Set<string>();
  for (const { sigungu, sigunguSlug } of rows) {
    const existing = slugs.get(sigungu);
    if (existing === undefined) slugs.set(sigungu, sigunguSlug);
    else if (existing !== sigunguSlug) conflicting.add(sigungu);
  }
  for (const name of conflicting) slugs.delete(name);
  return slugs;
}
