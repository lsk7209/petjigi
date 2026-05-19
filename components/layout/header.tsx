import Link from "next/link";
import { CATEGORIES } from "@/lib/category";

const NAV_CATEGORIES = Object.values(CATEGORIES).map((c) => ({
  name: c.name,
  href: `/category/${c.slug}`,
}));

export function Header() {
  return (
    <header className="border-b border-[var(--brand-border)] bg-[var(--brand-bg)] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg text-[var(--brand-text)] tracking-tight"
        >
          🐾 펫지기
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_CATEGORIES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm rounded-[var(--radius-button)] text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-[var(--brand-border)] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/guide/pet-loss-care"
          className="text-sm text-[var(--brand-accent)] hover:underline hidden md:block"
        >
          펫로스 케어 →
        </Link>
      </div>
    </header>
  );
}
