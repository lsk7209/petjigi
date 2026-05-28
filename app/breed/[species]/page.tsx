import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { breeds } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { breadcrumbSchema, faqSchema, itemListSchema, collectionPageSchema } from "@/lib/seo/structured-data";

export const revalidate = 604800;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const SPECIES_CONFIG: Record<string, { label: string; emoji: string; desc: string; faq: { question: string; answer: string }[] }> = {
  dog: {
    label: "강아지 품종",
    emoji: "🐕",
    desc: "강아지 품종별 특징, 성격, 평균 수명, 건강 정보를 확인하세요.",
    faq: [
      { question: "강아지 품종을 선택할 때 무엇을 고려해야 하나요?", answer: "생활공간 크기, 운동량, 털 빠짐 정도, 훈련 난이도, 평균 수명을 고려하세요. 소형견은 아파트 생활에 적합하고, 대형견은 넓은 공간과 충분한 운동이 필요합니다." },
      { question: "한국에서 인기 있는 강아지 품종은?", answer: "말티즈, 포메라니안, 시츄, 비숑 프리제, 골든 리트리버, 웰시 코기 등이 인기입니다. 품종별 특성과 자신의 생활 방식이 맞는지 꼭 확인하세요." },
      { question: "강아지 품종별 평균 수명은?", answer: "일반적으로 소형견이 대형견보다 수명이 깁니다. 소형견은 12~15년, 대형견은 8~12년 정도가 평균입니다. 품종에 따라 유전적 질환도 달라지므로 정기 건강검진이 중요합니다." },
    ],
  },
  cat: {
    label: "고양이 품종",
    emoji: "🐈",
    desc: "고양이 품종별 특징, 성격, 평균 수명, 건강 정보를 확인하세요.",
    faq: [
      { question: "고양이 품종은 성격에 영향을 미치나요?", answer: "품종은 성격 경향에 영향을 줍니다. 예를 들어 샴은 활동적이고 말이 많은 편이고, 페르시안은 조용하고 차분합니다. 하지만 개체마다 차이가 있으므로 직접 만나보는 것이 중요합니다." },
      { question: "실내 고양이에게 적합한 품종은?", answer: "랙돌, 브리티시 쇼트헤어, 스코티시 폴드, 러시안 블루 등이 실내 생활에 잘 적응합니다. 운동량이 많지 않아 좁은 공간에서도 건강하게 생활할 수 있습니다." },
      { question: "고양이 품종별 털 관리는 어떻게 다른가요?", answer: "장모종(페르시안, 메인쿤 등)은 매일 빗질이 필요하고, 단모종(아비시니안, 러시안 블루 등)은 주 1~2회면 충분합니다. 털 알레르기가 있다면 저알레르기 품종을 고려하세요." },
    ],
  },
  small: {
    label: "소동물 품종",
    emoji: "🐹",
    desc: "토끼, 기니피그 등 소동물 품종 정보를 확인하세요.",
    faq: [
      { question: "소동물은 어떤 종류가 있나요?", answer: "토끼, 기니피그, 햄스터, 친칠라, 저빌, 데구 등이 대표적입니다. 각 종마다 수명, 사회성, 관리 난이도가 다르므로 꼼꼼히 비교해보세요." },
      { question: "소동물은 혼자서도 키울 수 있나요?", answer: "기니피그는 사회적 동물이라 2마리 이상을 권장합니다. 햄스터는 단독 생활을 선호합니다. 토끼는 혼자도 잘 지내지만 충분한 교감이 필요합니다." },
      { question: "소동물의 동물병원 진료는 어떻게 받나요?", answer: "소동물(이그조틱 동물)을 전문으로 진료하는 병원을 찾아야 합니다. 모든 동물병원이 소동물을 진료하지 않으므로, 방문 전 전화로 확인하세요." },
    ],
  },
};

export function generateStaticParams() {
  return [{ species: "dog" }, { species: "cat" }, { species: "small" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ species: string }>;
}): Promise<Metadata> {
  const { species } = await params;
  const config = SPECIES_CONFIG[species];
  if (!config) return {};
  return {
    title: `${config.label} 목록 | 펫지기`,
    description: config.desc,
    alternates: { canonical: `/breed/${species}` },
  };
}

export default async function BreedSpeciesPage({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  const config = SPECIES_CONFIG[species];
  if (!config) notFound();

  const breedList = await db
    .select({
      slug: breeds.slug,
      nameKo: breeds.nameKo,
      nameEn: breeds.nameEn,
      origin: breeds.origin,
      sizeCategory: breeds.sizeCategory,
      lifespanMin: breeds.lifespanMin,
      lifespanMax: breeds.lifespanMax,
    })
    .from(breeds)
    .where(eq(breeds.species, species))
    .orderBy(breeds.nameKo);

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: "입양·등록", url: `${SITE_URL}/category/adoption` },
    { name: config.label, url: `${SITE_URL}/breed/${species}` },
  ]);
  const faq = faqSchema(config.faq);
  const breedItemList = itemListSchema(
    breedList.map((b, i) => ({
      position: i + 1,
      name: b.nameKo,
      url: `${SITE_URL}/breed/${species}/${b.slug}`,
      description: [b.origin ? `원산지: ${b.origin}` : "", b.lifespanMin && b.lifespanMax ? `수명: ${b.lifespanMin}~${b.lifespanMax}년` : ""].filter(Boolean).join(" · ") || undefined,
    }))
  );
  const collection = collectionPageSchema(
    config.label,
    `${SITE_URL}/breed/${species}`,
    config.desc
  );

  return (
    <AdPolicyProvider category={1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      {breedList.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breedItemList) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
    <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <nav className="text-xs text-[var(--brand-text-secondary)] mb-5 sm:mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
        <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
        <span aria-hidden="true">›</span>
        <Link href="/category/adoption" className="hover:text-[var(--brand-accent)] transition-colors">입양·등록</Link>
        <span aria-hidden="true">›</span>
        <span className="text-[var(--brand-text)]" aria-current="page">{config.label}</span>
      </nav>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-2 tracking-tight" style={{ wordBreak: "keep-all" }} data-speakable>
          {config.emoji} {config.label}
        </h1>
        <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] leading-relaxed" style={{ wordBreak: "keep-all" }}>{config.desc}</p>
      </div>

      {breedList.length === 0 ? (
        <p className="text-[var(--brand-text-secondary)] text-sm">
          품종 정보가 준비 중입니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {breedList.map((breed) => (
            <Link
              key={breed.slug}
              href={`/breed/${species}/${breed.slug}`}
              className="p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors">
                    {breed.nameKo}
                  </h2>
                  {breed.nameEn && (
                    <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">
                      {breed.nameEn}
                    </p>
                  )}
                </div>
                {breed.sizeCategory && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-border)] text-[var(--brand-text-secondary)] shrink-0">
                    {breed.sizeCategory}
                  </span>
                )}
              </div>
              <div className="mt-2 flex gap-4 text-xs text-[var(--brand-text-secondary)]">
                {breed.origin && <span>원산지: {breed.origin}</span>}
                {breed.lifespanMin && breed.lifespanMax && (
                  <span>수명: {breed.lifespanMin}~{breed.lifespanMax}년</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <AdSlot adType="adsense" format="horizontal" className="my-8" />

      {/* FAQ */}
      <section className="mt-12 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
        <h2 className="text-lg font-bold text-[var(--brand-text)] mb-4">{config.label} 자주 묻는 질문</h2>
        <dl className="space-y-3">
          {config.faq.map((item, i) => (
            <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
              <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.question}</dt>
              <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 관련 링크 */}
      <section className="mt-8 pt-6 border-t border-[var(--brand-border)]">
        <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">함께 보면 좋은 정보</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/breed" className="text-sm text-[var(--brand-accent)] hover:underline">
            ← 견종·묘종 도감
          </Link>
          <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">
            💊 질병·증상 정보 →
          </Link>
          <Link href="/category/adoption" className="text-sm text-[var(--brand-accent)] hover:underline">
            🐾 입양·등록 가이드 →
          </Link>
          <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">
            📋 펫보험 비교 →
          </Link>
        </div>
      </section>
    </main>
    </AdPolicyProvider>
  );
}
