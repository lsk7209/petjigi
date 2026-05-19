import { db } from "@/db/client";
import { reviewQueue } from "@/db/schema";
import type { ReviewQueueItem } from "@/db/schema";
import { asc } from "drizzle-orm";
import { approveContent, rejectContent } from "./actions";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// 우선순위 배지 색상
function PriorityBadge({ priority }: { priority: number }) {
  const colors: Record<number, string> = {
    1: "bg-red-100 text-red-700 border border-red-300",
    2: "bg-orange-100 text-orange-700 border border-orange-300",
    3: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    4: "bg-blue-100 text-blue-700 border border-blue-300",
    5: "bg-gray-100 text-gray-600 border border-gray-300",
  };
  const label: Record<number, string> = {
    1: "P1 긴급",
    2: "P2 높음",
    3: "P3 보통",
    4: "P4 낮음",
    5: "P5 최저",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[priority] ?? colors[3]}`}
    >
      {label[priority] ?? `P${priority}`}
    </span>
  );
}

// 상태 배지 색상
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-800 border border-yellow-300",
    in_review: "bg-blue-50 text-blue-800 border border-blue-300",
    approved: "bg-green-50 text-green-800 border border-green-300",
    rejected: "bg-red-50 text-red-800 border border-red-300",
  };
  const label: Record<string, string> = {
    pending: "대기",
    in_review: "검수 중",
    approved: "승인",
    rejected: "거부",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[status] ?? "bg-gray-100 text-gray-600"}`}
    >
      {label[status] ?? status}
    </span>
  );
}

// 사유 표시
function ReasonLabel({ reason }: { reason: string | null }) {
  if (!reason) return <span className="text-gray-400 text-xs">-</span>;
  const label: Record<string, string> = {
    ymyl_required: "YMYL 필수",
    flagged_keyword: "금지 키워드",
    periodic: "정기 검수",
  };
  return (
    <span className="text-xs text-gray-600">{label[reason] ?? reason}</span>
  );
}

// 승인 폼
function ApproveForm({ id }: { id: string }) {
  const approve = approveContent.bind(null, id);
  return (
    <form action={approve}>
      <button
        type="submit"
        className="px-3 py-1 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
      >
        승인
      </button>
    </form>
  );
}

// 거부 폼
function RejectForm({ id }: { id: string }) {
  const reject = rejectContent.bind(null, id);
  return (
    <form action={reject} className="flex items-center gap-1">
      <input
        type="text"
        name="notes"
        placeholder="거부 사유"
        className="text-xs border border-gray-300 rounded px-2 py-1 w-28 focus:outline-none focus:ring-1 focus:ring-red-400"
      />
      <button
        type="submit"
        className="px-3 py-1 text-xs font-medium rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
      >
        거부
      </button>
    </form>
  );
}

function formatDate(isoString: string | null): string {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface PageProps {
  searchParams: Promise<{ key?: string; status?: string }>;
}

export default async function ReviewQueuePage({ searchParams }: PageProps) {
  const { key, status } = await searchParams;

  // 간단한 쿼리 파라미터 키 인증
  if (!key || key !== process.env.CRON_SECRET) {
    notFound();
  }

  const items: ReviewQueueItem[] = await db
    .select()
    .from(reviewQueue)
    .orderBy(asc(reviewQueue.priority), asc(reviewQueue.createdAt));

  // 상태 필터링 (status 파라미터가 있을 때)
  const filtered =
    status && ["pending", "in_review", "approved", "rejected"].includes(status)
      ? items.filter((item) => item.status === status)
      : items;

  const pendingCount = items.filter((i) => i.status === "pending").length;
  const inReviewCount = items.filter((i) => i.status === "in_review").length;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">YMYL 검수 큐</h1>
        <p className="text-sm text-gray-500">
          YMYL 카테고리(건강·의료, 보험·법률, 장례·추모) 콘텐츠 검수 현황
        </p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "전체", value: items.length, href: `?key=${key}` },
          {
            label: "대기",
            value: pendingCount,
            href: `?key=${key}&status=pending`,
          },
          {
            label: "검수 중",
            value: inReviewCount,
            href: `?key=${key}&status=in_review`,
          },
          {
            label: "완료",
            value: items.filter(
              (i) => i.status === "approved" || i.status === "rejected",
            ).length,
            href: `?key=${key}&status=approved`,
          },
        ].map(({ label, value, href }) => (
          <a
            key={label}
            href={href}
            className="block rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-gray-400 transition-colors"
          >
            <p className="text-xs text-gray-500 mb-0.5">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </a>
        ))}
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { label: "전체", value: "" },
          { label: "대기", value: "pending" },
          { label: "검수 중", value: "in_review" },
          { label: "승인", value: "approved" },
          { label: "거부", value: "rejected" },
        ].map(({ label, value }) => {
          const isActive = (status ?? "") === value;
          return (
            <a
              key={value}
              href={value ? `?key=${key}&status=${value}` : `?key=${key}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </a>
          );
        })}
      </div>

      {/* 테이블 */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center text-gray-400 text-sm">
          검수 아이템이 없습니다.
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    우선순위
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    콘텐츠 ID
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    유형
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    사유
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    상태
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    담당자
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    등록일
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    메모
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <PriorityBadge priority={item.priority} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-700 max-w-[160px] truncate">
                      {item.contentId}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {item.contentType}
                    </td>
                    <td className="px-4 py-3">
                      <ReasonLabel reason={item.reason} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {item.assignedTo ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[150px] truncate">
                      {item.notes ?? "-"}
                    </td>
                    <td className="px-4 py-3">
                      {(item.status === "pending" ||
                        item.status === "in_review") && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <ApproveForm id={item.id} />
                          <RejectForm id={item.id} />
                        </div>
                      )}
                      {(item.status === "approved" ||
                        item.status === "rejected") && (
                        <span className="text-xs text-gray-400">
                          {formatDate(item.resolvedAt)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-gray-400">
        총 {filtered.length}건 표시 / 전체 {items.length}건
      </p>
    </main>
  );
}
