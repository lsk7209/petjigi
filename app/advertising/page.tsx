import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/lib/site-identity";
import { breadcrumbSchema } from "@/lib/seo/structured-data";
import Link from "next/link";
import {
  ADVERTISING_DESCRIPTION,
  AFFILIATE_STATUS_TEXT,
  MEMORIAL_ADS_POLICY_TEXT,
  REVENUE_DISCLOSURE_UPDATED,
  REVENUE_METHOD_TEXT,
} from "@/lib/revenue-disclosure";
import { AdsenseTrustSection } from "@/components/content/adsense-trust-section";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "광고 게재 정책", url: `${SITE_URL}/advertising` },
]);

export const metadata: Metadata = {
  title: { absolute: "광고 게재 정책 | 펫지기" },
  description: ADVERTISING_DESCRIPTION,
  alternates: { canonical: "/advertising" },
  robots: { index: true, follow: true },
};

export default function AdvertisingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <main className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
      <h1>광고 게재 정책</h1>
      <p className="text-sm text-[var(--brand-text-secondary)]">최종 업데이트: {REVENUE_DISCLOSURE_UPDATED}</p>

      <h2>광고 게재 사실</h2>
      <p>펫지기는 Google AdSense를 이용해 광고를 표시할 수 있습니다. 광고 승인·정책에 따라 광고가 표시되지 않는 페이지도 있으며, 표시되는 광고는 Google의 알고리즘에 따라 개인화될 수 있습니다.</p>

      <h2>광고와 콘텐츠 구분</h2>
      <p>광고는 &quot;광고&quot; 또는 &quot;Ads&quot; 라벨로 콘텐츠와 명확히 구분됩니다.</p>

      <h2>사용자 추적</h2>
      <p>광고 맞춤화를 위해 쿠키 및 유사 기술이 사용될 수 있습니다. 브라우저 설정에서 쿠키를 거부할 수 있습니다.</p>

      <h2>수익화 방식</h2>
      <p>{REVENUE_METHOD_TEXT} {AFFILIATE_STATUS_TEXT} 자세한 내용은 <Link href="/disclosure">어필리에이트 고지</Link>를 참고하세요.</p>

      <h2>장례·추모 카테고리 광고 정책</h2>
      <p>{MEMORIAL_ADS_POLICY_TEXT}</p>

      <AdsenseTrustSection compact />

      <p>문의: {SITE_IDENTITY.contactEmail}</p>
    </main>
    </>
  );
}
