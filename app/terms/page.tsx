import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "이용약관", url: `${SITE_URL}/terms` },
]);

export const metadata: Metadata = {
  title: "이용약관 | 펫지기",
  description: "펫지기 이용약관 — 서비스 이용 조건, 면책 사항, 저작권 정책을 확인하세요.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <main className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
      <h1>이용약관</h1>
      <p className="text-sm text-[var(--brand-text-secondary)]">최종 업데이트: 2026-05-18</p>

      <h2>제1조 (목적)</h2>
      <p>이 약관은 펫지기(이하 "서비스")의 이용 조건 및 절차, 이용자와 운영자의 권리·의무를 규정합니다.</p>

      <h2>제2조 (서비스 내용)</h2>
      <p>펫지기는 공공데이터 기반 반려동물 정보를 제공하는 무료 정보 서비스입니다. 의료·법률·보험 자문 서비스가 아닙니다.</p>

      <h2>제3조 (정보의 정확성)</h2>
      <p>본 서비스는 공공데이터포털(data.go.kr), LOCALDATA 등 공공데이터를 기반으로 정보를 제공합니다. 제공된 정보의 정확성을 위해 노력하나, 오류가 있을 수 있습니다. 중요한 결정은 반드시 공식 기관 또는 전문가와 확인하세요.</p>

      <h2>제4조 (면책)</h2>
      <p>펫지기는 제공된 정보를 기반으로 한 이용자의 결정에 대해 책임을 지지 않습니다.</p>

      <h2>제5조 (저작권)</h2>
      <p>본 서비스의 콘텐츠 저작권은 펫지기에 있습니다. 공공데이터는 해당 라이선스에 따릅니다.</p>

      <p>문의: contact@petjigi.kr</p>
    </main>
    </>
  );
}
