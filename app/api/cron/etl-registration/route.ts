import { NextResponse } from "next/server";

// Vercel Cron 폴백 엔드포인트 — 기본 ETL은 GitHub Actions로 실행됩니다.
// 이 라우트는 Vercel Cron 설정(vercel.json)이 404를 반환하지 않도록 존재합니다.
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 기본 ETL은 GitHub Actions .github/workflows/etl-registration-agents.yml 에서 실행됩니다.
  return NextResponse.json({
    ok: true,
    message: "ETL is handled by GitHub Actions. This endpoint is a Vercel Cron fallback stub.",
  });
}
