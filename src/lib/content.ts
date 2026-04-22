import type {
  AreaSwitch,
  ContactTile,
  ExperienceItem,
  HustleLink,
  ListLink,
  NavLink,
  PdfSlide,
  PortfolioSlide,
  RoadmapStep,
  ServiceLogo,
  WaaromBullet,
} from "@/types/content";

export const ROLE_TITLES = [
  "SR. SEA SPECIALIST",
  "Programmatic SEO",
  "E-commerce",
  "Performance marketing",
];

export const AREA_SWITCHES: AreaSwitch[] = [
  {
    id: "sea",
    label: "SR. SEA SPECIALIST",
    popupTitle: "SR. SEA SPECIALIST",
    popupText:
      "Het inrichten, beheren en optimaliseren van Google Ads campagnes, het interpreteren van Google Ads (& SA360) en Analytics data om SEA-campagnes te verbeteren. Monitoren van budgetten en het bewaken van doelstellingen en deze rapporteren aan de klant. Adviseren over on-site optimalisaties op het gebied van usability en conversie-optimalisatie, uitvoeren van A/B-testen (landingspagina, biedstrategieën, et cetera). Analyse zoekgedrag, doelgroepen en rapportages. Het bouwen van (custom) scripts om accounts te automatiseren. Met klanten sparren over doelen met betrekking tot omzet, conversies, nieuwe vs. bestaande klanten, ROAS/POAS en CPA-targets. Volledig en geavanceerde tracking om de doelstellingen te bereiken en het Google algoritme op de juiste manier te voeden.",
  },
  {
    id: "seo",
    label: "(PROGRAMMATIC) SEO",
    popupTitle: "(PROGRAMMATIC) SEO",
    popupText:
      "Technisch (programmatic) SEO specialist met diepgaande kennis in geautomatiseerde processen. Ervaring in het implementeren van geavanceerde tools, API-integraties en scripts om de organische zichtbaarheid en prestaties van websites te verbeteren. Sterke analytische en probleemoplossende vaardigheden, met de mogelijkheid om complexe technische SEO-uitdagingen aan te pakken. Daaruit heb ik ook ApplePY ontwikkeld. Maar ook met Programmatic SEO. Gebruik van diverse tooling als het ontwikkelen van een strategie om op te schalen. Volledig geautomatiseerd (met behulp van AI), maar altijd met de gedachte van de bezoekers voorop. Waarbij in-site search optimalisaties zijn ingezet (met behulp van toolings als Loop54), ElasticSearch, Icecat, inspoelen van verschillende distri's, het automatiseren van SEO categoriepagina's (met behulp van reverse proxies en het koppelen van de Semrush API. Maar ook in Google sheets, databasekoppelingen (met verschillende productfeeds) en tooling als Whalesync en Google Search Console API.",
  },
  {
    id: "consultant",
    label: "DIGITAL MARKETING CONSULTANT",
    popupTitle: "DIGITAL MARKETING CONSULTANT",
    popupText:
      "Als Digital Marketing Consultant ligt mijn achtergrond bij verschillende gerenommeerde bureas en e-commerce partijen. Ik help bedrijven met vraagstukken binnen Google Ads. Maar ook als sparringspartner of poortwachter van de doelstellingen kan ik kanaalbreed meekijken. Mijn expertise ligt bij: Google Ads, SEO, Automation, data en tracking en strategie.",
  },
];

export const CONTACT_TILES: ContactTile[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/+31623963836",
    image: "/images/contact/whatsapp.svg",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jermayaleijen/",
    image: "/images/contact/linkedin.svg",
    external: true,
  },
];

export const PORTFOLIO_SLIDES: PortfolioSlide[] = [
  { src: "/images/portfolio/3.png", alt: "Portfolio slide 3" },
  { src: "/images/portfolio/1.png", alt: "Portfolio slide 1" },
  { src: "/images/portfolio/2.png", alt: "Portfolio slide 2" },
  { src: "/images/portfolio/4.png", alt: "Portfolio slide 4" },
  { src: "/images/portfolio/5.png", alt: "Portfolio slide 5" },
  { src: "/images/portfolio/6.png", alt: "Portfolio slide 6" },
  { src: "/images/portfolio/7.png", alt: "Portfolio slide 7" },
  { src: "/images/portfolio/8.png", alt: "Portfolio slide 8" },
  { src: "/images/portfolio/9.png", alt: "Portfolio slide 9" },
  { src: "/images/portfolio/10.png", alt: "Portfolio slide 10" },
  { src: "/images/portfolio/11.png", alt: "Portfolio slide 11" },
  { src: "/images/portfolio/12.png", alt: "Portfolio slide 12" },
  { src: "/images/portfolio/13.png", alt: "Portfolio slide 13" },
  { src: "/images/portfolio/14.png", alt: "Portfolio slide 14" },
];

export const SERVICE_LOGOS: ServiceLogo[] = [
  { src: "/images/services/adchieve.svg", alt: "Adchieve" },
  { src: "/images/services/ahrefs.svg", alt: "Ahrefs" },
  { src: "/images/services/adcalls.svg", alt: "Adcalls" },
  { src: "/images/services/bing.svg", alt: "Bing" },
  { src: "/images/services/channable.svg", alt: "Channable" },
  { src: "/images/services/g-ads.svg", alt: "Google Ads" },
  { src: "/images/services/g-console-cloud.svg", alt: "Google Console Cloud" },
  { src: "/images/services/g-analytics.svg", alt: "Google Analytics" },
  { src: "/images/services/g-search-console.svg", alt: "Google Search Console" },
  { src: "/images/services/g-tag-manager.svg", alt: "Google Tag Manager" },
  { src: "/images/services/hotjar.svg", alt: "Hotjar" },
  { src: "/images/services/looker-studio.svg", alt: "Looker Studio" },
  { src: "/images/services/matomo.svg", alt: "Matomo" },
  { src: "/images/services/northbeam.svg", alt: "Northbeam" },
  { src: "/images/services/producthero.svg", alt: "Producthero" },
  { src: "/images/services/productsup.svg", alt: "Productsup" },
  { src: "/images/services/profitmetrics.svg", alt: "Profitmetrics" },
  { src: "/images/services/python.svg", alt: "Python" },
  { src: "/images/services/search-ads-360.svg", alt: "Search Ads 360" },
  { src: "/images/services/semrush.svg", alt: "SEMrush" },
  { src: "/images/services/trueclicks.svg", alt: "TrueClicks" },
  { src: "/images/services/verbolia.svg", alt: "Verbolia" },
  { src: "/images/services/zapier.svg", alt: "Zapier" },
];

export const HUSTLE_LINKS: Record<"top" | "bottomLeft" | "bottomRight", HustleLink> = {
  top: {
    id: "orangepy",
    href: "https://orangepy.online/search-console",
    image: "/images/hustles/bird.svg",
    alt: "OrangePY",
    external: true,
  },
  bottomLeft: {
    id: "applepy",
    href: "https://applepy.online/",
    image: "/images/hustles/planet.svg",
    alt: "ApplePY",
    external: true,
  },
  bottomRight: {
    id: "tooling",
    href: "https://jermayads.nl/tooling",
    image: "/images/hustles/tool.svg",
    alt: "Tooling",
    external: false,
  },
};

export const SCRIPT_LINKS: ListLink[] = [
  {
    label: "Meta Marketing API script",
    href: "https://github.com/JermayaL/Meta-Marketing-API",
    external: true,
  },
  {
    label: "Performance Max script",
    href: "https://github.com/JermayaL/Performance-Max-Script",
    external: true,
  },
  {
    label: "Google Shopping ID script",
    href: "https://github.com/JermayaL/Google-Shopping-Item-ID",
    external: true,
  },
  {
    label: "Bekijk hier al mijn scripts",
    href: "https://github.com/JermayaL",
    external: true,
    focus: true,
    withGithub: true,
  },
];

export const BLOG_LINKS: ListLink[] = [
  {
    label: "RAG LLM: Content automatiseren",
    href: "https://jermayads.nl/blog/rag-llm-content-automatiseren-met-behulp-van-rag-zonder-hallucinaties-van-een-llm",
    external: true,
  },
  {
    label: "Micro-conversies voor datagedreven beslissingen",
    href: "https://jermayads.nl/blog/gebruik-micro-conversies-voor-datagedreven-beslissingen",
    external: true,
  },
  {
    label: "Interne linkstructuur met Python",
    href: "https://jermayads.nl/blog/interne-linkstructuur-automatiseren-met-python",
    external: true,
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "https://jermayads.nl", active: true, icon: "home" },
  { label: "Cases", href: "https://jermayads.nl/cases" },
  { label: "Blogs", href: "https://jermayads.nl/blog" },
  { label: "Audit", href: "https://jermayads.nl/audit" },
  { label: "Tooling", href: "https://jermayads.nl/tooling" },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: "Digital Marketing strateeg",
    company: "Partout Open Digital Agency",
    period: "Jul 2022 - Dec 2023",
    logo: "/images/experience/Partout-Open-Digital-Agency.png",
  },
  {
    role: "Head Of Search | SEA | Marketplaces",
    company: "Max ICT BV",
    period: "Jan 2020 - Jul 2022",
    logo: "/images/experience/Max-ICT-BV.png",
  },
  {
    role: "Freelance Digital Marketing Consultant",
    company: "JermayADS",
    period: "Apr 2016 - Heden",
    logo: "/images/experience/JermayADS.png",
  },
  {
    role: "Sr. SEA consultant | CRO Consultant",
    company: "Searchresult",
    period: "Feb 2017 - Dec 2019",
    logo: "/images/experience/Searchresult.png",
  },
  {
    role: "Digital Marketing Consultant: SEA | SEO",
    company: "Shadow B.V.",
    period: "Feb 2015 - Nov 2016",
    logo: "/images/experience/Shadow-B.V.png",
  },
  {
    role: "SEA & CRO Specialist",
    company: "Overstappen.nl",
    period: "Feb 2013 - Sep 2015",
    logo: "/images/experience/overstappen.png",
  },
];

export const EXPERIENCE_ABOUT = {
  label: "ERVARING",
  title: "Gedreven online marketeer met een passie voor Automation",
  paragraphs: [
    "Ik ben iemand die zich graag aan iets vastbijt zonder de kwaliteit uit het oog te verliezen. Om nieuwe taken op te pakken, maar niet gelijk te beginnen, maar eerst te kijken hoe ik dit doelgericht, systematisch, efficiënt en effectief op kan pakken. Onder druk kan ik goede beslissingen nemen.",
    "Taken worden ingedeeld op prioriteit en structuur. Zelf ben ik ondernemend en kijk ik altijd naar mogelijkheden om op te schalen. Om projecten en campagnes te verbeteren. Ik ben logisch, analytisch en heb een goed gevoel voor timing.",
  ],
};

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    label: "WIE BEN IK",
    paragraphs: [
      "Aangenaam. Ik ben Jermaya Leijen. Een freelance Google Ads specialist en met ruim 10 jaar in het vak al een tijdje bezig in de online marketing. Ik woon met mijn gezin in Heesch. Mijn achtergrond ligt bij verschillende gerenommeerde online marketing bureaus en e-commerce partijen in de elektronica. Maar tijdens mijn freelance carrière heb ik ook veel andere e-commerce partijen geholpen.",
      "Ik ben niet alleen een Google Ads specialist, maar voor sommige klanten ook het aanspreekpunt tussen klant en bureau. Een sparringpartner en een kritische kijk op de uitvoer van online marketing. Als het ware de poortwachter van de doelstellingen en veel meedenken over strategie.",
    ],
  },
  {
    label: "EIGEN PROJECTEN",
    paragraphs: [
      "Buiten freelance besteed ik ook tijd aan mijn eigen projecten. Voor mijn 3 affiliate websites heb ik organisch meer dan 350K bezoekers per maand en gebruik ik de nieuwste technieken en trends binnen online marketing. In deze tijd ook veel met AI en Automation. In custom Laravel en ander CMS. Of het nou iets custom is of een CMS, zoals bijvoorbeeld Shopify, binnen ieder CMS kijk ik naar de beste oplossingen als het gaat om Automation (SEO, data/CRO, SEA, content verrijking).",
      "Ik doe ook veel met Python en API's. Ik heb daarom ook ApplePY en OrangePY ontwikkeld. Met beide tools kun je een hoop automatiseren, krachtiger data verzamelen en betere online resultaten boeken met SEO en SEA.",
    ],
  },
  {
    label: "HOE IK WERK",
    paragraphs: [
      "Ik houd van korte lijnen, snel schakelen en realistische doelstellingen. Ik zal je eerlijk vertellen als een gewenste CPA- of ROAS-target onrealistisch is. De targets zijn te allen tijden de leidraad van een gesprek. Daarvoor dient de conversiemeting altijd correct te zijn ingesteld. En met correct instellen bedoel ik de volledige tracking set-up (extra events, dataLayer, custom variabelen, en het liefst ook nog brutowinst data, complete attributie met tooling als Northbeam, offline conversion tracking, et cetera. Maar deze geavanceerde manieren zijn in het begin niet altijd direct nodig).",
    ],
  },
  {
    label: "AFSPRAKEN",
    paragraphs: [
      "Bij mij heb je geen jaarcontracten. Maandelijks opzegbaar. Werkzaamheden op afstand of op kantoor (ligt wel aan de reisafstand). Om je van goed advies te kunnen voorzien werp ik, na het luisteren naar de hulpvraag, altijd vrijblijvend een blik in het account.",
      "Klanten waarmee ik (heb) samengewerkt, vinden het ook fijn als ik op den duur dieper de mogelijkheden in duik voor (organische) groei. In verkeer, maar ook on-page. Kwalitatief verkeer is een ding, maar een sparringpartner om de conversiepercentage te verhogen is ook belangrijk. Of als een X-set aan producten niet converteren, hoe gaan we daarmee om? Hoe kunnen we ervoor zorgen dat deze producten wél gekocht worden of, als het gaat om diensten, deze worden afgenomen.",
    ],
  },
  {
    label: "DOOR BLIJVEN GROEIEN",
    paragraphs: [
      "Stilstaan is niet meebewegen. De ontwikkelingen binnen online marketing gaan razendsnel. Daarbij hanteer ik een 80/20 regel. De 20% ben ik bezig met research, hoe kunnen we door groeien. Welke mogelijkheden zijn er? Wat speelt er nu, en hoe moeten we daarop reageren? Ik pak dan altijd een momentje, vaak na het bespreken van de data, om kort even te presenteren welke mogelijkheden er zijn. Of we dit direct kunnen oppakken of dat we dit op de roadmap zetten. Indien mogelijk, ligt een beetje aan mijn functie, werk ik graag in sprints.",
      "Neem contact op om snel te weten of ik je kan helpen met de hulpvraag die er bij jou of jullie organisatie speelt. Dan heb je ook het snelste een beeld of ik degene bent die je moet hebben.",
    ],
  },
];

export const WAAROM_BULLETS: WaaromBullet[] = [
  { label: "Award winning" },
  { label: "Meer dan 10 jaar ervaring" },
  { label: "Ondernemend en pro-actief" },
  { label: "Betrouwbaar & betaalbaar" },
  { label: "Groot netwerk aan (senior) specialisten" },
  { label: "Groot netwerk aan (senior) (betaalbare) designers en developers" },
];

export const WAAROM_COPY = {
  contentTitle: "WAAROM VOOR MIJ",
  title: "Waarom kiezen bedrijven voor mij?",
  noteTitle: "Met een stevige portie enthousiasme",
  noteParagraphs: [
    "Ik zet mijn ervaring in om bedrijven te laten groeien met online marketing. Dit doe ik niet alleen als specialist, maar vooral als business partner. Mijn strategie en werkwijze gaat namelijk verder dan puur advertentiecampagnes.",
    "Groeien door effectief samen te werken, daar sta ik voor. Dit doe ik door goed te begrijpen hoe mijn klanten geld verdienen. Ik staar me niet blind op advertentiedashboards. Mijn focus ligt op het bepalen van groeikansen en het zo slim mogelijk inzetten van jouw marketing-euro.",
  ],
};

export const PDF_SLIDES: PdfSlide[] = [
  {
    image: "/images/pdf/performance-max-updates-2023.png",
    file: "https://jermayads.nl/pdf/performance-max-updates-2023",
    title: "Performance Max updates 2023",
  },
  {
    image: "/images/pdf/marges-per-product.png",
    file: "https://jermayads.nl/pdf/gross-profit-gross-margin.pdf",
    title: "Gross profit & margin",
  },
  {
    image: "/images/pdf/dynamische-data-opslaan.png",
    file: "https://jermayads.nl/pdf/dynamische-data-opslaan-in-een-google-spreadsheet-met-de-image-tag.pdf",
    title: "Dynamische data opslaan",
  },
  {
    image: "/images/pdf/dynamic-pricing-instellen.png",
    file: "https://jermayads.nl/pdf/dynamic-pricing-instellen.pdf",
    title: "Dynamic pricing instellen",
  },
];

export const AREA_BLOCK_LABEL = "Embrace Automation and Data-Driven Decisions";

export const HERO_BUTTONS = [
  { id: "ervaring", label: "ERVARING" },
  { id: "roadmap", label: "ROADMAP" },
  { id: "waarom", label: "WAAROM VOOR MIJ" },
] as const;

export type HeroButtonId = (typeof HERO_BUTTONS)[number]["id"];

export const FOOTER_COPY = "JERMAYA LEIJEN © 2026 - All rights reserved";
