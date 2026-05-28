import { ImageResponse } from "next/og";
import { db } from "@/db/client";
import { breeds } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SPECIES_LABEL: Record<string, string> = {
  dog: "강아지",
  cat: "고양이",
  small: "소동물",
};

const SPECIES_EMOJI: Record<string, string> = {
  dog: "🐕",
  cat: "🐈",
  small: "🐹",
};

const BG = "#FAF5EE";
const ACCENT = "#9CAF88";

export default async function OgImage({
  params,
}: {
  params: Promise<{ species: string; slug: string }>;
}) {
  const { species, slug } = await params;
  const breed = await db
    .select({ nameKo: breeds.nameKo, nameEn: breeds.nameEn, origin: breeds.origin })
    .from(breeds)
    .where(and(eq(breeds.slug, slug), eq(breeds.species, species)))
    .get();

  const speciesLabel = SPECIES_LABEL[species] ?? "반려동물";
  const speciesEmoji = SPECIES_EMOJI[species] ?? "🐾";

  if (!breed) {
    return new ImageResponse(
      <div style={{ width: 1200, height: 630, backgroundColor: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 80 }}>{speciesEmoji}</span>
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const title = breed.nameKo.length > 30
    ? breed.nameKo.slice(0, 30) + "…"
    : breed.nameKo;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.08 }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", backgroundColor: ACCENT, opacity: 0.06 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: ACCENT,
              color: "#ffffff",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <span>{speciesEmoji}</span>
            <span>{speciesLabel} 품종</span>
          </div>
          {breed.origin && (
            <div
              style={{
                backgroundColor: "#F0EBE3",
                color: "#6B5E4F",
                borderRadius: 20,
                padding: "8px 16px",
                fontSize: 18,
              }}
            >
              원산지: {breed.origin}
            </div>
          )}
        </div>

        <div
          style={{
            fontSize: title.length > 10 ? 72 : 88,
            fontWeight: 800,
            color: "#2A2520",
            lineHeight: 1.2,
            letterSpacing: "-2px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {title}
          {breed.nameEn && (
            <div style={{ fontSize: 32, fontWeight: 400, color: "#8C6A4F", marginTop: 12, letterSpacing: "0px" }}>
              {breed.nameEn}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${ACCENT}`,
            paddingTop: 24,
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 28 }}>🐾</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: ACCENT }}>펫지기</span>
          </div>
          <span style={{ fontSize: 20, color: "#8C6A4F" }}>견종·묘종 도감</span>
          <span style={{ fontSize: 20, color: "#8C6A4F" }}>petjigi.kr</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
