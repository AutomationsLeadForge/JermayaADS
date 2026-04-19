export type RoleTitle = string;

export interface AreaSwitch {
  id: string;
  label: string;
  popupTitle: string;
  popupText: string;
}

export interface ContactTile {
  id: string;
  label: string;
  href: string;
  image: string;
  external: boolean;
}

export interface PortfolioSlide {
  src: string;
  alt: string;
}

export interface ServiceLogo {
  src: string;
  alt: string;
}

export interface HustleLink {
  id: string;
  href: string;
  image: string;
  alt: string;
  external: boolean;
}

export interface ListLink {
  label: string;
  href: string;
  external?: boolean;
  focus?: boolean;
  withGithub?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  logo: string;
}

export interface RoadmapStep {
  label: string;
  paragraphs: string[];
}

export interface WaaromBullet {
  label: string;
}

export interface PdfSlide {
  image: string;
  file: string;
  title?: string;
}

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  icon?: "home";
}
