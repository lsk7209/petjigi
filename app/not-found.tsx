import Link from "next/link";
import { CATEGORIES } from "@/lib/category";
import { NotFoundTracker } from "@/components/analytics/not-found-tracker";

const POPULAR_LINKS = [
  { href: "/sido/seoul", label: "서울 동물병원 찾기", emoji: "🏥" },
  { href: "/insurance/compare", label: "펫보험 비교", emoji: "📋" },
  { href: "/condition", label: "질병·증상 정보", emoji: "💊" },
  { href: "/guide", label: "반려동물 가이드", emoji: "📚" },
  { href: "/breed/dog", label: "강아지 품종 도감", emoji: "🐕" },
  { href: "/rescue", label: "구조동물 입양", emoji: "🐾" },
];

export default function NotFound() {
  const categories = Object.values(CATEGORIES);

  return (
    <main className="min-h-screen bg-[var(--brand-bg)] flex flex-col items-center justify-center px-4 py-16">
      <NotFoundTracker />
      <div className="max-w-2xl w-full text-center">
        {/* 상징 */}
        <div className="text-6xl mb-5" role="img" aria-label="길을 잃은 발자국">
          🐾
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--brand-text)] mb-3">
          페이지를 찾지 못했어요
        </h1>
        <p className="text-[var(--brand-text-secondary)] mb-2 text-base sm:text-lg">
          찾으시는 페이지가 없거나 주소가 바뀐 것 같아요.
        </p>
        <p className="text-sm text-[var(--brand-text-secondary)] mb-8">
          오류 코드: 404
        </p>

        {/* 홈으로 */}
        <Link
          href="/"
          className="inline-block bg-[var(--brand-accent)] text-white font-semibold px-8 py-3 rounded-[var(--radius-button)] hover:opacity-90 transition-opacity mb-10"
        >
          홈으로 돌아가기
        </Link>

        {/* 자주 찾는 페이지 */}
        <div className="border-t border-[var(--brand-border)] pt-8 mb-8">
          <p className="text-sm font-semibold text-[var(--brand-text)] mb-4">
            자주 찾는 페이지
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {POPULAR_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 p-3 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors text-left text-sm font-medium text-[var(--brand-text)]"
              >
                <span>{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 카테고리 6개 */}
        <div className="border-t border-[var(--brand-border)] pt-8">
          <p className="text-sm text-[var(--brand-text-secondary)] mb-4 font-medium">
            카테고리로 찾아보기
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-3 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors text-left"
              >
                <span className="block font-semibold text-[var(--brand-text)] text-sm">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
