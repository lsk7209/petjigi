/**
 * 검역본부 반려동물 등록대행업체 동기화 ETL (Cron 4 — 매월 1일 06:00 KST)
 * API: https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2
 * 실제 필드: orgNm, orgAddr, orgAddrDtl, tel  |  numOfRows 최대 1000
 *
 * 이 모듈은 import해도 외부 호출·DB 쓰기를 하지 않는다. 실행은 run-registration-agents.ts.
 *
 * 원본에는 영업 상태가 없다. 따라서 "이번 원본에서 확인되지 않음"은 폐업이 아니며,
 * 완전 수집이 입증된 경우에만 해당 행을 paused(원본 미확인)로 내려 목록에서 제외한다.
 * 원본에 다시 나타나면 upsert가 active로 되돌린다.
 */

import { and, eq, lt } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";
import {
  assessCollection,
  DEFAULT_PAGE_SIZE,
  fingerprintPage,
  parseRegistrationAgentPage,
  type PageSnapshot,
  type ParsedPage,
  type RowStats,
} from "./registration-agent-collection";
import { acquireLease, holdsLease, releaseWithSuccess } from "./registration-agent-lease";
import {
  REGISTRATION_AGENT_SOURCE,
  toRegistrationAgentRecord,
  type RegistrationAgentRow,
} from "./registration-agent-record";

const API_URL = "https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2";
const FETCH_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 2000;
/** 원본에서 확인되지 않은 행의 상태. 폐업('closed')을 단정하지 않는다. */
export const SOURCE_UNSEEN_STATUS = "paused";

type Db = LibSQLDatabase<Record<string, unknown>>;

export interface SyncDeps {
  sleep?: (ms: number) => Promise<void>;
  pageSize?: number;
}

export interface SyncResult {
  complete: boolean;
  reasons: string[];
  stats: RowStats;
  unseenMarked: number;
  unseenBlockedReason?: string;
  skippedLocked: boolean;
}

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function fetchPageOnce(apiKey: string, pageNo: number, pageSize: number): Promise<ParsedPage> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(apiKey)}&pageNo=${pageNo}&numOfRows=${pageSize}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`등록대행 API HTTP 오류: ${res.status}`);
  return parseRegistrationAgentPage(await res.json());
}

async function fetchPage(apiKey: string, pageNo: number, pageSize: number, sleep: (ms: number) => Promise<void>): Promise<ParsedPage> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt++) {
    try {
      return await fetchPageOnce(apiKey, pageNo, pageSize);
    } catch (error) {
      lastError = error;
      if (attempt < FETCH_ATTEMPTS) await sleep(RETRY_BASE_DELAY_MS * attempt);
    }
  }
  throw lastError;
}

async function upsertAgent(db: Db, row: RegistrationAgentRow): Promise<string | null> {
  const record = toRegistrationAgentRecord(row);
  if (!record) return null;
  const geo = record.address ? await geocodeAddress(record.address) : null;
  const now = new Date().toISOString();
  const fields = {
    type: record.type,
    category: record.category,
    name: record.name,
    address: record.address,
    addressSido: record.addressSido,
    addressSigungu: record.addressSigungu,
    // 지오코딩 실패 시 기존 좌표를 지우지 않는다
    ...(geo ? { lat: geo.lat, lng: geo.lng } : {}),
    phone: record.phone,
    status: "active",
    lastSyncedAt: now,
    updatedAt: now,
  };
  await db
    .insert(businesses)
    .values({ id: record.id, ...fields, source: record.source, rawData: null, createdAt: now })
    .onConflictDoUpdate({ target: businesses.id, set: fields });
  return record.id;
}

export async function syncRegistrationAgents(db: Db, apiKey: string, deps: SyncDeps = {}): Promise<SyncResult> {
  const sleep = deps.sleep ?? defaultSleep;
  const pageSize = deps.pageSize ?? DEFAULT_PAGE_SIZE;
  const emptyStats: RowStats = { rawRows: 0, convertedRows: 0, skippedRows: 0, uniqueIds: 0 };

  const token = await acquireLease(db, new Date());
  if (!token) {
    console.warn("[ETL:registration-agents] 다른 실행이 진행 중이거나 직전 실행이 미완료 — 건너뜀");
    return { complete: false, reasons: ["다른 실행 진행 중"], stats: emptyStats, unseenMarked: 0, skippedLocked: true };
  }
  const runStartedAt = token;
  console.log("[ETL:registration-agents] 시작");

  const first = await fetchPage(apiKey, 1, pageSize, sleep);
  const total = first.total;
  const totalPages = Math.ceil(total / pageSize);
  console.log(`[ETL:registration-agents] 총 ${total}건 (${totalPages}페이지)`);

  const snapshots: PageSnapshot[] = [];
  const stats: RowStats = { ...emptyStats };
  const seenIds = new Set<string>();

  for (let page = 1; page <= totalPages; page++) {
    const { items, total: reportedTotal } = page === 1 ? first : await fetchPage(apiKey, page, pageSize, sleep);
    snapshots.push({ pageNo: page, reportedTotal, rawCount: items.length, fingerprint: fingerprintPage(items) });
    for (const row of items) {
      stats.rawRows++;
      const id = row && typeof row === "object" ? await upsertAgent(db, row as RegistrationAgentRow) : null;
      if (id) {
        stats.convertedRows++;
        seenIds.add(id);
      } else {
        stats.skippedRows++;
      }
    }
    console.log(`[ETL:registration-agents] ${page}/${totalPages} 페이지 완료 (고유 ${seenIds.size}건)`);
  }
  stats.uniqueIds = seenIds.size;

  const assessment = assessCollection(total, pageSize, snapshots, stats);
  const result: SyncResult = { complete: assessment.complete, reasons: assessment.reasons, stats, unseenMarked: 0, skippedLocked: false };

  if (!assessment.complete) {
    console.error(`[ETL:registration-agents] 불완전 수집 — 기존 기관 상태 변경 안 함: ${assessment.reasons.join("; ")}`);
    return result;
  }
  if (!assessment.mayMarkUnseen) {
    result.unseenBlockedReason = assessment.unseenBlockedReason;
  } else if (await holdsLease(db, token)) {
    result.unseenMarked = await markUnseenAgents(db, runStartedAt);
  } else {
    result.unseenBlockedReason = "실행 락을 다른 실행이 인수함";
  }
  if (result.unseenBlockedReason) console.warn(`[ETL:registration-agents] 누락 기관 상태 변경 보류: ${result.unseenBlockedReason}`);

  await releaseWithSuccess(db, token, new Date());
  console.log(`[ETL:registration-agents] 완료 — 고유 ${seenIds.size}건, 원본 미확인 처리 ${result.unseenMarked}건`);
  return result;
}

/**
 * 완전 수집이 입증된 뒤에만 호출한다. 이번 실행 시작 이후 갱신되지 않은 이 출처의 active 행을 paused로 낮춘다
 * (삭제·폐업 확정 아님). 다른 실행이 이번 실행 시작 이후 갱신한 행은 lastSyncedAt이 더 늦어 제외된다.
 */
async function markUnseenAgents(db: Db, runStartedAt: string): Promise<number> {
  const updated = await db
    .update(businesses)
    .set({ status: SOURCE_UNSEEN_STATUS, updatedAt: new Date().toISOString() })
    .where(and(
      eq(businesses.source, REGISTRATION_AGENT_SOURCE),
      eq(businesses.status, "active"),
      lt(businesses.lastSyncedAt, runStartedAt),
    ));
  return updated.rowsAffected;
}
