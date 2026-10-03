import type { Metadata } from "next";
import Link from "next/link";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const metadata: Metadata = {
  title: { absolute: "장례·추모 정보 | 펫지기" },
  description:
    "반려동물 장묘업체 찾기, 장례 절차·비용 안내, 펫로스 케어 가이드. 소중한 가족을 조용히, 따뜻하게 떠나보낼 수 있도록 함께합니다.",
  alternates: { canonical: "/category/memorial" },
  openGraph: {
    title: "장례·추모 정보 | 펫지기",
    description: "반려동물 장묘업체 찾기, 장례 절차·비용 안내, 펫로스 케어 가이드.",
    images: [
      {
        url: "/category/memorial/opengraph-image",
        width: 1200,
        height: 630,
        alt: "장례·추모 정보",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "장례·추모 정보 | 펫지기",
    description: "반려동물 장묘업체 찾기, 장례 절차·비용 안내, 펫로스 케어 가이드.",
    images: ["/category/memorial/opengraph-image"],
  },
};

const GUIDE_LINKS = [
  {
    href: "/guide/memorial-ceremony",
    title: "장례 절차 안내",
    desc: "접수부터 안치·화장·봉안까지 단계별 절차를 설명합니다.",
  },
  {
    href: "/guide/memorial-cost",
    title: "장례 비용 가이드",
    desc: "화장·납골·수목장 유형별 평균 비용 범위를 정리했습니다.",
  },
  {
    href: "/guide/pet-loss-care",
    title: "펫로스 케어 가이드",
    desc: "반려동물을 잃은 슬픔을 회복하는 데 도움이 되는 정보입니다.",
  },
  {
    href: "/guide/petloss-faq",
    title: "자주 묻는 질문",
    desc: "장례 서류, 유해 처리, 가족 동반 참석 등 실무 Q&A입니다.",
  },
];

const SIDO_LIST = [
  { name: "서울", slug: "seoul" },
  { name: "경기", slug: "gyeonggi" },
  { name: "인천", slug: "incheon" },
  { name: "부산", slug: "busan" },
  { name: "대구", slug: "daegu" },
  { name: "광주", slug: "gwangju" },
  { name: "대전", slug: "daejeon" },
  { name: "울산", slug: "ulsan" },
  { name: "세종", slug: "sejong" },
  { name: "강원", slug: "gangwon" },
  { name: "충북", slug: "chungbuk" },
  { name: "충남", slug: "chungnam" },
  { name: "전북", slug: "jeonbuk" },
  { name: "전남", slug: "jeonnam" },
  { name: "경북", slug: "gyeongbuk" },
  { name: "경남", slug: "gyeongnam" },
  { name: "제주", slug: "jeju" },
];

export default function MemorialCategoryPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "장례·추모", url: `${SITE_URL}/category/memorial` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">🕊️ 장례·추모</span>
        </nav>

        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-3">
            장례·추모
          </h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed">
            소중한 반려동물을 떠나보내는 일은 쉽지 않습니다.
            <br />
            장묘업체 찾기부터 펫로스 회복까지, 조용히 함께하겠습니다.
          </p>
        </div>

        <YmylDisclaimer categoryId={6} />

        {/* 가이드 링크 */}
        <section className="mt-10 mb-12">
          <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-4">
            펫로스 케어 가이드
          </h2>
          <ul className="space-y-3">
            {GUIDE_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col p-5 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors"
                >
                  <span className="font-semibold text-[var(--brand-text)] mb-1">
                    {item.title}
                  </span>
                  <span className="text-sm text-[var(--brand-text-secondary)]">
                    {item.desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 지역별 장묘업체 */}
        <section>
          <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-2">
            지역별 장묘업체 찾기
          </h2>
          <p className="text-sm text-[var(--brand-text-secondary)] mb-5">
            공공데이터 기반 등록 장묘업체 목록입니다.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {SIDO_LIST.map((sido) => (
              <Link
                key={sido.slug}
                href={`/sido/${sido.slug}`}
                className="p-3 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm text-center transition-colors text-[var(--brand-text)] font-medium"
              >
                {sido.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
