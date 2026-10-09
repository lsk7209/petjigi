import type { Metadata } from "next";
import Link from "next/link";
import {
  getCachedRecentGuides,
  getCachedRecentBlogPosts,
} from "@/lib/db-queries";
import { CATEGORIES } from "@/lib/category";
import { AdSlot } from "@/components/ads/ad-slot";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { AdsenseTrustSection } from "@/components/content/adsense-trust-section";
import { HeroIllustration } from "@/components/home/hero-illustration";
import "./home.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "펫지기 — 반려동물 보호자를 위한 정보",
  description:
    "반려동물과 함께하는 모든 결정, 입양부터 장례까지. 공공데이터 기반 동물병원·시설 정보와 출처를 밝힌 반려생활 가이드.",
  alternates: { canonical: "/" },
};

const ICON_PATHS: Record<string, string> = {
  place:
    "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  health:
    "M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20z",
  food: "M5 11h14l-1.5 8h-11zM9 11V8a3 3 0 0 1 6 0v3",
  adopt:
    "M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  shield: "M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c2-4 5-7 9-9",
};

const QUICK_NAV = [
  { label: "동물병원·시설 찾기", href: "/sido/seoul", icon: "place" },
  { label: "건강·질병 알아보기", href: "/condition", icon: "health" },
  { label: "사료·영양 확인하기", href: "/category/nutrition", icon: "food" },
  { label: "입양·등록 준비하기", href: "/category/adoption", icon: "adopt" },
  { label: "보험·제도 살펴보기", href: "/insurance", icon: "shield" },
  { label: "장례·추모 안내", href: "/category/memorial", icon: "leaf" },
];

// 데이터가 수집·등록된 시·도만 노출한다. 준비 중인 지역은 나열하지 않는다.
const ACTIVE_SIDO = [
  { label: "서울", slug: "seoul" },
  { label: "경기", slug: "gyeonggi" },
  { label: "부산", slug: "busan" },
  { label: "인천", slug: "incheon" },
  { label: "대구", slug: "daegu" },
  { label: "광주", slug: "gwangju" },
  { label: "대전", slug: "daejeon" },
  { label: "울산", slug: "ulsan" },
  { label: "세종", slug: "sejong" },
];

const FACILITY_TYPES = ["동물병원", "펫미용", "펫호텔", "장묘업체"];

const REFERENCE_LINKS = [
  { label: "견종·묘종 도감", desc: "품종별 특징과 관리", href: "/breed" },
  { label: "질병·증상 정보", desc: "출처와 주의사항 함께", href: "/condition" },
  {
    label: "펫보험 비교",
    desc: "보험사별 공식 상품 확인",
    href: "/insurance/compare",
  },
  {
    label: "입양·등록 가이드",
    desc: "준비 순서와 제도",
    href: "/category/adoption",
  },
];

function Icon({ name }: { name: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const catName = (id: number | null) =>
  CATEGORIES[(id ?? 5) as keyof typeof CATEGORIES]?.name ?? "케어·라이프";
const dateOf = (iso: string | null) => (iso ? iso.slice(0, 10) : null);

export default async function HomePage() {
  const [guides, posts] = await Promise.all([
    getCachedRecentGuides(),
    getCachedRecentBlogPosts(),
  ]);
  const [feature, ...restPosts] = posts;
  const feed = [
    ...restPosts
      .slice(0, 3)
      .map((p) => ({ ...p, href: `/blog/${p.slug}`, kind: "블로그" })),
    ...guides
      .slice(0, 3)
      .map((g) => ({
        ...g,
        subtitle: null,
        href: `/guide/${g.slug}`,
        kind: "가이드",
      })),
  ];

  return (
    <AdPolicyProvider category={5}>
      <main className="hm">
        {/* ① 히어로 */}
        <section className="hm-hero" aria-label="사이트 소개">
          <div className="hm-wrap hm-hero-grid">
            <div>
              <span className="hm-eyebrow">
                반려가족을 위한 믿을 수 있는 안내서
              </span>
              <h1 className="hm-h1" data-speakable>
                함께하는 모든 순간,
                <br />
                필요한 정보를 한곳에서.
              </h1>
              <p className="hm-lead">
                동물병원부터 건강·생활 정보, 마지막 인사까지.
                <br />
                펫지기가 차근차근 안내합니다.
              </p>
              <div className="hm-actions">
                <Link href="/sido/seoul" className="hm-btn hm-btn--solid">
                  우리 동네 동물병원 찾기
                </Link>
                <Link href="/guide" className="hm-btn hm-btn--line">
                  반려생활 가이드 보기
                </Link>
              </div>
            </div>
            <figure style={{ margin: 0 }}>
              <HeroIllustration />
              <figcaption className="hm-art-note">
                임시 일러스트입니다. 사용권이 확인된 사진으로 교체할 수
                있습니다.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ③ 상황별 빠른 탐색 */}
        <section
          className="hm-sec"
          style={{ paddingTop: 0 }}
          aria-labelledby="hm-quick-title"
        >
          <div className="hm-wrap">
            <h2 className="hm-h2" id="hm-quick-title">
              지금 어떤 정보가 필요하세요?
            </h2>
            <nav className="hm-quick" aria-label="상황별 빠른 탐색">
              {QUICK_NAV.map((q) => (
                <Link key={q.href} href={q.href}>
                  <Icon name={q.icon} />
                  {q.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* ④ 우리 동네 반려시설 */}
        <section
          className="hm-sec hm-sec--sage"
          aria-labelledby="hm-local-title"
        >
          <div className="hm-wrap hm-local">
            <div>
              <span className="hm-eyebrow">지역으로 찾기</span>
              <h2
                className="hm-h2"
                id="hm-local-title"
                style={{ marginTop: 8 }}
              >
                우리 동네에서 찾아보세요
              </h2>
              <p className="hm-sub">
                가까운 동물병원과 반려시설 정보를 확인하세요.
              </p>
              <p className="hm-types">
                {FACILITY_TYPES.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            </div>
            <div>
              <div className="hm-chips">
                {ACTIVE_SIDO.map((s) => (
                  <Link key={s.slug} href={`/sido/${s.slug}`}>
                    {s.label}
                  </Link>
                ))}
              </div>
              <p className="hm-note">
                공공데이터 기준 정보이며 운영 여부와 진료 가능 항목은 방문 전
                전화로 확인해 주세요. 데이터가 등록된 지역만 표시합니다.
              </p>
            </div>
          </div>
        </section>

        {/* ⑤ 건강·질병 정보 */}
        <section className="hm-sec" aria-labelledby="hm-health-title">
          <div className="hm-wrap">
            <h2 className="hm-h2" id="hm-health-title">
              우리 아이의 건강, 차근차근 알아보세요
            </h2>
            <p className="hm-sub">
              증상 정보는 참고용이며 진단을 대신하지 않습니다. 걱정되는 증상은
              동물병원에 문의하세요.
            </p>
            <div className="hm-pair">
              <div className="hm-pane">
                <h3>강아지</h3>
                <p>견종별 특징과 자주 살펴볼 건강 정보를 모았습니다.</p>
                <div className="hm-links">
                  <Link href="/breed/dog">강아지 견종 도감</Link>
                  <Link href="/condition">질병·증상 정보</Link>
                </div>
              </div>
              <div className="hm-pane">
                <h3>고양이</h3>
                <p>묘종별 특징과 일상 관리에 필요한 정보를 모았습니다.</p>
                <div className="hm-links">
                  <Link href="/breed/cat">고양이 묘종 도감</Link>
                  <Link href="/category/health">건강·의료 가이드</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⑥ 반려생활 가이드 */}
        {(feature || feed.length > 0) && (
          <section
            className="hm-sec hm-sec--sage"
            aria-labelledby="hm-guide-title"
          >
            <div className="hm-wrap">
              <h2 className="hm-h2" id="hm-guide-title">
                함께 살아가는 데 도움이 되는 이야기
              </h2>
              <p className="hm-sub">최근 발행한 순서대로 소개합니다.</p>
              <div className="hm-feed">
                {feature && (
                  <Link href={`/blog/${feature.slug}`} className="hm-feature">
                    <span className="hm-tag">
                      {catName(feature.category)} · 블로그
                    </span>
                    <h3>{feature.title}</h3>
                    {feature.subtitle && (
                      <p className="line-clamp-3">{feature.subtitle}</p>
                    )}
                  </Link>
                )}
                <div className="hm-list">
                  {feed.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span className="hm-tag">
                        {catName(item.category)} · {item.kind}
                      </span>
                      {item.publishedAt && (
                        <time className="hm-date" dateTime={item.publishedAt}>
                          {dateOf(item.publishedAt)}
                        </time>
                      )}
                      <strong>{item.title}</strong>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hm-actions">
                <Link href="/blog" className="hm-btn hm-btn--line">
                  블로그 전체 보기
                </Link>
                <Link href="/guide" className="hm-btn hm-btn--line">
                  가이드 전체 보기
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ⑦ 반려생활 백과 */}
        <section className="hm-sec" aria-labelledby="hm-ref-title">
          <div className="hm-wrap">
            <h2 className="hm-h2" id="hm-ref-title">
              미리 알아두면 든든한 반려생활 정보
            </h2>
            <p className="hm-sub">
              필요할 때 다시 찾아볼 수 있는 상시 정보입니다.
            </p>
            <div className="hm-ref">
              {REFERENCE_LINKS.map((r) => (
                <Link key={r.href} href={r.href}>
                  <b>{r.label}</b>
                  <span>{r.desc} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="hm-wrap" style={{ paddingBottom: 24 }}>
          <AdSlot adType="adsense" format="horizontal" />
        </div>

        {/* ⑧ 장례·추모 */}
        <section
          className="hm-sec"
          style={{ paddingTop: 0 }}
          aria-labelledby="hm-memorial-title"
        >
          <div className="hm-wrap">
            <div className="hm-memorial">
              <div>
                <h2 className="hm-h2" id="hm-memorial-title">
                  마지막 인사도, 차분히 준비할 수 있도록
                </h2>
                <p className="hm-sub" style={{ margin: 0 }}>
                  장례 절차와 확인할 사항을 하나씩 안내합니다.
                </p>
              </div>
              <Link href="/category/memorial" className="hm-btn hm-btn--solid">
                장례·추모 안내 보기
              </Link>
            </div>
          </div>
        </section>

        {/* ⑨ 정보 신뢰 기준 */}
        <section
          className="hm-sec"
          style={{ paddingTop: 0 }}
          aria-labelledby="hm-trust-title"
        >
          <div className="hm-wrap">
            <h2 className="hm-h2" id="hm-trust-title">
              정보의 출처와 기준을 함께 확인하세요
            </h2>
            <ul className="hm-trust">
              <li>
                <b>출처 확인</b>건강·의료, 보험·법률 정보는 개인별 판단을
                대신하지 않으며 참고 자료를 함께 안내합니다.
              </li>
              <li>
                <b>정보 기준일</b>시설 정보는 공공데이터 수집 시점 기준이라
                반영이 늦어질 수 있습니다. 목록 페이지에서 갱신일을 확인하세요.
              </li>
              <li>
                <b>광고와 정보의 분리</b>광고·제휴 링크는 본문과 구분해 표시하며
                추모 페이지에는 광고를 게재하지 않습니다.
              </li>
            </ul>
            <AdsenseTrustSection compact />
          </div>
        </section>
      </main>
    </AdPolicyProvider>
  );
}
