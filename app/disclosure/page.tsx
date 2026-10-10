import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/lib/site-identity";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import {
  AFFILIATE_STATUS_TEXT,
  DISCLOSURE_DESCRIPTION,
  FUTURE_AFFILIATE_TEXT,
  MEMORIAL_ADS_POLICY_TEXT,
  REVENUE_DISCLOSURE_UPDATED,
} from "@/lib/revenue-disclosure";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "어필리에이트 고지", url: `${SITE_URL}/disclosure` },
]);

export const metadata: Metadata = {
  title: { absolute: "어필리에이트 고지 | 펫지기" },
  description: DISCLOSURE_DESCRIPTION,
  alternates: { canonical: "/disclosure" },
  robots: { index: true, follow: true },
};

export default function DisclosurePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <main className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
      <h1>어필리에이트 고지</h1>
      <p className="text-sm text-[var(--brand-text-secondary)]">
        최종 업데이트: {REVENUE_DISCLOSURE_UPDATED}
      </p>

      <h2>현재 상태</h2>
      <p>
        {REVENUE_DISCLOSURE_UPDATED} 기준으로 {AFFILIATE_STATUS_TEXT}
      </p>
      <p>{MEMORIAL_ADS_POLICY_TEXT}</p>

      <h2>제휴 링크를 게재하게 될 경우</h2>
      <p>
        {FUTURE_AFFILIATE_TEXT} 수수료는 이용자가 추가로 부담하는 비용이 아니며, 수수료 여부와 관계없이
        콘텐츠는 공식 자료와 이용자에게 필요한 확인 항목을 기준으로 작성합니다.
      </p>

      <p>문의: {SITE_IDENTITY.contactEmail}</p>
    </main>
    </>
  );
}
