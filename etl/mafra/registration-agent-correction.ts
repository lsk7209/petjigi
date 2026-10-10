import { REGISTRATION_AGENT_CATEGORY, REGISTRATION_AGENT_TYPE } from "./registration-agent-record";

/** 운영 DB에서 읽는 최소 필드. 개인정보·원문 컬럼은 읽지 않는다. */
export interface StoredAgentRow {
  id: string;
  type: string;
  name: string;
  address: string;
  addressSigungu: string | null;
  status: string;
  updatedAt: string;
}

export interface CorrectionPlan {
  total: number;
  /** type이 아직 전용 업종이 아닌 행 → 전용 업종으로 재분류 대상 */
  retype: StoredAgentRow[];
  /** 100자로 절단됐을 가능성이 있는 ID(충돌로 덮어쓰기됐을 수 있음) — ETL 재실행으로만 복구 가능 */
  possiblyTruncatedIds: string[];
  /** 주소 둘째 토큰과 addressSigungu가 다른 행 — ETL 재실행으로 정정 */
  sigunguMismatch: string[];
}

const LEGACY_TRUNCATED_ID_LENGTH = 100;

export function planCorrection(rows: StoredAgentRow[]): CorrectionPlan {
  return {
    total: rows.length,
    retype: rows.filter((r) => r.type !== REGISTRATION_AGENT_TYPE),
    possiblyTruncatedIds: rows.filter((r) => r.id.length >= LEGACY_TRUNCATED_ID_LENGTH).map((r) => r.id),
    sigunguMismatch: rows
      .filter((r) => (r.address.trim().split(/\s+/)[1] ?? null) !== r.addressSigungu)
      .map((r) => r.id),
  };
}

/** apply 시 같은 계획인지 확인하는 지문: 재분류 대상의 (id, updatedAt) 목록 해시 입력 */
export function planFingerprintInput(plan: CorrectionPlan): string {
  return plan.retype.map((r) => `${r.id}@${r.updatedAt}`).sort().join("\n");
}

export const RETYPE_SQL =
  "UPDATE businesses SET type = ?, category = ?, updated_at = ? " +
  "WHERE id = ? AND source = 'mafra_registration_agent' AND type = ? AND updated_at = ?";

export function retypeArgs(row: StoredAgentRow, now: string): (string | number)[] {
  return [REGISTRATION_AGENT_TYPE, REGISTRATION_AGENT_CATEGORY, now, row.id, row.type, row.updatedAt];
}
