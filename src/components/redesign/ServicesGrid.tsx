"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { useSectionEnter } from "@/lib/motion";
import { SERVICES_SECTION } from "@/lib/redesign-content";

export function ServicesGrid() {
  const ref = useRef<HTMLElement>(null);
  useSectionEnter(ref);

  return (
    <section
      id="services"
      ref={ref}
      className="section-y border-t border-[var(--rule)]"
    >
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionLabel>{SERVICES_SECTION.eyebrow}</SectionLabel>
          <div className="flex items-baseline gap-3">
            <h2 className="t-display-md max-w-[22ch]">
              {SERVICES_SECTION.title}
            </h2>
            <span
              aria-hidden="true"
              className="t-hand-sm hidden md:inline whitespace-nowrap"
            >
              {SERVICES_SECTION.aside}
            </span>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 divide-y divide-[var(--rule)] border-y border-[var(--rule)] md:grid-cols-5 md:divide-y-0 md:divide-x">
          {SERVICES_SECTION.tiles.map((tile) => (
            <li
              key={tile.number}
              data-enter
              className="group relative flex flex-col gap-6 p-8 transition-colors hover:bg-[var(--surface)]"
            >
              <span className="t-mono-meta text-[var(--ink-muted)]">
                {tile.number}
              </span>
              <h3 className="t-display-sm">{tile.label}</h3>
              <p className="t-body-sm text-[var(--ink-muted)] max-w-[32ch]">
                {tile.oneLiner}
              </p>
              <a
                href={tile.href}
                className="ember-link mt-auto inline-flex items-center gap-1 t-body-sm"
              >
                See {tile.label}
                <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
