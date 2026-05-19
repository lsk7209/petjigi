import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "펫지기 소개",
  description: "펫지기는 공공데이터 기반의 반려동물 종합 정보 서비스입니다.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">펫지기 소개</h1>
      <p className="text-[var(--brand-text-secondary)] leading-relaxed mb-4">
        펫지기는 반려동물 보호자를 위한 공공데이터 기반 종합 정보 서비스입니다.
        광고가 아닌 정보로 보호자를 지킨다는 철학 아래, 입양부터 장례까지 반려동물과
        함께하는 모든 결정을 지원합니다.
      </p>
      <p className="text-[var(--brand-text-secondary)] leading-relaxed">
        법률지기·금리지기에 이은 지기 시리즈 3호입니다.
      </p>
    </main>
  );
}
