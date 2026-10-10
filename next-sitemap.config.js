// next-sitemap 설정은 CommonJS 로 로드된다
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
/* eslint-enable @typescript-eslint/no-require-imports */

// 여러 시도가 같은 slug를 쓰는 시군구(동구·서구 등): 페이지는 noindex이므로 사이트맵에서 제외
function ambiguousSigunguSlugs() {
  const src = fs.readFileSync(path.join(__dirname, "db", "seeds", "regions.ts"), "utf8");
  const counts = new Map();
  for (const m of src.matchAll(/sigunguSlug:\s*"([^"]+)"/g)) counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
  return [...counts].filter(([, n]) => n > 1).map(([slug]) => slug).sort();
}
const AMBIGUOUS_REGION_EXCLUDES = ambiguousSigunguSlugs().map((slug) => `/${slug}/*`);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 빌드 시각을 lastmod로 일괄 기록하지 않는다(신뢰할 수정일이 없으면 생략)
  autoLastmod: false,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://petjigi.kr",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // /sitemap-content.xml — 실제 DB publishedAt/updatedAt 날짜를 사용하는 콘텐츠 사이트맵
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://petjigi.kr"}/sitemap-content.xml`,
    ],
    // 모든 crawler 그룹(개별 bot 포함)이 공유해야 하는 최소 제한.
    // Google 등은 '*' 그룹과 구체적인 user-agent 그룹을 결합하지 않으므로,
    // 이 배열을 각 그룹에 명시적으로 다시 적용해야 한다.
    //   - /admin/, /api/: 관리자·내부 API. robots는 보안 장치가 아니므로 실제 접근 제어는
    //     인증으로 별도 보호하지만, 크롤러가 애초에 시도하지 않도록 공통 차단한다.
    //   - /search: 여기서는 disallow하지 않는다. 이 페이지는 HTML에서 noindex,follow:false를
    //     선언하므로, Google이 그 지시를 읽으려면 크롤링 자체는 허용돼야 한다.
    // 모든 crawler 그룹(개별 bot 포함)이 공유해야 하는 최소 제한.
    // Google 등은 '*' 그룹과 구체적인 user-agent 그룹을 결합하지 않으므로,
    // 아래 각 그룹에 /api/, /admin/을 명시적으로 반복한다(F14).
    //   - /search: 어떤 그룹에서도 disallow하지 않는다. 이 페이지는 HTML에서
    //     noindex,follow:false를 선언하므로, Google이 그 지시를 읽으려면
    //     크롤링 자체는 허용돼야 한다.
    //   - /rescue: crawlable(HTML noindex)이므로 여기서 disallow하지 않는다.
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
      // Google AdSense 크롤러
      { userAgent: "Mediapartners-Google", allow: "/", disallow: ["/api/", "/admin/"] },
      // AI 크롤러 전체 허용 — 공통 제한(/api/, /admin/)은 동일하게 적용한다.
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Yeti", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Applebot-Extended", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "CCBot", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "Bytespider", allow: "/", disallow: ["/api/", "/admin/"] },
    ],
  },
  // 콘텐츠 상세 페이지는 /sitemap-content.xml에서 실제 DB 날짜로 처리 (중복 방지)
  exclude: [
    "/rescue", "/rescue/*", "/search*", "/admin/*", "/*?page=*", "/*?cat=*",
    "/opengraph-image", "/**/opengraph-image", "/icon", "/apple-icon", "/manifest.webmanifest",
    "/guide/*", "/blog/*", "/condition/*", "/breed/*/*",
    ...AMBIGUOUS_REGION_EXCLUDES,
    "/sido/chungbuk", "/sido/chungnam", "/sido/gangwon", "/sido/gyeongbuk",
    "/sido/gyeongnam", "/sido/jeju", "/sido/jeonbuk", "/sido/jeonnam",
  ],
  changefreq: "daily",
  priority: 0.7,
  transform: async (config, path) => {
    // 최상위 허브 — 홈·카테고리·블로그·가이드·질병·보험·품종 인덱스
    if (
      path === "/" ||
      path === "/blog" ||
      path === "/guide" ||
      path === "/condition" ||
      path === "/breed" ||
      path === "/insurance" ||
      path === "/shelter" ||
      path.startsWith("/category/") ||
      path.startsWith("/insurance/")
    ) {
      return { loc: path, changefreq: "hourly", priority: 1.0 };
    }
    // 콘텐츠 상세 + 지역 허브
    if (
      path.startsWith("/sido/") ||
      path.startsWith("/guide/") ||
      path.startsWith("/blog/") ||
      path.startsWith("/breed/") ||
      path.startsWith("/condition/")
    ) {
      return { loc: path, changefreq: "weekly", priority: 0.8 };
    }
    // 보호센터 지역 목록
    if (path.startsWith("/shelter/")) {
      return { loc: path, changefreq: "weekly", priority: 0.7 };
    }
    // 지역×업종 목록 + 업체 상세
    if (path.match(/^\/[a-z]+-[a-z]+\//) || path.match(/^\/(vet|grooming|boarding|funeral|sale|registration|breeder|transport|exhibition)\//)) {
      return { loc: path, changefreq: "daily", priority: 0.6 };
    }
    return { loc: path, changefreq: config.changefreq, priority: config.priority };
  },
};
