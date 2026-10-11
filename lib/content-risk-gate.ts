import { parseStoredSources } from "./content-sources";

export interface ChangedLineRange {
  start: number;
  end: number;
}

export interface ContentRiskGateRecord {
  slug: string;
  category: number | null;
  ymyl: boolean | null;
  status: string | null;
  sourceCount: number;
  disclaimer: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  body: string | null;
}

export type ContentRiskIssue =
  | "MISSING_SOURCES"
  | "MISSING_DISCLAIMER"
  | "UNVERIFIED_REVIEW_CLAIM"
  | "URINARY_WAIT_THRESHOLD";

const REVIEW_CLAIM = /전문가 검토|수의사 검토|의료진 검토/;

/** "소변이 N시간 이상 없음"처럼 요도 폐색 대응을 시간 경과 뒤로 미루게 읽히는 표현 */
export const URINARY_WAIT_THRESHOLD =
  /(?:소변|배뇨)[^.<\n]{0,15}?\d+\s*시간[^.<\n]{0,8}(?:없|못|안)|\d+\s*시간\s*(?:이상|동안)?\s*(?:소변|배뇨)[^.<\n]{0,10}(?:없|못|안)/;

export function isHighRiskContent(record: ContentRiskGateRecord): boolean {
  return record.ymyl === true || [3, 4, 6].includes(record.category ?? -1);
}

export function evaluateChangedHighRiskContent(
  record: ContentRiskGateRecord,
): ContentRiskIssue[] {
  if (record.status !== "published" || !isHighRiskContent(record)) return [];

  const issues: ContentRiskIssue[] = [];
  if (record.sourceCount === 0) issues.push("MISSING_SOURCES");
  if (!record.disclaimer?.trim()) issues.push("MISSING_DISCLAIMER");
  if (
    REVIEW_CLAIM.test(
      [record.metaTitle, record.metaDescription, record.body]
        .filter(Boolean)
        .join("\n"),
    )
  ) {
    issues.push("UNVERIFIED_REVIEW_CLAIM");
  }
  if (
    URINARY_WAIT_THRESHOLD.test(
      [record.metaTitle, record.metaDescription, record.body, record.disclaimer]
        .filter(Boolean)
        .join("\n"),
    )
  ) {
    issues.push("URINARY_WAIT_THRESHOLD");
  }
  return issues;
}

export function countStoredSources(value: unknown): number {
  return parseStoredSources(value).length;
}

export function evaluatePublicationCandidate(
  record: Omit<ContentRiskGateRecord, "status" | "sourceCount"> & {
    sources: unknown;
  },
): ContentRiskIssue[] {
  return evaluateChangedHighRiskContent({
    ...record,
    status: "published",
    sourceCount: countStoredSources(record.sources),
  });
}

export function parseAddedLineRanges(
  diff: string,
): Map<string, ChangedLineRange[]> {
  const result = new Map<string, ChangedLineRange[]>();
  let currentFile: string | null = null;

  for (const line of diff.split(/\r?\n/)) {
    if (line.startsWith("+++ b/")) {
      currentFile = line.slice(6);
      if (!result.has(currentFile)) result.set(currentFile, []);
      continue;
    }
    if (!currentFile || !line.startsWith("@@")) continue;

    const match = /\+(\d+)(?:,(\d+))?/.exec(line);
    if (!match) continue;
    const start = Number(match[1]);
    const count = match[2] === undefined ? 1 : Number(match[2]);
    if (count > 0)
      result.get(currentFile)?.push({ start, end: start + count - 1 });
  }

  return result;
}

export function rangesOverlap(
  recordStart: number,
  recordEnd: number,
  ranges: ChangedLineRange[],
): boolean {
  return ranges.some(
    (range) => range.start <= recordEnd && range.end >= recordStart,
  );
}

export function includeEntireFiles(
  rangesByFile: Map<string, ChangedLineRange[]>,
  files: string[],
): Map<string, ChangedLineRange[]> {
  for (const file of files) {
    if (file)
      rangesByFile.set(file.replaceAll("\\", "/"), [
        { start: 1, end: Number.MAX_SAFE_INTEGER },
      ]);
  }
  return rangesByFile;
}
