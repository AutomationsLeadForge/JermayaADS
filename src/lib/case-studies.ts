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
  challenge: string;
  approach: string;
  results: CaseStudyResult[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ecom-fashion",
    sector: "E-commerce / Fashion",
    challenge:
      "High CPA on broad match campaigns; spend scaling but conversion volume flat.",
    approach:
      "Restructured account into SKAGs, layered a Target CPA Smart Bidding strategy, and deployed custom bidding scripts to cap loss leaders.",
    results: [
      { label: "ROAS improvement (60 days)", value: 42, prefix: "+", suffix: "%" },
      { label: "Cost per conversion", value: 28, prefix: "-", suffix: "%" },
      { label: "New customers / month", value: 1200, suffix: "+" },
    ],
  },
  {
    id: "saas-b2b",
    sector: "SaaS / B2B",
    challenge:
      "€180 CPL with a 5% SQL rate — demo bookings stalled despite rising budget.",
    approach:
      "Rebuilt funnel around high-intent long-tail keywords, paired with a GA4 → HubSpot conversion sync and offline-conversion uploads to feed Smart Bidding with pipeline value.",
    results: [
      { label: "Cost per SQL", value: 63, prefix: "-", suffix: "%" },
      { label: "Qualified demos / month", value: 3.1, suffix: "×", decimals: 1 },
      { label: "Pipeline generated", value: 420, prefix: "€", suffix: "k" },
    ],
  },
  {
    id: "marketplace-seo",
    sector: "Marketplace / Affiliate",
    challenge:
      "Long-tail organic traffic capped at ~40k sessions/month; manual content ops too slow to scale category coverage.",
    approach:
      "Shipped a programmatic SEO pipeline (RAG + Python) that generated, deduped and published 8k+ landing pages with structured data and internal linking.",
    results: [
      { label: "Indexed pages", value: 8200, suffix: "+" },
      { label: "Organic sessions / mo.", value: 312, suffix: "%", prefix: "+" },
      { label: "Affiliate revenue", value: 2.4, suffix: "×", decimals: 1 },
    ],
  },
  {
    id: "travel-seasonal",
    sector: "Travel / Events",
    challenge:
      "Two-month peak season required 10× budget ramp; manual bid/budget ops couldn't keep up and wasted spend on low-margin geos.",
    approach:
      "Built a Performance Max script suite — dayparting, geo pacing, and margin-aware budget shifting — driven off a nightly BigQuery export of margin-per-SKU.",
    results: [
      { label: "Gross margin (peak)", value: 19, prefix: "+", suffix: "%" },
      { label: "Wasted spend", value: 34, prefix: "-", suffix: "%" },
      { label: "Booking volume", value: 2.1, suffix: "×", decimals: 1 },
    ],
  },
];
