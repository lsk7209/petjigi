/**
 * APMS 전국동물보호센터 동기화 ETL (Cron 2 — 매주 일요일 04:00 KST)
 * 데이터셋: 15025454
 * API: https://apis.data.go.kr/1543061/abandonmentPublicService_v2/shelter_v2
 */

import { db } from "../../db/client";
import { shelters } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "https://apis.data.go.kr/1543061/abandonmentPublicService_v2/shelter_v2";

interface ShelterRow {
  careNm: string;
  orgNm: string;
  divisionNm: string;
  saveTrgtAnimal: string;
  careAddr: string;
  jibunAddr: string;
  lat: string;
  lng: string;
  careTel: string;
  dataStdDt: string;
}

async function fetchShelterPage(pageNo: number, numOfRows = 1000): Promise<ShelterRow[]> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`APMS API 오류: ${res.status}`);
  const json = await res.json();
  return json?.response?.body?.items?.item ?? [];
}

export async function syncShelters(): Promise<void> {
  console.log("[ETL:shelters] 시작");
  let pageNo = 1;
  let total = 0;

  while (true) {
    const rows = await fetchShelterPage(pageNo);
    if (rows.length === 0) break;

    for (const row of rows) {
      const id = `apms-shelter-${encodeURIComponent(row.careNm)}-${encodeURIComponent(row.careAddr)}`.slice(0, 100);
      const addr = row.careAddr || row.jibunAddr;
      const parts = addr.trim().split(/\s+/);

      let lat = row.lat ? parseFloat(row.lat) : null;
      let lng = row.lng ? parseFloat(row.lng) : null;

      if ((!lat || !lng) && addr) {
        const geo = await geocodeAddress(addr);
        if (geo) { lat = geo.lat; lng = geo.lng; }
      }

      const now = new Date().toISOString();
      await db
        .insert(shelters)
        .values({
          id,
          name: row.careNm,
          sido: parts[0] ?? null,
          sigungu: parts[1] ?? null,
          address: addr,
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
            address: addr,
            lat,
            lng,
            phone: row.careTel || null,
            lastSyncedAt: now,
            updatedAt: now,
          },
        });

      total++;
    }

    if (rows.length < 1000) break;
    pageNo++;
  }

  console.log(`[ETL:shelters] 완료 — ${total}건 처리`);
}

syncShelters().catch((err) => {
  console.error("[ETL:shelters] 오류:", err);
  process.exit(1);
});
