"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CASE_STUDIES,
  type CaseStudy,
  type CaseStudyResult,
} from "@/lib/case-studies";
import { useCountUp } from "@/hooks/useCountUp";
import { useCaseDetail } from "@/hooks/useCaseDetailStore";
import { useWindowManager } from "@/components/xp/WindowManager";

/* =========================================================
   Shared metric-value hook — every variant animates its own
   numbers by wrapping this around the target <span>.
   ========================================================= */
function useMetricText(result: CaseStudyResult) {
  const { ref, formatted } = useCountUp({
    target: result.value,
    decimals: result.decimals ?? 0,
  });
  return {
    ref,
    prefix: result.prefix ?? "",
    suffix: result.suffix ?? "",
    formatted,
  };
}

/* =========================================================
   Variant 0 — Explorer Report (classic Windows details pane)
   ========================================================= */
function ExplorerReport({ cs }: { cs: CaseStudy }) {
  return (
    <article
      className="xp-bevel-raised"
      style={{
        background: "#ece9d8",
        padding: 18,
        display: "grid",
        gap: 16,
      }}
    >
      <header
        style={{
          background: "#0a3a8e",
          color: "#fff",
          padding: "8px 14px",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginTop: -18,
          marginLeft: -18,
          marginRight: -18,
          marginBottom: 2,
        }}
      >
        {cs.sector}
      </header>

      <h3
        style={{
          margin: "2px 0 0",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 17,
          fontWeight: 700,
          color: "#002a7b",
          lineHeight: 1.3,
        }}
      >
        {cs.title}
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(100px, 110px) 1fr",
          columnGap: 14,
          rowGap: 12,
          fontFamily: "Tahoma, sans-serif",
          fontSize: 14,
          lineHeight: 1.6,
          color: "#1a1a1a",
        }}
      >
        <div
          style={{
            color: "#3c3c3c",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            paddingTop: 2,
          }}
        >
          Challenge
        </div>
        <div>{cs.challenge}</div>
        <div
          style={{
            color: "#3c3c3c",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            paddingTop: 2,
          }}
        >
          Approach
        </div>
        <div>{cs.approach}</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cs.results.length}, minmax(0, 1fr))`,
          gap: 10,
          marginTop: 4,
        }}
      >
        {cs.results.map((r) => (
          <ExplorerMetric key={r.label} result={r} />
        ))}
      </div>
    </article>
  );
}

function ExplorerMetric({ result }: { result: CaseStudyResult }) {
  const { ref, prefix, formatted, suffix } = useMetricText(result);
  return (
    <div
      className="xp-bevel-sunken"
      style={{
        background: "#fff",
        padding: "14px 10px",
        textAlign: "center",
        minWidth: 0,
        display: "grid",
        gap: 6,
        alignContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Tahoma, sans-serif",
          fontSize: 11,
          color: "#3c3c3c",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          lineHeight: 1.3,
        }}
      >
        {result.label}
      </div>
      <div
        style={{
          fontFamily:
            'var(--font-pixel), "Pixelify Sans", "Courier New", monospace',
          fontSize: 26,
          fontWeight: 700,
          color: "#002a7b",
          lineHeight: 1.1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {prefix}
        <span ref={ref}>{formatted}</span>
        {suffix}
      </div>
    </div>
  );
}

/* =========================================================
   Variant 1 — Terminal Readout (DOS prompt)
   ========================================================= */
const TERM_FONT =
  '"Consolas", "Monaco", "Lucida Console", "Courier New", monospace';
const TERM_GREEN = "#9cff6f";
const TERM_DIM = "#5fcc55";
const TERM_WHITE = "#ffffff";

function TerminalReadout({ cs }: { cs: CaseStudy }) {
  return (
    <article
      className="xp-bevel-raised"
      style={{
        background: "#0b0f0a",
        padding: 0,
        display: "grid",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#c0c0c0",
          color: "#000",
          padding: "4px 8px",
          fontFamily: "Tahoma, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          borderBottom: "2px solid #000",
        }}
      >
        C:\&gt; CASES.EXE /case={cs.id}
      </div>

      <div
        style={{
          padding: "20px 22px 22px",
          fontFamily: TERM_FONT,
          fontSize: 15,
          color: TERM_GREEN,
          lineHeight: 1.65,
          minHeight: 320,
          letterSpacing: "0.01em",
        }}
      >
        <div style={{ color: TERM_DIM }}>
          &gt; SECTOR&nbsp;&nbsp;: <span style={{ color: TERM_WHITE }}>{cs.sector.toUpperCase()}</span>
        </div>
        <div style={{ color: TERM_DIM }}>
          &gt; LOADED&nbsp;&nbsp;: <span style={{ color: TERM_WHITE }}>{cs.results.length} METRICS OK</span>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ color: TERM_WHITE, fontWeight: 700 }}>&gt; TITLE</div>
          <div style={{ marginLeft: 18, color: TERM_GREEN }}>{cs.title}</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ color: TERM_WHITE, fontWeight: 700 }}>&gt; CHALLENGE</div>
          <div style={{ marginLeft: 18, color: TERM_GREEN }}>{cs.challenge}</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ color: TERM_WHITE, fontWeight: 700 }}>&gt; APPROACH</div>
          <div style={{ marginLeft: 18, color: TERM_GREEN }}>{cs.approach}</div>
        </div>

        <div style={{ marginTop: 18, color: TERM_WHITE, fontWeight: 700 }}>
          &gt; RESULTS
        </div>
        <div
          style={{
            marginLeft: 18,
            marginTop: 6,
            display: "grid",
            gap: 6,
          }}
        >
          {cs.results.map((r) => (
            <TerminalMetric key={r.label} result={r} />
          ))}
        </div>

        <div style={{ marginTop: 18, color: TERM_DIM }}>
          &gt; press <span style={{ color: TERM_WHITE }}>←</span> /{" "}
          <span style={{ color: TERM_WHITE }}>→</span> to continue
          <span className="xp-term-blink" style={{ color: TERM_WHITE }}>
            _
          </span>
        </div>
      </div>
    </article>
  );
}

function TerminalMetric({ result }: { result: CaseStudyResult }) {
  const { ref, prefix, formatted, suffix } = useMetricText(result);
  return (
    <div
      style={{
        fontFamily: TERM_FONT,
        fontSize: 15,
        display: "flex",
        alignItems: "baseline",
        gap: 8,
      }}
    >
      <span
        style={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          color: TERM_GREEN,
          borderBottom: `1px dotted ${TERM_DIM}`,
          transform: "translateY(-3px)",
        }}
      >
        {result.label.toUpperCase()}
      </span>
      <span style={{ color: TERM_WHITE, fontWeight: 700, whiteSpace: "nowrap" }}>
        {prefix}
        <span ref={ref}>{formatted}</span>
        {suffix}
      </span>
    </div>
  );
}

/* =========================================================
   Variant 2 — Excel '97 Spreadsheet
   ========================================================= */
const XL_FONT = '"Tahoma", "MS Sans Serif", "Segoe UI", sans-serif';
const XL_BORDER = "#bfbfbf";
const XL_HEADER_BG = "#d4d0c8";
const XL_SELECT = "#000";

interface XlRow {
  label: string;
  value: React.ReactNode;
  labelBold?: boolean;
  valueBold?: boolean;
  highlight?: boolean;
}

function XlCell({
  children,
  bold,
  highlight,
  align = "left",
  mono,
}: {
  children: React.ReactNode;
  bold?: boolean;
  highlight?: boolean;
  align?: "left" | "right";
  mono?: boolean;
}) {
  return (
    <div
      style={{
        padding: "3px 8px",
        borderRight: `1px solid ${XL_BORDER}`,
        borderBottom: `1px solid ${XL_BORDER}`,
        background: "#fff",
        fontFamily: mono ? '"Consolas", "Courier New", monospace' : XL_FONT,
        fontSize: 13,
        fontWeight: bold ? 700 : 400,
        color: "#000",
        textAlign: align,
        outline: highlight ? `2px solid ${XL_SELECT}` : "none",
        outlineOffset: highlight ? "-2px" : undefined,
        position: highlight ? "relative" : undefined,
        zIndex: highlight ? 1 : undefined,
        whiteSpace: "normal",
        wordBreak: "break-word",
      }}
    >
      {children}
    </div>
  );
}

function XlRowNumber({ n }: { n: number }) {
  return (
    <div
      style={{
        padding: "3px 6px",
        background: XL_HEADER_BG,
        borderRight: `1px solid ${XL_BORDER}`,
        borderBottom: `1px solid ${XL_BORDER}`,
        borderTop: "1px solid #fff",
        borderLeft: "1px solid #fff",
        fontFamily: XL_FONT,
        fontSize: 12,
        color: "#000",
        textAlign: "center",
      }}
    >
      {n}
    </div>
  );
}

function SpreadsheetView({ cs }: { cs: CaseStudy }) {
  const rows: XlRow[] = [
    { label: "Sector", value: cs.sector, labelBold: true },
    { label: "Title", value: cs.title, labelBold: true, valueBold: true },
    { label: "Challenge", value: cs.challenge, labelBold: true },
    { label: "Approach", value: cs.approach, labelBold: true },
    { label: "", value: "" },
    { label: "Metric", value: "Value", labelBold: true, valueBold: true },
    ...cs.results.map((r, i) => ({
      label: r.label,
      value: <XlNumber result={r} />,
      highlight: i === cs.results.length - 1,
    })),
  ];
  const selected = rows.findIndex((r) => r.highlight);
  const selectedRef = selected >= 0 ? `B${selected + 1}` : "A1";

  return (
    <article
      className="xp-bevel-raised"
      style={{
        background: "#d4d0c8",
        padding: 0,
        display: "grid",
        overflow: "hidden",
      }}
    >
      {/* Menu strip */}
      <div
        style={{
          background: XL_HEADER_BG,
          padding: "4px 10px",
          fontFamily: XL_FONT,
          fontSize: 12,
          color: "#000",
          borderBottom: `1px solid ${XL_BORDER}`,
          display: "flex",
          gap: 14,
        }}
      >
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Insert</span>
        <span>Format</span>
        <span>Tools</span>
        <span>Data</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      {/* Formula bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "72px 28px 1fr",
          alignItems: "center",
          padding: "4px 6px",
          background: XL_HEADER_BG,
          borderBottom: `1px solid ${XL_BORDER}`,
          gap: 6,
        }}
      >
        <div
          className="xp-bevel-sunken"
          style={{
            background: "#fff",
            padding: "2px 6px",
            fontFamily: XL_FONT,
            fontSize: 12,
            textAlign: "left",
          }}
        >
          {selectedRef} ▼
        </div>
        <div
          style={{
            fontFamily: '"Times New Roman", serif',
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 14,
            textAlign: "center",
            color: "#000",
          }}
        >
          fx
        </div>
        <div
          className="xp-bevel-sunken"
          style={{
            background: "#fff",
            padding: "2px 6px",
            fontFamily: '"Consolas", "Courier New", monospace',
            fontSize: 12,
            color: "#006400",
          }}
        >
          =CASE.LATEST(&quot;{cs.id}&quot;)
        </div>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "32px 180px 1fr",
          background: XL_HEADER_BG,
        }}
      >
        <div
          style={{
            borderRight: `1px solid ${XL_BORDER}`,
            borderBottom: `1px solid ${XL_BORDER}`,
            background: XL_HEADER_BG,
          }}
        />
        <div
          style={{
            padding: "3px 0",
            textAlign: "center",
            fontFamily: XL_FONT,
            fontSize: 12,
            fontWeight: 400,
            borderRight: `1px solid ${XL_BORDER}`,
            borderBottom: `1px solid ${XL_BORDER}`,
            borderTop: "1px solid #fff",
          }}
        >
          A
        </div>
        <div
          style={{
            padding: "3px 0",
            textAlign: "center",
            fontFamily: XL_FONT,
            fontSize: 12,
            fontWeight: 400,
            borderRight: `1px solid ${XL_BORDER}`,
            borderBottom: `1px solid ${XL_BORDER}`,
            borderTop: "1px solid #fff",
          }}
        >
          B
        </div>
      </div>

      {/* Data rows */}
      <div style={{ background: "#fff" }}>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "32px 180px 1fr",
            }}
          >
            <XlRowNumber n={i + 1} />
            <XlCell bold={row.labelBold}>{row.label}</XlCell>
            <XlCell bold={row.valueBold} highlight={row.highlight}>
              {row.value}
            </XlCell>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div
        style={{
          background: XL_HEADER_BG,
          padding: "3px 10px",
          borderTop: `1px solid ${XL_BORDER}`,
          fontFamily: XL_FONT,
          fontSize: 11,
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Ready</span>
        <span>Sheet1 — {cs.id}.xls</span>
        <span>NUM</span>
      </div>
    </article>
  );
}

function XlNumber({ result }: { result: CaseStudyResult }) {
  const { ref, prefix, formatted, suffix } = useMetricText(result);
  return (
    <span
      style={{
        fontFamily: '"Consolas", "Courier New", monospace',
        fontWeight: 700,
        color: "#006400",
      }}
    >
      {prefix}
      <span ref={ref}>{formatted}</span>
      {suffix}
    </span>
  );
}

/* =========================================================
   Variant 3 — Receipt / Dot-matrix printout
   ========================================================= */
function ReceiptPrintout({ cs }: { cs: CaseStudy }) {
  const dashes = "-".repeat(44);
  return (
    <article
      style={{
        background: "#faf7ef",
        padding: 0,
        display: "grid",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        border: "1px solid #9c9483",
        fontFamily:
          'var(--font-bitmap), "VT323", "Consolas", "Courier New", monospace',
        color: "#111",
        overflow: "hidden",
      }}
    >
      {/* Top tear edge */}
      <div
        aria-hidden="true"
        style={{
          height: 10,
          background:
            "linear-gradient(45deg, #faf7ef 25%, transparent 25%) 0 0 / 10px 10px, linear-gradient(-45deg, #faf7ef 25%, transparent 25%) 0 0 / 10px 10px",
          backgroundColor: "#9c9483",
        }}
      />

      <div style={{ padding: "14px 22px 16px", fontSize: 18, lineHeight: 1.35 }}>
        <div style={{ textAlign: "center", fontWeight: 700, letterSpacing: "0.1em" }}>
          * JERMAYA ADS — CASE RECEIPT *
        </div>
        <div style={{ textAlign: "center", fontSize: 13, color: "#555" }}>
          store #01 &nbsp;·&nbsp; tx-{cs.id}
        </div>
        <div style={{ color: "#555" }}>{dashes}</div>

        <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 4 }}>
          <div style={{ color: "#555" }}>SECTOR</div>
          <div style={{ fontWeight: 700 }}>{cs.sector}</div>
          <div style={{ color: "#555" }}>DATE</div>
          <div>2026-04-20</div>
        </div>

        <div style={{ color: "#555", marginTop: 6 }}>{dashes}</div>
        <div style={{ fontWeight: 700 }}>TITLE</div>
        <div>{cs.title}</div>

        <div style={{ color: "#555", marginTop: 6 }}>{dashes}</div>
        <div style={{ fontWeight: 700 }}>CHALLENGE</div>
        <div>{cs.challenge}</div>

        <div style={{ fontWeight: 700, marginTop: 6 }}>APPROACH</div>
        <div>{cs.approach}</div>

        <div style={{ color: "#555", marginTop: 8 }}>{dashes}</div>
        <div style={{ fontWeight: 700 }}>RESULTS</div>
        <div style={{ display: "grid", gap: 2, marginTop: 2 }}>
          {cs.results.map((r) => (
            <ReceiptMetric key={r.label} result={r} />
          ))}
        </div>

        <div style={{ color: "#555", marginTop: 8 }}>{dashes}</div>
        <div style={{ textAlign: "center", fontSize: 15, marginTop: 4 }}>
          *** THANK YOU — COME AGAIN ***
        </div>
      </div>

      {/* Bottom tear edge */}
      <div
        aria-hidden="true"
        style={{
          height: 10,
          background:
            "linear-gradient(45deg, transparent 25%, #faf7ef 25%) 0 100% / 10px 10px, linear-gradient(-45deg, transparent 25%, #faf7ef 25%) 0 100% / 10px 10px",
          backgroundColor: "#9c9483",
        }}
      />
    </article>
  );
}

function ReceiptMetric({ result }: { result: CaseStudyResult }) {
  const { ref, prefix, formatted, suffix } = useMetricText(result);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8,
        fontSize: 17,
      }}
    >
      <span
        style={{
          flex: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "clip",
          borderBottom: "1px dotted #555",
          transform: "translateY(-4px)",
        }}
      >
        {result.label}
      </span>
      <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>
        {prefix}
        <span ref={ref}>{formatted}</span>
        {suffix}
      </span>
    </div>
  );
}

/* =========================================================
   Variant registry — index into this to pick a look per slide
   ========================================================= */
const VARIANTS: Array<{
  key: string;
  label: string;
  render: (cs: CaseStudy) => React.ReactElement;
}> = [
  { key: "explorer", label: "Explorer Report", render: (cs) => <ExplorerReport cs={cs} /> },
  { key: "terminal", label: "Terminal Readout", render: (cs) => <TerminalReadout cs={cs} /> },
  { key: "spreadsheet", label: "Spreadsheet — Sheet1.xls", render: (cs) => <SpreadsheetView cs={cs} /> },
  { key: "receipt", label: "Receipt Printout", render: (cs) => <ReceiptPrintout cs={cs} /> },
];

/* =========================================================
   Top-level carousel
   ========================================================= */
interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

function NavButton({ direction, onClick }: NavButtonProps) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous case study" : "Next case study"}
      className="xp-btn"
      style={{
        width: 44,
        height: 44,
        fontSize: 22,
        fontWeight: 700,
        fontFamily:
          'var(--font-pixel), "Pixelify Sans", "Tahoma", sans-serif',
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {isPrev ? "←" : "→"}
    </button>
  );
}

export function CaseStudiesContent() {
  const [index, setIndex] = useState(0);
  const total = CASE_STUDIES.length;
  const cs = CASE_STUDIES[index];
  const variant = VARIANTS[index % VARIANTS.length];

  const { setSelectedCaseId } = useCaseDetail();
  const { open: openWindow } = useWindowManager();

  const openReadMore = useCallback(() => {
    setSelectedCaseId(cs.id);
    openWindow("case-detail");
  }, [cs.id, openWindow, setSelectedCaseId]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        className="xp-bevel-sunken"
        style={{
          background: "#fff",
          padding: 6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <p className="xp-p" style={{ margin: 0 }}>
          Address: <strong>C:\Jermaya\CaseStudies\</strong>
          {cs.id}
          <span>.{variant.key}</span>
        </p>
        <span
          style={{
            fontFamily: "Tahoma, sans-serif",
            fontSize: 12,
            color: "#3c3c3c",
          }}
        >
          Case {index + 1} of {total} &nbsp;·&nbsp; view:{" "}
          <strong>{variant.label}</strong>
        </span>
      </div>

      {/* Slide — keyed by index so metrics remount and recount */}
      <div key={`${cs.id}-${variant.key}`}>{variant.render(cs)}</div>

      {/* Read more — opens the full write-up in its own window */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          onClick={openReadMore}
          className="xp-btn"
          style={{
            width: "auto",
            height: 40,
            padding: "0 18px",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "Tahoma, sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          Read full case study →
        </button>
      </div>

      {/* Carousel controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 2,
        }}
      >
        <NavButton direction="prev" onClick={goPrev} />

        <div
          role="tablist"
          aria-label="Select case study"
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          {CASE_STUDIES.map((c, i) => {
            const active = i === index;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Go to ${c.sector}`}
                onClick={() => setIndex(i)}
                style={{
                  width: 14,
                  height: 14,
                  padding: 0,
                  border: "1px solid #000",
                  background: active ? "#0a3a8e" : "#fff",
                  boxShadow: active
                    ? "inset 1px 1px 0 #4477d8"
                    : "inset 1px 1px 0 #ece9d8",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>

        <NavButton direction="next" onClick={goNext} />
      </div>

      <p
        className="xp-p"
        style={{
          margin: "2px 0 0",
          color: "#3c3c3c",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        Tip: use ← / → arrow keys. Each case renders in its own app-style — hit
        <strong>&nbsp;Read full case study</strong> for the long version.
      </p>
    </div>
  );
}
