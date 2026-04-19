"use client";

import { useState } from "react";
import { CalendarIcon } from "@/components/xp/PixelIcons";

export function CalendlyContent() {
  const [loaded, setLoaded] = useState(false);
  const host =
    typeof window !== "undefined" ? window.location.host : "jermayads.nl";
  const src = `https://calendly.com/jermayads?embed_domain=${encodeURIComponent(
    host,
  )}&embed_type=Inline&hide_event_type_details=0&hide_landing_page_details=0&primary_color=c62727`;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 8 }}>
      <div
        className="xp-bevel-sunken"
        style={{
          background: "#fff",
          padding: "8px 12px",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <CalendarIcon size={20} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>Book 20 minutes with Jermaya</div>
          <div style={{ color: "#3c3c3c" }}>
            No signup. No intro form. Just pick a slot.
          </div>
        </div>
        <a
          href="https://calendly.com/jermayads"
          target="_blank"
          rel="noopener noreferrer"
          className="xp-link"
          style={{ fontSize: 11 }}
        >
          Open in new tab ↗
        </a>
      </div>

      <div
        className="xp-bevel-sunken"
        style={{
          position: "relative",
          flex: 1,
          background: "#fff",
          minHeight: 520,
        }}
      >
        {!loaded ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Tahoma, sans-serif",
              fontSize: 12,
              color: "#3c3c3c",
              background: "#ece9d8",
              gap: 8,
            }}
          >
            <LoaderBar />
            Connecting to Calendly…
          </div>
        ) : null}
        <iframe
          src={src}
          title="Calendly — Book a call with Jermaya"
          width="100%"
          height="100%"
          style={{
            border: 0,
            minHeight: 520,
            display: "block",
          }}
          onLoad={() => setLoaded(true)}
          allow="camera; microphone; autoplay; encrypted-media"
        />
      </div>
    </div>
  );
}

function LoaderBar() {
  return (
    <div
      style={{
        width: 200,
        height: 16,
        border: "1px solid #000",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background:
            "linear-gradient(to right, #0058e6, #74a9ff, #0058e6)",
          animation: "xp-loader 1.2s linear infinite",
        }}
      />
    </div>
  );
}
