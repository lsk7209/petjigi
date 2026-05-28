import { ImageResponse } from "next/og";
import { db } from "@/db/client";
import { businesses, regions } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TYPE_CONFIG: Record<string, { label: string; emoji: string; bg: string; accent: string }> = {
  vet:        { label: "동물병원",      emoji: "🏥", bg: "#F0F5FA", accent: "#6B9080" },
  grooming:   { label: "펫미용",        emoji: "✂️", bg: "#FFF8F0", accent: "#C97D5B" },
  boarding:   { label: "펫호텔",        emoji: "🏠", bg: "#FFF8F0", accent: "#C97D5B" },
  funeral:    { label: "장묘업체",      emoji: "🕊️", bg: "#2C2C2C", accent: "#B89968" },
  sale:       { label: "분양업체",      emoji: "🐾", bg: "#FAF5EE", accent: "#9CAF88" },
  breeder:    { label: "브리더",        emoji: "🐕", bg: "#FAF5EE", accent: "#9CAF88" },
  transport:  { label: "반려동물 운송", emoji: "🚗", bg: "#FFF8F0", accent: "#C97D5B" },
  exhibition: { label: "체험전시",     emoji: "🎪", bg: "#FFF8F0", accent: "#C97D5B" },
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ type: string; sigungu: string; slug: string }>;
}) {
  const { type, sigungu, slug } = await params;
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.vet;
  const isDark = type === "funeral";
  const textColor = isDark ? "#F5F1EA" : "#2A2520";
  const subColor = isDark ? "#B8B3AA" : "#8C6A4F";
  const businessName = decodeURIComponent(slug);

  let locationName = decodeURIComponent(sigungu);
  let address: string | null = null;
  try {
    const [region, biz] = await Promise.all([
      db.select({ sigungu: regions.sigungu }).from(regions).where(eq(regions.sigunguSlug, sigungu)).get(),
      db.select({ address: businesses.address, addressSigungu: businesses.addressSigungu })
        .from(businesses)
        .where(and(eq(businesses.type, type), eq(businesses.name, businessName), ne(businesses.status, "closed")))
        .get(),
    ]);
    if (region?.sigungu) locationName = region.sigungu;
    if (biz?.address) address = biz.address.slice(0, 50);
  } catch {
    // fallback
  }

  const displayName = businessName.length > 22 ? businessName.slice(0, 22) + "…" : businessName;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: cfg.bg,
          padding: "64px 80px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", backgroundColor: cfg.accent, opacity: 0.08 }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", backgroundColor: cfg.accent, opacity: 0.06 }} />

        {/* type badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: cfg.accent,
            color: "#ffffff",
            borderRadius: 24,
            padding: "10px 22px",
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 40,
            width: "fit-content",
          }}
        >
          <span>{cfg.emoji}</span>
          <span>{cfg.label}</span>
        </div>

        {/* business name */}
        <div
          style={{
            fontSize: displayName.length > 15 ? 64 : 80,
            fontWeight: 800,
            color: textColor,
            letterSpacing: "-2px",
            lineHeight: 1.2,
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {displayName}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${cfg.accent}`,
            paddingTop: 24,
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 26 }}>🐾</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: cfg.accent }}>펫지기</span>
          </div>
          <span style={{ fontSize: 20, color: subColor }}>
            📍 {address ?? locationName}
          </span>
          <span style={{ fontSize: 20, color: subColor, opacity: 0.7 }}>petjigi.kr</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
