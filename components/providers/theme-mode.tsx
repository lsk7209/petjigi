import type { DesignMode } from "@/lib/category";

export function ThemeMode({
  mode,
  children,
}: {
  mode: DesignMode;
  children: React.ReactNode;
}) {
  return (
    <div
      data-mode={mode}
      className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]"
    >
      {children}
    </div>
  );
}
