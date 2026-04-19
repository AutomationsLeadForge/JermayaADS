"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ROADMAP_STEPS } from "@/lib/content";

export function RoadmapAccordion() {
  const [active, setActive] = useState(0);
  const step = ROADMAP_STEPS[active];

  return (
    <section className="w-full mb-[14px]">
      <div className="card-shadow grid w-full grid-cols-[0.96fr_1fr] max-[991px]:grid-cols-1 gap-9 rounded-[10px] bg-[#34373c] p-[50px_40px_80px_45px] max-[575px]:p-[24px_35px] max-[575px]:gap-[14px]">
        <div className="roadmap-path-block">
          <div className="flex items-center text-[18px] font-semibold text-[#c073a2]">
            ROADMAP
            <span className="mr-0 ml-[4px] flex-1 border-b border-[#c073a2]" />
          </div>
          <div className="border-b border-[#c073a2] pt-[60px] pb-[70px] max-[575px]:pt-[15px] max-[575px]:pb-[15px]">
            <ol className="space-y-3">
              {ROADMAP_STEPS.map((s, i) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
                      i === active
                        ? "bg-[rgba(192,115,162,0.25)] text-white"
                        : "text-white/80 hover:bg-[rgba(192,115,162,0.12)]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold",
                        i === active
                          ? "bg-[#c073a2] text-white"
                          : "bg-[#1d1d1d] text-[#c073a2]",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[15px] font-medium uppercase">
                      {s.label}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="details-block pt-[8px] pb-1">
          {step.paragraphs.map((p) => (
            <p key={p} className="mb-3 text-[14px] leading-[1.72] last:mb-0">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
