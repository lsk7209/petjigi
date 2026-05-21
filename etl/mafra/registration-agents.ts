/**
 * 검역본부 반려동물 등록대행업체 동기화 ETL (Cron 4 — 매월 1일 06:00 KST)
 * API: https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2
 * 실제 필드: orgNm, orgAddr, orgAddrDtl, tel  |  numOfRows 최대 1000
 */

import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "https://apis.data.go.kr/1543061/recordAgencySrvc_v2/recordAgency_v2";

interface RegistrationAgent {
  orgNm?: string;
  orgAddr?: string;
  orgAddrDtl?: string;
  tel?: string;
  [key: string]: string | undefined;
}

async function fetchPage(pageNo: number): Promise<{ items: RegistrationAgent[]; total: number }> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=1000&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`등록대행 API HTTP 오류: ${res.status}`);
  const json = await res.json();
  const header = json?.response?.header;
  if (header?.resultCode !== "00") throw new Error(`등록대행 API 오류: ${header?.resultMsg}`);
  const body = json?.response?.body;
  const rawItems = body?.items?.item ?? [];
  const items: RegistrationAgent[] = Array.isArray(rawItems) ? rawItems : [rawItems];
  return { items, total: body?.totalCount ?? 0 };
}

export async function syncRegistrationAgents(): Promise<void> {
  console.log("[ETL:registration-agents] 시작");

  const { total } = await fetchPage(1);
  const totalPages = Math.ceil(total / 1000);
  console.log(`[ETL:registration-agents] 총 ${total}건 (${totalPages}페이지)`);

  let processed = 0;

  for (let page = 1; page <= totalPages; page++) {
    const { items } = await fetchPage(page);

    for (const row of items) {
      if (!row.orgNm) continue;

      const fullAddr = [row.orgAddr, row.orgAddrDtl].filter(Boolean).join(" ").trim();
      const parts = (row.orgAddr ?? "").trim().split(/\s+/);
      const id = `mafra-regagent-${encodeURIComponent(row.orgNm)}-${encodeURIComponent(row.orgAddr ?? "")}`.slice(0, 100);
      const geo = fullAddr ? await geocodeAddress(fullAddr) : null;
      const now = new Date().toISOString();

      await db
        .insert(businesses)
        .values({
          id,
          type: "sale",
          category: 1,
          name: row.orgNm,
          address: fullAddr || null,
          addressSido: parts[0] ?? null,
          addressSigungu: parts[1] ?? null,
          lat: geo?.lat ?? null,
          lng: geo?.lng ?? null,
          phone: row.tel || null,
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
            name: row.orgNm,
            address: fullAddr || null,
            phone: row.tel || null,
            lastSyncedAt: now,
            updatedAt: now,
          },
        });

      processed++;
    }
    console.log(`[ETL:registration-agents] ${page}/${totalPages} 페이지 완료 (${processed}건)`);
  }

  console.log(`[ETL:registration-agents] 완료 — ${processed}건 처리`);
}

syncRegistrationAgents().catch((err) => {
  console.error("[ETL:registration-agents] 오류:", err);
  process.exit(1);
});
