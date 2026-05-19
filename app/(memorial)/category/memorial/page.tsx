import type { Metadata } from "next";
import Link from "next/link";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";

export const metadata: Metadata = {
  title: "장례·추모",
  description:
    "반려동물 장묘업체 찾기, 장례 절차·비용 안내, 펫로스 케어 가이드. 소중한 가족을 조용히, 따뜻하게 떠나보낼 수 있도록 함께합니다.",
};

const GUIDE_LINKS = [
  {
    href: "/guide/memorial-ceremony",
    title: "장례 절차 안내",
    desc: "접수부터 안치·화장·봉안까지 단계별 절차를 설명합니다.",
  },
  {
    href: "/guide/memorial-cost",
    title: "장례 비용 가이드",
    desc: "화장·납골·수목장 유형별 평균 비용 범위를 정리했습니다.",
  },
  {
    href: "/guide/petloss-care",
    title: "펫로스 케어 가이드",
    desc: "반려동물을 잃은 슬픔을 회복하는 데 도움이 되는 정보입니다.",
  },
  {
    href: "/guide/petloss-faq",
    title: "자주 묻는 질문",
    desc: "장례 서류, 유해 처리, 가족 동반 참석 등 실무 Q&A입니다.",
  },
];

const SIDO_LIST = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

export default function MemorialCategoryPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-3">
          장례·추모
        </h1>
        <p className="text-[var(--brand-text-secondary)] leading-relaxed">
          소중한 반려동물을 떠나보내는 일은 쉽지 않습니다.
          <br />
          장묘업체 찾기부터 펫로스 회복까지, 조용히 함께하겠습니다.
        </p>
      </div>

      <YmylDisclaimer categoryId={6} />

      {/* 가이드 링크 */}
      <section className="mt-10 mb-12">
        <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-4">
          펫로스 케어 가이드
        </h2>
        <ul className="space-y-3">
          {GUIDE_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col p-5 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors"
              >
                <span className="font-semibold text-[var(--brand-text)] mb-1">
                  {item.title}
                </span>
                <span className="text-sm text-[var(--brand-text-secondary)]">
                  {item.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 지역별 장묘업체 */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--brand-text)] mb-2">
          지역별 장묘업체 찾기
        </h2>
        <p className="text-sm text-[var(--brand-text-secondary)] mb-5">
          공공데이터 기반 등록 장묘업체 목록입니다.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {SIDO_LIST.map((sido) => (
            <Link
              key={sido}
              href={`/sido/${encodeURIComponent(sido)}?type=memorial`}
              className="p-3 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] text-sm text-center transition-colors text-[var(--brand-text)]"
            >
              {sido}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
