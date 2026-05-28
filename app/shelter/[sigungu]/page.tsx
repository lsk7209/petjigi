import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { shelters, regions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCachedRegionBySlug, getCachedSheltersBySigungu } from "@/lib/db-queries";
import { breadcrumbSchema, faqSchema, collectionPageSchema } from "@/lib/seo/structured-data";
import { CategoryCta } from "@/components/content/category-cta";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ShelterViewTracker } from "@/components/analytics/shelter-view-tracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 86400;

export async function generateStaticParams() {
  const rows = await db
    .select({ sigunguSlug: regions.sigunguSlug })
    .from(shelters)
    .innerJoin(regions, eq(shelters.sigungu, regions.sigungu))
    .groupBy(regions.sigunguSlug)
    .all();
  return rows.map((r) => ({ sigungu: r.sigunguSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sigungu: string }>;
}): Promise<Metadata> {
  const { sigungu } = await params;

  const region = await getCachedRegionBySlug(sigungu);

  if (!region) {
    return {
      title: "동물보호센터 | 펫지기",
      robots: { index: false },
    };
  }

  const shelterList = await getCachedSheltersBySigungu(region.sigungu);

  if (shelterList.length === 0) {
    return {
      title: `${region.sigungu} 동물보호센터 | 펫지기`,
      robots: { index: false },
    };
  }

  return {
    title: `${region.sigungu} 동물보호센터 | 펫지기`,
    description: `${region.sigungu} 지역 동물보호센터 ${shelterList.length}개소 정보. 유기동물 입양·임시보호 문의처를 확인하세요.`,
    alternates: { canonical: `/shelter/${sigungu}` },
    openGraph: {
      title: `${region.sigungu} 동물보호센터 | 펫지기`,
      description: `${region.sigungu} 동물보호센터 ${shelterList.length}개소 — 유기동물 입양 문의처`,
    },
  };
}

export default async function ShelterSigunguPage({
  params,
}: {
  params: Promise<{ sigungu: string }>;
}) {
  const { sigungu } = await params;

  const region = await getCachedRegionBySlug(sigungu);
  if (!region) notFound();

  const shelterList = await getCachedSheltersBySigungu(region.sigungu);

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: `${region.sido} 반려동물`, url: `${SITE_URL}/sido/${region.sidoSlug}` },
    { name: `${region.sigungu} 동물보호센터`, url: `${SITE_URL}/shelter/${sigungu}` },
  ]);

  const faq = faqSchema([
    {
      question: `${region.sigungu} 동물보호센터는 어디서 찾나요?`,
      answer: `이 페이지에서 ${region.sigungu} 지역 동물보호센터 ${shelterList.length}개소의 주소와 연락처를 확인할 수 있습니다.`,
      url: `${SITE_URL}/shelter/${sigungu}`,
    },
    {
      question: "보호센터에서 유기동물을 입양할 수 있나요?",
      answer: "네, 동물보호센터에 연락해 입양 절차를 문의하세요. 입양 전 충분한 상담과 준비가 필요합니다.",
      url: `${SITE_URL}/shelter/${sigungu}`,
    },
    {
      question: "임시보호 신청은 어떻게 하나요?",
      answer: "각 보호센터 담당자에게 직접 연락해 임시보호 가능 여부와 조건을 확인하세요. 보호센터마다 절차가 다를 수 있습니다.",
      url: `${SITE_URL}/shelter/${sigungu}`,
    },
  ]);

  const collectionPage = collectionPageSchema(
    `${region.sigungu} 동물보호센터`,
    `${SITE_URL}/shelter/${sigungu}`,
    `${region.sigungu} 지역 동물보호센터 ${shelterList.length}개소 정보. 유기동물 입양·임시보호 문의처를 확인하세요.`
  );

  return (
    <AdPolicyProvider category={1}>
      <ShelterViewTracker sigungu={region.sigungu} count={shelterList.length} />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
    <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* 브레드크럼 */}
      <nav className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
        <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
        <span aria-hidden="true">›</span>
        <Link
          href={`/sido/${region.sidoSlug}`}
          className="hover:text-[var(--brand-accent)] transition-colors"
        >
          {region.sido}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-[var(--brand-text)]" aria-current="page">{region.sigungu} 동물보호센터</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-2 tracking-tight" data-speakable>
        {region.sigungu} 동물보호센터
      </h1>

      {shelterList.length === 0 ? (
        <>
          <p className="text-[var(--brand-text-secondary)] mb-8">
            {region.sigungu} 지역 동물보호센터 데이터를 준비 중입니다.
          </p>
          <div className="p-8 rounded-xl border border-[var(--brand-border)] text-center">
            <p className="text-[var(--brand-text-secondary)] text-sm mb-1">
              보호센터 정보가 아직 없습니다.
            </p>
            <p className="text-[var(--brand-text-secondary)] text-xs">
              데이터는 매주 자동으로 갱신됩니다.
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] mb-6 sm:mb-8 leading-relaxed">
            {region.sigungu} 지역에서{" "}
            <strong className="text-[var(--brand-text)]">
              {shelterList.length}개
            </strong>{" "}
            보호센터 운영 중
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shelterList.map((shelter) => (
              <div
                key={shelter.id}
                className="p-5 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)] flex flex-col gap-2"
              >
                <h2 className="font-semibold text-[var(--brand-text)] text-base leading-snug">
                  {shelter.name}
                </h2>

                {shelter.address && (
                  <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                    {shelter.address}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-1">
                  {shelter.phone && (
                    <a
                      href={`tel:${shelter.phone.replace(/\s/g, "")}`}
                      className="text-xs text-[var(--brand-accent)] hover:underline font-medium"
                    >
                      {shelter.phone}
                    </a>
                  )}

                  {shelter.capacity != null && (
                    <span className="text-xs text-[var(--brand-text-secondary)]">
                      수용 {shelter.capacity}마리
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <AdSlot adType="adsense" format="rectangle" className="my-8" />
          <CategoryCta categoryId={1} className="mt-2" />

          <p className="mt-8 text-xs text-[var(--brand-text-secondary)] text-center">
            데이터는 매주 자동으로 갱신됩니다.
          </p>
        </>
      )}

      {/* FAQ */}
      <section className="mt-10 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
        <h2 className="text-base font-bold text-[var(--brand-text)] mb-4">자주 묻는 질문</h2>
        <dl className="space-y-3">
          {[
            { q: `${region.sigungu} 동물보호센터는 어디서 찾나요?`, a: `이 페이지에서 ${region.sigungu} 지역 동물보호센터 주소와 연락처를 확인할 수 있습니다.` },
            { q: "보호센터에서 유기동물을 입양할 수 있나요?", a: "네, 동물보호센터에 연락해 입양 절차를 문의하세요. 입양 전 충분한 상담과 준비가 필요합니다." },
            { q: "임시보호 신청은 어떻게 하나요?", a: "각 보호센터 담당자에게 직접 연락해 임시보호 가능 여부와 조건을 확인하세요." },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
              <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.q}</dt>
              <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
    </AdPolicyProvider>
  );
}
