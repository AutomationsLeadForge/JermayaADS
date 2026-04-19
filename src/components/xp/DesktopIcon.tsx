"use client";

import type { SVGProps } from "react";
import { useWindowManager, type WindowId } from "@/components/xp/WindowManager";

interface Props {
  windowId: WindowId;
  label: string;
  icon: (props: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactElement;
  x?: number;
  y?: number;
}

export function DesktopIcon({ windowId, label, icon: Icon, x, y }: Props) {
  const { open } = useWindowManager();

  return (
    <button
      type="button"
      className="xp-desktop-icon"
      style={x !== undefined || y !== undefined ? { position: "absolute", left: x, top: y } : undefined}
      onClick={() => open(windowId)}
      aria-label={`Open ${label}`}
    >
      <Icon className="xp-icon-pixel" size={32} />
      <span>{label}</span>
    </button>
  );
}
