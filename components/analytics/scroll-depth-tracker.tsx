"use client";

import { useEffect, useRef } from "react";

const MILESTONES = [25, 50, 75, 90] as const;

export function ScrollDepthTracker() {
  const fired = useRef(new Set<number>());

  useEffect(() => {
    fired.current.clear();

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll", {
              event_category: "Engagement",
              event_label: `${milestone}%`,
              value: milestone,
              non_interaction: true,
            });
          }
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
