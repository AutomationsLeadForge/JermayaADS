"use client";

import { useEffect, useState } from "react";
import type { ReadmeContentValue } from "@/types/site";

const DEFAULT_BODY = `Hi — I'm Jermaya. Freelance SEA specialist, AI engineer, and developer. Based in Heesch, NL.

This site is the contents of my hard drive, mostly. Double-click any icon or open a program from start to poke around.

> Last modified: 2026
> Author: Jermaya Leijen
> Size: 10+ years of receipts

--- END OF FILE ---`;

export function WelcomeContent() {
  const [body, setBody] = useState<string>(DEFAULT_BODY);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/site-content/readme", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        const v = j?.content?.value as ReadmeContentValue | undefined;
        if (v && typeof v.body === "string" && v.body.trim()) {
          setBody(v.body);
        }
      })
      .catch(() => {
        // keep default
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Split on blank lines so each paragraph becomes its own <p>.
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div>
      <h1 className="xp-h1">Welcome.txt</h1>
      {paragraphs.map((para, i) => (
        <p key={i} className="xp-p" style={{ whiteSpace: "pre-wrap" }}>
          {para}
        </p>
      ))}
    </div>
  );
}
