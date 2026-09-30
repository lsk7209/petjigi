/**
 * 업체 상세 페이지(/{type}/{sigungu}/{slug})의 후보 선택 계약.
 *
 * 기존 인라인 조회(app/[sigungu]/[type]/[slug]/page.tsx)는 type+name만 비교해
 * 다른 시도의 동명업체나 같은 지역의 동명업체가 있어도 DB가 반환하는 첫 행을
 * 그대로 쓴다. 이 모듈은 호출자가 URL의 sigungu 세그먼트로 후보를 좁히고,
 * 여전히 모호하면 임의로 첫 행을 선택하지 않도록 강제한다.
 *
 * 최종 식별자는 business.id이며, 이 계약은 그 축소 규칙만 담당한다.
 */

export interface BusinessCandidate {
  id: string;
  type: string;
  name: string;
  addressSigungu: string | null;
  status: string;
}

export type BusinessMatchResult =
  | { kind: "resolved"; business: BusinessCandidate }
  | { kind: "ambiguous"; candidates: BusinessCandidate[] }
  | { kind: "missing" };

export interface BusinessMatchQuery {
  sigungu: string;
}

/**
 * type+name으로 조회된 후보 목록을 URL의 sigungu로 좁히고 폐업(closed)을 제외한다.
 * 좁힌 결과가 정확히 하나면 resolved, 둘 이상이면 ambiguous(첫 행 임의 선택 금지),
 * 없으면 missing을 반환한다.
 */
export function pickUniqueBusinessMatch(
  candidates: BusinessCandidate[],
  query: BusinessMatchQuery
): BusinessMatchResult {
  const scoped = candidates.filter(
    (c) => c.addressSigungu === query.sigungu && c.status !== "closed"
  );
  if (scoped.length === 0) return { kind: "missing" };
  if (scoped.length === 1) return { kind: "resolved", business: scoped[0] };
  return { kind: "ambiguous", candidates: scoped };
}
