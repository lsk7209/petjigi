import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "펫지기 — 반려동물 보호자를 위한 정보",
    short_name: "펫지기",
    description: "반려동물과 함께하는 모든 결정 — 입양부터 장례까지. 공공데이터 기반 신뢰할 수 있는 반려동물 정보.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FAF5EE",
    theme_color: "#9CAF88",
    lang: "ko",
    dir: "ltr",
    categories: ["pets", "lifestyle", "health"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "동물병원 찾기",
        url: "/sido/seoul",
        description: "서울 동물병원 찾기",
      },
      {
        name: "펫보험 비교",
        url: "/insurance/compare",
        description: "주요 펫보험 비교",
      },
      {
        name: "가이드",
        url: "/guide",
        description: "반려동물 가이드",
      },
    ],
  };
}
