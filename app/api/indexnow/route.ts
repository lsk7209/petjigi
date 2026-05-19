import { NextRequest, NextResponse } from "next/server";
import { pingIndexNow } from "@/lib/seo/index-now";

// ETL cron에서 호출: POST /api/indexnow { urls: string[] }
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { urls } = await req.json() as { urls: string[] };
  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: "urls required" }, { status: 400 });
  }

  await pingIndexNow(urls);
  return NextResponse.json({ ok: true, count: urls.length });
}
