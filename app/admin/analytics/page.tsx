import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/db/client";
import { contents, businesses } from "@/db/schema";
import { eq, and, count, desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Analytics — 펫지기 어드민",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "";
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";
const GSC_SERVICE_ACCOUNT = "id-ai-179@cursorai-451704.iam.gserviceaccount.com";

async function getSiteStats() {
  const [publishedGuides, publishedBlogs, publishedConditions, totalBiz] = await Promise.all([
    db.select({ count: count() }).from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "guide"))).get(),
    db.select({ count: count() }).from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "blog"))).get(),
    db.select({ count: count() }).from(contents)
      .where(and(eq(contents.status, "published"), eq(contents.type, "condition"))).get(),
    db.select({ count: count() }).from(businesses)
      .where(eq(businesses.status, "active")).get(),
  ]);

  return {
    guides: publishedGuides?.count ?? 0,
    blogs: publishedBlogs?.count ?? 0,
    conditions: publishedConditions?.count ?? 0,
    businesses: totalBiz?.count ?? 0,
  };
}

async function getRecentContent() {
  return db.select({
    slug: contents.slug,
    title: contents.title,
    type: contents.type,
    publishedAt: contents.publishedAt,
  }).from(contents)
    .where(eq(contents.status, "published"))
    .orderBy(desc(contents.publishedAt))
    .limit(10);
}

export default async function AdminAnalyticsPage() {
  const [stats, recent] = await Promise.all([getSiteStats(), getRecentContent()]);

  const ga4Ok = Boolean(GA4_MEASUREMENT_ID);
  const adsenseOk = Boolean(ADSENSE_ID);
  const adSlotsOk = Boolean(process.env.NEXT_PUBLIC_AD_SLOT_HORIZONTAL);
  const googleSaOk = Boolean(process.env.GOOGLE_SA_JSON);
  const indexNowOk = true; // 키가 코드에 내장됨 (public/6e5c7ca8b3db3d40d56c959549c1c7e0.txt)
  const gscVerifyOk = Boolean(process.env.NEXT_PUBLIC_GSC_VERIFICATION);

  const checks = [
    { label: "GA4 측정 ID", ok: ga4Ok, value: GA4_MEASUREMENT_ID, fix: "NEXT_PUBLIC_GA4_MEASUREMENT_ID 환경변수 설정 필요" },
    { label: "AdSense 퍼블리셔 ID", ok: adsenseOk, value: ADSENSE_ID ? `${ADSENSE_ID.slice(0, 12)}...` : "", fix: "NEXT_PUBLIC_ADSENSE_ID 환경변수 설정 필요" },
    { label: "AdSense 슬롯 ID (수평)", ok: adSlotsOk, value: adSlotsOk ? "설정됨" : "", fix: "NEXT_PUBLIC_AD_SLOT_HORIZONTAL 등 4개 환경변수 → AdSense 대시보드에서 발급" },
    { label: "Google Indexing API", ok: googleSaOk, value: googleSaOk ? "서비스 계정 JSON 있음" : "", fix: `GSC 대시보드에서 ${GSC_SERVICE_ACCOUNT} 소유자 등록 후 GOOGLE_SA_JSON 환경변수 설정` },
    { label: "IndexNow 키", ok: indexNowOk, value: "코드 내장 (6e5c7ca8...)", fix: "이미 활성화됨 — 선택적으로 INDEXNOW_KEY 환경변수로 오버라이드 가능" },
    { label: "GSC 인증 메타태그", ok: gscVerifyOk, value: gscVerifyOk ? "설정됨" : "", fix: "NEXT_PUBLIC_GSC_VERIFICATION 환경변수 설정 필요" },
  ];

  const typeLabel: Record<string, string> = {
    guide: "가이드", blog: "블로그", condition: "질환", breed: "품종",
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/admin/review-queue" className="text-sm text-[var(--brand-accent)] hover:underline">
          ← 검수 큐
        </Link>
        <h1 className="text-2xl font-bold text-[var(--brand-text)] mt-3 mb-1">Analytics & SEO 대시보드</h1>
        <p className="text-sm text-[var(--brand-text-secondary)]">환경변수 설정 상태, 사이트 현황, 최적화 체크리스트를 확인하세요.</p>
      </div>

      {/* 사이트 현황 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">사이트 현황</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "가이드", value: stats.guides, href: `${SITE_URL}/guide` },
            { label: "블로그", value: stats.blogs, href: `${SITE_URL}/blog` },
            { label: "질환 정보", value: stats.conditions, href: `${SITE_URL}/condition` },
            { label: "영업장 (활성)", value: stats.businesses.toLocaleString(), href: `${SITE_URL}/sido/seoul` },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors"
            >
              <p className="text-2xl font-bold text-[var(--brand-text)]">{item.value}</p>
              <p className="text-xs text-[var(--brand-text-secondary)] mt-1">{item.label}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 환경변수 / 연동 상태 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">연동 상태 체크리스트</h2>
        <div className="space-y-2">
          {checks.map((c) => (
            <div
              key={c.label}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                c.ok
                  ? "border-green-200 bg-green-50"
                  : "border-orange-200 bg-orange-50"
              }`}
            >
              <span className="text-lg shrink-0">{c.ok ? "✅" : "⚠️"}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--brand-text)]">{c.label}</p>
                {c.ok
                  ? <p className="text-xs text-green-700 mt-0.5">{c.value}</p>
                  : <p className="text-xs text-orange-700 mt-0.5">{c.fix}</p>
                }
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 외부 대시보드 링크 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">외부 대시보드</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              name: "Google Search Console",
              url: "https://search.google.com/search-console",
              desc: "검색 노출·클릭·오류 분석. 서비스 계정 소유자 등록 필요.",
              icon: "🔍",
            },
            {
              name: "Google Analytics 4",
              url: "https://analytics.google.com",
              desc: "사용자 행동·이벤트·전환 분석. 스크롤 깊이·외부링크 추적 중.",
              icon: "📊",
            },
            {
              name: "Google AdSense",
              url: "https://www.google.com/adsense",
              desc: "광고 수익·슬롯 ID 발급. HORIZONTAL/RECTANGLE/VERTICAL/AUTO 4개 발급 필요.",
              icon: "💰",
            },
            {
              name: "Naver Search Advisor",
              url: "https://searchadvisor.naver.com",
              desc: "네이버 검색 노출·IndexNow 전송 확인.",
              icon: "🟢",
            },
            {
              name: "Turso 대시보드",
              url: "https://app.turso.tech",
              desc: "DB Rows Read 사용량 모니터링. 인덱스 적용 후 확인 권장.",
              icon: "🗄️",
            },
            {
              name: "Vercel Analytics",
              url: "https://vercel.com",
              desc: "Core Web Vitals·배포 성능 모니터링.",
              icon: "▲",
            },
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 p-4 rounded-xl border border-[var(--brand-border)] hover:border-[var(--brand-accent)] transition-colors"
            >
              <span className="text-2xl shrink-0">{link.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--brand-text)]">{link.name}</p>
                <p className="text-xs text-[var(--brand-text-secondary)] mt-0.5">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* GA4 이벤트 목록 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">GA4 추적 이벤트 목록</h2>
        <p className="text-xs text-[var(--brand-text-secondary)] mb-3">
          GA4 대시보드 → 보고서 → 실시간에서 아래 이벤트 수신을 확인하세요.
        </p>
        <div className="rounded-xl border border-[var(--brand-border)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[var(--brand-surface-2)]">
                <th className="text-left px-3 py-2 font-semibold">이벤트 이름</th>
                <th className="text-left px-3 py-2 font-semibold">발생 위치</th>
                <th className="text-left px-3 py-2 font-semibold">전환 추천</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--brand-border)]">
              {[
                { event: "CLS / INP / LCP / FCP / TTFB", where: "전 페이지", conv: "" },
                { event: "scroll (25/50/75/90%)", where: "가이드·블로그·질환 상세", conv: "" },
                { event: "view_guide", where: "가이드 상세", conv: "" },
                { event: "view_category", where: "카테고리 페이지", conv: "" },
                { event: "view_insurance_compare", where: "펫보험 비교", conv: "✓ 전환 설정 권장" },
                { event: "toc_click", where: "가이드·블로그 ToC", conv: "" },
                { event: "cta_click", where: "카테고리 CTA", conv: "✓ 전환 설정 권장" },
                { event: "phone_click", where: "영업장 상세", conv: "✓ 전환 설정 권장" },
                { event: "map_click", where: "영업장 상세", conv: "" },
                { event: "click (Outbound Link)", where: "가이드·블로그·질환 본문", conv: "✓ 전환 설정 권장" },
                { event: "newsletter_subscribe", where: "뉴스레터 폼", conv: "✓ 전환 설정 권장" },
                { event: "search", where: "검색 페이지", conv: "" },
                { event: "page_not_found", where: "404 페이지", conv: "" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-[var(--brand-surface)]"}>
                  <td className="px-3 py-2 font-mono">{row.event}</td>
                  <td className="px-3 py-2 text-[var(--brand-text-secondary)]">{row.where}</td>
                  <td className="px-3 py-2 text-green-700">{row.conv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 최근 발행 콘텐츠 */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">최근 발행 콘텐츠 (GSC·IndexNow 전송 대상)</h2>
        <div className="space-y-2">
          {recent.map((c) => (
            <div key={c.slug} className="flex items-center gap-3 text-sm p-3 rounded-lg border border-[var(--brand-border)]">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--brand-border)] text-[var(--brand-text-secondary)] shrink-0">
                {typeLabel[c.type] ?? c.type}
              </span>
              <a
                href={`${SITE_URL}/${c.type === "guide" || c.type === "blog" || c.type === "condition" ? c.type : "guide"}/${c.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--brand-text)] hover:text-[var(--brand-accent)] truncate"
              >
                {c.title}
              </a>
              {c.publishedAt && (
                <time className="text-xs text-[var(--brand-text-secondary)] shrink-0 ml-auto" dateTime={c.publishedAt}>
                  {c.publishedAt.slice(0, 10)}
                </time>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 다음 액션 */}
      <section className="p-5 rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)]">
        <h2 className="text-base font-semibold text-[var(--brand-text)] mb-3">🎯 남은 수동 작업</h2>
        <ol className="space-y-3 text-sm text-[var(--brand-text-secondary)]">
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-[var(--brand-text)]">1.</span>
            <span>
              <strong className="text-[var(--brand-text)]">AdSense 슬롯 발급</strong> —{" "}
              <a href="https://www.google.com/adsense" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">AdSense 대시보드</a>에서
              광고 단위 4개 생성 후 Vercel 환경변수에 추가:<br />
              <code className="text-xs bg-[var(--brand-border)] px-1.5 py-0.5 rounded mt-1 inline-block">
                NEXT_PUBLIC_AD_SLOT_HORIZONTAL · RECTANGLE · VERTICAL · AUTO
              </code>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-[var(--brand-text)]">2.</span>
            <span>
              <strong className="text-[var(--brand-text)]">GSC 서비스 계정 등록</strong> —{" "}
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">GSC 설정</a>{" "}
              → 사용자 및 권한 → 소유자 추가:<br />
              <code className="text-xs bg-[var(--brand-border)] px-1.5 py-0.5 rounded mt-1 inline-block">
                {GSC_SERVICE_ACCOUNT}
              </code>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 font-bold text-[var(--brand-text)]">3.</span>
            <span>
              <strong className="text-[var(--brand-text)]">GA4 전환 이벤트 설정</strong> —{" "}
              <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">GA4</a>{" "}
              → 관리 → 전환 이벤트 → 위 표의 "전환 추천" 이벤트 5개 전환으로 표시
            </span>
          </li>
        </ol>
      </section>
    </main>
  );
}
