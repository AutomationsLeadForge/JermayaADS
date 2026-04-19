import Image from "next/image";
import { ABOUT } from "@/lib/redesign-content";

export function AboutContent() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div
        className="xp-bevel-sunken"
        style={{
          background: "#ffffff",
          padding: 6,
          display: "inline-block",
          width: "fit-content",
        }}
      >
        <Image
          src="/images/jermayaleijen.png"
          alt="Jermaya Leijen"
          width={140}
          height={170}
          style={{
            width: 140,
            height: "auto",
            imageRendering: "pixelated",
            display: "block",
          }}
        />
      </div>
      <div>
        <h1 className="xp-h1">about_jermaya.bmp</h1>
        <p className="xp-p">{ABOUT.body}</p>
        <h2 className="xp-h2">By the numbers</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {ABOUT.chips.map((c) => (
            <li key={c.label} className="xp-p">
              [{c.value}] {c.label}
            </li>
          ))}
        </ul>
        <h2 className="xp-h2">Currently</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[
            "Running Performance Max for 2 e-com clients",
            "Shipping OrangePY v2",
            "Re-reading Obviously Awesome",
            "Coffee: Flair 58, Ethiopia naturals",
          ].map((l) => (
            <li key={l} className="xp-p">
              &gt; {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
