import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/client";
import { breeds } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";
import { getCachedCategoryGuides, getCachedCategoryBlogPosts } from "@/lib/db-queries";
import { CategoryCta } from "@/components/content/category-cta";
import { ShareButtons } from "@/components/content/share-buttons";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ScrollDepthTracker } from "@/components/analytics/scroll-depth-tracker";
import { OutboundLinkTracker } from "@/components/analytics/outbound-link-tracker";
import { BreedViewTracker } from "@/components/analytics/breed-view-tracker";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const revalidate = 604800;

export async function generateStaticParams() {
  try {
    const rows = await db.select({ species: breeds.species, slug: breeds.slug }).from(breeds);
    return rows.map((r) => ({ species: r.species, slug: r.slug }));
  } catch {
    return [];
  }
}

const SPECIES_LABEL: Record<string, string> = {
  dog: "강아지",
  cat: "고양이",
  small: "소동물",
};

const SIZE_LABEL: Record<string, string> = {
  tiny: "소형",
  small: "소형",
  medium: "중형",
  large: "대형",
  giant: "초대형",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ species: string; slug: string }>;
}): Promise<Metadata> {
  const { species, slug } = await params;
  const breed = await db
    .select()
    .from(breeds)
    .where(and(eq(breeds.slug, slug), eq(breeds.species, species)))
    .get();

  if (!breed) return {};
  const lifespanText = breed.lifespanMin && breed.lifespanMax
    ? ` 평균 수명 ${breed.lifespanMin}~${breed.lifespanMax}년.`
    : "";
  return {
    title: `${breed.nameKo} 특징·성격·키우기 | 펫지기`,
    description: `${breed.nameKo} 품종 정보: 특징, 성격,${lifespanText} 흔한 질병, 키우는 방법. 수의사 검토 정보.`,
    alternates: { canonical: `/breed/${species}/${slug}` },
    openGraph: {
      title: `${breed.nameKo} 특징·성격·키우기 | 펫지기`,
      description: `${breed.nameKo} 품종 정보: 특징, 성격, 평균 수명, 흔한 질병, 키우는 방법.`,
    },
  };
}

function buildBreedFaq(breed: {
  nameKo: string;
  nameEn?: string | null;
  lifespanMin?: number | null;
  lifespanMax?: number | null;
  sizeCategory?: string | null;
  commonConditions?: string[] | null;
  origin?: string | null;
}, speciesLabel: string, pageUrl: string) {
  const faqs: { question: string; answer: string; url: string }[] = [];

  if (breed.lifespanMin && breed.lifespanMax) {
    faqs.push({
      question: `${breed.nameKo} 평균 수명은 얼마인가요?`,
      answer: `${breed.nameKo}의 평균 수명은 ${breed.lifespanMin}~${breed.lifespanMax}년입니다. 정기 건강검진과 적절한 식이·운동 관리가 건강한 삶에 중요합니다.`,
      url: pageUrl,
    });
  }

  if (breed.sizeCategory) {
    const sizeText = SIZE_LABEL[breed.sizeCategory] ?? breed.sizeCategory;
    faqs.push({
      question: `${breed.nameKo}는 어떤 환경에서 잘 지내나요?`,
      answer: `${breed.nameKo}는 ${sizeText} 품종으로, 생활 환경 적합성은 개체의 성격과 운동량에 따라 달라집니다. 입양 전 품종 특성과 생활 방식의 적합 여부를 충분히 파악하는 것을 권장합니다.`,
      url: pageUrl,
    });
  }

  if (breed.commonConditions && breed.commonConditions.length > 0) {
    faqs.push({
      question: `${breed.nameKo}에서 흔한 건강 문제는 무엇인가요?`,
      answer: `${breed.nameKo}에서 주의해야 할 질환으로는 ${breed.commonConditions.slice(0, 3).join(", ")} 등이 있습니다. 정기적인 수의사 검진으로 조기 발견하는 것이 중요합니다.`,
      url: pageUrl,
    });
  }

  faqs.push({
    question: `${breed.nameKo}를 처음 키울 때 주의사항은?`,
    answer: `${breed.nameKo} 입양 전 기본 용품(밥그릇·물그릇·이동장·침대) 준비와 근처 동물병원을 미리 확인해두는 것이 좋습니다. 입양 직후 초기 건강검진을 받아 현재 건강 상태를 파악하세요.`,
    url: pageUrl,
  });

  return faqs;
}

export default async function BreedPage({
  params,
}: {
  params: Promise<{ species: string; slug: string }>;
}) {
  const { species, slug } = await params;
  const [breed, relatedGuides, relatedBlogs] = await Promise.all([
    db.select().from(breeds).where(and(eq(breeds.slug, slug), eq(breeds.species, species))).get(),
    getCachedCategoryGuides(1), // cat1 = 입양·등록
    getCachedCategoryBlogPosts(1),
  ]);

  if (!breed) notFound();

  const speciesLabel = SPECIES_LABEL[species] ?? species;
  const pageUrl = `${SITE_URL}/breed/${species}/${slug}`;
  const commonConditions = Array.isArray(breed.commonConditions) ? breed.commonConditions as string[] : [];

  const breadcrumb = breadcrumbSchema([
    { name: "홈", url: SITE_URL },
    { name: `${speciesLabel} 품종`, url: `${SITE_URL}/breed/${species}` },
    { name: breed.nameKo, url: pageUrl },
  ]);

  const faqItems = buildBreedFaq({ ...breed, commonConditions }, speciesLabel, pageUrl);
  const faqLd = faqSchema(faqItems);

  const animalSchema = {
    "@context": "https://schema.org",
    "@type": "Animal",
    name: breed.nameKo,
    ...(breed.nameEn ? { alternateName: breed.nameEn } : {}),
    description: breed.lifespanMin && breed.lifespanMax
      ? `${breed.nameKo} — 평균 수명 ${breed.lifespanMin}~${breed.lifespanMax}년. 특징·성격·건강·키우기 정보.`
      : `${breed.nameKo} 품종 정보: 특징, 성격, 흔한 질병, 키우는 방법.`,
    url: pageUrl,
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", "[data-speakable]"] },
    isPartOf: { "@type": "WebSite", name: "펫지기", url: SITE_URL },
  };

  return (
    <AdPolicyProvider category={1}>
      <ScrollDepthTracker />
      <OutboundLinkTracker />
      <BreedViewTracker slug={slug} nameKo={breed.nameKo} species={species} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(animalSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href={`/breed/${species}`} className="hover:text-[var(--brand-accent)] transition-colors">
            {speciesLabel} 품종
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">{breed.nameKo}</span>
        </nav>

        <p className="text-sm text-[var(--brand-text-secondary)] mb-2">{speciesLabel} 품종</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-2" style={{ wordBreak: "keep-all" }} data-speakable>{breed.nameKo}</h1>
        {breed.nameEn && (
          <p className="text-[var(--brand-text-secondary)] mb-6">{breed.nameEn}</p>
        )}

        {/* 기본 정보 */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 text-sm p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)]">
          {breed.origin && (
            <>
              <dt className="text-[var(--brand-text-secondary)]">원산지</dt>
              <dd className="text-[var(--brand-text)]">{breed.origin}</dd>
            </>
          )}
          {breed.sizeCategory && (
            <>
              <dt className="text-[var(--brand-text-secondary)]">크기</dt>
              <dd className="text-[var(--brand-text)]">{SIZE_LABEL[breed.sizeCategory] ?? breed.sizeCategory}</dd>
            </>
          )}
          {breed.lifespanMin && breed.lifespanMax && (
            <>
              <dt className="text-[var(--brand-text-secondary)]">평균 수명</dt>
              <dd className="text-[var(--brand-text)]">{breed.lifespanMin}~{breed.lifespanMax}년</dd>
            </>
          )}
        </dl>

        {/* 본문 */}
        {breed.body && (
          <article
            className="prose prose-sm sm:prose-base max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: breed.body }}
          />
        )}

        {/* 주의 질환 */}
        {commonConditions.length > 0 && (
          <section className="mb-8 p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)]" aria-label="주의 질환">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">주의해야 할 질환</h2>
            <div className="flex flex-wrap gap-2">
              {commonConditions.map((cond) => (
                <span
                  key={cond}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--cat-3-soft)] text-[var(--cat-3)]"
                >
                  {cond}
                </span>
              ))}
            </div>
            <p className="text-xs text-[var(--brand-text-secondary)] mt-3">
              정기 건강검진을 통해 조기 발견하는 것이 중요합니다.
              <Link href="/condition" className="text-[var(--brand-accent)] hover:underline ml-1">
                질병·증상 정보 →
              </Link>
            </p>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-8" aria-label="자주 묻는 질문">
          <h2 className="text-lg font-bold text-[var(--brand-text)] mb-4">{breed.nameKo} 자주 묻는 질문</h2>
          <dl className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
                <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.question}</dt>
                <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <AdSlot adType="adsense" format="rectangle" className="mb-6" />
        <CategoryCta categoryId={3} className="mt-4 mb-8" />

        {/* 관련 가이드 */}
        {relatedGuides.length > 0 && (
          <aside className="mb-6 pt-6 border-t border-[var(--brand-border)]" aria-label="입양·등록 가이드">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">📚 입양·등록 가이드</h2>
            <div className="flex flex-col gap-2">
              {relatedGuides.slice(0, 3).map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="group flex items-center gap-2 p-3 rounded-lg hover:bg-[var(--brand-surface-2)] transition-colors"
                >
                  <span className="text-[var(--brand-accent)] shrink-0">📖</span>
                  <p className="text-sm font-medium text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                    {g.title}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* 관련 블로그 */}
        {relatedBlogs.length > 0 && (
          <aside className="mb-6 pt-4" aria-label="입양·등록 블로그">
            <h2 className="text-base font-bold text-[var(--brand-text)] mb-3">✍️ 집사 블로그</h2>
            <div className="flex flex-col gap-2">
              {relatedBlogs.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-start gap-2 p-3 rounded-lg hover:bg-[var(--brand-surface-2)] transition-colors"
                >
                  <span className="mt-0.5 text-[var(--brand-accent)] shrink-0">→</span>
                  <p className="text-sm font-medium text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug" style={{ wordBreak: "keep-all" }}>
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* 관련 링크 */}
        <section className="mb-6 pt-4 border-t border-[var(--brand-border)]">
          <div className="flex flex-wrap gap-3">
            <Link href={`/breed/${species}`} className="text-sm text-[var(--brand-accent)] hover:underline">
              ← {speciesLabel} 품종 목록
            </Link>
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">
              📚 반려동물 가이드 →
            </Link>
            <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">
              💊 질병·증상 정보 →
            </Link>
          </div>
        </section>

        <div className="pt-6 border-t border-[var(--brand-border)]">
          <ShareButtons url={pageUrl} title={`${breed.nameKo} 품종 정보 | 펫지기`} />
        </div>

        <p className="text-xs text-[var(--brand-text-secondary)] mt-6">
          출처: 위키피디아·공공데이터 기반 (CC BY-SA)
        </p>
      </main>
    </AdPolicyProvider>
  );
}
