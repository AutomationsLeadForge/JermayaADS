import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MetricChip } from "@/components/redesign/MetricChip";
import type { WorkProject } from "@/lib/redesign-content";

interface Props {
  project: WorkProject;
  variant?: "regular" | "feature";
}

export function WorkCard({ project, variant = "regular" }: Props) {
  const isFeature = variant === "feature";
  const Wrapper = project.href ? "a" : "article";

  return (
    <Wrapper
      {...(project.href
        ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "group flex flex-col border border-[var(--ink)] bg-[var(--paper)] transition-colors",
        project.href && "hover:bg-[var(--surface)]",
        isFeature && "md:col-span-2 md:flex-row",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center bg-[var(--surface)] border-b border-[var(--ink)]",
          isFeature
            ? "md:w-1/2 md:border-b-0 md:border-r aspect-[4/3] md:aspect-auto"
            : "aspect-[4/3]",
        )}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt=""
            width={200}
            height={200}
            className={cn(
              "object-contain",
              isFeature ? "h-40 w-40" : "h-28 w-28",
            )}
          />
        ) : (
          <span
            className={cn(
              "font-[var(--font-display)] text-[var(--ink-muted)]",
              isFeature ? "text-[120px] leading-none" : "text-[80px] leading-none",
            )}
          >
            {project.number}
          </span>
        )}
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-6",
          isFeature && "md:w-1/2 md:p-8 md:gap-6",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="t-meta text-[var(--ink-muted)]">
            {project.categoryLabel}
          </span>
          <span className="t-mono-meta text-[var(--ink-muted)]">
            {project.number}
          </span>
        </div>
        <h3
          className={cn(
            isFeature ? "t-display-md" : "t-display-sm",
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            "text-[var(--ink-muted)]",
            isFeature ? "t-body-lg" : "t-body-sm",
          )}
        >
          {project.summary}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col gap-2">
            <span className="t-meta text-[var(--ink-muted)]">Role</span>
            <span className="t-body-sm">{project.role}</span>
          </div>
          <div className="flex items-center gap-3">
            <MetricChip
              value={project.outcomeMetric}
              label={project.outcomeLabel}
            />
            {project.href ? (
              <span
                aria-hidden="true"
                className="inline-flex items-center text-[var(--ember)] transition-transform group-hover:translate-x-0.5"
              >
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
