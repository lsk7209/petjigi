/**
 * 행정안전부 동물병원 동기화 ETL (Cron — 매일 03:30 KST)
 * 데이터셋: 15045050
 * API: https://apis.data.go.kr/1741000/animal_hospitals/info
 * 실제 필드: ALL_CAPS (BPLC_NM, ROAD_NM_ADDR, TELNO, SALS_STTS_CD, CRD_INFO_X/Y, MNG_NO)
 */

import { createHash } from "crypto";
import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "https://apis.data.go.kr/1741000/animal_hospitals/info";

interface HospitalRow {
  BPLC_NM?: string;          // 업소명
  ROAD_NM_ADDR?: string;     // 도로명주소
  LOTNO_ADDR?: string;       // 지번주소
  TELNO?: string;            // 전화번호
  LCPMT_YMD?: string;        // 허가일자
  SALS_STTS_CD?: string;     // 영업상태코드 (01=영업중, 02=폐업, 03=휴업)
  DTL_SALS_STTS_CD?: string; // 상세영업상태코드
  CRD_INFO_X?: string;       // 경도 (WGS84)
  CRD_INFO_Y?: string;       // 위도 (WGS84)
  MNG_NO?: string;           // 관리번호
  [key: string]: string | undefined;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^가-힣a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseAddress(addr: string): { sido: string; sigungu: string; dong: string } {
  const parts = addr.trim().split(/\s+/);
  return {
    sido: parts[0] ?? "",
    sigungu: parts[1] ?? "",
    dong: parts[2] ?? "",
  };
}

function hashRow(row: HospitalRow): string {
  const str = JSON.stringify({
    name: row.BPLC_NM,
    addr: row.ROAD_NM_ADDR ?? row.LOTNO_ADDR,
    tel: row.TELNO,
    state: row.DTL_SALS_STTS_CD ?? row.SALS_STTS_CD,
  });
  return createHash("sha256").update(str).digest("hex").slice(0, 16);
}

async function fetchPage(pageNo: number, numOfRows = 1000): Promise<{ items: HospitalRow[]; total: number }> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`동물병원 API 오류: ${res.status} ${await res.text()}`);

  const json = await res.json();
  const body = json?.response?.body ?? json?.body;
  const rawItems = body?.items?.item ?? body?.items ?? [];
  const items: HospitalRow[] = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
  const total: number = body?.totalCount ?? 0;

  return { items, total };
}

export async function syncAnimalHospitals(): Promise<void> {
  console.log("[ETL:animal-hospitals] 시작");

  if (!API_KEY) {
    console.error("[ETL:animal-hospitals] APMS_API_KEY 미설정");
    process.exit(1);
  }

  const first = await fetchPage(1, 1000);
  console.log(`[ETL:animal-hospitals] 총 ${first.total}건`);

  let processed = 0;

  const processPage = async (items: HospitalRow[]) => {
    const now = new Date().toISOString();

    for (const row of items) {
      const name = row.BPLC_NM ?? "";
      const addr = row.ROAD_NM_ADDR ?? row.LOTNO_ADDR ?? "";
      if (!name || !addr) continue;

      // SALS_STTS_CD: "01"=영업, "02"=휴업, "03"=폐업
      const stateCode = row.SALS_STTS_CD ?? "01";
      const status = stateCode === "02" || stateCode === "03" ? "closed" : "active";

      const { sido, sigungu, dong } = parseAddress(addr);
      const id = `mois-vet-${row.MNG_NO ?? hashRow(row)}`;

      // CRD_INFO_X/Y는 TM좌표 — WGS84 아니므로 사용 불가, 지오코딩으로 대체
      let lat: number | null = null;
      let lng: number | null = null;

      if (status === "active" && addr) {
        const geo = await geocodeAddress(addr);
        if (geo) { lat = geo.lat; lng = geo.lng; }
      }

      const slug = `${slugify(name)}-${slugify(sigungu)}`.slice(0, 120);

      await db
        .insert(businesses)
        .values({
          id,
          type: "vet",
          category: 3,
          name,
          address: addr,
          addressSido: sido || null,
          addressSigungu: sigungu || null,
          addressDong: dong || null,
          lat,
          lng,
          phone: row.TELNO || null,
          licenseDate: row.LCPMT_YMD || null,
          status,
          source: "mois_15045050",
          rawData: row,
          lastSyncedAt: now,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: businesses.id,
          set: {
            name,
            address: addr,
            addressSido: sido || null,
            addressSigungu: sigungu || null,
            addressDong: dong || null,
            lat,
            lng,
            phone: row.TELNO || null,
            status,
            lastSyncedAt: now,
            updatedAt: now,
          },
        });

      processed++;
    }
  };

  await processPage(first.items);

  const totalPages = Math.ceil(first.total / 1000);
  for (let pageNo = 2; pageNo <= totalPages; pageNo++) {
    const { items } = await fetchPage(pageNo, 1000);
    if (items.length === 0) break;
    await processPage(items);
    console.log(`[ETL:animal-hospitals] ${pageNo}/${totalPages} 페이지 처리 중 (${processed}건)`);
  }

  console.log(`[ETL:animal-hospitals] 완료 — ${processed}건 upsert`);
}

syncAnimalHospitals().catch((err) => {
  console.error("[ETL:animal-hospitals] 오류:", err);
  process.exit(1);
});
