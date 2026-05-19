import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "펫지기 — 반려동물 보호자를 위한 정보";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          backgroundColor: "#FAF5EE",
          position: "relative",
        }}
      >
        {/* 배경 장식 원 */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            backgroundColor: "#9CAF88",
            opacity: 0.12,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            backgroundColor: "#C97D5B",
            opacity: 0.1,
          }}
        />

        {/* 발자국 아이콘 영역 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#9CAF88",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 52 }}>🐾</span>
        </div>

        {/* 타이틀 */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#2A2520",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          펫지기
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: 64,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#9CAF88",
            marginBottom: 24,
          }}
        />

        {/* 부제 */}
        <div
          style={{
            fontSize: 32,
            color: "#8C6A4F",
            fontWeight: 400,
            letterSpacing: "0px",
          }}
        >
          반려동물 보호자를 위한 정보
        </div>

        {/* 도메인 */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 48,
            fontSize: 20,
            color: "#8C6A4F",
            opacity: 0.7,
          }}
        >
          petjigi.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
