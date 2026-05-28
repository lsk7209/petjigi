import { ImageResponse } from "next/og";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEALTH_BG = "#F0F5FA";
const HEALTH_ACCENT = "#6B9080";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await db
    .select({ title: contents.title, authorName: contents.authorName })
    .from(contents)
    .where(and(eq(contents.slug, slug), eq(contents.status, "published")))
    .get();

  if (!content) {
    return new ImageResponse(
      <div style={{ width: 1200, height: 630, backgroundColor: HEALTH_BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 80 }}>💊</span>
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const title = content.title.length > 40
    ? content.title.slice(0, 40) + "…"
    : content.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: HEALTH_BG,
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", backgroundColor: HEALTH_ACCENT, opacity: 0.08 }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", backgroundColor: HEALTH_ACCENT, opacity: 0.06 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: HEALTH_ACCENT,
              color: "#ffffff",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <span>💊</span>
            <span>질병·증상</span>
          </div>
          <div
            style={{
              backgroundColor: "#FEF3C7",
              color: "#92400E",
              borderRadius: 20,
              padding: "8px 16px",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            전문가 검토
          </div>
        </div>

        <div
          style={{
            fontSize: title.length > 25 ? 52 : 64,
            fontWeight: 800,
            color: "#2A2520",
            lineHeight: 1.3,
            letterSpacing: "-1.5px",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${HEALTH_ACCENT}`,
            paddingTop: 24,
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 28 }}>🐾</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: HEALTH_ACCENT }}>펫지기</span>
          </div>
          {content.authorName && (
            <span style={{ fontSize: 20, color: "#8C6A4F" }}>✍️ {content.authorName}</span>
          )}
          <span style={{ fontSize: 20, color: "#8C6A4F" }}>petjigi.kr</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
