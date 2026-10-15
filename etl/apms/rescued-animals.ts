/**
 * APMS 구조동물 동기화 ETL (Cron 3 — 매일 05:00 KST)
 * 데이터셋: 15098931 — 페이지 noindex (휘발 정보)
 * API: https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2
 */

import { db } from "../../db/client";
import { etlSyncState, rescuedAnimals } from "../../db/schema";
import { eq } from "drizzle-orm";
import { collectApmsPages } from "../../lib/etl/apms-collection";
import { parseApmsResponse } from "../../lib/etl/apms-response";
import { classifyEtlRun, type PageOutcome } from "../../lib/etl/run-outcome";

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

async function fetchPage(pageNo: number, numOfRows = 1000) {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  return parseApmsResponse<RescuedAnimalRow>({ httpOk: res.ok, httpStatus: res.status, json });
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

  // 수집을 전부 검증한 후에만 DB 반영을 시작한다. 실패는 호출부까지 전파해 exit 1.
  const collected = await collectApmsPages(fetchPage, row => row.desertionNo);
  const total = collected.length;
  const totalPages = Math.max(1, Math.ceil(total / 1000));
  console.log(`[ETL:rescued-animals] 총 ${total}건 (${totalPages}페이지)`);

  const pageOutcomes: PageOutcome[] = [];
  let upserted = 0;
  const BATCH_SIZE = 200;

  for (let page = 1; page <= totalPages; page++) {
    const items = collected.slice((page - 1) * 1000, page * 1000);
    pageOutcomes.push({ kind: "ok", itemCount: items.length });

    if (items.length === 0) {
      // 예상보다 적은 페이지에서 끝났다 — 이후 classifyEtlRun이 partial로 판정한다.
      break;
    }

    const now = new Date().toISOString();
    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const chunk = items.slice(i, i + BATCH_SIZE);
      const statements = chunk.map((row) =>
        db
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
          }),
      );

      await db.batch(
        statements as [(typeof statements)[number], ...typeof statements],
      );
      upserted += chunk.length;
    }

    if (page % 3 === 0 || page === totalPages) {
      console.log(`[ETL:rescued-animals] ${page}/${totalPages} 페이지 완료 (${upserted}건)`);
    }
  }

  const classification = classifyEtlRun(pageOutcomes, { expectedPages: totalPages, expectedItems: total });
  console.log(
    `[ETL:rescued-animals] 실행 결과: ${classification.outcome} (처리 ${classification.pagesProcessed}/${totalPages}페이지, upsert ${upserted}건)`
  );

  if (classification.outcome !== "complete") {
    console.warn(
      `[ETL:rescued-animals] 완전 성공이 아님(${classification.outcome}) — lastSuccessfulAt을 갱신하지 않음`
    );
    throw new Error("APMS incomplete run");
  }

  // 성공 시각은 수집·검증이 모두 끝난 이 시점에 기록한다 (수집 도중 계산하지 않음).
  await recordSuccessfulRun(new Date().toISOString());
  console.log(`[ETL:rescued-animals] 완료 — ${upserted}건 upsert`);

  // Next.js 캐시 무효화 (rescue + stats 태그) — 응답 실패도 검사해 성공처럼 삼키지 않는다.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    try {
      const res = await fetch(`${SITE_URL}/api/cache/revalidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cronSecret}`,
        },
        body: JSON.stringify({ tags: ["rescue", "stats"] }),
      });
      if (!res.ok) {
        console.error(`[ETL:rescued-animals] 캐시 무효화 실패 — HTTP ${res.status}`);
      }
    } catch (e) {
      console.error("[ETL:rescued-animals] 캐시 무효화 실패:", e);
    }
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
