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
  {
    id: "tcpa-basics",
    scenario:
      "A webshop sells running shoes. Their CPA target is €15, current CPA is €22, ROAS is 280%. What's your move?",
    facts: ["Target CPA: €15", "Current CPA: €22", "ROAS: 280%"],
    answers: [
      { text: "Increase bids by 20% to get more volume.", correct: false },
      { text: "Switch to Target CPA bidding at €15.", correct: true },
      { text: "Pause the campaign until Q4.", correct: false },
    ],
    explanation:
      "Target CPA lets Smart Bidding optimise each auction toward your cost goal using historical data. Raising bids blindly makes CPA worse; pausing throws away the ROAS you already have.",
  },
  {
    id: "offline-conversions",
    scenario:
      "B2B SaaS account. You optimise on 'Demo booked', but sales say only 10% of demos become SQLs. How do you get Smart Bidding to prioritise quality?",
    facts: [
      "Conversion action: Demo booked",
      "Demo → SQL rate: 10%",
      "Goal: more SQLs, not more demos",
    ],
    answers: [
      { text: "Keep 'Demo booked' as the sole conversion and raise tCPA.", correct: false },
      {
        text:
          "Import offline conversions from the CRM for the SQL stage and feed those to Smart Bidding.",
        correct: true,
      },
      { text: "Switch to tROAS using the value of booked demos.", correct: false },
    ],
    explanation:
      "Smart Bidding only knows what you tell it. Uploading SQL-stage offline conversions lets it bid on the outcome you actually care about, not a proxy event.",
  },
  {
    id: "budget-cap",
    scenario:
      "Your top campaign is showing Impression Share Lost to Budget of 75%. ROAS sits at 6.0× against a 3.0× target.",
    facts: ["IS lost (budget): 75%", "ROAS: 6.0×", "Target ROAS: 3.0×"],
    answers: [
      {
        text: "Wait — Smart Bidding will lower bids automatically to fit the budget.",
        correct: false,
      },
      {
        text: "Raise the budget; Smart Bidding will scale while ROAS stays above target.",
        correct: true,
      },
      { text: "Lower the tROAS target to pull more volume in.", correct: false },
    ],
    explanation:
      "ISL-budget of 75% with ROAS at 2× target is classic 'leaving money on the table'. Budget is the hard constraint — Smart Bidding can't fix it. Raise the budget first.",
  },
  {
    id: "pmax-breadth",
    scenario:
      "You launched Performance Max for a multi-SKU retailer. Total ROAS hits target, but 85% of spend concentrates on the top 10 SKUs. New products get no exposure.",
    facts: ["Top-10 SKU share of spend: 85%", "ROAS: on target", "Weeks live: 4"],
    answers: [
      {
        text: "Split PMax by product tier (high-margin vs. long-tail) using listing groups.",
        correct: true,
      },
      {
        text: "Increase tROAS to force the algorithm to explore more products.",
        correct: false,
      },
      {
        text: "Leave it — Smart Bidding is optimising correctly and will balance over time.",
        correct: false,
      },
    ],
    explanation:
      "PMax tends to over-index on proven SKUs. Splitting into tier-based campaigns gives long-tail products their own budget and learning signal, so breadth grows without sacrificing ROAS.",
  },
  {
    id: "smart-bidding-volume",
    scenario:
      "A brand-new account has been live 2 weeks, averaging 3 conversions/day. The client wants to switch to Target CPA today.",
    facts: ["Days live: 14", "Conv/day: 3", "Conv in last 30 days: ~42"],
    answers: [
      { text: "Switch to tCPA today — that's enough data.", correct: false },
      {
        text:
          "Stay on Maximize Conversions until you have ~30 conversions in 30 days, then switch.",
        correct: true,
      },
      { text: "Use Enhanced CPC only — never switch to automated bidding.", correct: false },
    ],
    explanation:
      "Google's guidance is ~30 conversions in 30 days before tCPA can tune effectively. Below that threshold, Max Conversions collects signal faster and tCPA will misfire.",
  },
];

export function scoreMessage(correct: number) {
  if (correct >= 5) {
    return {
      title: "Indrukwekkend.",
      body: "Je bent welkom in mijn team. Serieus — laten we praten.",
      tone: "high" as const,
    };
  }
  if (correct >= 3) {
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
