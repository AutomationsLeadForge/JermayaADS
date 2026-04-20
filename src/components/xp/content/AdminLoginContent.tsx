"use client";

import { useState } from "react";
import { useWindowManager } from "@/components/xp/WindowManager";
import { notifyAuthChanged } from "@/components/xp/admin/useAdminAuth";

export function AdminLoginContent() {
  const { close, open } = useWindowManager();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? "Login failed");
        setLoading(false);
        return;
      }
      notifyAuthChanged();
      close("admin-login");
      open("admin");
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Tahoma, sans-serif",
        fontSize: 13,
        background: "#ece9d8",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #919b9c",
          padding: 18,
          display: "grid",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#0a3a8e",
            borderBottom: "1px solid #d4d0c8",
            paddingBottom: 6,
            marginBottom: 4,
          }}
        >
          🔒 Administrator sign-in
        </div>
        <p style={{ margin: 0, color: "#444", lineHeight: 1.5 }}>
          Enter the admin password to manage blog posts.
        </p>
        <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span style={{ fontWeight: 600 }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{
                padding: "6px 8px",
                border: "1px solid #7f9db9",
                fontFamily: "Tahoma, sans-serif",
                fontSize: 13,
                background: "#fff",
              }}
            />
          </label>
          {error ? (
            <div
              style={{
                color: "#c62727",
                fontSize: 12,
                background: "#fff1f1",
                border: "1px solid #f0b0b0",
                padding: "6px 8px",
              }}
            >
              {error}
            </div>
          ) : null}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => close("admin-login")}
              className="xp-dialog-btn"
              style={btnStyle}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "5px 16px",
  border: "1px solid #003c74",
  background:
    "linear-gradient(to bottom, #fefefe 0%, #e5e5e5 45%, #d2d2d2 55%, #eaeaea 100%)",
  fontFamily: "Tahoma, sans-serif",
  fontSize: 12,
  cursor: "pointer",
  minWidth: 78,
};
