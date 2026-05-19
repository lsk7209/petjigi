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
