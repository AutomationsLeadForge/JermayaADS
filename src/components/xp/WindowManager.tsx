"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export type WindowId = string;

export interface WindowState {
  id: WindowId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** If false, hidden entirely (not on taskbar either). */
  open: boolean;
}

interface WindowManagerCtx {
  windows: WindowState[];
  focusedId: WindowId | null;
  open: (id: WindowId) => void;
  close: (id: WindowId) => void;
  minimize: (id: WindowId) => void;
  restore: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  move: (id: WindowId, x: number, y: number) => void;
  resize: (id: WindowId, w: number, h: number) => void;
  toggleMaximize: (id: WindowId) => void;
  toggleFromTaskbar: (id: WindowId) => void;
}

const Ctx = createContext<WindowManagerCtx | null>(null);

export function useWindowManager() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return v;
}

export type InitialWindow = Omit<WindowState, "z" | "maximized"> & { maximized?: boolean };

interface ProviderProps {
  initial: InitialWindow[];
  children: ReactNode;
}

export function WindowManagerProvider({ initial, children }: ProviderProps) {
  const [zCounter, setZCounter] = useState(10);
  const [windows, setWindows] = useState<WindowState[]>(() =>
    initial.map((w, i) => ({
      ...w,
      z: 10 + i,
      maximized: w.maximized ?? false,
    })),
  );
  // Stash of last-non-maximized geometry so we can restore after un-maximize
  const [preMaxGeom, setPreMaxGeom] = useState<
    Record<WindowId, { x: number; y: number; w: number; h: number }>
  >({});
  const [focusedId, setFocusedId] = useState<WindowId | null>(
    initial[initial.length - 1]?.id ?? null,
  );

  const focus = useCallback((id: WindowId) => {
    setZCounter((z) => {
      const next = z + 1;
      setWindows((ws) =>
        ws.map((w) =>
          w.id === id ? { ...w, z: next, minimized: false, open: true } : w,
        ),
      );
      return next;
    });
    setFocusedId(id);
  }, []);

  const open = useCallback(
    (id: WindowId) => {
      focus(id);
    },
    [focus],
  );

  const close = useCallback((id: WindowId) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, open: false } : w)));
    setFocusedId((cur) => (cur === id ? null : cur));
  }, []);

  const minimize = useCallback((id: WindowId) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setFocusedId((cur) => (cur === id ? null : cur));
  }, []);

  const restore = useCallback(
    (id: WindowId) => {
      focus(id);
    },
    [focus],
  );

  const move = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((ws) =>
      ws.map((w) =>
        w.id === id && !w.maximized ? { ...w, x, y } : w,
      ),
    );
  }, []);

  const resize = useCallback((id: WindowId, w: number, h: number) => {
    setWindows((ws) =>
      ws.map((win) =>
        win.id === id && !win.maximized ? { ...win, w, h } : win,
      ),
    );
  }, []);

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized) {
          // Restore
          const prev = preMaxGeom[id];
          if (prev) {
            return { ...w, maximized: false, ...prev };
          }
          return { ...w, maximized: false };
        }
        // Save current geometry, then maximize
        setPreMaxGeom((g) => ({
          ...g,
          [id]: { x: w.x, y: w.y, w: w.w, h: w.h },
        }));
        return { ...w, maximized: true };
      }),
    );
    focus(id);
  }, [preMaxGeom, focus]);

  const toggleFromTaskbar = useCallback(
    (id: WindowId) => {
      setWindows((ws) => {
        const w = ws.find((x) => x.id === id);
        if (!w) return ws;
        if (w.minimized || focusedId !== id) {
          return ws.map((x) =>
            x.id === id
              ? { ...x, minimized: false, z: zCounter + 1, open: true }
              : x,
          );
        }
        return ws.map((x) => (x.id === id ? { ...x, minimized: true } : x));
      });
      setZCounter((z) => z + 1);
      setFocusedId((cur) =>
        cur === id && !windows.find((x) => x.id === id)?.minimized ? null : id,
      );
    },
    [focusedId, zCounter, windows],
  );

  const value = useMemo<WindowManagerCtx>(
    () => ({
      windows,
      focusedId,
      open,
      close,
      minimize,
      restore,
      focus,
      move,
      resize,
      toggleMaximize,
      toggleFromTaskbar,
    }),
    [
      windows,
      focusedId,
      open,
      close,
      minimize,
      restore,
      focus,
      move,
      resize,
      toggleMaximize,
      toggleFromTaskbar,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
