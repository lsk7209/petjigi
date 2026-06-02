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
          backgroundColor: "#F0F5F2",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -100, right: -100, width: 450, height: 450, borderRadius: "50%", backgroundColor: "#6B9080", opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 350, height: 350, borderRadius: "50%", backgroundColor: "#6B9080", opacity: 0.08 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#E8F5F0", borderRadius: 24, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, marginBottom: 32 }}>
          <span style={{ fontSize: 20, color: "#1A6B4A", fontWeight: 700 }}>✅ 수의사 검토 · 건강·의료 YMYL</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: "#6B9080", marginBottom: 32 }}>
          <span style={{ fontSize: 60 }}>💊</span>
        </div>

        <div style={{ fontSize: 68, fontWeight: 800, color: "#1A2E22", letterSpacing: "-2px", marginBottom: 16 }}>
          질병·증상 정보
        </div>
        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: "#6B9080", marginBottom: 24 }} />
        <div style={{ fontSize: 28, color: "#4A7A6A", fontWeight: 400 }}>
          슬개골 탈구 · 심장사상충 · FLUTD 등 주요 질환 수의사 검토
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#4A7A6A", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
