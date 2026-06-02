import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#F5F5EE",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -100, right: -100, width: 450, height: 450, borderRadius: "50%", backgroundColor: "#6B7F5A", opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 350, height: 350, borderRadius: "50%", backgroundColor: "#6B7F5A", opacity: 0.08 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: "#6B7F5A", marginBottom: 32 }}>
          <span style={{ fontSize: 60 }}>📚</span>
        </div>

        <div style={{ fontSize: 68, fontWeight: 800, color: "#1A2010", letterSpacing: "-2px", marginBottom: 16 }}>
          반려동물 가이드
        </div>
        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: "#6B7F5A", marginBottom: 24 }} />
        <div style={{ fontSize: 28, color: "#4A6A3A", fontWeight: 400 }}>
          입양 · 사료 · 건강 · 보험 · 케어 · 장례 전문 가이드
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#4A6A3A", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
