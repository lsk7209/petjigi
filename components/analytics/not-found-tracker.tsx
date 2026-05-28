"use client";

import { useEffect } from "react";

export function NotFoundTracker() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_not_found", {
        event_category: "Error",
        event_label: window.location.pathname + window.location.search,
        non_interaction: true,
      });
    }
  }, []);

  return null;
}
