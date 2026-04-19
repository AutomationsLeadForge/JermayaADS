"use client";

import type { SVGProps } from "react";

/**
 * Retro-ad-banner style arrow + callout. Hot red/yellow, blinks subtly.
 * Positioned absolutely via style prop.
 */

interface Props {
  label: string;
  direction?: "right" | "left" | "down" | "up";
  style?: React.CSSProperties;
}

export function RetroArrow({ label, direction = "right", style }: Props) {
  const rotate =
    direction === "right"
      ? 0
      : direction === "down"
        ? 90
        : direction === "left"
          ? 180
          : 270;

  return (
    <div
      role="img"
      aria-label={label}
      className="xp-retro-arrow"
      style={style}
    >
      <span
        className="xp-retro-arrow-label"
        style={{ whiteSpace: "nowrap" }}
      >
        ★ {label} ★
      </span>
      <BigArrow
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      />
    </div>
  );
}

function BigArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="88"
      height="48"
      viewBox="0 0 88 48"
      shapeRendering="crispEdges"
      aria-hidden="true"
      {...props}
    >
      {/* Shaft (chunky pixel blocks, yellow with red outline) */}
      <rect x="4" y="18" width="56" height="12" fill="#ffd319" />
      <rect x="4" y="17" width="56" height="1" fill="#000" />
      <rect x="4" y="30" width="56" height="1" fill="#000" />
      <rect x="4" y="18" width="1" height="12" fill="#000" />
      {/* Arrow head */}
      <rect x="52" y="12" width="10" height="24" fill="#ffd319" />
      <rect x="58" y="8" width="10" height="32" fill="#ffd319" />
      <rect x="64" y="4" width="10" height="40" fill="#ffd319" />
      <rect x="70" y="0" width="10" height="48" fill="#ffd319" />
      {/* Outline on head */}
      <rect x="52" y="11" width="10" height="1" fill="#000" />
      <rect x="52" y="36" width="10" height="1" fill="#000" />
      <rect x="58" y="7" width="10" height="1" fill="#000" />
      <rect x="58" y="40" width="10" height="1" fill="#000" />
      <rect x="64" y="3" width="10" height="1" fill="#000" />
      <rect x="64" y="44" width="10" height="1" fill="#000" />
      <rect x="70" y="-1" width="10" height="1" fill="#000" />
      <rect x="80" y="0" width="1" height="48" fill="#000" />
      <rect x="70" y="47" width="10" height="1" fill="#000" />
      {/* Red accents (hot banner feel) */}
      <rect x="6" y="21" width="52" height="2" fill="#c62727" />
      <rect x="6" y="27" width="52" height="1" fill="#c62727" />
    </svg>
  );
}
