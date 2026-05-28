import { ImageResponse } from "next/og";
import { db } from "@/db/client";
import { regions, shelters } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#F0F9F4";
const ACCENT = "#4A9B6F";
const TEXT = "#2A2520";

export default async function OgImage({
  params,
}: {
  params: Promise<{ sigungu: string }>;
}) {
  const { sigungu } = await params;

  let locationName = decodeURIComponent(sigungu);
  let shelterCount = 0;
  try {
    const region = await db.select({ sigungu: regions.sigungu }).from(regions).where(eq(regions.sigunguSlug, sigungu)).get();
    if (region?.sigungu) locationName = region.sigungu;
    const countResult = await db.select({ count: count() }).from(shelters).where(eq(shelters.sigungu, locationName)).get();
    shelterCount = countResult?.count ?? 0;
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
          backgroundColor: BG,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.08 }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.06 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", backgroundColor: ACCENT, marginBottom: 32 }}>
          <span style={{ fontSize: 60 }}>🏠</span>
        </div>

        <div style={{ fontSize: 34, fontWeight: 600, color: ACCENT, marginBottom: 12 }}>
          {locationName}
        </div>

        <div style={{ fontSize: 68, fontWeight: 800, color: TEXT, letterSpacing: "-2px", marginBottom: 16 }}>
          동물보호센터
        </div>

        <div style={{ width: 80, height: 4, borderRadius: 2, backgroundColor: ACCENT, marginBottom: 24 }} />

        <div style={{ fontSize: 28, color: "#5C8A6E", fontWeight: 400 }}>
          {shelterCount > 0 ? `${shelterCount}개소 — ` : ""}유기동물 입양·임시보호 문의
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 48, fontSize: 20, color: "#5C8A6E", opacity: 0.7 }}>
          🐾 petjigi.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
