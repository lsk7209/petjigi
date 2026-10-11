const MAX_UNWRAP_DEPTH = 3;

/**
 * 저장된 출처 값을 문자열 배열로 정규화한다.
 * json 모드 컬럼에 시드의 JSON.stringify 결과가 한 번 더 직렬화돼
 * 배열·JSON 문자열·이중 인코딩 문자열이 섞여 있다.
 */
export function parseStoredSources(value: unknown): string[] {
  let current: unknown = value;
  for (let depth = 0; depth <= MAX_UNWRAP_DEPTH; depth += 1) {
    if (Array.isArray(current)) {
      return current
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    if (typeof current !== "string" || !current.trim()) return [];
    try {
      current = JSON.parse(current);
    } catch {
      return [];
    }
  }
  return [];
}
