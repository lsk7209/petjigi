"use client";

import { useAdPolicy } from "@/components/providers/ad-policy-provider";
import type { AdType } from "@/db/schema/ad-policies";

interface AdSlotProps {
  adType: AdType;
  className?: string;
}

// 카테고리 6(장례·추모)에서 펫보험·펫푸드·펫서비스는 DOM 레벨 차단 (spec §2 금기 3)
export function AdSlot({ adType, className }: AdSlotProps) {
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
        <AdSenseSlot />
      </div>
    );
  }

  return null;
}

function MemorialAd() {
  return (
    <div className="text-sm text-[var(--text-secondary)] p-4 border border-[var(--border)] rounded-lg">
      <p className="font-medium mb-1">추모 굿즈 큐레이션</p>
      <p className="text-xs">소중한 반려동물을 기억하는 방법</p>
    </div>
  );
}

function AdSenseSlot() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  if (!adsenseId) return null;
  // AdSense 승인 후 실제 슬롯으로 교체
  return <div className="min-h-[90px] bg-[var(--border)] rounded animate-pulse" />;
}
