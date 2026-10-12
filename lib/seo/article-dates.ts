/**
 * Article 날짜 판정. JSON-LD·Open Graph·화면 표시가 같은 값을 쓰도록 단일 출처로 둔다.
 * reviewedAt은 검토 기록용이며 수정일 대체값으로 쓰지 않는다.
 */

export interface ArticleDates {
  datePublished?: string;
  dateModified?: string;
}

function parse(value: string | null | undefined): number | null {
  if (!value) return null;
  const ts = Date.parse(value);
  return Number.isFinite(ts) ? ts : null;
}

export function resolveArticleDates(input: {
  publishedAt?: string | null;
  updatedAt?: string | null;
  now?: Date;
}): ArticleDates {
  const now = (input.now ?? new Date()).getTime();
  const published = parse(input.publishedAt);
  const updated = parse(input.updatedAt);

  const publishedOk = published !== null && published <= now;
  const datePublished = publishedOk ? (input.publishedAt as string) : undefined;

  // 수정일: 미래 날짜 금지, 발행일보다 빠르면 생략하고 발행일로 대체
  const updatedOk = updated !== null && updated <= now && (!publishedOk || updated >= (published as number));
  if (updatedOk) return { datePublished, dateModified: input.updatedAt as string };
  return { datePublished, dateModified: datePublished };
}
