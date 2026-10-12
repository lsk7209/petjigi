/**
 * Google Consent Mode v2 기본 상태와 CMP 업데이트 adapter.
 * 자체 배너는 만들지 않는다 — 인증 CMP(또는 향후 배너)가 updateGoogleConsent를 호출한다.
 */

export const CONSENT_KEYS = [
  "ad_storage",
  "analytics_storage",
  "ad_user_data",
  "ad_personalization",
] as const;

export type ConsentKey = (typeof CONSENT_KEYS)[number];
export type ConsentValue = "granted" | "denied";
export type ConsentState = Record<ConsentKey, ConsentValue>;

/** CMP 연결 전 기본값 — 모든 항목 denied */
export const DEFAULT_CONSENT: ConsentState = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

/** CMP가 대기할 수 있는 최대 시간(ms) */
export const CONSENT_WAIT_MS = 500;

/** Google 태그보다 먼저 실행되는 인라인 스크립트 본문 */
export function buildConsentDefaultScript(): string {
  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag=window.gtag||gtag;",
    `gtag('consent','default',${JSON.stringify({ ...DEFAULT_CONSENT, wait_for_update: CONSENT_WAIT_MS })});`,
    "gtag('set','ads_data_redaction',true);",
    "gtag('set','url_passthrough',false);",
  ].join("");
}

/** CMP 명시 동의 결과를 gtag에 전달. 누락된 키는 denied로 간주한다. */
export function updateGoogleConsent(
  partial: Partial<ConsentState>,
): ConsentState {
  const next: ConsentState = { ...DEFAULT_CONSENT };
  for (const key of CONSENT_KEYS) {
    if (partial[key] === "granted") next[key] = "granted";
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", next);
    window.gtag("set", "ads_data_redaction", next.ad_storage !== "granted");
  }
  return next;
}
