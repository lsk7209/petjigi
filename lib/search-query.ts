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

/**
 * 캐시에 항목을 넣고 hard cap을 넘지 않게 한다. 삽입 "이후"에 상한을 맞추므로 cap+1이 되지 않고,
 * 기존 키는 삭제 후 재삽입해 가장 최근 항목으로 취급한다(오래된 순 제거와 일관).
 */
export function setBoundedSearchCache<K, V extends CacheEntryLike>(
  cache: Map<K, V>,
  key: K,
  value: V,
  now: number,
  hardCap: number = SEARCH_CACHE_HARD_CAP
): void {
  cache.delete(key);
  cache.set(key, value);
  for (const [k, v] of cache) {
    if (cache.size <= hardCap) break;
    if (v.expires < now && k !== key) cache.delete(k);
  }
  while (cache.size > hardCap) {
    const oldestKey = cache.keys().next().value;
    if (oldestKey === undefined || oldestKey === key) break;
    cache.delete(oldestKey);
  }
}
