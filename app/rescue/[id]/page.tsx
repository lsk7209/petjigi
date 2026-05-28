import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCachedRescuedAnimal } from "@/lib/db-queries";
import { RescueViewTracker } from "@/components/analytics/rescue-view-tracker";

export const revalidate = 3600;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const SEX_LABEL: Record<string, string> = {
  M: "수컷",
  F: "암컷",
  Q: "미상",
};

const NEUTER_LABEL: Record<string, string> = {
  Y: "중성화 완료",
  N: "미완료",
  U: "미상",
};

function formatDate(s: string | null | undefined): string {
  if (!s) return "—";
  if (s.length === 8) {
    return `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}`;
  }
  return s.slice(0, 10);
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <>
      <dt className="text-xs text-[var(--brand-text-secondary)] font-medium">
        {label}
      </dt>
      <dd className="text-sm text-[var(--brand-text)]">{value}</dd>
    </>
  );
}

export default async function RescueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animal = await getCachedRescuedAnimal(id);

  if (!animal) notFound();

  const noticePeriod =
    animal.noticeSdt || animal.noticeEdt
      ? `${formatDate(animal.noticeSdt)} ~ ${formatDate(animal.noticeEdt)}`
      : null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <RescueViewTracker animalId={id} />
      {/* back link */}
      <Link
        href="/rescue"
        className="inline-flex items-center gap-1 text-xs text-[var(--brand-text-secondary)] hover:text-[var(--brand-accent)] mb-6 transition-colors"
      >
        ← 구조동물 목록으로
      </Link>

      {/* noindex banner */}
      <div className="mb-6 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <span aria-hidden="true" className="mt-0.5 shrink-0">⚠️</span>
        <p>
          구조동물 정보는 검색엔진 수집 제외 페이지입니다. 입양 문의는 해당
          보호센터에 직접 연락하세요.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--brand-border)] overflow-hidden">
        {/* image */}
        {animal.imageUrl && (
          <div className="w-full h-64 bg-[var(--brand-border)] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={animal.imageUrl}
              alt={animal.kindCd ?? "구조동물"}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <h1 className="text-xl font-bold text-[var(--brand-text)] mb-1">
            {animal.kindCd ?? "종류 미상"}
          </h1>

          {animal.noticeNo && (
            <p className="text-xs text-[var(--brand-text-secondary)] mb-6">
              공고번호: {animal.noticeNo}
            </p>
          )}

          {/* notice period */}
          {noticePeriod && (
            <div className="mb-6 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">
              <span className="font-medium">공고 기간</span>{" "}
              {noticePeriod}
            </div>
          )}

          {/* animal details */}
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-[var(--brand-text)] mb-3">
              동물 정보
            </h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              <DetailRow label="성별" value={animal.sexCd ? (SEX_LABEL[animal.sexCd] ?? animal.sexCd) : null} />
              <DetailRow label="중성화" value={animal.neuterYn ? (NEUTER_LABEL[animal.neuterYn] ?? animal.neuterYn) : null} />
              <DetailRow label="나이" value={animal.age} />
              <DetailRow label="체중" value={animal.weight ? `${animal.weight}` : null} />
              <DetailRow label="색상" value={animal.colorCd} />
              <DetailRow
                label="현재 상태"
                value={animal.processState}
              />
            </dl>
          </section>

          {/* happen info */}
          {(animal.happenDate || animal.happenPlace) && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-[var(--brand-text)] mb-3">
                발견 정보
              </h2>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                <DetailRow label="발견일" value={formatDate(animal.happenDate)} />
                <DetailRow label="발견 장소" value={animal.happenPlace} />
              </dl>
            </section>
          )}

          {/* care center */}
          <section className="mb-6 rounded-lg border border-[var(--brand-border)] p-4">
            <h2 className="text-sm font-semibold text-[var(--brand-text)] mb-3">
              보호 센터
            </h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              <DetailRow label="센터명" value={animal.careNm} />
              <DetailRow label="담당자" value={animal.chargeNm} />
              <DetailRow label="관할 기관" value={animal.orgNm} />
            </dl>

            {animal.careTel && (
              <div className="mt-4">
                <a
                  href={`tel:${animal.careTel.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand-accent,#4f7ef7)] text-white text-sm font-medium px-4 py-2 hover:opacity-90 transition-opacity"
                >
                  📞 {animal.careTel}
                </a>
              </div>
            )}

            {animal.careAddr && (
              <p className="mt-3 text-xs text-[var(--brand-text-secondary)]">
                {animal.careAddr}
              </p>
            )}
          </section>

          {/* notice comment */}
          {animal.noticeComment && (
            <section>
              <h2 className="text-sm font-semibold text-[var(--brand-text)] mb-2">
                특이사항
              </h2>
              <p className="text-sm text-[var(--brand-text-secondary)] whitespace-pre-line">
                {animal.noticeComment}
              </p>
            </section>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-[var(--brand-text-secondary)] text-center">
        데이터 출처: 농림축산식품부 APMS 공공데이터포털 (15098931)
      </p>
    </main>
  );
}
