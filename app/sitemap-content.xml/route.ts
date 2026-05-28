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

function priority(type: string): string {
  if (type === "guide" || type === "condition") return "0.8";
  if (type === "blog") return "0.7";
  return "0.7";
}

function changefreq(type: string): string {
  if (type === "guide" || type === "condition") return "weekly";
  return "monthly";
}

export async function GET() {
  try {
    const rows = await db
      .select({
        slug: contents.slug,
        type: contents.type,
        publishedAt: contents.publishedAt,
        updatedAt: contents.updatedAt,
      })
      .from(contents)
      .where(
        and(
          eq(contents.status, "published"),
          lte(contents.publishedAt, new Date().toISOString()),
          or(
            eq(contents.type, "guide"),
            eq(contents.type, "blog"),
            eq(contents.type, "condition"),
            eq(contents.type, "breed"),
          )
        )
      )
      .orderBy(desc(contents.publishedAt));

    const urls = rows.map((r) => {
      const loc = contentUrl(r.type, r.slug);
      const lastmod = (r.updatedAt ?? r.publishedAt ?? new Date().toISOString()).split("T")[0];
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq(r.type)}</changefreq>
    <priority>${priority(r.type)}</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[sitemap-content] DB 오류:", err);
    // DB 오류 시 빈 유효한 XML 반환 — 500 대신 200으로 GSC 오류 방지
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }
    );
  }
}
