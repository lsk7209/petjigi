import { faqCountAnswer, listingScopeWording } from "@/lib/business-status-wording";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  getCachedBusinessListing,
  getCachedRegionSlugView,
  getCachedTypeSourceAsOf,
} from "@/lib/db-queries";
import { classifyListing } from "@/lib/listing-state";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  collectionPageSchema,
} from "@/lib/seo/structured-data";
import type { CategoryId } from "@/lib/category";
import { CategoryCta } from "@/components/content/category-cta";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { AdsenseTrustSection } from "@/components/content/adsense-trust-section";
import { RegionViewTracker } from "@/components/analytics/region-view-tracker";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  businessListingPath,
  getAddressRegionConsistency,
  parsePageParam,
} from "@/lib/business-listing";

export const dynamic = "force-dynamic";

// 빌드 시 활성 업장이 있는 (sigungu, type) 조합 모두 사전 렌더링
export async function generateStaticParams() {
  const rows = await db
    .select({ sigunguSlug: regions.sigunguSlug, type: businesses.type })
    .from(businesses)
    .innerJoin(regions, eq(businesses.addressSigungu, regions.sigungu))
    .where(eq(businesses.status, "active"))
    .groupBy(regions.sigunguSlug, businesses.type)
    .all();
  return rows.map((r) => ({ sigungu: r.sigunguSlug, type: r.type }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const TYPE_META: Record<
  string,
  {
    label: string;
    emoji: string;
    categorySlug: string;
    desc: string;
    categoryId: CategoryId;
  }
> = {
  vet: {
    label: "동물병원",
    emoji: "🏥",
    categorySlug: "health",
    desc: "진료·예방접종·응급처치",
    categoryId: 3,
  },
  grooming: {
    label: "펫미용",
    emoji: "✂️",
    categorySlug: "care",
    desc: "미용·목욕·위생 관리",
    categoryId: 5,
  },
  boarding: {
    label: "펫호텔",
    emoji: "🏠",
    categorySlug: "care",
    desc: "호텔링·위탁 돌봄 서비스",
    categoryId: 5,
  },
  funeral: {
    label: "장묘업체",
    emoji: "🕊️",
    categorySlug: "memorial",
    desc: "반려동물 장례·화장·납골",
    categoryId: 6,
  },
  sale: {
    label: "분양업체",
    emoji: "🐾",
    categorySlug: "adoption",
    desc: "반려동물 분양·입양",
    categoryId: 1,
  },
  registration: {
    label: "동물등록 대행기관",
    emoji: "🪪",
    categorySlug: "adoption",
    desc: "반려동물 등록 대행 기관",
    categoryId: 1,
  },
  breeder: {
    label: "브리더",
    emoji: "🐕",
    categorySlug: "adoption",
    desc: "전문 브리더 분양",
    categoryId: 1,
  },
  transport: {
    label: "반려동물 운송",
    emoji: "🚗",
    categorySlug: "care",
    desc: "펫 이송·운반 서비스",
    categoryId: 5,
  },
  exhibition: {
    label: "체험전시",
    emoji: "🎪",
    categorySlug: "care",
    desc: "반려동물 체험·전시 공간",
    categoryId: 5,
  },
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ sigungu: string; type: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
  const { sigungu, type } = await params;
  const page = parsePageParam((await searchParams).page);
  const meta = TYPE_META[type];
  if (!meta) return {};

  const regionView = await getCachedRegionSlugView(sigungu);
  if (regionView.kind === "missing") notFound();
  const location = regionView.sigunguName ?? decodeURIComponent(sigungu);
  const isAmbiguousRegion = regionView.ambiguousSidoNames.length > 1;
  const listing = await getCachedBusinessListing(location, type, page);
  const isUnverified =
    classifyListing(
      listing.totalCount,
      await getCachedTypeSourceAsOf(type),
      new Date(),
      listing.sourceAsOf,
    ).state === "not_collected";
  const title = `${location} ${meta.label}${page > 1 ? ` ${page}페이지` : ""}`;
  const description = `${location} ${meta.label} 전체 목록. ${meta.desc} — 공공데이터 기반 정확한 업체 정보.`;
  const canonical = businessListingPath(sigungu, type, page);

  return {
    title,
    description,
    alternates: { canonical },
    ...(isAmbiguousRegion || isUnverified
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      title: `${title} | 펫지기`,
      description,
      url: canonical,
      images: [
        {
          url: `/${sigungu}/${type}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${location} ${meta.label}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 펫지기`,
      description,
      images: [`/${sigungu}/${type}/opengraph-image`],
    },
  };
}

function buildFaq(type: string, location: string, typeLabel: string, count: number) {
  return [
    {
      question: `${location}에 ${typeLabel}이 몇 곳이나 있나요?`,
      answer: faqCountAnswer(type, location, typeLabel, count),
    },
    {
      question: `${location} ${typeLabel} 정보는 어디서 가져오나요?`,
      answer: `농림축산검역본부, 행정안전부 등 공공데이터포털에서 주기적으로 동기화한 데이터를 사용합니다.`,
    },
    {
      question: `${typeLabel} 정보가 최신이 아닐 수 있나요?`,
      answer: `공공데이터는 원본별 수집 일정에 따라 갱신되며 실제 영업 여부와 차이가 있을 수 있으므로, 방문 전 전화로 확인하시길 권장합니다.`,
    },
  ];
}

export default async function SigunguTypePage({
  params,
  searchParams,
}: {
  params: Promise<{ sigungu: string; type: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { sigungu, type } = await params;
  const requestedPage = parsePageParam((await searchParams).page);
  const meta = TYPE_META[type];
  if (!meta) notFound();

  const region = await getCachedRegionSlugView(sigungu);
  if (region.kind === "missing") notFound();
  const sigunguName = region.sigunguName ?? decodeURIComponent(sigungu);
  const sidoName = region.sidoName;
  const ambiguousSidoNames = region.ambiguousSidoNames;

  const listing = await getCachedBusinessListing(
    sigunguName,
    type,
    requestedPage,
  );
  const businessList = listing.items;
  const status = classifyListing(
    listing.totalCount,
    await getCachedTypeSourceAsOf(type),
    new Date(),
    listing.sourceAsOf,
  );
  const canonicalPath = businessListingPath(sigungu, type, listing.page);
  if (listing.page !== requestedPage) redirect(canonicalPath);

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    ...(sidoName && region.sidoSlug
      ? [
          {
            name: `${sidoName} 반려동물`,
            url: `${SITE_URL}/sido/${region.sidoSlug}`,
          },
        ]
      : []),
    {
      name: `${sigunguName} ${meta.label}`,
      url: `${SITE_URL}/${sigungu}/${type}`,
    },
  ]);

  const faq = faqSchema(buildFaq(type, sigunguName, meta.label, listing.totalCount));

  const itemList = itemListSchema(
    businessList.map((b, i) => ({
      position: listing.offset + i + 1,
      name: b.name,
      url: `${SITE_URL}/${b.type}/${sigungu}/${encodeURIComponent(b.name)}`,
      description: b.address ?? undefined,
    })),
  );

  const collectionPage = collectionPageSchema(
    `${sigunguName} ${meta.label}`,
    `${SITE_URL}${canonicalPath}`,
    listing.totalCount > 0
      ? `${sigunguName} ${meta.label} 총 ${listing.totalCount}곳 — ${meta.desc}. 공공데이터 기반 업체 정보.`
      : `${sigunguName} ${meta.label} — ${meta.desc}. 공공데이터에서 확인된 업체가 없는 지역입니다.`,
  );

  return (
    <AdPolicyProvider category={meta.categoryId as CategoryId}>
      <RegionViewTracker
        sido={sidoName || undefined}
        sigungu={sigunguName}
        type={type}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <main
        className="max-w-5xl mx-auto px-4 py-10"
        {...(businessList.length === 0 ? { "data-ads-policy": "block" } : {})}
      >
        {/* 브레드크럼 */}
        <nav
          className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap"
          aria-label="breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-[var(--brand-accent)] transition-colors"
          >
            홈
          </Link>
          {sidoName && region.sidoSlug && (
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

        {ambiguousSidoNames.length > 1 && (
          <p
            role="note"
            className="mb-4 rounded-lg border border-[var(--brand-border)] bg-[var(--brand-surface,#FAF5EE)] px-4 py-3 text-sm text-[var(--brand-text-secondary)]"
          >
            &lsquo;{sigunguName}&rsquo;는 {ambiguousSidoNames.join("·")}에 모두
            있는 이름입니다. 아래 목록에는 여러 시도의 업체가 함께 표시될 수
            있으니 각 업체의 주소를 확인해 주세요.
          </p>
        )}

        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span
              className="text-2xl sm:text-3xl"
              role="img"
              aria-label={meta.label}
            >
              {meta.emoji}
            </span>
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--brand-text)] tracking-tight"
              data-speakable
            >
              {sigunguName} {meta.label}
            </h1>
          </div>
          <p
            className="text-[var(--brand-text-secondary)] text-sm leading-relaxed"
            style={{ wordBreak: "keep-all" }}
          >
            {listing.totalCount === 0
              ? status.state === "empty_confirmed"
                ? "공공데이터에서 이 조건에 맞는 업체가 확인되지 않았습니다."
                : "이 조건의 데이터 수집 여부를 확인하지 못했습니다."
              : `총 ${listing.totalCount}곳 중 ${listing.start}~${listing.end}곳을 표시합니다.`}{" "}
            {meta.desc}. {listingScopeWording(type)}만 표시됩니다.
          </p>
        </header>

        {/* 지역 현황 카드 */}
        <div className="bg-[var(--brand-border)] rounded-2xl p-4 mb-8 text-sm flex items-start gap-3">
          <span className="text-xl shrink-0">📊</span>
          <div>
            <p className="font-semibold text-[var(--brand-text)] mb-0.5">
              지역 현황
            </p>
            <p className="text-[var(--brand-text-secondary)]">
              공공데이터의 지역·업종·영업 상태 조건을 동일하게 적용한 결과는 총{" "}
              <strong className="text-[var(--brand-text)]">
                {listing.totalCount}곳
              </strong>
              입니다.
            </p>
          </div>
        </div>

        {businessList.length > 0 && (
          <AdSlot adType="adsense" format="horizontal" className="mb-6" />
        )}

        {businessList.length === 0 ? (
          <div className="text-center py-16 text-[var(--brand-text-secondary)]">
            <p className="text-4xl mb-3">🔍</p>
            {status.state === "empty_confirmed" ? (
              <>
                <p className="font-medium">
                  {sigunguName}에서 공공데이터에 등록된 {meta.label}이 확인되지
                  않았습니다.
                </p>
                <p className="text-sm mt-1">
                  업종 전체 수집 기준일 {status.asOf} 현재 공공데이터에서 이 지역 결과가
                  없다는 뜻이며, 지역 단위 수집 완료를 보증하지 않고 실제 영업
                  여부와 다를 수 있습니다.
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">
                  {sigunguName} {meta.label} 정보를 아직 확인하지 못했습니다.
                </p>
                <p className="text-sm mt-1">
                  이 업종의 공공데이터 수집 이력을 확인할 수 없어 &lsquo;업체
                  없음&rsquo;으로 보지 않습니다.
                </p>
              </>
            )}
            <p className="text-sm mt-3">
              {region.sidoSlug ? (
                <Link
                  href={`/sido/${region.sidoSlug}`}
                  className="text-[var(--brand-accent)] hover:underline"
                >
                  {sidoName} 다른 지역 보기
                </Link>
              ) : null}
              {region.sidoSlug ? " · " : ""}
              인근 지역 업체나 관할 시·군·구청에 직접 문의해 확인해 주세요.
            </p>
          </div>
        ) : (
          <ul
            className="space-y-2 sm:space-y-3"
            aria-label={`${sigunguName} ${meta.label} 목록`}
          >
            {businessList.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/${b.type}/${sigungu}/${encodeURIComponent(b.name)}`}
                  className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all group"
                >
                  <span className="text-xl sm:text-2xl shrink-0">
                    {meta.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug text-sm sm:text-base">
                      {b.name}
                    </p>
                    {b.address && (
                      <>
                        <p className="text-xs text-[var(--brand-text-secondary)] mt-1 truncate">
                          {b.address}
                        </p>
                        {getAddressRegionConsistency(b.address, sigunguName) ===
                          "mismatch" && (
                          <p className="text-xs text-amber-700 mt-1">
                            표시 주소가 선택한 지역과 달라 원본 확인이
                            필요합니다.
                          </p>
                        )}
                      </>
                    )}
                    {b.phone && (
                      <p className="text-xs sm:text-sm text-[var(--brand-accent)] mt-0.5 font-medium">
                        {b.phone}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-[var(--brand-text-secondary)] shrink-0 self-center">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {listing.totalPages > 1 && (
          <nav
            className="mt-8 flex items-center justify-between gap-4"
            aria-label="목록 페이지 이동"
          >
            {listing.hasPrevious ? (
              <Link
                rel="prev"
                href={businessListingPath(sigungu, type, listing.page - 1)}
                className="text-sm font-semibold text-[var(--brand-accent)] hover:underline"
              >
                ← 이전 페이지
              </Link>
            ) : (
              <span />
            )}
            <span className="text-xs text-[var(--brand-text-secondary)]">
              {listing.page} / {listing.totalPages} 페이지
            </span>
            {listing.hasNext ? (
              <Link
                rel="next"
                href={businessListingPath(sigungu, type, listing.page + 1)}
                className="text-sm font-semibold text-[var(--brand-accent)] hover:underline"
              >
                다음 페이지 →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        {/* FAQ (AEO용) */}
        <section
          className="mt-12 pt-8 border-t border-[var(--brand-border)]"
          aria-label="자주 묻는 질문"
        >
          <h2 className="text-base font-bold text-[var(--brand-text)] mb-4">
            자주 묻는 질문
          </h2>
          <dl className="space-y-4">
            {buildFaq(type, sigunguName, meta.label, listing.totalCount).map(
              (item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[var(--brand-border)] p-4"
                >
                  <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">
                    Q. {item.question}
                  </dt>
                  <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                    {item.answer}
                  </dd>
                </div>
              ),
            )}
          </dl>
        </section>

        <CategoryCta categoryId={meta.categoryId} className="mt-10" />

        <AdsenseTrustSection compact />

        {businessList.length > 0 && (
          <AdSlot adType="adsense" format="rectangle" className="mt-8" />
        )}

        <p className="mt-8 text-xs text-[var(--brand-text-secondary)]">
          정보 기준: 공공데이터포털 · {status.scope === "type" ? "업종 전체 기준 갱신일" : "업체 정보 갱신일"}{" "}
          {(listing.sourceAsOf ?? status.asOf)?.slice(0, 10) ?? "확인 불가"}
          {status.stale ? " (갱신 지연 가능성 있음)" : ""} &nbsp;·&nbsp;
          {region.sidoSlug && (
            <Link
              href={`/sido/${region.sidoSlug}`}
              className="hover:text-[var(--brand-accent)]"
            >
              {sidoName} 지역 전체 보기
            </Link>
          )}
        </p>
      </main>
    </AdPolicyProvider>
  );
}
