import Link from "next/link";
import {
  describeDataCoverage,
  type CoverageInput,
} from "@/lib/business-data-coverage";

export function DataCoverage({
  business,
  syncedAt,
}: {
  business: CoverageInput;
  syncedAt: string | null;
}) {
  const c = describeDataCoverage(business);
  return (
    <section
      aria-label="데이터 범위"
      className="mb-8 rounded-xl border border-[var(--brand-border)] p-4 text-xs leading-relaxed text-[var(--brand-text-secondary)]"
    >
      <h2 className="mb-2 text-sm font-bold text-[var(--brand-text)]">
        이 정보의 범위
      </h2>
      <ul className="space-y-1">
        <li>제공 출처: {c.provider}</li>
        <li>
          공개 데이터에 등록된 항목:{" "}
          {c.registered.length > 0 ? c.registered.join(", ") : "없음"}
        </li>
        <li>
          펫지기 수집일: {syncedAt?.slice(0, 10) ?? "확인되지 않음"} (원본
          기준일은 데이터에 제공되지 않아 표시하지 않습니다)
        </li>
        <li>
          공개 데이터에 없는 항목, 이용 전 업체에 직접 확인:{" "}
          {c.notProvided.join(" · ")}
        </li>
      </ul>
      <p className="mt-2">
        정보가 사실과 다르면{" "}
        <Link href="/contact" className="underline">
          문의하기
        </Link>
        로 알려 주세요.
      </p>
    </section>
  );
}
