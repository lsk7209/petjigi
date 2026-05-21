import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GA4 } from "@/components/analytics/ga4";
import { websiteSchema, organizationSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";

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
  const schemas = [websiteSchema(), organizationSchema()];

  return (
    <html lang="ko" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
        {/* GSC verification — set NEXT_PUBLIC_GSC_VERIFICATION in env */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
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
      </body>
    </html>
  );
}
