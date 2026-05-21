/**
 * 검역본부 반려동물 등록대행업체 동기화 ETL (Cron 4 — 매월 1일 06:00 KST)
 * API: https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2
 */

import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2";

interface RegistrationAgent {
  entrpsNm?: string;  // 업체명
  roadAddr?: string;  // 도로명 주소
  telNo?: string;     // 전화번호
  ctpvNm?: string;    // 시도명
  signguNm?: string;  // 시군구명
  [key: string]: string | undefined;
}

async function fetchAgents(): Promise<RegistrationAgent[]> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=1&numOfRows=10000&_type=json`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`등록대행 API 오류: ${res.status}`);
    const json = await res.json();
    const items = json?.response?.body?.items?.item ?? [];
    return Array.isArray(items) ? items : [items];
  } catch (e) {
    console.warn("[ETL:registration-agents] API 오류, 스킵:", e);
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
