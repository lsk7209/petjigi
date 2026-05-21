"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/category";

const NAV_CATEGORIES = Object.values(CATEGORIES).map((c) => ({
  name: c.name,
  href: `/category/${c.slug}`,
}));

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--brand-border)] bg-[var(--brand-bg)] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg text-[var(--brand-text)] tracking-tight"
          onClick={() => setOpen(false)}
        >
          🐾 펫지기
        </Link>

        {/* 데스크톱 Nav */}
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

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/search"
            className="text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] transition-colors"
            aria-label="검색"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </Link>
          <Link
            href="/guide/pet-loss-care"
            className="text-sm text-[var(--brand-accent)] hover:underline"
          >
            펫로스 케어 →
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-[var(--brand-border)] transition-colors"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-5 h-0.5 bg-[var(--brand-text)] mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-[var(--brand-text)] mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-[var(--brand-text)] transition-all" />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <nav className="md:hidden border-t border-[var(--brand-border)] bg-[var(--brand-bg)] px-4 py-3 flex flex-col gap-1.5">
          {NAV_CATEGORIES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-sm rounded-[var(--radius-button)] text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-[var(--brand-border)] transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-[var(--brand-border)] mt-1 pt-2">
            <Link
              href="/guide/pet-loss-care"
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-sm text-[var(--brand-accent)] hover:bg-[var(--brand-border)] rounded-[var(--radius-button)] transition-colors block"
            >
              펫로스 케어 →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
