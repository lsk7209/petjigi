import { CONTENT_REDIRECTS } from "../content-redirects";

/**
 * 본문 HTML의 /guide·/blog·/condition 내부 링크 중 지금 공개되지 않은 문서를 가리키는 것은
 * 링크를 풀고 텍스트만 남긴다(404로 가는 링크 방지). 공개 문서이거나 공개 문서로 리디렉션되는 링크는 유지한다.
 */
const CONTENT_ANCHOR =
  /<a\b[^>]*?\bhref=(["'])(?:https?:\/\/(?:www\.)?petjigi\.kr)?\/(guide|blog|condition)\/([a-z0-9-]+)\/?(?:[?#][^"']*)?\1[^>]*>([\s\S]*?)<\/a>/gi;

const REDIRECT_TARGETS: ReadonlyMap<string, string> = new Map(
  CONTENT_REDIRECTS.map((r) => [r.from.replace(/^\//, ""), r.to.replace(/^\//, "")]),
);

export function isLinkable(key: string, publicKeys: ReadonlySet<string>): boolean {
  if (publicKeys.has(key)) return true;
  const target = REDIRECT_TARGETS.get(key);
  return target !== undefined && publicKeys.has(target);
}

export function unlinkUnpublishedContentLinks(html: string, publicKeys: ReadonlySet<string>): string {
  return html.replace(CONTENT_ANCHOR, (anchor, _quote, type: string, slug: string, text: string) =>
    isLinkable(`${type.toLowerCase()}/${slug}`, publicKeys) ? anchor : text,
  );
}
