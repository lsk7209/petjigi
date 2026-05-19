import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Server Components are default in App Router
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Turso edge runtime compatibility
  serverExternalPackages: ["@libsql/client"],
  async rewrites() {
    return [
      // IndexNow 키 검증: /{key}.txt → /api/indexnow-key
      {
        source: "/:key([a-f0-9]{32,64})\\.txt",
        destination: "/api/indexnow-key",
      },
    ];
  },
};

export default nextConfig;
