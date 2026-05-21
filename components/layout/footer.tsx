import Link from "next/link";

const FOOTER_LINKS = [
  { label: "소개", href: "/about" },
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "어필리에이트 고지", href: "/disclosure" },
  { label: "광고 정책", href: "/advertising" },
  { label: "문의", href: "/contact" },
];

const CATEGORY_LINKS = [
  { label: "입양·등록", href: "/category/adoption" },
  { label: "사료·영양", href: "/category/nutrition" },
  { label: "건강·의료", href: "/category/health" },
  { label: "보험·법률", href: "/category/insurance" },
  { label: "케어·라이프", href: "/category/care" },
  { label: "장례·추모", href: "/category/memorial" },
];

const SERVICE_LINKS = [
  { label: "동물병원 찾기", href: "/sido/seoul" },
  { label: "유기동물 입양", href: "/rescue" },
  { label: "강아지 품종 정보", href: "/breed/dog" },
  { label: "고양이 품종 정보", href: "/breed/cat" },
  { label: "가이드 전체", href: "/category/health" },
  { label: "펫로스 케어", href: "/guide/pet-loss-care" },
];

const SIDO_LINKS = [
  { label: "서울", href: "/sido/seoul" },
  { label: "경기", href: "/sido/gyeonggi" },
  { label: "부산", href: "/sido/busan" },
  { label: "인천", href: "/sido/incheon" },
  { label: "대구", href: "/sido/daegu" },
  { label: "대전", href: "/sido/daejeon" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--brand-border)] bg-[var(--brand-bg)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* 4단 그리드 링크 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xs font-semibold text-[var(--brand-text)] uppercase tracking-widest mb-3">
              카테고리
            </h3>
            <ul className="space-y-2">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--brand-text-secondary)] hover:text-[var(--brand-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[var(--brand-text)] uppercase tracking-widest mb-3">
              서비스
            </h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--brand-text-secondary)] hover:text-[var(--brand-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[var(--brand-text)] uppercase tracking-widest mb-3">
              지역별
            </h3>
            <ul className="space-y-2">
              {SIDO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--brand-text-secondary)] hover:text-[var(--brand-accent)] transition-colors"
                  >
                    {link.label} 반려동물 정보
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[var(--brand-text)] uppercase tracking-widest mb-3">
              펫지기
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--brand-text-secondary)] hover:text-[var(--brand-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/feed.xml"
                  className="text-sm text-[var(--brand-text-secondary)] hover:text-[var(--brand-accent)] transition-colors"
                  rel="alternate"
                  type="application/rss+xml"
                >
                  RSS 피드
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-[var(--brand-border)] pt-6">
          <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed mb-2">
            펫지기는 공공데이터 기반 반려동물 정보 서비스입니다. 본 사이트의
            정보는 정보 제공 목적이며 의료·법률·보험 자문을 대체하지 않습니다.
            반려동물 건강 문제는 반드시 수의사와 상담하세요.
          </p>
          <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed mb-2">
            <strong>어필리에이트 고지:</strong> 펫지기는 일부 페이지에 제휴(어필리에이트) 링크를 포함합니다.
            링크를 통해 구매·가입 시 수수료를 받을 수 있으나, 추천의 객관성에는 영향을 주지 않습니다.
            자세한 내용은{" "}
            <a href="/disclosure" className="underline hover:text-[var(--brand-accent)] transition-colors">
              어필리에이트 고지
            </a>
            를 확인하세요.
          </p>
          <p className="text-xs text-[var(--brand-text-secondary)]">
            © 2026 펫지기. 지기 시리즈 — 법률지기·금리지기·펫지기
          </p>
        </div>
      </div>
    </footer>
  );
}
