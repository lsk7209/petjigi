import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const TYPE_META: Record<string, { label: string; emoji: string; categorySlug: string; desc: string }> = {
  vet:       { label: "동물병원",       emoji: "🏥", categorySlug: "health",   desc: "진료·예방접종·응급처치" },
  grooming:  { label: "펫미용",         emoji: "✂️", categorySlug: "care",     desc: "미용·목욕·위생 관리" },
  boarding:  { label: "펫호텔",         emoji: "🏠", categorySlug: "care",     desc: "호텔링·위탁 돌봄 서비스" },
  funeral:   { label: "장묘업체",       emoji: "🕊️", categorySlug: "memorial", desc: "반려동물 장례·화장·납골" },
  sale:      { label: "분양업체",       emoji: "🐾", categorySlug: "adoption", desc: "반려동물 분양·입양" },
  breeder:   { label: "브리더",         emoji: "🐕", categorySlug: "adoption", desc: "전문 브리더 분양" },
  transport: { label: "반려동물 운송",  emoji: "🚗", categorySlug: "care",     desc: "펫 이송·운반 서비스" },
  exhibition:{ label: "체험전시",       emoji: "🎪", categorySlug: "care",     desc: "반려동물 체험·전시 공간" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sigungu: string; type: string }>;
}): Promise<Metadata> {
  const { sigungu, type } = await params;
  const meta = TYPE_META[type];
  if (!meta) return {};

  const region = await db
    .select({ sigungu: regions.sigungu, sido: regions.sido })
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  const location = region?.sigungu ?? decodeURIComponent(sigungu);
  const title = `${location} ${meta.label} | 펫지기`;
  const description = `${location} ${meta.label} 전체 목록. ${meta.desc} — 공공데이터 기반 정확한 업체 정보.`;

  return {
    title,
    description,
    alternates: { canonical: `/${sigungu}/${type}` },
    openGraph: { title, description },
  };
}

function buildFaq(location: string, typeLabel: string, count: number) {
  return [
    {
      question: `${location}에 ${typeLabel}이 몇 곳이나 있나요?`,
      answer: `공공데이터 기준으로 ${location}에는 현재 영업 중인 ${typeLabel} ${count}곳이 등록되어 있습니다.`,
    },
    {
      question: `${location} ${typeLabel} 정보는 어디서 가져오나요?`,
      answer: `농림축산검역본부, 행정안전부 등 공공데이터포털에서 주기적으로 동기화한 데이터를 사용합니다.`,
    },
    {
      question: `${typeLabel} 정보가 최신이 아닐 수 있나요?`,
      answer: `공공데이터는 매일 동기화되지만 실제 영업 여부와 차이가 있을 수 있으므로, 방문 전 전화로 확인하시길 권장합니다.`,
    },
  ];
}

export default async function SigunguTypePage({
  params,
}: {
  params: Promise<{ sigungu: string; type: string }>;
}) {
  const { sigungu, type } = await params;
  const meta = TYPE_META[type];
  if (!meta) notFound();

  const region = await db
    .select()
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  const sigunguName = region?.sigungu ?? decodeURIComponent(sigungu);
  const sidoName = region?.sido ?? "";

  const businessList = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.type, type),
        eq(businesses.addressSigungu, sigunguName),
        eq(businesses.status, "active")
      )
    )
    .orderBy(sql`CASE WHEN lat IS NOT NULL THEN 0 ELSE 1 END`)
    .limit(50);

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    ...(sidoName && region?.sidoSlug
      ? [{ name: `${sidoName} 반려동물`, url: `${SITE_URL}/sido/${region.sidoSlug}` }]
      : []),
    { name: `${sigunguName} ${meta.label}`, url: `${SITE_URL}/${sigungu}/${type}` },
  ]);

  const faq = faqSchema(buildFaq(sigunguName, meta.label, businessList.length));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, faq]) }}
      />
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          {sidoName && region?.sidoSlug && (
            <>
              <span aria-hidden="true">›</span>
              <Link
                href={`/sido/${region.sidoSlug}`}
                className="hover:text-[var(--brand-accent)] transition-colors"
              >
                {sidoName}
              </Link>
            </>
          )}
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">
            {sigunguName} {meta.label}
          </span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl" role="img" aria-label={meta.label}>{meta.emoji}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-text)] tracking-tight">
              {sigunguName} {meta.label}
            </h1>
          </div>
          <p className="text-[var(--brand-text-secondary)] text-sm leading-relaxed">
            {sigunguName} 지역 {meta.label} {businessList.length}곳 — {meta.desc}.
            공공데이터 기준 영업 중인 업체만 표시됩니다.
          </p>
        </header>

        {/* 지역 현황 카드 */}
        <div className="bg-[var(--brand-border)] rounded-2xl p-4 mb-8 text-sm flex items-start gap-3">
          <span className="text-xl shrink-0">📊</span>
          <div>
            <p className="font-semibold text-[var(--brand-text)] mb-0.5">지역 현황</p>
            <p className="text-[var(--brand-text-secondary)]">
              {sigunguName} 지역에 등록된 {meta.label}는 총{" "}
              <strong className="text-[var(--brand-text)]">{businessList.length}곳</strong>입니다.
              (공공데이터 기준, 영업 중인 업체만)
            </p>
          </div>
        </div>

        {businessList.length === 0 ? (
          <div className="text-center py-16 text-[var(--brand-text-secondary)]">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">현재 등록된 {meta.label} 정보가 없습니다.</p>
            <p className="text-sm mt-1">ETL 동기화 후 업데이트됩니다.</p>
          </div>
        ) : (
          <ul className="space-y-2" aria-label={`${sigunguName} ${meta.label} 목록`}>
            {businessList.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/${b.type}/${sigungu}/${encodeURIComponent(b.name)}`}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all group"
                >
                  <span className="text-lg shrink-0 mt-0.5">{meta.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug">
                      {b.name}
                    </p>
                    {b.address && (
                      <p className="text-xs text-[var(--brand-text-secondary)] mt-1 truncate">
                        {b.address}
                      </p>
                    )}
                    {b.phone && (
                      <p className="text-xs text-[var(--brand-accent)] mt-0.5 font-medium">
                        {b.phone}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[var(--brand-text-secondary)] shrink-0 self-center">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* FAQ (AEO용) */}
        <section className="mt-12 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
          <h2 className="text-base font-bold text-[var(--brand-text)] mb-4">
            자주 묻는 질문
          </h2>
          <dl className="space-y-4">
            {buildFaq(sigunguName, meta.label, businessList.length).map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
                <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">
                  Q. {item.question}
                </dt>
                <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-8 text-xs text-[var(--brand-text-secondary)]">
          정보 기준: 공공데이터포털 최신 동기화 &nbsp;·&nbsp;
          <Link href={`/sido/${region?.sidoSlug ?? ""}`} className="hover:text-[var(--brand-accent)]">
            {sidoName} 지역 전체 보기
          </Link>
        </p>
      </main>
    </>
  );
}
