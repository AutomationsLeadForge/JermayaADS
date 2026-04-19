"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export function CyclingText({ items, intervalMs = 2500, className }: Props) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  return (
    <div className="relative overflow-hidden w-full">
      {items.map((item, i) => (
        <p
          key={item}
          className={cn(
            "absolute inset-0 font-[var(--font-kanit)] text-[18px] xl:text-[18px] font-bold uppercase text-center mb-0 text-white transition-all duration-300 ease-in-out",
            i === idx
              ? "visible scale-100 opacity-100"
              : "invisible scale-0 opacity-0 h-0 -z-10",
            className,
          )}
        >
          {item}
        </p>
      ))}
      {/* Spacer to preserve layout height */}
      <p className="font-[var(--font-kanit)] text-[18px] font-bold uppercase opacity-0 select-none">
        {items[0]}
      </p>
    </div>
  );
}
