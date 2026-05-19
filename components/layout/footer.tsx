import Link from "next/link";

const FOOTER_LINKS = [
  { label: "소개", href: "/about" },
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "어필리에이트 고지", href: "/disclosure" },
  { label: "광고 정책", href: "/advertising" },
  { label: "문의", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--brand-border)] bg-[var(--brand-bg)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-4">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-[var(--brand-text-secondary)] leading-relaxed mb-2">
          펫지기는 공공데이터 기반 반려동물 정보 서비스입니다. 본 사이트의 정보는
          정보 제공 목적이며 의료·법률·보험 자문을 대체하지 않습니다.
        </p>

        <p className="text-xs text-[var(--brand-text-secondary)]">
          © 2026 펫지기. 지기 시리즈 — 법률지기·금리지기·펫지기
        </p>
      </div>
    </footer>
  );
}
