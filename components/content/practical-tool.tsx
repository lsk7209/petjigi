import Link from "next/link";
import { InsuranceEstimator } from "@/components/content/insurance-estimator";
import { BudgetWorksheet, EditableChecklist, EditableTable } from "@/components/content/practical-fields";
import { PrintButton } from "@/components/content/print-button";
import "./practical-print.css";
import {
  PRACTICAL_TOOLS,
  type ChecklistTool,
  type InsuranceSheetTool,
  type ToolLink,
} from "@/lib/practical-tools";

const COMPARE_COLUMNS = ["후보 1", "후보 2", "후보 3"] as const;
const INSURANCE_COLUMNS = ["상품 A", "상품 B"] as const;

function Links({ links }: { links: readonly ToolLink[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {links.map((l) =>
        l.href.startsWith("/") ? (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[var(--brand-accent)] hover:underline"
            >
              {l.name}
            </Link>
          </li>
        ) : (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-accent)] hover:underline"
            >
              {l.name} ↗
            </a>
          </li>
        ),
      )}
    </ul>
  );
}

function Checklist({ tool }: { tool: ChecklistTool }) {
  return (
    <>
      <EditableChecklist groups={tool.groups} />
      {tool.compareRows && (
        <EditableTable
          rows={tool.compareRows}
          columns={COMPARE_COLUMNS}
          head="비교 항목"
        />
      )}
    </>
  );
}

function InsuranceSheet({ tool }: { tool: InsuranceSheetTool }) {
  const rows = tool.rows.map((r) => `${r.item} (${r.where})`);
  return (
    <>
      <EditableTable
        rows={rows}
        columns={INSURANCE_COLUMNS}
        head="비교 항목 (확인 위치)"
      />
      <InsuranceEstimator />
    </>
  );
}

/** 본문 아래에 서버 렌더링되는 실용 도구. 본문은 JS 없이도 모두 보인다. */
export function PracticalTool({ slug }: { slug: string }) {
  const tool = PRACTICAL_TOOLS[slug];
  if (!tool) return null;
  return (
    <section
      id="practical-tool"
      aria-labelledby="practical-tool-title"
      className="pj-card my-8 p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          id="practical-tool-title"
          className="text-lg sm:text-xl font-bold text-[var(--brand-text)]"
        >
          {tool.title}
        </h2>
        <PrintButton />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
        {tool.intro}
      </p>
      <p className="mt-1 text-xs text-[var(--brand-text-secondary)]">
        입력 내용은 이 화면에서만 유지됩니다. 새로고침하면 지워지며 저장하거나 전송하지 않습니다.
      </p>
      {tool.kind === "checklist" ? <Checklist tool={tool} /> : tool.kind === "insurance-sheet" ? <InsuranceSheet tool={tool} /> : <BudgetWorksheet groups={tool.groups} />}
      <Links links={tool.links} />
      <p className="mt-4 text-xs leading-relaxed text-[var(--brand-text-secondary)]">
        {tool.note}
      </p>
    </section>
  );
}
