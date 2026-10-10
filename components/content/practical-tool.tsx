import Link from "next/link";
import { InsuranceEstimator } from "@/components/content/insurance-estimator";
import { PrintButton } from "@/components/content/print-button";
import {
  PRACTICAL_TOOLS,
  type ChecklistTool,
  type InsuranceSheetTool,
  type ToolLink,
} from "@/lib/practical-tools";

const COMPARE_COLUMNS = ["후보 1", "후보 2", "후보 3"] as const;
const INSURANCE_COLUMNS = ["상품 A", "상품 B"] as const;
const CELL =
  "border border-[var(--brand-border)] px-2 py-2 align-top text-xs sm:text-sm";
const HEAD_CELL = `${CELL} bg-[var(--brand-soft,#FAF5EE)]`;

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

function BlankTable({
  rows,
  columns,
  head,
}: {
  rows: readonly string[];
  columns: readonly string[];
  head: string;
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th scope="col" className={HEAD_CELL}>
              {head}
            </th>
            {columns.map((c) => (
              <th key={c} scope="col" className={HEAD_CELL}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r}>
              <th scope="row" className={`${CELL} font-medium`}>
                {r}
              </th>
              {columns.map((c) => (
                <td key={c} className={`${CELL} min-w-20`}>
                  &nbsp;
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Checklist({ tool }: { tool: ChecklistTool }) {
  return (
    <>
      {tool.groups.map((g) => (
        <div key={g.heading} className="mt-4">
          <h3 className="text-base font-bold text-[var(--brand-text)]">
            {g.heading}
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
            {g.items.map((it) => (
              <li key={it}>☐ {it}</li>
            ))}
          </ul>
        </div>
      ))}
      {tool.compareRows && (
        <BlankTable
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
      <BlankTable
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
      {tool.kind === "checklist" ? (
        <Checklist tool={tool} />
      ) : (
        <InsuranceSheet tool={tool} />
      )}
      <Links links={tool.links} />
      <p className="mt-4 text-xs leading-relaxed text-[var(--brand-text-secondary)]">
        {tool.note}
      </p>
    </section>
  );
}
