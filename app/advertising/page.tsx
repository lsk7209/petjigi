import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "광고 게재 정책 | 펫지기",
  description: "펫지기 광고 게재 정책 — Google AdSense 광고 사실, 카테고리별 광고 정책, 사용자 추적 안내.",
  alternates: { canonical: "/advertising" },
  robots: { index: true, follow: false },
};

export default function AdvertisingPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
      <h1>광고 게재 정책</h1>
      <p className="text-sm text-[var(--brand-text-secondary)]">최종 업데이트: 2026-05-18</p>

      <h2>광고 게재 사실</h2>
      <p>펫지기는 Google AdSense를 통해 광고를 게재합니다. 광고는 Google의 개인화 알고리즘에 의해 표시될 수 있습니다.</p>

      <h2>광고와 콘텐츠 구분</h2>
      <p>광고는 "광고" 또는 "Ads" 라벨로 콘텐츠와 명확히 구분됩니다.</p>

      <h2>사용자 추적</h2>
      <p>광고 맞춤화를 위해 쿠키 및 유사 기술이 사용될 수 있습니다. 브라우저 설정에서 쿠키를 거부할 수 있습니다.</p>

      <h2>카테고리 6 광고 정책</h2>
      <p>장례·추모 카테고리(카테고리 6)에서는 AdSense 일반 광고가 표시되지 않습니다. 메모리얼 굿즈 어필리에이트만 노출됩니다.</p>

      <p>문의: contact@petjigi.kr</p>
    </main>
  );
}
