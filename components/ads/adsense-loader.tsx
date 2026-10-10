"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePageAdDecision } from "./use-page-ad-decision";

export function AdsenseLoader({ publisherId }: { publisherId: string }) {
  const decision = usePageAdDecision();

  useEffect(() => {
    if (decision === "block" && document.getElementById("adsense-auto")) {
      // next/script is not unloaded by a client transition. Reloading the
      // excluded destination creates a clean document without the ad runtime.
      window.location.replace(window.location.href);
    }
  }, [decision]);

  if (decision !== "allow") return null;

  return (
    <Script
      id="adsense-auto"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
