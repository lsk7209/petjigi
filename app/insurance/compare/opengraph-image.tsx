import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF0F5";
const ACCENT = "#9B7EA8";
const TEXT = "#2A2520";

export default function OgImage() {
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

        {/* YMYL 뱃지 */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#F3E8FF", borderRadius: 24, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, marginBottom: 28 }}>
          <span style={{ fontSize: 20 }}>✅</span>
          <span style={{ fontSize: 20, color: "#6B21A8", fontWeight: 700 }}>전문가 검토 · 보험·법률 YMYL</span>
        </div>

        {/* 이모지 원 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: ACCENT, marginBottom: 32 }}>
          <span style={{ fontSize: 60 }}>📋</span>
        </div>

        {/* 제목 */}
        <div style={{ fontSize: 72, fontWeight: 800, color: TEXT, letterSpacing: "-2px", marginBottom: 16 }}>
          펫보험 비교
        </div>

        {/* 구분선 */}
        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: ACCENT, marginBottom: 24 }} />

        {/* 설명 */}
        <div style={{ fontSize: 28, color: "#7C5E8A", fontWeight: 400 }}>
          현대해상 · DB손보 · KB손보 등 6대 손보사 비교
        </div>

        {/* 도메인 */}
        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#7C5E8A", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
