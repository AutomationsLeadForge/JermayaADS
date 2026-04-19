"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FolderIcon,
  PaintIcon,
  ComputerIcon,
  WorkIcon,
  MailIcon,
} from "@/components/xp/PixelIcons";
import { SERVICES_SECTION } from "@/lib/redesign-content";
import { SERVICE_LOGOS } from "@/lib/content";

const ICONS = [FolderIcon, ComputerIcon, WorkIcon, PaintIcon, MailIcon];

export function ComputerContent() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div
        className="xp-bevel-sunken"
        style={{ background: "#fff", padding: 6 }}
      >
        <p className="xp-p" style={{ margin: 0 }}>
          Address: <strong>C:\Jermaya\Services\</strong>
        </p>
      </div>

      <p className="xp-p" style={{ margin: "4px 0" }}>
        5 service folders. Select one to see what&apos;s inside.
      </p>

      <div className="xp-filelist">
        {SERVICES_SECTION.tiles.map((tile, i) => {
          const Icon = ICONS[i] ?? FolderIcon;
          return (
            <a
              key={tile.label}
              href={tile.href}
              className="xp-file"
              onClick={(e) => {
                if (e.detail === 1) {
                  e.preventDefault();
                  setSelected(tile.label);
                }
              }}
              style={
                selected === tile.label
                  ? { background: "#316ac5", color: "#fff" }
                  : undefined
              }
              title={tile.oneLiner}
            >
              <Icon size={32} className="xp-icon-pixel" />
              <span>{tile.label}</span>
            </a>
          );
        })}
      </div>

      {selected ? (
        <div
          className="xp-bevel-sunken"
          style={{ background: "#fff", padding: 10, marginTop: 6 }}
        >
          <p className="xp-p" style={{ margin: 0, fontWeight: 600 }}>
            {selected}
          </p>
          <p className="xp-p" style={{ margin: "4px 0 0" }}>
            {
              SERVICES_SECTION.tiles.find((t) => t.label === selected)
                ?.oneLiner
            }
          </p>
        </div>
      ) : null}

      {/* Tools subfolder — real service-logo grid from jermayads.nl */}
      <div style={{ marginTop: 12 }}>
        <div
          className="xp-bevel-sunken"
          style={{ background: "#fff", padding: 6, marginBottom: 8 }}
        >
          <p className="xp-p" style={{ margin: 0 }}>
            Address: <strong>C:\Jermaya\Services\Tools\</strong>
            <span style={{ color: "#3c3c3c", marginLeft: 8 }}>
              {SERVICE_LOGOS.length} item(s)
            </span>
          </p>
        </div>
        <div className="xp-logo-grid">
          {SERVICE_LOGOS.map((logo) => (
            <div key={logo.src} className="xp-logo-tile" title={logo.alt}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={42}
                height={42}
                style={{ width: 42, height: 42, objectFit: "contain" }}
              />
              <span>{logo.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
