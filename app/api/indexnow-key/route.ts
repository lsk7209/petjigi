import { NextResponse } from "next/server";

/**
 * GET /api/indexnow-key
 * IndexNow 키 검증 파일을 plain text로 반환합니다.
 *
 * 검색엔진은 /{key}.txt 경로로 검증하므로,
 * next.config.ts의 rewrites에서 아래를 추가하세요:
 *   { source: '/:key([a-f0-9]{32}).txt', destination: '/api/indexnow-key' }
 *
 * 또는 public/{INDEXNOW_KEY}.txt 파일을 직접 생성해도 됩니다.
 * (pnpm postinstall 또는 별도 스크립트에서 자동 생성 가능)
 */
export async function GET() {
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    return new NextResponse("INDEXNOW_KEY not configured", { status: 500 });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
