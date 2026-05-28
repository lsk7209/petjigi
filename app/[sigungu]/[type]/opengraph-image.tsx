import { ImageResponse } from "next/og";
import { db } from "@/db/client";
import { regions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TYPE_CONFIG: Record<string, { label: string; emoji: string; bg: string; accent: string; desc: string }> = {
  vet:        { label: "동물병원",      emoji: "🏥", bg: "#F0F5FA", accent: "#6B9080", desc: "진료·예방접종·응급처치" },
  grooming:   { label: "펫미용",        emoji: "✂️", bg: "#FFF8F0", accent: "#C97D5B", desc: "미용·목욕·위생 관리" },
  boarding:   { label: "펫호텔",        emoji: "🏠", bg: "#FFF8F0", accent: "#C97D5B", desc: "호텔링·위탁 돌봄 서비스" },
  funeral:    { label: "장묘업체",      emoji: "🕊️", bg: "#2C2C2C", accent: "#B89968", desc: "반려동물 장례·화장·납골" },
  sale:       { label: "분양업체",      emoji: "🐾", bg: "#FAF5EE", accent: "#9CAF88", desc: "반려동물 분양·입양" },
  breeder:    { label: "브리더",        emoji: "🐕", bg: "#FAF5EE", accent: "#9CAF88", desc: "전문 브리더 분양" },
  transport:  { label: "반려동물 운송", emoji: "🚗", bg: "#FFF8F0", accent: "#C97D5B", desc: "펫 이송·운반 서비스" },
  exhibition: { label: "체험전시",     emoji: "🎪", bg: "#FFF8F0", accent: "#C97D5B", desc: "반려동물 체험·전시 공간" },
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ sigungu: string; type: string }>;
}) {
  const { sigungu, type } = await params;
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.vet;
  const isDark = type === "funeral";
  const textColor = isDark ? "#F5F1EA" : "#2A2520";
  const subColor = isDark ? "#B8B3AA" : "#8C6A4F";

  let locationName = decodeURIComponent(sigungu);
  try {
    const row = await db.select({ sigungu: regions.sigungu }).from(regions).where(eq(regions.sigunguSlug, sigungu)).get();
    if (row?.sigungu) locationName = row.sigungu;
  } catch {
    // fallback
  }

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
          backgroundColor: cfg.bg,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", backgroundColor: cfg.accent, opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", backgroundColor: cfg.accent, opacity: 0.08 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: cfg.accent, marginBottom: 32 }}>
          <span style={{ fontSize: 60 }}>{cfg.emoji}</span>
        </div>

        <div style={{ fontSize: 32, fontWeight: 600, color: cfg.accent, marginBottom: 12 }}>
          {locationName}
        </div>

        <div style={{ fontSize: 72, fontWeight: 800, color: textColor, letterSpacing: "-2px", marginBottom: 16 }}>
          {cfg.label}
        </div>

        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: cfg.accent, marginBottom: 24 }} />

        <div style={{ fontSize: 28, color: subColor, fontWeight: 400 }}>
          {cfg.desc} — 공공데이터 기반
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: subColor, opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
