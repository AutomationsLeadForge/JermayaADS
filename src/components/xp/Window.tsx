"use client";

import type { ReactNode, SVGProps } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useWindowManager, type WindowId } from "@/components/xp/WindowManager";

/** Match the mobile/tablet breakpoint at which windows become full-screen. */
function isMobileLayout() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1023px)").matches;
}

interface Props {
  id: WindowId;
  icon?: (props: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactElement;
  children: ReactNode;
  menubar?: ReactNode;
  status?: ReactNode;
  minW?: number;
  minH?: number;
}

const TASKBAR_H = 36;

export function Window({
  id,
  icon: Icon,
  children,
  menubar,
  status,
  minW = 320,
  minH = 220,
}: Props) {
  const { windows, focusedId, focus, close, minimize, toggleMaximize, move, resize } =
    useWindowManager();
  const win = windows.find((w) => w.id === id);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [resizing, setResizing] = useState<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  } | null>(null);

  const onTitleDown = useCallback(
    (e: React.PointerEvent) => {
      if (!win) return;
      if ((e.target as HTMLElement).closest(".xp-btn")) return;
      focus(id);
      if (win.maximized) return;
      // Mobile/tablet: windows are full-screen; don't start a drag.
      if (isMobileLayout()) return;
      setDragOffset({ x: e.clientX - win.x, y: e.clientY - win.y });
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focus, id, win],
  );

  const onTitleMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragOffset) return;
      const maxX = window.innerWidth - 120;
      const maxY = window.innerHeight - TASKBAR_H - 36;
      const nx = Math.min(Math.max(-40, e.clientX - dragOffset.x), maxX);
      const ny = Math.min(Math.max(0, e.clientY - dragOffset.y), maxY);
      move(id, nx, ny);
    },
    [dragOffset, move, id],
  );

  const onTitleUp = useCallback((e: React.PointerEvent) => {
    setDragOffset(null);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const onTitleDoubleClick = useCallback(() => {
    if (isMobileLayout()) return; // always full-screen on mobile
    toggleMaximize(id);
  }, [toggleMaximize, id]);

  const onResizeDown = useCallback(
    (e: React.PointerEvent) => {
      if (!win || win.maximized) return;
      if (isMobileLayout()) return; // no resize on mobile
      e.stopPropagation();
      e.preventDefault();
      focus(id);
      setResizing({
        startX: e.clientX,
        startY: e.clientY,
        startW: win.w,
        startH: win.h,
      });
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [focus, id, win],
  );

  const onResizeMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizing) return;
      const newW = Math.max(minW, resizing.startW + (e.clientX - resizing.startX));
      const newH = Math.max(minH, resizing.startH + (e.clientY - resizing.startY));
      resize(id, newW, newH);
    },
    [resizing, resize, id, minW, minH],
  );

  const onResizeUp = useCallback((e: React.PointerEvent) => {
    setResizing(null);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  if (!win || !win.open || win.minimized) return null;

  const isFocused = focusedId === id;
  const posStyle = win.maximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: `calc(100vh - ${TASKBAR_H}px)`,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
      };

  return (
    <div
      className={cn(
        "xp-window",
        isFocused ? "focused" : "unfocused",
        win.maximized && "xp-window-maximized",
      )}
      style={{
        ...posStyle,
        zIndex: win.z,
      }}
      onMouseDownCapture={() => focus(id)}
    >
      <div
        className="xp-titlebar"
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onPointerCancel={onTitleUp}
        onDoubleClick={onTitleDoubleClick}
        style={{ cursor: win.maximized ? "default" : "grab" }}
      >
        {Icon ? <Icon className="xp-win-icon" size={16} /> : null}
        <span className="xp-title-text">{win.title}</span>
        <div className="xp-window-buttons">
          <button
            type="button"
            className="xp-btn"
            aria-label="Minimize"
            onClick={() => minimize(id)}
            title="Minimize"
          >
            _
          </button>
          <button
            type="button"
            className="xp-btn"
            aria-label={win.maximized ? "Restore" : "Maximize"}
            title={win.maximized ? "Restore" : "Maximize"}
            onClick={() => toggleMaximize(id)}
          >
            {win.maximized ? "❐" : "▢"}
          </button>
          <button
            type="button"
            className="xp-btn xp-btn--close"
            aria-label="Close"
            onClick={() => close(id)}
            title="Close"
          >
            ×
          </button>
        </div>
      </div>
      {menubar ? <div className="xp-menubar">{menubar}</div> : null}
      <div className="xp-window-body">{children}</div>
      {status ? <div className="xp-status-bar">{status}</div> : null}
      {!win.maximized ? (
        <div
          className="xp-resize-handle"
          role="presentation"
          aria-label="Resize window"
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          onPointerCancel={onResizeUp}
          title="Drag to resize"
        />
      ) : null}
    </div>
  );
}
