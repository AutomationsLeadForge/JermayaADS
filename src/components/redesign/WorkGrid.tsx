"use client";

import { useMemo, useRef, useState } from "react";
import { Container } from "@/components/redesign/Container";
import { WorkFilterBar } from "@/components/redesign/WorkFilterBar";
import { WorkCard } from "@/components/redesign/WorkCard";
import { useSectionEnter } from "@/lib/motion";
import { WORK_CATEGORIES, WORK_PROJECTS } from "@/lib/redesign-content";

type CategoryId = (typeof WORK_CATEGORIES)[number]["id"];

export function WorkGrid() {
  const [active, setActive] = useState<CategoryId>("all");
  const ref = useRef<HTMLElement>(null);
  useSectionEnter(ref);

  const visible = useMemo(() => {
    if (active === "all") return WORK_PROJECTS;
    return WORK_PROJECTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <section ref={ref} className="section-y">
      <Container>
        <div className="mb-10">
          <WorkFilterBar active={active} onChange={setActive} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visible.map((project, i) => (
            <div
              key={project.id}
              data-enter
              className={i === 0 && active === "all" ? "md:col-span-2" : ""}
            >
              <WorkCard
                project={project}
                variant={i === 0 && active === "all" ? "feature" : "regular"}
              />
            </div>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center t-body text-[var(--ink-muted)]">
            Nothing tagged with that yet. Try a different filter.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
