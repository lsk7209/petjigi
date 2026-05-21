/**
 * localdata.go.kr CSV 일괄 임포트
 * 사용법: pnpm etl:import-csv
 *
 * X/Y 좌표는 TM 중부원점 (EPSG:5174) → lat/lng 변환 불가로 null 처리
 * 이후 pnpm etl:geocode 로 주소 기반 지오코딩 별도 실행
 */

import { readFileSync } from "fs";
import { db } from "../../db/client";
import { businesses } from "../../db/schema";

const CSV_DIR = "C:/Users/dlatj/Downloads/aa";

const FILE_MAP: Record<string, { type: string; category: number }> = {
  "동물_동물병원.csv":       { type: "vet",        category: 3 },
  "동물_동물미용업.csv":     { type: "grooming",   category: 5 },
  "동물_동물위탁관리업.csv": { type: "boarding",   category: 5 },
  "동물_동물장묘업.csv":     { type: "funeral",    category: 6 },
  "동물_동물판매업.csv":     { type: "sale",       category: 1 },
  "동물_동물생산업.csv":     { type: "breeder",    category: 1 },
  "동물_동물운송업.csv":     { type: "transport",  category: 5 },
  "동물_동물전시업.csv":     { type: "exhibition", category: 5 },
};

// 영업상태코드: 01=영업중, 02=휴업, 03=폐업, 04=취소
const ACTIVE_CODES = new Set(["01"]);

function parseCsv(content: string): { headers: string[]; rows: string[][] } {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows: string[][] = [];

  for (let i = 1; i < lines.length; i++) {
    // 따옴표 포함 필드 처리
    const row: string[] = [];
    let field = "";
    let inQuote = false;
    for (const ch of lines[i] + ",") {
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        row.push(field.trim());
        field = "";
      } else {
        field += ch;
      }
    }
    if (row.length >= headers.length - 2) rows.push(row);
  }
  return { headers, rows };
}

function parseAddress(addr: string): { sido: string; sigungu: string; dong: string } {
  const parts = addr.trim().split(/\s+/);
  return { sido: parts[0] ?? "", sigungu: parts[1] ?? "", dong: parts[2] ?? "" };
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w가-힣-]/g, "")
    .slice(0, 80);
}

async function importFile(filename: string, typeInfo: { type: string; category: number }) {
  const path = `${CSV_DIR}/${filename}`;
  const buf = readFileSync(path);
  const text = new TextDecoder("euc-kr").decode(buf);
  const { headers, rows } = parseCsv(text);

  const idx = (name: string) => headers.indexOf(name);
  const I = {
    mgtNo:      idx("관리번호"),
    name:       idx("사업장명"),
    statusCd:   idx("영업상태코드"),
    rdnAddr:    idx("도로명주소"),
    jibunAddr:  idx("지번주소"),
    phone:      idx("전화번호"),
    licDate:    idx("인허가일자"),
  };

  const now = new Date().toISOString();
  let inserted = 0;
  let skipped = 0;
  const BATCH = 200;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);

    for (const row of batch) {
      const statusCd = row[I.statusCd] ?? "";
      if (!ACTIVE_CODES.has(statusCd)) { skipped++; continue; }

      const name = row[I.name] ?? "";
      const addr = (row[I.rdnAddr] ?? row[I.jibunAddr] ?? "").trim();
      if (!name || !addr) { skipped++; continue; }

      const mgtNo = row[I.mgtNo] ?? "";
      const id = `ld-${typeInfo.type}-${mgtNo}`.slice(0, 120);
      const { sido, sigungu, dong } = parseAddress(addr);

      await db
        .insert(businesses)
        .values({
          id,
          type: typeInfo.type,
          category: typeInfo.category,
          name,
          address: addr,
          addressSido: sido || null,
          addressSigungu: sigungu || null,
          addressDong: dong || null,
          lat: null,
          lng: null,
          phone: (row[I.phone] ?? "").trim() || null,
          licenseDate: (row[I.licDate] ?? "").trim() || null,
          status: "active",
          source: "localdata_csv",
          rawData: null,
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
            phone: (row[I.phone] ?? "").trim() || null,
            lastSyncedAt: now,
            updatedAt: now,
          },
        });

      inserted++;
    }

    if (i % 2000 === 0 && i > 0) {
      process.stdout.write(`  ${i}/${rows.length}...\r`);
    }
  }

  console.log(`  ✓ ${filename}: ${inserted}건 적재, ${skipped}건 스킵 (폐업/휴업)`);
  return inserted;
}

async function main() {
  console.log("=== localdata CSV 임포트 시작 ===\n");
  let total = 0;

  for (const [filename, typeInfo] of Object.entries(FILE_MAP)) {
    try {
      const n = await importFile(filename, typeInfo);
      total += n;
    } catch (err) {
      console.error(`  ✗ ${filename} 오류:`, err);
    }
  }

  console.log(`\n=== 완료 — 총 ${total}건 적재 ===`);
}

main().catch((err) => {
  console.error("임포트 오류:", err);
  process.exit(1);
});
