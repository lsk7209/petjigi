"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** GA4 커스텀 이벤트 전송 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

function useScrollDepth() {
  const milestones = useRef(new Set<number>());
  const pathname = usePathname();

  useEffect(() => {
    milestones.current.clear();
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      if (total <= 0) return;
      const pct = Math.round((scrollTop / total) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && !milestones.current.has(mark)) {
          milestones.current.add(mark);
          trackEvent("scroll_depth", { depth: mark, page_path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
}

function useEngagementTime() {
  const pathname = usePathname();
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (const secs of [30, 60, 120, 300]) {
      timers.push(setTimeout(() => {
        trackEvent("engagement_time", { seconds: secs, page_path: pathname });
      }, secs * 1000));
    }
    return () => timers.forEach(clearTimeout);
  }, [pathname]);
}

function useWebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_category: "Web Vitals",
      event_label: metric.id,
      non_interaction: true,
    });
  });
}

function GA4Tracker() {
  useScrollDepth();
  useEngagementTime();
  useWebVitals();
  return null;
}

export function GA4() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure',
            allow_google_signals: true,
            allow_ad_personalization_signals: true,
            custom_map: {
              dimension1: 'content_type',
              dimension2: 'category_id',
              metric1: 'reading_progress',
            },
          });
          gtag('set', 'content_type', 'web');
        `}
      </Script>
      <GA4Tracker />
    </>
  );
}
