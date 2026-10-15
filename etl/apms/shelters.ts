/**
 * APMS 전국동물보호센터 동기화 ETL (Cron 2 — 매주 일요일 04:00 KST)
 * 데이터셋: 15025454
 * API: abandonmentPublic_v2 에서 보호센터 정보 추출 (careRegNo 기준 dedup)
 */

import { db } from "../../db/client";
import { eq } from "drizzle-orm";
import { shelters, etlSyncState } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";
import { pingIndexNow } from "../../lib/seo/index-now";
import { buildShelterUpsertValues } from "../../lib/etl/shelter-upsert";
import { collectApmsPages } from "../../lib/etl/apms-collection";
import { parseApmsResponse } from "../../lib/etl/apms-response";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

interface AnimalRow {
  desertionNo: string;
  careRegNo: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
}

async function fetchPage(pageNo: number, numOfRows = 1000) {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return parseApmsResponse<AnimalRow>({ httpOk: res.ok, httpStatus: res.status, json });
}

export async function syncShelters(): Promise<void> {
  console.log("[ETL:shelters] 시작 (abandonmentPublic_v2에서 보호센터 추출)");

  const attemptAt = new Date().toISOString();
  await db.insert(etlSyncState).values({jobName: "shelters", lastAttemptAt: attemptAt, updatedAt: attemptAt})
    .onConflictDoUpdate({target: etlSyncState.jobName, set: {lastAttemptAt: attemptAt, updatedAt: attemptAt}});
  // 원본 구조동물 ID로 페이지 반복을 검사한다. 센터 ID는 여러 동물에 반복되는 정상 값이다.
  const items = await collectApmsPages(fetchPage, row => row.desertionNo);
  const seen = new Map<string, AnimalRow>();
  for (const item of items) {
    if (item.careRegNo && !seen.has(item.careRegNo)) seen.set(item.careRegNo, item);
  }

  console.log(`[ETL:shelters] 고유 보호센터 ${seen.size}개 처리 중...`);

  let total2 = 0;
  const now = new Date().toISOString();

  for (const [regNo, row] of seen) {
    const addr = (row.careAddr ?? "").trim();

    let lat: number | null = null;
    let lng: number | null = null;

    if (addr) {
      const geo = await geocodeAddress(addr);
      if (geo) { lat = geo.lat; lng = geo.lng; }
    }

    const id = `apms-shelter-${regNo}`;
    const { insert, updateOnConflict } = buildShelterUpsertValues({
      id,
      name: row.careNm,
      address: addr,
      phone: row.careTel,
      lat,
      lng,
      now,
    });

    await db
      .insert(shelters)
      .values(insert)
      .onConflictDoUpdate({
        target: shelters.id,
        // sido/sigungu도 함께 갱신한다 — 센터가 이전해도 예전 지역이 남지 않게 한다(F10).
        set: updateOnConflict,
      });

    total2++;
  }

  console.log(
    `[ETL:shelters] 완료 — ${total2}건 처리`
  );

  const successfulAt = new Date().toISOString();
  await db.update(etlSyncState).set({lastSuccessfulAt: successfulAt, updatedAt: successfulAt})
    .where(eq(etlSyncState.jobName, "shelters"));

  if (total2 > 0) {
    await pingIndexNow([`${SITE_URL}/sido/seoul`, SITE_URL]).catch(() => {});

    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      await fetch(`${SITE_URL}/api/cache/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${cronSecret}` },
        // shelters 목록 캐시 태그가 'shelters'인데 기존에는 'stats'만 무효화해
        // 새 데이터가 반영돼도 목록이 갱신되지 않았다(F10).
        body: JSON.stringify({ tags: ["shelters", "stats"] }),
      }).catch((e) => console.error("[ETL:shelters] 캐시 무효화 실패:", e));
    }
  }
}

syncShelters().catch((err) => {
  console.error("[ETL:shelters] 오류:", err);
  process.exit(1);
});
