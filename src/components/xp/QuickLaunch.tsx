"use client";

import { useWindowManager } from "@/components/xp/WindowManager";
import {
  DocumentIcon,
  FolderIcon,
  MailIcon,
} from "@/components/xp/PixelIcons";

export function QuickLaunch() {
  const { open } = useWindowManager();

  return (
    <div className="xp-quick-launch" aria-label="Quick launch">
      <button
        type="button"
        className="xp-ql-btn"
        title="Readme (Welcome)"
        aria-label="Open Readme"
        onClick={() => open("welcome")}
      >
        <DocumentIcon size={18} />
      </button>
      <button
        type="button"
        className="xp-ql-btn"
        title="Projects"
        aria-label="Open Projects"
        onClick={() => open("work")}
      >
        <FolderIcon size={18} />
      </button>
      <button
        type="button"
        className="xp-ql-btn"
        title="Contact"
        aria-label="Open Contact"
        onClick={() => open("contact")}
      >
        <MailIcon size={18} />
      </button>
    </div>
  );
}
