"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 런타임 오류 로깅
    console.error("[AppError]", error);
  }, [error]);

  return (
    <main
      data-ads-policy="block"
      className="min-h-[70vh] bg-[var(--brand-bg)] flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="max-w-md w-full text-center">
        {/* 상징 아이콘 */}
        <div className="text-5xl mb-4" role="img" aria-label="오류 알림">
          🐾
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--brand-text)] mb-3">
          일시적인 오류가 발생했어요
        </h1>
        <p className="text-sm sm:text-base text-[var(--brand-text-secondary)] mb-8 leading-relaxed" style={{ wordBreak: "keep-all" }}>
          페이지를 불러오는 중에 문제가 발생했습니다. 일시적인 현상일 수 있으니 다시 시도해 주세요.
        </p>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[var(--brand-accent)] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            다시 시도하기
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[var(--brand-border)] bg-white text-[var(--brand-text)] font-semibold text-sm hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-all shadow-sm"
          >
            홈으로 돌아가기
          </Link>
        </div>

        <p className="text-xs text-[var(--brand-text-secondary)]">
          문제가 지속되면 <a href="mailto:contact@petjigi.kr" className="underline hover:text-[var(--brand-accent)]">contact@petjigi.kr</a>로 문의해 주세요.
        </p>
      </div>
    </main>
  );
}
