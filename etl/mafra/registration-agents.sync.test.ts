/**
 * 등록대행기관 동기화 — 불완전 수집 시 기존 기관 일괄 상태 변경 차단 회귀 테스트.
 * 실제 ETL 모듈을 import하며, 외부 의존성만 대체한다:
 *  - 공공 API: globalThis.fetch 대체 (네트워크 호출 없음)
 *  - 지오코딩: KAKAO_REST_API_KEY 미설정 → fetch 없이 null
 *  - DB: 운영과 무관한 인메모리 libSQL + 실제 마이그레이션
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test, { after, before, beforeEach, afterEach } from "node:test";
import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
import { businesses, etlSyncState } from "../../db/schema";
import { syncRegistrationAgents } from "./registration-agents";
import {
  REGISTRATION_AGENT_SOURCE,
  toRegistrationAgentRecord,
} from "./registration-agent-record";

const OLD_SYNC = "2026-01-01T00:00:00.000Z";
const realFetch = globalThis.fetch;
let keeper: Client;
let mainClient: Client;
let db: ReturnType<typeof makeDb>["db"];
let fetchCalls: number[] = [];

function makeDb() {
  const url = "file::memory:?cache=shared";
  keeper = createClient({ url });
  const client = createClient({ url });
  mainClient = client;
  return { client, db: drizzle(client, { schema }) };
}

async function migrate(client: Client) {
  const dir = resolve(process.cwd(), "db/migrations");
  for (const name of readdirSync(dir)
    .filter((n) => /^\d+.*\.sql$/.test(n))
    .sort()) {
    for (const sql of readFileSync(resolve(dir, name), "utf8").split(
      "--> statement-breakpoint",
    )) {
      if (sql.trim()) await client.execute(sql);
    }
  }
}

before(async () => {
  const made = makeDb();
  await migrate(made.client);
  db = made.db;
});

beforeEach(async () => {
  await db.delete(businesses);
  await db.delete(etlSyncState);
  fetchCalls = [];
  delete process.env.KAKAO_REST_API_KEY;
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

after(() => {
  mainClient.close();
  keeper.close();
});

const agentRow = (n: number) => ({
  orgNm: `새기관${n}`,
  orgAddr: `서울 강남구 테헤란로 ${n}`,
  tel: "02-0000-0000",
});

async function seedActive(count: number, lastSyncedAt = OLD_SYNC) {
  for (let i = 0; i < count; i++) {
    const record = toRegistrationAgentRecord({
      orgNm: `기존기관${i}`,
      orgAddr: `서울 서초구 반포대로 ${i}`,
    })!;
    const { id, ...fields } = record;
    await db.insert(businesses).values({
      id,
      ...fields,
      status: "active",
      rawData: null,
      lastSyncedAt,
      createdAt: OLD_SYNC,
      updatedAt: OLD_SYNC,
    });
  }
}

async function statusCounts() {
  const rows = await db
    .select({ status: businesses.status })
    .from(businesses)
    .where(eq(businesses.source, REGISTRATION_AGENT_SOURCE));
  const counts: Record<string, number> = {};
  for (const r of rows) counts[r.status] = (counts[r.status] ?? 0) + 1;
  return counts;
}

type PageSpec =
  { totalCount: number | string; items: unknown[] | "" } | Error | "malformed";

function okJson(spec: Exclude<PageSpec, Error | "malformed">) {
  const items = spec.items === "" ? "" : { item: spec.items };
  return {
    response: {
      header: { resultCode: "00", resultMsg: "OK" },
      body: { totalCount: spec.totalCount, items },
    },
  };
}

function stubApi(handler: (pageNo: number, attempt: number) => PageSpec | Promise<PageSpec>) {
  const attempts = new Map<number, number>();
  globalThis.fetch = (async (input: string | URL | Request) => {
    const pageNo = Number(new URL(String(input)).searchParams.get("pageNo"));
    const attempt = (attempts.get(pageNo) ?? 0) + 1;
    attempts.set(pageNo, attempt);
    fetchCalls.push(pageNo);
    const spec = await handler(pageNo, attempt);
    if (spec instanceof Error) throw spec;
    if (spec === "malformed")
      return {
        ok: true,
        status: 200,
        json: async () => ({ unexpected: true }),
      };
    return { ok: true, status: 200, json: async () => okJson(spec) };
  }) as typeof fetch;
}

const deps = (pageSize?: number) => ({ sleep: async () => {}, pageSize });
const rows = (from: number, count: number) =>
  Array.from({ length: count }, (_, i) => agentRow(from + i));

test("1. 정상 전체 수집: 새 기관은 active, 원본에 없는 기존 기관은 폐업 확정 없이 paused", async () => {
  await seedActive(3);
  stubApi((p) => ({
    totalCount: 5,
    items: p === 3 ? rows(4, 1) : rows((p - 1) * 2, 2),
  }));
  const result = await syncRegistrationAgents(db, "KEY", deps(2));
  assert.equal(result.complete, true);
  assert.equal(result.unseenMarked, 3);
  assert.deepEqual(await statusCounts(), { active: 5, paused: 3 });
  const state = await db
    .select()
    .from(etlSyncState)
    .where(eq(etlSyncState.jobName, "registration-agents"));
  assert.ok(
    state[0].lastSuccessfulAt &&
      state[0].lastSuccessfulAt >= state[0].lastAttemptAt,
  );
});

test("2. 원본 총계 1,000 / 실제 1행: 기존 활성 기관을 건드리지 않는다", async () => {
  await seedActive(5);
  stubApi(() => ({ totalCount: 1000, items: rows(0, 1) }));
  const result = await syncRegistrationAgents(db, "KEY", deps());
  assert.deepEqual(await statusCounts(), { active: 6 });
  assert.equal(result?.complete, false);
  assert.equal(result?.unseenMarked, 0);
});

test("3. 원본 총계 1,000 / 실제 999행(차이 원인 미확인): 기존 활성 기관을 건드리지 않는다", async () => {
  await seedActive(5);
  stubApi(() => ({ totalCount: 1000, items: rows(0, 999) }));
  const result = await syncRegistrationAgents(db, "KEY", deps());
  assert.deepEqual(await statusCounts(), { active: 1004 });
  assert.equal(result?.complete, false);
});

test("4. 중간 페이지가 성공 응답이지만 빈 배열이면 불완전", async () => {
  await seedActive(4);
  stubApi((p) => ({
    totalCount: 6,
    items: p === 2 ? "" : rows((p - 1) * 2, 2),
  }));
  const result = await syncRegistrationAgents(db, "KEY", deps(2));
  assert.equal(result.complete, false);
  assert.match(result.reasons.join(" "), /페이지 2/);
  assert.deepEqual(await statusCounts(), { active: 8 });
});

test("5. 같은 페이지가 반복 수신되면 불완전", async () => {
  await seedActive(4);
  stubApi((p) => ({
    totalCount: 6,
    items: p === 1 ? rows(0, 2) : p === 2 ? rows(0, 2) : rows(4, 2),
  }));
  const result = await syncRegistrationAgents(db, "KEY", deps(2));
  assert.equal(result.complete, false);
  assert.match(result.reasons.join(" "), /반복/);
  assert.deepEqual(await statusCounts(), { active: 8 });
});

test("6. 변환 실패 행이 있으면 어떤 기관이 빠졌는지 입증할 수 없으므로 상태 변경 보류(수집 자체는 완료)", async () => {
  await seedActive(3);
  stubApi(() => ({
    totalCount: 3,
    items: [agentRow(0), { orgNm: "  ", orgAddr: "서울" }, agentRow(2)],
  }));
  const result = await syncRegistrationAgents(db, "KEY", deps());
  assert.equal(result.complete, true);
  assert.equal(result.stats.skippedRows, 1);
  assert.equal(result.unseenMarked, 0);
  assert.match(result.unseenBlockedReason ?? "", /변환/);
  assert.deepEqual(await statusCounts(), { active: 5 });
});

test("6b. 원본 내 중복 행은 고유 ID로만 집계하고 완전 수집 판정을 막지 않는다", async () => {
  await seedActive(2);
  stubApi(() => ({
    totalCount: 3,
    items: [agentRow(0), agentRow(0), agentRow(1)],
  }));
  const result = await syncRegistrationAgents(db, "KEY", deps());
  assert.equal(result.complete, true);
  assert.equal(result.stats.uniqueIds, 2);
  assert.deepEqual(await statusCounts(), { active: 2, paused: 2 });
});

test("7. 수집 중 원본 총계가 변동하면 불완전", async () => {
  await seedActive(4);
  stubApi((p) => ({
    totalCount: p === 1 ? 4 : 5,
    items: rows((p - 1) * 2, 2),
  }));
  const result = await syncRegistrationAgents(db, "KEY", deps(2));
  assert.equal(result.complete, false);
  assert.match(result.reasons.join(" "), /변동/);
  assert.deepEqual(await statusCounts(), { active: 8 });
});

test("8a. 정상 0건 응답(총계 0, items 빈 문자열)도 기존 기관을 자동으로 정리하지 않는다", async () => {
  await seedActive(4);
  stubApi(() => ({ totalCount: 0, items: "" }));
  const result = await syncRegistrationAgents(db, "KEY", deps());
  assert.equal(result.unseenMarked, 0);
  assert.deepEqual(await statusCounts(), { active: 4 });
});

test("8b. 비정상 응답(오류 코드·구조 이상·총계 누락)은 실행 실패이며 기존 기관을 건드리지 않는다", async () => {
  await seedActive(4);
  const bad: PageSpec[] = [
    "malformed",
    { totalCount: "", items: "" },
    { totalCount: "abc", items: "" },
    { totalCount: -1, items: "" },
  ];
  for (const spec of bad) {
    stubApi(() => spec);
    await assert.rejects(() => syncRegistrationAgents(db, "KEY", deps()));
    await db.delete(etlSyncState);
  }
  assert.deepEqual(await statusCounts(), { active: 4 });
});

test("9a. 중간 네트워크 실패가 재시도 한도 이후에도 계속되면 실행 실패, 기존 기관은 그대로", async () => {
  await seedActive(4);
  stubApi((p) =>
    p === 2
      ? new Error("ECONNRESET")
      : { totalCount: 4, items: rows((p - 1) * 2, 2) },
  );
  await assert.rejects(
    () => syncRegistrationAgents(db, "KEY", deps(2)),
    /ECONNRESET/,
  );
  assert.equal(fetchCalls.filter((p) => p === 2).length, 3);
  assert.deepEqual(await statusCounts(), { active: 6 });
});

test("9b. 일시적 실패는 재시도로 복구되어 정상 완료된다", async () => {
  await seedActive(1);
  stubApi((p, attempt) =>
    p === 2 && attempt === 1
      ? new Error("ETIMEDOUT")
      : { totalCount: 4, items: rows((p - 1) * 2, 2) },
  );
  const result = await syncRegistrationAgents(db, "KEY", deps(2));
  assert.equal(result.complete, true);
  assert.deepEqual(await statusCounts(), { active: 4, paused: 1 });
});

test("10a. 이미 다른 실행이 진행 중이면 API 호출·DB 변경 없이 건너뛴다", async () => {
  await seedActive(2);
  const now = new Date().toISOString();
  await db
    .insert(etlSyncState)
    .values({
      jobName: "registration-agents",
      lastAttemptAt: now,
      updatedAt: now,
    });
  stubApi(() => ({ totalCount: 1, items: rows(0, 1) }));
  const result = await syncRegistrationAgents(db, "KEY", deps());
  assert.equal(result.skippedLocked, true);
  assert.equal(fetchCalls.length, 0);
  assert.deepEqual(await statusCounts(), { active: 2 });
});

test("10b. 실행 중 락을 다른 실행에 빼앗기면(오래된 실행의 후처리) 상태 변경을 하지 않는다", async () => {
  await seedActive(3);
  stubApi(async (p) => {
    if (p === 2) {
      // 같은 시점에 다른 실행이 락을 인수했다고 가정
      await keeper.execute(
        "UPDATE etl_sync_state SET last_attempt_at = '2999-01-01T00:00:00.000Z' WHERE job_name = 'registration-agents'",
      );
    }
    return { totalCount: 4, items: rows((p - 1) * 2, 2) };
  });
  const result = await syncRegistrationAgents(db, "KEY", deps(2));
  assert.equal(result.unseenMarked, 0);
  assert.match(result.unseenBlockedReason ?? "", /락/);
  assert.deepEqual(await statusCounts(), { active: 7 });
});

test("10c. 이번 실행 시작 이후 다른 실행이 갱신한 행은 이번 실행이 건드리지 않는다", async () => {
  await seedActive(2);
  await seedActiveWithSyncTime("2999-01-01T00:00:00.000Z");
  stubApi(() => ({ totalCount: 1, items: rows(0, 1) }));
  const result = await syncRegistrationAgents(db, "KEY", deps());
  assert.equal(result.unseenMarked, 2);
  assert.deepEqual(await statusCounts(), { active: 2, paused: 2 });
});

async function seedActiveWithSyncTime(lastSyncedAt: string) {
  const record = toRegistrationAgentRecord({
    orgNm: "최근갱신기관",
    orgAddr: "서울 송파구 올림픽로 1",
  })!;
  const { id, ...fields } = record;
  await db
    .insert(businesses)
    .values({
      id,
      ...fields,
      status: "active",
      rawData: null,
      lastSyncedAt,
      createdAt: OLD_SYNC,
      updatedAt: OLD_SYNC,
    });
}

test("재등장한 기관은 paused에서 active로 복구된다(되돌릴 수 있는 상태 변경)", async () => {
  await seedActive(1);
  stubApi(() => ({ totalCount: 1, items: rows(0, 1) }));
  await syncRegistrationAgents(db, "KEY", deps());
  assert.deepEqual(await statusCounts(), { active: 1, paused: 1 });
  await db.delete(etlSyncState);
  stubApi(() => ({
    totalCount: 2,
    items: [
      agentRow(0),
      { orgNm: "기존기관0", orgAddr: "서울 서초구 반포대로 0" },
    ],
  }));
  await syncRegistrationAgents(db, "KEY", deps());
  assert.deepEqual(await statusCounts(), { active: 2 });
});
