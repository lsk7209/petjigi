import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { submitSitemapToGSC } from "@/lib/seo/google-indexing";

const VALID_TAGS = ["businesses", "rescue", "guides", "stats", "regions"] as const;
type ValidTag = (typeof VALID_TAGS)[number];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export async function POST(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { tags?: string[] };
  const toInvalidate = (body.tags ?? []).filter((t): t is ValidTag =>
    VALID_TAGS.includes(t as ValidTag)
  );

  for (const tag of toInvalidate) {
    revalidateTag(tag, { expire: 0 });
  }

  // GOOGLE_SA_JSON 설정 시 GSC에 사이트맵 자동 재제출 (graceful skip if not set)
  if (toInvalidate.length > 0) {
    await Promise.allSettled([
      submitSitemapToGSC(SITE_URL, `${SITE_URL}/sitemap.xml`),
      submitSitemapToGSC(SITE_URL, `${SITE_URL}/api/sitemap-content`),
    ]);
  }

  return NextResponse.json({
    ok: true,
    invalidated: toInvalidate,
    timestamp: new Date().toISOString(),
  });
}
