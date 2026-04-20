"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
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
  AdminIcon,
  CalendarIcon,
  CaseStudiesIcon,
  CoffeeIcon,
  ComputerIcon,
  ContactIcon,
  DocumentIcon,
  FolderIcon,
  GameIcon,
  GitHubIcon,
  KeyIcon,
  LinkedInIcon,
  NotepadIcon,
  PaintIcon,
  RecycleIcon,
  StatsIcon,
  WorkIcon,
} from "@/components/xp/PixelIcons";
import { WelcomeContent } from "@/components/xp/content/WelcomeContent";
import { AboutContent } from "@/components/xp/content/AboutContent";
import { ComputerContent } from "@/components/xp/content/ComputerContent";
import { WorkContent } from "@/components/xp/content/WorkContent";
import { ContactContent } from "@/components/xp/content/ContactContent";
import { CalendlyContent } from "@/components/xp/content/CalendlyContent";
import { CaseStudiesContent } from "@/components/xp/content/CaseStudiesContent";
import { GameContent } from "@/components/xp/content/GameContent";
import { StatsContent } from "@/components/xp/content/StatsContent";
// BlogContent carries ~250 KB of per-post HTML; lazy-load it so the desktop
// boots fast and the blog chunk only downloads when its window opens.
const BlogContent = dynamic(
  () =>
    import("@/components/xp/content/BlogContent").then((m) => ({
      default: m.BlogContent,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          padding: 24,
          fontFamily: "var(--font-pixel), 'Pixelify Sans', Tahoma, sans-serif",
          fontSize: 14,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#3c3c3c",
          textAlign: "center",
        }}
      >
        Loading blog feed<span className="xp-term-blink">_</span>
      </div>
    ),
  },
);
import { AdminLoginContent } from "@/components/xp/content/AdminLoginContent";
import { AdminPanelContent } from "@/components/xp/content/AdminPanelContent";
import { CASE_STUDIES } from "@/lib/case-studies";
import { QUIZ_QUESTIONS } from "@/lib/quiz";
import { STATS } from "@/lib/stats";
import { BLOG_POSTS } from "@/lib/blog";

const WINDOW_ICON_MAP = {
  welcome: DocumentIcon,
  about: PaintIcon,
  computer: ComputerIcon,
  work: FolderIcon,
  contact: ContactIcon,
  calendly: CalendarIcon,
  cases: CaseStudiesIcon,
  game: GameIcon,
  stats: StatsIcon,
  blog: NotepadIcon,
  admin: AdminIcon,
  "admin-login": KeyIcon,
};

/**
 * Clean boot: only Welcome + About open by default.
 * Everything else is closed-but-accessible via Start, taskbar, or desktop icons.
 * This keeps cognitive load low — visitors see a greeting + portrait,
 * and they drive what to open next.
 */
const INITIAL: InitialWindow[] = [
  { id: "about",    title: "about_jermaya.bmp — Paint",     x: 210, y: 60,  w: 560, h: 590, minimized: false, open: true },
  { id: "welcome",  title: "Welcome.txt — Notepad",         x: 810, y: 60,  w: 460, h: 400, minimized: false, open: true },
  { id: "contact",  title: "Contact.eml — Outlook Express", x: 870, y: 30,  w: 600, h: 450, minimized: true,  open: true },
  { id: "work",     title: "Selected Work — Explorer",      x: 180, y: 160, w: 900, h: 560, minimized: true,  open: true },
  { id: "computer", title: "My Computer — Services",        x: 260, y: 130, w: 1240, h: 600, minimized: true,  open: true },
  { id: "calendly", title: "Book a call — Calendly.exe",    x: 280, y: 90,  w: 720, h: 800, minimized: true,  open: true },
  { id: "cases",    title: "Case Studies — Reporter",       x: 300, y: 110, w: 820, h: 600, minimized: true,  open: true },
  { id: "game",     title: "Wat zou jij bieden? — Arcade",   x: 320, y: 90,  w: 720, h: 680, minimized: true,  open: true },
  { id: "stats",    title: "Stats.dashboard — Live counters", x: 340, y: 120, w: 1240, h: 580, minimized: true,  open: true },
  { id: "blog",     title: "Blog Feed — Notepad.exe",         x: 360, y: 80,  w: 900, h: 800, minimized: true,  open: true },
  { id: "admin-login", title: "Administrator — Log On",       x: 420, y: 140, w: 420, h: 320, minimized: false, open: false },
  { id: "admin",    title: "Admin Panel — Blog manager",      x: 160, y: 60,  w: 1080, h: 680, minimized: false, open: false },
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
        status="10 project(s)"
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
        id="game"
        icon={GameIcon}
        menubar={
          <WindowMenuBar
            windowId="game"
            about={{
              appName: "Arcade — Wat zou jij bieden?",
              version: "5.1",
              description:
                "A 5-question Google Ads quiz. Real-account scenarios — pick the move you'd make.",
            }}
          />
        }
        status={`${QUIZ_QUESTIONS.length} scenario(s) loaded`}
      >
        <GameContent />
      </Window>
      <Window
        id="stats"
        icon={StatsIcon}
        menubar={
          <WindowMenuBar
            windowId="stats"
            about={{
              appName: "Stats — live dashboard",
              version: "5.1",
              description:
                "Animated pixel counters. Numbers count up from 0 when visible.",
            }}
          />
        }
        status={`${STATS.length} counter(s) live`}
      >
        <StatsContent />
      </Window>
      <Window
        id="blog"
        icon={NotepadIcon}
        menubar={
          <WindowMenuBar
            windowId="blog"
            about={{
              appName: "Notepad — Blog Feed",
              version: "5.1",
              description:
                "Latest posts from jermayads.nl/blog. Click any title to open the full post.",
            }}
          />
        }
        status={`${BLOG_POSTS.length} post(s) loaded`}
      >
        <BlogContent />
      </Window>
      <Window
        id="admin-login"
        icon={KeyIcon}
        menubar={
          <WindowMenuBar
            windowId="admin-login"
            about={{
              appName: "Administrator — Log On",
              version: "5.1",
              description:
                "Restricted area. Password-protected blog manager for the site owner.",
            }}
          />
        }
      >
        <AdminLoginContent />
      </Window>
      <Window
        id="admin"
        icon={AdminIcon}
        minW={720}
        minH={460}
        menubar={
          <WindowMenuBar
            windowId="admin"
            about={{
              appName: "Admin Panel — Blog manager",
              version: "5.1",
              description:
                "Create, edit, publish and trash blog posts. Uploaded images go straight to storage.",
            }}
          />
        }
      >
        <AdminPanelContent />
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
          <DesktopIcon windowId="stats" label="Stats" icon={StatsIcon} />
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
          <DesktopIcon windowId="game" label="Game" icon={GameIcon} />
          {/* Coffee icon now OPENS Calendly window inside the desktop */}
          <div style={{ position: "relative" }}>
            <DesktopIcon
              windowId="calendly"
              label="Connect ☕"
              icon={CoffeeIcon}
            />
          </div>
          <DesktopIcon windowId="admin" label="Admin" icon={AdminIcon} />
          <DesktopIcon windowId="blog" label="Blog" icon={NotepadIcon} />
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
