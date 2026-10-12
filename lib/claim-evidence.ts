/**
 * 주장-출처 증거 추적. 위험 주장(기관 권고·수치·응급 기준 등)을 본문에서 추출하고
 * docs/claim-verification/manifest.json의 상태와 대조한다.
 * URL이 존재한다는 이유만으로 verified로 취급하지 않는다 — verified는 사람이 원문과 대조해 manifest에 기록한다.
 */

export const CLAIM_STATUSES = [
  "verified",
  "qualified",
  "removed",
  "needs_review",
] as const;
export const SOURCE_TYPES = [
  "official",
  "primary_research",
  "professional_guideline",
  "secondary",
  "unknown",
] as const;
/** verified로 인정할 수 있는 근거 유형 */
const VERIFIABLE_SOURCE_TYPES: readonly string[] = [
  "official",
  "primary_research",
  "professional_guideline",
];

export type ClaimStatus = (typeof CLAIM_STATUSES)[number];
export type SourceType = (typeof SOURCE_TYPES)[number];

export interface ManifestClaim {
  claimId: string;
  snippet: string;
  sourceUrl: string | null;
  sourceType: SourceType;
  status: ClaimStatus;
  checkedAt: string | null;
  notes: string;
}

export interface ManifestEntry {
  slug: string;
  claims: ManifestClaim[];
}

export type ClaimIssueCode =
  | "UNTRACKED_RISKY_CLAIM"
  | "INVALID_VERIFIED_EVIDENCE"
  | "STALE_CLAIM_SNIPPET"
  | "REMOVED_CLAIM_STILL_PRESENT";

export interface ClaimIssue {
  code: ClaimIssueCode;
  snippet: string;
  claimId?: string;
}

export interface ClaimEvaluation {
  riskyCount: number;
  byStatus: Record<ClaimStatus, number>;
  untracked: string[];
  issues: ClaimIssue[];
}

const ORGANIZATIONS =
  "농림축산식품부|농식품부|동물보호법|AVMA|AAHA|AAFP|AKC|APPA|PIJAC|VCA|ASPCA|WSAVA|FDA|FEDIAF|NRC|금융감독원|금감원|소비자원|한국소비자원|질병관리청|식품의약품안전처|식약처|보건복지부|환경부|국토교통부|농림축산검역본부|대한수의사회|국가법령정보센터|법제처";
const ORG_CLAIM = new RegExp(
  `(?:${ORGANIZATIONS})[^.。!?]{0,60}(?:\\d{4}\\s*년|\\d)`,
);
const ORG_ONLY = new RegExp(`(?:${ORGANIZATIONS})`);
const RECOMMEND_VERB = /권고|권장|발표|보고(?:서|하|했)|지침|가이드라인|강조|에 따르면|확인했/;
const STAT =
  /\d+(?:[.,]\d+)?\s*(?:배|%|퍼센트|일|시간|개월|주일|주간|만\s*원|원|건|명|마리|분|살|세|kg|mg|ml|kcal|°C|℃)/;
const SAFETY_TOPIC =
  /응급|즉시|위험|독성|중독|과태료|벌금|의무|면책|대기\s*기간|보장|한도|보험료|청구|생명|치사|사망률|발병률|유병률|이용률|시장\s*규모/;

/** HTML → 줄바꿈·공백 정규화된 평문 */
export function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeSnippet(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** 위험 주장 문장 추출: 기관+연도/수치, 또는 수치+안전·법·보험 주제 */
export function extractRiskyClaims(html: string): string[] {
  const sentences = toPlainText(html).split(/(?<=[.!?。])\s+/);
  const out = new Set<string>();
  for (const raw of sentences) {
    const sentence = normalizeSnippet(raw);
    if (sentence.length < 8) continue;
    const hasStat = STAT.test(sentence);
    if (
      (ORG_CLAIM.test(sentence) && hasStat) ||
      (ORG_ONLY.test(sentence) && RECOMMEND_VERB.test(sentence)) ||
      (hasStat && SAFETY_TOPIC.test(sentence))
    ) {
      out.add(sentence.length > 160 ? sentence.slice(0, 160) : sentence);
    }
  }
  return [...out];
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function validVerifiedEvidence(claim: ManifestClaim, now: Date): boolean {
  if (!VERIFIABLE_SOURCE_TYPES.includes(claim.sourceType)) return false;
  if (!claim.sourceUrl || !/^https:\/\/[^\s]+$/.test(claim.sourceUrl))
    return false;
  if (
    !claim.checkedAt ||
    !DATE.test(claim.checkedAt) ||
    Date.parse(claim.checkedAt) > now.getTime()
  )
    return false;
  return claim.notes.trim().length > 0;
}

function matches(claimSnippet: string, sentence: string): boolean {
  const a = normalizeSnippet(claimSnippet);
  return a.length > 0 && (sentence.includes(a) || a.includes(sentence));
}

export function evaluateClaimEvidence(input: {
  bodyHtml: string;
  entry: ManifestEntry | undefined;
  now?: Date;
}): ClaimEvaluation {
  const now = input.now ?? new Date();
  const text = toPlainText(input.bodyHtml);
  const risky = extractRiskyClaims(input.bodyHtml);
  const claims = input.entry?.claims ?? [];
  const byStatus: Record<ClaimStatus, number> = {
    verified: 0,
    qualified: 0,
    removed: 0,
    needs_review: 0,
  };
  const issues: ClaimIssue[] = [];
  const untracked: string[] = [];

  for (const sentence of risky) {
    const claim = claims.find(
      (c) => c.status !== "removed" && matches(c.snippet, sentence),
    );
    if (claim) byStatus[claim.status] += 1;
    else {
      untracked.push(sentence);
      issues.push({ code: "UNTRACKED_RISKY_CLAIM", snippet: sentence });
    }
  }

  for (const claim of claims) {
    const present = text.includes(normalizeSnippet(claim.snippet));
    if (claim.status === "removed") {
      byStatus.removed += 1;
      if (present)
        issues.push({
          code: "REMOVED_CLAIM_STILL_PRESENT",
          snippet: claim.snippet,
          claimId: claim.claimId,
        });
      continue;
    }
    if (!present && !risky.some((s) => matches(claim.snippet, s))) {
      issues.push({
        code: "STALE_CLAIM_SNIPPET",
        snippet: claim.snippet,
        claimId: claim.claimId,
      });
    }
    if (claim.status === "verified" && !validVerifiedEvidence(claim, now)) {
      issues.push({
        code: "INVALID_VERIFIED_EVIDENCE",
        snippet: claim.snippet,
        claimId: claim.claimId,
      });
    }
  }

  return { riskyCount: risky.length, byStatus, untracked, issues };
}

export function claimIdFor(index: number): string {
  return `claim-${String(index).padStart(3, "0")}`;
}
