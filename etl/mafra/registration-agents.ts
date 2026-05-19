/**
 * 검역본부 반려동물 등록대행업체 동기화 ETL (Cron 4 — 매월 1일 06:00 KST)
 * 출처: 농림축산검역본부
 */

import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";

const API_KEY = process.env.MAFRA_API_KEY ?? "";

interface RegistrationAgent {
  entrpsNm: string;   // 업체명
  roadAddr: string;   // 도로명 주소
  telNo: string;      // 전화번호
  ctpvNm: string;     // 시도명
  signguNm: string;   // 시군구명
}

async function fetchAgents(): Promise<RegistrationAgent[]> {
  // 검역본부 등록대행업체 API (실제 엔드포인트는 data.mafra.go.kr 참조)
  const url = `https://data.mafra.go.kr/opendata/data/selectApiDataDetail.do?apikey=${API_KEY}&service=registAgentList&type=json`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`MAFRA API 오류: ${res.status}`);
    const json = await res.json();
    return json?.items ?? [];
  } catch {
    console.warn("[ETL:registration-agents] API 미구성 상태, 스킵");
    return [];
  }
}

export async function syncRegistrationAgents(): Promise<void> {
  console.log("[ETL:registration-agents] 시작");
  const rows = await fetchAgents();

  let total = 0;
  for (const row of rows) {
    const id = `mafra-regagent-${encodeURIComponent(row.entrpsNm)}-${encodeURIComponent(row.roadAddr)}`.slice(0, 100);
    const geo = row.roadAddr ? await geocodeAddress(row.roadAddr) : null;
    const now = new Date().toISOString();

    await db
      .insert(businesses)
      .values({
        id,
        type: "sale",
        category: 1,
        name: row.entrpsNm,
        address: row.roadAddr,
        addressSido: row.ctpvNm,
        addressSigungu: row.signguNm,
        lat: geo?.lat ?? null,
        lng: geo?.lng ?? null,
        phone: row.telNo || null,
        status: "active",
        source: "mafra_registration_agent",
        rawData: null,
        lastSyncedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: businesses.id,
        set: {
          name: row.entrpsNm,
          phone: row.telNo || null,
          lastSyncedAt: now,
          updatedAt: now,
        },
      });

    total++;
  }

  console.log(`[ETL:registration-agents] 완료 — ${total}건 처리`);
}

syncRegistrationAgents().catch((err) => {
  console.error("[ETL:registration-agents] 오류:", err);
  process.exit(1);
});
