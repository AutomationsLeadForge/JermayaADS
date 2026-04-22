"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CV_EDUCATION, CV_JOBS, type CVEducation, type CVJob } from "@/lib/cv";

type Tab = "experience" | "education" | "overview";

/**
 * Category-scoped palette for the extended Toolbelt. Each category gets its
 * own chip colour variant + header dot so the long list of AI/agent tools
 * reads as distinct groups instead of a wall of identical green pills.
 * The dot colour matches the chip variant's border, and the chip class
 * applies the full background/border/text combo from globals.css.
 */
const TOOL_CAT_STYLES: Record<string, { chip: string; dot: string }> = {
  "Marketing & Analytics": { chip: "cv-chip--info", dot: "#2e6db0" },
  "Automation & AI": { chip: "cv-chip--fuchsia", dot: "#8a2f86" },
  "Agents & Orchestration": { chip: "cv-chip--rose", dot: "#a83a4b" },
  "Memory & RAG": { chip: "cv-chip--accent", dot: "#b78d0e" },
  "Embeddings": { chip: "cv-chip--teal", dot: "#2e7c74" },
  "Vector Stores": { chip: "cv-chip--freelance", dot: "#5f4a9b" },
  "Caching & Optimization": { chip: "cv-chip--orange", dot: "#a86028" },
  "Evals & Observability": { chip: "cv-chip--slate", dot: "#5e6170" },
  "Fine-tuning & Training": { chip: "cv-chip--lime", dot: "#6a8e20" },
  "Infra & Deployment": { chip: "cv-chip--ok", dot: "#3f8a2a" },
  "Automation & Scraping": { chip: "cv-chip--info", dot: "#2e6db0" },
};

function extractStartYear(period: string): string {
  const m = period.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "—";
}

function LogoOrFallback({ job }: { job: CVJob }) {
  if (job.logo) {
    return (
      <div
        className="xp-bevel-sunken"
        style={{
          width: 52,
          height: 52,
          background: "#fff",
          padding: 2,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src={job.logo}
          alt={`${job.company} logo`}
          width={48}
          height={48}
          style={{
            width: 48,
            height: 48,
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }
  const letter =
    job.company.replace(/^[^A-Za-z0-9]+/, "").charAt(0).toUpperCase() || "?";
  const palette: Array<[string, string]> = [
    ["#0058e6", "#74a9ff"],
    ["#c62727", "#ff7070"],
    ["#3ba419", "#8fe26a"],
    ["#b78d0e", "#ffd94a"],
    ["#6a1b9a", "#c184e0"],
  ];
  const [bg, hi] = palette[letter.charCodeAt(0) % palette.length];
  return (
    <div
      className="xp-bevel-sunken"
      style={{
        width: 52,
        height: 52,
        background: `linear-gradient(135deg, ${bg} 0%, ${hi} 100%)`,
        color: "#fff",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        fontFamily: "Tahoma, sans-serif",
        fontSize: 24,
        fontWeight: 800,
        textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
      }}
    >
      {letter}
    </div>
  );
}

function JobCard({ job }: { job: CVJob }) {
  return (
    <div className="cv-card">
      <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: 10 }}>
        <LogoOrFallback job={job} />
        <div style={{ minWidth: 0 }}>
          <div className="cv-card-title">{job.title}</div>
          <div className="cv-card-company" style={{ marginTop: 2 }}>
            {job.companyUrl ? (
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${job.company} (external)`}
              >
                {job.company} ↗
              </a>
            ) : (
              <span style={{ fontWeight: 700, color: "#3c3c3c" }}>
                {job.company}
              </span>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              marginTop: 6,
            }}
          >
            <span className="cv-chip cv-chip--accent">{job.period}</span>
            <span className="cv-chip">{job.duration}</span>
            {job.kind ? (
              <span className="cv-chip cv-chip--freelance">{job.kind}</span>
            ) : null}
            {job.location ? (
              <span className="cv-chip">📍 {job.location}</span>
            ) : null}
          </div>
          {job.description ? (
            <p
              style={{
                fontFamily: "Tahoma, sans-serif",
                fontSize: 12,
                lineHeight: 1.5,
                color: "#1a1613",
                margin: "8px 0 0",
              }}
            >
              {job.description}
            </p>
          ) : null}
          {job.skills ? (
            <div
              style={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                gap: 5,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "Tahoma, sans-serif",
                  fontSize: 10.5,
                  color: "#6b6156",
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                }}
              >
                Skills:
              </span>
              {job.skills.split(",").map((s) => (
                <span key={s.trim()} className="cv-chip cv-chip--ok">
                  {s.trim()}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function EduCard({ e }: { e: CVEducation }) {
  return (
    <div className="cv-card">
      <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: 10 }}>
        {e.logo ? (
          <div
            className="xp-bevel-sunken"
            style={{
              width: 52,
              height: 52,
              background: "#fff",
              padding: 2,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={e.logo}
              alt={`${e.school} logo`}
              width={48}
              height={48}
              style={{
                width: 48,
                height: 48,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ) : (
          <div
            className="xp-bevel-sunken"
            style={{
              width: 52,
              height: 52,
              background: "linear-gradient(135deg, #ffd319 0%, #ff9218 100%)",
              color: "#1a1613",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              fontSize: 26,
            }}
            aria-hidden="true"
          >
            🎓
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <div className="cv-card-title">
            {e.schoolUrl ? (
              <a
                href={e.schoolUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0058e6",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
                title={`Open ${e.school} (external)`}
              >
                {e.school} ↗
              </a>
            ) : (
              e.school
            )}
          </div>
          <div
            style={{
              fontFamily: "Tahoma, sans-serif",
              fontSize: 12,
              color: "#3c3c3c",
              marginTop: 2,
            }}
          >
            {e.degree}
          </div>
          <div style={{ marginTop: 6 }}>
            <span className="cv-chip cv-chip--accent">{e.period}</span>
          </div>
          {e.thesis ? (
            <p
              style={{
                fontFamily: "Tahoma, sans-serif",
                fontSize: 11.5,
                lineHeight: 1.5,
                color: "#1a1613",
                margin: "8px 0 0",
                borderLeft: "3px solid #ffd319",
                background: "#fffbe6",
                padding: "5px 8px",
              }}
            >
              <strong>Thesis:</strong> {e.thesis.replace(/^Thesis:\s?/i, "")}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  badge,
  emoji,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  badge?: string;
  emoji: string;
}) {
  return (
    <button
      type="button"
      className={`cv-tab${active ? " is-active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span style={{ marginRight: 6 }} aria-hidden="true">
        {emoji}
      </span>
      <span style={active ? { textDecoration: "underline" } : undefined}>
        {label}
      </span>
      {badge ? (
        <span
          style={{
            marginLeft: 6,
            background: active ? "#0058e6" : "#808080",
            color: "#fff",
            padding: "0 5px",
            fontSize: 10,
            borderRadius: 2,
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function OverviewPanel() {
  const [showAllTools, setShowAllTools] = useState(false);

  const industries = [
    "E-commerce",
    "B2B SaaS",
    "Skincare",
    "Kitchens & Homeware",
    "Horticulture",
    "Men's Fashion",
    "Packaging",
    "Energy & Utilities",
    "Event Venues",
    "Furniture",
    "Mattresses",
    "Optics",
  ];
  // Curated top-row: SEA fundamentals + the trending 2026 AI/agent stack.
  const tools = [
    "Google Ads",
    "GA4",
    "SA360",
    "BigQuery",
    "Python",
    "TypeScript",
    "Claude Code",
    "Claude API",
    "OpenAI API",
    "LangGraph",
    "n8n",
    "Supabase",
    "Looker Studio",
    "Prompt caching",
  ];
  const advancedToolCategories: Array<{ name: string; items: string[] }> = [
    {
      name: "Marketing & Analytics",
      items: [
        "Microsoft Ads",
        "Meta Ads",
        "GTM",
        "Channable",
      ],
    },
    {
      name: "Automation & AI",
      items: [
        "Gemini API",
        "Mistral API",
        "Groq",
        "Ollama",
        "Together AI",
        "Fireworks AI",
        "Replicate",
        "Hugging Face Inference API",
        "Perplexity API",
        "Cohere API",
        "Anthropic Workbench",
      ],
    },
    {
      name: "Agents & Orchestration",
      items: [
        "LangChain",
        "LlamaIndex",
        "CrewAI",
        "AutoGen",
        "AgentOps",
        "Composio",
        "Pydantic AI",
        "Smolagents",
        "ControlFlow",
        "Prefect",
        "Airflow",
        "Multi-agent systems",
        "Supervisor agents",
        "Subagents",
        "Tool-calling agents",
        "ReAct agents",
        "Plan-and-execute agents",
        "Reflection agents",
        "Self-healing agents",
        "Agentic loops",
        "Human-in-the-loop",
        "Agent memory",
        "Agent routing",
        "Parallel agent execution",
        "Agent chaining",
        "Task decomposition",
        "Dynamic tool selection",
      ],
    },
    {
      name: "Memory & RAG",
      items: [
        "RAG pipelines",
        "Hybrid search",
        "Semantic chunking",
        "Contextual retrieval",
        "Parent-child chunking",
        "Sentence window retrieval",
        "HyDE",
        "FLARE",
        "Re-ranking",
        "BM25",
        "ColBERT",
        "Multi-hop RAG",
        "Agentic RAG",
        "Self-RAG",
        "Corrective RAG",
        "GraphRAG",
        "Long-context RAG",
        "Episodic memory",
        "Semantic memory",
        "Procedural memory",
        "Working memory",
        "Memory distillation",
      ],
    },
    {
      name: "Embeddings",
      items: [
        "OpenAI Embeddings",
        "Cohere Embed",
        "text-embedding-3",
        "BGE",
        "E5",
        "Instructor",
        "Jina Embeddings",
        "Nomic Embed",
        "Sentence Transformers",
        "Matryoshka embeddings",
        "Binary embeddings",
        "Late chunking",
      ],
    },
    {
      name: "Vector Stores",
      items: [
        "Pinecone",
        "Weaviate",
        "Qdrant",
        "Chroma",
        "Milvus",
        "pgvector",
        "Redis Vector",
        "Supabase Vector",
        "LanceDB",
        "Faiss",
      ],
    },
    {
      name: "Caching & Optimization",
      items: [
        "KV caching",
        "Semantic caching",
        "Claude prompt caching",
        "GPTCache",
        "Redis caching",
        "Exact-match caching",
        "Fuzzy caching",
        "Token optimization",
        "Context window management",
        "Streaming responses",
        "Batching API calls",
        "Speculative decoding",
        "Quantization",
        "Distillation",
        "Structured outputs",
        "JSON mode",
        "Function calling",
        "Parallel tool use",
      ],
    },
    {
      name: "Evals & Observability",
      items: [
        "LangSmith",
        "LangFuse",
        "Helicone",
        "Braintrust",
        "Weights & Biases",
        "Arize",
        "Phoenix",
        "Promptfoo",
        "Ragas",
        "TruLens",
        "OpenTelemetry",
        "Tracing",
        "Span logging",
        "Token usage tracking",
        "Latency monitoring",
        "Hallucination detection",
        "Groundedness scoring",
      ],
    },
    {
      name: "Fine-tuning & Training",
      items: [
        "LoRA",
        "QLoRA",
        "PEFT",
        "SFT",
        "DPO",
        "RLHF",
        "Axolotl",
        "Unsloth",
        "OpenAI fine-tuning",
        "Together AI fine-tuning",
        "Synthetic data generation",
        "Data augmentation",
        "Prompt engineering",
        "Few-shot learning",
        "Chain-of-thought",
        "Tree-of-thought",
      ],
    },
    {
      name: "Infra & Deployment",
      items: [
        "FastAPI",
        "Streamlit",
        "Gradio",
        "Docker",
        "GitHub Actions",
        "Modal",
        "Render",
        "Railway",
        "Vercel",
        "AWS Lambda",
        "Google Cloud Run",
        "Firebase",
        "Neon",
      ],
    },
    {
      name: "Automation & Scraping",
      items: [
        "Zapier",
        "Playwright",
        "Puppeteer",
        "Selenium",
        "Apify",
        "PhantomBuster",
        "Browserbase",
      ],
    },
  ];
  const advancedCount = advancedToolCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0,
  );
  const stats = [
    { k: "10+", v: "Years SEA" },
    { k: "26", v: "Gigs" },
    { k: "€ M+", v: "Spend steered" },
    { k: "3", v: "Diplomas" },
  ];

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <section className="cv-group">
        <div className="cv-group-title">By the numbers</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 8,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.v}
              className="xp-bevel-raised"
              style={{
                background: "#fff",
                padding: "10px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-pixel), 'Pixelify Sans', Tahoma, sans-serif",
                  fontSize: 26,
                  color: "#002a7b",
                  lineHeight: 1,
                }}
              >
                {s.k}
              </div>
              <div
                style={{
                  fontFamily: "Tahoma, sans-serif",
                  fontSize: 10.5,
                  color: "#3c3c3c",
                  marginTop: 4,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-group">
        <div className="cv-group-title">Industries worked in</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {industries.map((i) => (
            <span key={i} className="cv-chip">
              {i}
            </span>
          ))}
        </div>
      </section>

      <section className="cv-group">
        <div className="cv-group-title">Toolbelt</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {tools.map((t) => (
            <span key={t} className="cv-chip cv-chip--ok">
              {t}
            </span>
          ))}
        </div>

        {showAllTools ? (
          <div
            id="cv-toolbelt-extended"
            className="cv-toolbelt-extended"
            style={{ marginTop: 12, display: "grid", gap: 10 }}
          >
            {advancedToolCategories.map((cat) => {
              const style = TOOL_CAT_STYLES[cat.name] ?? {
                chip: "cv-chip--ok",
                dot: "#3f8a2a",
              };
              return (
                <section key={cat.name} className="cv-toolcat">
                  <header className="cv-toolcat-header">
                    <span
                      aria-hidden="true"
                      className="cv-toolcat-dot"
                      style={{ background: style.dot }}
                    />
                    <span>{cat.name}</span>
                    <span className="cv-toolcat-count">
                      {cat.items.length}
                    </span>
                  </header>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {cat.items.map((t) => (
                      <span key={t} className={`cv-chip ${style.chip}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : null}

        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            onClick={() => setShowAllTools((v) => !v)}
            aria-expanded={showAllTools}
            aria-controls="cv-toolbelt-extended"
            style={{
              fontFamily: "Tahoma, sans-serif",
              fontSize: 11,
              color: "#0058e6",
              background: "none",
              border: "none",
              padding: 0,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {showAllTools
              ? "▲ Read less"
              : `▼ Read more — AI stack, agents, RAG & infra (${advancedCount} more)`}
          </button>
        </div>
      </section>
    </div>
  );
}

export function CVContent() {
  const [tab, setTab] = useState<Tab>("experience");

  const jobsByYear = useMemo(
    () => CV_JOBS.map((j) => ({ job: j, year: extractStartYear(j.period) })),
    [],
  );

  return (
    <div className="cv-root" style={{ display: "grid", gap: 10 }}>
      {/* Address bar — like Explorer's bar */}
      <div
        className="xp-bevel-sunken"
        style={{ background: "#fff", padding: 6 }}
      >
        <p className="xp-p" style={{ margin: 0 }}>
          Address:{" "}
          <strong>
            C:\Users\Jermaya\Documents\CV.url
          </strong>
        </p>
      </div>

      {/* Hero — classic XP "Personal info" dialog */}
      <div
        className="xp-bevel-raised"
        style={{ background: "#ece9d8", position: "relative" }}
      >
        <div className="cv-titlebar">
          <span aria-hidden="true">👤</span>
          <span>Personal Information</span>
          <span style={{ marginLeft: "auto", fontSize: 10.5, opacity: 0.9 }}>
            rev. 2026.04
          </span>
        </div>
        <div
          className="cv-hero-body"
          style={{
            display: "grid",
            gap: 14,
          }}
        >
          <div
            className="xp-bevel-sunken"
            style={{
              background: "#fff",
              padding: 4,
              width: 92,
              height: 112,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Image
              src="/images/jermayaleijen.png"
              alt="Jermaya Leijen"
              width={82}
              height={100}
              style={{
                width: 82,
                height: "auto",
                imageRendering: "pixelated",
                display: "block",
              }}
            />
          </div>
          <div className="cv-hero-info" style={{ fontFamily: "Tahoma, sans-serif" }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#0a1a4a",
                lineHeight: 1.1,
              }}
            >
              Jermaya Leijen
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#3c3c3c",
                marginTop: 3,
                lineHeight: 1.45,
              }}
            >
              Sr. SEA · Growth Specialist · Strategist · AI tinkerer
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#6b6156",
                marginTop: 4,
                lineHeight: 1.5,
              }}
            >
              📍 Heesch, NL · freelance since 2016
              <br />
              🌐{" "}
              <a
                href="https://jermayads.nl"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0058e6",
                  textDecoration: "underline",
                }}
              >
                jermayads.nl
              </a>{" "}
              · 💼{" "}
              <a
                href="https://www.linkedin.com/in/jermayaleijen/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0058e6",
                  textDecoration: "underline",
                }}
              >
                LinkedIn
              </a>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                marginTop: 8,
              }}
            >
              <span className="cv-chip cv-chip--ok">● available</span>
              <span className="cv-chip">Google Ads</span>
              <span className="cv-chip">Scripts</span>
              <span className="cv-chip">Automation</span>
              <span className="cv-chip">CRO</span>
              <span className="cv-chip">Python</span>
            </div>
          </div>
          <div className="cv-stamp" aria-hidden="true">
            VERIFIED
            <small>· 10+ YRS ·</small>
          </div>
        </div>
        {/* Ticker at the bottom of hero — XP-style status strip with scrolling text */}
        <div
          className="xp-bevel-sunken"
          style={{ margin: "0 6px 6px", overflow: "hidden" }}
        >
          <div className="cv-ticker">
            <div className="cv-ticker-track">
              <span>★ Accepting select freelance clients</span>
              <span>·</span>
              <span>Based in Heesch, NL — works remote worldwide</span>
              <span>·</span>
              <span>10+ yrs Google Ads / SA360 / GA4</span>
              <span>·</span>
              <span>Python scripts &amp; automation</span>
              <span>·</span>
              <span>Will trade specialty coffee for audits ☕</span>
              <span>·</span>
              <span>★ Accepting select freelance clients</span>
              <span>·</span>
            </div>
          </div>
        </div>
      </div>

      {/* XP property-sheet tabs */}
      <div className="cv-tabs" role="tablist">
        <TabButton
          active={tab === "experience"}
          onClick={() => setTab("experience")}
          label="Experience"
          badge={String(CV_JOBS.length)}
          emoji="💼"
        />
        <TabButton
          active={tab === "education"}
          onClick={() => setTab("education")}
          label="Education"
          badge={String(CV_EDUCATION.length)}
          emoji="🎓"
        />
        <TabButton
          active={tab === "overview"}
          onClick={() => setTab("overview")}
          label="Overview"
          emoji="📊"
        />
      </div>

      {/* Property-sheet content panel */}
      <div className="cv-panel">
        {tab === "experience" ? (
          <section className="cv-group">
            <div className="cv-group-title">
              Work history — {CV_JOBS.length} entries
            </div>
            <p
              className="xp-p"
              style={{ margin: "0 0 8px", fontSize: 13 }}
            >
              Newest first. Click a company name to visit its real website ↗
            </p>
            <div className="cv-timeline">
              {jobsByYear.map(({ job, year }, idx) => (
                <div
                  key={`${job.company}-${job.period}-${idx}`}
                  className="cv-timeline-row"
                >
                  <div className="cv-timeline-year">{year}</div>
                  <div className="cv-timeline-rail" aria-hidden="true" />
                  <div className="cv-timeline-card">
                    <JobCard job={job} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === "education" ? (
          <section className="cv-group">
            <div className="cv-group-title">
              Academic record — {CV_EDUCATION.length} entries
            </div>
            <p
              className="xp-p"
              style={{ margin: "0 0 8px", fontSize: 13 }}
            >
              Click a school to visit its website ↗
            </p>
            <div className="cv-timeline">
              {CV_EDUCATION.map((e) => (
                <div key={e.school} className="cv-timeline-row">
                  <div className="cv-timeline-year">
                    {extractStartYear(e.period)}
                  </div>
                  <div className="cv-timeline-rail" aria-hidden="true" />
                  <div className="cv-timeline-card">
                    <EduCard e={e} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {tab === "overview" ? <OverviewPanel /> : null}
      </div>

      {/* Status bar */}
      <div className="cv-statusbar">
        <span className="cv-statusbar-cell">
          <strong>{CV_JOBS.length}</strong> gig(s)
        </span>
        <span className="cv-statusbar-cell">
          <strong>{CV_EDUCATION.length}</strong> diploma(s)
        </span>
        <span className="cv-statusbar-cell">Live URL · not a PDF</span>
        <span style={{ marginLeft: "auto" }}>CV.url · jermayads.nl</span>
      </div>
    </div>
  );
}
