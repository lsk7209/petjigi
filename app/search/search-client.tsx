"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics/events";

interface SearchResult {
  type: "business" | "guide" | "blog" | "condition";
  slug: string | null;
  name: string;
  category: number | null;
  href: string;
  address?: string;
}

interface SearchResponse {
  q: string;
  returnedCount: number;
  hasMore: boolean;
  results: SearchResult[];
}

const CATEGORY_LABEL: Record<number, string> = {
  1: "입양·등록", 2: "사료·영양", 3: "건강·의료",
  4: "보험·법률", 5: "케어·라이프", 6: "장례·추모",
};

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  guide: "가이드",
  blog: "블로그",
  condition: "질환정보",
  business: "업장",
};

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // 요청 순서를 추적해, 늦게 도착한 과거 응답이 최신 화면을 덮지 않게 한다.
  const requestIdRef = useRef(0);

  useEffect(() => {
    // 매 query 변경마다 이전 타이머와 진행 중인 요청을 항상 먼저 정리한다.
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    if (query.trim().length < 2) {
      return;
    }

    const myRequestId = ++requestIdRef.current;
    timer.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();
        const json: SearchResponse = await res.json();
        // 이 응답이 최신 요청의 결과가 아니면 화면·이벤트를 갱신하지 않는다.
        if (myRequestId !== requestIdRef.current) return;
        setData(json);
        track.search({ query, resultsCount: json.returnedCount });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // 사용자가 입력을 바꿔 취소된 요청 — 오류로 표시하지 않는다.
          return;
        }
        if (myRequestId !== requestIdRef.current) return;
        setError("검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        if (myRequestId === requestIdRef.current) setLoading(false);
      }
    }, 400);

    // unmount 또는 다음 effect 실행 전 정리 — 낡은 타이머/요청이 남지 않게 한다.
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, [query]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--brand-text)] mb-6">검색</h1>

      <div className="relative mb-8">
        <label htmlFor="site-search" className="sr-only">사이트 검색어</label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => {
            const nextQuery = e.target.value;
            setQuery(nextQuery);
            if (nextQuery.trim().length < 2) {
              setData(null);
              setLoading(false);
            }
          }}
          placeholder="동물병원, 가이드 검색…"
          aria-describedby="site-search-help"
          autoFocus
          className="w-full border border-[var(--brand-border)] rounded-[var(--radius-card)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] bg-[var(--brand-bg)] text-[var(--brand-text)]"
        />
        {loading && (
          <span role="status" className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--brand-text-secondary)]">
            검색 중…
          </span>
        )}
      </div>

      {error && <p role="alert" className="text-sm text-red-500 mb-4">{error}</p>}

      {!query.trim() && (
        <p id="site-search-help" className="text-sm text-[var(--brand-text-secondary)]">
          2글자 이상 입력하면 자동으로 검색됩니다.
        </p>
      )}

      {data && (
        <div>
          <p role="status" className="text-xs text-[var(--brand-text-secondary)] mb-4">
            &ldquo;{data.q}&rdquo; 검색 결과 {data.returnedCount}건{data.hasMore ? " 이상 표시 (최대 20건)" : ""}
          </p>
          {data.returnedCount === 0 ? (
            <div className="text-center py-16 text-[var(--brand-text-secondary)] text-sm">
              검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
            </div>
          ) : (
            <ul className="divide-y divide-[var(--brand-border)] border border-[var(--brand-border)] rounded-[var(--radius-card)] overflow-hidden">
              {data.results.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="flex items-start gap-3 p-4 hover:bg-[var(--brand-border)] transition-colors"
                  >
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-border)] text-[var(--brand-text-secondary)] shrink-0 mt-0.5">
                      {TYPE_LABEL[item.type]}
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
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
