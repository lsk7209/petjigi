"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { isAutoAdsEligiblePath } from "@/lib/ads-policy";

// 스트리밍된 404/오류 화면은 차단 마커가 hydration 직후보다 늦게 DOM에 들어온다.
// 마커가 도착하기 전에 스크립트를 먼저 마운트하면 되돌릴 수 없으므로 판단을 잠시 보류한다.
const POLICY_SETTLE_MS = 1200;

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
  const [settledPath, setSettledPath] = useState<string | null>(null);
  const policyEligible = useSyncExternalStore(
    subscribeToPagePolicy,
    () => {
      const pageBlocksAds = document.querySelector('[data-ads-policy="block"]') !== null;
      return isAutoAdsEligiblePath(pathname, pageBlocksAds);
    },
    () => false,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setSettledPath(pathname), POLICY_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const eligible = policyEligible && settledPath === pathname;

  useEffect(() => {
    if (!policyEligible && document.getElementById("adsense-auto")) {
      // next/script is not unloaded by a client transition. Reloading the
      // excluded destination creates a clean document without the ad runtime.
      window.location.replace(window.location.href);
    }
  }, [policyEligible, pathname]);

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
