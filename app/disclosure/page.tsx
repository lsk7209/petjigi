import type { Metadata } from "next";
import { SITE_IDENTITY } from "@/lib/site-identity";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "어필리에이트 고지", url: `${SITE_URL}/disclosure` },
]);

export const metadata: Metadata = {
  title: { absolute: "어필리에이트 고지 | 펫지기" },
  description: "펫지기 제휴(어필리에이트) 고지 — 현재 게재된 제휴 링크 현황과 앞으로 제휴 링크를 게재할 때의 표시 방침.",
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
        최종 업데이트: 2026-10-10
      </p>

      <h2>현재 상태</h2>
      <p>
        2026-10-10 기준으로 펫지기가 게재한 제휴(수수료) 링크는 없습니다. 펫보험 안내 페이지의 외부 링크는
        보험사 공식 상품 페이지로 연결되며, 이 링크로 펫지기가 수수료를 받지 않습니다.
      </p>

      <h2>제휴 링크를 게재하게 될 경우</h2>
      <p>
        앞으로 제휴 링크를 게재하면 이 페이지에 프로그램 이름을 추가하고, 해당 페이지 상단과 링크 근처에
        제휴 링크임을 표시하며, 링크에 rel=&quot;sponsored nofollow&quot; 속성을 붙입니다. 수수료는 이용자가
        추가로 부담하는 비용이 아닙니다. 수수료 여부와 관계없이 콘텐츠는 공식 자료와 이용자에게 필요한
        확인 항목을 기준으로 작성합니다.
      </p>

      <p>문의: {SITE_IDENTITY.contactEmail}</p>
    </main>
    </>
  );
}
