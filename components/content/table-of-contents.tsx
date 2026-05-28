"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics/events";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function TableOfContents({ headings, slug = "" }: { headings: TocHeading[]; slug?: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    // 모바일에서 기본 닫힘 (touch device 감지)
    if (!initialized.current) {
      initialized.current = true;
      if (window.innerWidth < 640) setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-10% 0% -80% 0%", threshold: 0 }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="목차"
      className="my-5 border border-[var(--brand-border)] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-[var(--brand-text)] bg-[color-mix(in_oklch,var(--brand-border)_60%,transparent)] hover:bg-[var(--brand-border)] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true">📋</span>
          목차
          <span className="text-xs font-normal text-[var(--brand-text-secondary)]">
            ({headings.length}개 항목)
          </span>
        </span>
        <span aria-hidden="true" className="text-xs text-[var(--brand-text-secondary)]">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <ol className="px-4 py-3 space-y-1.5 bg-[color-mix(in_oklch,var(--brand-border)_25%,transparent)]">
          {headings.map((h, i) => (
            <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
              <a
                href={`#${h.id}`}
                onClick={() => track.tocClick({ headingText: h.text, guideSlug: slug })}
                className={[
                  "flex items-start gap-1.5 text-sm py-0.5 transition-colors leading-snug",
                  activeId === h.id
                    ? "text-[var(--brand-accent)] font-semibold"
                    : "text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)]",
                ].join(" ")}
              >
                <span className="shrink-0 text-xs text-[var(--brand-text-secondary)] mt-0.5 w-5 text-right">
                  {h.level === 2 ? `${i + 1}.` : "›"}
                </span>
                <span>{h.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
