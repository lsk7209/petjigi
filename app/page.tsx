import type { Metadata } from "next";
import {
  getCachedRecentGuides,
  getCachedRecentBlogPosts,
} from "@/lib/db-queries";
import { pickHomeGuides } from "@/lib/home-guides";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { AdsenseTrustSection } from "@/components/content/adsense-trust-section";
import { HomeHero } from "@/components/home/hero";
import { QuickNav } from "@/components/home/quick-nav";
import { RegionPanel } from "@/components/home/region-panel";
import { HealthPanel } from "@/components/home/health-panel";
import { GuideFeed } from "@/components/home/guide-feed";
import { MemorialCard, MessageCard } from "@/components/home/side-cards";
import { TrustStrip } from "@/components/home/trust-strip";
import "./home.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "펫지기 — 반려동물 보호자를 위한 정보",
  description:
    "반려동물과 함께하는 모든 결정, 입양부터 장례까지. 공공데이터 기반 동물병원·시설 정보와 출처를 밝힌 반려생활 가이드.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [guides, posts] = await Promise.all([
    getCachedRecentGuides(),
    getCachedRecentBlogPosts(),
  ]);
  const cards = pickHomeGuides(guides, posts);

  return (
    <AdPolicyProvider category={5}>
      <main className="hm">
        <HomeHero />
        <QuickNav />

        <div className="hm-wrap hm-panels">
          <RegionPanel />
          <HealthPanel />
        </div>

        <div className="hm-wrap hm-editorial">
          <GuideFeed cards={cards} />
          <div className="hm-side-col">
            <MemorialCard />
            <MessageCard />
          </div>
        </div>

        <div className="hm-wrap hm-ad">
          <AdSlot adType="adsense" format="horizontal" />
        </div>

        <div className="hm-wrap">
          <TrustStrip />
          <AdsenseTrustSection compact />
        </div>
      </main>
    </AdPolicyProvider>
  );
}
