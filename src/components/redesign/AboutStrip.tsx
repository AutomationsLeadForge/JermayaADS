"use client";

import { useRef } from "react";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { MetricChip } from "@/components/redesign/MetricChip";
import { CurrentlyPanel } from "@/components/redesign/CurrentlyPanel";
import { useSectionEnter } from "@/lib/motion";
import { ABOUT } from "@/lib/redesign-content";

export function AboutStrip() {
  const ref = useRef<HTMLElement>(null);
  useSectionEnter(ref);

  return (
    <section id="who" ref={ref} className="section-y border-t border-[var(--rule)]">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        <div data-enter>
          <SectionLabel>{ABOUT.eyebrow}</SectionLabel>
          <p className="t-body-lg mt-10 max-w-[60ch] text-[var(--ink)]">
            {ABOUT.body}
          </p>
          {/* Handwritten signature */}
          <p className="t-hand mt-6" aria-hidden="true">
            — Jermaya
          </p>
        </div>
        <div data-enter className="flex flex-col gap-8">
          <CurrentlyPanel />
          <div className="flex flex-col gap-3">
            <span className="t-meta text-[var(--ink-muted)]">
              By the numbers
            </span>
            <div className="flex flex-wrap gap-3">
              {ABOUT.chips.map((chip) => (
                <MetricChip
                  key={chip.label}
                  value={chip.value}
                  label={chip.label}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
