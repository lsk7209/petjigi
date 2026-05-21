import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { regions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { breadcrumbSchema } from "@/lib/seo/structured-data";

export const revalidate = 86400;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">{sidoName}</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--brand-text)] mb-2 tracking-tight">
            {sidoName} 반려동물 정보
          </h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed">
            {sidoName} 지역 반려동물 관련 업장을 시군구별로 찾아보세요.
            동물병원, 펫미용, 펫호텔, 장묘업체 등 공공데이터 기반으로 제공됩니다.
          </p>
        </header>

        {/* 빠른 업종 필터 */}
        <section className="mb-8" aria-label="업종별 검색">
          <div className="flex flex-wrap gap-2">
            {BUSINESS_TYPES.map((bt) => (
              <a
                key={bt.type}
                href={`#${bt.type}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--brand-border)] text-sm font-medium hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors"
              >
                {bt.emoji} {bt.label}
              </a>
            ))}
          </div>
        </section>

        {/* 시군구 목록 */}
        <section aria-label="시군구 목록">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">
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
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                    >
                      {bt.emoji} {bt.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
