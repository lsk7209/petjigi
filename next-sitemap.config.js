/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://petjigi.kr",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      // 단일 User-agent: * 블록 (중복 블록 방지)
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
  // 동 단위 페이지, 구조동물, 검색 결과 제외
  exclude: ["/rescue/*", "/search*", "/admin/*", "/*?page=*"],
  changefreq: "daily",
  priority: 0.7,
  transform: async (config, path) => {
    // 카테고리 허브·홈 우선순위 높게
    if (path === "/" || path === "/breed" || path.startsWith("/category/") || path.startsWith("/insurance/")) {
      return { loc: path, changefreq: "hourly", priority: 1.0, lastmod: new Date().toISOString() };
    }
    if (path.startsWith("/sido/") || path.startsWith("/guide/") || path.startsWith("/breed/") || path.startsWith("/condition/")) {
      return { loc: path, changefreq: "weekly", priority: 0.8, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() };
  },
};
