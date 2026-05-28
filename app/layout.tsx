import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GA4 } from "@/components/analytics/ga4";
import { websiteSchema, organizationSchema } from "@/lib/seo/structured-data";

const notoSerifKR = Noto_Serif_KR({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
  display: "swap",
  preload: true,
});

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "펫지기 — 반려동물 보호자를 위한 정보",
    template: "%s | 펫지기",
  },
  description:
    "반려동물과 함께하는 모든 결정 — 입양부터 장례까지. 공공데이터 기반 신뢰할 수 있는 반려동물 정보.",
  keywords: [
    "반려동물",
    "펫",
    "동물병원",
    "펫보험",
    "반려견",
    "반려묘",
    "유기동물",
    "펫미용",
    "펫호텔",
    "동물장묘",
    "반려동물 입양",
    "동물등록",
    "펫사료",
  ],
  authors: [{ name: "펫지기", url: SITE_URL }],
  creator: "펫지기",
  publisher: "펫지기",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "펫지기",
    title: "펫지기 — 반려동물 보호자를 위한 정보",
    description: "반려동물과 함께하는 모든 결정 — 입양부터 장례까지",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "펫지기 — 반려동물 보호자를 위한 정보",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "펫지기 — 반려동물 보호자를 위한 정보",
    description: "반려동물과 함께하는 모든 결정 — 입양부터 장례까지",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-extended": "allow",
    "mobile-web-app-capable": "yes",
  },
  appleWebApp: {
    capable: true,
    title: "펫지기",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [{ url: `${SITE_URL}/feed.xml`, title: "펫지기 RSS" }],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`h-full scroll-smooth ${notoSerifKR.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect for third-party performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
        {/* GSC verification */}
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GSC_VERIFICATION}
          />
        )}
        {/* Naver Search Advisor verification */}
        {process.env.NEXT_PUBLIC_NAVER_VERIFICATION && (
          <meta
            name="naver-site-verification"
            content={process.env.NEXT_PUBLIC_NAVER_VERIFICATION}
          />
        )}
        {/* Structured data — separate tags for valid JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--brand-accent)] focus:text-white focus:rounded-lg focus:text-sm"
        >
          본문 바로가기
        </a>
        <Header />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <Footer />
        <GA4 />
        {/* AdSense 자동 광고 — NEXT_PUBLIC_ADSENSE_ID 설정 시 활성화 */}
        {ADSENSE_ID && (
          <Script
            id="adsense-auto"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
