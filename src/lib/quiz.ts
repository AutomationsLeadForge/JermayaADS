export interface QuizAnswer {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  scenario: string;
  facts?: string[];
  answers: QuizAnswer[];
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  /* =======================================================
     Section 1 — Easier advanced questions (10)
     ======================================================= */
  {
    id: "smart-bidding-purpose",
    scenario: "In Google Ads, what is the main purpose of Smart Bidding?",
    answers: [
      { text: "To manually lower CPCs on all keywords.", correct: false },
      {
        text:
          "To use auction-time signals to optimise for conversions or conversion value.",
        correct: true,
      },
      { text: "To improve ad design automatically.", correct: false },
      {
        text: "To replace landing pages with Google-hosted pages.",
        correct: false,
      },
    ],
    explanation:
      "Smart Bidding uses machine learning and auction-time context signals to set bids based on the likelihood of conversion or conversion value, rather than simply chasing lower CPCs.",
  },
  {
    id: "data-driven-attribution",
    scenario:
      "Which attribution model uses account data to assign credit based on how different touchpoints contribute to conversion?",
    answers: [
      { text: "First click.", correct: false },
      { text: "Last click.", correct: false },
      { text: "Linear.", correct: false },
      { text: "Data-driven.", correct: true },
    ],
    explanation:
      "Data-driven attribution evaluates actual conversion paths in the account and distributes credit based on how much each interaction appears to contribute.",
  },
  {
    id: "broad-match-risk",
    scenario:
      "What is the biggest risk of using broad match without strong audience signals, negatives, or conversion tracking?",
    answers: [
      { text: "Ads stop serving completely.", correct: false },
      { text: "Impression share becomes 100%.", correct: false },
      {
        text: "Budget may be spent on loosely relevant queries.",
        correct: true,
      },
      { text: "Quality Score is removed from the account.", correct: false },
    ],
    explanation:
      "Broad match can expand reach substantially, but without guardrails it may match to lower-intent or only partially relevant searches and waste spend.",
  },
  {
    id: "pmax-strongest-input",
    scenario:
      "In a Performance Max campaign, which input gives Google the strongest guidance on what good performance means?",
    answers: [
      { text: "Ad strength.", correct: false },
      { text: "Final URL expansion.", correct: false },
      { text: "Conversion goals and value rules.", correct: true },
      { text: "Number of headlines provided.", correct: false },
    ],
    explanation:
      "Performance Max optimises toward the conversion actions and values you define. If those signals are wrong or weak, the campaign may optimise toward the wrong outcome.",
  },
  {
    id: "is-lost-rank",
    scenario: "What does Search Impression Share lost due to rank mainly indicate?",
    answers: [
      { text: "Your billing setup is incorrect.", correct: false },
      {
        text: "Your ads were limited by low Ad Rank in eligible auctions.",
        correct: true,
      },
      { text: "Your keywords are duplicated.", correct: false },
      { text: "Your campaign has too many ad groups.", correct: false },
    ],
    explanation:
      "This metric means your ads were eligible in principle, but Ad Rank was not strong enough often enough to capture more impressions.",
  },
  {
    id: "ad-rank-without-bids",
    scenario:
      "Which change is most likely to improve Ad Rank without directly increasing bids?",
    answers: [
      { text: "Pausing all exact match keywords.", correct: false },
      {
        text:
          "Improving expected CTR, ad relevance, and landing page experience.",
        correct: true,
      },
      { text: "Reducing daily budget.", correct: false },
      { text: "Removing conversion tracking.", correct: false },
    ],
    explanation:
      "Ad Rank is influenced by bid and quality-related factors. Better ads and landing pages can improve auction competitiveness without raising bids.",
  },
  {
    id: "troas-instability",
    scenario:
      "If a campaign is using Target ROAS, which situation usually causes instability?",
    answers: [
      { text: "Too much consistent conversion volume.", correct: false },
      {
        text:
          "Frequent major budget, target, or asset changes in a short period.",
        correct: true,
      },
      { text: "Using audiences in observation mode.", correct: false },
      { text: "Having more than one responsive search ad.", correct: false },
    ],
    explanation:
      "Aggressive or repeated changes force the system to constantly recalibrate, which can make performance volatile and delay learning.",
  },
  {
    id: "negatives-mature-account",
    scenario: "What is the best reason to use negative keywords in a mature search account?",
    answers: [
      { text: "To increase search volume at any cost.", correct: false },
      {
        text: "To prevent irrelevant traffic and improve efficiency.",
        correct: true,
      },
      { text: "To force Google to use only exact match.", correct: false },
      { text: "To raise Quality Score instantly.", correct: false },
    ],
    explanation:
      "Negative keywords help block unqualified searches so budget is concentrated on queries that are more likely to convert profitably.",
  },
  {
    id: "high-ctr-low-cvr",
    scenario:
      "A keyword has strong CTR but weak conversion rate. What is the best first diagnosis?",
    answers: [
      { text: "The campaign should be deleted.", correct: false },
      { text: "The keyword match type is always wrong.", correct: false },
      {
        text:
          "There may be a mismatch between search intent, ad promise, and landing page experience.",
        correct: true,
      },
      { text: "Maximise Clicks should be used forever.", correct: false },
    ],
    explanation:
      "High CTR means the ad is attractive enough to get clicks, but weak conversion rate suggests a downstream problem such as intent mismatch, poor landing page alignment, or weak offer fit.",
  },
  {
    id: "conversion-tracking-critical",
    scenario: "Which statement about conversion tracking is most accurate?",
    answers: [
      { text: "It is optional if CTR is high.", correct: false },
      {
        text: "It is essential for Smart Bidding to optimise effectively.",
        correct: true,
      },
      { text: "It only matters for ecommerce brands.", correct: false },
      {
        text:
          "It works the same even if duplicate conversions are counted incorrectly.",
        correct: false,
      },
    ],
    explanation:
      "Smart Bidding relies on conversion data quality. If tracking is missing, delayed, duplicated, or poorly defined, optimisation quality suffers.",
  },

  /* =======================================================
     Section 2 — Really difficult questions (20)
     ======================================================= */
  {
    id: "tcpa-budget-constrained",
    scenario:
      "A lead-gen account uses Target CPA with a $150 daily budget, $12 average CPC, historical CPA of $60, and high impression share lost due to budget. Conversion rate is stable. What is the most likely core issue?",
    answers: [
      { text: "The campaign has too many ad groups.", correct: false },
      {
        text:
          "The budget is too constrained for the bidding strategy to capture enough converting traffic.",
        correct: true,
      },
      { text: "The landing page is definitely broken.", correct: false },
      {
        text: "The account should switch to manual CPC immediately.",
        correct: false,
      },
    ],
    explanation:
      "At a $60 CPA, a $150 daily budget only supports about 2.5 conversions per day on average. That often limits scale and gives the bidding model less room to participate in enough high-quality auctions.",
  },
  {
    id: "troas-too-aggressive",
    scenario:
      "An ecommerce account switches from Maximise Conversion Value to Target ROAS with a target well above recent actual ROAS. Spend drops sharply, conversion volume drops, ROAS appears higher, but total revenue falls. What is the best interpretation?",
    answers: [
      {
        text: "The strategy is working perfectly because ROAS increased.",
        correct: false,
      },
      {
        text:
          "The target likely became too restrictive, reducing auction participation.",
        correct: true,
      },
      { text: "Conversion tracking is definitely broken.", correct: false },
      { text: "Broad match caused overspending.", correct: false },
    ],
    explanation:
      "An aggressive ROAS target can make the system bid more selectively, reducing spend and volume. Efficiency may rise on paper while total revenue falls because fewer auctions are entered.",
  },
  {
    id: "blended-cpa-brand-mask",
    scenario:
      "A search account reports a very strong blended CPA after branded keywords are added into the main campaign. Leadership says the account is now far more efficient. What is the strongest analytical objection?",
    answers: [
      { text: "Brand keywords should never be used.", correct: false },
      {
        text:
          "Blended CPA may be misleading because brand demand often converts at lower CPA and can mask non-brand inefficiency.",
        correct: true,
      },
      { text: "Google Ads never measures brand correctly.", correct: false },
      { text: "Quality Score is invalid for brand traffic.", correct: false },
    ],
    explanation:
      "Brand traffic typically captures users with existing intent and often converts cheaply. Mixing it into prospecting results can make the total CPA look better without proving that acquisition efficiency improved.",
  },
  {
    id: "offline-conversions-delay",
    scenario:
      "A B2B advertiser imports offline conversions from the CRM. Many conversions are imported 30–45 days later, only closed deals are imported, and monthly volume is limited. What is the biggest optimisation challenge?",
    answers: [
      {
        text: "Google Ads cannot optimise to offline conversions.",
        correct: false,
      },
      {
        text:
          "Feedback delay is long and sparse, making learning slower and noisier.",
        correct: true,
      },
      { text: "RSA headlines are too short.", correct: false },
      { text: "Device bid modifiers are missing.", correct: false },
    ],
    explanation:
      "When signals arrive late and in low volume, Smart Bidding gets less frequent and less timely feedback. That weakens learning speed and model stability.",
  },
  {
    id: "broad-match-governance",
    scenario:
      "An account adds broad match keywords with Smart Bidding. Conversions rise, but irrelevant search term volume also rises. Which response is most strategically sound?",
    answers: [
      { text: "Pause all broad match immediately.", correct: false },
      {
        text:
          "Keep broad match, strengthen negatives, validate conversion quality, and review query intent regularly.",
        correct: true,
      },
      { text: "Remove all exact match keywords.", correct: false },
      {
        text: "Switch off conversion tracking and judge only by CTR.",
        correct: false,
      },
    ],
    explanation:
      "Broad match can unlock incremental volume, but it needs governance. The best move is usually to refine targeting hygiene rather than abandoning the strategy instantly.",
  },
  {
    id: "pmax-incrementality",
    scenario:
      "After launching Performance Max, branded search impressions and clicks decline, while total account conversions rise only slightly. Leadership asks whether PMax is incremental. What is the best next step?",
    answers: [
      { text: "Assume all PMax conversions are net new.", correct: false },
      { text: "Judge only by ad strength.", correct: false },
      {
        text: "Run a structured incrementality test or controlled experiment.",
        correct: true,
      },
      { text: "Pause all standard search immediately.", correct: false },
    ],
    explanation:
      "Performance Max may capture demand that would have converted anyway through brand or remarketing. Incrementality should be tested, not assumed from platform reporting alone.",
  },
  {
    id: "flash-sale-seasonality",
    scenario:
      "A retailer expects a 48-hour flash sale with materially higher conversion rates than usual. Which setup is most appropriate?",
    answers: [
      {
        text:
          "Do nothing because Smart Bidding handles everything automatically.",
        correct: false,
      },
      {
        text:
          "Use a seasonality adjustment for the short promotional window if conditions fit.",
        correct: true,
      },
      { text: "Switch to manual CPC for the month.", correct: false },
      { text: "Remove all audiences from campaigns.", correct: false },
    ],
    explanation:
      "A short, predictable spike in conversion rate is one of the clearest cases where a seasonality adjustment can help bidding respond more appropriately.",
  },
  {
    id: "assistive-campaign-attribution",
    scenario:
      "A stakeholder sees that a generic non-brand campaign has weak last-click ROAS and wants to cut it. Path data suggests it frequently appears earlier in converting journeys. What is the best expert response?",
    answers: [
      {
        text:
          "Pause it because last-click is always the most reliable business metric.",
        correct: false,
      },
      { text: "Keep spending unchanged forever.", correct: false },
      {
        text:
          "Re-evaluate using broader attribution evidence, incrementality logic, and blended business impact before cutting it.",
        correct: true,
      },
      { text: "Move all spend to branded search only.", correct: false },
    ],
    explanation:
      "Upper-funnel or assistive campaigns often look weak on last-click metrics. A better evaluation considers contribution across the full path and likely incremental impact.",
  },
  {
    id: "lead-quality-value-weights",
    scenario:
      "A campaign using Maximise Conversions produces many leads, but sales says quality dropped badly. What is the highest-level strategic fix?",
    answers: [
      { text: "Increase CTR.", correct: false },
      {
        text:
          "Change optimisation toward higher-quality conversion actions or weighted values instead of raw lead count alone.",
        correct: true,
      },
      { text: "Add more broad match keywords.", correct: false },
      {
        text: "Lower the budget until quality improves on its own.",
        correct: false,
      },
    ],
    explanation:
      "The system optimises for the signal you give it. If all leads are treated equally, it will maximise quantity rather than quality unless you upgrade the conversion framework.",
  },
  {
    id: "over-editing-destabilises-learning",
    scenario:
      "An account manager keeps changing bid targets, budgets, assets, geo settings, and audience signals every 2–3 days. Performance is volatile. What is the best diagnosis?",
    answers: [
      { text: "The platform is random.", correct: false },
      {
        text:
          "Frequent major edits are repeatedly resetting or destabilising learning.",
        correct: true,
      },
      { text: "The account needs more headlines only.", correct: false },
      { text: "Search campaigns should never use automation.", correct: false },
    ],
    explanation:
      "Repeated major changes prevent the system from stabilising and learning from a consistent environment, making performance read-outs noisy and unreliable.",
  },
  {
    id: "marginal-cpa-vs-average",
    scenario:
      "A campaign is profitable at current volume, but when budget increases 40%, CPA worsens sharply. What is the most sophisticated interpretation?",
    answers: [
      { text: "The original CPA was fake.", correct: false },
      {
        text:
          "The campaign is expanding into less efficient auctions, so marginal CPA is worse than average CPA.",
        correct: true,
      },
      { text: "Google Ads has stopped using relevance.", correct: false },
      { text: "Exact match no longer works.", correct: false },
    ],
    explanation:
      "Scaling usually means buying additional inventory beyond the highest-intent traffic. That incremental traffic often converts less efficiently than the core volume.",
  },
  {
    id: "tracking-overcount",
    scenario:
      "A purchase campaign suddenly looks much more efficient after a tracking update. Revenue is up in-platform, but finance sees no similar jump in actual sales. What should you suspect first?",
    answers: [
      { text: "The market suddenly improved.", correct: false },
      {
        text:
          "Attribution and/or conversion value tracking may be overcounting or duplicating value.",
        correct: true,
      },
      { text: "Competitors all stopped advertising.", correct: false },
      {
        text: "Quality Score improved dramatically overnight.",
        correct: false,
      },
    ],
    explanation:
      "When reported platform gains are not reflected in business outcomes, tracking integrity is one of the first things to audit before making budget decisions.",
  },
  {
    id: "campaign-overlap",
    scenario:
      "Two search campaigns target overlapping query themes. One has stronger historical conversion volume, the other has better ad relevance for a subset of searches. What is the most advanced concern?",
    answers: [
      { text: "Overlap never matters in Google Ads.", correct: false },
      {
        text:
          "Internal competition, ranking behaviour, and signal fragmentation may reduce clarity and efficiency.",
        correct: true,
      },
      {
        text: "The lower-volume campaign should always be deleted.",
        correct: false,
      },
      { text: "Broad match will solve everything automatically.", correct: false },
    ],
    explanation:
      "Query overlap can fragment data, complicate control, and reduce clarity about which structure is actually driving performance or learning best.",
  },
  {
    id: "brand-masks-weak-nonbrand",
    scenario:
      "An account has excellent in-platform ROAS, but when brand search is excluded, non-brand profitability looks weak. What is the hardest strategic conclusion?",
    answers: [
      { text: "Cut all non-brand immediately.", correct: false },
      {
        text:
          "The account may be efficient at harvesting existing demand but weak at profitable demand creation.",
        correct: true,
      },
      { text: "Brand should be paused.", correct: false },
      { text: "Attribution should be ignored.", correct: false },
    ],
    explanation:
      "Strong blended ROAS can hide a shallow acquisition engine. The account may be capturing existing demand efficiently without building enough profitable new demand.",
  },
  {
    id: "high-ticket-value-bidding",
    scenario:
      "A high-ticket B2B account has low conversion volume but very large deal-size variation. Which measurement model is most strategically useful for bidding?",
    answers: [
      { text: "Optimise equally to every form fill.", correct: false },
      {
        text:
          "Use value-based optimisation tied to qualified pipeline or expected revenue weights where possible.",
        correct: true,
      },
      { text: "Use CTR as the primary success metric.", correct: false },
      { text: "Ignore offline CRM data.", correct: false },
    ],
    explanation:
      "When deal values vary materially, equal weighting of all leads can be misleading. Value-based signals better align bidding with business impact.",
  },
  {
    id: "demand-saturation",
    scenario:
      "A campaign has high impression share, strong CTR, and low CPC, but revenue growth stalls. Which diagnosis is most plausible?",
    answers: [
      {
        text:
          "The account is already capturing a saturated pool of existing demand and needs new demand sources or broader reach.",
        correct: true,
      },
      { text: "CPC is too low.", correct: false },
      { text: "More ad extensions alone will create demand.", correct: false },
      { text: "Quality Score is irrelevant.", correct: false },
    ],
    explanation:
      "If core efficiency metrics are healthy but growth plateaus, the likely constraint is market size or reach rather than ad execution within the current demand pool.",
  },
  {
    id: "over-invest-bottom-funnel",
    scenario:
      "In a mature ecommerce account, remarketing and branded traffic show excellent efficiency while prospecting is much weaker. What is the main decision risk?",
    answers: [
      {
        text:
          "Over-investing in bottom-funnel capture while underfunding net-new customer acquisition.",
        correct: true,
      },
      { text: "Using too many sitelinks.", correct: false },
      {
        text: "Optimising for purchases instead of clicks.",
        correct: false,
      },
      { text: "Having separate campaigns by funnel stage.", correct: false },
    ],
    explanation:
      "Bottom-funnel traffic often looks best in-platform, but relying too heavily on it can starve the account of future growth and new-customer generation.",
  },
  {
    id: "value-maximising-narrow-mix",
    scenario:
      "A campaign optimised to purchase value starts favouring a small number of high-AOV products, while total order volume declines. What is the strategic issue?",
    answers: [
      {
        text:
          "The bidding model may be maximising value in a way that hurts broader business goals like new-customer volume or contribution-margin balance.",
        correct: true,
      },
      { text: "Google Ads cannot optimise to value.", correct: false },
      { text: "High-AOV products should be removed.", correct: false },
      {
        text: "Impression share should replace ROAS as the only KPI.",
        correct: false,
      },
    ],
    explanation:
      "Value maximisation is not always the same as business optimisation. If the mix skews too far toward a narrow segment, broader goals can suffer.",
  },
  {
    id: "international-localisation",
    scenario:
      "An advertiser expands internationally and sees strong CTR in new markets but weak conversion rates. What is the most advanced first hypothesis?",
    answers: [
      { text: "Search ads do not work internationally.", correct: false },
      {
        text:
          "There may be localisation issues across query intent, ad-language nuance, pricing expectations, trust signals, or checkout experience.",
        correct: true,
      },
      { text: "The campaigns need more exact match only.", correct: false },
      { text: "Device segmentation is unnecessary.", correct: false },
    ],
    explanation:
      "High CTR but weak conversion often indicates the ad is attracting attention while the offer, messaging, pricing, trust cues, or user experience are misaligned with local expectations.",
  },
  {
    id: "underpowered-readout",
    scenario:
      "A team evaluates a bidding strategy change after only five days despite low conversion volume and normal week-to-week demand swings. What is the strongest analytical criticism?",
    answers: [
      { text: "Five days is always enough.", correct: false },
      {
        text:
          "The read-out is likely underpowered and confounded by noise, so the conclusion is unreliable.",
        correct: true,
      },
      { text: "Smart Bidding never needs time.", correct: false },
      { text: "Only CTR should be compared.", correct: false },
    ],
    explanation:
      "With low volume and normal demand variation, five days is usually too short to separate actual signal from noise. The conclusion is likely premature.",
  },
];

export function scoreMessage(correct: number) {
  const total = QUIZ_QUESTIONS.length;
  const pct = total === 0 ? 0 : correct / total;
  if (pct >= 0.8) {
    return {
      title: "Indrukwekkend.",
      body: "Je bent welkom in mijn team. Serieus — laten we praten.",
      tone: "high" as const,
    };
  }
  if (pct >= 0.5) {
    return {
      title: "Niet slecht!",
      body: "Maar er is altijd ruimte voor verbetering. Zullen we samen een campagne auditen?",
      tone: "mid" as const,
    };
  }
  return {
    title: "Je hebt wat hulp nodig.",
    body: "Gelukkig weet ik iemand die hier vrij veel tijd aan heeft besteed. Boek even een call.",
    tone: "low" as const,
  };
}
