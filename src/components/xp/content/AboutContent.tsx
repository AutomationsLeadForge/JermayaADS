"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ABOUT } from "@/lib/redesign-content";
import type { AboutContentValue } from "@/types/site";

const DEFAULT_CURRENTLY = [
  "Running Performance Max for e-commerce clients",
  "Building AI solutions to keep clients ahead in their market",
  "Developing client-specific tools & automation",
  "Google Ads scripts, Python & AI tooling",
];

export function AboutContent() {
  const [value, setValue] = useState<AboutContentValue>(() => ({
    body: ABOUT.body,
    chips: [...ABOUT.chips],
    currently: [...DEFAULT_CURRENTLY],
  }));

  useEffect(() => {
    let cancelled = false;
    fetch("/api/site-content/about", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        const v = j?.content?.value as AboutContentValue | undefined;
        if (v && typeof v === "object") {
          setValue({
            body: typeof v.body === "string" && v.body.trim() ? v.body : ABOUT.body,
            chips:
              Array.isArray(v.chips) && v.chips.length > 0
                ? v.chips
                : [...ABOUT.chips],
            currently:
              Array.isArray(v.currently) && v.currently.length > 0
                ? v.currently
                : [...DEFAULT_CURRENTLY],
          });
        }
      })
      .catch(() => {
        // keep defaults
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        className="xp-bevel-sunken"
        style={{
          background: "#ffffff",
          padding: 6,
          display: "inline-block",
          width: "fit-content",
        }}
      >
        <Image
          src="/images/jermayaleijen.png"
          alt="Jermaya Leijen"
          width={140}
          height={170}
          style={{
            width: 140,
            height: "auto",
            imageRendering: "pixelated",
            display: "block",
          }}
        />
      </div>
      <div>
        <h1 className="xp-h1">about_jermaya.bmp</h1>
        <p className="xp-p">{value.body}</p>
        <h2 className="xp-h2">About Jermaya Leijen</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {value.chips.map((c, i) => (
            <li key={`${c.label}-${i}`} className="xp-p">
              [{c.value}] {c.label}
            </li>
          ))}
        </ul>
        <h2 className="xp-h2">Currently</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {value.currently.map((l, i) => (
            <li key={`${l}-${i}`} className="xp-p">
              &gt; {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
