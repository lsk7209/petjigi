import { createHash } from "node:crypto";

/** 등록대행기관 전용 업종 코드. 동물판매업('sale')과 분리한다. */
export const REGISTRATION_AGENT_TYPE = "registration";
export const REGISTRATION_AGENT_CATEGORY = 1;
export const REGISTRATION_AGENT_SOURCE = "mafra_registration_agent";
const ID_NAMESPACE = "mafra-regagent-v2";

export interface RegistrationAgentRow {
  orgNm?: string;
  orgAddr?: string;
  orgAddrDtl?: string;
  tel?: string;
}

export interface RegistrationAgentRecord {
  id: string;
  type: typeof REGISTRATION_AGENT_TYPE;
  category: typeof REGISTRATION_AGENT_CATEGORY;
  source: typeof REGISTRATION_AGENT_SOURCE;
  name: string;
  address: string;
  addressSido: string | null;
  addressSigungu: string | null;
  phone: string | null;
}

const normalize = (value: string | undefined): string => (value ?? "").normalize("NFC").replace(/\s+/g, " ").trim();

/**
 * 원본에 안정 식별자가 없어 정규화한 전체 입력(이름·기본주소·상세주소)의 해시를 쓴다.
 * 문자열 절단과 달리 서로 다른 입력은 서로 다른 ID가 된다. 주소가 바뀌면 ID도 바뀌므로
 * 이전 ID 행은 동기화 종료 시 closed 처리한다(runner 참고).
 */
export function buildRegistrationAgentId(row: RegistrationAgentRow): string {
  const input = [normalize(row.orgNm), normalize(row.orgAddr), normalize(row.orgAddrDtl)].join("␟");
  return `${ID_NAMESPACE}-${createHash("sha256").update(input).digest("hex").slice(0, 40)}`;
}

export function toRegistrationAgentRecord(row: RegistrationAgentRow): RegistrationAgentRecord | null {
  const name = normalize(row.orgNm);
  if (!name) return null;
  const base = normalize(row.orgAddr);
  const parts = base.split(" ").filter(Boolean);
  return {
    id: buildRegistrationAgentId(row),
    type: REGISTRATION_AGENT_TYPE,
    category: REGISTRATION_AGENT_CATEGORY,
    source: REGISTRATION_AGENT_SOURCE,
    name,
    address: [base, normalize(row.orgAddrDtl)].filter(Boolean).join(" "),
    addressSido: parts[0] ?? null,
    addressSigungu: parts[1] ?? null,
    phone: normalize(row.tel) || null,
  };
}
