/**
 * Long-form content for each case study — shown in the Read-more window.
 * Kept as structured blocks so the reader can format them consistently
 * (headings, paragraphs, lists, stack table) without parsing markdown.
 */

export type DetailBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "callout"; text: string }
  | { kind: "stack"; rows: Array<[string, string]> };

export interface CaseStudyDetail {
  id: string;
  title: string;
  tagline: string;
  blocks: DetailBlock[];
}

const pmaxFeedArchitecture: CaseStudyDetail = {
  id: "pmax-feed-architecture",
  title:
    "How a data-driven feed architecture replaced gut-feel bidding in e-commerce Google Ads",
  tagline:
    "Closing the gap between what Google Ads reports and what your business actually earns.",
  blocks: [
    { kind: "h2", text: "The problem nobody talks about" },
    {
      kind: "p",
      text: "Most e-commerce Google Ads accounts are built on a lie. Not an intentional one — nobody is trying to deceive anyone. But the standard way most accounts are structured assumes that the data you see in Google Ads reflects what is actually happening in your business. That assumption is wrong, and the gap between what Google reports and what is commercially true is costing e-commerce businesses significant revenue every month.",
    },
    { kind: "callout", text: "The problem has a name: attribution collapse." },
    {
      kind: "p",
      text: "You run a large catalogue. Some products are cheap, popular, heavily searched. They get clicks — lots of them — but they don't directly convert at a rate that justifies their spend. So your analyst flags them. Your ROAS report confirms it. You cut them. Two weeks later, revenue drops in ways that don't correlate with anything obvious. The products you cut looked like bleeders. They were actually openers — the first touch in a multi-product journey that ended in a high-margin purchase somewhere else in the catalogue.",
    },
    {
      kind: "p",
      text: "Google Ads showed you half the story. You made a full decision on it.",
    },
    {
      kind: "p",
      text: "This is not an edge case. In most e-commerce accounts with catalogues above a few hundred products, a significant portion of what looks like low-performing inventory is actually doing attribution work that the standard reporting interface cannot see. The result is a systematic bias toward cutting exactly the products that are quietly holding the account together.",
    },

    { kind: "h2", text: "Why standard approaches don't solve this" },
    {
      kind: "p",
      text: "The instinct when you identify an attribution problem is to look at attribution models. Switch from last-click to data-driven. Add view-through conversions. Look at assisted conversions in GA4. Useful steps — but they don't solve the structural problem.",
    },
    {
      kind: "p",
      text: "The structural problem is that your campaign architecture and your bidding strategy have no way to act on attribution data even if you have it.",
    },
    {
      kind: "p",
      text: "You can see in GA4 that Product A assisted 47 purchases of Product B last month. But your PMax campaign doesn't know that. It sees Product A converting at 150% ROAS and Product B at 600%. It does what any rational bidding system would do: deprioritize Product A and pour budget into Product B. Which works great until the top of the funnel collapses and Product B stops getting the warm traffic that was converting at 600% in the first place.",
    },
    {
      kind: "p",
      text: "The gap is not a reporting gap. It is an architecture gap. The data exists. The insight is available. But there is no mechanism to translate insight into bidding behavior. That is what this case study is about building.",
    },

    { kind: "h2", text: "The architecture: what we built" },
    {
      kind: "p",
      text: "The solution is a system, not a setting. Four interconnected phases work together as a nightly loop, continuously recalibrating campaign structure based on commercial reality rather than last-click attribution.",
    },

    { kind: "h3", text: "Phase 1 — the central brain" },
    {
      kind: "p",
      text: "Stop treating Google Ads as the source of truth; start treating it as one input among several. A BigQuery data warehouse pulls from five sources every night and joins them on a single key: Item_ID. Every product gets a unified commercial profile that no single platform could produce alone.",
    },
    {
      kind: "ul",
      items: [
        "Google Ads API — cost, clicks, impressions, conversion value, last 30 days per product. The performance layer.",
        "GA4 raw events — session_start and purchase events joined on session ID. A genuine assist model: for every purchase, which products were in the journey? This is the data that changes everything.",
        "CMS / backend — cost-of-goods, stock levels, return rates. Gross margin is the actual metric that determines profitability. A 600% ROAS at 5% margin is not a winner. A 300% ROAS at 45% margin is.",
        "Inventory & lifecycle — stock levels, days since first impression, restock dates. Drives urgency and lifecycle logic.",
      ],
    },
    {
      kind: "p",
      text: "The output of phase 1 is a single table in BigQuery — one row per product, one column per commercial signal. We call it the Master Feed. Recalculated every night at 03:00, it is the most commercially accurate view of the catalogue that any system in the stack has access to.",
    },

    { kind: "h3", text: "Phase 2 — feed enrichment via custom labels" },
    {
      kind: "p",
      text: "The Master Feed is data. Custom labels are the translation of that data into campaign instructions. This is the bridge between insight and action.",
    },
    {
      kind: "p",
      text: "Every night at 04:00, a SQL query against the Master Feed calculates five custom labels per product. They are written to a Google Sheet connected to Merchant Center as a supplemental feed. By 06:00, every product in every campaign has labels that reflect last night's commercial reality.",
    },
    {
      kind: "p",
      text: "Label 0 — Margin buckets (0–10%, 10–25%, 25–50%, 50%+). Ensures bidding is set against profit rather than revenue. Without this label, the account implicitly treats all revenue as equal — overspending on low-margin products and underspending on high-margin ones.",
    },
    {
      kind: "p",
      text: "Label 1 — Product lifecycle. Winner (high ROAS + volume + margin over 30 days) gets the aggressive tier. Bleeder (≥€20 spent, zero profit in 30 days) gets exclusion or bid suppression. Zombie (zero impressions in 30 days) moves to Standard Shopping with manual CPC €0.15–0.25 to regenerate a signal. Kickstart (new or restocked, <14 days) gets a temporary boost to generate the performance signal that will determine its future label.",
    },
    {
      kind: "p",
      text: "Label 2 — Attribution role. Opener: high assisted / low direct — customers start with them but buy something else. Assigned a deliberately lower ROAS target because their true contribution exceeds their direct attribution. Closer: high direct, low assisted — strict ROAS targets, safe to scale on direct data. Traffic: high clicks, low conversions on both — retained only if CPC is low enough for brand exposure value.",
    },
    {
      kind: "p",
      text: "Labels 3 and 4 — Stock and seasonal signals. Label 3 tracks days of stock remaining: a product with 3 days left should not be running aggressive bids. Label 4 flags overstock: aggressive bidding regardless of margin, because holding cost can exceed the cost of selling at a lower margin.",
    },

    { kind: "h3", text: "Phase 3 — the campaign architecture" },
    {
      kind: "p",
      text: "Five labels per product, recalculated nightly, turn campaign structure into a function of the labels rather than a set of manual decisions.",
    },
    {
      kind: "ul",
      items: [
        "PMax Hero (Label 1: winner) — top 5% of products. No tROAS target or a very low one. Goal is market share, not efficiency.",
        "PMax Profit (Label 0 high + Label 2 closer) — high-margin closers. Strict tROAS. The financial foundation of the account.",
        "PMax Volume (Label 0 low + Label 2 opener) — run deliberately at ≤200% ROAS. Not a failure — an acknowledgement that these products generate assisted revenue not shown in their own column. Cutting this campaign to improve account-level ROAS is one of the most common and most damaging mistakes in e-commerce management.",
        "Standard Shopping Zombies (Label 1: zombie) — manual CPC €0.15–0.25. Designed as a pipeline, not as a profit centre. Once a zombie converts, it graduates to PMax automatically through the label system.",
        "Standard Shopping Dump (Label 4: overstock) — aggressive bids on excess inventory. Selling at 150% ROAS now can beat holding for a 400% ROAS that may never come.",
      ],
    },

    { kind: "h3", text: "Phase 4 — attribution value correction" },
    {
      kind: "p",
      text: "For accounts where assist data is reliable over multiple months, the final step is to stop sending Google Ads the wrong conversion values and start sending it the right ones.",
    },
    {
      kind: "p",
      text: "If BigQuery shows Product A generates €8 in assisted revenue for every €1 it directly converts, we calculate a blended conversion value that reflects this and send it via Offline Conversion Imports or Value Rules. The algorithm — which is optimizing against the conversion values it receives — now has an accurate picture of what Product A is worth and bids accordingly.",
    },
    {
      kind: "p",
      text: "This is the most technically complex intervention. It needs 60–90 days of consistent assist data before correction factors are reliable enough to use in bidding. It is also the highest-leverage, because it changes the objective function the algorithm is optimizing against — effectively turning smart bidding into an optimizer for business profit rather than last-click revenue. Which is what it should have been doing all along.",
    },

    { kind: "h2", text: "The operational loop" },
    {
      kind: "ul",
      items: [
        "03:00 — Python cloud function pulls Google Ads API, GA4 raw events, CMS backend, inventory. Master Feed refreshed.",
        "04:00 — SQL against Master Feed. Five labels per product. Written to a Google Sheet connected as a supplemental feed in Merchant Center.",
        "06:00 — Campaign structure updates. Products whose labels changed migrate between campaigns. A zombie that converted yesterday moves to PMax.",
        "Hourly — Google Ads script pulls search term data. Flags high-intent, high-volume queries without dedicated coverage.",
      ],
    },

    { kind: "h2", text: "What this changes" },
    {
      kind: "p",
      text: "The most important thing this system changes is not a metric. It is the relationship between data and decisions. The campaign manager's job shifts: instead of interpreting incomplete data and making manual bidding decisions, the work becomes maintaining the data pipeline, validating the label logic, and designing the campaign structure. Day-to-day bidding stays with the algorithm — but the algorithm now operates against an objective that reflects what the business actually cares about: margin-weighted, attribution-corrected, lifecycle-aware revenue.",
    },
    {
      kind: "p",
      text: "Human judgment is not removed. It is moved upstream — into the architecture, the data model, and the label logic, where it has the most leverage and the least noise.",
    },

    { kind: "h2", text: "Common objections" },
    { kind: "h3", text: "Is it worth it for our account size?" },
    {
      kind: "p",
      text: "The five labels and the campaign matrix can be implemented at meaningful scale from ~200 products and ~€15,000/month. BigQuery infrastructure and value correction are more appropriate at €50,000+/month. The principle — campaign structure should reflect commercial reality rather than platform reporting — applies at any scale.",
    },
    { kind: "h3", text: "We already use data-driven attribution in Google Ads." },
    {
      kind: "p",
      text: "Data-driven attribution operates inside Google's data — clicks and conversions from the Google tag. It doesn't incorporate your margin data. It doesn't know stock levels. It can't see the difference between a 5% margin and a 50% margin conversion. It is a better version of incomplete information. This system replaces incomplete information with complete information.",
    },
    { kind: "h3", text: "What if the labels are wrong?" },
    {
      kind: "p",
      text: "The labels are only as good as the data going in. The single most important input is GA4 assist data, which requires clean implementation — consistent item_id tracking on product pages, add-to-cart events, and purchase events. If GA4 is incomplete, the assist model undercounts and the opener/closer distinction is unreliable. Fixing measurement is a prerequisite.",
    },

    { kind: "h2", text: "Stack summary" },
    {
      kind: "stack",
      rows: [
        ["Data warehouse", "BigQuery"],
        ["Attribution modelling", "GA4 raw events"],
        ["Margin & stock", "CMS backend API"],
        ["Feed management", "Google Sheets supplemental feed + Merchant Center"],
        ["Automation", "Python (Cloud Functions) + Google Ads Scripts"],
        ["Campaign structure", "PMax (3 tiers) + Standard Shopping (2 campaigns)"],
        ["Bidding logic", "tROAS per label combination + Value Rules"],
        ["Conversion correction", "Offline Conversion Imports / Value Rules"],
        ["Monitoring", "Looker Studio on Master Feed"],
      ],
    },

    { kind: "h2", text: "Closing thought" },
    {
      kind: "p",
      text: "The Google Ads interface is designed to show you what Google can measure. It is not designed to show you what your business needs to know. The gap between those two things is where most e-commerce accounts leave their performance ceiling.",
    },
    {
      kind: "p",
      text: "This architecture closes that gap — not by working around the platform, but by feeding it better information and letting it do what it is genuinely good at: optimizing toward a clearly defined objective at scale. The objective just has to be the right one.",
    },
  ],
};

const verboliaSeo: CaseStudyDetail = {
  id: "verbolia-programmatic-seo",
  title:
    "How an e-commerce marketplace generates 7-figure SEO revenue with automated page generation",
  tagline:
    "A Python keyword pipeline + Verbolia turned a dead organic channel into one of the highest-returning lines in the mix.",
  blocks: [
    { kind: "h2", text: "The problem" },
    {
      kind: "p",
      text: "The client is one of Switzerland's leading e-commerce marketplaces. Strong brand, strong ad performance, significant revenue. But SEO was effectively a dead channel. Not because nobody cared — because the architecture made it nearly impossible to act on.",
    },
    {
      kind: "p",
      text: "The site was fully custom — no standard CMS, full control over infrastructure, but complete dependency on IT for any change. Every SEO initiative required planning, development resources, and months of lead time. By the time a page went live, the commercial opportunity had often already moved on.",
    },
    {
      kind: "p",
      text: "On top of that, the nature of the business made SEO structurally difficult. Products and deals had short lifecycles. When a deal expired, its page disappeared. Any organic ranking built up around it was gone. There was no compounding SEO value — just a graveyard of expired URLs.",
    },
    {
      kind: "p",
      text: "The result was an acquisition model entirely dependent on paid media and newsletters. Both effective, both expensive, both stopping the moment you stop paying. There was no always-on organic channel building value in the background. That was the brief: build one.",
    },

    { kind: "h2", text: "The approach" },
    {
      kind: "p",
      text: "The solution had two layers. A technical infrastructure layer in Python, and a page generation and optimization layer built on Verbolia. Together they created a system that could generate, publish, and maintain thousands of SEO-optimized pages — automatically, continuously, and without IT involvement.",
    },

    { kind: "h3", text: "Layer 1 — the data pipeline" },
    {
      kind: "p",
      text: "Before any page could be generated, we needed to know which pages were worth generating. The Python pipeline combined four sources:",
    },
    {
      kind: "ul",
      items: [
        "Google Search Console — what queries was the site already appearing for, even without dedicated pages?",
        "GA4 internal search — what were visitors actually searching for on the site? One of the most underused keyword sources in e-commerce SEO.",
        "Product feed — which category and attribute combinations existed in the inventory that didn't have a dedicated landing page?",
        "Competitor / external data — where were competitors ranking for terms the client had inventory to compete on but no page to do it with?",
      ],
    },
    {
      kind: "p",
      text: "The pipeline pulled all four sources, cleaned and deduped the data, scored each keyword opportunity by search volume, commercial intent and catalogue match, and output a prioritized list of pages that should exist but didn't. It ran quarterly to capture shifts in search demand, seasonal changes, new product categories and emerging queries.",
    },

    { kind: "h3", text: "Layer 2 — automated page generation with Verbolia" },
    {
      kind: "p",
      text: "With the keyword list in hand, Verbolia handled the page creation side. For each prioritized keyword, Verbolia automatically generated a fully SEO-optimized product listing page, pulling relevant products from the catalogue, applying technical SEO best practices, and publishing without any IT involvement. What would previously have taken months of development per page now took minutes at scale — thousands of long-tail listing pages, each matched to real search demand and catalogue inventory, live within days.",
    },

    { kind: "h3", text: "Content optimization via Google Sheets" },
    {
      kind: "p",
      text: "To push content quality above baseline, a custom prompt workflow was built in Google Sheets using the ChatGPT API. Each page's SEO content — headings, descriptions, on-page copy — was bulk-processed through the prompt, optimized, and injected back into Verbolia for deployment. This consistently achieved content scores of 70/100+ across the page set without manual copywriting at scale.",
    },

    { kind: "h3", text: "Redirect automation for product volatility" },
    {
      kind: "p",
      text: "If a page dropped below a minimum product threshold, it was automatically redirected to the most relevant alternative using AI-based matching. When the products returned, the page was automatically republished. Organic equity accumulated. Nothing was wasted.",
    },

    { kind: "h3", text: "Monthly manual review layer" },
    {
      kind: "p",
      text: "Automation handled the volume. Human judgment handled the ceiling. Each month, the top-performing pages were manually reviewed and fine-tuned: meta descriptions, on-page copy, product merchandising, internal linking — ensuring the highest-traffic pages always performed at the quality level that automation alone can't reliably reach.",
    },

    { kind: "h2", text: "The results" },
    {
      kind: "p",
      text: "Within one year, the system moved SEO from a neglected channel to one of the most profitable acquisition investments in the business.",
    },
    {
      kind: "ul",
      items: [
        "Verbolia-generated pages account for 30% of total SEO traffic — on top of a site that was already a top-10 Swiss e-commerce player.",
        "Monthly SEO revenue attributable to the automated page layer reached CHF 450,000+. Annualized: well over CHF 5 million from a channel that was generating close to nothing before.",
        "ROI on the combined Python + Verbolia infrastructure exceeded 100×, making it one of the highest-returning line items in a budget that includes paid search, display, affiliates and newsletters.",
        "The initial target of CHF 3M in annual SEO revenue was exceeded ahead of schedule.",
      ],
    },

    { kind: "h2", text: "What made it work" },
    {
      kind: "p",
      text: "Data before pages. The keyword pipeline ran before a single page was built. Every page that went live was matched to documented search demand and real catalogue inventory. There was no guesswork about whether a page should exist.",
    },
    {
      kind: "p",
      text: "Automation at the right layer. Page generation, content optimization, and redirect logic were automated. Manual effort was reserved for decisions that benefit from human judgment — top-page optimization, quarterly strategy, merchandising.",
    },
    {
      kind: "p",
      text: "Permanence by design. Redirect automation meant short product lifecycles no longer killed SEO value. Pages survived product volatility. Organic equity compounded over time rather than resetting every time a deal expired.",
    },
    {
      kind: "p",
      text: "No IT dependency. Once the pipeline and Verbolia integration were set up, the entire system was managed by the marketing team. Seasonal pushes — Black Friday, Christmas, summer sales — could be executed without a development sprint.",
    },

    { kind: "h2", text: "Stack summary" },
    {
      kind: "stack",
      rows: [
        ["Keyword intelligence", "Python (GSC API + GA4 API + product feed)"],
        ["Page generation", "Verbolia Vpage"],
        ["Content optimization", "ChatGPT API via Google Sheets"],
        ["Redirect automation", "Verbolia AI matching"],
        ["Performance monitoring", "Google Search Console + GA4"],
        ["Manual optimization", "Monthly review cycle"],
      ],
    },

    { kind: "h2", text: "Closing thought" },
    {
      kind: "p",
      text: "SEO for e-commerce is often treated as a content problem — write more, publish more, optimize more. This project was built on a different premise: that the bottleneck is not content volume, it is infrastructure. When the infrastructure is right — keyword intelligence feeding automated page generation feeding redirect-protected organic equity — SEO stops being a manual effort and starts being a compounding asset.",
    },
    {
      kind: "p",
      text: "The channel that was previously impossible to scale became, within a year, one of the most efficient revenue generators in the business.",
    },
  ],
};

const leadforgeAgentPage: CaseStudyDetail = {
  id: "leadforge-agent-page",
  title:
    "How LeadForge's Agent Page turns B2B website visitors into qualified leads — without forms-first friction",
  tagline:
    "Answer first. Qualify second. Capture last. The conversion is a by-product of actually helping.",
  blocks: [
    { kind: "h2", text: "The problem" },
    {
      kind: "p",
      text: "Most B2B websites are built around the same broken assumption: that a visitor who is ready to buy will willingly stop, fill in a form, and wait. They won't.",
    },
    {
      kind: "p",
      text: "A visitor lands with intent. The site forces them into one of three dead-end choices: click through endless pages, fill in a form, or leave. The real problem is not traffic. It is friction and uncertainty. People don't convert because they don't know the answers to the questions that matter most to them. Is this right for me? What will it cost? What happens next? Can I trust you?",
    },
    {
      kind: "p",
      text: "The standard response to this problem has been chatbots. But most chatbots are decoration. They sit in a corner, offer a scripted flow that feels nothing like a real conversation, and hand the visitor back to a form the moment anything gets interesting. The result is a website that looks like it is helping but is actually just delaying the same dead end.",
    },

    { kind: "h2", text: "The insight behind Agent Page" },
    {
      kind: "p",
      text: "The moment a visitor arrives, they already have a question. The job of the page is not to present information — it is to answer that question, confirm understanding, and guide the visitor to the next step before uncertainty wins and they leave.",
    },
    {
      kind: "callout",
      text: "Old site: browse → confusion → form → silence.  Agent Page: ask → answer → qualify → convert.",
    },

    { kind: "h2", text: "How it works" },
    { kind: "h3", text: "Intent detection and routing" },
    {
      kind: "p",
      text: "Every conversation is immediately classified into one of four visitor scenes, each with a different question, a different fear and a different definition of success:",
    },
    {
      kind: "ul",
      items: [
        "The ready buyer — knows they want to move forward. Their fear is wasted time. Success: a clear range and a booked appointment within two minutes.",
        "The researcher — comparing options. Their fear is making the wrong choice. Success: a clear, honest comparison and a concrete next step.",
        "The existing customer — knows the product and has a specific operational question. Needs resolution, not sales. Success: an answer or a ticket, fast.",
        "The wrong fit — on the site but not a viable customer. Redirected politely rather than wasting their time or the client's pipeline.",
      ],
    },
    {
      kind: "p",
      text: "The agent recognizes the scene from the first message and switches tone and approach instantly. It does not ask ten questions. It asks two, at the right moment. The visitor feels guided, not interrogated.",
    },

    { kind: "h3", text: "Modes and brain switching" },
    {
      kind: "p",
      text: "The agent operates in four distinct modes depending on where the visitor is in the conversation:",
    },
    {
      kind: "ul",
      items: [
        "Discovery — minimal questions, short and open.",
        "Answer — crisp and helpful. Real answers, not deflections.",
        "Convert — shifts to a guide: here is what makes sense for your situation, here is how to move forward.",
        "Escalate — becomes a dispatcher. Routes to the right person with context packaged, so the visitor never has to repeat themselves.",
      ],
    },
    {
      kind: "p",
      text: "The routing logic underneath is straightforward: sales-high intent → book now, sales-medium → nurture and capture, support → resolution or ticket, wrong fit → polite redirect. The agent is not a talker. It is a router. The magic is not in long answers — it is in choosing the right next step.",
    },

    { kind: "h3", text: "Progressive profiling: lead capture without killing the mood" },
    {
      kind: "p",
      text: "This is where most chat experiences fail. They ask for a form too early. The visitor is not ready to hand over their details, trust collapses, and the conversation ends. Agent Page uses a relationship arc instead. Four steps before a form field ever appears:",
    },
    {
      kind: "ul",
      items: [
        "Help — give genuine value first.",
        "Confirm understanding — show that the agent actually understood the situation.",
        "Offer the next step — make it feel natural, not transactional.",
        "Only then: ask for details.",
      ],
    },
    {
      kind: "p",
      text: "The capture moment is story-based. The agent frames it as a reason, not a demand: \"I can work out the exact details for your situation. Want me to send you a short summary with the advice and a price indication? I only need your email for that.\" Email is to send the summary. Name is to personalize it. Company is to tailor the advice. Phone is optional. Every field has a reason. None of it feels like a form.",
    },

    { kind: "h3", text: "Knowledge system: truth, boundaries, and trust" },
    {
      kind: "p",
      text: "The agent is built on a RAG pipeline — Ingest, Retrieve, Answer. Everything it knows comes from a defined knowledge base built from the client's actual content, services and pricing. It does not guess. It does not hallucinate.",
    },
    {
      kind: "ul",
      items: [
        "If unsure, ask one clarifying question.",
        "If still unsure, offer a human.",
        "Never guess pricing or policy.",
        "Always align with the client's actual services.",
      ],
    },
    {
      kind: "p",
      text: "The best agent is confident when it knows and humble when it doesn't. That humility is what creates trust. A visitor who catches an AI making something up is gone. A visitor who sees an AI say \"I want to make sure I give you the right answer, let me connect you with someone who can confirm this\" stays — and usually converts.",
    },

    { kind: "h3", text: "Human handoff that feels premium" },
    {
      kind: "p",
      text: "When the conversation reaches a point where a human is the right next step, the handoff is designed to feel like VIP service, not a failure state. The visitor never has to repeat themselves. The agent packages the full context and passes it to the human alongside a summary of what the visitor needs. The handoff message is direct: \"I'm connecting you to a specialist right now. You don't need to repeat anything — I'm sending the context with you. Would you like to call, WhatsApp, or book an appointment?\" The visitor feels like the system knows them. Because it does.",
    },

    { kind: "h3", text: "The analytics and optimization loop" },
    {
      kind: "p",
      text: "Every conversation is product research. Agent Page tracks a small set of metrics that actually matter: chat start rate, qualified lead rate, handoff rate (should be healthy, not zero), time to first value. The weekly loop: top questions surface content gaps in the knowledge base, which get addressed, which improves conversion the following week. The agent improves automatically as more conversations happen — not on a development timeline.",
    },

    { kind: "h2", text: "What this changes" },
    {
      kind: "p",
      text: "The standard B2B website conversion path: visitor arrives, reads, maybe fills in a form, sales team follows up days later, most of the intent has evaporated. Agent Page compresses the path to: visitor arrives, asks, agent answers and qualifies, visitor books or submits with context — all within the same session, while intent is live.",
    },
    {
      kind: "p",
      text: "For B2B businesses where a single qualified lead is worth thousands of euros, the difference between a visitor who leaves uncertain and a visitor who books a call in the same session is the entire business case.",
    },

    { kind: "h2", text: "Stack summary" },
    {
      kind: "stack",
      rows: [
        ["RAG pipeline", "Ingest, Retrieve, Answer — retrieval over client knowledge base"],
        ["Intent detection", "Visitor scene classification and routing"],
        ["Progressive profiling", "Trust-first lead capture without forms"],
        ["Mode switching", "Discover / Answer / Convert / Escalate"],
        ["Human handoff", "Context packet, zero repetition"],
        ["Analytics loop", "Weekly conversation audit + knowledge base update"],
      ],
    },

    { kind: "h2", text: "Closing thought" },
    {
      kind: "p",
      text: "Most B2B websites treat the visitor as someone to be processed — a form to fill, a funnel to move through, a lead to score. Agent Page treats the visitor as someone who arrived with a question and deserves a real answer. The conversion is a by-product of that. When a visitor feels understood, helped and guided — rather than redirected to a form and told to wait — the decision to move forward becomes easy. Not because they were pushed. Because the friction was gone.",
    },
    {
      kind: "p",
      text: "That is the only conversion mechanism that scales.",
    },
  ],
};

const googleAdsAgentspace: CaseStudyDetail = {
  id: "google-ads-agentspace",
  title:
    "How Google Ads Agentspace eliminates 70% of manual work and runs optimizations that used to take days",
  tagline:
    "From dashboards that show what happened to agents that tell you what to do about it.",
  blocks: [
    { kind: "h2", text: "The problem" },
    {
      kind: "p",
      text: "Managing Google Ads accounts at a serious level is not a strategy problem. It is a time problem. The actual strategic decisions — where to push the budget, which products to prioritize, which campaigns are underperforming and why — take minutes to make once you have the right information in front of you. The problem is getting to that information.",
    },
    {
      kind: "p",
      text: "Pulling reports, cross-referencing data, diagnosing anomalies, checking quality scores, identifying missed opportunities, writing optimization notes, implementing changes. All of it manual. All of it happening before a single strategic decision gets made. For a freelancer managing multiple accounts, or an agency with a portfolio of clients, this is where most of the week goes — not on strategy, but on the operational layer that has to happen before strategy is even possible.",
    },

    { kind: "h2", text: "The insight" },
    {
      kind: "p",
      text: "Most Google Ads tools show you data. Dashboards, reports, graphs. They answer \"what happened?\" They do not answer \"why did it happen?\" and they certainly do not answer \"what should I do about it?\" That gap — between data and decision — is where account managers spend most of their time. Google Ads Agentspace closes that gap. Not by showing better dashboards, but by replacing the manual diagnostic and optimization layer entirely with an AI agent that thinks in terms of account performance, not just account data.",
    },

    { kind: "h2", text: "The architecture" },
    {
      kind: "p",
      text: "Google Ads Agentspace is a multi-agent system built on Google ADK, Python, Pydantic and LangChain, connected directly to the Google Ads API. It is not a reporting wrapper. It is an agent that can analyze, diagnose, recommend and execute across an entire account — or portfolio of accounts — without manual intervention.",
    },

    { kind: "h3", text: "The core agent loop" },
    {
      kind: "p",
      text: "When a task enters the system — triggered manually, on a schedule, or via a natural language prompt — it is broken down into subtasks and distributed to specialist sub-agents, each scoped for a specific domain of account management.",
    },
    {
      kind: "p",
      text: "This distribution architecture is what separates it from a single-model approach. A single LLM asked to analyze a full Google Ads account produces generic output. A network of specialist agents — one for bid strategy, one for search term review, one for quality score diagnosis, one for budget pacing, one for ad copy evaluation — produces specific, actionable output that reflects how an expert account manager actually thinks about these problems.",
    },

    { kind: "h3", text: "DataLayer" },
    {
      kind: "p",
      text: "All account data is fetched in real time via the Google Ads API. Nothing is stored beyond the scope of the current analysis. The agent pulls campaign performance, ad group data, keyword metrics, search term reports, quality scores, impression share, budget pacing and conversion data, and makes it available to the specialist sub-agents as structured context — typed and validated through Pydantic schemas.",
    },
    {
      kind: "p",
      text: "Pydantic schemas enforce structure at every layer, ensuring every sub-agent receives exactly the data it needs in exactly the format it expects — no hallucinated metrics, no mismatched fields, no ambiguous values. The quality of agent output is directly proportional to the quality and structure of the data it reasons over.",
    },

    { kind: "h3", text: "LangChain orchestration" },
    {
      kind: "p",
      text: "LangChain handles the orchestration layer — agent chains, tool calls, memory, and the flow of context between sub-agents and the central coordinator. The coordinator synthesizes outputs, identifies cross-cutting patterns (a budget constraint that explains an impression share drop that explains a conversion dip), and produces a unified output: diagnosis, prioritized recommendations, and in many cases direct execution of the highest-confidence optimizations.",
    },

    { kind: "h2", text: "What the agent can do" },
    {
      kind: "ul",
      items: [
        "Performance analysis — campaign, ad group and keyword level, with anomaly detection and root cause analysis built in.",
        "Bid strategy review — tROAS, tCPA and manual CPC performance against targets, with specific recommendations on where bid adjustments will have the highest impact.",
        "Budget pacing and reallocation — identifies underpacing and overpacing campaigns, with reallocations weighted by marginal return.",
        "Search term analysis — surfaces negative keyword opportunities, match type recommendations and new keyword candidates.",
        "Quality score diagnosis — breakdown of components (expected CTR, ad relevance, landing page experience) with specific improvement actions per ad group.",
        "Ad copy evaluation — RSA asset performance, low-performing assets, and flagged copy gaps.",
        "Impression share analysis — where budget or quality constraints are limiting market capture, and what it would take to close the gap.",
        "Scheduled reporting — performance summaries on any cadence, framed around the metrics that matter rather than the ones that are easy to pull.",
      ],
    },

    { kind: "h2", text: "What 70% time savings actually means" },
    {
      kind: "p",
      text: "In a typical week of account management, a significant portion goes on pulling and formatting data, a significant portion on diagnosing what the data means, and a smaller portion on actually making and implementing decisions. Agentspace eliminates the first layer almost entirely and substantially compresses the second. Data pulling is instant and automated. Diagnosis is handled by the specialist network and delivered as structured, prioritized output.",
    },
    {
      kind: "p",
      text: "What remains for the human account manager is the layer that actually requires judgment: strategic decisions, client communication, creative direction, and calls that require business context the agent does not have. For a freelancer managing ten accounts, that is the difference between being fully stretched and having genuine capacity to grow. For an agency, it is the difference between headcount scaling linearly with client count and headcount staying flat while the portfolio expands.",
    },

    { kind: "h2", text: "How it compares" },
    {
      kind: "p",
      text: "Most Google Ads tools — reporting platforms, script libraries, AI assistants — operate on the same model: surface data, let the human interpret it. They are faster than manual reporting, but they do not change the fundamental dynamic. The human is still doing the diagnostic and decision-making work.",
    },
    {
      kind: "p",
      text: "Agentspace operates on a different model. The agent does the diagnostic work. The human reviews the output, applies business context, and makes the final call. The cognitive load shifts from processing data to evaluating recommendations — a much lighter and higher-leverage task. That architectural difference — not a faster dashboard — is what produces the 70% time saving.",
    },

    { kind: "h2", text: "Stack summary" },
    {
      kind: "stack",
      rows: [
        ["Agent framework", "Google ADK"],
        ["Orchestration", "LangChain"],
        ["Data validation", "Pydantic"],
        ["Language", "Python"],
        ["Data source", "Google Ads API (real-time)"],
        ["Architecture", "Multi-agent, specialist sub-agents per domain"],
        ["Execution", "Analysis, recommendations, and direct optimization actions"],
      ],
    },

    { kind: "h2", text: "Closing thought" },
    {
      kind: "p",
      text: "Google Ads management has always been a combination of data work and strategic work. For most of its history, data work has dominated — not because it is more valuable, but because it is unavoidable. You cannot make good strategic decisions without good data, and getting to good data has always required significant manual effort.",
    },
    {
      kind: "p",
      text: "Agentspace changes that equation. The data work is automated. The diagnostic work is automated. What remains is the strategic work — which is the only part that was ever worth a specialist's time in the first place. That is what 70% time savings means in practice. Not doing the same work faster. Doing different work entirely.",
    },
  ],
};

const keywordToDealMapping: CaseStudyDetail = {
  id: "keyword-to-deal-mapping",
  title:
    "How keyword-to-deal mapping and bucket-based campaign structure revealed what was actually driving performance",
  tagline:
    "Optimize on the signal closest to business value — not the one closest to the click.",
  blocks: [
    { kind: "h2", text: "The problem" },
    {
      kind: "p",
      text: "Running Google Ads for a deals-based business comes with a measurement problem that most accounts never fully solve. The standard setup tells you which campaigns are converting. It does not tell you which deals are converting, which keywords are driving which deals, or whether the customers who signed up through a specific campaign actually completed their registration and stayed after the cooling-off period.",
    },
    {
      kind: "p",
      text: "For a business where deal quality, completion rate and post-cooling-off retention are the metrics that actually determine profitability, optimizing on standard conversion data alone means optimizing on incomplete information. Campaigns that look healthy may be driving low-value signups. Campaigns that look average may be driving the deals that retain at the highest rate. Without the connection between keyword, deal and actual customer outcome, the bidding strategy is always working with partial data.",
    },

    { kind: "h2", text: "The approach" },
    {
      kind: "p",
      text: "The solution required building three connected layers: a data pipeline that linked keyword and search term data to specific deals, an offline conversion tracking setup that measured real-world registration completion, and a reporting layer in Looker Studio that made all of it visible and actionable at campaign level.",
    },

    { kind: "h3", text: "Layer 1 — keyword-to-deal mapping via the Google Ads API" },
    {
      kind: "p",
      text: "Using the Google Ads API, keyword and search term data was synced to a central dashboard and linked to UTM tags at the deal level. Every click carried the information needed to identify not just which campaign it came from, but which deal it landed on and which search query triggered it.",
    },
    {
      kind: "p",
      text: "This made it possible to answer questions that had previously been unanswerable: which search terms were driving signups for which deals? Which deals performed consistently well across a broad range of keywords? Which deals looked good in isolation but only converted on highly specific, low-volume queries? And critically, which deals were attracting clicks without completing signups?",
    },

    { kind: "h3", text: "Layer 2 — OCT tracking for real registration completion" },
    {
      kind: "p",
      text: "Hard conversions — the click that triggers a standard conversion tag — tell you that someone started a signup. They do not tell you that someone finished it, or that they stayed a customer after the 14-day cooling-off period that applied to this business.",
    },
    {
      kind: "p",
      text: "An Offline Conversion Tracking template connected the backend registration data — including completion status and post-cooling-off retention — back to the campaigns and keywords that drove each signup. The result was a completion rate metric per campaign: the percentage of signups that made it through the full registration and remained customers after the bedenktijd.",
    },
    {
      kind: "p",
      text: "Campaigns that looked comparable in the dashboard turned out to have significantly different completion rates. Some were driving high signup volumes but low completion. Others were driving fewer signups but retaining them at a much higher rate. Without OCT, these campaigns would have been evaluated identically. With it, bidding could be calibrated to the metric that actually reflected business value.",
    },

    { kind: "h3", text: "Layer 3 — bucket structure measurement in Looker Studio" },
    {
      kind: "p",
      text: "The dataLayer was extended to carry deal-level attributes — bucket classification, consumption data, deal category — through to Looker Studio. Every campaign and ad group could now be evaluated not just on cost and conversion volume, but on the quality and profile of the deals it was driving.",
    },
    {
      kind: "p",
      text: "The bucket structure that emerged from this analysis became the organizing principle for the campaign architecture. Rather than structuring campaigns by product category or match type alone, campaigns were rebuilt around deal performance buckets — groupings of deals that shared similar keyword patterns, completion rates and retention profiles. Each bucket got its own bidding logic calibrated to the actual commercial value of the conversions it was driving.",
    },

    { kind: "h2", text: "What the bucket structure made possible" },
    {
      kind: "p",
      text: "Previously, bid strategy decisions were made at campaign level based on aggregated conversion data. A campaign was performing well or it wasn't, based on numbers that blended together deals with very different underlying value. Optimizing on that blended signal meant the algorithm was always compromising — bidding too high for low-value deal signups, too low for high-value ones, because it could not distinguish between them.",
    },
    {
      kind: "p",
      text: "With deals organized into buckets based on keyword affinity, completion rate and retention data, each bucket could be given a bid strategy calibrated to its specific commercial profile. High-completion, high-retention buckets got aggressive targets. Low-completion buckets got conservative targets or were deprioritized. The algorithm was now optimizing against signals that actually reflected what the business cared about.",
    },
    {
      kind: "p",
      text: "As more OCT data accumulated, bucket definitions became more precise. As definitions became more precise, bid strategies became more accurately calibrated. The system compounded.",
    },

    { kind: "h2", text: "Key principles from this build" },
    {
      kind: "ul",
      items: [
        "The conversion you track determines what you optimize for. Standard conversion tracking optimizes for intent. OCT optimizes for outcomes.",
        "Deal-level granularity changes what questions you can ask. Campaign-level reporting answers \"which campaigns are working?\" Deal-level reporting answers \"which deals work for which customers found through which queries?\" The second question is more valuable and more actionable.",
        "Structure should follow data, not precede it. The bucket structure was not designed upfront — it emerged from the data. Building structure before data produces a structure that fits an assumption. Building structure from data produces one that fits reality.",
      ],
    },

    { kind: "h2", text: "Stack summary" },
    {
      kind: "stack",
      rows: [
        ["Data sync", "Google Ads API"],
        ["Click tracking", "UTM tags per deal"],
        ["Offline conversion tracking", "OCT tracking template"],
        ["Reporting & visualization", "Looker Studio"],
        ["dataLayer extension", "Custom deal attributes (bucket, consumption, category)"],
        ["Campaign architecture", "Bucket-based structure per deal performance profile"],
      ],
    },

    { kind: "h2", text: "Closing thought" },
    {
      kind: "p",
      text: "Most Google Ads accounts for deals-based businesses are optimized on the signal that is easiest to track — the conversion event closest to the click. This project was built on a different premise: that the signal worth optimizing for is the one closest to actual business value, even if it is harder to capture.",
    },
    {
      kind: "p",
      text: "Connecting keyword data to deal performance, measuring completion rather than just initiation, and building campaign structure around what the data revealed rather than what the interface made easy — each step moved the optimization target closer to commercial reality. The result was not just better campaign performance. It was a clearer understanding of where value was actually being created, and a structure built to find more of it.",
    },
  ],
};

const gmbLiveFeed: CaseStudyDetail = {
  id: "gmb-live-availability-feed",
  title:
    "How Google My Business labels became a live availability feed for hyper-local Google Ads targeting",
  tagline:
    "Local teams update a label. Google Ads responds automatically. Budget only runs where there's real capacity.",
  blocks: [
    { kind: "h2", text: "The problem" },
    {
      kind: "p",
      text: "Running Google Ads for a multi-location service business with capacity constraints creates a problem that most accounts handle badly or not at all. A service slot fills up at a specific location. The campaign keeps running. The budget keeps spending. Customers click through, check availability, find nothing, and leave. The click was paid for. No value was generated. The customer experience was poor.",
    },
    {
      kind: "p",
      text: "Somewhere in the account, a campaign manager is either manually pausing ad groups location by location — which takes time and always lags behind reality — or accepting the wasted spend as an unavoidable cost of doing business. Neither is a good answer. The first creates an operational burden that scales badly. The second is simply expensive.",
    },

    { kind: "h2", text: "The insight" },
    {
      kind: "p",
      text: "Google My Business labels are typically used for internal organization — tagging locations for filtering or reporting inside the GMB interface. They are not usually thought of as a data layer that can drive advertising behavior. But connected to Google Ads via location extensions, they can be exactly that.",
    },
    {
      kind: "p",
      text: "GMB labels function as a live feed that each location can update independently. If a label signals availability, campaigns run. If a label is removed, campaigns pause. The location itself controls the signal. Google Ads responds to it automatically.",
    },

    { kind: "h2", text: "The architecture" },
    { kind: "h3", text: "Google My Business as the central feed" },
    {
      kind: "p",
      text: "Rather than building a custom availability API or relying on manual campaign management, the solution used GMB as the operational control layer. Each location managed its own availability status through GMB labels — one label per service type, applied when that service had open capacity and removed when it was full.",
    },
    {
      kind: "p",
      text: "The labels were connected to Google Ads through location extensions, creating a live feed relationship between GMB data and campaign behavior. When a location carried the label for a specific service, the corresponding campaigns, ad groups and ads were active. When the label was removed, advertising for that service at that location automatically stopped.",
    },
    {
      kind: "p",
      text: "Local teams did not need access to Google Ads. They did not need training on campaign management. They managed one thing: their GMB labels. Everything downstream happened automatically.",
    },

    { kind: "h3", text: "Service-level granularity" },
    {
      kind: "p",
      text: "The client operated multiple service types across multiple locations. Each service type had its own availability dynamic — some filled up quickly, others had consistent open capacity. A single on/off switch per location would have been too blunt. Each service type got its own label, so a location could be running ads for one service while paused for another — simultaneously, based on actual availability. The result was a campaign structure that matched the real-world state of the business at any given moment.",
    },

    { kind: "h3", text: "Smart bidding at location level" },
    {
      kind: "p",
      text: "With availability handled at the label layer, bidding could be calibrated to the specific performance profile of each location rather than averaging across the portfolio. Locations with consistent demand and strong conversion history ran on performance-based targets. Locations that needed to build presence — newer, more competitive, recovering from a quiet period — were switched to a portfolio bid strategy focused on conversion volume rather than efficiency. The transition was seamless and based on what each location actually needed.",
    },

    { kind: "h3", text: "Radius targeting around each location" },
    {
      kind: "p",
      text: "Targeting precision was improved through radius-based geographic targeting around each individual branch. Campaigns were anchored to a defined radius around each location, ensuring ads reached people within realistic travel distance. This reduced wasted impressions and increased the relevance signal — with downstream effects on quality scores and cost per click.",
    },

    { kind: "h2", text: "What this changed operationally" },
    {
      kind: "p",
      text: "The most significant change was the elimination of manual availability management from the Google Ads workflow entirely. In a traditional multi-location setup, keeping advertising aligned with availability requires continuous monitoring and manual pausing. There is always a window between a service filling up and the corresponding campaign being paused — a window paid for in wasted spend.",
    },
    {
      kind: "p",
      text: "With the GMB label feed in place, that window closed to near zero. The lag between a location updating its availability and the campaign behavior changing was the time it takes for the GMB change to propagate through the location extension feed — measured in minutes, not hours or days.",
    },
    {
      kind: "p",
      text: "For the local teams, the workflow was simpler than before. No Google Ads access, no campaign management, no coordination with a central marketing team for routine availability updates. They updated a label. The system handled everything else.",
    },

    { kind: "h2", text: "The results" },
    {
      kind: "p",
      text: "Budget efficiency improved significantly because spend was no longer allocated to locations or services that could not convert — not because of poor targeting, but because capacity was genuinely unavailable. Every euro of budget was working against an open opportunity.",
    },
    {
      kind: "p",
      text: "Visibility at the location level improved because bidding was calibrated to what each location actually needed rather than being averaged across the portfolio. Locations that needed presence got it. Locations that were already performing well were optimized for efficiency rather than volume.",
    },
    {
      kind: "p",
      text: "The operational overhead of keeping campaigns aligned with real-world availability dropped dramatically — replaced by a label-based system that the locations themselves controlled.",
    },

    { kind: "h2", text: "Key principles from this build" },
    {
      kind: "ul",
      items: [
        "The best feed is one that already exists. GMB was already being managed by local teams — zero additional overhead for the people closest to the availability data.",
        "Local control at the right layer. Giving location teams direct Ads access creates risk. Giving them control over a GMB label gives them exactly the agency they need without exposing campaign architecture to inconsistent management.",
        "Availability is a targeting signal. This project treated availability as a targeting dimension in its own right — ensuring campaigns only ran when there was something real to offer the customer who clicked.",
      ],
    },

    { kind: "h2", text: "Stack summary" },
    {
      kind: "stack",
      rows: [
        ["Availability feed", "Google My Business labels"],
        ["Campaign activation / pausing", "Location extensions connected to GMB"],
        ["Bidding", "Smart bidding per location + portfolio bid strategy"],
        ["Geographic targeting", "Radius targeting per branch"],
        ["Reporting", "Google Ads location performance reporting"],
      ],
    },

    { kind: "h2", text: "Closing thought" },
    {
      kind: "p",
      text: "Multi-location advertising is usually thought of as a scaling problem — how do you manage complexity across a large portfolio without proportionally scaling the team? This project reframed it as a data-architecture problem: how do you ensure that the signals driving campaign behavior reflect the real-world state of the business at every location, in real time, without creating operational burden?",
    },
    {
      kind: "p",
      text: "The answer was to use the data that already existed — GMB labels maintained by local teams — and connect it to campaign logic in a way that made manual intervention unnecessary for routine availability management. The result was a system that was simpler to operate than what it replaced, more accurate in its targeting, and more efficient in its use of budget. Which is what good architecture usually produces.",
    },
  ],
};

const neverleafsPerformanceMatrix: CaseStudyDetail = {
  id: "neverleafs-performance-matrix",
  title:
    "How automated campaign content and a product performance matrix drove +422% ROAS",
  tagline:
    "The catalogue isn't a static input. Wire it to the campaign structure and it becomes a live signal.",
  blocks: [
    { kind: "h2", text: "The client" },
    {
      kind: "p",
      text: "NeverLeafs is an e-commerce player in tools and accessories, managing a large product catalogue across a compact but efficient operation. With thousands of SKUs and continuous stock movement, keeping advertising aligned with commercial reality — which products are moving, which are sitting, which need a push — was a constant operational challenge.",
    },

    { kind: "h2", text: "The problem" },
    {
      kind: "p",
      text: "Running Google Ads for a large product catalogue creates a version of the same problem in almost every account: the campaign structure is static, but the catalogue is not. Products move in and out of stock. Some sell fast. Some sit for weeks. Some are margin winners. Some are eating budget without returning value. The standard Google Ads setup treats all of this as roughly equivalent — same campaign structure, same bidding logic, same creative treatment, regardless of what is actually happening in the warehouse.",
    },
    {
      kind: "p",
      text: "The result is predictable. Budget flows to products that have historical conversion data — which tends to be the products that were already popular — while slow-moving inventory accumulates holding costs and receives no advertising support that might clear it. The account optimizes toward what worked before rather than what the business needs now.",
    },
    {
      kind: "p",
      text: "For NeverLeafs, two things needed to change. Product performance segmentation had to drive campaign structure in real time. And the content creation process — ad copy for a catalogue of thousands of products — had to stop being a manual bottleneck.",
    },

    { kind: "h2", text: "The approach" },
    { kind: "h3", text: "Step 1 — product performance segmentation" },
    {
      kind: "p",
      text: "A Google Ads script was built to provide a dynamic, continuously updated view of product performance across the catalogue. Every product was automatically classified into one of three buckets based on its performance profile over a rolling time window:",
    },
    {
      kind: "ul",
      items: [
        "Hardlopers — fast-moving products with strong conversion history and healthy margins. Maximum budget priority and aggressive bidding in Performance Max.",
        "Gemiddeld — mid-tier products with acceptable performance and room for improvement. Standard bidding, monitored for movement into either adjacent bucket.",
        "Slecht presterend — slow-moving or non-converting products. Rather than excluded from advertising, they become the input for a different strategy entirely.",
      ],
    },
    {
      kind: "p",
      text: "The classification was dynamic. Products moved between buckets automatically as their performance data updated, meaning the campaign structure continuously recalibrated to reflect the current state of the catalogue rather than a snapshot from the last manual review.",
    },

    { kind: "h3", text: "Step 2 — turning slow movers into week deals" },
    {
      kind: "p",
      text: "Slow-moving inventory is a cost. Products sitting in the warehouse consume space and tie up working capital. Advertising them at a standard margin is not necessarily the right approach — but advertising them as a discounted deal, with urgency, often is.",
    },
    {
      kind: "p",
      text: "The slecht presterend bucket fed directly into a weekly deals pipeline. Products flagged as slow-moving were automatically promoted into the week deal promotion. This connected the warehouse reality — products that needed to move — directly to the advertising strategy.",
    },

    { kind: "h3", text: "Step 3 — automated content creation via ChatGPT + Google Sheets" },
    {
      kind: "p",
      text: "With thousands of products and a weekly deals cycle, manual ad copy was not viable. A workflow was built in Google Sheets that used the ChatGPT API to generate optimized campaign content for each product. The workflow took product data — name, category, key attributes, price point, promotional status — and generated ad headlines, descriptions and promotional copy calibrated to product type and campaign context (standard performance vs. week deal). Content was generated in bulk, reviewed, and pushed directly into the campaigns via Channable.",
    },

    { kind: "h3", text: "Step 4 — Performance Max structure by bucket" },
    {
      kind: "ul",
      items: [
        "Hardlopers — dedicated PMax campaign, high budget allocation, no tROAS ceiling. Goal: market share capture on products already proven to convert.",
        "Weekdeals — separate PMax campaign with urgency-oriented creative generated specifically for the promotional context. Different headlines, different value props, different bidding logic reflecting the discounted margin.",
        "Slow movers not selected for week deals — deprioritized or excluded, preventing budget from flowing into inventory that the warehouse data already indicated was not moving.",
      ],
    },

    { kind: "h2", text: "The results" },
    {
      kind: "ul",
      items: [
        "+422% ROAS — driven by reallocating budget away from non-performing inventory and toward proven hardlopers, combined with creative assets optimized per product rather than generic across the catalogue.",
        "+€210,000 additional revenue — generated through improved performance on core inventory and the week deals pipeline converting slow-moving stock into incremental revenue that would otherwise not have been captured.",
      ],
    },

    { kind: "h2", text: "What made it work" },
    {
      kind: "p",
      text: "The warehouse and the campaign structure talked to each other. Most e-commerce advertising treats inventory and campaigns as separate problems. This project built a direct connection — slow-moving stock became week deal candidates automatically, and the campaign structure responded to stock movement in real time rather than on a manual review cycle.",
    },
    {
      kind: "p",
      text: "Content creation scaled without scaling the team. A catalogue of thousands of products requires thousands of pieces of ad content. The ChatGPT + Sheets workflow meant content kept pace with the catalogue and the weekly deals cycle without creating a manual bottleneck.",
    },
    {
      kind: "p",
      text: "Not all products deserve the same bidding logic. The bucket structure was an operational choice, not a reporting exercise. Different buckets got different budget priorities, different bidding strategies and different creative treatments — reflecting the commercial reality of the catalogue rather than averaging across it.",
    },

    { kind: "h2", text: "Stack summary" },
    {
      kind: "stack",
      rows: [
        ["Product segmentation", "Google Ads script (dynamic bucket classification)"],
        ["Content generation", "ChatGPT API via Google Sheets"],
        ["Feed & campaign management", "Channable"],
        ["Campaign structure", "Performance Max (hardlopers + week deals)"],
        ["Inventory signal", "Warehouse data → slecht presterend bucket"],
      ],
    },

    { kind: "h2", text: "Closing thought" },
    {
      kind: "p",
      text: "The standard approach to e-commerce Google Ads treats the catalogue as a static input. This project treated it as a live signal — one that should continuously inform which products get budget, what creative they run with, and whether they belong in a performance campaign or a clearance pipeline. The result was not just better ROAS. It was a campaign structure that served the business rather than running alongside it.",
    },
  ],
};

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  [pmaxFeedArchitecture.id]: pmaxFeedArchitecture,
  [verboliaSeo.id]: verboliaSeo,
  [leadforgeAgentPage.id]: leadforgeAgentPage,
  [googleAdsAgentspace.id]: googleAdsAgentspace,
  [keywordToDealMapping.id]: keywordToDealMapping,
  [gmbLiveFeed.id]: gmbLiveFeed,
  [neverleafsPerformanceMatrix.id]: neverleafsPerformanceMatrix,
};
