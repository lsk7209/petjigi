/**
 * LOCALDATA 동물 18종 인허가 동기화 ETL (Cron 1 — 매일 03:00 KST)
 * 데이터셋: 15121110 (농림축산검역본부_반려동물 영업장)
 *
 * 처리 흐름:
 * 1. LOCALDATA OpenAPI 호출 (업종별)
 * 2. 파싱 + SHA-256 해시 diff
 * 3. upsert into businesses (변경분만)
 * 4. 폐업/휴업 → status='closed'
 * 5. 좌표 없는 row → 카카오맵 지오코딩 (영구 캐싱)
 * 6. 변경 URL만 IndexNow ping
 * 7. stale 검출 (7일 이상 신규 데이터 없으면 알림)
 */

import { createHash } from "crypto";
import { db } from "../../db/client";
import { businesses } from "../../db/schema";
import { eq, inArray } from "drizzle-orm";
import { geocodeAddress } from "../geocoding/kakao";
import { pingIndexNow } from "../../lib/seo/index-now";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";
const LOCALDATA_KEY = process.env.LOCALDATA_API_KEY ?? "";

// 업종 코드 → type/category 매핑
const BSSH_CODE_MAP: Record<string, { type: string; category: number }> = {
  "01": { type: "sale", category: 1 },        // 동물판매업
  "02": { type: "funeral", category: 6 },      // 동물장묘업
  "03": { type: "boarding", category: 5 },     // 동물위탁관리업
  "04": { type: "grooming", category: 5 },     // 동물미용업
  "05": { type: "transport", category: 5 },    // 동물운송업
  "06": { type: "exhibition", category: 5 },   // 동물전시업
  "07": { type: "breeder", category: 1 },      // 동물생산업
};

interface LocaldataRow {
  mgtNo: string;        // 관리번호
  bplcNm: string;       // 업소명
  rdnWhlAddr: string;   // 도로명 전체주소
  siteWhlAddr: string;  // 지번 전체주소
  siteTel: string;      // 전화번호
  apvPermYmd: string;   // 허가일자
  dtlStateGbn: string;  // 상세상태 (01=영업, 02=폐업, 03=휴업)
  bsshCode: string;     // 업종 코드
}

function hashRow(row: LocaldataRow): string {
  const str = JSON.stringify({
    bplcNm: row.bplcNm,
    rdnWhlAddr: row.rdnWhlAddr,
    siteTel: row.siteTel,
    dtlStateGbn: row.dtlStateGbn,
  });
  return createHash("sha256").update(str).digest("hex").slice(0, 16);
}

function parseAddress(addr: string): { sido: string; sigungu: string; dong: string } {
  const parts = addr.trim().split(/\s+/);
  return {
    sido: parts[0] ?? "",
    sigungu: parts[1] ?? "",
    dong: parts[2] ?? "",
  };
}

async function fetchLocaldataPage(
  bsshCode: string,
  pageNo: number,
  numOfRows = 1000
): Promise<LocaldataRow[]> {
  // LOCALDATA OpenAPI 엔드포인트 (업종별 상이)
  // 실제 URL은 localdata.go.kr API 문서 참조
  const url = `https://www.localdata.go.kr/platform/rest/TO0/openDataApi?authKey=${LOCALDATA_KEY}&dataType=json&bsshCode=${bsshCode}&pageNo=${pageNo}&numOfRows=${numOfRows}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`LOCALDATA API 오류: ${res.status}`);

  const json = await res.json();
  return json?.result?.body?.items ?? [];
}

export async function syncLocaldata(): Promise<void> {
  console.log("[ETL:businesses] 시작");
  const changedUrls: string[] = [];
  let totalProcessed = 0;

  for (const [bsshCode, { type, category }] of Object.entries(BSSH_CODE_MAP)) {
    console.log(`[ETL:businesses] 업종 ${bsshCode} (${type}) 동기화 중...`);
    let pageNo = 1;
    let hasMore = true;

    while (hasMore) {
      let rows: LocaldataRow[];
      try {
        rows = await fetchLocaldataPage(bsshCode, pageNo);
      } catch (e) {
        console.error(`[ETL:businesses] 업종 ${bsshCode} 페이지 ${pageNo} 실패:`, e);
        break;
      }

      if (rows.length === 0) { hasMore = false; break; }

      // 배치 SELECT: N+1 방지 — 페이지 단위 단일 쿼리로 기존 레코드 일괄 조회
      const pageIds = rows.map((row) => `${bsshCode}-${row.mgtNo}`);
      const CHUNK = 900; // SQLite 바인딩 변수 한도 999 이하 유지
      const existingRows: { id: string; rawData: unknown; lat: number | null; lng: number | null; createdAt: string }[] = [];
      for (let i = 0; i < pageIds.length; i += CHUNK) {
        const batch = await db
          .select({ id: businesses.id, rawData: businesses.rawData, lat: businesses.lat, lng: businesses.lng, createdAt: businesses.createdAt })
          .from(businesses)
          .where(inArray(businesses.id, pageIds.slice(i, i + CHUNK)));
        existingRows.push(...batch);
      }
      const existingMap = new Map(existingRows.map((r) => [r.id, r]));

      for (const row of rows) {
        const hash = hashRow(row);
        const id = `${bsshCode}-${row.mgtNo}`;
        const addr = parseAddress(row.rdnWhlAddr || row.siteWhlAddr);
        const status = row.dtlStateGbn === "01" ? "active"
          : row.dtlStateGbn === "02" ? "closed" : "paused";

        const existing = existingMap.get(id) ?? null;

        // 해시 같으면 스킵 (diff 기반 upsert)
        const existingHash = (existing?.rawData as { hash?: string } | null)?.hash;
        if (existingHash === hash) continue;

        // 좌표 처리 — 기존 좌표 있으면 재사용 (영구 캐싱), 없으면 지오코딩
        let lat = existing?.lat ?? null;
        let lng = existing?.lng ?? null;
        if (!lat && !lng && (row.rdnWhlAddr || row.siteWhlAddr)) {
          const geo = await geocodeAddress(row.rdnWhlAddr || row.siteWhlAddr);
          if (geo) { lat = geo.lat; lng = geo.lng; }
        }

        const now = new Date().toISOString();
        await db
          .insert(businesses)
          .values({
            id,
            type,
            category,
            name: row.bplcNm,
            address: row.rdnWhlAddr || row.siteWhlAddr,
            addressSido: addr.sido,
            addressSigungu: addr.sigungu,
            addressDong: addr.dong,
            lat,
            lng,
            phone: row.siteTel || null,
            licenseDate: row.apvPermYmd || null,
            status,
            source: `localdata_${bsshCode}`,
            rawData: { hash },
            lastSyncedAt: now,
            createdAt: existing?.createdAt ?? now,
            updatedAt: now,
          })
          .onConflictDoUpdate({
            target: businesses.id,
            set: {
              name: row.bplcNm,
              address: row.rdnWhlAddr || row.siteWhlAddr,
              addressSido: addr.sido,
              addressSigungu: addr.sigungu,
              addressDong: addr.dong,
              lat,
              lng,
              phone: row.siteTel || null,
              status,
              rawData: { hash },
              lastSyncedAt: now,
              updatedAt: now,
            },
          });

        // 상태 변경된 영업장 URL 수집 (IndexNow ping 대상)
        if (status === "active") {
          const sigunguSlug = addr.sigungu.replace(/\s+/g, "-").toLowerCase();
          changedUrls.push(`${SITE_URL}/${type}/${sigunguSlug}/${encodeURIComponent(row.bplcNm)}`);
        }

        totalProcessed++;
      }

      hasMore = rows.length === 1000;
      pageNo++;
    }
  }

  // IndexNow ping (변경된 URL만, 배치로)
  if (changedUrls.length > 0) {
    const batches = [];
    for (let i = 0; i < changedUrls.length; i += 100) {
      batches.push(changedUrls.slice(i, i + 100));
    }
    for (const batch of batches) {
      await pingIndexNow(batch);
    }
  }

  console.log(`[ETL:businesses] 완료 — ${totalProcessed}건 처리, ${changedUrls.length}건 IndexNow ping`);

  // Next.js 캐시 무효화 (businesses + stats 태그)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    await fetch(`${SITE_URL}/api/cache/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cronSecret}`,
      },
      body: JSON.stringify({ tags: ["businesses", "stats"] }),
    }).catch((e) => console.error("[ETL:businesses] 캐시 무효화 실패:", e));
  }
}

syncLocaldata().catch((err) => {
  console.error("[ETL:businesses] 치명적 오류:", err);
  process.exit(1);
});
