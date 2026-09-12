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
  | "UNVERIFIED_REVIEW_CLAIM";

const REVIEW_CLAIM = /전문가 검토|수의사 검토|의료진 검토/;

export function isHighRiskContent(record: ContentRiskGateRecord): boolean {
  return record.ymyl === true || [3, 4, 6].includes(record.category ?? -1);
}

export function evaluateChangedHighRiskContent(record: ContentRiskGateRecord): ContentRiskIssue[] {
  if (record.status !== "published" || !isHighRiskContent(record)) return [];

  const issues: ContentRiskIssue[] = [];
  if (record.sourceCount === 0) issues.push("MISSING_SOURCES");
  if (!record.disclaimer?.trim()) issues.push("MISSING_DISCLAIMER");
  if (REVIEW_CLAIM.test([
    record.metaTitle,
    record.metaDescription,
    record.body,
  ].filter(Boolean).join("\n"))) {
    issues.push("UNVERIFIED_REVIEW_CLAIM");
  }
  return issues;
}

export function countStoredSources(value: unknown): number {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim().length > 0).length;
  }
  if (typeof value !== "string" || !value.trim()) return 0;
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === "string" && item.trim().length > 0).length
      : 0;
  } catch {
    return 0;
  }
}

export function evaluatePublicationCandidate(record: Omit<ContentRiskGateRecord, "status" | "sourceCount"> & {
  sources: unknown;
}): ContentRiskIssue[] {
  return evaluateChangedHighRiskContent({
    ...record,
    status: "published",
    sourceCount: countStoredSources(record.sources),
  });
}

export function parseAddedLineRanges(diff: string): Map<string, ChangedLineRange[]> {
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
    if (count > 0) result.get(currentFile)?.push({ start, end: start + count - 1 });
  }

  return result;
}

export function rangesOverlap(
  recordStart: number,
  recordEnd: number,
  ranges: ChangedLineRange[]
): boolean {
  return ranges.some((range) => range.start <= recordEnd && range.end >= recordStart);
}

export function includeEntireFiles(
  rangesByFile: Map<string, ChangedLineRange[]>,
  files: string[]
): Map<string, ChangedLineRange[]> {
  for (const file of files) {
    if (file) rangesByFile.set(file.replaceAll("\\", "/"), [{ start: 1, end: Number.MAX_SAFE_INTEGER }]);
  }
  return rangesByFile;
}
