export interface EstimatorInput {
  cost: string;
  rate: string;
  fixed: string;
  cap: string;
}

const MAX_RATE = 100;

function parse(value: string, max?: number): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || (max !== undefined && n > max))
    return null;
  return n;
}

/**
 * 보험금 계산 예시: (진료비 − 정액 자기부담금) × 보장 비율, 항목 한도 상한.
 * 입력이 하나라도 비었거나 범위를 벗어나면 null.
 */
export function estimateInsurancePayout(v: EstimatorInput): number | null {
  const cost = parse(v.cost);
  const rate = parse(v.rate, MAX_RATE);
  const fixed = parse(v.fixed);
  const cap = parse(v.cap);
  if (cost === null || rate === null || fixed === null || cap === null)
    return null;
  return Math.min(Math.max(cost - fixed, 0) * (rate / MAX_RATE), cap);
}
