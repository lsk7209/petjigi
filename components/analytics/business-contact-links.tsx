"use client";

import { track } from "@/lib/analytics/events";

interface Props {
  businessName: string;
  businessType: string;
  phone?: string | null;
  kakaoMapUrl: string;
  naverMapUrl: string;
  hasAddress: boolean;
}

export function BusinessContactLinks({
  businessName,
  businessType,
  phone,
  kakaoMapUrl,
  naverMapUrl,
  hasAddress,
}: Props) {
  return (
    <>
      {phone && (
        <div className="flex gap-3">
          <dt className="text-[var(--brand-text-secondary)] w-16 shrink-0 font-medium">전화</dt>
          <dd>
            <a
              href={`tel:${phone}`}
              className="text-[var(--brand-accent)] font-semibold hover:underline"
              onClick={() => track.phoneClick({ businessName, type: businessType })}
            >
              {phone}
            </a>
          </dd>
        </div>
      )}
      {hasAddress && (
        <div className="flex gap-2 mt-5 pt-4 border-t border-[var(--brand-border)]">
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-yellow-400 text-yellow-900 hover:bg-yellow-300 transition-colors"
            aria-label="카카오맵에서 보기"
            onClick={() => track.mapClick({ provider: "kakao", businessName })}
          >
            카카오맵
          </a>
          <a
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-green-500 text-white hover:bg-green-400 transition-colors"
            aria-label="네이버지도에서 보기"
            onClick={() => track.mapClick({ provider: "naver", businessName })}
          >
            네이버지도
          </a>
        </div>
      )}
    </>
  );
}
