"use client";

import { useId, useState } from "react";
import {
  estimateInsurancePayout,
  type EstimatorInput,
} from "@/lib/insurance-estimate";

interface Field {
  key: keyof EstimatorInput;
  label: string;
  unit: string;
  max?: number;
}

const FIELDS: readonly Field[] = [
  { key: "cost", label: "청구 대상 진료비", unit: "원" },
  { key: "rate", label: "보장 비율", unit: "%", max: 100 },
  { key: "fixed", label: "정액 자기부담금", unit: "원" },
  { key: "cap", label: "해당 항목 한도", unit: "원" },
];

/** 입력값만으로 계산하는 예시. 서버 전송·저장 없음. */
export function InsuranceEstimator() {
  const id = useId();
  const [values, setValues] = useState<EstimatorInput>({
    cost: "",
    rate: "",
    fixed: "",
    cap: "",
  });
  const result = estimateInsurancePayout(values);

  return (
    <div className="mt-6 rounded-xl border border-[var(--brand-border)] p-4 print:hidden">
      <h3 className="text-base font-bold text-[var(--brand-text)]">
        보험금 계산 예시 (직접 입력)
      </h3>
      <p className="mt-1 text-xs text-[var(--brand-text-secondary)]">
        가정: 보험금 = (진료비 − 정액 자기부담금) × 보장 비율, 항목 한도를 넘지
        않음. 면책·감액·최소 자기부담 등 약관의 다른 조건은 반영하지 않으므로
        실제 지급액과 다를 수 있습니다. 입력값은 이 브라우저 안에서만 계산되고
        저장·전송되지 않습니다.
      </p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIELDS.map((f) => (
          <label
            key={f.key}
            htmlFor={`${id}-${f.key}`}
            className="text-xs text-[var(--brand-text-secondary)]"
          >
            {f.label} ({f.unit})
            <input
              id={`${id}-${f.key}`}
              type="number"
              inputMode="decimal"
              min={0}
              max={f.max}
              value={values[f.key]}
              onChange={(e) =>
                setValues((p) => ({ ...p, [f.key]: e.target.value }))
              }
              className="mt-1 block w-full rounded-lg border border-[var(--brand-border)] px-3 py-2 text-sm text-[var(--brand-text)]"
            />
          </label>
        ))}
      </div>
      <p className="mt-3 text-sm" aria-live="polite">
        {result === null
          ? "네 칸을 모두 0 이상의 숫자로 입력하면 예시 계산값이 표시됩니다. (보장 비율은 0~100)"
          : `예시 계산값: ${Math.round(result).toLocaleString("ko-KR")}원 (보험금 예측·보장이 아닙니다)`}
      </p>
    </div>
  );
}
