"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { MetricChip } from "@/components/redesign/MetricChip";
import { EmberLink } from "@/components/redesign/EmberLink";
import { useSectionEnter } from "@/lib/motion";
import {
  SELECTED_WORK,
  WORK_PROJECTS,
  getFeaturedWork,
} from "@/lib/redesign-content";

export function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  useSectionEnter(ref);
  const featured = getFeaturedWork();

  return (
    <section
      id="selected-work"
      ref={ref}
      className="section-y border-t border-[var(--rule)]"
    >
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionLabel>{SELECTED_WORK.eyebrow}</SectionLabel>
          <h2 className="t-display-md">{SELECTED_WORK.title}</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <article
              key={project.id}
              data-enter
              className="group flex flex-col border border-[var(--ink)] bg-[var(--paper)] transition-transform hover:-translate-y-1"
            >
              <div className="flex aspect-[4/3] items-center justify-center border-b border-[var(--ink)] bg-[var(--surface)]">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt=""
                    width={160}
                    height={160}
                    className="h-28 w-28 object-contain"
                  />
                ) : (
                  <span className="t-display-lg text-[var(--ink-muted)]">
                    {project.number}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <span className="t-meta text-[var(--ink-muted)]">
                    {project.categoryLabel}
                  </span>
                  <span className="t-mono-meta text-[var(--ink-muted)]">
                    {project.number}
                  </span>
                </div>
                <h3 className="t-display-sm">{project.title}</h3>
                <p className="t-body-sm text-[var(--ink-muted)]">
                  {project.summary}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <MetricChip
                    value={project.outcomeMetric}
                    label={project.outcomeLabel}
                  />
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 t-body-sm text-[var(--ember)]"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ArrowUpRight size={16} strokeWidth={2} />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <EmberLink href={SELECTED_WORK.linkHref}>
            {SELECTED_WORK.linkLabel} ({WORK_PROJECTS.length})
          </EmberLink>
        </div>
      </Container>
    </section>
  );
}
