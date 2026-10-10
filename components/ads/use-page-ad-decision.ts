"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { type AdDecision, type PageAdMarker, decideAdPage } from "@/lib/ads-policy";

type PageAdState = PageAdMarker | "unsettled" | "clear";

// 문서 스트리밍이 끝나야(load) 늦게 도착하는 404/오류 차단 마커까지 DOM에 존재한다.
// 시간 경과가 아니라 문서 렌더 완료를 근거로 판정한다.
function readPageAdState(): PageAdState {
  if (document.querySelector('[data-ads-policy="block"]')) return "block";
  if (document.querySelector('[data-ads-policy="pending"]')) return "pending";
  return document.readyState === "complete" ? "clear" : "unsettled";
}

function subscribe(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-ads-policy"],
  });
  document.addEventListener("readystatechange", onStoreChange);
  window.addEventListener("load", onStoreChange);
  return () => {
    observer.disconnect();
    document.removeEventListener("readystatechange", onStoreChange);
    window.removeEventListener("load", onStoreChange);
  };
}

/** 현재 페이지의 광고 판정. 서버·첫 하이드레이션에서는 항상 pending. */
export function usePageAdDecision(): AdDecision {
  const pathname = usePathname();
  const state = useSyncExternalStore<PageAdState>(subscribe, readPageAdState, () => "unsettled");
  return decideAdPage({
    pathname,
    marker: state === "block" || state === "pending" ? state : null,
    renderComplete: state === "clear",
  });
}
