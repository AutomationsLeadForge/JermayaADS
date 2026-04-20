export type StatIconKind = "calendar" | "spend" | "people" | "script" | "coffee";

export interface Stat {
  id: string;
  label: string;
  sublabel: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color: string;
  icon: StatIconKind;
}

/**
 * Edit values here. Count-up animation and layout pick these up automatically.
 * Confirm exact values with Jermaya before going live.
 */
export const STATS: Stat[] = [
  {
    id: "years",
    label: "Years in Search",
    sublabel: "shipping ads since 2016",
    value: 10,
    suffix: "+",
    color: "#0a3a8e",
    icon: "calendar",
  },
  {
    id: "spend",
    label: "Ad spend managed",
    sublabel: "SEA + Shopping + PMax",
    value: 5,
    prefix: "€",
    suffix: "M+",
    color: "#c62727",
    icon: "spend",
  },
  {
    id: "clients",
    label: "Clients served",
    sublabel: "freelance + in-house",
    value: 40,
    suffix: "+",
    color: "#1f7a14",
    icon: "people",
  },
  {
    id: "scripts",
    label: "Scripts & tools shipped",
    sublabel: "Python · JS · Ads Scripts",
    value: 25,
    suffix: "+",
    color: "#b35900",
    icon: "script",
  },
];

/**
 * Abridged bio — sourced from Jermaya's own words (Dutch).
 * Shown below the counter tiles as context.
 */
export const ABOUT_SNIPPET =
  "In de loop der jaren heb ik een brede passie ontwikkeld voor automation, AI en data(analyse). Met Google Ads als thuisbasis heb ik mezelf Python en JavaScript aangeleerd om die werelden samen te brengen — altijd gericht op concrete bedrijfs- en omzetdoelstellingen.";

export const ABOUT_TAGLINE =
  "Tech + business case. Je verbetert iets pas echt als je het door en door begrijpt.";
