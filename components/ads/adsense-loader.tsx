"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { isAutoAdsEligiblePath } from "@/lib/ads-policy";

function subscribeToPagePolicy(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-ads-policy"],
  });
  return () => observer.disconnect();
}

export function AdsenseLoader({ publisherId }: { publisherId: string }) {
  const pathname = usePathname();
  const eligible = useSyncExternalStore(
    subscribeToPagePolicy,
    () => {
      const pageBlocksAds = document.querySelector('[data-ads-policy="block"]') !== null;
      return isAutoAdsEligiblePath(pathname, pageBlocksAds);
    },
    () => false,
  );

  useEffect(() => {
    if (!eligible && document.getElementById("adsense-auto")) {
      // next/script is not unloaded by a client transition. Reloading the
      // excluded destination creates a clean document without the ad runtime.
      window.location.replace(window.location.href);
    }
  }, [eligible, pathname]);

  if (!eligible) return null;

  return (
    <Script
      id="adsense-auto"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
