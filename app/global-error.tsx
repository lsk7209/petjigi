"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4 py-16 font-sans">
        <main
          data-ads-policy="block"
          className="max-w-md w-full text-center"
        >
          <div className="text-5xl mb-4" role="img" aria-label="오류 알림">
            🐾
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
            시스템 오류가 발생했어요
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280] mb-8 leading-relaxed" style={{ wordBreak: "keep-all" }}>
            서비스를 불러오는 도중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#5C7C54] text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              다시 시도하기
            </button>
            <a
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#1A1A1A] font-semibold text-sm hover:border-[#5C7C54] hover:text-[#5C7C54] transition-all shadow-sm"
            >
              홈으로 돌아가기
            </a>
          </div>
          <p className="text-xs text-[#6B7280]">
            문제가 지속되면 <a href="mailto:contact@petjigi.kr" className="underline hover:text-[#5C7C54]">contact@petjigi.kr</a>로 문의해 주세요.
          </p>
        </main>
      </body>
    </html>
  );
}
