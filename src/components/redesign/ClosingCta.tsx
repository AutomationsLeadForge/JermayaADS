"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { useSectionEnter } from "@/lib/motion";
import { CLOSING_CTA } from "@/lib/redesign-content";

interface Props {
  /** Override eyebrow label (defaults to homepage copy). */
  eyebrow?: string;
  /** Override headline. */
  title?: string;
  /** Override sub copy. */
  sub?: string;
}

export function ClosingCta({ eyebrow, title, sub }: Props = {}) {
  const ref = useRef<HTMLElement>(null);
  useSectionEnter(ref);

  return (
    <section
      ref={ref}
      className="section-y border-t border-[var(--rule)] bg-[var(--surface)]"
    >
      <Container>
        <SectionLabel>{eyebrow ?? CLOSING_CTA.eyebrow}</SectionLabel>
        <h2
          data-enter
          className="t-display-lg mt-8 max-w-[22ch] text-[var(--ink)]"
        >
          {title ?? CLOSING_CTA.title}
        </h2>
        <p data-enter className="t-body-lg mt-6 max-w-[55ch] text-[var(--ink-muted)]">
          {sub ?? CLOSING_CTA.sub}
        </p>
        <div
          data-enter
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href={CLOSING_CTA.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {CLOSING_CTA.primary.label}
            <ArrowUpRight size={18} strokeWidth={2} />
          </a>
          <div className="flex gap-3">
            {CLOSING_CTA.tiles.map((tile) => (
              <a
                key={tile.id}
                href={tile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tile.label}
                className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
              >
                <Image
                  src={tile.image}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
