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
 * Abridged bio — shown below the counter tiles as context.
 */
export const ABOUT_SNIPPET =
  "Over the years I've developed a deep passion for automation, AI, and data analysis. Google Ads is my home base, but I taught myself Python and JavaScript to bridge those worlds, always with one eye on concrete business outcomes and revenue goals. I don't build for the sake of building. Every script, agent, or pipeline I ship has a commercial reason behind it.";

export const ABOUT_TAGLINE =
  "Tech + business case. You can only truly improve something if you understand it inside and out.";
