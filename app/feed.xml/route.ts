import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { eq, and, desc, or, lte } from "drizzle-orm";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

function contentUrl(type: string, slug: string): string {
  if (type === "blog") return `${SITE_URL}/blog/${slug}`;
  if (type === "condition") return `${SITE_URL}/condition/${slug}`;
  if (type === "breed") return `${SITE_URL}/breed/${slug}`;
  return `${SITE_URL}/guide/${slug}`;
}

// Naver RSS + 범용 RSS feed (/feed.xml) — Naver Search Advisor 등록, Google Discover 노출 지원
export async function GET() {
  const posts = await db
    .select({
      slug: contents.slug,
      title: contents.title,
      type: contents.type,
      metaDescription: contents.metaDescription,
      publishedAt: contents.publishedAt,
      updatedAt: contents.updatedAt,
    })
    .from(contents)
    .where(
      and(
        eq(contents.status, "published"),
        lte(contents.publishedAt, new Date().toISOString()),
        or(
          eq(contents.type, "blog"),
          eq(contents.type, "guide"),
          eq(contents.type, "condition"),
          eq(contents.type, "breed"),
        )
      )
    )
    .orderBy(desc(contents.publishedAt))
    .limit(50);

  const lastBuildDate = posts[0]?.publishedAt
    ? new Date(posts[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>펫지기 — 반려동물 보호자를 위한 정보</title>
    <link>${SITE_URL}</link>
    <description>반려동물과 함께하는 모든 결정 — 입양부터 장례까지. 수의사 검토 가이드, 블로그, 질병·증상 정보.</description>
    <language>ko</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map((p) => {
        const url = contentUrl(p.type, p.slug);
        const pub = new Date(p.publishedAt ?? p.updatedAt ?? new Date().toISOString()).toUTCString();
        return `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${p.metaDescription ?? ""}]]></description>
      <pubDate>${pub}</pubDate>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
