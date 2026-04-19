# jermayads.nl content inventory

Live crawl: 2026-04-19. All pages are in Dutch. No cookie banner visible
(site appears to rely on Cookiebot but didn't block content extraction).

## / — Homepage
- URL: https://jermayads.nl/
- Page title: "Freelance SEA specialist | Focus op e-commerce"
- Headline: "JERMAYA LEIJEN" with rotating role titles — SR. SEA SPECIALIST,
  Programmatic SEO, E-commerce, Performance marketing.
- Tagline: "Embrace Automation and Data-Driven Decisions"
- Primary CTA: "CONTACT" (top-right) + "Download" (portfolio PDF).
- Primary nav: Home, Cases, Blogs, Audit, Tooling.
- Sections (anchor-navigated):
  1. ERVARING — "Gedreven online marketeer met een passie voor Automation"
     plus two intro paragraphs.
  2. Experience timeline: Partout (2022-23), Max ICT (2020-22), JermayADS
     (2016-now), Searchresult (2017-19), Shadow B.V. (2015-16),
     Overstappen.nl (2013-15).
  3. ROADMAP — 5-step narrative: Wie ben ik / Eigen projecten / Hoe ik werk
     / Afspraken / Door blijven groeien.
  4. WAAROM VOOR MIJ — 6 bullet reasons (Award winning, 10+ yr, ondernemend,
     betrouwbaar & betaalbaar, netwerk specialisten, netwerk developers).
  5. Side hustles: OrangePY, ApplePY, Tooling tile.
  6. Scripts list: Meta Marketing API, Performance Max, Google Shopping ID,
     "Bekijk hier al mijn scripts" (GitHub).
  7. Blog teasers: RAG LLM / micro-conversies / interne linkstructuur.
  8. Portfolio PDF slides: Performance Max updates 2023, Gross profit &
     margin, Dynamische data opslaan, Dynamic pricing instellen.
- Social proof on home: none directly — lives on /freelance-sea-specialist.
- Footer: "JERMAYA LEIJEN © 2026 - All rights reserved"

## /blog — Blog index
- URL: https://jermayads.nl/blog (pagination via ?page=2, ?page=3)
- Total visible posts: 22 across 3 pages (9 + 9 + 4)
- Categories / tags: every post has one tag (Google Ads, GTM, AI,
  Automation, Conversiemeting, Performance Max, YouTube, etc.). No
  filter UI — tags are just labels.
- Most recent post: "Sturen op profit binnen Google Ads" — Mei 21, 2024
- Post URL pattern: `/blog/<slug>` (slug is long, kebab-case, Dutch)
- Posts (title / date / tag):
  1. Sturen op profit binnen Google Ads — 2024-05-21 — Google Ads
  2. De time trigger in GA4 om QualityVisits te meten — 2024-03-29 — GTM
  3. Assistance API: Wat is het precies? — 2024-02-27 — Assistance API
  4. Conversies vs. Conversies bij tijd — 2024-02-20 — Google Ads
  5. Tracking en consent mode — 2024-01-28 — Tracking en consent
  6. Videos automatiseren met MoviePy — 2024-01-20 — Automation
  7. Automatiseren van prijsextensies in Google Ads met ChatGPT4 — 2023-12-22 — AI
  8. Shoppingscraper Dynamic Price scraper — 2023-12-17 — Google Ads
  9. Automatiseren van prijsextensies in Google Ads — 2023-12-08 — Google Ads
  10. Laadtijd bijhouden in GA4 — 2023-11-30 — Google Analytics
  11. Neemt jouw organisch verkeer af? — 2023-11-25 — Google Search Console
  12. Product ID's analyse Google Shopping en Performance Max — 2023-11-22 — Scripts
  13. Broad-match. Is AI de toekomst betreft match types? — 2023-11-15 — Google Ads
  14. Het minimum clicks concept in Google Ads — 2023-11-10 — Google Ads
  15. Paid Organic rapportage — 2023-11-05 — Dashboard
  16. RAG LLM: content automatiseren ... zonder hallucinaties — 2023-10-29 — AI
  17. Gebruik micro-conversies voor datagedreven beslissingen — 2023-10-22 — Conversiemeting
  18. Interne linkstructuur automatiseren met Python — 2023-10-14 — SEO
  19. Dynamisch data opslaan in een Google spreadsheet met de Image tag — 2023-10-10 — GTM
  20. Performance Max: hoe stel je die zo goed mogelijk in — 2023-09-30 — Performance Max
  21. YouTube video campagnes: handleiding — 2023-09-19 — YouTube
  22. Campagne creatie door scrapen van pagina's — 2023-09-15 — Automation

### Sample post: "RAG LLM: content automatiseren"
- URL: https://jermayads.nl/blog/rag-llm-content-automatiseren-met-behulp-van-rag-zonder-hallucinaties-van-een-llm
- Date: Oktober 29, 2023 (tag: AI)
- Summary (~200 wds, paraphrased): Walks through building a Python-based
  product-description generator using Retrieval Augmented Generation so an
  LLM stops hallucinating specs. Pulls trusted context from the author's
  own JSON, the Icecat API, and product feeds, then prompts a LangChain
  LLM to write unique copy for ~100K SKUs. Explains RAG trade-offs: if
  you constrain the LLM too tightly to a single input source it ignores
  useful external knowledge; if you constrain it too loosely you get
  "garbage in, garbage out." Shows the actual system prompt used — an
  electronics-webshop assistant told to stick to provided specs and say
  "I don't know" rather than invent facts. Products with rich input get
  500-character descriptions; thin-input products get 250-word long-form
  instead. Three months of finetuning got the output production-ready.
  Next steps mentioned: deeper work with LangChain, InstructGPT and HyDE
  to push RAG beyond zero-shot prompting.

### Sample post: "Sturen op profit binnen Google Ads"
- URL: https://jermayads.nl/blog/sturen-op-profit-binnen-google-ads
- Date: Mei 21, 2024 (tag: Google Ads)
- Summary (~200 wds, paraphrased): Argues that tCPA / tROAS are a starting
  point, not the finish line. Real profitability comes from feeding
  smart-bidding a better signal — gross margin per product ID, not just
  revenue. Workflow: a custom Google Ads script classifies shopping
  products by conversion + profit, tags the winners, exports to a sheet,
  and pipes that into Channable. In Channable the author builds a
  feed-driven dynamic search campaign segmented by margin, price and
  competitor pricing. Key steps to keep the system honest: automate the
  discovery of new best-sellers, enrich targeting and audience signals,
  and (controversially) run the best products on an impression-share
  target. Includes a short Apps Script snippet that updates product
  prices in bulk via a third-party API and a Gumroad link to the paid
  version. Cautionary footnote: 60% of product clicks don't convert on
  the originally-clicked product — tools like ProfitMetrics close that
  gap.

### Sample post: "Interne linkstructuur automatiseren met Python"
- URL: https://jermayads.nl/blog/interne-linkstructuur-automatiseren-met-python
- Date: Oktober 14, 2023 (tag: Interne linkstructuur / SEO)
- Summary (~200 wds, paraphrased): A hands-on SEO guide to scaling internal
  linking with a small Python pipeline. Opens with the usual why: internal
  links help Google understand site hierarchy, pass PageRank, and speed
  up indexing — and anchor-text nuance still matters. The core trick is
  to sidestep Google's scrape-blocking by building a Custom Search Engine
  in Google Cloud Console scoped to your own domain, then calling the
  Custom Search JSON API from Python. The post walks through creating a
  GCP project, enabling the Custom Search API, generating the API key,
  and grabbing the CSE ID. Input is an Excel sheet of pages + target
  keywords; the script fuzzy-matches candidate internal link sources
  via the `site:domain.nl +keyword` operator, filters out pages that
  already link to the target, and writes up to 10 suggestions per row
  back into the sheet. Includes cost and security warnings about the
  Custom Search API and API-key hygiene.

## /audit — SEA audit page
- URL: https://jermayads.nl/audit — real page, not a redirect.
- Headline: "SEA AUDIT — Een SEA Audit met een growth hacking concept."
- Sub: "Met geavanceerde strategieën en technieken om het account op te
  schalen. Haal het maximale uit Google Ads."
- Primary CTA: "AUDIT AANVRAGEN" (opens Contact form at bottom).
- Authority tag: "Jermaya Leijen: Performance Google Ads specialist — >100
  e-commerce merken, >€50M Google Ads spend."
- Sections (tabbed "Veelgestelde vragen over de SEA Audit"):
  1. STRATEGIE — audit is a paid, multi-week report, not a tool export.
  2. ADVANCED TRACKING — tracking audit beyond default GA4, advice on
     squeezing more signal from data.
  3. PROCES — onboarding, access, 2-week audit, delivery call. Detailed
     list of what gets looked at.
  4. AI & AUTOMATION — competitor monitoring + practical scripts/tools
     recommendations built into the deliverable.
- Pricing: €350 one-off. Credited back if the client signs on.
- Approach steps: Intake → Toegang tot tools → Start audit (2 weken) →
  Afleveren + bespreken.
- Form fields (contact block at bottom): standard contact form — Name,
  Email, Message, submit button labelled "Versturen". No intake form
  fields like URL/budget on this page.
- Social proof: none on this page directly (lives on /freelance-sea-specialist).

## /tooling — Tooling showcase
- URL: https://jermayads.nl/tooling — real page, not a redirect.
- Layout: filter pills (All / Leadgeneratie / E-commerce) then a grid of
  tool cards. Each card has 4 bullet selling points + "Meer info" that
  expands a long description.
- Tools featured (13):
  1. Google Marketing Platform — integrated suite, DSP, machine learning
  2. Channable — feed management; author is a Channable Partner
  3. ProfitMetrics — POAS / gross-profit tracking for Google Ads
  4. Hunch — dynamic social ads with feed-driven templates
  5. Cookiebot — AVG/GDPR cookie consent
  6. Leadinfo — B2B website visitor identification (author is Leadinfo Partner)
  7. ShoppingScraper — EAN-based competitor price scraper
  8. Google Ads scripts — co-author on Addscripts.com
  9. Google Apps scripts — Workspace automation
  10. Python scripts — SEO/SEA automation
  11. Twilio — omnichannel comms API
  12. Chatbase — AI chatbot builder on top of ChatGPT
  13. Northbeam — pixel-level multi-touch attribution
- Framing: partner / implementation pitch, not a shop. No direct CTA on
  cards — implicit "contact Jermaya" at the page bottom.

## /cases — Case studies
- URL: https://jermayads.nl/cases — real page, not a redirect.
- Structure: tile grid, each tile has 4 bullet highlights + "Meer informatie"
  that expands a 300–500-word deep dive. No sub-pages per case.
- 9 cases on the page (all anonymised — no client logos):
  1. Campagne: bucket-structuur — sturen op ROAS (shopping classifier script)
  2. Performance Max: assets en audience performance — leadgen kitchens
     (offline conversion import via UTM/GCLID, weather correlation)
  3. Programmatic SEO: sjablonen voor duizenden attribuut-/categoriepagina's
     (clothing sizes, Airtable + OpenAI)
  4. Search campagnes: consolideren voor data consolidation — SKAG to
     broad-match migration (189 → 6 campaigns; +200 % conversies, -67 % CPA)
  5. Bucket-structuur: deals op basis van buckets en verbruik
     (Looker Studio + Google Ads API + OCT)
  6. Dynamic pricing: Omniaretail + Google Ads script (weather-triggered
     repricing, 3x/day sync)
  7. Lokaal hypertargeting: Google My Business label feed (location
     availability drives ad serving)
  8. Programmatic SEO: zoekwoordcombinaties met Semrush API en Python
     (50K keywords at once)
  9. XML-feed set-up in Channable (TV programme feed driving CPC for
     "wedstrijd kijken" searches)
  10. 40K SKUs op basis van custom labels (high-margin SKUs split into
      a parallel standard shopping campaign; +350 % conversions)
  11. Sturen op 'wasted CPC' om CPL zo laag mogelijk te houden (step-by-
      step filter workflow)
- Primary CTA: none in the grid itself. Contact CTAs appear in header nav.

## /freelance-sea-specialist — SEA specialist landing
- URL: https://jermayads.nl/freelance-sea-specialist — real page.
- Headline: "Google Ads voor gevestigde merken die willen opschalen"
- Sub-intro: Three paragraphs about growth goals, agency + client-side
  background, working closely with a network of tech partners.
- CTA: "Sparren met Jermaya" button, leads to Calendly/contact.
- Authority: "Medeauteur" — badge linking to Adsscripts.com.
- Social proof: 7 long-form testimonials from real clients:
  1. Thomas Decupré — TrueFlow
  2. Robert Geerts — Autokan.nl
  3. Nisar Derbaj — Zaza Woods GmbH ("verviervoudiging online omzet binnen een jaar")
  4. Othmen Ben Aziza — Absolute Car Cleaning
  5. Eelco van Ratingen — SEA Nomad
  6. Marco de Wolff — Clear Kitchen ("AdWords-kosten -50 %")
  7. Erwin van Lieshout — Evalco BV
- Also embeds the SEA Audit offer (same €350 pitch as /audit).
- Form fields: Name, Email, Message (same "Versturen" button).
- Ends with a "Mijn content" block — 3 blog teasers.

## /sitemap.xml
- **Not accessible**. Returns `404 Not Found`.
- `/robots.txt` exists and reads: `User-agent: * Disallow: /cv`. No
  `Sitemap:` directive is declared. `/sitemap_index.xml` was not
  tested further because robots.txt gave no hint.
- Implication: we can't enumerate every indexed URL programmatically —
  the list in this doc is based on nav links + blog pagination + the
  explicit page URLs in the brief.

## Discovered URLs not in the brief
- `/cv` — referenced in `robots.txt` (disallowed to crawlers) — likely
  a downloadable CV page. Worth a manual check.
- `/pdf/<slug>` — PDF slide decks linked from the homepage portfolio
  (performance-max-updates-2023, gross-profit-gross-margin,
  dynamische-data-opslaan, dynamic-pricing-instellen).
- Outbound: applepy.online, orangepy.online/search-console,
  github.com/JermayaL, calendly.com/jermayads, addscripts.com.
