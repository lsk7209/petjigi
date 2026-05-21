import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { and, eq, ne, sql } from "drizzle-orm";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import type { CategoryId } from "@/lib/category";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";

export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const TYPE_LABEL: Record<string, string> = {
  vet: "동물병원",
  grooming: "펫미용",
  boarding: "펫호텔",
  funeral: "장묘업체",
  sale: "분양업체",
  breeder: "브리더",
  transport: "반려동물 운송",
  exhibition: "체험전시",
};

const TYPE_EMOJI: Record<string, string> = {
  vet: "🏥",
  grooming: "✂️",
  boarding: "🏠",
  funeral: "🕊️",
  sale: "🐾",
  breeder: "🐕",
  transport: "🚗",
  exhibition: "🎪",
};

const TYPE_CATEGORY: Record<string, CategoryId> = {
  vet: 3,
  grooming: 5,
  boarding: 5,
  funeral: 6,
  sale: 1,
  breeder: 1,
  transport: 5,
  exhibition: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; sigungu: string; slug: string }>;
}): Promise<Metadata> {
  const { type, sigungu, slug } = await params;
  const name = decodeURIComponent(slug);
  const typeLabel = TYPE_LABEL[type] ?? type;

  const region = await db
    .select({ sigungu: regions.sigungu, sido: regions.sido })
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  const location = region?.sigungu ?? sigungu;
  const title = `${name} ${typeLabel} | ${location} | 펫지기`;
  const description = `${location} ${name} ${typeLabel} — 위치, 연락처, 주변 시설 정보. 공공데이터 기반.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary", title, description },
    alternates: { canonical: `/${type}/${sigungu}/${slug}` },
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ type: string; sigungu: string; slug: string }>;
}) {
  const { type, sigungu, slug } = await params;
  const name = decodeURIComponent(slug);

  const business = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.type, type),
        eq(businesses.name, name),
        ne(businesses.status, "closed")
      )
    )
    .get();

  if (!business) notFound();

  const region = await db
    .select()
    .from(regions)
    .where(eq(regions.sigunguSlug, sigungu))
    .get();

  const nearby = await db
    .select()
    .from(businesses)
    .where(
      and(
        eq(businesses.addressSigungu, business.addressSigungu ?? ""),
        eq(businesses.status, "active"),
        ne(businesses.id, business.id)
      )
    )
    .limit(6);

  const sameTypeCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(businesses)
    .where(
      and(
        eq(businesses.type, type),
        eq(businesses.addressSigungu, business.addressSigungu ?? ""),
        eq(businesses.status, "active")
      )
    )
    .get();

  const categoryId = TYPE_CATEGORY[type] ?? 1;
  const typeLabel = TYPE_LABEL[type] ?? type;
  const typeEmoji = TYPE_EMOJI[type] ?? "📍";
  const locationName = region?.sigungu ?? sigungu;
  const sidoName = region?.sido ?? "";

  const schema = localBusinessSchema(business);
  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    ...(sidoName ? [{ name: `${sidoName} 정보`, url: `${SITE_URL}/sido/${sigungu.split("-")[0] ?? sigungu}` }] : []),
    { name: `${locationName} ${typeLabel}`, url: `${SITE_URL}/${sigungu}/${type}` },
    { name: business.name, url: `${SITE_URL}/${type}/${sigungu}/${slug}` },
  ]);

  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent((business.address ?? business.name) + " " + typeLabel)}`;
  const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(business.name + " " + (business.addressSigungu ?? ""))}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link
            href={`/${sigungu}/${type}`}
            className="hover:text-[var(--brand-accent)] transition-colors"
          >
            {locationName} {typeLabel}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)] truncate max-w-[200px]" aria-current="page">
            {business.name}
          </span>
        </nav>

        {/* ⛔ 동물병원 페이지에 진료과목/진료 동물 종 자동 생성 절대 금지 */}
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-2xl"
              role="img"
              aria-label={typeLabel}
            >
              {typeEmoji}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-border)] text-xs font-semibold text-[var(--brand-text-secondary)]">
              {typeLabel}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-text)] mb-1 tracking-tight">
            {business.name}
          </h1>
          <p className="text-sm text-[var(--brand-text-secondary)]">
            {locationName}{sidoName ? ` · ${sidoName}` : ""}
          </p>
        </header>

        <YmylDisclaimer categoryId={categoryId} />

        {/* 기본 정보 카드 */}
        <section
          className="bg-[var(--brand-border)] rounded-2xl p-5 mb-6"
          aria-label="기본 정보"
        >
          <h2 className="font-bold text-[var(--brand-text)] mb-4 text-sm uppercase tracking-wide">
            기본 정보
          </h2>
          <dl className="space-y-3 text-sm">
            {business.address && (
              <div className="flex gap-3">
                <dt className="text-[var(--brand-text-secondary)] w-16 shrink-0 font-medium">주소</dt>
                <dd className="text-[var(--brand-text)] word-break-keep leading-relaxed">
                  {business.address}
                </dd>
              </div>
            )}
            {business.phone && (
              <div className="flex gap-3">
                <dt className="text-[var(--brand-text-secondary)] w-16 shrink-0 font-medium">전화</dt>
                <dd>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-[var(--brand-accent)] font-semibold hover:underline"
                  >
                    {business.phone}
                  </a>
                </dd>
              </div>
            )}
            {business.licenseDate && (
              <div className="flex gap-3">
                <dt className="text-[var(--brand-text-secondary)] w-16 shrink-0 font-medium">허가일</dt>
                <dd className="text-[var(--brand-text)]">{business.licenseDate}</dd>
              </div>
            )}
            <div className="flex gap-3">
              <dt className="text-[var(--brand-text-secondary)] w-16 shrink-0 font-medium">출처</dt>
              <dd className="text-[var(--brand-text-secondary)] text-xs">공공데이터포털 (최신 동기화 기준)</dd>
            </div>
          </dl>

          {/* 지도 링크 */}
          {business.address && (
            <div className="flex gap-2 mt-5 pt-4 border-t border-[var(--brand-border)]">
              <a
                href={kakaoMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-yellow-400 text-yellow-900 hover:bg-yellow-300 transition-colors"
                aria-label="카카오맵에서 보기"
              >
                카카오맵
              </a>
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-green-500 text-white hover:bg-green-400 transition-colors"
                aria-label="네이버지도에서 보기"
              >
                네이버지도
              </a>
            </div>
          )}
        </section>

        {/* 지역 현황 */}
        <section
          className="border border-[var(--brand-border)] rounded-xl p-4 mb-6 text-sm"
          aria-label="지역 현황"
        >
          <h2 className="font-semibold text-[var(--brand-text)] mb-1.5">
            📊 {locationName} 지역 현황
          </h2>
          <p className="text-[var(--brand-text-secondary)]">
            {locationName} 지역에는 현재{" "}
            <strong className="text-[var(--brand-text)]">
              {sameTypeCount?.count ?? 0}개
            </strong>
            의 {typeLabel}가 운영 중입니다.
          </p>
          <Link
            href={`/${sigungu}/${type}`}
            className="text-xs text-[var(--brand-accent)] hover:underline mt-1.5 inline-block font-semibold"
          >
            {locationName} {typeLabel} 전체 목록 보기 →
          </Link>
        </section>

        {/* 인근 시설 */}
        {nearby.length > 0 && (
          <section className="mb-8" aria-label="인근 시설">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">
              📍 인근 시설
            </h2>
            <ul className="space-y-2">
              {nearby.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/${b.type}/${sigungu}/${encodeURIComponent(b.name)}`}
                    className="flex justify-between items-center p-3.5 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm transition-all group"
                  >
                    <span className="font-medium text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors">
                      {b.name}
                    </span>
                    <span className="text-xs text-[var(--brand-text-secondary)] shrink-0 ml-2">
                      {TYPE_EMOJI[b.type] ?? ""} {TYPE_LABEL[b.type] ?? b.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs text-[var(--brand-text-secondary)]">
          정보 기준일: {business.lastSyncedAt?.slice(0, 10) ?? "공공데이터 최신 기준"}
          &nbsp;·&nbsp;
          <Link href={`/${sigungu}/${type}`} className="hover:text-[var(--brand-accent)]">
            {locationName} {typeLabel} 목록
          </Link>
        </p>
      </main>
    </>
  );
}
