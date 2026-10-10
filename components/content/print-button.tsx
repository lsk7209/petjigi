"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-[var(--brand-border)] hover:bg-[var(--brand-soft,#FAF5EE)] print:hidden"
    >
      인쇄하기
    </button>
  );
}
