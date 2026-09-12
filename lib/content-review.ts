export interface ReviewRecord {
  reviewedAt?: string | null;
  reviewerName?: string | null;
}

/**
 * Existing content rows do not yet store reviewer qualification evidence or the
 * reviewed content version. They may expose a neutral editorial record, but
 * must not be presented as completed expert/veterinary review.
 */
export function hasDisplayableEditorialReview(record: ReviewRecord): boolean {
  return Boolean(record.reviewedAt && record.reviewerName);
}

const UNVERIFIED_REVIEW_CLAIMS = [
  /\s*\|\s*(?:전문가|수의사|의료진) 검토(?=\s*\|?|$)/g,
  /(?:전문가|수의사|의료진) 검토를 거쳐/g,
  /(?:전문가|수의사|의료진) 검토 (?:정보|자료)를 바탕으로/g,
  /(?:전문가|수의사|의료진) 검토 (?:정보|자료)로/g,
  /(?:전문가|수의사|의료진) 검토로/g,
] as const;

/**
 * Legacy rows may contain review-completion claims without the reviewer,
 * qualification, review date, and content-version evidence required for a
 * public expert-review claim. Keep the useful description while removing only
 * that unsupported status language at the presentation boundary.
 */
export function withoutUnverifiedReviewClaim(value?: string | null): string | undefined {
  if (!value) return undefined;

  const sanitized = UNVERIFIED_REVIEW_CLAIMS.reduce(
    (text, pattern) => text.replace(pattern, ""),
    value
  )
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();

  return sanitized || undefined;
}
