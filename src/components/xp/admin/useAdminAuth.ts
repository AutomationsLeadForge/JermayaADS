"use client";

import { useCallback, useEffect, useState } from "react";

export const ADMIN_AUTH_EVENT = "jos-admin-auth-changed";

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const refresh = useCallback(() => {
    fetch("/api/admin/me", { cache: "no-store" })
      .then((r) => r.json() as Promise<{ authenticated: boolean }>)
      .then((j) => setAuthenticated(j.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/me", { cache: "no-store" })
      .then((r) => r.json() as Promise<{ authenticated: boolean }>)
      .then((j) => {
        if (!cancelled) setAuthenticated(j.authenticated);
      })
      .catch(() => {
        if (!cancelled) setAuthenticated(false);
      });
    const handler = () => refresh();
    window.addEventListener(ADMIN_AUTH_EVENT, handler);
    return () => {
      cancelled = true;
      window.removeEventListener(ADMIN_AUTH_EVENT, handler);
    };
  }, [refresh]);

  return { authenticated, refresh };
}

export function notifyAuthChanged() {
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
}
