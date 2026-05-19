import { db } from "@/db/client";
import { contents } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";

// Naver RSS feed (/feed.xml) — Naver Search Advisor 등록 필수
export async function GET() {
  const posts = await db
    .select({
      slug: contents.slug,
      title: contents.title,
      metaDescription: contents.metaDescription,
      publishedAt: contents.publishedAt,
      updatedAt: contents.updatedAt,
    })
    .from(contents)
    .where(eq(contents.status, "published"))
    .orderBy(desc(contents.publishedAt))
    .limit(50);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>펫지기</title>
    <link>${SITE_URL}</link>
    <description>반려동물과 함께하는 모든 결정 — 입양부터 장례까지</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE_URL}/guide/${p.slug}</link>
      <guid>${SITE_URL}/guide/${p.slug}</guid>
      <description><![CDATA[${p.metaDescription ?? ""}]]></description>
      <pubDate>${new Date(p.publishedAt ?? p.updatedAt ?? new Date().toISOString()).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
