/**
 * APMS 구조동물 동기화 ETL (Cron 3 — 매일 05:00 KST)
 * 데이터셋: 15098931 — 페이지 noindex (휘발 정보)
 * API: https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2
 */

import { db } from "../../db/client";
import { rescuedAnimals } from "../../db/schema";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL =
  "https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2";

interface RescuedAnimalRow {
  desertionNo: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  chargeNm: string;
  orgNm: string;
  noticeComment: string;
}

async function fetchRescuedPage(
  pageNo: number,
  numOfRows = 1000,
): Promise<RescuedAnimalRow[]> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`APMS 구조동물 API 오류: ${res.status}`);
  const json = await res.json();
  const items = json?.response?.body?.items?.item;
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

export async function syncRescuedAnimals(): Promise<void> {
  console.log("[ETL:rescued-animals] 시작 (noindex 데이터)");

  const rows = await fetchRescuedPage(1, 1000);
  console.log(`[ETL:rescued-animals] API 응답: ${rows.length}건`);

  if (rows.length === 0) {
    console.log("[ETL:rescued-animals] 데이터 없음 — 종료");
    return;
  }

  const now = new Date().toISOString();
  let upserted = 0;

  for (const row of rows) {
    await db
      .insert(rescuedAnimals)
      .values({
        id: row.desertionNo,
        happenDate: row.happenDt || null,
        happenPlace: row.happenPlace || null,
        kindCd: row.kindCd || null,
        colorCd: row.colorCd || null,
        age: row.age || null,
        weight: row.weight || null,
        noticeNo: row.noticeNo || null,
        noticeSdt: row.noticeSdt || null,
        noticeEdt: row.noticeEdt || null,
        imageUrl: row.popfile || null,
        processState: row.processState || null,
        sexCd: row.sexCd || null,
        neuterYn: row.neuterYn || null,
        careNm: row.careNm || null,
        careTel: row.careTel || null,
        careAddr: row.careAddr || null,
        chargeNm: row.chargeNm || null,
        orgNm: row.orgNm || null,
        noticeComment: row.noticeComment || null,
        lastSyncedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: rescuedAnimals.id,
        set: {
          happenDate: row.happenDt || null,
          happenPlace: row.happenPlace || null,
          kindCd: row.kindCd || null,
          colorCd: row.colorCd || null,
          age: row.age || null,
          weight: row.weight || null,
          noticeNo: row.noticeNo || null,
          noticeSdt: row.noticeSdt || null,
          noticeEdt: row.noticeEdt || null,
          imageUrl: row.popfile || null,
          processState: row.processState || null,
          sexCd: row.sexCd || null,
          neuterYn: row.neuterYn || null,
          careNm: row.careNm || null,
          careTel: row.careTel || null,
          careAddr: row.careAddr || null,
          chargeNm: row.chargeNm || null,
          orgNm: row.orgNm || null,
          noticeComment: row.noticeComment || null,
          lastSyncedAt: now,
          updatedAt: now,
        },
      });

    upserted++;
  }

  console.log(`[ETL:rescued-animals] 완료 — ${upserted}건 upsert`);
}

syncRescuedAnimals().catch((err) => {
  console.error("[ETL:rescued-animals] 오류:", err);
  process.exit(1);
});
