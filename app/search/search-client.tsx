"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics/events";

interface SearchResult {
  type: "business" | "guide";
  slug: string | null;
  name: string;
  category: number | null;
  address?: string;
  bizType?: string;
  sigunguSlug?: string;
}

interface SearchResponse {
  q: string;
  total: number;
  results: SearchResult[];
}

const CATEGORY_LABEL: Record<number, string> = {
  1: "입양·등록", 2: "사료·영양", 3: "건강·의료",
  4: "보험·법률", 5: "케어·라이프", 6: "장례·추모",
};

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.trim().length < 2) { setData(null); return; }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error();
        const json: SearchResponse = await res.json();
        setData(json);
        track.search({ query, resultsCount: json.total });
      } catch {
        setError("검색 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [query]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--brand-text)] mb-6">검색</h1>

      <div className="relative mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="동물병원, 가이드 검색…"
          autoFocus
          className="w-full border border-[var(--brand-border)] rounded-[var(--radius-card)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] bg-[var(--brand-bg)] text-[var(--brand-text)]"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--brand-text-secondary)]">
            검색 중…
          </span>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {!query.trim() && (
        <p className="text-sm text-[var(--brand-text-secondary)]">
          2글자 이상 입력하면 자동으로 검색됩니다.
        </p>
      )}

      {data && (
        <div>
          <p className="text-xs text-[var(--brand-text-secondary)] mb-4">
            &ldquo;{data.q}&rdquo; 검색 결과 {data.total}건
          </p>
          {data.total === 0 ? (
            <div className="text-center py-16 text-[var(--brand-text-secondary)] text-sm">
              검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
            </div>
          ) : (
            <ul className="divide-y divide-[var(--brand-border)] border border-[var(--brand-border)] rounded-[var(--radius-card)] overflow-hidden">
              {data.results.map((item, i) => {
                const href = item.type === "guide"
                  ? `/guide/${item.slug}`
                  : item.bizType && item.sigunguSlug && item.slug
                  ? `/${item.bizType}/${item.sigunguSlug}/${item.slug}`
                  : "#";
                return (
                  <li key={i}>
                    <Link
                      href={href}
                      className="flex items-start gap-3 p-4 hover:bg-[var(--brand-border)] transition-colors"
                    >
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-border)] text-[var(--brand-text-secondary)] shrink-0 mt-0.5">
                        {item.type === "guide" ? "가이드" : "업장"}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--brand-text)] truncate">
                          {item.name}
                        </p>
                        {item.address && (
                          <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5 truncate">
                            {item.address}
                          </p>
                        )}
                        {item.category != null && (
                          <p className="text-xs text-[var(--brand-accent)] mt-0.5">
                            {CATEGORY_LABEL[item.category]}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
