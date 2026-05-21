import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { regions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

export const revalidate = 86400;

export function generateStaticParams() {
  const SIDO_SLUGS = [
    "seoul", "gyeonggi", "busan", "incheon", "daegu",
    "gwangju", "daejeon", "ulsan", "sejong", "gangwon",
    "chungbuk", "chungnam", "jeonbuk", "jeonnam",
    "gyeongbuk", "gyeongnam", "jeju",
  ];
  return SIDO_SLUGS.map((sido) => ({ sido }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sido: string }>;
}): Promise<Metadata> {
  const { sido } = await params;
  const first = await db
    .select({ sido: regions.sido })
    .from(regions)
    .where(eq(regions.sidoSlug, sido))
    .get();

  if (!first) return {};

  const title = `${first.sido} 반려동물 정보 | 동물병원·펫미용·장묘 | 펫지기`;
  const description = `${first.sido} 지역 동물병원·펫미용·펫호텔·장묘업체를 시군구별로 찾아보세요. 공공데이터 기반.`;

  return {
    title,
    description,
    alternates: { canonical: `/sido/${sido}` },
    openGraph: { title, description },
  };
}

const BUSINESS_TYPES = [
  { type: "vet", label: "동물병원", emoji: "🏥" },
  { type: "grooming", label: "펫미용", emoji: "✂️" },
  { type: "boarding", label: "펫호텔", emoji: "🏠" },
  { type: "funeral", label: "장묘", emoji: "🕊️" },
  { type: "sale", label: "분양", emoji: "🐾" },
];

function buildFaq(sidoName: string) {
  return [
    {
      question: `${sidoName}에서 가까운 동물병원을 어떻게 찾나요?`,
      answer: `아래 시군구를 선택하면 공공데이터 기반 ${sidoName} 지역 동물병원 목록을 확인할 수 있습니다. 방문 전 전화로 영업 여부를 확인하는 것을 권장합니다.`,
    },
    {
      question: `${sidoName} 지역 펫미용·펫호텔 정보를 찾으려면?`,
      answer: `시군구를 선택한 후 펫미용 또는 펫호텔 탭을 클릭하면 해당 지역 업체 목록을 확인할 수 있습니다. 공공데이터 기준 영업 중인 업체만 표시됩니다.`,
    },
    {
      question: `${sidoName} 반려동물 장묘업체는 어디서 찾나요?`,
      answer: `시군구별 장묘 탭에서 허가된 반려동물 장묘업체 정보를 확인하실 수 있습니다. 방문 전 반드시 업체에 연락해 세부 서비스와 비용을 문의하세요.`,
    },
  ];
}

export default async function SidoPage({
  params,
}: {
  params: Promise<{ sido: string }>;
}) {
  const { sido } = await params;

  const sigunguList = await db
    .select()
    .from(regions)
    .where(eq(regions.sidoSlug, sido))
    .orderBy(regions.sigungu);

  if (sigunguList.length === 0) notFound();

  const sidoName = sigunguList[0].sido;

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: `${sidoName} 반려동물`, url: `${SITE_URL}/sido/${sido}` },
  ]);

  const faq = faqSchema(buildFaq(sidoName));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">{sidoName}</span>
        </nav>

        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-text)] mb-2 tracking-tight">
            {sidoName} 반려동물 정보
          </h1>
          <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed" style={{ wordBreak: "keep-all" }}>
            {sidoName} 지역 반려동물 관련 업장을 시군구별로 찾아보세요.
            동물병원, 펫미용, 펫호텔, 장묘업체 등 공공데이터 기반으로 제공됩니다.
          </p>
        </header>

        {/* 제공 업종 안내 */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {BUSINESS_TYPES.map((bt) => (
            <span
              key={bt.type}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--brand-border)] text-sm text-[var(--brand-text-secondary)] font-medium"
            >
              {bt.emoji} {bt.label}
            </span>
          ))}
        </div>

        {/* 시군구 목록 */}
        <section aria-label="시군구 목록">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--brand-text)] mb-3 sm:mb-4">
            시군구 ({sigunguList.length}개)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sigunguList.map((r) => (
              <div
                key={r.code}
                className="p-4 rounded-2xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors"
              >
                <p className="font-bold text-[var(--brand-text)] mb-3 text-base">{r.sigungu}</p>
                <div className="flex flex-wrap gap-1.5">
                  {BUSINESS_TYPES.map((bt) => (
                    <Link
                      key={bt.type}
                      href={`/${r.sigunguSlug}/${bt.type}`}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                    >
                      {bt.emoji} {bt.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
          <h2 className="text-lg font-bold text-[var(--brand-text)] mb-4">{sidoName} 반려동물 자주 묻는 질문</h2>
          <dl className="space-y-3">
            {buildFaq(sidoName).map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
                <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.question}</dt>
                <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 관련 정보 */}
        <section className="mt-8 pt-6 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">함께 보면 좋은 정보</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">📚 반려동물 가이드 →</Link>
            <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">💊 질병·증상 정보 →</Link>
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">📋 펫보험 비교 →</Link>
            <Link href="/breed" className="text-sm text-[var(--brand-accent)] hover:underline">🐾 견종·묘종 도감 →</Link>
          </div>
        </section>
      </main>
    </>
  );
}
