import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "건강·의료", url: `${SITE_URL}/category/health` },
  { name: "질병·증상 정보", url: `${SITE_URL}/condition` },
]);

const FAQ = faqSchema([
  {
    question: "반려동물 질병 정보는 어떤 기준으로 작성되나요?",
    answer: "WSAVA(세계소동물수의사회), 대한수의사회 가이드라인 및 수의학 교재를 참고해 작성하고, 수의사 검토를 거쳐 발행합니다.",
    url: `${SITE_URL}/condition`,
  },
  {
    question: "질병 증상이 의심될 때 어떻게 해야 하나요?",
    answer: "본 정보는 참고용이며 의학적 진단을 대체하지 않습니다. 증상이 의심되면 반드시 수의사를 방문하세요. 응급 신호(호흡 곤란, 경련, 실신, 소변 불통 등)는 즉시 24시간 응급 병원을 찾으세요.",
    url: `${SITE_URL}/condition`,
  },
  {
    question: "특정 지역 동물병원을 찾으려면?",
    answer: "펫지기 지역별 동물병원 검색 기능을 이용하세요. 공공데이터 기반으로 전국 동물병원 정보를 제공합니다.",
    url: `${SITE_URL}/sido/seoul`,
  },
  {
    question: "처음 반려동물을 키우는데 어떤 동물병원을 선택해야 하나요?",
    answer: "집에서 가깝고 기본 장비(혈액 검사기·X-ray·초음파)를 갖춘 병원을 주치의로 정하세요. 응급 상황에 대비해 24시간 응급 동물병원 위치도 미리 파악해두는 것이 좋습니다.",
    url: `${SITE_URL}/guide/animal-hospital-guide`,
  },
]);

async function getAllConditions() {
  return db
    .select({
      slug: contents.slug,
      title: contents.title,
      category: contents.category,
      publishedAt: contents.publishedAt,
      metaDescription: contents.metaDescription,
    })
    .from(contents)
    .where(and(eq(contents.status, "published"), eq(contents.type, "condition")))
    .orderBy(desc(contents.publishedAt));
}

export const metadata: Metadata = {
  title: "반려동물 질병·증상 정보 — 수의사 검토 | 펫지기",
  description:
    "강아지·고양이 흔한 질병의 증상, 원인, 치료 방법을 수의사 검토를 거쳐 안내합니다. 슬개골 탈구, FLUTD, 심장사상충, 켄넬코프 등.",
  alternates: { canonical: "/condition" },
  openGraph: {
    title: "반려동물 질병·증상 정보 | 펫지기",
    description: "수의사 검토 질병·증상 가이드 — 강아지·고양이 흔한 질환 정보.",
  },
};

const POPULAR_CONDITIONS = [
  { label: "슬개골 탈구", slug: "dog-patellar-luxation", emoji: "🦴" },
  { label: "고양이 FLUTD", slug: "cat-flutd", emoji: "🚽" },
  { label: "심장사상충", slug: "dog-heartworm", emoji: "🦟" },
  { label: "켄넬코프", slug: "dog-kennel-cough", emoji: "🫁" },
  { label: "강아지 구토", slug: "dog-vomiting", emoji: "🤢" },
  { label: "파보바이러스", slug: "dog-parvovirus", emoji: "⚠️" },
  { label: "고양이 구내염", slug: "cat-stomatitis", emoji: "🦷" },
  { label: "강아지 피부알레르기", slug: "dog-skin-allergy", emoji: "🐾" },
  { label: "강아지 디스크", slug: "dog-disc-disease", emoji: "🦴" },
  { label: "고양이 변비", slug: "cat-constipation", emoji: "🐈" },
];

export default async function ConditionIndexPage() {
  const conditions = await getAllConditions();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/health" className="hover:text-[var(--brand-accent)] transition-colors">건강·의료</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">질병·증상 정보</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-3">반려동물 질병·증상 정보</h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl">
            강아지·고양이에게 흔한 질환의 증상, 원인, 치료 방법을 수의사 검토를 거쳐 안내합니다.
            본 정보는 참고용이며 의학적 진단을 대체하지 않습니다.
          </p>
        </div>

        {/* 주의 배너 */}
        <div className="mb-8 p-4 rounded-xl border border-[var(--cat-3-soft)] bg-[var(--cat-3-soft)]">
          <p className="text-sm text-[var(--cat-3)] font-medium">
            💊 응급 증상(호흡 곤란·경련·실신·12시간 이상 소변 없음)은 즉시 24시간 응급 동물병원을 방문하세요.
          </p>
        </div>

        {/* 인기 질환 바로가기 */}
        {POPULAR_CONDITIONS.length > 0 && (
          <section className="mb-10" aria-label="인기 질환">
            <h2 className="text-lg font-bold text-[var(--brand-text)] mb-3">자주 찾는 질환</h2>
            <div className="flex flex-wrap gap-2">
              {POPULAR_CONDITIONS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/condition/${c.slug}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--brand-border)] text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors font-medium"
                >
                  {c.emoji} {c.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 질환 목록 */}
        {conditions.length === 0 ? (
          <div className="p-8 rounded-xl border border-[var(--brand-border)] text-center">
            <p className="text-[var(--brand-text-secondary)] text-sm">질환 정보를 준비 중입니다.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {(
              [
                { label: "🐕 강아지 질환·증상", prefix: "dog-" },
                { label: "🐈 고양이 질환·증상", prefix: "cat-" },
                { label: "🐾 공통·기타 질환", prefix: "" },
              ] as { label: string; prefix: string }[]
            ).map(({ label, prefix }) => {
              const filtered = prefix
                ? conditions.filter((c) => c.slug.startsWith(prefix))
                : conditions.filter((c) => !c.slug.startsWith("dog-") && !c.slug.startsWith("cat-"));
              if (filtered.length === 0) return null;
              return (
                <section key={label} aria-label={label}>
                  <h2 className="text-lg font-bold text-[var(--brand-text)] mb-4">{label}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filtered.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/condition/${c.slug}`}
                        className="group p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
                      >
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--cat-3-soft)] text-[var(--cat-3)] font-semibold">
                          전문가 검토
                        </span>
                        <h3 className="font-semibold text-sm text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors leading-snug mt-2">
                          {c.title}
                        </h3>
                        {c.metaDescription && (
                          <p className="text-xs text-[var(--brand-text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                            {c.metaDescription}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* 관련 링크 */}
        <section className="mt-12 pt-8 border-t border-[var(--brand-border)]">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-4">함께 보면 좋은 정보</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/category/health" className="text-sm text-[var(--brand-accent)] hover:underline">
              💊 건강·의료 가이드 →
            </Link>
            <Link href="/guide" className="text-sm text-[var(--brand-accent)] hover:underline">
              📚 전체 가이드 보기 →
            </Link>
            <Link href="/guide/animal-hospital-guide" className="text-sm text-[var(--brand-accent)] hover:underline">
              🏥 동물병원 선택 가이드 →
            </Link>
            <Link href="/sido/seoul" className="text-sm text-[var(--brand-accent)] hover:underline">
              📍 지역별 동물병원 찾기 →
            </Link>
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">
              📋 펫보험 비교 →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
