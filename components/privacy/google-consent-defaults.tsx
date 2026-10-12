import Script from "next/script";
import { buildConsentDefaultScript } from "@/lib/privacy/google-consent";

/** GA4·AdSense 로더보다 먼저 Consent Mode v2 기본값(denied)을 설정 */
export function GoogleConsentDefaults() {
  return (
    <Script id="google-consent-defaults" strategy="beforeInteractive">
      {buildConsentDefaultScript()}
    </Script>
  );
}
