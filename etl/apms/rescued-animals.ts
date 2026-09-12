/**
 * APMS 구조동물 동기화 ETL (Cron 3 — 매일 05:00 KST)
 * 데이터셋: 15098931 — 페이지 noindex (휘발 정보)
 * API: https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2
 */

import { db } from "../../db/client";
import { etlSyncState, rescuedAnimals } from "../../db/schema";
import { runPagedImport } from "../../lib/etl/paged-import";
import { eq } from "drizzle-orm";

const API_KEY = process.env.APMS_API_KEY ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
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

async function fetchPage(
  pageNo: number,
  numOfRows = 1000,
): Promise<{ items: RescuedAnimalRow[]; total: number }> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`APMS 구조동물 API 오류: ${res.status}`);
  const json = await res.json();
  const body = json?.response?.body;
  const rawItems = body?.items?.item;
  const items: RescuedAnimalRow[] = !rawItems
    ? []
    : Array.isArray(rawItems)
    ? rawItems
    : [rawItems];
  return { items, total: body?.totalCount ?? 0 };
}

export async function syncRescuedAnimals(): Promise<void> {
  console.log("[ETL:rescued-animals] 시작 (noindex 데이터)");

  const attemptAt = new Date().toISOString();
  await db
    .insert(etlSyncState)
    .values({
      jobName: "rescued-animals",
      lastAttemptAt: attemptAt,
      updatedAt: attemptAt,
    })
    .onConflictDoUpdate({
      target: etlSyncState.jobName,
      set: { lastAttemptAt: attemptAt, updatedAt: attemptAt },
    });

  const { total } = await fetchPage(1, 1);
  const totalPages = Math.ceil(total / 1000);
  console.log(`[ETL:rescued-animals] 총 ${total}건 (${totalPages}페이지)`);

  if (total === 0) {
    await recordSuccessfulRun(attemptAt);
    console.log("[ETL:rescued-animals] 데이터 없음 — 정상 완료");
    return;
  }

  const now = new Date().toISOString();
  const upserted = await runPagedImport({
    totalPages,
    fetchPage: async (page) => (await fetchPage(page, 1000)).items,
    writeItem: async (row) => {
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

    },
    onPageComplete: (page, written) => {
      if (page % 3 === 0 || page === totalPages) {
        console.log(`[ETL:rescued-animals] ${page}/${totalPages} 페이지 완료 (${written}건)`);
      }
    },
  });

  await recordSuccessfulRun(now);

  console.log(`[ETL:rescued-animals] 완료 — ${upserted}건 upsert`);

  // Next.js 캐시 무효화 (rescue + stats 태그)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    await fetch(`${SITE_URL}/api/cache/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cronSecret}`,
      },
      body: JSON.stringify({ tags: ["rescue", "stats"] }),
    }).catch((e) => console.error("[ETL:rescued-animals] 캐시 무효화 실패:", e));
  }
}

async function recordSuccessfulRun(successfulAt: string): Promise<void> {
  await db
    .update(etlSyncState)
    .set({ lastSuccessfulAt: successfulAt, updatedAt: successfulAt })
    .where(eq(etlSyncState.jobName, "rescued-animals"));
}

syncRescuedAnimals().catch((err) => {
  console.error("[ETL:rescued-animals] 오류:", err);
  process.exit(1);
});
