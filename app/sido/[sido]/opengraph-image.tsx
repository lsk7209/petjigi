import { ImageResponse } from "next/og";
import { db } from "@/db/client";
import { regions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#FAF5EE";
const ACCENT = "#9CAF88";
const TEXT = "#2A2520";

const SIDO_LABELS: Record<string, string> = {
  seoul: "서울특별시", gyeonggi: "경기도", busan: "부산광역시",
  incheon: "인천광역시", daegu: "대구광역시", gwangju: "광주광역시",
  daejeon: "대전광역시", ulsan: "울산광역시", sejong: "세종특별자치시",
  gangwon: "강원도", chungbuk: "충청북도", chungnam: "충청남도",
  jeonbuk: "전라북도", jeonnam: "전라남도", gyeongbuk: "경상북도",
  gyeongnam: "경상남도", jeju: "제주특별자치도",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ sido: string }>;
}) {
  const { sido } = await params;

  let sidoName = SIDO_LABELS[sido] ?? sido;
  try {
    const row = await db.select({ sido: regions.sido }).from(regions).where(eq(regions.sidoSlug, sido)).get();
    if (row?.sido) sidoName = row.sido;
  } catch {
    // fallback to static map
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
          backgroundColor: BG,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.1 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.08 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: ACCENT, marginBottom: 32 }}>
          <span style={{ fontSize: 60 }}>📍</span>
        </div>

        <div style={{ fontSize: 72, fontWeight: 800, color: TEXT, letterSpacing: "-2px", marginBottom: 16 }}>
          {sidoName}
        </div>

        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: ACCENT, marginBottom: 24 }} />

        <div style={{ fontSize: 30, color: "#8C6A4F", fontWeight: 400, marginBottom: 12 }}>
          동물병원 · 펫미용 · 펫호텔 · 장묘업체
        </div>
        <div style={{ fontSize: 22, color: "#8C6A4F", opacity: 0.8 }}>
          시군구별 반려동물 업체 정보
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#8C6A4F", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
