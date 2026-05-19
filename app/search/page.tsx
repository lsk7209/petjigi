import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "./search-client";

export const metadata: Metadata = {
  title: "검색 | 펫지기",
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--brand-text)] mb-6">검색</h1>
      <div className="w-full border border-[var(--brand-border)] rounded-[var(--radius-card)] px-4 py-3 bg-[var(--brand-bg)] text-[var(--brand-text-secondary)] text-sm">
        로딩 중…
      </div>
    </main>
  );
}
