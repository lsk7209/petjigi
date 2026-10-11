"use client";

import { useId, useState } from "react";
import { sumBudgetAmounts, type BudgetTool, type ChecklistGroup } from "@/lib/practical-tools";
import styles from "./practical-tool.module.css";

const fieldClass = "w-full min-w-0 rounded-md border border-[var(--brand-border)] bg-white px-2 py-1.5 text-sm text-[var(--brand-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]";

export function EditableChecklist({ groups }: { groups: readonly ChecklistGroup[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  return <>{groups.map((group) => <div key={group.heading} className="mt-4">
    <h3 className="text-base font-bold text-[var(--brand-text)]">{group.heading}</h3>
    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
      {group.items.map((item) => {
        const key = `${group.heading}-${item}`;
        return <li key={item}><label className="flex cursor-pointer items-start gap-2"><input type="checkbox" checked={checked[key] ?? false} onChange={(event) => setChecked((current) => ({ ...current, [key]: event.target.checked }))} className={`mt-1 accent-[var(--brand-accent)] ${styles.screenField}`} /><span className={styles.printCheck} aria-hidden="true">{checked[key] ? "☑" : "☐"}</span><span>{item}</span></label></li>;
      })}
    </ul>
  </div>)}</>;
}

export function EditableTable({ rows, columns, head }: { rows: readonly string[]; columns: readonly string[]; head: string }) {
  const id = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  return <div className="mt-4 max-w-full overflow-x-auto">
    <table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm">
      <thead><tr><th scope="col" className={styles.headCell}>{head}</th>{columns.map((column) => <th key={column} scope="col" className={styles.headCell}>{column}</th>)}</tr></thead>
      <tbody>{rows.map((row, rowIndex) => <tr key={row}><th scope="row" className={styles.rowHead}>{row}</th>{columns.map((column, columnIndex) => {
        const key = `${rowIndex}-${columnIndex}`;
        const label = `${row} — ${column}`;
        const value = values[key] ?? "";
        return <td key={column} className={styles.cell}><label htmlFor={`${id}-${key}`} className="sr-only">{label}</label><textarea id={`${id}-${key}`} rows={2} value={value} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} className={`${fieldClass} ${styles.screenField}`} /><span className={styles.printValue}>{value}</span></td>;
      })}</tr>)}</tbody>
    </table>
  </div>;
}

export function BudgetWorksheet({ groups }: { groups: BudgetTool["groups"] }) {
  const id = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  return <div className="mt-4 space-y-5">
    {groups.map((group, groupIndex) => {
      const groupValues = group.items.map((_, itemIndex) => values[`${groupIndex}-${itemIndex}`] ?? "");
      const total = sumBudgetAmounts(groupValues);
      const hasInput = groupValues.some((value) => value.trim() !== "");
      return <fieldset key={group.heading} className="min-w-0 rounded-xl border border-[var(--brand-border)] p-3 sm:p-4">
        <legend className="px-1 font-bold text-[var(--brand-text)]">{group.heading}</legend>
        <div className="space-y-3">{group.items.map((item, itemIndex) => {
          const key = `${groupIndex}-${itemIndex}`;
          return <label key={item} htmlFor={`${id}-${key}`} className="grid min-w-0 gap-1 text-sm text-[var(--brand-text-secondary)] sm:grid-cols-[minmax(0,1fr)_minmax(0,12rem)] sm:items-center"><span>{item} (원)</span><span className="min-w-0"><input id={`${id}-${key}`} type="number" inputMode="numeric" min="0" step="1" value={values[key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} className={`${fieldClass} ${styles.screenField}`} /><span className={styles.printValue}>{values[key] ?? ""}</span></span></label>;
        })}</div>
        <p className="mt-3 text-sm font-medium" aria-live="polite">{group.heading} 합계: {hasInput ? total === null ? "0 이상의 정수 금액을 확인하세요" : `${total.toLocaleString("ko-KR")}원` : "금액을 입력하면 표시됩니다"}</p>
      </fieldset>;
    })}
    <p className="text-xs leading-relaxed text-[var(--brand-text-secondary)]">매달 지출은 월 기준이며, 세 그룹의 금액을 합산하지 않습니다. 입력은 저장·전송되지 않고 새로고침하면 지워집니다.</p>
  </div>;
}
