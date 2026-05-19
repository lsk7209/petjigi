import { CategoryProvider } from "@/components/providers/category-provider";
import { AdPolicyProvider } from "@/components/providers/ad-policy-provider";
import { ThemeMode } from "@/components/providers/theme-mode";

// 카테고리 6 전용 레이아웃 — 광고·디자인·톤 완전 분리
export default function MemorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CategoryProvider category={6}>
      <ThemeMode mode="memorial">
        <AdPolicyProvider category={6}>{children}</AdPolicyProvider>
      </ThemeMode>
    </CategoryProvider>
  );
}
