import Link from "next/link";
import { CATEGORIES } from "@/lib/category";

export default function NotFound() {
  const categories = Object.values(CATEGORIES);

  return (
    <main className="min-h-screen bg-[var(--brand-bg)] flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center">
        {/* 상징 */}
        <div className="text-7xl mb-6" role="img" aria-label="길을 잃은 발자국">
          🐾
        </div>

        <h1 className="text-4xl font-bold text-[var(--brand-text)] mb-3">
          페이지를 찾지 못했어요
        </h1>
        <p className="text-[var(--brand-text-secondary)] mb-2 text-lg">
          찾으시는 페이지가 없거나 주소가 바뀐 것 같아요.
        </p>
        <p className="text-sm text-[var(--brand-text-secondary)] mb-10">
          오류 코드: 404
        </p>

        {/* 홈으로 */}
        <Link
          href="/"
          className="inline-block bg-[var(--brand-accent)] text-white font-semibold px-8 py-3 rounded-[var(--radius-button)] hover:opacity-90 transition-opacity mb-12"
        >
          홈으로 돌아가기
        </Link>

        {/* 카테고리 6개 */}
        <div className="border-t border-[var(--brand-border)] pt-10">
          <p className="text-sm text-[var(--brand-text-secondary)] mb-5 font-medium">
            원하시는 카테고리를 찾아보세요
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors text-left"
              >
                <span className="block font-semibold text-[var(--brand-text)] text-sm">
                  {cat.name}
                </span>
                <span className="block text-xs text-[var(--brand-text-secondary)] mt-0.5">
                  {cat.tone}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
