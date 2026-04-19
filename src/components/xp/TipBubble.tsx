"use client";

import { useEffect, useState } from "react";
import { CoffeeIcon } from "@/components/xp/PixelIcons";

const TIPS = [
  "Tip: click any desktop icon to open it. start → browses everything.",
  "Tip: drag window edges to resize. Double-click the title bar to maximize.",
  "Tip: the Work window has a project tree — click a row to see details.",
  "Tip: fastest route to hire me → Start → Book a call (Calendly).",
];

export function TipBubble() {
  const [show, setShow] = useState(false);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setShow(true), 2400);
    return () => window.clearTimeout(id);
  }, []);

  if (!show) return null;
  const tip = TIPS[tipIdx];

  return (
    <div className="xp-tip" role="note" aria-live="polite">
      <button
        type="button"
        className="xp-tip-close"
        aria-label="Dismiss tip"
        onClick={() => setShow(false)}
      >
        ×
      </button>
      <div className="xp-tip-header">
        <CoffeeIcon size={20} />
        <span>Jermaya&apos;s Tip</span>
      </div>
      <div>{tip}</div>
      <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
        <button
          type="button"
          className="xp-btn"
          style={{ width: "auto", height: 22, padding: "0 10px" }}
          onClick={() => setTipIdx((i) => (i + 1) % TIPS.length)}
        >
          Next tip
        </button>
        <button
          type="button"
          className="xp-btn"
          style={{ width: "auto", height: 22, padding: "0 10px" }}
          onClick={() => setShow(false)}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
