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
/** 이미 저장된 HTTP(S) 출처 URL만 링크한다. 출처 주소를 추측해서 만들지 않는다. */
export function sourceLinkParts(source: string): {before:string;href:string|null;after:string} {
  const match = /https?:\/\/[^\s<>"'()]+/.exec(source);
  if (!match) return {before:source,href:null,after:''};
  const href = match[0].replace(/[.,;]+$/, '');
  try {
    const url = new URL(href);
    if (url.username || url.password || !['http:','https:'].includes(url.protocol)) return {before:source,href:null,after:''};
  } catch {return {before:source,href:null,after:''};}
  return {before:source.slice(0,match.index),href,after:source.slice(match.index+href.length)};
}
