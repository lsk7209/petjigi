"use client";

import { useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/components/analytics/ga4";

const emptySubscribe = () => () => {};
const getCanShare = () => typeof navigator !== "undefined" && typeof navigator.share === "function";
const getServerCanShare = () => false;

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(emptySubscribe, getCanShare, getServerCanShare);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent("share", { method: "copy_link", content_title: title });
    } catch {
      // fallback for older browsers
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        trackEvent("share", { method: "native_share", content_title: title });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    // Web Share 미지원 또는 취소 외 실패 시 클립보드 복사로 폴백
    await handleCopy();
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-[var(--brand-text-secondary)] font-medium">공유</span>

      {/* 모바일/네이티브 공유 (카카오톡·인스타·문자 등 원클릭 공유) */}
      {canShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--brand-accent)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
          aria-label="공유하기"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          공유하기
        </button>
      )}

      {/* 트위터/X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("share", { method: "twitter", content_title: title })}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
        aria-label="X(트위터)에 공유"
      >
        𝕏 공유
      </a>

      {/* 링크 복사 */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--brand-border)] text-xs font-medium text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:border-[var(--brand-accent)] transition-colors"
        aria-label="링크 복사"
      >
        {copied ? "✓ 복사됨" : "🔗 링크 복사"}
      </button>
    </div>
  );
}
