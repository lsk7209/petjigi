import type { CategoryId } from "./category";
import { CATEGORIES } from "./category";

// 약사법·동물의료법 금지어 (spec §2 금기 7, legal-content-guide §1)
const PROHIBITED_PATTERNS = [
  /치료한다|치료된다|치료법/g,
  /효능|효과\s*있다/g,
  /낫는다|나을\s*수\s*있다/g,
  /면역력\s*강화|면역\s*증진/g,
  /예방한다/g,
  /부작용\s*없다/g,
  /수의사\s*추천(?!\s*을)/g,
  /확실히\s*좋다|보장한다/g,
  /당장\s*효과|즉시\s*개선/g,
  /암\s*예방|당뇨\s*예방/g,
  /관절염\s*효과/g,
];

export interface ScanResult {
  passed: boolean;
  matches: string[];
}

export function scanProhibitedKeywords(text: string): ScanResult {
  const matches: string[] = [];
  for (const pattern of PROHIBITED_PATTERNS) {
    const found = text.match(pattern);
    if (found) matches.push(...found);
  }
  return { passed: matches.length === 0, matches };
}

export function getDisclaimer(categoryId: CategoryId): string | null {
  return CATEGORIES[categoryId].disclaimer;
}

export function requiresReviewQueue(categoryId: CategoryId): boolean {
  return CATEGORIES[categoryId].ymyl;
}

// E-E-A-T 필수 필드 검증 (YMYL 카테고리)
export interface EeatFields {
  authorName?: string | null;
  authorCredential?: string | null;
  reviewedAt?: string | null;
  reviewerName?: string | null;
  sources?: string[] | null;
  disclaimer?: string | null;
}

export interface ReviewEvidence {
  reviewedAt: string;
  reviewerName: string;
}

const REVIEWER_PLACEHOLDERS = new Set(["검수대기", "검토대기", "pending", "rejected"]);

export function hasValidReviewDate(value?: string | null): value is string {
  if (!value?.trim()) return false;

  const normalized = value.trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(normalized);
  if (!match || Number.isNaN(Date.parse(normalized))) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const calendarDate = new Date(Date.UTC(year, month - 1, day));
  return (
    calendarDate.getUTCFullYear() === year &&
    calendarDate.getUTCMonth() + 1 === month &&
    calendarDate.getUTCDate() === day
  );
}

export function getReviewEvidence({
  reviewedAt,
  reviewerName,
}: Pick<EeatFields, "reviewedAt" | "reviewerName">): ReviewEvidence | null {
  const normalizedReviewerName = reviewerName?.replace(/\s+/g, " ").trim();
  const placeholderKey = normalizedReviewerName?.replace(/\s/g, "").toLowerCase();
  if (!normalizedReviewerName || (placeholderKey && REVIEWER_PLACEHOLDERS.has(placeholderKey))) {
    return null;
  }

  if (!hasValidReviewDate(reviewedAt)) return null;

  return { reviewedAt: reviewedAt.trim(), reviewerName: normalizedReviewerName };
}

export function validateEeat(fields: EeatFields): string[] {
  const missing: string[] = [];
  if (!fields.authorName) missing.push("authorName");
  if (!fields.authorCredential) missing.push("authorCredential");
  if (!fields.reviewedAt) missing.push("reviewedAt");
  if (!fields.reviewerName) missing.push("reviewerName");
  if (!fields.sources || fields.sources.length < 2) missing.push("sources (최소 2건)");
  if (!fields.disclaimer) missing.push("disclaimer");
  return missing;
}
