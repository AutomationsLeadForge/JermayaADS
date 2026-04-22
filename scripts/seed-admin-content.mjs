#!/usr/bin/env node
/**
 * Seeds the admin-managed tables with the current hardcoded content so
 * the admin panel starts populated instead of empty.
 *
 * Idempotent — re-running just upserts, no duplicates.
 *
 * Usage:  node scripts/seed-admin-content.mjs
 * Needs env:  NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  process.exit(1);
}
const db = createClient(url, secret, { auth: { persistSession: false } });

/* ---------- Mirror of the hardcoded content in src/lib ---------- */

const PROJECT_ICON = {
  "flavor-press": "NewspaperAIIcon",
  "qorting": "DiscountTagIcon",
  "aanbiedingen-vergelijken": "ScaleIcon",
  "claude-skills": "BookStackIcon",
  "google-ads-ai-system": "AdsRobotIcon",
  "adsscripts": "TerminalIcon",
  "shopify-agentspace": "ShopBagAIIcon",
  "pouchdirect-multilingual": "GlobeIcon",
  "mcc-infrastructure": "SpreadsheetIcon",
  "ai-forecast-agentspace": "ForecastChartIcon",
  "neverleafs": "PottedPlantIcon",
};

const PORTFOLIO_THUMB = {
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

const WORK_PROJECTS = [
  {
    id: "flavor-press",
    number: "01",
    title: "Flavor Press",
    category: "ai",
    categoryLabel: "AI",
    role: "Architect, builder",
    outcomeMetric: "13",
    outcomeLabel: "orchestrated agents",
    summary:
      "Open-source WordPress theme for Dutch editorial sites, plus a 13-agent FastAPI content pipeline — multi-source research, two-layer fact-checking, RAG-powered SEO strategy, section-by-section writing, and a quality-gate editor that rewrites anything below 5.0/10. Supabase + pgvector for the knowledge base; Claude for writing and editing; 16 custom Gutenberg blocks with React editors and PHP SSR.",
    featured: true,
  },
  {
    id: "qorting",
    number: "02",
    title: "Qorting.nl",
    category: "product",
    categoryLabel: "Product",
    role: "Owner, operator",
    outcomeMetric: "5,000+",
    outcomeLabel: "retailers aggregated",
    summary:
      "Own Dutch discount-code platform, built as a programmatic-SEO play. Thousands of retailer-specific landing pages tuned for high-intent discount queries, affiliate commissions as the revenue model, a monthly newsletter, prize promotions to grow the list, and automated code verification to keep the catalogue clean.",
    href: "https://qorting.nl",
    featured: true,
  },
  {
    id: "aanbiedingen-vergelijken",
    number: "03",
    title: "Aanbiedingen-vergelijken.nl",
    category: "product",
    categoryLabel: "Product",
    role: "Owner, operator",
    outcomeMetric: "~2015",
    outcomeLabel: "founded",
    summary:
      "Own Dutch price-comparison site for consumer electronics. Tracks historical prices across all major webshops so shoppers can tell a real deal from a marketing stunt. Price-alert tool, full price-history graphs, and independent buy advice — positioned as a consumer-first alternative to commercially biased comparison sites.",
    href: "https://aanbiedingen-vergelijken.nl",
  },
  {
    id: "claude-skills",
    number: "04",
    title: "Claude Skills Collection",
    category: "ai",
    categoryLabel: "AI",
    role: "Curator, author",
    outcomeMetric: "777",
    outcomeLabel: "skills curated",
    summary:
      "Curated open-source library of Claude skills: 713 external agentic skills, 59 marketing skills, and 5 Anthropic courses, organised across architecture, business, data/AI and development. Includes custom SKILL.md files for SEO, Google Ads, Python, RAG pipelines and multi-agent patterns — external collections wired in as git submodules.",
  },
  {
    id: "google-ads-ai-system",
    number: "05",
    title: "Google Ads AI System",
    category: "ai",
    categoryLabel: "AI",
    role: "Architect, builder",
    outcomeMetric: "3",
    outcomeLabel: "specialist agents",
    summary:
      "Agent-first Google Ads management stack: FastAPI backend with three specialist agents on Google's ADK and Gemini 2.5, direct Google Ads API v25 integration, Firebase/Firestore for auth and sessions, a Chrome extension (Manifest V3) for contextual in-browser assistance, and a no-code ADK UI for deploying custom agents on the shared tool infrastructure.",
  },
  {
    id: "adsscripts",
    number: "06",
    title: "Adsscripts.com",
    category: "dev",
    categoryLabel: "Development",
    role: "Founding contributor",
    outcomeMetric: "20+",
    outcomeLabel: "scripts published",
    summary:
      "Free knowledge-sharing platform for PPC specialists. Founding contributor and author of 20+ open Google Ads and Microsoft Advertising scripts — schedule/device/audience/location bid adjustments, Shopping and PMax maintenance, search-term exclusion, RSA creation, budget overdelivery alerts, DSA exclusion logic, placement filtering by domain rating.",
    href: "https://adsscripts.com",
  },
  {
    id: "shopify-agentspace",
    number: "07",
    title: "Shopify GraphQL Agentspace",
    category: "ai",
    categoryLabel: "AI",
    role: "Architect, builder",
    outcomeMetric: "2,200+",
    outcomeLabel: "products automated",
    summary:
      "Fully automated AI content pipeline for a Shopify store with 2,200+ products across 132 vendors. Five steps: sync via GraphQL, scrape vendor source sites, generate Dutch descriptions with Claude Sonnet, generate SEO metadata with Haiku, push back to Shopify. Plus a separate 0–100 catalogue hygiene audit and a YAML-enforced Dutch style guide.",
  },
  {
    id: "pouchdirect-multilingual",
    number: "08",
    title: "Multilingual Google Ads automation",
    category: "sea",
    categoryLabel: "Google Ads",
    role: "Automation engineer",
    outcomeMetric: "7",
    outcomeLabel: "countries automated",
    summary:
      "Master-sheet-driven product feed and ad-content pipeline for PouchDirect across 7 countries. One source of truth for products, copy, keywords and translations; the pipeline generates country-specific Merchant Center feeds and localized Search ads and keyword lists in the native language of each market. One cell edit propagates everywhere.",
  },
  {
    id: "mcc-infrastructure",
    number: "09",
    title: "MCC script infrastructure",
    category: "dev",
    categoryLabel: "Development",
    role: "Author, operator",
    outcomeMetric: "50+",
    outcomeLabel: "scripts on one sheet",
    summary:
      "Single master Google Sheet with 50+ tabs, each driving a specific Google Ads script deployed at MCC level across a client portfolio. Thresholds, budgets, exclusion lists and alert limits are all cell edits — no per-account code changes — covering bid adjustments, budget monitoring, search-term management, performance alerts and feed updates.",
  },
  {
    id: "ai-forecast-agentspace",
    number: "10",
    title: "AI forecast agentspace",
    category: "ai",
    categoryLabel: "AI",
    role: "Architect, builder",
    outcomeMetric: "Multi-agent",
    outcomeLabel: "forecasting loop",
    summary:
      "Multi-agent forecasting system over GA4, Google Ads and BigQuery in a unified data layer. Regression models establish trend lines, seasonality and baselines; AI agents contextualise the numbers and surface anomalies. Outputs projected ROAS, conversion volume and budget recommendations calibrated to each account's real history, not generic benchmarks.",
  },
  {
    id: "neverleafs",
    number: "11",
    title: "NeverLeafs",
    category: "product",
    categoryLabel: "Product",
    role: "Founder, operator",
    outcomeMetric: "Live",
    outcomeLabel: "AI-native e-commerce",
    summary:
      "Own e-commerce business selling artificial plants, built AI-native from day one. The commercial side is a modern webshop; the operational side — product content generation, feed management, campaign automation, business ops — runs on custom in-house agents rather than off-the-shelf SaaS. Doubles as a live R&D ground for client tooling.",
    featured: true,
  },
];

const ABOUT_VALUE = {
  body:
    "Based in Heesch, NL. Ten-plus years in search marketing — started at Overstappen.nl, grew through Searchresult, Max ICT, and Partout, and went freelance full-time as JermayADS. Most of my day is split between Google Ads accounts, Python scripts, and a growing pile of AI tooling. I built ApplePY and OrangePY because the SEO and SEA tools I wanted didn't exist yet. If you need a specialist who'll also tell you when your CPA target is nonsense, that's the job.",
  chips: [
    { value: "10+", label: "years in SEA" },
    { value: "350K", label: "monthly organic visits" },
    { value: "2", label: "products built & shipped" },
  ],
  currently: [
    "Running Performance Max for 2 e-com clients",
    "Shipping OrangePY v2",
    "Re-reading Obviously Awesome",
    "Coffee: Flair 58, Ethiopia naturals",
  ],
};

const README_VALUE = {
  body: `Hi — I'm Jermaya. Freelance SEA specialist, AI engineer, and developer. Based in Heesch, NL.

This site is the contents of my hard drive, mostly. Double-click any icon or open a program from start to poke around.

> Last modified: 2026
> Author: Jermaya Leijen
> Size: 10+ years of receipts

--- END OF FILE ---`,
};

/* ---------- Preflight: tables must exist ---------- */
async function preflight() {
  const checks = await Promise.all([
    db.from("work_projects").select("id").limit(1),
    db.from("site_content").select("key").limit(1),
  ]);
  const missing = [];
  if (checks[0].error) missing.push(`work_projects (${checks[0].error.message})`);
  if (checks[1].error) missing.push(`site_content (${checks[1].error.message})`);
  if (missing.length) {
    console.error("\n✖ Missing tables:");
    missing.forEach((m) => console.error("   -", m));
    console.error(
      "\nPaste supabase/migrations/002_admin_content.sql into Supabase →",
      "SQL Editor → New query → Run, then re-run this script.\n",
    );
    process.exit(1);
  }
}

/* ---------- Seed ---------- */
async function seedProjects() {
  const rows = WORK_PROJECTS.map((p, i) => ({
    slug: p.id,
    number: p.number ?? "",
    title: p.title,
    category: p.category,
    category_label: p.categoryLabel,
    role: p.role,
    outcome_metric: p.outcomeMetric,
    outcome_label: p.outcomeLabel,
    summary: p.summary,
    thumbnail_url: PORTFOLIO_THUMB[p.id] ?? null,
    icon_key: PROJECT_ICON[p.id] ?? "DocumentIcon",
    href: p.href ?? null,
    featured: Boolean(p.featured),
    sort_order: (i + 1) * 10,
  }));

  const { data, error } = await db
    .from("work_projects")
    .upsert(rows, { onConflict: "slug" })
    .select("slug");

  if (error) throw error;
  console.log(`✓ work_projects: upserted ${data.length} rows`);
}

async function seedSiteContent() {
  const rows = [
    { key: "about", value: ABOUT_VALUE },
    { key: "readme", value: README_VALUE },
  ];
  const { data, error } = await db
    .from("site_content")
    .upsert(rows, { onConflict: "key" })
    .select("key");
  if (error) throw error;
  console.log(`✓ site_content: upserted keys [${data.map((r) => r.key).join(", ")}]`);
}

async function summarize() {
  const [{ count: projectCount }, { count: contentCount }, { count: trashCount }] =
    await Promise.all([
      db
        .from("work_projects")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null),
      db.from("site_content").select("key", { count: "exact", head: true }),
      db
        .from("work_projects")
        .select("id", { count: "exact", head: true })
        .not("deleted_at", "is", null),
    ]);
  console.log("\n── Summary ──");
  console.log(`  work_projects (active): ${projectCount}`);
  console.log(`  work_projects (trash):  ${trashCount}`);
  console.log(`  site_content keys:      ${contentCount}`);
}

async function main() {
  console.log("Seeding admin-managed content…\n");
  await preflight();
  await seedProjects();
  await seedSiteContent();
  await summarize();
  console.log("\nDone. Open Admin Panel → Projects / About / Readme to edit.\n");
}

main().catch((err) => {
  console.error("\n✖ Seed failed:", err.message ?? err);
  process.exit(1);
});
