import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF5EE";
const ACCENT = "#9CAF88";
const TEXT = "#2A2520";

const SPECIES_CONFIG: Record<string, { emoji: string; label: string; desc: string }> = {
  dog: { emoji: "🐕", label: "강아지 품종 도감", desc: "품종별 특징·성격·수명·건강 정보" },
  cat: { emoji: "🐈", label: "고양이 품종 도감", desc: "품종별 특징·성격·털 관리 정보" },
  small: { emoji: "🐹", label: "소동물 품종 도감", desc: "토끼·기니피그·햄스터 품종 정보" },
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  const config = SPECIES_CONFIG[species] ?? SPECIES_CONFIG.dog;

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
          backgroundColor: BG,
          position: "relative",
        }}
      >
        {/* 배경 원 */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.08 }} />

        {/* 이모지 원 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: ACCENT, marginBottom: 36 }}>
          <span style={{ fontSize: 60 }}>{config.emoji}</span>
        </div>

        {/* 제목 */}
        <div style={{ fontSize: 68, fontWeight: 800, color: TEXT, letterSpacing: "-2px", marginBottom: 16 }}>
          {config.label}
        </div>

        {/* 구분선 */}
        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: ACCENT, marginBottom: 24 }} />

        {/* 설명 */}
        <div style={{ fontSize: 30, color: "#8C6A4F", fontWeight: 400 }}>
          {config.desc}
        </div>

        {/* 도메인 */}
        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#8C6A4F", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
