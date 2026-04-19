import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { TOOLS_TICKER } from "@/lib/redesign-content";

export function ToolsTicker() {
  const loop = [...TOOLS_TICKER.labels, ...TOOLS_TICKER.labels];

  return (
    <section className="section-y border-t border-[var(--rule)]">
      <Container>
        <SectionLabel>{TOOLS_TICKER.eyebrow}</SectionLabel>
      </Container>

      <div
        className="mt-12 overflow-hidden border-y border-[var(--ink)] bg-[var(--surface)] py-6"
        aria-hidden="true"
      >
        <div className="ticker-row">
          {loop.map((label, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap px-6 font-[var(--font-display)] text-3xl md:text-4xl text-[var(--ink)]"
            >
              {label}
              <span className="text-[var(--ember)]">×</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
