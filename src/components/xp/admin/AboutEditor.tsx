"use client";

import { useEffect, useState } from "react";
import type { AboutChip, AboutContentValue } from "@/types/site";
import { ABOUT } from "@/lib/redesign-content";

type LoadState = "loading" | "ready" | "error";

const DEFAULT_CURRENTLY = [
  "Running Performance Max for 2 e-com clients",
  "Shipping OrangePY v2",
  "Re-reading Obviously Awesome",
  "Coffee: Flair 58, Ethiopia naturals",
];

function emptyValue(): AboutContentValue {
  return {
    body: ABOUT.body,
    chips: [...ABOUT.chips],
    currently: [...DEFAULT_CURRENTLY],
  };
}

export function AboutEditor() {
  const [state, setState] = useState<LoadState>("loading");
  const [value, setValue] = useState<AboutContentValue>(() => emptyValue());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/site-content/about", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        const v = j?.content?.value as AboutContentValue | undefined;
        if (v && typeof v === "object") {
          setValue({
            body: typeof v.body === "string" ? v.body : ABOUT.body,
            chips: Array.isArray(v.chips) ? v.chips : [...ABOUT.chips],
            currently: Array.isArray(v.currently)
              ? v.currently
              : [...DEFAULT_CURRENTLY],
          });
        }
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
      const res = await fetch("/api/admin/site-content/about", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ value }),
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
    return <div style={{ padding: 14 }}>Loading about…</div>;
  }
  if (state === "error") {
    return <div style={{ padding: 14, color: "#7a0000" }}>Failed to load.</div>;
  }

  const setChip = (i: number, patch: Partial<AboutChip>) => {
    setValue((v) => ({
      ...v,
      chips: v.chips.map((c, idx) => (idx === i ? { ...c, ...patch } : c)),
    }));
  };
  const addChip = () =>
    setValue((v) => ({ ...v, chips: [...v.chips, { value: "", label: "" }] }));
  const removeChip = (i: number) =>
    setValue((v) => ({ ...v, chips: v.chips.filter((_, idx) => idx !== i) }));

  const setCurrently = (i: number, text: string) => {
    setValue((v) => ({
      ...v,
      currently: v.currently.map((c, idx) => (idx === i ? text : c)),
    }));
  };
  const addCurrently = () =>
    setValue((v) => ({ ...v, currently: [...v.currently, ""] }));
  const removeCurrently = (i: number) =>
    setValue((v) => ({
      ...v,
      currently: v.currently.filter((_, idx) => idx !== i),
    }));

  return (
    <div style={{ padding: 14, display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 14 }}>About Jermaya — window content</h2>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          style={primaryBtnStyle}
        >
          {saving ? "Saving…" : "Save about"}
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

      <label style={labelStyle}>
        <span>Body paragraph</span>
        <textarea
          value={value.body}
          onChange={(e) => setValue({ ...value, body: e.target.value })}
          rows={6}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
        />
      </label>

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>By the numbers — chips</strong>
          <button type="button" onClick={addChip} style={barBtnStyle}>
            + Add chip
          </button>
        </div>
        {value.chips.map((chip, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr 80px",
              gap: 6,
              alignItems: "center",
            }}
          >
            <input
              value={chip.value}
              onChange={(e) => setChip(i, { value: e.target.value })}
              placeholder="10+"
              style={inputStyle}
            />
            <input
              value={chip.label}
              onChange={(e) => setChip(i, { label: e.target.value })}
              placeholder="years in SEA"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => removeChip(i)}
              style={{ ...barBtnStyle, color: "#7a0000" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Currently — bullet lines</strong>
          <button type="button" onClick={addCurrently} style={barBtnStyle}>
            + Add line
          </button>
        </div>
        {value.currently.map((line, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px",
              gap: 6,
              alignItems: "center",
            }}
          >
            <input
              value={line}
              onChange={(e) => setCurrently(i, e.target.value)}
              placeholder="e.g. Running Performance Max for 2 e-com clients"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => removeCurrently(i)}
              style={{ ...barBtnStyle, color: "#7a0000" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: 4,
  fontWeight: 600,
};
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
