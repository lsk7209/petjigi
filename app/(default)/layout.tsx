import { ThemeMode } from "@/components/providers/theme-mode";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeMode mode="default">{children}</ThemeMode>;
}
