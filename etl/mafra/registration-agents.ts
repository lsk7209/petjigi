/**
 * 검역본부 반려동물 등록대행업체 동기화 ETL (Cron 4 — 매월 1일 06:00 KST)
 * API: https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2
 * 실제 필드: orgNm, orgAddr, orgAddrDtl, tel  |  numOfRows 최대 1000
 *
 * 이 모듈은 import해도 외부 호출·DB 쓰기를 하지 않는다. 실행은 run-registration-agents.ts.
 */

import { and, eq, lt } from "drizzle-orm";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";
import {
  REGISTRATION_AGENT_SOURCE,
  toRegistrationAgentRecord,
  type RegistrationAgentRow,
} from "./registration-agent-record";

const API_URL = "https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2";
const PAGE_SIZE = 1000;

type Db = typeof import("../../db/client").db;

async function fetchPage(apiKey: string, pageNo: number): Promise<{ items: RegistrationAgentRow[]; total: number }> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(apiKey)}&pageNo=${pageNo}&numOfRows=${PAGE_SIZE}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`등록대행 API HTTP 오류: ${res.status}`);
  const json = await res.json();
  const header = json?.response?.header;
  if (header?.resultCode !== "00") throw new Error(`등록대행 API 오류: ${header?.resultMsg}`);
  const body = json?.response?.body;
  const rawItems = body?.items?.item ?? [];
  const items: RegistrationAgentRow[] = Array.isArray(rawItems) ? rawItems : [rawItems];
  return { items, total: Number(body?.totalCount ?? 0) };
}

export async function syncRegistrationAgents(db: Db, apiKey: string): Promise<void> {
  console.log("[ETL:registration-agents] 시작");

  const { total } = await fetchPage(apiKey, 1);
  const totalPages = Math.ceil(total / PAGE_SIZE);
  console.log(`[ETL:registration-agents] 총 ${total}건 (${totalPages}페이지)`);

  const runStartedAt = new Date().toISOString();
  const seenIds = new Set<string>();

  for (let page = 1; page <= totalPages; page++) {
    const { items } = await fetchPage(apiKey, page);

    for (const row of items) {
      const record = toRegistrationAgentRecord(row);
      if (!record) continue;

      const geo = record.address ? await geocodeAddress(record.address) : null;
      const now = new Date().toISOString();
      const fields = {
        type: record.type,
        category: record.category,
        name: record.name,
        address: record.address,
        addressSido: record.addressSido,
        addressSigungu: record.addressSigungu,
        lat: geo?.lat ?? null,
        lng: geo?.lng ?? null,
        phone: record.phone,
        status: "active",
        lastSyncedAt: now,
        updatedAt: now,
      };

      await db
        .insert(businesses)
        .values({ id: record.id, ...fields, source: record.source, rawData: null, createdAt: now })
        .onConflictDoUpdate({ target: businesses.id, set: fields });

      seenIds.add(record.id);
    }
    console.log(`[ETL:registration-agents] ${page}/${totalPages} 페이지 완료 (${seenIds.size}건)`);
  }

  await closeUnseenAgents(db, runStartedAt, seenIds.size, total);
  console.log(`[ETL:registration-agents] 완료 — ${seenIds.size}건 처리`);
}

/**
 * 전 페이지를 끝까지 정상 수신했을 때만, 이번 실행에서 갱신되지 않은 이 출처의 행을 closed로 바꾼다
 * (주소·이름 변경으로 ID가 바뀐 이전 행). 삭제는 하지 않는다.
 * 수신 건수가 0이거나 API 총계보다 많으면(비정상 응답) 아무것도 닫지 않는다.
 */
async function closeUnseenAgents(db: Db, runStartedAt: string, seenCount: number, apiTotal: number): Promise<void> {
  if (seenCount === 0 || seenCount > apiTotal) return;
  await db
    .update(businesses)
    .set({ status: "closed", updatedAt: new Date().toISOString() })
    .where(and(
      eq(businesses.source, REGISTRATION_AGENT_SOURCE),
      eq(businesses.status, "active"),
      lt(businesses.lastSyncedAt, runStartedAt),
    ));
}
