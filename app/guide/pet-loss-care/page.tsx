import type { Metadata } from "next";
import { SubscribeForm } from "@/components/forms/subscribe-form";
import { YmylDisclaimer } from "@/components/content/ymyl-disclaimer";
import { faqSchema, articleSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";
const PAGE_URL = `${SITE_URL}/guide/pet-loss-care`;

export const metadata: Metadata = {
  title: "펫로스 증후군 극복 가이드 — 반려동물을 떠나보낸 보호자를 위해",
  description:
    "반려동물과의 이별 후 찾아오는 펫로스 증후군의 증상과 슬픔을 건강하게 극복하는 방법을 안내합니다. 전문가 검토 콘텐츠 + 무료 케어 가이드 PDF 제공.",
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "펫로스 증후군 극복 가이드 — 반려동물을 떠나보낸 보호자를 위해",
    description:
      "반려동물과의 이별 후 찾아오는 펫로스 증후군의 증상과 슬픔을 건강하게 극복하는 방법을 안내합니다.",
    images: [{ url: "/og-pet-loss-care.png", width: 1200, height: 630 }],
    siteName: "펫지기",
    locale: "ko_KR",
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

const articleJsonLd = articleSchema({
  title: "펫로스 증후군 극복 가이드",
  url: PAGE_URL,
  authorName: "펫지기 편집팀",
  authorCredential: "반려동물 전문 콘텐츠 에디터",
  publishedAt: "2025-01-15",
  reviewedAt: "2026-03-01",
  reviewerName: "동물행동심리 전문가",
  isYmyl: true,
});

const faqJsonLd = faqSchema([
  {
    question: "펫로스 증후군은 얼마나 지속되나요?",
    answer:
      "개인차가 크며, 일반적으로 수 주에서 수 개월까지 이어질 수 있습니다. 일상생활이 6개월 이상 어려울 경우 전문 심리상담사의 도움을 받으시기 바랍니다.",
  },
  {
    question: "펫로스 증후군의 주요 증상은 무엇인가요?",
    answer:
      "슬픔·죄책감·분노·허탈감 등 다양한 감정 반응, 수면 장애, 식욕 저하, 집중력 저하 등이 나타날 수 있습니다. 이는 정상적인 애도 반응입니다.",
  },
  {
    question: "펫로스 증후군을 극복하려면 어떻게 해야 하나요?",
    answer:
      "감정을 억누르지 않고 충분히 애도하는 것이 중요합니다. 가족·친구와 감정을 나누거나, 펫로스 자조 모임을 활용하는 것도 도움이 됩니다. 전문 심리상담도 효과적인 방법입니다.",
  },
]);

export default function PetLossCarePage() {
  return (
    <>
      {/* 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Memorial 모드 (카테고리 6 — 장례·추모) */}
      <div data-mode="memorial">
        <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">
          {/* ── 페이지 헤더 ── */}
          <header>
            <p className="text-xs font-medium tracking-widest text-[var(--brand-accent)] uppercase mb-3">
              장례·추모 · 펫로스 케어
            </p>
            <h1 className="text-3xl font-bold text-[var(--brand-text)] leading-tight mb-4">
              반려동물을 떠나보낸 당신에게
              <br />
              <span className="text-[var(--brand-accent)]">펫로스 케어 가이드</span>
            </h1>
            <p className="text-sm text-[var(--brand-text-secondary)]">
              검토일: 2026년 3월 1일 · 검토: 동물행동심리 전문가
            </p>
          </header>

          {/* YMYL 면책문 (카테고리 6) */}
          <YmylDisclaimer categoryId={6} />

          {/* ── 가이드 본문 (정적) ── */}
          <article className="space-y-8 text-[var(--brand-text)]">
            <section>
              <h2 className="text-xl font-semibold mb-3">펫로스 증후군이란?</h2>
              <p className="text-[15px] leading-relaxed text-[var(--brand-text-secondary)]">
                오랫동안 함께한 반려동물을 잃은 후 경험하는 깊은 슬픔과 상실감을{" "}
                <strong className="text-[var(--brand-text)]">펫로스 증후군(Pet Loss Syndrome)</strong>이라고 합니다.
                이는 가족을 잃은 것과 다르지 않은 정상적인 애도 반응입니다. 죄책감, 분노, 무기력함, 수면 장애 등 다양한 형태로 나타날 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">슬픔의 5단계</h2>
              <ol className="space-y-3 text-[15px]">
                {[
                  { step: "1. 부정", desc: "사실을 받아들이기 어려워 현실을 부정합니다." },
                  { step: "2. 분노", desc: "왜 이런 일이 생겼는지에 대한 분노가 찾아옵니다." },
                  { step: "3. 협상", desc: "\"더 잘해줬더라면\"이라는 후회와 자책이 생깁니다." },
                  { step: "4. 우울", desc: "깊은 슬픔과 공허함, 의욕 저하가 동반됩니다." },
                  { step: "5. 수용", desc: "이별을 받아들이고 추억을 긍정적으로 간직합니다." },
                ].map(({ step, desc }) => (
                  <li key={step} className="flex gap-3">
                    <span className="shrink-0 font-semibold text-[var(--brand-accent)] w-20">
                      {step}
                    </span>
                    <span className="text-[var(--brand-text-secondary)]">{desc}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-[var(--brand-text-secondary)]">
                * 모든 사람이 이 순서대로 경험하지는 않으며, 여러 단계를 반복할 수도 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">회복을 돕는 방법</h2>
              <ul className="space-y-3 text-[15px] text-[var(--brand-text-secondary)]">
                {[
                  "감정을 억누르지 말고, 충분히 슬퍼할 시간을 허락하세요.",
                  "가족, 친구, 또는 펫로스를 이해하는 커뮤니티와 감정을 나누세요.",
                  "반려동물의 흔적을 갑자기 치우는 것보다 자신의 속도에 맞게 정리하세요.",
                  "규칙적인 식사와 수면, 가벼운 산책으로 신체를 돌보세요.",
                  "필요하다면 전문 심리상담사나 정신건강복지센터의 도움을 구하세요.",
                  "새 반려동물 입양은 충분히 회복된 뒤 신중하게 결정하세요.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--brand-accent)] shrink-0 mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">도움받을 수 있는 곳</h2>
              <div className="rounded-[var(--radius-card)] border border-[var(--brand-border)] overflow-hidden text-sm">
                {[
                  { name: "정신건강 위기상담 전화", contact: "1577-0199 (24시간)" },
                  { name: "자살예방상담전화", contact: "1393 (24시간)" },
                  { name: "한국생명의전화", contact: "1588-9191 (24시간)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 border-b border-[var(--brand-border)] last:border-0"
                  >
                    <span className="text-[var(--brand-text)]">{item.name}</span>
                    <span className="font-semibold text-[var(--brand-accent)]">{item.contact}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-semibold mb-4">자주 묻는 질문</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "펫로스 증후군은 얼마나 지속되나요?",
                    a: "개인차가 크며, 수 주에서 수 개월까지 이어질 수 있습니다. 일상생활이 6개월 이상 어려울 경우 전문 심리상담사의 도움을 받으세요.",
                  },
                  {
                    q: "주변에서 \"그냥 동물인데\"라고 할 때 어떻게 해야 하나요?",
                    a: "반려동물과의 유대는 매우 깊습니다. 당신의 슬픔은 충분히 정당하며, 이를 이해하는 커뮤니티나 전문가와 함께하는 것이 도움됩니다.",
                  },
                ].map(({ q, a }, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-[var(--brand-border)] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer text-sm font-medium text-[var(--brand-text)] select-none list-none">
                      {q}
                      <span className="shrink-0 text-[var(--brand-text-secondary)] transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-[var(--brand-text-secondary)] leading-relaxed border-t border-[var(--brand-border)] pt-3">
                      {a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* ── 이메일 게이트: 무료 PDF 받기 ── */}
          <section aria-labelledby="pdf-gate-heading" className="border-t border-[var(--brand-border)] pt-10">
            <div className="text-center mb-6">
              <p className="text-xs font-semibold tracking-widest text-[var(--brand-accent)] uppercase mb-2">
                무료 리소스
              </p>
              <h2
                id="pdf-gate-heading"
                className="text-2xl font-bold text-[var(--brand-text)] mb-2"
              >
                펫로스 케어 가이드 PDF 받기
              </h2>
              <p className="text-sm text-[var(--brand-text-secondary)] max-w-md mx-auto">
                슬픔 극복 단계별 실천법, 전문 기관 연락처, 추모 의식 아이디어를 담은
                14페이지 가이드를 무료로 보내드립니다.
              </p>
            </div>

            <SubscribeForm
              source="pet_loss_care"
              showMarketingConsent={true}
              className="max-w-md mx-auto"
            />
          </section>

          {/* 면책문 — 카테고리 6 YMYL 필수 */}
          <div
            role="note"
            aria-label="면책 고지"
            className="rounded-xl bg-[var(--brand-border)]/50 border border-[var(--brand-border)] px-5 py-4 text-xs text-[var(--brand-text-secondary)] leading-relaxed"
          >
            <p className="font-semibold text-[var(--brand-text)] mb-1">면책 고지</p>
            <p>
              본 콘텐츠는 정보 제공 및 슬픔 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다.
              펫로스로 일상이 어렵다면 전문 심리상담사 또는 정신건강복지센터(☎ 1577-0199)의 도움을 받으세요.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
