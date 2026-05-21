"use client";

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const kakaoShareUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=none&validation_action=default&validation_params=${encodeURIComponent(JSON.stringify({ title, link: { mobileWebUrl: url, webUrl: url } }))}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-[var(--brand-text-secondary)] font-medium">공유</span>

      {/* 트위터/X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
        aria-label="X(트위터)에 공유"
      >
        𝕏 공유
      </a>

      {/* 링크 복사 */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--brand-border)] text-xs font-medium text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:border-[var(--brand-accent)] transition-colors"
        aria-label="링크 복사"
      >
        {copied ? "✓ 복사됨" : "🔗 링크 복사"}
      </button>
    </div>
  );
}
