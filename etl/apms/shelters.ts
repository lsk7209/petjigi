/**
 * APMS 전국동물보호센터 동기화 ETL (Cron 2 — 매주 일요일 04:00 KST)
 * 데이터셋: 15025454
 * API: abandonmentPublic_v2 에서 보호센터 정보 추출 (careRegNo 기준 dedup)
 */

import { db } from "../../db/client";
import { shelters } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";
import { pingIndexNow } from "../../lib/seo/index-now";
import { buildShelterUpsertValues } from "../../lib/etl/shelter-upsert";
import { parseApmsResponse } from "../../lib/etl/apms-response";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

interface AnimalRow {
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

  // 전체 페이지 수집 + careRegNo 기준 dedup
  const firstPage = await fetchPage(1, 1);
  if (firstPage.kind === "failed") {
    console.error(`[ETL:shelters] 첫 페이지 조회 실패 — ${firstPage.reason}. 중단`);
    return;
  }
  const total = firstPage.totalCount;
  const totalPages = Math.max(1, Math.ceil(total / 1000));
  console.log(`[ETL:shelters] 구조동물 ${total}건 → 최대 ${totalPages}페이지`);

  const seen = new Map<string, AnimalRow>();
  let sawFailedPage = false;

  for (let page = 1; page <= totalPages; page++) {
    const result = await fetchPage(page, 1000);
    if (result.kind === "failed") {
      console.error(`[ETL:shelters] ${page}페이지 조회 실패 — ${result.reason}. 지금까지 수집된 ${seen.size}건만 반영`);
      sawFailedPage = true;
      break;
    }
    for (const item of result.items) {
      if (item.careRegNo && !seen.has(item.careRegNo)) {
        seen.set(item.careRegNo, item);
      }
    }
    if (result.items.length < 1000) break;
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
    `[ETL:shelters] 완료 — ${total2}건 처리${sawFailedPage ? " (일부 페이지 조회 실패로 부분 수집)" : ""}`
  );

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
