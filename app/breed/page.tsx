import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

const BREADCRUMB = breadcrumbSchema([
  { name: "홈", url: SITE_URL },
  { name: "견종·묘종 도감", url: `${SITE_URL}/breed` },
]);

const FAQ = faqSchema([
  {
    question: "강아지 품종을 선택할 때 가장 중요한 기준은 무엇인가요?",
    answer: "생활 공간 크기, 운동량, 털 알레르기 여부, 평균 의료비를 우선 고려하세요. 아파트 거주라면 소형견이나 활동성이 낮은 품종이 적합하며, 운동을 좋아한다면 활발한 중·대형견도 잘 어울립니다.",
    url: `${SITE_URL}/breed`,
  },
  {
    question: "저알레르기 강아지 품종은 무엇이 있나요?",
    answer: "털 빠짐이 적은 말티즈, 푸들, 비숑 프리제, 슈나우저 등이 알레르기 반응이 상대적으로 낮은 편입니다. 단, 완전한 '알레르기 없음' 품종은 없으므로 입양 전 직접 접촉 테스트를 권장합니다.",
    url: `${SITE_URL}/breed/dog`,
  },
  {
    question: "고양이 품종마다 성격 차이가 있나요?",
    answer: "네, 품종마다 특성이 다릅니다. 랙돌·페르시안은 조용하고 온순한 편이고, 벵갈·아비시니안은 활발하고 에너지가 넘칩니다. 처음 고양이를 키운다면 온순한 품종부터 시작하는 것이 적응이 쉽습니다.",
    url: `${SITE_URL}/breed/cat`,
  },
  {
    question: "특정 품종에서 자주 나타나는 건강 문제는 어디서 확인하나요?",
    answer: "각 품종 상세 페이지에서 '주의해야 할 질환'을 확인하세요. 불독·퍼그 등 단두종은 호흡기 문제, 닥스훈트는 척추 디스크, 골든 리트리버는 고관절 이형성증에 주의가 필요합니다.",
    url: `${SITE_URL}/condition`,
  },
]);

export const metadata: Metadata = {
  title: "견종·묘종 도감 — 강아지·고양이·소동물 품종 정보 | 펫지기",
  description:
    "강아지·고양이·소동물 품종별 특징, 성격, 평균 수명, 건강 정보를 한눈에 확인하세요. 공공데이터 기반 펫지기 견종·묘종 도감입니다.",
  alternates: { canonical: "/breed" },
  openGraph: {
    title: "견종·묘종 도감 | 펫지기",
    description: "강아지·고양이·소동물 품종별 특징과 건강 정보를 확인하세요.",
  },
};

const SPECIES = [
  {
    slug: "dog",
    emoji: "🐕",
    label: "강아지",
    subLabel: "품종 도감",
    desc: "말티즈, 포메라니안, 골든 리트리버 등 강아지 품종별 특징·성격·수명·건강 정보",
    highlights: ["소형견", "중형견", "대형견", "장모종", "단모종"],
  },
  {
    slug: "cat",
    emoji: "🐈",
    label: "고양이",
    subLabel: "품종 도감",
    desc: "랙돌, 브리티시 쇼트헤어, 페르시안 등 고양이 품종별 특징·성격·털 관리 정보",
    highlights: ["실내형", "활동적", "장모종", "단모종", "저알레르기"],
  },
  {
    slug: "small",
    emoji: "🐹",
    label: "소동물",
    subLabel: "품종 도감",
    desc: "토끼, 기니피그, 햄스터, 친칠라 등 소동물 품종 정보",
    highlights: ["토끼", "기니피그", "햄스터", "친칠라"],
  },
];

const HOW_TO_CHOOSE = [
  { step: "1", title: "생활 공간 확인", desc: "아파트·소형 주거라면 소형견·실내 고양이가 적합합니다." },
  { step: "2", title: "운동량·활동성 파악", desc: "본인의 운동 습관과 맞는 품종을 선택하면 함께하기 편합니다." },
  { step: "3", title: "털 알레르기 확인", desc: "알레르기가 있다면 저알레르기 품종이나 단모종을 고려하세요." },
  { step: "4", title: "수명·의료비 고려", desc: "품종마다 유전 질환과 평균 의료비가 다릅니다. 장기적으로 준비하세요." },
];

export default function BreedIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="text-xs text-[var(--brand-text-secondary)] mb-6 flex items-center gap-1.5" aria-label="breadcrumb">
          <Link href="/" className="hover:text-[var(--brand-accent)] transition-colors">홈</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[var(--brand-text)]" aria-current="page">견종·묘종 도감</span>
        </nav>

        {/* 헤더 */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-3">
            견종·묘종 도감
          </h1>
          <p className="text-[var(--brand-text-secondary)] leading-relaxed max-w-2xl">
            강아지·고양이·소동물 품종별 특징, 성격, 평균 수명, 흔한 질병 정보를 확인하세요.
            입양 전 품종의 특성을 파악하면 더 행복한 반려 생활을 시작할 수 있습니다.
          </p>
        </div>

        {/* 품종 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {SPECIES.map((s) => (
            <Link
              key={s.slug}
              href={`/breed/${s.slug}`}
              className="group p-6 rounded-[var(--radius-card)] border border-[var(--brand-border)] hover:border-[var(--brand-accent)] hover:shadow-sm transition-all"
            >
              <p className="text-4xl mb-3">{s.emoji}</p>
              <h2 className="text-xl font-bold text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors mb-0.5">
                {s.label}
              </h2>
              <p className="text-xs text-[var(--brand-text-secondary)] mb-3">{s.subLabel}</p>
              <p className="text-sm text-[var(--brand-text-secondary)] leading-relaxed mb-4">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-border)] text-[var(--brand-text-secondary)]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>

        {/* 품종 선택 가이드 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-5">
            품종 선택 전 체크할 것
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_TO_CHOOSE.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-[var(--radius-card)] border border-[var(--brand-border)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--brand-accent)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-[var(--brand-text)] text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 pt-8 border-t border-[var(--brand-border)]" aria-label="자주 묻는 질문">
          <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">견종·묘종 자주 묻는 질문</h2>
          <dl className="space-y-3">
            {[
              { q: "강아지 품종을 선택할 때 가장 중요한 기준은?", a: "생활 공간 크기, 운동량, 털 알레르기 여부, 평균 의료비를 우선 고려하세요. 아파트 거주라면 소형견이나 활동성이 낮은 품종이 적합하며, 운동을 좋아한다면 활발한 중·대형견도 잘 어울립니다." },
              { q: "저알레르기 강아지 품종은 무엇이 있나요?", a: "말티즈, 푸들, 비숑 프리제, 슈나우저 등이 알레르기 반응이 상대적으로 낮은 편입니다. 단, 완전한 알레르기 없음 품종은 없으므로 입양 전 직접 접촉 테스트를 권장합니다." },
              { q: "고양이 품종마다 성격 차이가 있나요?", a: "네, 품종마다 특성이 다릅니다. 랙돌·페르시안은 조용하고 온순한 편이고, 벵갈·아비시니안은 활발하고 에너지가 넘칩니다. 처음 고양이를 키운다면 온순한 품종부터 시작하는 것이 적응이 쉽습니다." },
              { q: "특정 품종의 흔한 질환은 어디서 확인하나요?", a: "각 품종 상세 페이지에서 주의해야 할 질환을 확인하세요. 불독·퍼그 등 단두종은 호흡기 문제, 닥스훈트는 척추 디스크, 골든 리트리버는 고관절 이형성증에 주의가 필요합니다." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--brand-border)] p-4">
                <dt className="font-semibold text-sm text-[var(--brand-text)] mb-1.5">Q. {item.q}</dt>
                <dd className="text-sm text-[var(--brand-text-secondary)] leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 관련 링크 */}
        <section className="border-t border-[var(--brand-border)] pt-8">
          <h2 className="text-base font-semibold text-[var(--brand-text)] mb-4">함께 보면 좋은 정보</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/category/adoption" className="text-sm text-[var(--brand-accent)] hover:underline">
              🐾 입양·등록 가이드 →
            </Link>
            <Link href="/condition" className="text-sm text-[var(--brand-accent)] hover:underline">
              💊 질병·증상 정보 →
            </Link>
            <Link href="/category/health" className="text-sm text-[var(--brand-accent)] hover:underline">
              🏥 건강·의료 정보 →
            </Link>
            <Link href="/insurance/compare" className="text-sm text-[var(--brand-accent)] hover:underline">
              📋 펫보험 비교 →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
