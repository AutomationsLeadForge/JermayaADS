export interface CaseStudyResult {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface CaseStudy {
  id: string;
  sector: string;
  /** Long-form headline used in the Read-more window. */
  title: string;
  challenge: string;
  approach: string;
  results: CaseStudyResult[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "pmax-feed-architecture",
    sector: "E-commerce / Google Ads",
    title:
      "How a data-driven feed architecture replaced gut-feel bidding in e-commerce Google Ads",
    challenge:
      "Click A, buy B — attribution collapse quietly kills the products that actually open customer journeys.",
    approach:
      "A nightly BigQuery loop joins Ads, GA4 raw events, margin and stock into five custom labels per SKU, driving a PMax matrix by lifecycle and attribution role.",
    results: [
      { label: "Data sources unified", value: 5 },
      { label: "Labels per SKU, nightly", value: 5 },
      { label: "PMax campaign tiers", value: 3 },
    ],
  },
  {
    id: "verbolia-programmatic-seo",
    sector: "E-commerce / Programmatic SEO",
    title:
      "How an e-commerce marketplace generates 7-figure SEO revenue with automated page generation",
    challenge:
      "Custom stack, short deal lifecycles, and IT-gated changes meant SEO was a graveyard of expired URLs.",
    approach:
      "Python keyword pipeline feeds Verbolia page generation, ChatGPT-optimized copy, and AI redirect logic that protects organic equity through product volatility.",
    results: [
      { label: "Share of SEO traffic", value: 30, suffix: "%" },
      { label: "Monthly SEO revenue", value: 450, prefix: "CHF ", suffix: "k+" },
      { label: "Infrastructure ROI", value: 100, suffix: "×+" },
    ],
  },
  {
    id: "leadforge-agent-page",
    sector: "B2B / AI Conversion",
    title:
      "How LeadForge's Agent Page turns B2B website visitors into qualified leads — without forms-first friction",
    challenge:
      "Most B2B sites force visitors into a form or a dead-end click — intent evaporates before the conversion.",
    approach:
      "A RAG-powered Agent Page that classifies four visitor scenes, switches between four agent modes, and captures leads through a four-step trust arc instead of a form.",
    results: [
      { label: "Visitor scenes classified", value: 4 },
      { label: "Agent operating modes", value: 4 },
      { label: "Profile-arc steps", value: 4 },
    ],
  },
  {
    id: "google-ads-agentspace",
    sector: "Google Ads / AI Agents",
    title:
      "How Google Ads Agentspace eliminates 70% of manual work and runs optimizations that used to take days",
    challenge:
      "Most of the work in a serious Google Ads account is operational, not strategic — pulling data, diagnosing, writing notes — before a single decision gets made.",
    approach:
      "A multi-agent system on Google ADK + LangChain with specialist sub-agents for bidding, search terms, quality score, budget pacing and ad copy — wired to the Ads API with Pydantic-typed data.",
    results: [
      { label: "Manual work removed", value: 70, prefix: "-", suffix: "%" },
      { label: "Automated domains", value: 8 },
      { label: "Specialist sub-agents", value: 5, suffix: "+" },
    ],
  },
  {
    id: "keyword-to-deal-mapping",
    sector: "Deals / Google Ads",
    title:
      "How keyword-to-deal mapping and bucket-based campaign structure revealed what was actually driving performance",
    challenge:
      "Campaign-level conversion data hides which deals convert, which keywords drive them, and whether signups actually complete.",
    approach:
      "A three-layer stack — Ads API keyword-to-deal mapping, Offline Conversion Tracking for completion after cooling-off, and a Looker Studio dataLayer extension driving a bucket-based campaign architecture.",
    results: [
      { label: "Data layers integrated", value: 3 },
      { label: "Days cooling-off tracked", value: 14 },
      { label: "dataLayer attributes added", value: 3 },
    ],
  },
  {
    id: "gmb-live-availability-feed",
    sector: "Multi-location / Google Ads",
    title:
      "How Google My Business labels became a live availability feed for hyper-local Google Ads targeting",
    challenge:
      "Service slots fill up faster than ad groups can be paused — budget keeps spending on capacity the business doesn't have.",
    approach:
      "GMB labels as a live availability feed connected to Google Ads via location extensions: local teams update their own labels, campaigns pause and resume automatically, smart bidding is tuned per branch.",
    results: [
      { label: "Availability propagation", value: 5, prefix: "<", suffix: " min" },
      { label: "Bidding modes per branch", value: 2 },
      { label: "Services with live feed", value: 3, suffix: "+" },
    ],
  },
  {
    id: "neverleafs-performance-matrix",
    sector: "E-commerce / Performance Max",
    title:
      "How automated campaign content and a product performance matrix drove +422% ROAS",
    challenge:
      "Static campaign structure, thousands of SKUs, and manual ad-copy bottlenecks meant budget flowed to what worked before — not what the business needs now.",
    approach:
      "A Google Ads script classifies every SKU into hardlopers / gemiddeld / slecht presterend nightly; slow movers feed a week-deal pipeline; ChatGPT + Sheets + Channable generate ad content at catalogue scale.",
    results: [
      { label: "ROAS improvement", value: 422, prefix: "+", suffix: "%" },
      { label: "Additional revenue", value: 210, prefix: "+€", suffix: "k" },
      { label: "Performance buckets", value: 3 },
    ],
  },
];
