"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWindowManager, type WindowId } from "@/components/xp/WindowManager";
import { SITE_META } from "@/lib/redesign-content";

export interface MenuItem {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuGroup {
  label: string;
  items: MenuItem[];
}

interface AboutInfo {
  appName: string;
  version: string;
  description: string;
}

interface Props {
  windowId: WindowId;
  /** Extra app-specific menus to merge (optional). */
  extraMenus?: MenuGroup[];
  about?: AboutInfo;
}

/**
 * Standard menubar: File / Edit / View / Favorites / Tools / Help
 * All items trigger real actions (close window, open windows, toggle scanlines,
 * show About dialog, scroll-to within window, etc.).
 */
export function WindowMenuBar({ windowId, extraMenus = [], about }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { close, minimize, open, windows } = useWindowManager();
  const [showAbout, setShowAbout] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [scanlinesOff, setScanlinesOff] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (!barRef.current) return;
      if (barRef.current.contains(e.target as Node)) return;
      setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  useEffect(() => {
    document.body.classList.toggle("xp-no-scanlines", scanlinesOff);
  }, [scanlinesOff]);

  const closeThis = () => {
    close(windowId);
    setOpenMenu(null);
  };

  const minimizeThis = () => {
    minimize(windowId);
    setOpenMenu(null);
  };

  const closeAll = () => {
    windows
      .filter((w) => w.open && !w.minimized)
      .forEach((w) => close(w.id));
    setOpenMenu(null);
  };

  const openWin = (id: WindowId) => {
    open(id);
    setOpenMenu(null);
  };

  const externalOpen = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setOpenMenu(null);
  };

  const menus: MenuGroup[] = [
    {
      label: "File",
      items: [
        { label: "New Window…", onClick: () => openWin("welcome") },
        { label: "Open My Computer", onClick: () => openWin("computer") },
        { label: "Open Projects", onClick: () => openWin("work") },
        { divider: true, label: "" },
        { label: "Minimize", shortcut: "Alt+Space,N", onClick: minimizeThis },
        { label: "Close", shortcut: "Ctrl+W", onClick: closeThis },
        { label: "Close All Windows", onClick: closeAll },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", shortcut: "Ctrl+Z", disabled: true },
        { label: "Redo", shortcut: "Ctrl+Y", disabled: true },
        { divider: true, label: "" },
        { label: "Cut", shortcut: "Ctrl+X", disabled: true },
        { label: "Copy", shortcut: "Ctrl+C", disabled: true },
        { label: "Paste", shortcut: "Ctrl+V", disabled: true },
        { divider: true, label: "" },
        { label: "Select All", shortcut: "Ctrl+A", disabled: true },
      ],
    },
    {
      label: "View",
      items: [
        { label: "Refresh", shortcut: "F5", onClick: () => location.reload() },
        { divider: true, label: "" },
        {
          label: scanlinesOff ? "Scanlines:  Off" : "Scanlines:  On  ✓",
          onClick: () => {
            setScanlinesOff((v) => !v);
            setOpenMenu(null);
          },
        },
      ],
    },
    {
      label: "Favorites",
      items: [
        {
          label: "WhatsApp Jermaya",
          onClick: () => externalOpen(SITE_META.whatsappUrl),
        },
        { label: "Projects", onClick: () => openWin("work") },
        { label: "Services", onClick: () => openWin("computer") },
        { label: "Contact", onClick: () => openWin("contact") },
        { divider: true, label: "" },
        {
          label: "LinkedIn profile",
          onClick: () => externalOpen(SITE_META.linkedinUrl),
        },
        {
          label: "GitHub repos",
          onClick: () => externalOpen("https://github.com/JermayaL"),
        },
      ],
    },
    {
      label: "Tools",
      items: [
        { label: "Internet Options…", disabled: true },
        { divider: true, label: "" },
        {
          label: "WhatsApp Jermaya",
          onClick: () => externalOpen(SITE_META.whatsappUrl),
        },
        {
          label: "Email Jermaya",
          onClick: () => externalOpen("mailto:jermaya@jermayads.nl"),
        },
      ],
    },
    ...extraMenus,
    {
      label: "Help",
      items: [
        {
          label: "Keyboard shortcuts",
          onClick: () => {
            setShowShortcuts(true);
            setOpenMenu(null);
          },
        },
        {
          label: "Open Readme",
          onClick: () => openWin("welcome"),
        },
        { divider: true, label: "" },
        {
          label: `About ${about?.appName ?? "this window"}…`,
          onClick: () => {
            setShowAbout(true);
            setOpenMenu(null);
          },
        },
      ],
    },
  ];

  return (
    <>
      <div ref={barRef} className="xp-menubar" role="menubar">
        {menus.map((m) => (
          <div key={m.label} style={{ position: "relative" }}>
            <button
              type="button"
              role="menuitem"
              aria-expanded={openMenu === m.label}
              aria-haspopup="menu"
              onClick={() =>
                setOpenMenu((cur) => (cur === m.label ? null : m.label))
              }
              onMouseEnter={() => {
                // If another menu is open, follow the cursor
                if (openMenu && openMenu !== m.label) setOpenMenu(m.label);
              }}
            >
              {m.label}
            </button>
            {openMenu === m.label ? (
              <div className="xp-menu-dropdown" role="menu">
                {m.items.map((it, i) =>
                  it.divider ? (
                    <div
                      key={`div-${i}`}
                      className="xp-menu-divider"
                      aria-hidden="true"
                    />
                  ) : (
                    <button
                      key={it.label + i}
                      type="button"
                      className="xp-menu-item"
                      onClick={it.onClick}
                      disabled={it.disabled}
                      role="menuitem"
                    >
                      <span>{it.label}</span>
                      {it.shortcut ? (
                        <span className="shortcut">{it.shortcut}</span>
                      ) : null}
                    </button>
                  ),
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {showAbout && about ? (
        <AboutDialog info={about} onClose={() => setShowAbout(false)} />
      ) : null}
      {showShortcuts ? (
        <ShortcutsDialog onClose={() => setShowShortcuts(false)} />
      ) : null}
    </>
  );
}

function ShortcutsDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pairs: Array<[string, string]> = [
    ["Esc", "Close menu / tip / dialog"],
    ["Enter", "Activate focused item"],
    ["Tab", "Move focus forward"],
    ["F5", "Reload page"],
    ["Double-click title bar", "Maximize / restore"],
    ["Drag title bar", "Move window"],
    ["Drag bottom-right corner", "Resize window"],
    ["Click taskbar tab", "Show / hide a window"],
    ["Single-click desktop icon", "Open its window"],
  ];

  return (
    <div className="xp-about-dialog" role="dialog" aria-label="Keyboard shortcuts">
      <div className="xp-about-dialog-panel" style={{ width: 420 }}>
        <div
          style={{
            padding: "6px 8px",
            background: "linear-gradient(to bottom, #0058e6, #3a6ea5)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Keyboard shortcuts</span>
          <button
            type="button"
            onClick={onClose}
            className="xp-btn xp-btn--close"
            style={{ width: 22, height: 18 }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div style={{ background: "#fff", margin: 2, padding: 16 }}>
          <table
            style={{
              fontFamily: "Tahoma, sans-serif",
              fontSize: 12,
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <tbody>
              {pairs.map(([k, v]) => (
                <tr key={k}>
                  <td
                    style={{
                      padding: "4px 10px 4px 0",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {k}
                  </td>
                  <td style={{ padding: "4px 0", color: "#3c3c3c" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "6px 8px",
            borderTop: "1px solid #a8a8a8",
            background: "#ece9d8",
          }}
        >
          <button
            type="button"
            className="xp-btn"
            style={{ width: "auto", padding: "2px 16px", height: 24 }}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutDialog({
  info,
  onClose,
}: {
  info: AboutInfo;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="xp-about-dialog" role="dialog" aria-label="About">
      <div className="xp-about-dialog-panel">
        <div
          style={{
            padding: "6px 8px",
            background: "linear-gradient(to bottom, #0058e6, #3a6ea5)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>About {info.appName}</span>
          <button
            type="button"
            onClick={onClose}
            className="xp-btn xp-btn--close"
            style={{ width: 22, height: 18 }}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="xp-about-dialog-body">
          <div>
            <Image
              src="/images/jermayaleijen.png"
              alt="Jermaya"
              width={56}
              height={56}
              style={{
                width: 56,
                height: 56,
                objectFit: "cover",
                border: "2px solid #000",
                imageRendering: "pixelated",
              }}
            />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              {info.appName} {info.version}
            </div>
            <div style={{ color: "#3c3c3c", lineHeight: 1.4 }}>
              {info.description}
            </div>
            <div
              style={{
                marginTop: 10,
                paddingTop: 8,
                borderTop: "1px solid #808080",
                color: "#3c3c3c",
              }}
            >
              Copyright © 2013—2026 Jermaya Leijen.
              <br />
              Freelance. Booking work for Q3 2026.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "6px 8px",
            borderTop: "1px solid #a8a8a8",
            background: "#ece9d8",
          }}
        >
          <button
            type="button"
            className="xp-btn"
            style={{ width: "auto", padding: "2px 16px", height: 24 }}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
