"use client";

import { cn } from "@/lib/utils";
import { WORK_CATEGORIES } from "@/lib/redesign-content";

interface Props {
  active: (typeof WORK_CATEGORIES)[number]["id"];
  onChange: (id: (typeof WORK_CATEGORIES)[number]["id"]) => void;
}

export function WorkFilterBar({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Project filter"
      className="flex flex-wrap items-center gap-2"
    >
      {WORK_CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={cn(
              "px-4 py-2 t-body-sm border transition-colors",
              isActive
                ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                : "bg-[var(--paper)] text-[var(--ink)] border-[var(--ink)] hover:bg-[var(--surface)]",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
