/**
 * 등록대행기관 행 정정 도구. 기본은 읽기 전용 dry-run.
 *   dry-run : tsx scripts/correct-registration-agents.ts
 *   반영    : tsx scripts/correct-registration-agents.ts --apply --confirm=<dry-run이 출력한 fingerprint>
 * 계약: 재분류(type/category/updated_at)만 한다. 삭제·id 변경·충돌 행 덮어쓰기는 하지 않는다.
 *   UPDATE는 id·source·type·updated_at이 조회 시점과 같을 때만 적용(CAS). 적용 전 대상 행을 .backup-prod에 저장.
 *   id 절단 충돌·시군구 불일치는 ETL 재실행(운영 쓰기 승인 필요)으로만 정정된다.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import {
  planCorrection,
  planFingerprintInput,
  RETYPE_SQL,
  retypeArgs,
  type StoredAgentRow,
} from "../etl/mafra/registration-agent-correction";

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const CONFIRM = args.find((a) => a.startsWith("--confirm="))?.slice("--confirm=".length);
const BACKUP_DIR = process.env.BACKUP_DIR ?? ".backup-prod";

async function main() {
  const client = createClient({ url: process.env.TURSO_DATABASE_URL ?? "", authToken: process.env.TURSO_AUTH_TOKEN });
  const result = await client.execute(
    "SELECT id, type, name, address, address_sigungu AS addressSigungu, status, updated_at AS updatedAt " +
      "FROM businesses WHERE source = 'mafra_registration_agent'",
  );
  const rows = result.rows.map((r) => ({
    id: String(r.id), type: String(r.type), name: String(r.name), address: String(r.address),
    addressSigungu: r.addressSigungu === null ? null : String(r.addressSigungu),
    status: String(r.status), updatedAt: String(r.updatedAt),
  })) satisfies StoredAgentRow[];

  const plan = planCorrection(rows);
  const fingerprint = crypto.createHash("sha256").update(planFingerprintInput(plan)).digest("hex").slice(0, 16);
  console.log(JSON.stringify({
    total: plan.total, retype: plan.retype.length,
    possiblyTruncatedIds: plan.possiblyTruncatedIds.length, sigunguMismatch: plan.sigunguMismatch.length,
    fingerprint, mode: APPLY ? "apply" : "dry-run",
  }));
  if (!APPLY) return;
  if (CONFIRM !== fingerprint) throw new Error("--confirm 값이 dry-run fingerprint와 다릅니다. 재확인 후 다시 실행하세요.");

  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  fs.writeFileSync(path.join(BACKUP_DIR, `registration-retype.${fingerprint}.json`), JSON.stringify(plan.retype));
  const now = new Date().toISOString();
  const outcomes = await client.batch(plan.retype.map((r) => ({ sql: RETYPE_SQL, args: retypeArgs(r, now) })), "write");
  const changed = outcomes.reduce((n, o) => n + o.rowsAffected, 0);
  console.log(JSON.stringify({ attempted: plan.retype.length, changed, skippedByCas: plan.retype.length - changed }));
}

main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1); });
