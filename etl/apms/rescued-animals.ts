/**
 * APMS 구조동물 동기화 ETL (Cron 3 — 매일 05:00 KST)
 * 데이터셋: 15098931 — 페이지 noindex (휘발 정보)
 * API: http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic
 */

import { db } from "../../db/client";

const API_KEY = process.env.APMS_API_KEY ?? "";
const API_URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";

interface RescuedAnimal {
  desertionNo: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  chargeNm: string;
  orgNm: string;
  noticeComment: string;
}

async function fetchRescuedPage(pageNo: number, numOfRows = 1000): Promise<RescuedAnimal[]> {
  const url = `${API_URL}?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`APMS 구조동물 API 오류: ${res.status}`);
  const json = await res.json();
  const items = json?.response?.body?.items?.item;
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

export async function syncRescuedAnimals(): Promise<void> {
  console.log("[ETL:rescued-animals] 시작 (noindex 데이터)");
  // 구조동물은 DB 별도 테이블 없이 캐시 레이어에서만 서빙 (Phase 2에서 테이블 추가 예정)
  // 현재는 로그만 기록
  const rows = await fetchRescuedPage(1, 10);
  console.log(`[ETL:rescued-animals] API 응답 확인: ${rows.length}건`);
  console.log("[ETL:rescued-animals] 완료 (Phase 2에서 테이블 + 페이지 구현 예정)");
}

syncRescuedAnimals().catch((err) => {
  console.error("[ETL:rescued-animals] 오류:", err);
  process.exit(1);
});
