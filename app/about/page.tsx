import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const metadata: Metadata = {
  title: "펫지기 소개",
  description:
    "펫지기는 공공데이터 기반 반려동물 종합 정보 서비스입니다. 편집 기준, 데이터 출처, 콘텐츠 검수 프로세스를 안내합니다.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-12">
      {/* 소개 */}
      <section>
        <h1 className="text-3xl font-bold text-[var(--brand-text)] mb-4">펫지기 소개</h1>
        <p className="text-[var(--brand-text-secondary)] leading-relaxed mb-3">
          펫지기는 반려동물 보호자가 <strong>입양부터 장례까지</strong> 올바른 결정을 내릴 수 있도록
          공공데이터 기반의 신뢰할 수 있는 정보를 제공하는 서비스입니다.
        </p>
        <p className="text-[var(--brand-text-secondary)] leading-relaxed">
          법률지기·금리지기에 이은 <strong>지기 시리즈 3호</strong>로, 광고가 아닌 정보로
          반려동물 보호자를 돕는다는 철학을 이어갑니다.
        </p>
      </section>

      {/* 데이터 출처 */}
      <section>
        <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">데이터 출처</h2>
        <div className="space-y-3">
          {[
            {
              source: "공공데이터포털 (data.go.kr)",
              detail: "동물병원·미용실·펫샵 등 영업장 18종 인허가 정보 (LOCALDATA)",
            },
            {
              source: "농림축산검역본부 (APMS)",
              detail: "전국 동물보호센터, 구조동물 현황, 반려동물 등록대행업체",
            },
            {
              source: "통계청 행정구역 코드",
              detail: "시도·시군구 지역 구분 (17개 시도, 250개 시군구)",
            },
            {
              source: "농림축산식품부 (MAFRA)",
              detail: "반려동물 관련 보험 공시 자료",
            },
          ].map(({ source, detail }) => (
            <div key={source} className="border border-[var(--brand-border)] rounded-lg p-4">
              <p className="font-semibold text-[var(--brand-text)] text-sm mb-0.5">{source}</p>
              <p className="text-xs text-[var(--brand-text-secondary)]">{detail}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--brand-text-secondary)] mt-3">
          * 공공데이터는 자동화된 ETL 파이프라인을 통해 매일~매월 갱신됩니다.
        </p>
      </section>

      {/* 콘텐츠 기준 */}
      <section>
        <h2 className="text-xl font-bold text-[var(--brand-text)] mb-4">콘텐츠 편집 기준</h2>
        <div className="space-y-4 text-[var(--brand-text-secondary)] text-sm leading-relaxed">
          <div>
            <p className="font-semibold text-[var(--brand-text)] mb-1">정보 정확성 우선</p>
            <p>모든 가이드 콘텐츠는 공인된 출처(학술지, 공공기관 자료, 수의학 교재)를 참고하여 작성합니다. 참고 자료는 각 페이지 하단에 공개합니다.</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--brand-text)] mb-1">YMYL 콘텐츠 검수</p>
            <p>건강·의료, 보험·법률, 장례·추모 카테고리(YMYL)의 콘텐츠는 전문가 검토를 거친 후 발행합니다. 검토자 정보는 각 콘텐츠 상단에 표시됩니다.</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--brand-text)] mb-1">광고·어필리에이트 투명성</p>
            <p>어필리에이트 링크가 포함된 페이지는 상단에 고지 배너를 표시하며, 링크에 <code className="text-xs bg-gray-100 px-1 rounded">rel="sponsored nofollow"</code>를 부여합니다. 수수료가 콘텐츠 방향성에 영향을 주지 않습니다.</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--brand-text)] mb-1">금지 표현 자동 스캔</p>
            <p>약사법·동물의료법 금지 표현("치료를 보장한다", "확실히 낫는다" 등)은 자동 정규식 스캐너로 차단합니다.</p>
          </div>
        </div>
      </section>

      {/* 문의 */}
      <section className="border-t border-[var(--brand-border)] pt-8">
        <h2 className="text-xl font-bold text-[var(--brand-text)] mb-3">문의</h2>
        <p className="text-[var(--brand-text-secondary)] text-sm mb-2">
          데이터 오류 신고, 콘텐츠 제안, 제휴 문의는 아래 이메일로 연락해 주세요.
        </p>
        <a
          href="mailto:contact@petjigi.kr"
          className="text-[var(--brand-accent)] hover:underline font-medium"
        >
          contact@petjigi.kr
        </a>
      </section>
    </main>
  );
}
