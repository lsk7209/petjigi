import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "펫지기 — 반려동물 보호자를 위한 정보",
    template: "%s | 펫지기",
  },
  description:
    "반려동물과 함께하는 모든 결정 — 입양부터 장례까지. 공공데이터 기반 신뢰할 수 있는 반려동물 정보.",
  keywords: ["반려동물", "펫", "동물병원", "펫보험", "반려견", "반려묘"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "펫지기",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    // AI 크롤러 전체 허용 (spec §9)
    "google-extended": "allow",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </body>
    </html>
  );
}
