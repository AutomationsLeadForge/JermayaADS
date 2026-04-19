"use client";

import type { SVGProps } from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useWindowManager, type WindowId } from "@/components/xp/WindowManager";
import {
  CalendarIcon,
  ComputerIcon,
  FolderIcon,
  MailIcon,
  DocumentIcon,
  PaintIcon,
} from "@/components/xp/PixelIcons";

interface Props {
  open: boolean;
  onClose: () => void;
  iconFor: Record<
    string,
    (props: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactElement
  >;
}

interface ProgramItem {
  id: WindowId;
  label: string;
  icon: (props: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactElement;
}

const PROGRAMS: ProgramItem[] = [
  { id: "welcome", label: "Welcome.txt — Notepad", icon: DocumentIcon },
  { id: "about", label: "About Jermaya.bmp — Paint", icon: PaintIcon },
  { id: "computer", label: "My Computer — Services", icon: ComputerIcon },
  { id: "work", label: "Selected Work — Explorer", icon: FolderIcon },
  { id: "contact", label: "Contact.eml — Outlook", icon: MailIcon },
  { id: "calendly", label: "Book a call — Calendly.exe", icon: CalendarIcon },
];

export function StartMenu({ open, onClose }: Props) {
  const { open: openWindow } = useWindowManager();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      // don't close if clicking the start button (it toggles itself)
      if ((e.target as HTMLElement).closest(".xp-start-button")) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleProgram = (id: WindowId) => {
    openWindow(id);
    onClose();
  };

  return (
    <div ref={ref} className="xp-startmenu" role="menu">
      <div className="xp-startmenu-header">
        <div className="avatar">
          <Image
            src="/images/jermayaleijen.png"
            alt=""
            width={38}
            height={38}
            style={{ objectFit: "cover", width: 38, height: 38 }}
          />
        </div>
        Jermaya Leijen
      </div>
      <div className="xp-startmenu-list">
        {PROGRAMS.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              role="menuitem"
              onClick={() => handleProgram(p.id)}
            >
              <Icon size={20} />
              {p.label}
            </button>
          );
        })}
      </div>
      <div className="xp-startmenu-footer">
        freelance.exe · running since 2016
      </div>
    </div>
  );
}
