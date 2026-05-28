"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface OutboundLinkTrackerProps {
  articleId?: string;
}

export function OutboundLinkTracker({ articleId = "article-body" }: OutboundLinkTrackerProps) {
  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) return;

    const cleanups: Array<() => void> = [];

    article.querySelectorAll<HTMLAnchorElement>("a[href^='http']").forEach((anchor) => {
      try {
        if (new URL(anchor.href).hostname === window.location.hostname) return;
      } catch {
        return;
      }
      const handler = () => {
        track.externalLink({ url: anchor.href, label: anchor.textContent?.trim().slice(0, 80) });
      };
      anchor.addEventListener("click", handler);
      cleanups.push(() => anchor.removeEventListener("click", handler));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [articleId]);

  return null;
}
