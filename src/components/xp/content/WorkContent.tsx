"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  AdsRobotIcon,
  BookStackIcon,
  DiscountTagIcon,
  DocumentIcon,
  ForecastChartIcon,
  GlobeIcon,
  NewspaperAIIcon,
  PottedPlantIcon,
  ScaleIcon,
  ShopBagAIIcon,
  SpreadsheetIcon,
  TerminalIcon,
} from "@/components/xp/PixelIcons";
import { WORK_PROJECTS, type WorkProject } from "@/lib/redesign-content";
import type { PublicWorkProject } from "@/types/work";

type PixelIcon = (p: { size?: number; className?: string }) => React.ReactElement;

// Icon registry (key → component). Admin-picked icons resolve through this.
const ICON_COMPONENTS: Record<string, PixelIcon> = {
  NewspaperAIIcon,
  DiscountTagIcon,
  ScaleIcon,
  BookStackIcon,
  AdsRobotIcon,
  TerminalIcon,
  ShopBagAIIcon,
  GlobeIcon,
  SpreadsheetIcon,
  ForecastChartIcon,
  PottedPlantIcon,
  DocumentIcon,
};

// Fallback icon for hardcoded projects — key by project id.
const PROJECT_ICON: Record<string, PixelIcon> = {
  "flavor-press": NewspaperAIIcon,
  "qorting": DiscountTagIcon,
  "aanbiedingen-vergelijken": ScaleIcon,
  "claude-skills": BookStackIcon,
  "google-ads-ai-system": AdsRobotIcon,
  "adsscripts": TerminalIcon,
  "shopify-agentspace": ShopBagAIIcon,
  "pouchdirect-multilingual": GlobeIcon,
  "mcc-infrastructure": SpreadsheetIcon,
  "ai-forecast-agentspace": ForecastChartIcon,
  "neverleafs": PottedPlantIcon,
};

/** Portfolio thumbnail mapping — real screenshots for hardcoded projects. */
const PORTFOLIO_THUMB: Record<string, string> = {
  "flavor-press": "/images/portfolio/1.png",
  "qorting": "/images/portfolio/2.png",
  "aanbiedingen-vergelijken": "/images/portfolio/3.png",
  "claude-skills": "/images/portfolio/4.png",
  "google-ads-ai-system": "/images/portfolio/5.png",
  "adsscripts": "/images/portfolio/6.png",
  "shopify-agentspace": "/images/portfolio/7.png",
  "pouchdirect-multilingual": "/images/portfolio/8.png",
  "mcc-infrastructure": "/images/portfolio/9.png",
  "ai-forecast-agentspace": "/images/portfolio/10.png",
  "neverleafs": "/images/portfolio/11.png",
};

/** Unified shape the view renders — so DB and hardcoded projects look identical. */
type DisplayProject = WorkProject & { thumbnail?: string; iconKey?: string };

function fromPublic(p: PublicWorkProject): DisplayProject {
  return {
    id: p.slug,
    number: p.number || "",
    title: p.title,
    category: p.category,
    categoryLabel: p.category_label || p.category,
    role: p.role,
    outcomeMetric: p.outcome_metric,
    outcomeLabel: p.outcome_label,
    summary: p.summary,
    thumbnail: p.thumbnail_url ?? undefined,
    href: p.href ?? undefined,
    featured: p.featured,
    iconKey: p.icon_key,
  };
}

function fromHardcoded(p: WorkProject): DisplayProject {
  return { ...p, thumbnail: PORTFOLIO_THUMB[p.id] };
}

function iconFor(p: DisplayProject): PixelIcon {
  if (p.iconKey && ICON_COMPONENTS[p.iconKey]) return ICON_COMPONENTS[p.iconKey];
  return PROJECT_ICON[p.id] ?? (DocumentIcon as PixelIcon);
}

export function WorkContent() {
  const [dbProjects, setDbProjects] = useState<PublicWorkProject[] | null>(null);
  const [treeOpen, setTreeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/work-projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        setDbProjects((j.projects ?? []) as PublicWorkProject[]);
      })
      .catch(() => {
        if (!cancelled) setDbProjects([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Merge rule: if there are any DB projects, the admin-managed list takes
  // over entirely. Otherwise fall back to the original hardcoded list so
  // the site keeps working when Supabase is empty.
  const projects = useMemo<DisplayProject[]>(() => {
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map(fromPublic);
    }
    return WORK_PROJECTS.map(fromHardcoded);
  }, [dbProjects]);

  // Track the user's explicit pick; fall back to the first project when the
  // pick isn't in the current list (e.g. DB loaded after mount, or the picked
  // project was deleted). Derived — no effect needed.
  const [userPick, setUserPick] = useState<string | null>(null);
  const selected =
    userPick && projects.some((p) => p.id === userPick)
      ? userPick
      : (projects[0]?.id ?? "");
  const sel = projects.find((p) => p.id === selected) ?? projects[0];

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
    setUserPick(id);
    setTreeOpen(false);
  };

  if (!sel) {
    return (
      <div style={{ padding: 18, fontFamily: "Tahoma, sans-serif" }}>
        No projects yet.
      </div>
    );
  }

  const selIcon = iconFor(sel);

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
      {/* Mobile toggle bar */}
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
            {treeOpen ? "Hide projects" : `Projects (${projects.length}) ▾`}
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
        {projects.map((p) => {
          const Icon = iconFor(p);
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
                background: selected === p.id ? "#316ac5" : "transparent",
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
                {p.number ? `${p.number} — ` : ""}
                {p.title}
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
        {sel.thumbnail ? (
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
              src={sel.thumbnail}
              alt={`${sel.title} screenshot`}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 70vw, 900px"
              style={{
                objectFit: "contain",
                imageRendering: "auto",
              }}
              // Remote images uploaded via Supabase need unoptimised rendering
              // because we don't configure next.config images.domains dynamically.
              unoptimized={sel.thumbnail.startsWith("http")}
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
          {selIcon({ size: 40 })}
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
