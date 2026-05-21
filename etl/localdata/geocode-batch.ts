/**
 * 좌표 없는 업장 주소 일괄 지오코딩 (카카오맵 REST API)
 * 사용법: pnpm etl:geocode
 * - lat/lng가 null인 businesses만 처리
 * - 일 30만 건 무료 한도 초과 방지: 배치당 100ms 딜레이
 */

import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";
import { isNull, and, eq } from "drizzle-orm";

const BATCH = 50;
const DELAY_MS = 100;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("[geocode-batch] 시작 — lat/lng 없는 업장 조회 중...");

  const rows = await db
    .select({ id: businesses.id, address: businesses.address, name: businesses.name })
    .from(businesses)
    .where(and(isNull(businesses.lat), eq(businesses.status, "active")))
    .all();

  console.log(`[geocode-batch] 대상 ${rows.length}건`);

  let success = 0;
  let fail = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);

    for (const row of batch) {
      if (!row.address) { fail++; continue; }

      const geo = await geocodeAddress(row.address);
      if (!geo) { fail++; continue; }

      await db
        .update(businesses)
        .set({ lat: geo.lat, lng: geo.lng, updatedAt: new Date().toISOString() })
        .where(eq(businesses.id, row.id));

      success++;
    }

    await sleep(DELAY_MS);

    if ((i + BATCH) % 500 === 0 || i + BATCH >= rows.length) {
      console.log(`[geocode-batch] ${Math.min(i + BATCH, rows.length)}/${rows.length} (성공 ${success}, 실패 ${fail})`);
    }
  }

  console.log(`[geocode-batch] 완료 — 성공 ${success}건, 실패 ${fail}건`);
}

main().catch((err) => {
  console.error("[geocode-batch] 오류:", err);
  process.exit(1);
});
