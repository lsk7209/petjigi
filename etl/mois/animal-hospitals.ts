/**
 * 행정안전부 동물병원 동기화 ETL (Cron — 매일 03:30 KST)
 * 데이터셋: 15045050
 * API: https://apis.data.go.kr/1741000/animal_hospitals/info
 * 실제 필드: ALL_CAPS (BPLC_NM, ROAD_NM_ADDR, TELNO, SALS_STTS_CD, CRD_INFO_X/Y, MNG_NO)
 */

import { createHash } from "crypto";
import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { inArray } from "drizzle-orm";
import { geocodeAddress } from "../geocoding/kakao";
import { pingIndexNow } from "../../lib/seo/index-now";

const API_KEY = process.env.APMS_API_KEY ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
const API_URL = "https://apis.data.go.kr/1741000/animal_hospitals/info";
const CHUNK = 900; // SQLite 바인딩 변수 한도 999 이하

interface HospitalRow {
  BPLC_NM?: string;          // 업소명
  ROAD_NM_ADDR?: string;     // 도로명주소
  LOTNO_ADDR?: string;       // 지번주소
  TELNO?: string;            // 전화번호
  LCPMT_YMD?: string;        // 허가일자
  SALS_STTS_CD?: string;     // 영업상태코드 (01=영업중, 02=폐업, 03=휴업)
  DTL_SALS_STTS_CD?: string; // 상세영업상태코드
  CRD_INFO_X?: string;       // 경도 (TM좌표 — WGS84 아님)
  CRD_INFO_Y?: string;       // 위도 (TM좌표 — WGS84 아님)
  MNG_NO?: string;           // 관리번호
  [key: string]: string | undefined;
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

function makeId(row: HospitalRow): string {
  return `mois-vet-${row.MNG_NO ?? hashRow(row)}`;
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

async function processPage(items: HospitalRow[], processed: { count: number }, changedUrls: string[]): Promise<void> {
  const now = new Date().toISOString();

  // 배치 SELECT — 페이지 내 모든 ID를 한 번에 조회 (N+1 방지)
  const pageIds = items.map(makeId);
  const existingRows: { id: string; rawData: unknown; lat: number | null; lng: number | null; createdAt: string }[] = [];
  for (let i = 0; i < pageIds.length; i += CHUNK) {
    const batch = await db
      .select({ id: businesses.id, rawData: businesses.rawData, lat: businesses.lat, lng: businesses.lng, createdAt: businesses.createdAt })
      .from(businesses)
      .where(inArray(businesses.id, pageIds.slice(i, i + CHUNK)));
    existingRows.push(...batch);
  }
  const existingMap = new Map(existingRows.map((r) => [r.id, r]));

  for (const row of items) {
    const name = row.BPLC_NM ?? "";
    const addr = row.ROAD_NM_ADDR ?? row.LOTNO_ADDR ?? "";
    if (!name || !addr) continue;

    const id = makeId(row);
    const hash = hashRow(row);
    const existing = existingMap.get(id) ?? null;

    // 해시 같으면 스킵 (diff 기반 upsert)
    const existingHash = (existing?.rawData as { hash?: string } | null)?.hash;
    if (existingHash === hash) continue;

    const stateCode = row.SALS_STTS_CD ?? "01";
    const status = stateCode === "02" || stateCode === "03" ? "closed" : "active";
    const { sido, sigungu, dong } = parseAddress(addr);

    // 기존 좌표 있으면 재사용 (영구 캐싱) — 카카오 API 호출 최소화
    let lat = existing?.lat ?? null;
    let lng = existing?.lng ?? null;
    if (!lat && !lng && status === "active") {
      const geo = await geocodeAddress(addr);
      if (geo) { lat = geo.lat; lng = geo.lng; }
    }

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
        rawData: { hash },
        lastSyncedAt: now,
        createdAt: existing?.createdAt ?? now,
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
          rawData: { hash },
          lastSyncedAt: now,
          updatedAt: now,
        },
      });

    if (status === "active") {
      const sigunguSlug = sigungu.replace(/\s+/g, "-").toLowerCase();
      changedUrls.push(`${SITE_URL}/vet/${sigunguSlug}/${encodeURIComponent(name)}`);
    }
    processed.count++;
  }
}

export async function syncAnimalHospitals(): Promise<void> {
  console.log("[ETL:animal-hospitals] 시작");

  if (!API_KEY) {
    console.error("[ETL:animal-hospitals] APMS_API_KEY 미설정");
    process.exit(1);
  }

  const first = await fetchPage(1, 1000);
  console.log(`[ETL:animal-hospitals] 총 ${first.total}건`);

  const processed = { count: 0 };
  const changedUrls: string[] = [];
  await processPage(first.items, processed, changedUrls);

  const totalPages = Math.ceil(first.total / 1000);
  for (let pageNo = 2; pageNo <= totalPages; pageNo++) {
    const { items } = await fetchPage(pageNo, 1000);
    if (items.length === 0) break;
    await processPage(items, processed, changedUrls);
    console.log(`[ETL:animal-hospitals] ${pageNo}/${totalPages} 페이지 처리 중 (${processed.count}건 변경)`);
  }

  console.log(`[ETL:animal-hospitals] 완료 — ${processed.count}건 upsert, ${changedUrls.length}건 IndexNow ping`);

  // IndexNow ping (변경된 URL만, 배치로)
  if (changedUrls.length > 0) {
    for (let i = 0; i < changedUrls.length; i += 100) {
      await pingIndexNow(changedUrls.slice(i, i + 100)).catch(() => {});
    }
  }

  // Next.js 캐시 무효화
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && processed.count > 0) {
    await fetch(`${SITE_URL}/api/cache/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${cronSecret}` },
      body: JSON.stringify({ tags: ["businesses", "stats"] }),
    }).catch((e) => console.error("[ETL:animal-hospitals] 캐시 무효화 실패:", e));
  }
}

syncAnimalHospitals().catch((err) => {
  console.error("[ETL:animal-hospitals] 오류:", err);
  process.exit(1);
});
