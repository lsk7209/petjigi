const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => XML_ENTITIES[ch]);
}

/** 경로 세그먼트를 URL 인코딩한 뒤 XML 이스케이프한 <loc> 값을 만든다. */
export function sitemapLoc(siteUrl: string, ...segments: string[]): string {
  return escapeXml([siteUrl, ...segments.map(encodeURIComponent)].join("/"));
}
