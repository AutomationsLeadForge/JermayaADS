"use client";

import { useEffect, useState } from "react";
import type { ReadmeContentValue } from "@/types/site";

type LoadState = "loading" | "ready" | "error";

const DEFAULT_README = `Hi — I'm Jermaya. Freelance SEA specialist, AI engineer, and developer. Based in Heesch, NL.

This site is the contents of my hard drive, mostly. Double-click any icon or open a program from start to poke around.

> Last modified: 2026
> Author: Jermaya Leijen
> Size: 10+ years of receipts

--- END OF FILE ---`;

export function ReadmeEditor() {
  const [state, setState] = useState<LoadState>("loading");
  const [body, setBody] = useState<string>(DEFAULT_README);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/site-content/readme", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        const v = j?.content?.value as ReadmeContentValue | undefined;
        if (v && typeof v.body === "string") setBody(v.body);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/site-content/readme", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ value: { body } satisfies ReadmeContentValue }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMessage(j.error ?? "Save failed");
        return;
      }
      setMessage("Saved ✔");
    } finally {
      setSaving(false);
    }
  };

  if (state === "loading") {
    return <div style={{ padding: 14 }}>Loading readme…</div>;
  }
  if (state === "error") {
    return <div style={{ padding: 14, color: "#7a0000" }}>Failed to load.</div>;
  }

  return (
    <div style={{ padding: 14, display: "grid", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 14 }}>Welcome.txt — readme body</h2>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          style={primaryBtnStyle}
        >
          {saving ? "Saving…" : "Save readme"}
        </button>
      </div>

      {message ? (
        <div
          style={{
            padding: "6px 10px",
            border: "1px solid #aec7ff",
            background: "#eaf2ff",
            color: "#0a3a8e",
          }}
        >
          {message}
        </div>
      ) : null}

      <p style={{ margin: 0, fontSize: 12, color: "#555" }}>
        Blank lines separate paragraphs. Each line renders as one paragraph in the
        Welcome window.
      </p>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={18}
        style={{
          ...inputStyle,
          resize: "vertical",
          fontFamily:
            '"Consolas", "Monaco", "Courier New", monospace',
          fontSize: 13,
          lineHeight: 1.5,
        }}
      />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "6px 8px",
  border: "1px solid #7f9db9",
  fontFamily: "Tahoma, sans-serif",
  fontSize: 13,
  background: "#fff",
  fontWeight: 400,
};
const barBtnStyle: React.CSSProperties = {
  padding: "4px 12px",
  border: "1px solid #7a7a7a",
  background:
    "linear-gradient(to bottom, #fefefe 0%, #e5e5e5 45%, #d2d2d2 55%, #eaeaea 100%)",
  fontFamily: "Tahoma, sans-serif",
  fontSize: 12,
  cursor: "pointer",
};
const primaryBtnStyle: React.CSSProperties = {
  ...barBtnStyle,
  border: "1px solid #0a3a8e",
  background:
    "linear-gradient(to bottom, #5a9cff 0%, #1a66d6 45%, #0a4fb5 55%, #1a66d6 100%)",
  color: "#fff",
  fontWeight: 700,
};
