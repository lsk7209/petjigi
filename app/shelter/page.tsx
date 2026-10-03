import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/seo/structured-data";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const metadata: Metadata = {
  title: { absolute: "전국 동물보호센터 안내 | 유기동물 보호소 | 펫지기" },
  description:
    "전국 공공 동물보호센터 정보와 유기동물 입양·보호 안내. 농림축산검역본부 국가동물보호정보시스템(APMS) 공공데이터 기반.",
  alternates: { canonical: "/shelter" },
  openGraph: {
    title: "전국 동물보호센터 안내 | 펫지기",
    description: "전국 공공 동물보호센터와 유기동물 입양·보호 안내.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "전국 동물보호센터 안내 | 펫지기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "전국 동물보호센터 안내 | 펫지기",
    description: "전국 공공 동물보호센터와 유기동물 입양·보호 안내.",
    images: ["/opengraph-image"],
  },
};

const SHELTER_REGIONS = [
  { sido: "서울", slug: "seoul", sigungus: [{ name: "강남구", slug: "gangnam" }, { name: "강동구", slug: "gangdong" }, { name: "마포구", slug: "mapo" }, { name: "송파구", slug: "songpa" }] },
  { sido: "경기", slug: "gyeonggi", sigungus: [{ name: "수원시", slug: "suwon" }, { name: "성남시", slug: "seongnam" }, { name: "용인시", slug: "yongin" }, { name: "고양시", slug: "goyang" }] },
  { sido: "부산", slug: "busan", sigungus: [{ name: "해운대구", slug: "haeundae" }, { name: "부산진구", slug: "busanjin" }, { name: "동래구", slug: "dongnae" }] },
  { sido: "인천", slug: "incheon", sigungus: [{ name: "남동구", slug: "namdong" }, { name: "부평구", slug: "bupyeong" }, { name: "서구", slug: "seo-incheon" }] },
  { sido: "대구", slug: "daegu", sigungus: [{ name: "수성구", slug: "suseong" }, { name: "달서구", slug: "dalseo" }, { name: "북구", slug: "buk-daegu" }] },
  { sido: "대전", slug: "daejeon", sigungus: [{ name: "유성구", slug: "yuseong" }, { name: "서구", slug: "seo-daejeon" }] },
  { sido: "광주", slug: "gwangju", sigungus: [{ name: "북구", slug: "buk-gwangju" }, { name: "광산구", slug: "gwangsan" }] },
  { sido: "울산", slug: "ulsan", sigungus: [{ name: "남구", slug: "nam-ulsan" }, { name: "중구", slug: "jung-ulsan" }] },
  { sido: "세종", slug: "sejong", sigungus: [{ name: "세종시", slug: "sejong" }] },
];

export default function ShelterIndexPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "동물보호센터", url: `${SITE_URL}/shelter` },
  ]);

  const collectionPage = collectionPageSchema(
    "전국 동물보호센터 안내",
    `${SITE_URL}/shelter`,
    "전국 공공 동물보호센터 정보와 유기동물 입양·보호 안내."
  );

  return (
    <AdPolicyProvider category={1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">동물보호센터</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏡</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-text)] tracking-tight">
              전국 동물보호센터 안내
            </h1>
          </div>
          <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] max-w-2xl leading-relaxed" style={{ wordBreak: "keep-all" }}>
            농림축산검역본부 국가동물보호정보시스템(APMS)에 등록된 시군구별 동물보호센터를 확인할 수 있습니다.
            유기동물 구조 및 입양 상담은 관할 보호센터로 직접 문의하세요.
          </p>
        </header>

        {/* 유기동물 입양 바로가기 배너 */}
        <div className="mb-8 p-5 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface,#FAF5EE)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[var(--brand-text)] text-base mb-1">
              🐾 현재 입양을 기다리는 구조동물이 궁금하신가요?
            </p>
            <p className="text-xs sm:text-sm text-[var(--brand-text-secondary)]">
              전국 보호소에 공고된 구조동물 현황을 실시간으로 확인하실 수 있습니다.
            </p>
          </div>
          <Link
            href="/rescue"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[var(--brand-accent)] text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            구조동물 현황 보기 →
          </Link>
        </div>

        <AdSlot adType="adsense" format="horizontal" className="mb-8" />

        {/* 지역별 보호센터 탐색 */}
        <section aria-label="지역별 동물보호센터">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--brand-text)] mb-4">
            주요 지역별 보호센터 바로가기
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHELTER_REGIONS.map((region) => (
              <div
                key={region.slug}
                className="p-5 rounded-2xl border border-[var(--brand-border)] bg-white hover:border-[var(--brand-accent)] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[var(--brand-text)] text-base">
                    {region.sido}
                  </h3>
                  <Link
                    href={`/sido/${region.slug}`}
                    className="text-xs text-[var(--brand-accent)] hover:underline font-medium"
                  >
                    시도 정보 →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {region.sigungus.map((sg) => (
                    <Link
                      key={sg.slug}
                      href={`/shelter/${sg.slug}`}
                      className="px-2.5 py-1.5 rounded-lg text-xs border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium text-[var(--brand-text-secondary)]"
                    >
                      {sg.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 연관 안내 */}
        <section className="mt-12 pt-8 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">함께 보면 좋은 정보</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/category/adoption" className="text-sm text-[var(--brand-accent)] hover:underline">
              🐾 입양·등록 가이드 전체보기 →
            </Link>
            <Link href="/blog" className="text-sm text-[var(--brand-accent)] hover:underline">
              📖 반려동물 생활 블로그 →
            </Link>
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">
              📚 주제별 케어 가이드 →
            </Link>
          </div>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
