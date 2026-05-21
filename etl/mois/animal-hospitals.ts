/**
 * 행정안전부 동물병원 동기화 ETL (Cron — 매일 03:30 KST)
 * 데이터셋: 15045050
 * API: https://apis.data.go.kr/1741000/animal_hospitals/info
 */

import { createHash } from "crypto";
import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { geocodeAddress } from "../geocoding/kakao";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "https://apis.data.go.kr/1741000/animal_hospitals/info";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";

interface HospitalRow {
  // 공통 행정안전부 API 필드명 (실제 응답 확인 후 조정)
  bplcNm?: string;       // 업소명
  rdnWhlAddr?: string;   // 도로명주소
  siteWhlAddr?: string;  // 지번주소
  siteTel?: string;      // 전화번호
  apvPermYmd?: string;   // 허가일자
  dtlStateGbn?: string;  // 영업상태 (01=영업, 02=폐업)
  trdStateGbn?: string;  // 영업상태 (alternate field)
  x?: string;            // 경도
  y?: string;            // 위도
  siteLat?: string;
  siteLng?: string;
  mgtNo?: string;        // 관리번호
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
    name: row.bplcNm,
    addr: row.rdnWhlAddr ?? row.siteWhlAddr,
    tel: row.siteTel,
    state: row.dtlStateGbn ?? row.trdStateGbn,
  });
  return createHash("sha256").update(str).digest("hex").slice(0, 16);
}

async function fetchPage(pageNo: number, numOfRows = 1000): Promise<{ items: HospitalRow[]; total: number }> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`동물병원 API 오류: ${res.status} ${await res.text()}`);

  const json = await res.json();

  // data.go.kr 표준 응답 구조
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

  // 첫 페이지로 전체 건수 파악
  const first = await fetchPage(1, 1000);
  console.log(`[ETL:animal-hospitals] 총 ${first.total}건`);

  if (first.items.length > 0) {
    console.log("[ETL:animal-hospitals] 샘플 필드:", Object.keys(first.items[0]));
  }

  let pageNo = 1;
  let processed = 0;

  const processPage = async (items: HospitalRow[]) => {
    const now = new Date().toISOString();

    for (const row of items) {
      const name = row.bplcNm ?? "";
      const addr = row.rdnWhlAddr ?? row.siteWhlAddr ?? "";
      if (!name || !addr) continue;

      const state = row.dtlStateGbn ?? row.trdStateGbn ?? "01";
      const status = state === "02" || state === "03" ? "closed" : "active";

      const { sido, sigungu, dong } = parseAddress(addr);
      const sigunguSlug = slugify(sigungu);
      const nameSlug = slugify(name);
      const id = `mois-vet-${row.mgtNo ?? hashRow(row)}`;

      let lat = row.y ? parseFloat(row.y) : row.siteLat ? parseFloat(row.siteLat) : null;
      let lng = row.x ? parseFloat(row.x) : row.siteLng ? parseFloat(row.siteLng) : null;

      if (status === "active" && (!lat || !lng) && addr) {
        const geo = await geocodeAddress(addr);
        if (geo) { lat = geo.lat; lng = geo.lng; }
      }

      const slug = `${nameSlug}-${sigunguSlug}`.slice(0, 120);

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
          phone: row.siteTel || null,
          licenseDate: row.apvPermYmd || null,
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
            phone: row.siteTel || null,
            status,
            lastSyncedAt: now,
            updatedAt: now,
          },
        });

      processed++;
    }
  };

  await processPage(first.items);

  // 나머지 페이지
  const totalPages = Math.ceil(first.total / 1000);
  for (pageNo = 2; pageNo <= totalPages; pageNo++) {
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
