/**
 * 내부 링크 판정 (순수 함수). 파일/DB 접근 없이 canonical inventory와 리디렉션 목록만으로 판정한다.
 * 외부 URL·mailto·tel·앵커 전용 링크는 내부 오류로 분류하지 않는다.
 */

export type NormalizedHref =
  | { kind: "internal"; path: string }
  | { kind: "external"; href: string }
  | { kind: "ignored"; href: string };

export type LinkVerdict =
  | { status: "ok"; path: string }
  | { status: "redirect"; path: string; target: string }
  | { status: "broken"; path: string; suggestion: LinkSuggestion | null };

export interface LinkSuggestion {
  target: string;
  confidence: "high";
  reason: string;
}

export interface LinkInventory {
  /** 정확히 일치해야 하는 canonical 경로 (정적 라우트 + 공개 콘텐츠 + 허브) */
  paths: ReadonlySet<string>;
  /** 동적 라우트 판정 (예: 업체 상세 /{type}/{sigungu}/{slug}) — true면 유효 */
  dynamicMatchers: readonly ((path: string) => boolean)[];
  /** 리디렉션 원본 → 대상 */
  redirects: ReadonlyMap<string, string>;
}

const IGNORED_PROTOCOL = /^(mailto:|tel:|sms:|javascript:|data:|#)/i;

/** 내부 URL 정규화: query·fragment 제거, percent-decoding, 끝 슬래시 제거 */
export function normalizeHref(href: string, siteUrl: string): NormalizedHref {
  const raw = href.trim();
  if (!raw || IGNORED_PROTOCOL.test(raw)) return { kind: "ignored", href: raw };
  let url: URL;
  try {
    url = new URL(raw, siteUrl);
  } catch {
    return { kind: "ignored", href: raw };
  }
  const site = new URL(siteUrl);
  const sameHost =
    url.hostname === site.hostname || url.hostname === `www.${site.hostname}`;
  if (!/^https?:$/.test(url.protocol) || !sameHost)
    return { kind: "external", href: raw };
  return { kind: "internal", path: normalizePath(url.pathname) };
}

export function normalizePath(pathname: string): string {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // 잘못된 percent-encoding은 원문 유지
  }
  const trimmed = decoded.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function lastSegment(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? "";
}

/** 같은 마지막 slug를 가진 canonical 경로가 정확히 하나일 때만 high confidence 제안 */
function suggestExact(
  path: string,
  inventory: LinkInventory,
): LinkSuggestion | null {
  const slug = lastSegment(path);
  if (!slug) return null;
  const sameSlug = [...inventory.paths].filter(
    (p) => p !== path && lastSegment(p) === slug,
  );
  if (sameSlug.length !== 1) return null;
  return {
    target: sameSlug[0],
    confidence: "high",
    reason: `동일 slug의 공개 문서가 ${sameSlug[0]} 하나뿐`,
  };
}

export function resolveInternalPath(
  path: string,
  inventory: LinkInventory,
): LinkVerdict {
  const redirect = inventory.redirects.get(path);
  if (redirect) return { status: "redirect", path, target: redirect };
  if (
    inventory.paths.has(path) ||
    inventory.dynamicMatchers.some((m) => m(path))
  ) {
    return { status: "ok", path };
  }
  return { status: "broken", path, suggestion: suggestExact(path, inventory) };
}

/** href → 판정. 외부·무시 대상은 null */
export function resolveHref(
  href: string,
  siteUrl: string,
  inventory: LinkInventory,
): LinkVerdict | null {
  const normalized = normalizeHref(href, siteUrl);
  return normalized.kind === "internal"
    ? resolveInternalPath(normalized.path, inventory)
    : null;
}

/** HTML 본문에서 <a href> 값 추출 */
export function extractAnchorHrefs(html: string): string[] {
  const out: string[] = [];
  for (const m of html.matchAll(/<a\b[^>]*?\bhref\s*=\s*(["'])([\s\S]*?)\1/gi))
    out.push(m[2]);
  return out;
}
