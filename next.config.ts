import type { NextConfig } from "next";
import { CONTENT_REDIRECTS } from "./lib/content-redirects";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  serverExternalPackages: ["@libsql/client"],
  experimental: {
    optimizePackageImports: ["drizzle-orm", "lucide-react"],
  },
  async redirects() {
    return CONTENT_REDIRECTS.map((r) => ({ source: r.from, destination: r.to, permanent: true }));
  },
  async rewrites() {
    return [
      {
        source: "/:key([a-f0-9]{32,64})\\.txt",
        destination: "/api/indexnow-key",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        // public/ 정적 자산 (SVG, 이미지 등) — 7일 캐시
        source: "/(.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp|avif|woff2|woff|ttf))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        // ads.txt는 구글 크롤러 요건에 맞춰 text/plain 명시
        source: "/ads\\.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
      {
        source: "/feed\\.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
