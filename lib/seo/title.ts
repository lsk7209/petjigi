const SITE_NAME = "펫지기";
const SITE_SUFFIX_PATTERN = /(?:\s*\|\s*펫지기)+\s*$/u;

export function documentTitle(value: string): string {
  return value.replace(SITE_SUFFIX_PATTERN, "").trim();
}
export function socialTitle(value: string): string {
  const normalized = documentTitle(value);
  return normalized === SITE_NAME ? SITE_NAME : `${normalized} | ${SITE_NAME}`;
}
