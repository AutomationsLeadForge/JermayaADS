"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useWindowManager } from "@/components/xp/WindowManager";
import { StartFlagIcon } from "@/components/xp/PixelIcons";
import { QuickLaunch } from "@/components/xp/QuickLaunch";
import type { SVGProps } from "react";

interface Props {
  onStartClick: () => void;
  startOpen: boolean;
  iconFor: Record<
    string,
    (props: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactElement
  >;
}

function formatClock(d: Date) {
  const h = d.getHours();
  const m = d.getMinutes();
  const h12 = ((h + 11) % 12) + 1;
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function Taskbar({ onStartClick, startOpen, iconFor }: Props) {
  const { windows, focusedId, toggleFromTaskbar } = useWindowManager();
  const [now, setNow] = useState<Date | null>(() => {
    if (typeof window === "undefined") return null;
    return new Date();
  });

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="xp-taskbar" aria-label="Taskbar">
      <button
        type="button"
        className={cn("xp-start-button", startOpen && "xp-start-button--open")}
        onClick={onStartClick}
        aria-expanded={startOpen}
        aria-haspopup="menu"
      >
        <StartFlagIcon size={20} />
        <span className="xp-start-label">start</span>
      </button>

      <QuickLaunch />

      <div className="xp-taskbar-tabs">
        {windows
          .filter((w) => w.open)
          .map((w) => {
            const Icon = iconFor[w.id];
            return (
              <button
                key={w.id}
                type="button"
                className={cn(
                  "xp-taskbar-tab",
                  focusedId === w.id && !w.minimized && "focused",
                )}
                onClick={() => toggleFromTaskbar(w.id)}
                title={w.title}
              >
                {Icon ? <Icon size={16} /> : null}
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {w.title}
                </span>
              </button>
            );
          })}
      </div>

      <div className="xp-clock" aria-label="Clock" suppressHydrationWarning>
        {now ? formatClock(now) : "--:--"}
      </div>
    </nav>
  );
}
