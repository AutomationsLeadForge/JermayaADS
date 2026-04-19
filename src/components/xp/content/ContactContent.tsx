"use client";

import { useWindowManager } from "@/components/xp/WindowManager";
import { SITE_META } from "@/lib/redesign-content";

export function ContactContent() {
  const { open } = useWindowManager();

  return (
    <div>
      <div
        className="xp-bevel-sunken"
        style={{
          background: "#fff",
          padding: 10,
          marginBottom: 10,
          fontFamily: "Tahoma, sans-serif",
          fontSize: 12,
        }}
      >
        <div>
          <strong>From:</strong> you@somewhere.com
        </div>
        <div>
          <strong>To:</strong> jermaya@jermayads.nl
        </div>
        <div>
          <strong>Subject:</strong> hire me / help / collab / ...
        </div>
      </div>

      <p className="xp-p">
        Easiest: grab a slot on the calendar. 20 min is usually enough to know
        if I can help.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
        <button
          type="button"
          onClick={() => open("calendly")}
          className="xp-link"
          style={{
            background: "none",
            border: 0,
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          → Book a call (opens Calendly window)
        </button>
        <a
          href={SITE_META.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="xp-link"
        >
          → LinkedIn (DMs are open)
        </a>
        <a
          href={SITE_META.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="xp-link"
        >
          → WhatsApp (for the quick stuff)
        </a>
        <a href="mailto:jermaya@jermayads.nl" className="xp-link">
          → Email: jermaya@jermayads.nl
        </a>
      </div>

      <p className="xp-p" style={{ marginTop: 16, color: "#3c3c3c" }}>
        P.S. — I actually read my inbox. Turnaround is ~24h on weekdays.
      </p>
    </div>
  );
}
