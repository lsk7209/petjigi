/**
 * 등록대행 ETL 실행 락 — 기존 etl_sync_state 테이블 재사용 (신규 인프라·마이그레이션 없음).
 * 상태 의미: lastSuccessfulAt >= lastAttemptAt 이면 유휴, 아니면 실행 중(또는 실패 후 TTL 대기).
 * 토큰은 이번 실행이 기록한 lastAttemptAt 값이며, 후처리 직전 같은 토큰인지 다시 확인한다.
 */

import { and, eq, lt, or, sql } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { etlSyncState } from "../../db/schema";

export const REGISTRATION_AGENT_JOB = "registration-agents";
/** 워크플로 timeout(20분)보다 길게: 실패한 실행의 락은 이 시간이 지나야 재획득된다 */
export const LEASE_TTL_MS = 25 * 60 * 1000;

type Db = LibSQLDatabase<Record<string, unknown>>;

export async function acquireLease(db: Db, now: Date): Promise<string | null> {
  const token = now.toISOString();
  const staleBefore = new Date(now.getTime() - LEASE_TTL_MS).toISOString();
  const inserted = await db
    .insert(etlSyncState)
    .values({ jobName: REGISTRATION_AGENT_JOB, lastAttemptAt: token, updatedAt: token })
    .onConflictDoNothing();
  if (inserted.rowsAffected === 1) return token;

  const taken = await db
    .update(etlSyncState)
    .set({ lastAttemptAt: token, updatedAt: token })
    .where(and(
      eq(etlSyncState.jobName, REGISTRATION_AGENT_JOB),
      or(sql`${etlSyncState.lastSuccessfulAt} >= ${etlSyncState.lastAttemptAt}`, lt(etlSyncState.lastAttemptAt, staleBefore)),
    ));
  return taken.rowsAffected === 1 ? token : null;
}

export async function holdsLease(db: Db, token: string): Promise<boolean> {
  const rows = await db.select({ at: etlSyncState.lastAttemptAt }).from(etlSyncState).where(eq(etlSyncState.jobName, REGISTRATION_AGENT_JOB));
  return rows[0]?.at === token;
}

/** 완전 수집이 확인된 실행만 성공으로 기록하고 락을 푼다. 토큰이 바뀌었으면 아무것도 하지 않는다. */
export async function releaseWithSuccess(db: Db, token: string, now: Date): Promise<void> {
  const at = now.toISOString();
  await db
    .update(etlSyncState)
    .set({ lastSuccessfulAt: at, updatedAt: at })
    .where(and(eq(etlSyncState.jobName, REGISTRATION_AGENT_JOB), eq(etlSyncState.lastAttemptAt, token)));
}
