"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DocumentIcon, FolderIcon, PaintIcon, WorkIcon } from "@/components/xp/PixelIcons";
import type { WorkCategory } from "@/lib/redesign-content";
import { WORK_PROJECTS } from "@/lib/redesign-content";

const CATEGORY_ICON: Record<WorkCategory, (p: { size?: number; className?: string }) => React.ReactElement> = {
  product: PaintIcon,
  dev: DocumentIcon,
  ai: DocumentIcon,
  sea: WorkIcon,
  consultancy: FolderIcon,
};

/**
 * Portfolio thumbnail mapping — uses real screenshots from jermayads.nl.
 * Maps each project to one of the 14 portfolio images we already downloaded.
 */
const PORTFOLIO_THUMB: Record<string, string> = {
  applepy: "/images/hustles/planet.svg",
  orangepy: "/images/hustles/bird.svg",
  "affiliate-portfolio": "/images/portfolio/1.png",
  "performance-max-script": "/images/portfolio/2.png",
  "meta-marketing-api": "/images/portfolio/3.png",
  "google-shopping-item-id": "/images/portfolio/4.png",
  "sea-scaleup": "/images/portfolio/5.png",
  "rag-content-pipeline": "/images/portfolio/6.png",
  "programmatic-seo": "/images/portfolio/7.png",
  "max-ict-head-of-search": "/images/portfolio/8.png",
  "searchresult-cro": "/images/portfolio/9.png",
  "partout-strategy": "/images/portfolio/10.png",
};

export function WorkContent() {
  const [selected, setSelected] = useState<string>(WORK_PROJECTS[0].id);
  const [treeOpen, setTreeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sel = WORK_PROJECTS.find((p) => p.id === selected) ?? WORK_PROJECTS[0];
  const selThumb = PORTFOLIO_THUMB[sel.id];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const showTree = !isMobile || treeOpen;

  const handlePick = (id: string) => {
    setSelected(id);
    setTreeOpen(false);
  };

  return (
    <div
      className="xp-work-layout"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(240px, 28%) 1fr",
        gap: 10,
        minHeight: 320,
      }}
    >
      {/* Mobile toggle bar — visible only on narrow viewports */}
      {isMobile ? (
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 0",
            fontFamily: "Tahoma, sans-serif",
            fontSize: 13,
          }}
        >
          <span style={{ color: "#3c3c3c" }}>
            {sel.number} — {sel.title}
          </span>
          <button
            type="button"
            onClick={() => setTreeOpen((v) => !v)}
            className="xp-btn"
            style={{
              width: "auto",
              height: 32,
              padding: "0 12px",
              fontSize: 12,
            }}
          >
            {treeOpen ? "Hide projects" : `Projects (${WORK_PROJECTS.length}) ▾`}
          </button>
        </div>
      ) : null}
      {/* Left pane — tree */}
      <div
        className={`xp-bevel-sunken xp-work-tree${showTree ? "" : " is-collapsed"}`}
        style={{
          background: "#fff",
          padding: 8,
          fontFamily: "Tahoma, sans-serif",
          fontSize: 14,
          color: "#000",
          display: showTree ? undefined : "none",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14 }}>
          📁 Projects
        </div>
        {WORK_PROJECTS.map((p) => {
          const Icon = CATEGORY_ICON[p.category];
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePick(p.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "6px 8px",
                marginBottom: 2,
                border: 0,
                background:
                  selected === p.id ? "#316ac5" : "transparent",
                color: selected === p.id ? "#fff" : "#000",
                fontSize: 14,
                fontFamily: "inherit",
                textAlign: "left",
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              <Icon size={18} />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2,
                }}
              >
                {p.number} — {p.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right pane — details */}
      <div
        className="xp-bevel-sunken"
        style={{ background: "#fff", padding: 14 }}
      >
        {/* Real portfolio thumbnail */}
        {selThumb ? (
          <div
            style={{
              width: "100%",
              border: "2px solid #000",
              background: "#ece9d8",
              marginBottom: 12,
              position: "relative",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <Image
              src={selThumb}
              alt={`${sel.title} screenshot`}
              fill
              sizes="400px"
              style={{
                objectFit: "contain",
                imageRendering: "pixelated",
              }}
            />
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          {CATEGORY_ICON[sel.category]({ size: 40 })}
          <div>
            <h2
              className="xp-h1"
              style={{ margin: 0, fontSize: 22, color: "#002a7b" }}
            >
              {sel.title}
            </h2>
            <p className="xp-p" style={{ margin: "4px 0 0", fontSize: 14 }}>
              [{sel.categoryLabel}] — {sel.role}
            </p>
          </div>
        </div>

        <p className="xp-p">{sel.summary}</p>

        <table
          style={{
            marginTop: 12,
            borderCollapse: "collapse",
            fontFamily: "Tahoma, sans-serif",
            fontSize: 14,
            width: "100%",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "3px 8px", color: "#3c3c3c" }}>Outcome</td>
              <td style={{ padding: "3px 8px", fontWeight: 700 }}>
                {sel.outcomeMetric} {sel.outcomeLabel}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "3px 8px", color: "#3c3c3c" }}>Status</td>
              <td style={{ padding: "3px 8px" }}>
                {sel.href ? "Public — link available" : "On file"}
              </td>
            </tr>
          </tbody>
        </table>

        {sel.href ? (
          <p style={{ marginTop: 14 }}>
            <a
              href={sel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="xp-link"
            >
              Open external link →
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
