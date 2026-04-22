export interface RedesignNavLink {
  label: string;
  href: string;
}

export interface ServiceTile {
  number: string;
  label: string;
  oneLiner: string;
  href: string;
}

export interface MetricChip {
  value: string;
  label: string;
}

export type WorkCategory = "sea" | "ai" | "dev" | "consultancy" | "product";

export interface WorkProject {
  id: string;
  number: string;
  title: string;
  category: WorkCategory;
  categoryLabel: string;
  role: string;
  outcomeMetric: string;
  outcomeLabel: string;
  summary: string;
  thumbnail?: string;
  href?: string;
  featured?: boolean;
}

export interface FooterTickerItem {
  label: string;
}

export const SITE_META = {
  wordmark: "J—",
  tagline: "Freelance. Based in Heesch, NL. Booking work for Q3 2026.",
  linkedinUrl: "https://www.linkedin.com/in/jermayaleijen/",
  whatsappUrl: "https://wa.me/+31623963836",
  city: "Heesch",
  copyright: "Jermaya Leijen © 2026",
  buildLine: "Built in Heesch, NL. No templates.",
} as const;

export const PRIMARY_NAV: RedesignNavLink[] = [
  { label: "Work", href: "/my-work" },
  { label: "Audit", href: "/audit" },
  { label: "Tooling", href: "/tooling" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: SITE_META.whatsappUrl },
];

// --- Homepage hero ---
export const HERO = {
  eyebrow: "01 — HELLO",
  headlineLines: [
    "Honest Google Ads.",
    "Actually-useful AI.",
    "Code that ships.",
  ],
  sub: "I'm Jermaya Leijen. Ten years running SEA and automation for agencies and e-commerce. I also build the tools I wish existed.",
  primaryCta: { label: "Send a WhatsApp", href: SITE_META.whatsappUrl },
  secondaryLink: { label: "Or see what I've built", href: "#selected-work" },
  portrait: {
    src: "/images/jermayaleijen.png",
    alt: "Jermaya Leijen",
  },
} as const;

// --- About strip ---
export const ABOUT = {
  eyebrow: "02 — WHO",
  body: "Based in Heesch, NL. Ten-plus years in search marketing — started at Overstappen.nl, grew through Searchresult, Max ICT, and Partout, and went freelance full-time as JermayADS. Most of my day is split between Google Ads accounts, Python scripts, and a growing pile of AI tooling. I built ApplePY and OrangePY because the SEO and SEA tools I wanted didn't exist yet. If you need a specialist who'll also tell you when your CPA target is nonsense, that's the job.",
  chips: [
    { value: "13", label: "years in SEA & digital growth" },
    { value: "MSc", label: "Marketing, Tilburg University" },
    { value: "CTO", label: "& Digital Growth at LeadForge & Growth marketing freelancer" },
  ] satisfies MetricChip[],
};

// --- Services grid ---
export const SERVICES_SECTION = {
  eyebrow: "03 — WHAT I DO",
  title: "Four things I sell. One I run for myself.",
  aside: "(the fifth one is the fun one)",
  tiles: [
    {
      number: "01",
      label: "Google Ads",
      oneLiner:
        "SEA accounts, Performance Max, feed work, and tracking that actually tells you the truth.",
      href: "/google-ads",
    },
    {
      number: "02",
      label: "AI Engineering",
      oneLiner:
        "RAG pipelines, LLM content ops, and Python automation that survives contact with production.",
      href: "/ai-engineering",
    },
    {
      number: "03",
      label: "Development",
      oneLiner:
        "Scripts, internal tools, API plumbing, and dashboards — built to last, not to demo.",
      href: "/development",
    },
    {
      number: "04",
      label: "Consultancy",
      oneLiner:
        "Channel-wide audits and strategic sparring. I'll push back when your plan is wishful thinking.",
      href: "/consultancy",
    },
    {
      number: "05",
      label: "Products",
      oneLiner:
        "My own stack: ApplePY, OrangePY, and the affiliate portfolio — real tools from real problems.",
      href: "/companies",
    },
  ] satisfies ServiceTile[],
};

// --- Selected work (homepage) ---
export const SELECTED_WORK = {
  eyebrow: "04 — SELECTED WORK",
  title: "A few things I've made.",
  linkLabel: "See all projects",
  linkHref: "/my-work",
} as const;

// --- Tools ticker ---
export const TOOLS_TICKER = {
  eyebrow: "05 — TOOLS",
  // labels used in lieu of heavy logo renders for brutalist feel; logos live in public/images/services/
  labels: [
    "Google Ads",
    "Performance Max",
    "GA4",
    "Search Console",
    "Looker Studio",
    "Semrush",
    "Ahrefs",
    "Python",
    "Channable",
    "Productsup",
    "Profitmetrics",
    "Northbeam",
    "Zapier",
    "Matomo",
    "Hotjar",
    "Tag Manager",
    "Bing Ads",
    "Search Ads 360",
    "Adchieve",
    "Adcalls",
    "Producthero",
    "TrueClicks",
    "Verbolia",
  ],
} as const;

// --- Closing CTA ---
export const CLOSING_CTA = {
  eyebrow: "06 — LET'S TALK",
  title: "Got a Google Ads account, a half-built tool, or a nonsense target?",
  sub: "Twenty minutes is usually enough to know if I can help.",
  primary: { label: "Send a WhatsApp", href: SITE_META.whatsappUrl },
  tiles: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: SITE_META.whatsappUrl,
      image: "/images/contact/whatsapp.svg",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: SITE_META.linkedinUrl,
      image: "/images/contact/linkedin.svg",
    },
  ],
};

// --- My Work data ---
export const WORK_PAGE_HEADER = {
  eyebrow: "01 — WORK",
  title: "Work I've actually done.",
  intro:
    "A rolling list of projects, scripts and products — some live, some open source, some NDA'd. The outcomes are honest numbers or honest shapes. Nothing inflated.",
};

export const WORK_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "sea", label: "Google Ads" },
  { id: "ai", label: "AI" },
  { id: "dev", label: "Development" },
  { id: "consultancy", label: "Consultancy" },
  { id: "product", label: "Products" },
] as const;

export const WORK_PROJECTS: WorkProject[] = [
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

export function getFeaturedWork() {
  return WORK_PROJECTS.filter((p) => p.featured);
}

// --- Blog posts (mirror of jermayads.nl/blog) ---
export interface BlogPost {
  title: string;
  date: string; // ISO YYYY-MM-DD for sorting; UI formats this
  tag: string;
  slug: string;
  externalUrl: string;
}

export const BLOG_POSTS: BlogPost[] = [
  { title: "Sturen op profit binnen Google Ads", date: "2024-05-21", tag: "Google Ads", slug: "sturen-op-profit-binnen-google-ads", externalUrl: "https://jermayads.nl/blog/sturen-op-profit-binnen-google-ads" },
  { title: "De time trigger in GA4 om QualityVisits te meten", date: "2024-03-29", tag: "GTM", slug: "time-trigger-ga4-qualityvisits", externalUrl: "https://jermayads.nl/blog/de-time-trigger-in-ga4-om-qualityvisits-te-meten" },
  { title: "Assistance API: Wat is het precies?", date: "2024-02-27", tag: "API", slug: "assistance-api-wat-is-het-precies", externalUrl: "https://jermayads.nl/blog/assistance-api-wat-is-het-precies" },
  { title: "Conversies vs. Conversies bij tijd", date: "2024-02-20", tag: "Google Ads", slug: "conversies-vs-conversies-bij-tijd", externalUrl: "https://jermayads.nl/blog/conversies-vs-conversies-bij-tijd" },
  { title: "Tracking en consent mode", date: "2024-01-28", tag: "Tracking", slug: "tracking-en-consent-mode", externalUrl: "https://jermayads.nl/blog/tracking-en-consent-mode" },
  { title: "Videos automatiseren met MoviePy", date: "2024-01-20", tag: "Automation", slug: "videos-automatiseren-met-moviepy", externalUrl: "https://jermayads.nl/blog/videos-automatiseren-met-moviepy" },
  { title: "Automatiseren van prijsextensies in Google Ads met ChatGPT4", date: "2023-12-22", tag: "AI", slug: "automatiseren-van-prijsextensies-in-google-ads-met-chatgpt4", externalUrl: "https://jermayads.nl/blog/automatiseren-van-prijsextensies-in-google-ads-met-chatgpt4" },
  { title: "ShoppingScraper Dynamic Price scraper", date: "2023-12-17", tag: "Google Ads", slug: "shoppingscraper-dynamic-price-scraper", externalUrl: "https://jermayads.nl/blog/shoppingscraper-dynamic-price-scraper" },
  { title: "Automatiseren van prijsextensies in Google Ads", date: "2023-12-08", tag: "Google Ads", slug: "automatiseren-van-prijsextensies-in-google-ads", externalUrl: "https://jermayads.nl/blog/automatiseren-van-prijsextensies-in-google-ads" },
  { title: "Laadtijd bijhouden in GA4", date: "2023-11-30", tag: "Google Analytics", slug: "laadtijd-bijhouden-in-ga4", externalUrl: "https://jermayads.nl/blog/laadtijd-bijhouden-in-ga4" },
  { title: "Neemt jouw organisch verkeer af?", date: "2023-11-25", tag: "Search Console", slug: "neemt-jouw-organisch-verkeer-af", externalUrl: "https://jermayads.nl/blog/neemt-jouw-organisch-verkeer-af" },
  { title: "Product ID's analyse Google Shopping en Performance Max", date: "2023-11-22", tag: "Scripts", slug: "product-ids-analyse-google-shopping-performance-max", externalUrl: "https://jermayads.nl/blog/product-ids-analyse-google-shopping-performance-max" },
  { title: "Broad-match. Is AI de toekomst betreft match types?", date: "2023-11-15", tag: "Google Ads", slug: "broad-match-is-ai-de-toekomst-betreft-match-types", externalUrl: "https://jermayads.nl/blog/broad-match-is-ai-de-toekomst-betreft-match-types" },
  { title: "Het minimum clicks concept in Google Ads", date: "2023-11-10", tag: "Google Ads", slug: "het-minimum-clicks-concept-in-google-ads", externalUrl: "https://jermayads.nl/blog/het-minimum-clicks-concept-in-google-ads" },
  { title: "Paid Organic rapportage", date: "2023-11-05", tag: "Dashboard", slug: "paid-organic-rapportage", externalUrl: "https://jermayads.nl/blog/paid-organic-rapportage" },
  { title: "RAG LLM: content automatiseren zonder hallucinaties", date: "2023-10-29", tag: "AI", slug: "rag-llm-content-automatiseren-met-behulp-van-rag-zonder-hallucinaties-van-een-llm", externalUrl: "https://jermayads.nl/blog/rag-llm-content-automatiseren-met-behulp-van-rag-zonder-hallucinaties-van-een-llm" },
  { title: "Gebruik micro-conversies voor datagedreven beslissingen", date: "2023-10-22", tag: "Conversiemeting", slug: "gebruik-micro-conversies-voor-datagedreven-beslissingen", externalUrl: "https://jermayads.nl/blog/gebruik-micro-conversies-voor-datagedreven-beslissingen" },
  { title: "Interne linkstructuur automatiseren met Python", date: "2023-10-14", tag: "SEO", slug: "interne-linkstructuur-automatiseren-met-python", externalUrl: "https://jermayads.nl/blog/interne-linkstructuur-automatiseren-met-python" },
  { title: "Dynamisch data opslaan in een Google spreadsheet met de Image tag", date: "2023-10-10", tag: "GTM", slug: "dynamische-data-opslaan-google-spreadsheet", externalUrl: "https://jermayads.nl/blog/dynamische-data-opslaan-google-spreadsheet-met-de-image-tag" },
  { title: "Performance Max: hoe stel je die zo goed mogelijk in", date: "2023-09-30", tag: "Performance Max", slug: "performance-max-hoe-stel-je-die-zo-goed-mogelijk-in", externalUrl: "https://jermayads.nl/blog/performance-max-hoe-stel-je-die-zo-goed-mogelijk-in" },
  { title: "YouTube video campagnes: handleiding", date: "2023-09-19", tag: "YouTube", slug: "youtube-video-campagnes-handleiding", externalUrl: "https://jermayads.nl/blog/youtube-video-campagnes-handleiding" },
  { title: "Campagne creatie door scrapen van pagina's", date: "2023-09-15", tag: "Automation", slug: "campagne-creatie-door-scrapen-van-paginas", externalUrl: "https://jermayads.nl/blog/campagne-creatie-door-scrapen-van-paginas" },
];

// --- Client testimonials (from /freelance-sea-specialist) ---
export interface Testimonial {
  author: string;
  company: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    author: "Nisar Derbaj",
    company: "Zaza Woods GmbH",
    quote:
      "Jermaya heeft onze online omzet binnen een jaar verviervoudigd. Strakke strategie, korte lijnen, en altijd een stap voor op wat er in Google Ads speelt.",
  },
  {
    author: "Marco de Wolff",
    company: "Clear Kitchen",
    quote:
      "Onze AdWords-kosten zijn met 50% gedaald terwijl de conversies zijn gestegen. Jermaya legt alles duidelijk uit en denkt mee als eigenaar, niet als uitvoerder.",
  },
  {
    author: "Thomas Decupré",
    company: "TrueFlow",
    quote:
      "We werken al meerdere jaren met Jermaya. Hij bouwt niet alleen campagnes — hij bouwt de tracking, de dashboards en de automation er omheen. Dat is het verschil.",
  },
  {
    author: "Robert Geerts",
    company: "Autokan.nl",
    quote:
      "Altijd bereikbaar, altijd eerlijk. Als een target onrealistisch is zegt hij dat gewoon. Dat maakt de samenwerking productief in plaats van politiek.",
  },
  {
    author: "Othmen Ben Aziza",
    company: "Absolute Car Cleaning",
    quote:
      "Voor een mkb als ons was paid search een black box. Jermaya heeft het opengebroken en ons geleerd wat wél en niet werkt in onze nichemarkt.",
  },
  {
    author: "Eelco van Ratingen",
    company: "SEA Nomad",
    quote:
      "Een van de weinige freelancers die echt diep in de techniek en het verhaal achter de cijfers duikt. Scripts, feeds, RAG, tracking — hij bouwt het zelf.",
  },
  {
    author: "Erwin van Lieshout",
    company: "Evalco BV",
    quote:
      "Strategisch scherp, operationeel snel. Hij schaalde ons account zonder dat we controle of inzicht verloren.",
  },
];

// --- SEA Audit offer (from /audit) ---
export const AUDIT_OFFER = {
  eyebrow: "01 — THE OFFER",
  title: "SEA Audit met een growth-hacking concept.",
  sub: "Geavanceerde strategieën en technieken om het account op te schalen. Haal het maximale uit Google Ads — zonder wishful thinking.",
  priceLine: "€350 one-off — verrekend met de volgende engagement.",
  authority: {
    headline:
      "Jermaya Leijen — Performance Google Ads specialist",
    stats: [
      { value: "100+", label: "e-commerce merken gewerkt" },
      { value: "€50M+", label: "Google Ads spend begeleid" },
      { value: "10+", label: "jaar in SEA" },
    ] as MetricChip[],
  },
  process: [
    {
      number: "01",
      label: "Intake",
      detail:
        "Korte call waarin we de hulpvraag scherp krijgen en vaststellen wat het grootste groei-knelpunt is.",
    },
    {
      number: "02",
      label: "Toegang tot tools",
      detail:
        "Read-only toegang tot Google Ads, Analytics, Search Console, feed/CMS. Ik werk in een eigen spreadsheet — niks wordt in jouw account aangepast tijdens de audit.",
    },
    {
      number: "03",
      label: "Audit (2 weken)",
      detail:
        "Diepgaand onderzoek op strategie, campagnestructuur, biedstrategie, tracking, feed-/product-kwaliteit, competitor pricing, scripts en automation-kansen.",
    },
    {
      number: "04",
      label: "Oplevering",
      detail:
        "Rapport + videocall van 60 minuten waarin ik de findings doorloop, prioriteer, en een concreet 90-dagen-plan aanlever.",
    },
  ],
  faqs: [
    {
      label: "STRATEGIE",
      body:
        "De audit is een betaald rapport — geen tool-export. Ik kijk naar de volledige stack: waarom je biedt zoals je biedt, welke segmentatie logisch is, welk budget naar welk doel gaat, en waar je conversiedata liegt. Elk advies is gekoppeld aan een hypothese en een verwachte impact.",
    },
    {
      label: "ADVANCED TRACKING",
      body:
        "De default GA4 + Ads setup laat meestal 30–50% signal liggen. Ik audit GTM, dataLayer, event granularity, consent mode, offline conversion import en (als het kan) custom attributie via Northbeam of ProfitMetrics.",
    },
    {
      label: "PROCES",
      body:
        "Intake → tool-access → 2 weken audit → oplevering-call. Gemiddeld 3 weken wall-clock. Je hoeft zelf niks uit te voeren tijdens de audit — wel aanwezig zijn op intake en oplevering.",
    },
    {
      label: "AI & AUTOMATION",
      body:
        "Concrete scripts (Google Ads, Apps Script, Python) + tooling-adviezen (Channable, ProfitMetrics, ShoppingScraper, etc.) met een calibratie van wat op korte termijn haalbaar is en wat een langer traject vraagt.",
    },
  ],
  ctaLabel: "Audit aanvragen",
  ctaHref: SITE_META.whatsappUrl,
};

// --- Tooling partner grid (from /tooling) ---
export interface ToolingPartner {
  id: string;
  name: string;
  category: "sea" | "ecommerce" | "leadgen" | "automation" | "tracking";
  categoryLabel: string;
  bullets: string[];
  summary: string;
  partnerBadge?: string;
}

export const TOOLING_PARTNERS: ToolingPartner[] = [
  {
    id: "google-marketing-platform",
    name: "Google Marketing Platform",
    category: "sea",
    categoryLabel: "SEA",
    bullets: [
      "Integrated Google suite (GA4, DV360, CM360, SA360)",
      "DSP-grade reach + negotiated private marketplaces",
      "Shared ML signals across ads + analytics",
      "Enterprise-grade measurement stack",
    ],
    summary:
      "De volledige Google-stack voor adverteerders die tempo willen maken met grotere budgetten en cross-channel measurement op één plek houden.",
  },
  {
    id: "channable",
    name: "Channable",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    bullets: [
      "Feed management voor 2500+ kanalen",
      "Rule-based optimalisatie op product-niveau",
      "Dynamische search-campagnes direct vanuit feed",
      "API-integraties met Shopify, WooCommerce, Lightspeed",
    ],
    summary:
      "Feed-management backbone voor e-commerce accounts. Ik ben Channable-partner — regel scherpe pricing en snelle implementatie.",
    partnerBadge: "Channable Partner",
  },
  {
    id: "profitmetrics",
    name: "ProfitMetrics",
    category: "tracking",
    categoryLabel: "Tracking",
    bullets: [
      "POAS (Profit On Ad Spend) i.p.v. ROAS",
      "Gross-profit signal direct richting Google Ads",
      "Klantretentie- en LTV-enrichment",
      "Plug-in voor Shopify / WooCommerce",
    ],
    summary:
      "Stuurt je smart-bidding op brutomarge in plaats van omzet. Het verschil tussen schaal en onbedoeld verlies op low-margin producten.",
  },
  {
    id: "hunch",
    name: "Hunch",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    bullets: [
      "Dynamic creative voor Meta, TikTok, Pinterest",
      "Feed-driven templates — 1 template = duizenden variants",
      "A/B testing framework ingebouwd",
      "Geschikt voor zowel DTC als marketplaces",
    ],
    summary:
      "Voor social-commerce merken die weg willen van handmatig 30 ads per week bouwen. Feed → template → miljoenen variants.",
  },
  {
    id: "cookiebot",
    name: "Cookiebot",
    category: "tracking",
    categoryLabel: "Tracking",
    bullets: [
      "AVG/GDPR-compliant consent management",
      "Automatische cookie scanning + declaration",
      "Integreert met GTM consent mode v2",
      "Multi-language banners out of the box",
    ],
    summary:
      "De fundering voor cookie-compliance in NL/EU. Consent mode v2 is niet optioneel meer — Cookiebot doet het werk zonder dat je zelf een CMP hoeft te bouwen.",
  },
  {
    id: "leadinfo",
    name: "Leadinfo",
    category: "leadgen",
    categoryLabel: "Leadgen",
    bullets: [
      "B2B website-visitor identificatie",
      "Realtime alerts op intent-signalen",
      "CRM-integratie (HubSpot, Salesforce, Pipedrive)",
      "Europese data-opslag — GDPR-safe",
    ],
    summary:
      "Herkent welk bedrijf op je site is en geeft sales een heads-up. Voor B2B-merken waar een Google Ads-klik één stap in een lang beslisproces is.",
    partnerBadge: "Leadinfo Partner",
  },
  {
    id: "shoppingscraper",
    name: "ShoppingScraper",
    category: "sea",
    categoryLabel: "SEA",
    bullets: [
      "EAN-based concurrentie-prijs monitoring",
      "Dagelijkse price-position tracking",
      "Integreert met Google Ads scripts voor dynamic pricing",
      "Custom alerts op prijs-onderbiedingen",
    ],
    summary:
      "Als je shopping-feeds laat draaien zonder te weten of je concurrenten goedkoper zijn, gok je. ShoppingScraper haalt die gok eruit.",
  },
  {
    id: "google-ads-scripts",
    name: "Google Ads scripts",
    category: "automation",
    categoryLabel: "Automation",
    bullets: [
      "Custom JS scripts binnen Google Ads",
      "Automatiseer biedstrategie, labels, alerts",
      "Koppel aan sheets / APIs voor decision logic",
      "Ik ben mede-auteur op Adsscripts.com",
    ],
    summary:
      "De tweede grootste Google Ads hack die niemand gebruikt. Met ~150 regels JS automatiseer je wat anders 10 handmatige spreadsheets zou kosten.",
    partnerBadge: "Adsscripts.com co-author",
  },
  {
    id: "google-apps-scripts",
    name: "Google Apps scripts",
    category: "automation",
    categoryLabel: "Automation",
    bullets: [
      "Workspace-brede automation (Sheets, Drive, Calendar, Gmail)",
      "Trigger-based workflows (on edit, on time)",
      "Gratis in je Google-account",
      "Perfect voor lightweight data-pipelines",
    ],
    summary:
      "Niet sexy, wel productief. Voor custom rapportages, lead-routing en operations die te specifiek zijn voor een SaaS-tool.",
  },
  {
    id: "python-scripts",
    name: "Python scripts",
    category: "automation",
    categoryLabel: "Automation",
    bullets: [
      "SEO-/SEA-automation op maat",
      "Semrush, Search Console, GA4, Channable API's",
      "Bulk-werk dat spreadsheets niet meer trekken",
      "Code beschikbaar op GitHub/JermayaL",
    ],
    summary:
      "Als Apps Script te licht is, Python. Voor alles van interne linking en programmatic SEO tot RAG-content-pipelines.",
  },
  {
    id: "twilio",
    name: "Twilio",
    category: "leadgen",
    categoryLabel: "Leadgen",
    bullets: [
      "Omnichannel communicatie-API (SMS, WhatsApp, voice)",
      "Automatische follow-up voor leads",
      "Programmable flows voor complexere journeys",
      "Integreert met CRM en marketing automation",
    ],
    summary:
      "Leads snel antwoord geven is een conversie-verhoger. Twilio is de manier om dat geautomatiseerd via SMS/WhatsApp te doen zonder een agent in te huren.",
  },
  {
    id: "chatbase",
    name: "Chatbase",
    category: "automation",
    categoryLabel: "Automation",
    bullets: [
      "AI chatbot bovenop je eigen content",
      "GPT-4 onder de motorkap — geen custom-LLM bouwen",
      "Inzicht in welke vragen klanten stellen",
      "No-code deployment",
    ],
    summary:
      "Voor support- en sales-enablement-chatbots die écht je content kennen. Geen hallucinaties op productspecs — dat is de kritische kwaliteit.",
  },
  {
    id: "northbeam",
    name: "Northbeam",
    category: "tracking",
    categoryLabel: "Tracking",
    bullets: [
      "Pixel-level multi-touch attribution",
      "Weerstand tegen iOS 14+ signal loss",
      "Cross-channel (Google, Meta, TikTok, YouTube)",
      "Dagelijkse MER + CAC breakdowns",
    ],
    summary:
      "Voor merken met €250K+/maand ad-spend die eindelijk willen weten wat échte marginale impact is — voorbij last-click en Platform-attribution.",
  },
];

// --- Footer ---
export const FOOTER = {
  ps: "P.S. — built this in Heesch, NL. No templates. No AI slop.",
  offTheClock: "Off the clock: cycling, espresso, rowing, Dutch carnivals.",
  tickerItems: [
    "Still shipping",
    "ApplePY",
    "OrangePY",
    "JermayADS",
    "Performance Max Script",
    "Meta Marketing API",
    "Affiliate portfolio",
  ],
  columns: {
    nav: [
      { label: "Work", href: "/my-work" },
      { label: "Services", href: "/#services" },
      { label: "Contact", href: SITE_META.whatsappUrl },
    ] as RedesignNavLink[],
    contact: [
      {
        id: "whatsapp",
        label: "WhatsApp",
        href: SITE_META.whatsappUrl,
        image: "/images/contact/whatsapp.svg",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: SITE_META.linkedinUrl,
        image: "/images/contact/linkedin.svg",
      },
    ],
  },
} as const;

