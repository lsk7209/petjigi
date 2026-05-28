import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "어필리에이트 고지", url: `${SITE_URL}/disclosure` },
]);

export const metadata: Metadata = {
  title: "어필리에이트 고지 | 펫지기",
  description: "펫지기 어필리에이트 고지 — 제휴 링크 사실, 참여 프로그램, 추천의 객관성 보장 방침.",
  alternates: { canonical: "/disclosure" },
  robots: { index: true, follow: false },
};

export default function DisclosurePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <main className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
      <h1>어필리에이트 고지</h1>
      <p className="text-sm text-[var(--brand-text-secondary)]">
        최종 업데이트: 2026-05-18
      </p>

      <p>
        펫지기는 일부 페이지에 어필리에이트(제휴) 링크를 포함합니다.
        사용자가 링크를 통해 구매·가입·예약을 완료하면 펫지기는 일정 수수료를 받습니다.
        수수료는 사용자가 추가로 부담하는 비용이 아닙니다.
      </p>

      <h2>참여 프로그램</h2>
      <ul>
        <li>쿠팡파트너스 (펫푸드·메모리얼 굿즈)</li>
        <li>비마이펫 어필리에이트 (펫보험)</li>
        <li>라이펫 어필리에이트 (펫보험, 트래픽 안착 후)</li>
      </ul>

      <h2>추천의 객관성</h2>
      <p>
        어필리에이트 수수료가 콘텐츠 객관성에 영향을 주지 않도록, 추천 기준은
        어필리에이트 가입 여부가 아닌 사용자 가치 기준으로 결정합니다.
      </p>

      <h2>어필리에이트 링크 표시</h2>
      <ul>
        <li>페이지 상단 고지</li>
        <li>링크 근처 "제휴 링크" 라벨</li>
        <li>HTML rel="sponsored nofollow" 속성</li>
      </ul>

      <p>문의: contact@petjigi.kr</p>
    </main>
    </>
  );
}
