import { ImageResponse } from "next/og";
import { CATEGORIES } from "@/lib/category";
import type { CategoryId } from "@/lib/category";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SLUG_TO_ID: Record<string, CategoryId> = {
  adoption: 1,
  nutrition: 2,
  health: 3,
  insurance: 4,
  care: 5,
  memorial: 6,
};

const CATEGORY_COLORS: Record<number, { bg: string; accent: string; text: string }> = {
  1: { bg: "#FAF5EE", accent: "#9CAF88", text: "#2A2520" },
  2: { bg: "#F5FAF0", accent: "#7DA87B", text: "#2A2520" },
  3: { bg: "#F0F5FA", accent: "#6B9080", text: "#2A2520" },
  4: { bg: "#FAF0F5", accent: "#9B7EA8", text: "#2A2520" },
  5: { bg: "#FFF8F0", accent: "#C97D5B", text: "#2A2520" },
  6: { bg: "#2C2C2C", accent: "#B89968", text: "#F5F1EA" },
};

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🐾", 2: "🥗", 3: "💊", 4: "📋", 5: "✂️", 6: "🕊️",
};

const CATEGORY_DESC: Record<number, string> = {
  1: "입양·등록 가이드 모음",
  2: "사료·영양 정보 모음",
  3: "건강·의료 가이드 모음",
  4: "보험·법률 정보 모음",
  5: "케어·라이프 가이드 모음",
  6: "장례·추모 안내 모음",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const catId = SLUG_TO_ID[slug] ?? 1;
  const cat = CATEGORIES[catId];
  const colors = CATEGORY_COLORS[catId];
  const emoji = CATEGORY_EMOJI[catId] ?? "🐾";
  const desc = CATEGORY_DESC[catId] ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bg,
          position: "relative",
        }}
      >
        {/* 배경 원 */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", backgroundColor: colors.accent, opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", backgroundColor: colors.accent, opacity: 0.08 }} />

        {/* 이모지 원 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: colors.accent, marginBottom: 36 }}>
          <span style={{ fontSize: 60 }}>{emoji}</span>
        </div>

        {/* 카테고리 명 */}
        <div style={{ fontSize: 72, fontWeight: 800, color: colors.text, letterSpacing: "-2px", marginBottom: 16 }}>
          {cat?.name ?? "가이드"}
        </div>

        {/* 구분선 */}
        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: colors.accent, marginBottom: 24 }} />

        {/* 설명 */}
        <div style={{ fontSize: 30, color: catId === 6 ? "#B8B3AA" : "#8C6A4F", fontWeight: 400 }}>
          {desc}
        </div>

        {/* 도메인 */}
        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: catId === 6 ? "#B8B3AA" : "#8C6A4F", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
