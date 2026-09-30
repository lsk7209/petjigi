/**
 * app/api/search/route.ts 가 쓰는 순수 로직을 분리해 단위 테스트 가능하게 한다.
 * DB나 Next.js 런타임에 의존하지 않는다.
 */

export const SEARCH_CACHE_HARD_CAP = 500;
export const SEARCH_MAX_QUERY_LENGTH = 100;
export const SEARCH_RESULT_LIMIT = 20;

export interface CacheEntryLike {
  expires: number;
}

/**
 * 캐시가 hard cap을 초과하면, 먼저 만료된 항목을 지우고 그래도 초과하면
 * Map 삽입 순서(가장 오래 전에 넣은 것)부터 제거해 hard cap을 절대 넘지 않게 한다.
 */
export function enforceSearchCacheCap<K, V extends CacheEntryLike>(
  cache: Map<K, V>,
  now: number,
  hardCap: number = SEARCH_CACHE_HARD_CAP
): void {
  if (cache.size <= hardCap) return;
  for (const [k, v] of cache) {
    if (v.expires < now) cache.delete(k);
  }
  while (cache.size > hardCap) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === undefined) break;
    cache.delete(oldestKey);
  }
}

/** 검색어 길이를 코드 포인트(문자) 기준으로 검사한다 (surrogate pair 오탐 방지). */
export function codePointLength(value: string): number {
  return [...value].length;
}

export function isValidSearchQueryLength(value: string): boolean {
  const len = codePointLength(value);
  return len >= 2 && len <= SEARCH_MAX_QUERY_LENGTH;
}

/**
 * LIKE의 %, _ 와일드카드와 이스케이프 문자(\)를 리터럴로 취급하도록 이스케이프한 뒤
 * 부분일치 패턴(%value%)으로 감싼다. 매개변수 바인딩은 호출자가 그대로 유지한다.
 */
export function likeLiteralPattern(q: string): string {
  const escaped = q.replace(/[\\%_]/g, (ch) => `\\${ch}`);
  return `%${escaped}%`;
}

export type AllowedSearchType = "business" | "guide" | null;

/** searchParams의 type 값이 지원되는 값인지 검사한다. */
export function isSupportedSearchType(type: string | null): type is AllowedSearchType {
  return type === null || type === "business" || type === "guide";
}
