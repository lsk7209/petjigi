import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  CONSENT_KEYS,
  DEFAULT_CONSENT,
  buildConsentDefaultScript,
} from "../lib/privacy/google-consent";

test("기본 consent 4개 항목은 모두 denied", () => {
  assert.equal(CONSENT_KEYS.length, 4);
  for (const key of CONSENT_KEYS) assert.equal(DEFAULT_CONSENT[key], "denied");
  const script = buildConsentDefaultScript();
  assert.doesNotMatch(script, /granted/);
  assert.match(script, /ads_data_redaction/);
});

test("consent default는 GA4 config보다 먼저 실행되도록 beforeInteractive로 로드", () => {
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.ok(layout.indexOf('id="google-consent-defaults"') < layout.indexOf("<GA4 />"));
  assert.match(layout, /id="google-consent-defaults"\s+strategy="beforeInteractive"/);
});

test("GA4는 동의 없이 개인화 신호를 켜지 않음", () => {
  const ga4 = readFileSync(new URL("../components/analytics/ga4.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(ga4, /allow_google_signals:\s*true/);
  assert.doesNotMatch(ga4, /allow_ad_personalization_signals:\s*true/);
});

test("CMP update: 명시된 granted만 반영하고 거부·누락은 denied", async () => {
  const calls: unknown[][] = [];
  (globalThis as unknown as { window: unknown }).window = {
    gtag: (...args: unknown[]) => calls.push(args),
  };
  const { updateGoogleConsent } = await import("../lib/privacy/google-consent");
  const state = updateGoogleConsent({ analytics_storage: "granted", ad_storage: "denied" });
  assert.equal(state.analytics_storage, "granted");
  assert.equal(state.ad_storage, "denied");
  assert.equal(state.ad_personalization, "denied");
  assert.equal(state.ad_user_data, "denied");
  assert.deepEqual(calls[0].slice(0, 2), ["consent", "update"]);
  delete (globalThis as unknown as { window?: unknown }).window;
});
