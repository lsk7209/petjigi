import { ImageResponse } from "next/og";
import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { CATEGORIES } from "@/lib/category";
import type { CategoryId } from "@/lib/category";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_COLORS: Record<number, { bg: string; accent: string }> = {
  1: { bg: "#FAF5EE", accent: "#9CAF88" },
  2: { bg: "#F5FAF0", accent: "#7DA87B" },
  3: { bg: "#F0F5FA", accent: "#6B9080" },
  4: { bg: "#FAF0F5", accent: "#9B7EA8" },
  5: { bg: "#FFF8F0", accent: "#C97D5B" },
  6: { bg: "#2C2C2C", accent: "#B89968" },
};

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🐾", 2: "🥗", 3: "💊", 4: "📋", 5: "✂️", 6: "🕊️",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await db
    .select({
      title: contents.title,
      subtitle: contents.subtitle,
      category: contents.category,
      authorName: contents.authorName,
    })
    .from(contents)
    .where(and(eq(contents.slug, slug), eq(contents.status, "published")))
    .get();

  if (!content) {
    return new ImageResponse(
      <div style={{ width: 1200, height: 630, backgroundColor: "#FAF5EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 80 }}>🐾</span>
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const catId = content.category as CategoryId;
  const cat = CATEGORIES[catId];
  const colors = CATEGORY_COLORS[catId] ?? CATEGORY_COLORS[5];
  const emoji = CATEGORY_EMOJI[catId] ?? "🐾";
  const isDark = catId === 6;
  const textColor = isDark ? "#F5F1EA" : "#2A2520";
  const subColor = isDark ? "#B8B3AA" : "#8C6A4F";

  const title = content.title.length > 40
    ? content.title.slice(0, 40) + "…"
    : content.title;
  const subtitle = content.subtitle
    ? (content.subtitle.length > 55 ? content.subtitle.slice(0, 55) + "…" : content.subtitle)
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.bg,
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", backgroundColor: colors.accent, opacity: 0.08 }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", backgroundColor: colors.accent, opacity: 0.06 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: colors.accent,
              color: "#ffffff",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <span>{emoji}</span>
            <span>{cat?.name ?? "블로그"}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div
            style={{
              fontSize: title.length > 25 ? 50 : 60,
              fontWeight: 800,
              color: textColor,
              lineHeight: 1.3,
              letterSpacing: "-1.5px",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 26, color: subColor, lineHeight: 1.5, fontWeight: 400 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${colors.accent}`,
            paddingTop: 24,
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 28 }}>🐾</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: colors.accent }}>펫지기</span>
          </div>
          {content.authorName && (
            <span style={{ fontSize: 20, color: subColor }}>✍️ {content.authorName}</span>
          )}
          <span style={{ fontSize: 20, color: subColor }}>petjigi.kr</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
