const OFFICIAL_SOURCES = [
  {
    name: "국가동물보호정보시스템",
    href: "https://www.animal.go.kr/",
    description: "유실·유기동물, 동물보호센터, 입양 공고를 확인할 때 우선 대조하는 공식 서비스입니다.",
  },
  {
    name: "공공데이터포털",
    href: "https://www.data.go.kr/",
    description: "지역별 보호소·병원·등록대행기관 등 공개 데이터의 출처와 갱신 기준을 확인합니다.",
  },
  {
    name: "농림축산식품부",
    href: "https://www.mafra.go.kr/",
    description: "동물보호법, 반려동물 정책, 등록제 안내처럼 제도 해석이 필요한 정보를 확인합니다.",
  },
];

export function AdsenseTrustSection({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className="pj-card"
      style={{
        padding: compact ? 20 : 28,
        marginTop: compact ? 24 : 40,
        borderColor: "var(--brand-border)",
      }}
      aria-label="정보 검증 기준"
    >
      <span className="pj-eyebrow">검증 기준</span>
      <h2 className="pj-display" style={{ fontSize: compact ? 22 : 28, marginTop: 8, marginBottom: 12 }}>
        반려동물 정보는 공식 자료와 현장 확인 기준을 함께 봅니다.
      </h2>
      <p style={{ color: "var(--brand-text-secondary)", fontSize: 15, lineHeight: 1.75, wordBreak: "keep-all" }}>
        펫지기는 업체 목록을 그대로 나열하는 데서 끝내지 않고, 방문 전 확인해야 할 항목을 함께
        정리합니다. 영업 여부, 전화 확인, 등록·허가 정보, 응급 대응 가능 여부는 실제 이용 전에
        다시 확인하도록 안내하며, 의료·법률·보험 정보는 공식 기관 자료를 우선 기준으로 삼습니다.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3" style={{ marginTop: 18 }}>
        {OFFICIAL_SOURCES.map((source) => (
          <a
            key={source.href}
            className="pj-card pj-card-hover"
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: 16, textDecoration: "none", color: "inherit", background: "var(--brand-surface)" }}
          >
            <strong style={{ display: "block", fontSize: 14, marginBottom: 6 }}>{source.name}</strong>
            <span style={{ display: "block", color: "var(--brand-text-secondary)", fontSize: 13, lineHeight: 1.6 }}>
              {source.description}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
