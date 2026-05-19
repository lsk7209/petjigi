import type { CategoryId } from "@/lib/category";
import { getDisclaimer } from "@/lib/ymyl";

export function YmylDisclaimer({ categoryId }: { categoryId: CategoryId }) {
  const disclaimer = getDisclaimer(categoryId);
  if (!disclaimer) return null;

  return (
    <div className="border-l-4 border-[var(--brand-accent)] bg-[var(--brand-border)] px-4 py-3 rounded-r-lg my-6 text-sm text-[var(--brand-text-secondary)]">
      <p className="font-medium text-[var(--brand-text)] mb-1">안내</p>
      <p>{disclaimer}</p>
    </div>
  );
}
