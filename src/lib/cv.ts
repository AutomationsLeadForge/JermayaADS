export interface CVJob {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  duration: string;
  kind?: string;
  location?: string;
  logo?: string;
  description?: string;
  skills?: string;
}

export interface CVEducation {
  school: string;
  schoolUrl?: string;
  degree: string;
  period: string;
  thesis?: string;
  logo?: string;
}

export const CV_JOBS: CVJob[] = [
  {
    title: "Sr. SEA specialist | Sr. Growth specialist | Digital Marketing | Strategist",
    company: "JermayADS — Performance marketing & automation",
    companyUrl: "https://jermayads.nl",
    period: "Apr 2016 — Present",
    duration: "10 yrs 1 mo",
    kind: "Freelance",
    logo: "/images/cv/jermayads_logo.jpeg",
    description:
      "Het inrichten, beheren en optimaliseren van Google Ads campagnes, het interpreteren van Google Ads (& SA360) en Analytics data om SEA-campagnes te verbeteren. Monitoren van budgetten en het bewaken van doelstellingen en deze rapporteren aan de klant. Adviseren over on-site optimalisaties op het gebied van usability en conversie-optimalisatie, uitvoeren van A/B-testen (landingspagina, biedstrategieën, et cetera). Analyse zoekgedrag, doelgroepen en rapportages. Het bouwen van (custom) scripts om accounts te automatiseren. Met klanten sparren over doelen met betrekking tot omzet, conversies, nieuwe vs. bestaande klanten, ROAS/POAS en CPA-targets. Volledig en geavanceerde tracking om de doelstellingen te bereiken en het Google algoritme op de juiste manier te voeden.",
    skills: "Automatisering, Paid search-strategie +3",
  },
  {
    title: "Medeauteur Google Ads scripts",
    company: "Adsscripts.com",
    companyUrl: "https://adsscripts.com",
    period: "Apr 2023 — Present",
    duration: "3 yrs 1 mo",
    logo: "/images/cv/adsscripts_logo.jpeg",
    description:
      "Ik werk samen met de beste experts in Google Ads scripts. Samen ontwikkelen en delen we geavanceerde Google Ads scripts met de community.",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "The Alpha Men",
    companyUrl: "https://thealphamen.nl",
    period: "Oct 2021 — Present",
    duration: "4 yrs 7 mos",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/the_alpha_men_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Care for Skin",
    companyUrl: "https://careforskin.nl",
    period: "Oct 2021 — Present",
    duration: "4 yrs 7 mos",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/care_for_skin_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Venue Collective",
    companyUrl: "https://venuecollective.com",
    period: "Feb 2023 — Present",
    duration: "3 yrs 3 mos",
    kind: "Freelance",
    logo: "/images/cv/venue_collective_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Clear Kitchen",
    companyUrl: "https://www.clearkitchen.nl",
    period: "2020 — Present",
    duration: "6 yrs 4 mos",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/clear_kitchen_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "PouchDirect",
    companyUrl: "https://www.pouchdirect.com",
    period: "Jun 2023 — Present",
    duration: "2 yrs 11 mos",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/pouchdirect_logo.jpeg",
  },
  {
    title: "CTO en Digital Growth",
    company: "LeadForge",
    period: "Apr 2024 — Present",
    duration: "2 yrs 1 mo",
    logo: "/images/cv/leadforge_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "KickSo",
    companyUrl: "https://kickso.nl",
    period: "Oct 2024 — Oct 2025",
    duration: "1 yr 1 mo",
    kind: "Freelance",
    location: "Hybrid",
    logo: "/images/cv/kickso_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Zaza Woods",
    companyUrl: "https://zazawoods.nl",
    period: "Sep 2021 — May 2025",
    duration: "3 yrs 9 mos",
    kind: "Freelance",
    location: "Remote",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "MijnBadkamerSpiegel",
    companyUrl: "https://www.mijnbadkamerspiegel.nl",
    period: "May 2019 — Jan 2025",
    duration: "5 yrs 9 mos",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/mijnbadkamerspiegel_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Fingerspitz",
    companyUrl: "https://fingerspitz.nl",
    period: "May 2024 — Nov 2024",
    duration: "7 mos",
    kind: "Freelance",
    location: "Breda, North Brabant, Netherlands",
    logo: "/images/cv/fingerspitz_logo.jpeg",
    description:
      "Voor mooie klanten mogen werken. Terugblikkend, wat heb ik eigenlijk gedaan: Strategische rol in online marketing, MCC Master sheet en Automation in Google Ads. Met diverse freelancers en collega's (development, design en online) samengewerkt.",
  },
  {
    title: "Digital Marketing strateeg",
    company: "Partout digital native agency",
    companyUrl: "https://www.partout.nl",
    period: "Jul 2022 — Jun 2024",
    duration: "2 yrs",
    kind: "Full-time",
    location: "Eindhoven, North Brabant, Netherlands",
    logo: "/images/cv/partout_digital_logo.jpeg",
    description:
      "Voor klanten was ik primair verantwoordelijk voor het ontwikkelen en implementeren van strategieën voor onze belangrijkste klanten. Het hoofddoel was om klantresultaten te behalen en te verbeteren. Ik maakte deel uit van het strategieteam en werkte nauw samen met account directors, heads en andere strategen om de grootste bedrijfsuitdagingen te identificeren en groeikansen te benutten. Ik ontwikkelde strategische jaar- en kwartaalplannen en stuurde bij waar nodig, met focus op prioriteiten en benodigde acties. Daarnaast stelde ik backlogs en strategische roadmaps op en optimaliseerde deze. Ook voerde ik inhoudelijke analyses uit en stelde gedetailleerde (groei)plannen op.",
    skills: "Automatisering, Paid search-strategie +2",
  },
  {
    title: "Ecommerce Business Owner",
    company: "VerrekijkerGigant",
    companyUrl: "https://verrekijkergigant.nl",
    period: "2017 — 2024",
    duration: "7 yrs",
    kind: "Self-employed",
    logo: "/images/cv/verrekijkergigant_logo.jpeg",
    description:
      "Webshopeigenaar VerrekijkerGigant. De #5 grootste webshop in het assortiment: verrekijkers, spotting scopes, nachtkijkers, richtkijkers, telescopen en microscopen. VerrekijkerGigant is de specialist met een uitgebreid assortiment, met topmerken zoals Bresser, Byomic, Kowa en Vortex.",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "TruQu",
    companyUrl: "https://truqu.com",
    period: "Jan 2021 — 2023",
    duration: "2 yrs 1 mo",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/truqu_logo.jpeg",
  },
  {
    title: "Team Lead Performance Marketing",
    company: "Max ICT BV",
    companyUrl: "https://maxict.nl",
    period: "Jan 2020 — Jul 2022",
    duration: "2 yrs 7 mos",
    kind: "Full-time",
    logo: "/images/cv/max_ict_logo.jpeg",
    description:
      "Verantwoordelijk voor de betaalde kanalen. Wekelijks rapporteren naar het management. Google Ads monitoring en bijhouden van grote budgetten. Aansturen op POAS, in-site search optimalisaties. Waarborgen van positieve marges op kanaalniveau, dashboarding, prijsvergelijkers, feed-management, automatiseren content syndication, Programmatic SEO, Dynamic Pricing & Profitmetrics.",
    skills: "Automatisering, Paid search-strategie +2",
  },
  {
    title: "SEA Specialist",
    company: "Melano",
    companyUrl: "https://melano-jewelry.com",
    period: "2018 — 2022",
    duration: "4 yrs",
    kind: "Freelance",
    logo: "/images/cv/melano_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Decupré BV",
    companyUrl: "https://decupre.com",
    period: "2017 — 2022",
    duration: "5 yrs",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/decupr_bv_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "De Sfeerhaard B.V.",
    companyUrl: "https://www.desfeerhaard.nl",
    period: "Apr 2018 — Jun 2021",
    duration: "3 yrs 3 mos",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/sfeerhaard_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Kas20",
    companyUrl: "https://kas20.nl",
    period: "2018 — 2021",
    duration: "3 yrs",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/kas20_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Urban Bozz",
    companyUrl: "https://www.urbanbozz.com",
    period: "Mar 2017 — Jun 2020",
    duration: "3 yrs 4 mos",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/urban_bozz_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Easyplants",
    companyUrl: "https://easyplants-kunstplanten.nl",
    period: "2017 — 2020",
    duration: "3 yrs",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/easyplants_logo.jpeg",
  },
  {
    title: "SEA Specialist & automation a.i.",
    company: "Plent",
    companyUrl: "https://www.plent.nl",
    period: "2016 — 2020",
    duration: "4 yrs",
    kind: "Freelance",
    location: "Remote",
    logo: "/images/cv/plent_logo.jpeg",
  },
  {
    title: "Sr. SEA consultant | CRO Consultant",
    company: "Searchresult",
    companyUrl: "https://searchresult.nl",
    period: "Feb 2017 — Dec 2019",
    duration: "2 yrs 11 mos",
    location: "Den Bosch",
    logo: "/images/cv/searchresult_logo.jpeg",
    description:
      "Inrichten, beheren en optimaliseren van PPC campagnes, het interpreteren van Google Ads (& SA360) en Analytics data om SEA/SEO campagnes te verbeteren, het monitoren van budgetten en bewaken van ROI-doelstellingen en deze rapporteren aan de klant, adviseren over on-site optimalisatie op het gebied van usability en conversie, uitvoeren van A/B-testen. Nauw samengewerkt met klanten zoals: Nuon, Essent, Energiedirect, Brabantia, IKEA, Ziggo, NLZIET, Verfonline-XL, Loyalis, Carpetright en Deloitte.",
    skills: "Online marketing",
  },
  {
    title: "Digital Marketing Consultant: SEA | SEO | Analytics",
    company: "Shadow Internet Solutions",
    companyUrl: "https://www.shadowis.nl",
    period: "Feb 2015 — Nov 2016",
    duration: "1 yr 10 mos",
    location: "Breda, North Brabant, Netherlands",
    logo: "/images/cv/shadow_logo.jpeg",
    description:
      "Shadow is een full-web service bureau in online marketing. Wij doen er alles aan om onze klanten te adviseren in zoekmachine optimalisatie (SEO), online adverteren en campagnes beheren in AdWords (SEA), conversie optimalisatie (CRO), social media marketing & affiliate marketing.",
    skills: "Online marketing",
  },
  {
    title: "SEA & CRO Specialist",
    company: "Overstappen.nl",
    companyUrl: "https://www.overstappen.nl",
    period: "Feb 2013 — Sep 2015",
    duration: "2 yrs 8 mos",
    location: "The Randstad, Netherlands",
    logo: "/images/cv/overstappen_nl_logo.jpeg",
    skills: "Online marketing",
  },
];

export const CV_EDUCATION: CVEducation[] = [
  {
    school: "Tilburg University",
    schoolUrl: "https://www.tilburguniversity.edu",
    degree: "Master's Degree, Marketing / Marketing Management, General",
    period: "2016 — 2017",
    thesis: "Thesis: Omega en alfa overtuigingstechnieken in het Google Zoeknetwerk",
    logo: "/images/cv/tilburg_university_logo.jpeg",
  },
  {
    school: "Inholland University of Applied Sciences",
    schoolUrl: "https://www.inholland.nl",
    degree: "Bachelor's Degree, Business, Management, Marketing, and Related Support Services",
    period: "2010 — 2014",
    thesis: "Scriptie: Verbeteren van de energie sales funnel van Overstappen.nl (Conversie optimalisatie project).",
    logo: "/images/cv/hogeschool_inholland_logo.jpeg",
  },
  {
    school: "Etty Hillesum College Den Helder",
    degree: "Havo, profile: economy and society",
    period: "2005 — 2010",
  },
];
