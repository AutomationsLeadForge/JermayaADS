"use client";

import { useState } from "react";
import { WindowManagerProvider, type InitialWindow } from "@/components/xp/WindowManager";
import { Window } from "@/components/xp/Window";
import { Taskbar } from "@/components/xp/Taskbar";
import { StartMenu } from "@/components/xp/StartMenu";
import { DesktopIcon } from "@/components/xp/DesktopIcon";
import { TipBubble } from "@/components/xp/TipBubble";
import { VideoBackground } from "@/components/xp/VideoBackground";
import { WindowMenuBar } from "@/components/xp/WindowMenuBar";
import {
  AboutIcon,
  CalendarIcon,
  CaseStudiesIcon,
  CoffeeIcon,
  ComputerIcon,
  ContactIcon,
  DocumentIcon,
  FolderIcon,
  GitHubIcon,
  GoogleAdsIcon,
  LinkedInIcon,
  PaintIcon,
  PythonIcon,
  RecycleIcon,
  WorkIcon,
} from "@/components/xp/PixelIcons";
import { WelcomeContent } from "@/components/xp/content/WelcomeContent";
import { AboutContent } from "@/components/xp/content/AboutContent";
import { ComputerContent } from "@/components/xp/content/ComputerContent";
import { WorkContent } from "@/components/xp/content/WorkContent";
import { ContactContent } from "@/components/xp/content/ContactContent";
import { CalendlyContent } from "@/components/xp/content/CalendlyContent";
import { CaseStudiesContent } from "@/components/xp/content/CaseStudiesContent";
import { CASE_STUDIES } from "@/lib/case-studies";

const WINDOW_ICON_MAP = {
  welcome: DocumentIcon,
  about: PaintIcon,
  computer: ComputerIcon,
  work: FolderIcon,
  contact: ContactIcon,
  calendly: CalendarIcon,
  cases: CaseStudiesIcon,
};

/**
 * Clean boot: only Welcome + About open by default.
 * Everything else is closed-but-accessible via Start, taskbar, or desktop icons.
 * This keeps cognitive load low — visitors see a greeting + portrait,
 * and they drive what to open next.
 */
const INITIAL: InitialWindow[] = [
  { id: "about",    title: "about_jermaya.bmp — Paint",     x: 210, y: 60,  w: 560, h: 500, minimized: false, open: true },
  { id: "welcome",  title: "Welcome.txt — Notepad",         x: 810, y: 60,  w: 460, h: 320, minimized: false, open: true },
  { id: "contact",  title: "Contact.eml — Outlook Express", x: 870, y: 30,  w: 600, h: 450, minimized: true,  open: true },
  { id: "work",     title: "Selected Work — Explorer",      x: 180, y: 160, w: 900, h: 560, minimized: true,  open: true },
  { id: "computer", title: "My Computer — Services",        x: 260, y: 130, w: 1240, h: 600, minimized: true,  open: true },
  { id: "calendly", title: "Book a call — Calendly.exe",    x: 280, y: 90,  w: 720, h: 800, minimized: true,  open: true },
  { id: "cases",    title: "Case Studies — Reporter",       x: 300, y: 110, w: 820, h: 600, minimized: true,  open: true },
];

function WindowSurface() {
  return (
    <>
      <Window
        id="welcome"
        icon={DocumentIcon}
        menubar={
          <WindowMenuBar
            windowId="welcome"
            about={{
              appName: "Notepad",
              version: "5.1",
              description:
                "Plain-text read-me for JermayaOS. Opens the hard drive index.",
            }}
          />
        }
      >
        <WelcomeContent />
      </Window>
      <Window
        id="about"
        icon={PaintIcon}
        menubar={
          <WindowMenuBar
            windowId="about"
            about={{
              appName: "Paint — about_jermaya.bmp",
              version: "5.1",
              description:
                "Freelance SEA specialist, AI engineer and developer. Based in Tilburg.",
            }}
          />
        }
      >
        <AboutContent />
      </Window>
      <Window
        id="computer"
        icon={ComputerIcon}
        menubar={
          <WindowMenuBar
            windowId="computer"
            about={{
              appName: "My Computer",
              version: "5.1",
              description:
                "Services index. Each folder is a thing I sell (or in the case of Products, run myself).",
            }}
          />
        }
        status="5 service folder(s)"
      >
        <ComputerContent />
      </Window>
      <Window
        id="work"
        icon={FolderIcon}
        menubar={
          <WindowMenuBar
            windowId="work"
            about={{
              appName: "Selected Work — Explorer",
              version: "5.1",
              description:
                "Rolling list of projects, scripts and products. Click any row to see the details.",
            }}
          />
        }
        status="12 project(s)"
      >
        <WorkContent />
      </Window>
      <Window
        id="contact"
        icon={ContactIcon}
        menubar={
          <WindowMenuBar
            windowId="contact"
            about={{
              appName: "Outlook Express — Contact.eml",
              version: "5.1",
              description:
                "Inbox is open. Calendly is fastest. LinkedIn and WhatsApp also work.",
            }}
          />
        }
      >
        <ContactContent />
      </Window>
      <Window
        id="cases"
        icon={CaseStudiesIcon}
        menubar={
          <WindowMenuBar
            windowId="cases"
            about={{
              appName: "Reporter — Case Studies",
              version: "5.1",
              description:
                "Anonymised campaign write-ups: challenge, approach and real metrics. Numbers animate as they scroll into view.",
            }}
          />
        }
        status={`${CASE_STUDIES.length} case file(s)`}
      >
        <CaseStudiesContent />
      </Window>
      <Window
        id="calendly"
        icon={CalendarIcon}
        menubar={
          <WindowMenuBar
            windowId="calendly"
            about={{
              appName: "Calendly",
              version: "embed",
              description:
                "Live booking calendar loaded from calendly.com. Pick a slot without leaving the site.",
            }}
          />
        }
        status="calendly.com · secure · live"
      >
        <CalendlyContent />
      </Window>
    </>
  );
}

export function Desktop() {
  const [startOpen, setStartOpen] = useState(false);

  return (
    <WindowManagerProvider initial={INITIAL}>
      <div
        className="xp-root"
        style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
      >
        <VideoBackground />

        {/* Icon wrapper — a logical parent that lets CSS reflow both columns
            into a single responsive grid at mobile breakpoints. */}
        <div className="xp-icon-wrap">

        {/* Desktop icon column 1 — system (left side) */}
        <div
          className="xp-icon-col xp-icon-col--left"
          style={{
            position: "absolute",
            top: 20,
            left: 18,
            display: "grid",
            gridAutoRows: "min-content",
            gap: 6,
            zIndex: 2,
          }}
        >
          <DesktopIcon windowId="computer" label="My Computer" icon={ComputerIcon} />
          <DesktopIcon windowId="work" label="Projects" icon={WorkIcon} />
          <DesktopIcon windowId="cases" label="Case Studies" icon={CaseStudiesIcon} />
          <DesktopIcon windowId="about" label="About Me" icon={AboutIcon} />
          <DesktopIcon windowId="contact" label="Contact" icon={ContactIcon} />
          <DesktopIcon windowId="welcome" label="Readme" icon={DocumentIcon} />
          <div style={{ pointerEvents: "none", opacity: 0.85 }}>
            <div className="xp-desktop-icon">
              <RecycleIcon className="xp-icon-pixel" size={64} />
              <span>Recycle Bin</span>
            </div>
          </div>
        </div>

        {/* Desktop icon column 2 — tools & shortcuts (right side) */}
        <div
          className="xp-icon-col xp-icon-col--right"
          style={{
            position: "absolute",
            top: 20,
            right: 18,
            display: "grid",
            gridAutoRows: "min-content",
            gap: 6,
            zIndex: 2,
          }}
        >
          <a
            className="xp-desktop-icon"
            href="https://github.com/JermayaL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            title="Open GitHub (external)"
          >
            <GitHubIcon className="xp-icon-pixel" size={64} />
            <span>GitHub</span>
          </a>
          <a
            className="xp-desktop-icon"
            href="https://www.linkedin.com/in/jermayaleijen/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
            title="Open LinkedIn (external)"
          >
            <LinkedInIcon className="xp-icon-pixel" size={64} />
            <span>LinkedIn</span>
          </a>
          <a
            className="xp-desktop-icon"
            href="https://applepy.online"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open ApplePY"
            title="ApplePY — my SEO automation tool"
          >
            <PythonIcon className="xp-icon-pixel" size={64} />
            <span>ApplePY</span>
          </a>
          <a
            className="xp-desktop-icon"
            href="https://ads.google.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Ads"
            title="Open Google Ads (external)"
          >
            <GoogleAdsIcon className="xp-icon-pixel" size={64} />
            <span>Google Ads</span>
          </a>
          {/* Coffee icon now OPENS Calendly window inside the desktop */}
          <div style={{ position: "relative" }}>
            <DesktopIcon
              windowId="calendly"
              label="Connect ☕"
              icon={CoffeeIcon}
            />
          </div>
        </div>

        </div>
        {/* /xp-icon-wrap */}

        <WindowSurface />

        <StartMenu
          open={startOpen}
          onClose={() => setStartOpen(false)}
          iconFor={WINDOW_ICON_MAP}
        />
        <Taskbar
          onStartClick={() => setStartOpen((v) => !v)}
          startOpen={startOpen}
          iconFor={WINDOW_ICON_MAP}
        />
        <TipBubble />
      </div>
    </WindowManagerProvider>
  );
}
