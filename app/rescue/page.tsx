import type { Metadata } from "next";
import Link from "next/link";
import { getCachedRescuedAnimals } from "@/lib/db-queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "구조동물 현황 | 펫지기",
  robots: { index: false, follow: false },
};

function formatDate(s: string | null | undefined): string {
  if (!s) return "—";
  if (s.length === 8) {
    return `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}`;
  }
  return s.slice(0, 10);
}

function processStateColor(state: string | null | undefined): string {
  if (!state) return "bg-[var(--brand-border)] text-[var(--brand-text-secondary)]";
  if (state.includes("보호중")) return "bg-blue-50 text-blue-700";
  if (state.includes("입양")) return "bg-green-50 text-green-700";
  if (state.includes("반환")) return "bg-yellow-50 text-yellow-700";
  if (state.includes("종료") || state.includes("사망"))
    return "bg-[var(--brand-border)] text-[var(--brand-text-secondary)]";
  return "bg-[var(--brand-border)] text-[var(--brand-text-secondary)]";
}

export default async function RescuePage() {
  const animals = await getCachedRescuedAnimals();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* noindex banner */}
      <div className="mb-6 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <span aria-hidden="true" className="mt-0.5 shrink-0">⚠️</span>
        <p>
          구조동물 정보는 검색엔진 수집 제외 페이지입니다. 입양 문의는 해당
          보호센터에 직접 연락하세요.
        </p>
      </div>

      <h1 className="text-2xl font-bold mb-1 text-[var(--brand-text)]">
        구조동물 현황
      </h1>
      <p className="text-sm text-[var(--brand-text-secondary)] mb-8">
        공공데이터포털 APMS 기준 최근 50건 · 매일 05:00 갱신
      </p>

      {animals.length === 0 ? (
        <div className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface,#f9f9f9)] p-12 text-center">
          <p className="text-[var(--brand-text-secondary)] text-sm">
            현재 구조동물 데이터가 없습니다.
          </p>
          <p className="text-xs text-[var(--brand-text-secondary)] mt-2">
            ETL 동기화 후 표시됩니다.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal) => (
            <li key={animal.id}>
              <Link
                href={`/rescue/${animal.id}`}
                className="group flex flex-col h-full rounded-xl border border-[var(--brand-border)] bg-white hover:border-[var(--brand-accent)] hover:shadow-sm transition-all overflow-hidden"
              >
                {/* image placeholder / real image */}
                <div className="relative w-full h-40 bg-[var(--brand-border)] overflow-hidden">
                  {animal.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={animal.imageUrl}
                      alt={animal.kindCd ?? "구조동물"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-3xl text-[var(--brand-text-secondary)]">
                      🐾
                    </div>
                  )}
                  {/* process state badge */}
                  {animal.processState && (
                    <span
                      className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full ${processStateColor(animal.processState)}`}
                    >
                      {animal.processState}
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-1 flex-1">
                  <p className="font-semibold text-sm text-[var(--brand-text)] line-clamp-1">
                    {animal.kindCd ?? "종류 미상"}
                  </p>
                  {animal.happenPlace && (
                    <p className="text-xs text-[var(--brand-text-secondary)] line-clamp-1">
                      발견: {animal.happenPlace}
                    </p>
                  )}
                  {animal.careNm && (
                    <p className="text-xs text-[var(--brand-text-secondary)] line-clamp-1">
                      보호: {animal.careNm}
                    </p>
                  )}
                  <p className="text-xs text-[var(--brand-text-secondary)] mt-auto pt-2">
                    공고 {formatDate(animal.noticeSdt)}
                    {" ~ "}
                    {formatDate(animal.noticeEdt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* 입양 전 알아두세요 */}
      <section className="mt-12 pt-8 border-t border-[var(--brand-border)]">
        <h2 className="text-base font-bold text-[var(--brand-text)] mb-4">입양 전 알아두세요</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/guide/rescue-dog-adoption-guide" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors text-sm font-medium">
            📖 구조견 입양 가이드
          </Link>
          <Link href="/category/adoption" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors text-sm font-medium">
            🐾 입양·등록 정보
          </Link>
          <Link href="/shelter/seoul" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-colors text-sm font-medium">
            🏠 보호센터 찾기
          </Link>
        </div>
      </section>
    </main>
  );
}
