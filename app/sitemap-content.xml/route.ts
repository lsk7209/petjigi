import { db } from "@/db/client";
import { contents, breeds } from "@/db/schema";
import { eq, and, desc, or, lte } from "drizzle-orm";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

function contentUrl(type: string, slug: string): string {
  if (type === "blog") return `${SITE_URL}/blog/${slug}`;
  if (type === "condition") return `${SITE_URL}/condition/${slug}`;
  return `${SITE_URL}/guide/${slug}`;
}

function priority(type: string): string {
  if (type === "guide" || type === "condition") return "0.8";
  return "0.7";
}

function changefreq(type: string): string {
  if (type === "guide" || type === "condition") return "weekly";
  return "monthly";
}

function urlEntry(loc: string, lastmod: string, freq: string, pri: string): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${pri}</priority>
  </url>`;
}

export async function GET() {
  try {
    const [contentRows, breedRows] = await Promise.all([
      db
        .select({ slug: contents.slug, type: contents.type, publishedAt: contents.publishedAt, updatedAt: contents.updatedAt })
        .from(contents)
        .where(
          and(
            eq(contents.status, "published"),
            lte(contents.publishedAt, new Date().toISOString()),
            or(
              eq(contents.type, "guide"),
              eq(contents.type, "blog"),
              eq(contents.type, "condition"),
            )
          )
        )
        .orderBy(desc(contents.publishedAt)),
      db
        .select({ slug: breeds.slug, species: breeds.species, updatedAt: breeds.updatedAt })
        .from(breeds),
    ]);

    const today = new Date().toISOString().split("T")[0];

    const contentUrls = contentRows.map((r) => {
      const loc = contentUrl(r.type, r.slug);
      const lastmod = (r.updatedAt ?? r.publishedAt ?? today).split("T")[0];
      return urlEntry(loc, lastmod, changefreq(r.type), priority(r.type));
    });

    const breedUrls = breedRows.map((r) => {
      const loc = `${SITE_URL}/breed/${r.species}/${r.slug}`;
      const lastmod = (r.updatedAt ?? today).split("T")[0];
      return urlEntry(loc, lastmod, "monthly", "0.7");
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...contentUrls, ...breedUrls].join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[sitemap-content] DB 오류:", err);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      { headers: { "Content-Type": "application/xml; charset=utf-8" } }
    );
  }
}
