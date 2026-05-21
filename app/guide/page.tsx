import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { CATEGORIES } from "@/lib/category";
import type { CategoryId } from "@/lib/category";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "가이드", url: `${SITE_URL}/guide` },
]);

const FAQ = faqSchema([
  {
    question: "펫지기 가이드는 누가 작성하나요?",
    answer: "수의사·전문가 검토를 거친 가이드만 게재합니다. YMYL(건강·의료·보험·장례) 카테고리 콘텐츠는 자격을 갖춘 전문가 검수 후 발행됩니다.",
    url: `${SITE_URL}/guide`,
  },
  {
    question: "가이드 정보는 얼마나 자주 업데이트되나요?",
    answer: "수의학 가이드라인, 법령 개정, 최신 연구 결과를 반영해 정기적으로 검토합니다. 각 가이드 하단의 '검토일'을 확인하세요.",
    url: `${SITE_URL}/guide`,
  },
  {
    question: "특정 질병이나 증상 정보는 어디서 찾나요?",
    answer: "건강·의료 카테고리 가이드 또는 질병·증상 상세 페이지에서 확인하세요. 응급 상황이면 즉시 가까운 동물병원을 방문하세요.",
    url: `${SITE_URL}/category/health`,
  },
]);

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🐾", 2: "🥗", 3: "💊", 4: "📋", 5: "✂️", 6: "🕊️",
};

async function getAllGuides() {
  return db
    .select({
      slug: contents.slug,
      title: contents.title,
      category: contents.category,
      publishedAt: contents.publishedAt,
      metaDescription: contents.metaDescription,
      ymyl: contents.ymyl,
    })
    .from(contents)
    .where(and(eq(contents.status, "published"), eq(contents.type, "guide")))
    .orderBy(desc(contents.publishedAt));
}

export const metadata: Metadata = {
  title: "반려동물 가이드 — 수의사 검토 정보 모음 | 펫지기",
  description:
    "강아지·고양이 입양·건강·사료·보험·케어·장례까지. 수의사·전문가 검토를 거친 반려동물 가이드를 카테고리별로 모아봤습니다.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "반려동물 가이드 | 펫지기",
    description: "수의사 검토 반려동물 가이드 — 입양부터 장례까지 6개 카테고리.",
  },
};

export default async function GuideIndexPage() {
  const guides = await getAllGuides();

  const byCategory = guides.reduce<Record<number, typeof guides>>((acc, g) => {
    const cat = g.category ?? 1;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(g);
    return acc;
  }, {});

  const catOrder = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">가이드</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-3">반려동물 가이드</h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl">
            수의사·전문가 검토를 거친 반려동물 가이드를 카테고리별로 모아봤습니다.
            입양부터 장례까지 필요한 정보를 찾아보세요.
          </p>
        </div>

        {guides.length === 0 ? (
          <p className="text-[var(--brand-text-secondary)] text-sm">가이드를 준비 중입니다.</p>
        ) : (
          <div className="space-y-12">
            {catOrder.map((catId) => {
              const catGuides = byCategory[catId];
              if (!catGuides || catGuides.length === 0) return null;
              const cat = CATEGORIES[catId as CategoryId];
              if (!cat) return null;
              const emoji = CATEGORY_EMOJI[catId] ?? "📌";
              return (
                <section key={catId} aria-label={`${cat.name} 가이드`}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{emoji}</span>
                    <h2 className="text-xl font-bold text-[var(--brand-text)]">{cat.name}</h2>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="ml-auto text-xs text-[var(--brand-accent)] hover:underline"
                    >
                      카테고리 보기 →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {catGuides.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/guide/${g.slug}`}
                        className="group p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start gap-2">
                          {g.ymyl && (
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-[var(--cat-3-soft)] text-[var(--cat-3)] font-semibold mt-0.5">
                              전문가 검토
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug mt-1">
                          {g.title}
                        </h3>
                        {g.metaDescription && (
                          <p className="text-xs text-[var(--brand-text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                            {g.metaDescription}
                          </p>
                        )}
                        {g.publishedAt && (
                          <time className="text-xs text-[var(--brand-text-secondary)] mt-2 block" dateTime={g.publishedAt}>
                            {g.publishedAt.slice(0, 10)}
                          </time>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* 정적 가이드 링크 */}
        <section className="mt-12 pt-8 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-4">추천 가이드</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/guide/pet-loss-care" className="text-sm text-[var(--brand-accent)] hover:underline">
              🕊️ 펫로스 케어 가이드 →
            </Link>
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">
              📋 펫보험 비교 →
            </Link>
            <Link href="/breed" className="text-sm text-[var(--brand-accent)] hover:underline">
              🐾 견종·묘종 도감 →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
