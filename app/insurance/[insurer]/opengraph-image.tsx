import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF0F5";
const ACCENT = "#9B7EA8";
const TEXT = "#2A2520";

const INSURERS: Record<string, { name: string; product: string }> = {
  hyundai: { name: "현대해상", product: "하이펫보험" },
  db: { name: "DB손보", product: "다이렉트 펫보험" },
  kb: { name: "KB손보", product: "펫코노미보험" },
  samsung: { name: "삼성화재", product: "애니펫보험" },
  hanwha: { name: "한화손보", product: "레저펫보험" },
  meritz: { name: "메리츠화재", product: "퍼펫보험" },
};

export default function OgImage({ params }: { params: { insurer: string } }) {
  const data = INSURERS[params.insurer];
  if (!data) notFound();

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
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.08 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#F3E8FF", borderRadius: 24, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, marginBottom: 28 }}>
          <span style={{ fontSize: 20, color: "#6B21A8", fontWeight: 700 }}>📋 보험·법률 YMYL · 전문가 검토</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 110, height: 110, borderRadius: "50%", backgroundColor: ACCENT, marginBottom: 28 }}>
          <span style={{ fontSize: 54 }}>🛡️</span>
        </div>

        <div style={{ fontSize: 52, fontWeight: 800, color: TEXT, letterSpacing: "-1px", marginBottom: 12 }}>
          {data.name} 펫보험
        </div>
        <div style={{ fontSize: 32, color: ACCENT, fontWeight: 600, marginBottom: 20 }}>
          {data.product}
        </div>

        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: ACCENT, marginBottom: 24 }} />

        <div style={{ fontSize: 26, color: "#7C5E8A", fontWeight: 400 }}>
          보장 범위 · 자기부담금 · 가입 연령 상세 안내
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#7C5E8A", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
