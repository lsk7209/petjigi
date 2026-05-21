"use client";

import Script from "next/script";
import { useAdPolicy } from "@/components/providers/ad-policy-provider";
import type { AdType } from "@/db/schema/ad-policies";

interface AdSlotProps {
  adType: AdType;
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

// 카테고리 6(장례·추모)에서 펫보험·펫푸드·펫서비스는 DOM 레벨 차단 (spec §2 금기 3)
export function AdSlot({ adType, slotId, format = "auto", className }: AdSlotProps) {
  const { getPolicy } = useAdPolicy();
  const policy = getPolicy(adType);

  if (policy === "block") return null;

  if (adType === "memorial" && policy === "preferred") {
    return (
      <div className={className}>
        <MemorialAd />
      </div>
    );
  }

  if (adType === "adsense") {
    return (
      <div className={className}>
        <AdSenseSlot slotId={slotId} format={format} />
      </div>
    );
  }

  return null;
}

function MemorialAd() {
  return (
    <div className="text-sm text-[var(--brand-text-secondary)] p-4 border border-[var(--brand-border)] rounded-lg">
      <p className="font-medium mb-1">추모 굿즈 큐레이션</p>
      <p className="text-xs">소중한 반려동물을 기억하는 방법</p>
    </div>
  );
}

const FORMAT_MIN_HEIGHT: Record<string, number> = {
  horizontal: 90,
  rectangle: 250,
  vertical: 600,
  auto: 100,
};

function AdSenseSlot({ slotId, format }: { slotId?: string; format: string }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  if (!adsenseId) return null;
  if (!slotId) return null;

  const minHeight = FORMAT_MIN_HEIGHT[format] ?? 100;

  return (
    // min-height 예약 → CLS(누적 레이아웃 이동) 방지
    <div style={{ minHeight }}>
      <Script
        id="adsense-init"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={adsenseId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <Script id={`adsense-push-${slotId}`} strategy="lazyOnload">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
