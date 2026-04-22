export interface AboutChip {
  value: string;
  label: string;
}

export interface AboutContentValue {
  body: string;
  chips: AboutChip[];
  currently: string[];
}

export interface ReadmeContentValue {
  body: string;
}

export type SiteContentKey = "about" | "readme";

export interface SiteContentRow<T = unknown> {
  key: SiteContentKey;
  value: T;
  updated_at: string;
}
