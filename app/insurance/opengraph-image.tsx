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
          backgroundColor: "#FAF0F5",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", backgroundColor: "#9B7EA8", opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", backgroundColor: "#9B7EA8", opacity: 0.08 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#F3E8FF", borderRadius: 24, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, marginBottom: 32 }}>
          <span style={{ fontSize: 20, color: "#6B21A8", fontWeight: 700 }}>📋 보험·법률 YMYL · 전문가 검토</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: "#9B7EA8", marginBottom: 32 }}>
          <span style={{ fontSize: 60 }}>📋</span>
        </div>

        <div style={{ fontSize: 68, fontWeight: 800, color: "#2A2520", letterSpacing: "-2px", marginBottom: 16 }}>
          펫보험 안내
        </div>
        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: "#9B7EA8", marginBottom: 24 }} />
        <div style={{ fontSize: 28, color: "#7C5E8A", fontWeight: 400 }}>
          현대해상 · DB손보 · KB손보 등 6대 손보사 비교
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#7C5E8A", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
