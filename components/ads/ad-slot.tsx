"use client";

import Link from "next/link";
import Script from "next/script";
import { useAdPolicy } from "@/components/providers/ad-policy-provider";
import type { AdType } from "@/db/schema/ad-policies";

interface AdSlotProps {
  adType: AdType;
  slotId?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

// 포맷별 환경변수 슬롯 ID — AdSense 대시보드에서 발급 후 .env에 추가
const ENV_SLOT_IDS: Record<string, string | undefined> = {
  horizontal: process.env.NEXT_PUBLIC_AD_SLOT_HORIZONTAL,
  rectangle:  process.env.NEXT_PUBLIC_AD_SLOT_RECTANGLE,
  vertical:   process.env.NEXT_PUBLIC_AD_SLOT_VERTICAL,
  auto:       process.env.NEXT_PUBLIC_AD_SLOT_AUTO,
};

const FORMAT_MIN_HEIGHT: Record<string, number> = {
  horizontal: 90,
  rectangle:  250,
  vertical:   600,
  auto:       100,
};

// 하우스 광고 — 슬롯 ID 미설정 시 내부 CTA 표시 (AdSense 슬롯 발급 후 자동 대체)
const HOUSE_ADS: Record<string, { href: string; title: string; desc: string; cta: string }> = {
  horizontal: {
    href: "/insurance/compare",
    title: "펫보험, 한눈에 비교하세요",
    desc: "현대해상·KB·삼성 등 6대 손보사 실비 무료 비교",
    cta: "비교하기 →",
  },
  rectangle: {
    href: "/guide",
    title: "수의사 검토 반려동물 가이드",
    desc: "건강·영양·법률·케어까지 200+ 가이드",
    cta: "가이드 보기 →",
  },
  vertical: {
    href: "/insurance/compare",
    title: "펫보험 비교",
    desc: "6대 손보사 보험료·보장 비교",
    cta: "무료 비교 →",
  },
  auto: {
    href: "/guide",
    title: "반려동물 가이드",
    desc: "수의사 검토 건강 정보",
    cta: "더 보기 →",
  },
};

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
    const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
    const resolvedSlotId = slotId ?? ENV_SLOT_IDS[format];

    if (adsenseId && resolvedSlotId) {
      return (
        <div className={className}>
          <AdSenseSlot slotId={resolvedSlotId} format={format} />
        </div>
      );
    }

    // 슬롯 ID 미발급 시 하우스 광고 표시 (AdSense 설정 완료 후 자동 대체)
    const house = HOUSE_ADS[format] ?? HOUSE_ADS.auto;
    return (
      <div className={className}>
        <HouseAd format={format} house={house} />
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

function HouseAd({
  format,
  house,
}: {
  format: string;
  house: { href: string; title: string; desc: string; cta: string };
}) {
  const minHeight = FORMAT_MIN_HEIGHT[format] ?? 100;

  if (format === "horizontal") {
    return (
      <div
        style={{ minHeight }}
        className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-soft,#FAF5EE)]"
        role="complementary"
        aria-label="사이트 추천"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--brand-text)] truncate">{house.title}</p>
          <p className="text-[11px] text-[var(--brand-text-secondary)] truncate">{house.desc}</p>
        </div>
        <Link
          href={house.href}
          className="shrink-0 text-xs px-3 py-1.5 bg-[var(--brand-accent)] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {house.cta}
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight }}
      className="flex flex-col justify-between p-4 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-soft,#FAF5EE)]"
      role="complementary"
      aria-label="사이트 추천"
    >
      <div>
        <p className="text-sm font-semibold text-[var(--brand-text)] mb-1 leading-snug" style={{ wordBreak: "keep-all" }}>
          {house.title}
        </p>
        <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed" style={{ wordBreak: "keep-all" }}>
          {house.desc}
        </p>
      </div>
      <Link
        href={house.href}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-accent)] hover:underline"
      >
        {house.cta}
      </Link>
    </div>
  );
}

function AdSenseSlot({ slotId, format }: { slotId: string; format: string }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID!;
  const minHeight = FORMAT_MIN_HEIGHT[format] ?? 100;

  return (
    // min-height 예약 → CLS(누적 레이아웃 이동) 방지
    <div style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={adsenseId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <Script id={`adsense-push-${slotId}-${format}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
