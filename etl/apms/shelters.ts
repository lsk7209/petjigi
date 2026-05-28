/**
 * APMS 전국동물보호센터 동기화 ETL (Cron 2 — 매주 일요일 04:00 KST)
 * 데이터셋: 15025454
 * API: abandonmentPublic_v2 에서 보호센터 정보 추출 (careRegNo 기준 dedup)
 */

import { db } from "../../db/client";
import { shelters } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";
import { pingIndexNow } from "../../lib/seo/index-now";

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

async function fetchPage(pageNo: number, numOfRows = 1000): Promise<{ items: AnimalRow[]; total: number }> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`APMS API 오류: ${res.status}`);
  const json = await res.json();
  const body = json?.response?.body;
  const rawItems = body?.items?.item ?? [];
  const items: AnimalRow[] = Array.isArray(rawItems) ? rawItems : [rawItems];
  return { items, total: body?.totalCount ?? 0 };
}

export async function syncShelters(): Promise<void> {
  console.log("[ETL:shelters] 시작 (abandonmentPublic_v2에서 보호센터 추출)");

  // 전체 페이지 수집 + careRegNo 기준 dedup
  const { total } = await fetchPage(1, 1);
  const totalPages = Math.ceil(total / 1000);
  console.log(`[ETL:shelters] 구조동물 ${total}건 → 최대 ${totalPages}페이지`);

  const seen = new Map<string, AnimalRow>();

  for (let page = 1; page <= totalPages; page++) {
    const { items } = await fetchPage(page, 1000);
    for (const item of items) {
      if (item.careRegNo && !seen.has(item.careRegNo)) {
        seen.set(item.careRegNo, item);
      }
    }
    if (items.length < 1000) break;
  }

  console.log(`[ETL:shelters] 고유 보호센터 ${seen.size}개 처리 중...`);

  let total2 = 0;
  const now = new Date().toISOString();

  for (const [regNo, row] of seen) {
    const addr = (row.careAddr ?? "").trim();
    const parts = addr.split(/\s+/);

    let lat: number | null = null;
    let lng: number | null = null;

    if (addr) {
      const geo = await geocodeAddress(addr);
      if (geo) { lat = geo.lat; lng = geo.lng; }
    }

    const id = `apms-shelter-${regNo}`;

    await db
      .insert(shelters)
      .values({
        id,
        name: row.careNm,
        sido: parts[0] ?? null,
        sigungu: parts[1] ?? null,
        address: addr || null,
        lat,
        lng,
        phone: row.careTel || null,
        capacity: null,
        source: "apms_15025454",
        lastSyncedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: shelters.id,
        set: {
          name: row.careNm,
          address: addr || null,
          lat,
          lng,
          phone: row.careTel || null,
          lastSyncedAt: now,
          updatedAt: now,
        },
      });

    total2++;
  }

  console.log(`[ETL:shelters] 완료 — ${total2}건 처리`);

  if (total2 > 0) {
    await pingIndexNow([`${SITE_URL}/sido/seoul`, SITE_URL]).catch(() => {});

    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      await fetch(`${SITE_URL}/api/cache/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${cronSecret}` },
        body: JSON.stringify({ tags: ["stats"] }),
      }).catch((e) => console.error("[ETL:shelters] 캐시 무효화 실패:", e));
    }
  }
}

syncShelters().catch((err) => {
  console.error("[ETL:shelters] 오류:", err);
  process.exit(1);
});
