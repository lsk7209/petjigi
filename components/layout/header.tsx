"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./header.css";

const NAV_LINKS = [
  { label: "동물병원", href: "/#hm-local" },
  { label: "건강정보", href: "/condition" },
  { label: "사료·영양", href: "/category/nutrition" },
  { label: "생활·케어", href: "/category/care" },
  { label: "입양·등록", href: "/category/adoption" },
  { label: "보험·제도", href: "/category/insurance" },
  { label: "장례·추모", href: "/category/memorial" },
  { label: "가이드", href: "/guide" },
];

const DESKTOP_QUERY = "(min-width: 1100px)";

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

// JS 없이도 /search?q= 로 이동하는 실제 검색 폼
function SearchForm({ id }: { id: string }) {
  return (
    <form
      action="/search"
      method="get"
      role="search"
      className="pj-search"
    >
      <label htmlFor={id} className="sr-only">
        사이트 검색어
      </label>
      <input
        id={id}
        type="search"
        name="q"
        placeholder="병원·증상·가이드 검색"
        autoComplete="off"
      />
      <button type="submit" aria-label="검색">
        <SearchIcon />
      </button>
    </form>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeAndRestoreFocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndRestoreFocus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleResize);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleResize);
    };
  }, [open]);

  return (
    <header className="pj-header">
      <div className="pj-header-inner">
        <Link href="/" className="pj-logo" onClick={() => setOpen(false)}>
          <span className="pj-logo-mark" aria-hidden="true" />
          <span className="pj-logo-text">
            <span className="pj-logo-name">펫지기</span>
            <span className="pj-logo-tag">반려생활의 모든 순간, 함께.</span>
          </span>
        </Link>

        <nav className="pj-nav pj-only-desktop" aria-label="주요 메뉴">
          {NAV_LINKS.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pj-only-desktop pj-header-search">
          <SearchForm id="header-search" />
        </div>

        <button
          ref={triggerRef}
          type="button"
          className="pj-menu-btn pj-only-mobile"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="pj-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path
              d={open ? "M18 6L6 18M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
            />
          </svg>
        </button>
      </div>

      {open && (
        <div id="pj-mobile-menu" className="pj-mobile-menu pj-only-mobile">
          <SearchForm id="mobile-search" />
          <nav aria-label="전체 메뉴">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
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
