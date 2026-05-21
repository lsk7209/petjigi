"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "홈",     href: "/" },
  { label: "카테고리", href: "/category/health" },
  { label: "동물병원", href: "/sido/seoul" },
  { label: "펫보험",  href: "/insurance/compare" },
  { label: "가이드",  href: "/category/health" },
  { label: "견종도감", href: "/breed/dog" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pj-header">
      <div className="pj-header-inner">
        {/* 로고 */}
        <Link
          href="/"
          className="pj-logo"
          onClick={() => setOpen(false)}
        >
          <span className="pj-logo-mark" aria-hidden="true" />
          펫지기
        </Link>

        {/* 데스크탑 Nav */}
        <nav className="pj-nav hidden md:flex" aria-label="주요 메뉴">
          {NAV_LINKS.map((item) => (
            <Link key={item.href + item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* 우측 액션 */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/search"
            className="pj-btn pj-btn-ghost pj-btn-sm"
            aria-label="검색"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
            </svg>
            검색
          </Link>
          <Link href="/guide/pet-loss-care" className="pj-btn pj-btn-ghost pj-btn-sm">
            로그인
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          type="button"
          className="md:hidden pj-btn pj-btn-ghost pj-btn-sm"
          style={{ padding: 0, width: 40, height: 40, justifyContent: "center" }}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
      </div>

      {/* 모바일 카테고리 칩 바 */}
      {open && (
        <div className="md:hidden border-t border-[var(--brand-border)] bg-[var(--brand-bg)]">
          {/* 카테고리 칩 스크롤 */}
          <div className="flex gap-1.5 px-4 py-2 overflow-x-auto">
            {[
              { slug: "health",   name: "건강·의료",    color: "var(--cat-3)",   soft: "var(--cat-3-soft)" },
              { slug: "food",     name: "사료·영양",    color: "var(--cat-2)",   soft: "var(--cat-2-soft)" },
              { slug: "insurance",name: "보험·법률",    color: "var(--cat-4)",   soft: "var(--cat-4-soft)" },
              { slug: "care",     name: "케어·라이프",  color: "var(--cat-5)",   soft: "var(--cat-5-soft)" },
              { slug: "adoption", name: "입양·등록",    color: "var(--cat-1)",   soft: "var(--cat-1-soft)" },
              { slug: "memorial", name: "장례·추모",    color: "var(--cat-6)",   soft: "var(--cat-6-soft)" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                onClick={() => setOpen(false)}
                className="pj-pill shrink-0"
                style={{ background: c.soft, color: c.color, fontWeight: 600, fontSize: 12 }}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {/* 전체 메뉴 */}
          <nav className="px-4 pb-3 flex flex-col gap-0.5">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm rounded-xl text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] hover:bg-[var(--brand-border)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
