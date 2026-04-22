"use client";

import { useMemo } from "react";
import { CASE_STUDIES } from "@/lib/case-studies";
import {
  CASE_STUDY_DETAILS,
  type DetailBlock,
} from "@/lib/case-studies-detail";
import { useCaseDetail } from "@/hooks/useCaseDetailStore";

/**
 * Document-style reader for a single case study.
 *
 * Typographic choices here are deliberate:
 *   - Georgia for body copy — long-form writing deserves a serif. The paper
 *     background is cream, which reads like a WordPad/RTF document.
 *   - Tahoma for headings and UI chrome — matches the rest of the XP skin.
 *   - Inner column is capped at ~70ch for a comfortable line length; the
 *     outer card still fills the window so the document feels like a page.
 */
const BODY_FONT = 'Georgia, "Cambria", "Times New Roman", serif';
const UI_FONT = 'Tahoma, "Segoe UI", "MS Sans Serif", sans-serif';
const INK = "#1a1a1a";
const INK_MUTED = "#3c3c3c";
const PAPER = "#faf7ef";
const RULE = "#d8cfb3";
const ACCENT = "#002a7b";

export function CaseStudyDetailContent() {
  const { selectedCaseId, setSelectedCaseId } = useCaseDetail();

  const cs = useMemo(
    () => CASE_STUDIES.find((c) => c.id === selectedCaseId) ?? CASE_STUDIES[0],
    [selectedCaseId],
  );
  const detail = CASE_STUDY_DETAILS[cs.id];

  if (!detail) {
    return (
      <div style={{ padding: 20 }}>
        <p className="xp-p">No detailed write-up available for this case yet.</p>
      </div>
    );
  }

  const index = CASE_STUDIES.findIndex((c) => c.id === cs.id);
  const total = CASE_STUDIES.length;
  const goPrev = () => {
    const next = (index - 1 + total) % total;
    setSelectedCaseId(CASE_STUDIES[next].id);
  };
  const goNext = () => {
    const next = (index + 1) % total;
    setSelectedCaseId(CASE_STUDIES[next].id);
  };

  const prevCase = CASE_STUDIES[(index - 1 + total) % total];
  const nextCase = CASE_STUDIES[(index + 1) % total];

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {/* Breadcrumb bar — matches the Explorer/address-bar feel. */}
      <div
        className="xp-bevel-sunken"
        style={{
          background: "#fff",
          padding: "6px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <p className="xp-p" style={{ margin: 0, fontSize: 12 }}>
          Path: <strong>C:\Jermaya\CaseStudies\</strong>
          {cs.id}
          <span>.readme</span>
        </p>
        <span
          style={{
            fontFamily: UI_FONT,
            fontSize: 12,
            color: INK_MUTED,
          }}
        >
          Case {index + 1} of {total}
        </span>
      </div>

      {/* Paper — the actual document. */}
      <article
        className="xp-bevel-raised"
        style={{
          background: PAPER,
          padding: "32px clamp(24px, 4vw, 48px) 36px",
          borderTop: `4px solid ${ACCENT}`,
          overflow: "hidden",
        }}
      >
        {/* Inner reading column — cap line-length for comfortable prose. */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <header style={{ marginBottom: 22 }}>
            <p
              style={{
                margin: 0,
                fontFamily: UI_FONT,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ACCENT,
                fontWeight: 700,
              }}
            >
              {cs.sector}
            </p>
            <h1
              style={{
                margin: "10px 0 14px",
                fontFamily: UI_FONT,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.2,
                fontWeight: 700,
                color: ACCENT,
                letterSpacing: "-0.005em",
              }}
            >
              {detail.title}
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: BODY_FONT,
                fontStyle: "italic",
                color: INK_MUTED,
                fontSize: 16,
                lineHeight: 1.5,
              }}
            >
              {detail.tagline}
            </p>
          </header>

          <hr
            style={{
              border: 0,
              borderTop: `1px solid ${RULE}`,
              margin: "0 0 10px",
            }}
          />

          <div>
            {detail.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {/* Footer nav — flip between write-ups without leaving the window.
          .xp-btn applies inline-flex by default, which collapses multi-line
          content onto one row. We override with display:grid so the "Previous"
          eyebrow and the sector label stack cleanly. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          className="xp-btn"
          style={{
            display: "grid",
            gridTemplateRows: "auto auto",
            rowGap: 2,
            alignContent: "center",
            justifyItems: "start",
            width: "100%",
            minWidth: 0,
            height: 54,
            padding: "6px 14px",
            fontFamily: UI_FONT,
            textAlign: "left",
            lineHeight: 1.2,
          }}
          aria-label={`Previous case: ${prevCase.title}`}
          title={prevCase.title}
        >
          <span
            style={{
              color: INK_MUTED,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            ← Previous
          </span>
          <span
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {prevCase.sector}
          </span>
        </button>
        <span
          style={{
            fontFamily: UI_FONT,
            fontSize: 12,
            color: INK_MUTED,
            padding: "0 8px",
            whiteSpace: "nowrap",
          }}
        >
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={goNext}
          className="xp-btn"
          style={{
            display: "grid",
            gridTemplateRows: "auto auto",
            rowGap: 2,
            alignContent: "center",
            justifyItems: "end",
            width: "100%",
            minWidth: 0,
            height: 54,
            padding: "6px 14px",
            fontFamily: UI_FONT,
            textAlign: "right",
            lineHeight: 1.2,
          }}
          aria-label={`Next case: ${nextCase.title}`}
          title={nextCase.title}
        >
          <span
            style={{
              color: INK_MUTED,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Next →
          </span>
          <span
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {nextCase.sector}
          </span>
        </button>
      </div>
    </div>
  );
}

function Block({ block }: { block: DetailBlock }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2
          style={{
            fontFamily: UI_FONT,
            fontSize: 22,
            fontWeight: 700,
            color: ACCENT,
            margin: "38px 0 14px",
            padding: "0 0 8px",
            borderBottom: `2px solid ${RULE}`,
            letterSpacing: "-0.005em",
            lineHeight: 1.25,
          }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          style={{
            fontFamily: UI_FONT,
            fontSize: 16,
            fontWeight: 700,
            color: INK_MUTED,
            margin: "24px 0 6px",
            letterSpacing: "0.005em",
            lineHeight: 1.3,
          }}
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          style={{
            fontFamily: BODY_FONT,
            fontSize: 15.5,
            lineHeight: 1.72,
            color: INK,
            margin: "0 0 16px",
          }}
        >
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          style={{
            margin: "4px 0 20px",
            padding: "0 0 0 4px",
            listStyle: "none",
          }}
        >
          {block.items.map((it, i) => (
            <li
              key={i}
              style={{
                position: "relative",
                padding: "6px 0 6px 24px",
                fontFamily: BODY_FONT,
                fontSize: 15,
                lineHeight: 1.65,
                color: INK,
                margin: 0,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 6,
                  color: ACCENT,
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 1.65,
                }}
              >
                ▸
              </span>
              {it}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <blockquote
          style={{
            margin: "24px 0",
            padding: "16px 22px",
            background: "#fff",
            border: `1px solid ${RULE}`,
            borderLeft: `4px solid ${ACCENT}`,
            fontFamily: BODY_FONT,
            fontStyle: "italic",
            color: ACCENT,
            fontSize: 17,
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          {block.text}
        </blockquote>
      );
    case "stack":
      return (
        <div
          style={{
            margin: "20px 0 24px",
            border: `1px solid ${RULE}`,
            background: "#fff",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 34%) 1fr",
              background: ACCENT,
              color: "#fff",
              fontFamily: UI_FONT,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ padding: "8px 14px" }}>Layer</div>
            <div
              style={{ padding: "8px 14px", borderLeft: "1px solid #1b3f8c" }}
            >
              Tool
            </div>
          </div>
          {block.rows.map(([layer, tool], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(180px, 34%) 1fr",
                borderTop: i === 0 ? "none" : `1px solid #ecead5`,
                background: i % 2 ? PAPER : "#fff",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  fontFamily: UI_FONT,
                  fontSize: 13,
                  fontWeight: 700,
                  color: INK_MUTED,
                }}
              >
                {layer}
              </div>
              <div
                style={{
                  padding: "10px 14px",
                  fontFamily: UI_FONT,
                  fontSize: 13,
                  color: INK,
                  borderLeft: "1px solid #ecead5",
                  lineHeight: 1.45,
                }}
              >
                {tool}
              </div>
            </div>
          ))}
        </div>
      );
  }
}
