import Link from "next/link";

const CATEGORY_LINKS = [
  { label: "입양·등록",   href: "/category/adoption" },
  { label: "사료·영양",   href: "/category/nutrition" },
  { label: "건강·의료",   href: "/category/health" },
  { label: "보험·반려동물법", href: "/category/insurance" },
  { label: "케어·라이프", href: "/category/care" },
  { label: "장례·추모",   href: "/category/memorial" },
];

const SIDO_LINKS = [
  { label: "서울특별시", href: "/sido/seoul" },
  { label: "경기도",     href: "/sido/gyeonggi" },
  { label: "부산광역시", href: "/sido/busan" },
  { label: "대구광역시", href: "/sido/daegu" },
  { label: "전체 17개 시·도", href: "/sido/seoul" },
];

const COMPANY_LINKS = [
  { label: "소개",              href: "/about" },
  { label: "자료 출처·검토 정책", href: "/about" },
  { label: "광고·제휴 안내",    href: "/advertising" },
  { label: "개인정보처리방침",   href: "/privacy" },
  { label: "이용약관",          href: "/terms" },
  { label: "문의",              href: "/contact" },
];

export function Footer() {
  return (
    <footer className="pj-footer">
      <div className="pj-container-7xl" style={{ padding: "56px 32px 32px" }}>
        {/* 4열 그리드 */}
        <div
          className="grid gap-10 mb-10"
          style={{ gridTemplateColumns: "1.6fr 1fr 1fr 1fr" }}
        >
          {/* 브랜드 소개 */}
          <div>
            <Link href="/" className="pj-logo" style={{ marginBottom: 14, display: "inline-flex" }}>
              <span className="pj-logo-mark" aria-hidden="true" />
              펫지기
            </Link>
            <p className="pj-tiny" style={{ marginTop: 14, maxWidth: 320, lineHeight: 1.7 }}>
              공공데이터 기반 전국 30,000+ 동물병원·펫미용·펫호텔·장묘업체와
              반려동물 가이드를 한 곳에서 만나보세요.
            </p>
            <p className="pj-tiny" style={{ marginTop: 12, lineHeight: 1.6 }}>
              자료 출처: 행정안전부 공공데이터포털 · 농림축산검역본부 · 국가동물보호정보시스템
            </p>
          </div>

          {/* 카테고리 */}
          <div>
            <h4>카테고리</h4>
            <ul className="space-y-2">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 지역별 */}
          <div>
            <h4>지역별</h4>
            <ul className="space-y-2">
              {SIDO_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 정보 */}
          <div>
            <h4>회사 정보</h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <a href="/feed.xml" rel="alternate" type="application/rss+xml">
                  RSS 피드
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="pj-hr" />

        {/* 법적 고지 + 저작권 */}
        <div
          className="flex justify-between items-start flex-wrap gap-6"
          style={{ paddingTop: 24 }}
        >
          <div className="pj-tiny" style={{ maxWidth: 620, lineHeight: 1.7 }}>
            <strong style={{ color: "var(--brand-text)" }}>(주)펫지기</strong> · 반려동물 정보 서비스
            <br />
            본 사이트는 정보 제공을 목적으로 하며, 의료·법률·재정적 결정에 대한 최종 책임은 이용자 본인에게 있습니다.
            <br />
            <strong style={{ color: "var(--brand-text)" }}>어필리에이트 고지:</strong> 펫지기는 일부 링크를 통해 수수료를 받을 수 있습니다.{" "}
            <Link href="/disclosure" style={{ color: "var(--brand-accent-warm)", textDecoration: "underline" }}>
              자세히 보기
            </Link>
          </div>
          <div className="pj-tiny">© 2026 PetJigi. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
