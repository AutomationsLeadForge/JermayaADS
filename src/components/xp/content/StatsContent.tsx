"use client";

import type { SVGProps } from "react";
import { ABOUT_SNIPPET, ABOUT_TAGLINE, STATS, type Stat } from "@/lib/stats";
import { useCountUp } from "@/hooks/useCountUp";
import {
  CalendarIcon,
  GoogleAdsIcon,
  AboutIcon,
  DocumentIcon,
} from "@/components/xp/PixelIcons";

const PIXEL_FONT = 'var(--font-pixel), "Pixelify Sans", "Tahoma", sans-serif';

type PixelIcon = (
  props: SVGProps<SVGSVGElement> & { size?: number },
) => React.ReactElement;

const ICON_MAP: Record<Stat["icon"], PixelIcon> = {
  calendar: CalendarIcon,
  spend: GoogleAdsIcon,
  people: AboutIcon,
  script: DocumentIcon,
  coffee: DocumentIcon,
};

function StatTile({ stat }: { stat: Stat }) {
  const { ref, formatted } = useCountUp({
    target: stat.value,
    decimals: stat.decimals ?? 0,
  });
  const Icon = ICON_MAP[stat.icon];

  return (
    <div
      className="xp-bevel-raised"
      style={{
        background: "#fff",
        padding: 0,
        display: "grid",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* Top color band */}
      <div
        aria-hidden="true"
        style={{ height: 6, background: stat.color }}
      />

      <div
        style={{
          padding: "12px 14px 14px",
          display: "grid",
          gap: 10,
        }}
      >
        {/* Row 1: label */}
        <div
          style={{
            fontFamily: "Tahoma, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: "#3c3c3c",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            lineHeight: 1.3,
          }}
        >
          {stat.label}
        </div>

        {/* Row 2: icon + big number, paired on one line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          <Icon
            size={44}
            className="xp-icon-pixel"
            style={{ flex: "0 0 auto" }}
            aria-hidden="true"
          />
          <div
            style={{
              fontFamily: PIXEL_FONT,
              fontSize: 40,
              fontWeight: 700,
              color: stat.color,
              lineHeight: 1,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {stat.prefix ?? ""}
            <span ref={ref}>{formatted}</span>
            {stat.suffix ?? ""}
          </div>
        </div>

        {/* Row 3: sublabel */}
        <div
          style={{
            fontFamily: "Tahoma, sans-serif",
            fontSize: 12,
            color: "#555",
            lineHeight: 1.35,
          }}
        >
          {stat.sublabel}
        </div>
      </div>
    </div>
  );
}

export function StatsContent() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        className="xp-bevel-sunken"
        style={{ background: "#fff", padding: 6 }}
      >
        <p className="xp-p" style={{ margin: 0 }}>
          Address: <strong>C:\Jermaya\Stats\dashboard.live</strong>
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: 10,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {STATS.map((s) => (
          <StatTile key={s.id} stat={s} />
        ))}
      </div>

      <section
        className="xp-bevel-raised"
        style={{
          background: "#ece9d8",
          padding: 14,
          display: "grid",
          gap: 10,
        }}
      >
        <header
          style={{
            background: "#0a3a8e",
            color: "#fff",
            padding: "6px 10px",
            fontFamily: "Tahoma, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            marginTop: -14,
            marginLeft: -14,
            marginRight: -14,
          }}
        >
          About these numbers
        </header>

        <p
          className="xp-p"
          style={{
            margin: 0,
            fontFamily: "Tahoma, sans-serif",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {ABOUT_SNIPPET}
        </p>

        <p
          style={{
            margin: 0,
            fontFamily: PIXEL_FONT,
            fontSize: 15,
            color: "#002a7b",
            letterSpacing: "0.02em",
          }}
        >
          ▸ {ABOUT_TAGLINE}
        </p>
      </section>
    </div>
  );
}
