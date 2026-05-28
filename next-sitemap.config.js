/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://petjigi.kr",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // /sitemap-content.xml — 실제 DB publishedAt/updatedAt 날짜를 사용하는 콘텐츠 사이트맵
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://petjigi.kr"}/sitemap-content.xml`,
    ],
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/rescue/", "/search", "/api/", "/admin/"] },
      // AI 크롤러 전체 허용
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Yeti", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
  },
  // 콘텐츠 상세 페이지는 /sitemap-content.xml에서 실제 DB 날짜로 처리 (중복 방지)
  exclude: [
    "/rescue/*", "/search*", "/admin/*", "/*?page=*", "/*?cat=*",
    "/guide/*", "/blog/*", "/condition/*", "/breed/*/*",
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
      path.startsWith("/category/") ||
      path.startsWith("/insurance/")
    ) {
      return { loc: path, changefreq: "hourly", priority: 1.0, lastmod: new Date().toISOString() };
    }
    // 콘텐츠 상세 + 지역 허브
    if (
      path.startsWith("/sido/") ||
      path.startsWith("/guide/") ||
      path.startsWith("/blog/") ||
      path.startsWith("/breed/") ||
      path.startsWith("/condition/")
    ) {
      return { loc: path, changefreq: "weekly", priority: 0.8, lastmod: new Date().toISOString() };
    }
    // 보호센터 지역 목록
    if (path.startsWith("/shelter/")) {
      return { loc: path, changefreq: "weekly", priority: 0.7, lastmod: new Date().toISOString() };
    }
    // 지역×업종 목록 + 업체 상세
    if (path.match(/^\/[a-z]+-[a-z]+\//) || path.match(/^\/(vet|grooming|boarding|funeral|sale|breeder|transport|exhibition)\//)) {
      return { loc: path, changefreq: "daily", priority: 0.6, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() };
  },
};
