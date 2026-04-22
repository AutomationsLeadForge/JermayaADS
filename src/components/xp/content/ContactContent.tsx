"use client";

import { SITE_META } from "@/lib/redesign-content";

const WHATSAPP_NUMBER = "+31 6 2396 3836";

export function ContactContent() {
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
          <strong>Subject:</strong> hire me / help / collab / send memes
        </div>
      </div>

      {/* The star of the show — WhatsApp */}
      <WhatsAppCard />

      <p className="xp-p" style={{ marginTop: 14 }}>
        Prefer something less direct? These all work too:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
        <a
          href={SITE_META.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="xp-link"
        >
          → LinkedIn (DMs are open, but slower)
        </a>
        <a href="mailto:jermaya@jermayads.nl" className="xp-link">
          → Email: jermaya@jermayads.nl (goes to a human, not a form)
        </a>
      </div>

      <p className="xp-p" style={{ marginTop: 16, color: "#3c3c3c" }}>
        P.S. — I actually read my inbox. Turnaround is ~24h on weekdays,
        ~3 min on WhatsApp if I&apos;m not in a meeting.
      </p>
    </div>
  );
}

function WhatsAppCard() {
  return (
    <a
      href={SITE_META.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          border: "2px solid #075e54",
          borderRadius: 6,
          background:
            "linear-gradient(180deg, #e6f7ed 0%, #d2f0dd 100%)",
          padding: 0,
          overflow: "hidden",
          boxShadow: "4px 4px 0 #000",
          marginBottom: 4,
        }}
      >
        {/* Header bar — like the WhatsApp chat header */}
        <div
          style={{
            background: "#075e54",
            color: "#fff",
            padding: "6px 10px",
            fontFamily: "Tahoma, sans-serif",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Pixelated avatar */}
          <div
            className="xp-wa-bob"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#25d366",
              display: "grid",
              placeItems: "center",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            📱
          </div>
          <div style={{ flex: 1, lineHeight: 1.2 }}>
            <div style={{ fontWeight: 700 }}>Jermaya</div>
            <div
              style={{
                fontSize: 10,
                opacity: 0.85,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                className="xp-wa-online"
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#25d366",
                }}
                aria-hidden="true"
              />
              online — tap to chat
            </div>
          </div>
          <div
            className="xp-wa-wiggle"
            style={{ fontSize: 18, lineHeight: 1 }}
            aria-hidden="true"
          >
            💬
          </div>
        </div>

        {/* Message area */}
        <div style={{ padding: "10px 12px", fontFamily: "Tahoma, sans-serif" }}>
          {/* A playful incoming "message" from Jermaya */}
          <div
            style={{
              alignSelf: "flex-start",
              background: "#fff",
              border: "1px solid #b7dcc1",
              borderRadius: "8px 8px 8px 2px",
              padding: "6px 10px",
              display: "inline-block",
              fontSize: 13,
              color: "#1a1a1a",
              maxWidth: "85%",
              boxShadow: "1px 1px 0 rgba(0,0,0,0.1)",
            }}
          >
            hey 👋 it&apos;s me, Jermaya.
            <br />
            don&apos;t be shy — drop a message.
            <br />
            voice notes over 30s will be judged 😤
          </div>

          {/* Typing indicator — always typing, because drama */}
          <div
            style={{
              marginTop: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#fff",
              border: "1px solid #b7dcc1",
              borderRadius: "12px",
              padding: "4px 10px",
              fontSize: 11,
              color: "#075e54",
            }}
          >
            <span style={{ fontWeight: 700, marginRight: 2 }}>typing</span>
            <span className="xp-wa-dot">•</span>
            <span className="xp-wa-dot">•</span>
            <span className="xp-wa-dot">•</span>
          </div>
        </div>

        {/* Giant CTA — the "Drop a message" button */}
        <div
          style={{
            padding: "10px 12px 12px",
            background: "transparent",
            display: "grid",
            gap: 6,
          }}
        >
          <div
            style={{
              fontFamily:
                'var(--font-pixel), "Pixelify Sans", "Tahoma", sans-serif',
              fontSize: 13,
              color: "#075e54",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Just easy with WhatsApp:
          </div>
          <div
            style={{
              fontFamily:
                '"Consolas", "Monaco", "Courier New", monospace',
              fontSize: 18,
              fontWeight: 700,
              color: "#0c3d2e",
              letterSpacing: "0.02em",
            }}
          >
            {WHATSAPP_NUMBER}
          </div>
          {/* Styled as a CTA button — the outer <a> handles the navigation,
              so this is an inline span (avoids nested interactive elements). */}
          <span
            role="presentation"
            style={{
              marginTop: 4,
              padding: "10px 14px",
              border: "2px solid #000",
              borderRadius: 4,
              background:
                "linear-gradient(180deg, #25d366 0%, #1bb85a 100%)",
              color: "#fff",
              fontFamily:
                'var(--font-pixel), "Pixelify Sans", "Tahoma", sans-serif',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "3px 3px 0 #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span className="xp-wa-wiggle" aria-hidden="true">
              💬
            </span>
            Drop a message — I don&apos;t bite
          </span>
          <div
            style={{
              fontSize: 11,
              color: "#3c3c3c",
              textAlign: "center",
              marginTop: 2,
            }}
          >
            (ok, maybe a little — but only at bad CPA targets)
          </div>
        </div>
      </div>
    </a>
  );
}
