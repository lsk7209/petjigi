import Link from "next/link";
import { OWNER_JOURNEYS } from "@/lib/owner-journeys";

export function OwnerJourneys({ category }: { category?: string }) {
  const journeys = category ? OWNER_JOURNEYS.filter((item) => item.category === category) : OWNER_JOURNEYS;
  if (!journeys.length) return null;
  return (
    <section aria-labelledby="owner-journeys-title" className="my-8" data-owner-journeys>
      <h2 id="owner-journeys-title" className="text-xl font-bold text-[var(--brand-text)] mb-2">상황에 맞춰 차근차근 확인하기</h2>
      <p className="text-sm text-[var(--brand-text-secondary)] mb-4">필요한 단계부터 골라 읽고, 질문표를 작성해 보세요.</p>
      <div className={`grid gap-4 ${category ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {journeys.map((journey) => (
          <article key={journey.category} className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-5 min-w-0">
            <h3 className="font-bold text-[var(--brand-text)]">{journey.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">{journey.intro}</p>
            <ol className="mt-3 space-y-1 list-decimal pl-5">
              {journey.steps.map((step) => (
                <li key={step.href} className="text-sm"><Link className="block py-2 text-[var(--brand-accent)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2" href={step.href}>{step.label}</Link></li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
