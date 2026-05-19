import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { CATEGORIES } from "@/lib/category";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "펫지기 — 반려동물 보호자를 위한 정보",
  description:
    "반려동물과 함께하는 모든 결정 — 입양부터 장례까지. 공공데이터 기반 신뢰할 수 있는 반려동물 정보.",
};

const CATEGORY_META: Record<
  number,
  { emoji: string; desc: string }
> = {
  1: { emoji: "🐾", desc: "입양 전 준비부터 동물등록까지 단계별 안내" },
  2: { emoji: "🥗", desc: "생애주기별 영양 요구량과 안전한 먹이 가이드" },
  3: { emoji: "💊", desc: "예방접종·건강검진·응급대처 신뢰할 수 있는 정보" },
  4: { emoji: "📋", desc: "펫보험 비교와 반려동물 관련 법률 핵심 정리" },
  5: { emoji: "✂️", desc: "그루밍·훈련·여행 등 일상 케어 실용 팁" },
  6: { emoji: "🕊️", desc: "펫로스 회복과 장례·추모 절차 조용히 안내" },
};

const SIDO_LIST = [
  { label: "서울", slug: "seoul" },
  { label: "경기", slug: "gyeonggi" },
  { label: "부산", slug: "busan" },
  { label: "인천", slug: "incheon" },
  { label: "대구", slug: "daegu" },
  { label: "광주", slug: "gwangju" },
  { label: "대전", slug: "daejeon" },
  { label: "울산", slug: "ulsan" },
  { label: "세종", slug: "sejong" },
];

async function getRecentGuides() {
  return db
    .select({
      slug: contents.slug,
      title: contents.title,
      category: contents.category,
      publishedAt: contents.publishedAt,
    })
    .from(contents)
    .where(
      and(eq(contents.status, "published"), eq(contents.type, "guide"))
    )
    .orderBy(desc(contents.publishedAt))
    .limit(3);
}

export default async function HomePage() {
  const categories = Object.values(CATEGORIES);
  const recentGuides = await getRecentGuides();

  return (
    <main className="min-h-screen bg-[var(--brand-bg)]">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-medium tracking-widest text-[var(--brand-accent)] uppercase mb-3">
          반려동물 보호자를 위한 정보
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-text)] mb-5 leading-tight">
          펫지기
        </h1>
        <p className="text-lg text-[var(--brand-text-secondary)] max-w-xl mx-auto mb-10">
          입양부터 장례까지 — 공공데이터 기반의 신뢰할 수 있는 반려동물 정보를
          한 곳에서 만나보세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/category/health"
            className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            건강 정보 보기
          </Link>
          <Link
            href="/category/adoption"
            className="px-5 py-2.5 rounded-full border border-[var(--brand-border)] text-[var(--brand-text)] text-sm font-medium hover:border-[var(--brand-accent)] transition-colors"
          >
            입양 가이드
          </Link>
        </div>
      </section>

      {/* 6대 카테고리 카드 */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold text-[var(--brand-text)] mb-6">
          카테고리
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat.id];
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-5 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all text-left group"
              >
                <span className="text-2xl mb-2 block">{meta.emoji}</span>
                <h3 className="font-semibold text-[var(--brand-text)] mb-1 group-hover:text-[var(--brand-accent)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">
                  {meta.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 최근 가이드 */}
      {recentGuides.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">
              최근 가이드
            </h2>
            <Link
              href="/category/health"
              className="text-sm text-[var(--brand-accent)] hover:underline"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="divide-y divide-[var(--brand-border)] border border-[var(--brand-border)] rounded-[var(--radius-card)] overflow-hidden">
            {recentGuides.map((guide) => {
              const cat = CATEGORIES[guide.category as keyof typeof CATEGORIES];
              const meta = CATEGORY_META[guide.category];
              return (
                <Link
                  key={guide.slug}
                  href={`/guide/${guide.slug}`}
                  className="flex items-center gap-4 p-4 bg-[var(--brand-bg)] hover:bg-[var(--brand-border)] transition-colors"
                >
                  <span className="text-xl shrink-0">{meta?.emoji ?? "📄"}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--brand-accent)] mb-0.5">
                      {cat?.name ?? "가이드"}
                    </p>
                    <p className="text-sm font-medium text-[var(--brand-text)] truncate">
                      {guide.title}
                    </p>
                  </div>
                  {guide.publishedAt && (
                    <time className="ml-auto text-xs text-[var(--brand-text-secondary)] shrink-0">
                      {guide.publishedAt.slice(0, 10)}
                    </time>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 지역별 동물병원 찾기 CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="rounded-[var(--radius-card)] border border-[var(--brand-border)] p-6">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-2">
            🏥 지역별 동물병원 찾기
          </h2>
          <p className="text-sm text-[var(--brand-text-secondary)] mb-5">
            공공데이터 기반으로 전국 동물병원·미용실·장묘업체를 검색하세요.
          </p>
          <div className="flex flex-wrap gap-2">
            {SIDO_LIST.map((sido) => (
              <Link
                key={sido.slug}
                href={`/sido/${sido.slug}`}
                className="px-3 py-1.5 rounded-full border border-[var(--brand-border)] text-sm text-[var(--brand-text)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors"
              >
                {sido.label}
              </Link>
            ))}
            <Link
              href="/sido/gyeonggi"
              className="px-3 py-1.5 rounded-full border border-dashed border-[var(--brand-border)] text-sm text-[var(--brand-text-secondary)] hover:border-[var(--brand-accent)] transition-colors"
            >
              더보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 이메일 구독 CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="rounded-[var(--radius-card)] bg-[var(--brand-accent)] text-white p-8 text-center">
          <h2 className="text-xl font-bold mb-2">
            반려동물 건강 정보를 이메일로 받아보세요
          </h2>
          <p className="text-sm opacity-80 mb-6">
            월 2회, 수의사·전문가 검토를 거친 콘텐츠만 엄선해 보내드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2.5 rounded-full bg-white text-[var(--brand-accent)] text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            구독 신청하기
          </Link>
        </div>
      </section>
    </main>
  );
}
