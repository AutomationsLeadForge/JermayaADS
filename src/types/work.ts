export type WorkCategoryId = "sea" | "ai" | "dev" | "consultancy" | "product";

export interface AdminWorkProject {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: WorkCategoryId;
  category_label: string;
  role: string;
  outcome_metric: string;
  outcome_label: string;
  summary: string;
  thumbnail_url: string | null;
  icon_key: string;
  href: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PublicWorkProject {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: WorkCategoryId;
  category_label: string;
  role: string;
  outcome_metric: string;
  outcome_label: string;
  summary: string;
  thumbnail_url: string | null;
  icon_key: string;
  href: string | null;
  featured: boolean;
  sort_order: number;
}

export interface WorkProjectInput {
  slug?: string;
  number?: string;
  title: string;
  category?: WorkCategoryId;
  category_label?: string;
  role?: string;
  outcome_metric?: string;
  outcome_label?: string;
  summary?: string;
  thumbnail_url?: string | null;
  icon_key?: string;
  href?: string | null;
  featured?: boolean;
  sort_order?: number;
}

export const WORK_ICON_KEYS = [
  "NewspaperAIIcon",
  "DiscountTagIcon",
  "ScaleIcon",
  "BookStackIcon",
  "AdsRobotIcon",
  "TerminalIcon",
  "ShopBagAIIcon",
  "GlobeIcon",
  "SpreadsheetIcon",
  "ForecastChartIcon",
  "PottedPlantIcon",
  "DocumentIcon",
] as const;

export type WorkIconKey = (typeof WORK_ICON_KEYS)[number];

export const WORK_CATEGORY_OPTIONS: ReadonlyArray<{
  id: WorkCategoryId;
  label: string;
}> = [
  { id: "sea", label: "Google Ads" },
  { id: "ai", label: "AI" },
  { id: "dev", label: "Development" },
  { id: "consultancy", label: "Consultancy" },
  { id: "product", label: "Products" },
];
