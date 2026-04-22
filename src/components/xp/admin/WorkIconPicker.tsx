"use client";

import type { ReactElement } from "react";
import {
  AdsRobotIcon,
  BookStackIcon,
  DiscountTagIcon,
  DocumentIcon,
  ForecastChartIcon,
  GlobeIcon,
  NewspaperAIIcon,
  PottedPlantIcon,
  ScaleIcon,
  ShopBagAIIcon,
  SpreadsheetIcon,
  TerminalIcon,
} from "@/components/xp/PixelIcons";
import { WORK_ICON_KEYS, type WorkIconKey } from "@/types/work";

type IconFn = (p: { size?: number; className?: string }) => ReactElement;

export const WORK_ICON_COMPONENTS: Record<WorkIconKey, IconFn> = {
  NewspaperAIIcon,
  DiscountTagIcon,
  ScaleIcon,
  BookStackIcon,
  AdsRobotIcon,
  TerminalIcon,
  ShopBagAIIcon,
  GlobeIcon,
  SpreadsheetIcon,
  ForecastChartIcon,
  PottedPlantIcon,
  DocumentIcon,
};

export function renderWorkIcon(
  key: string,
  size = 18,
): ReactElement {
  const Icon =
    (WORK_ICON_COMPONENTS as Record<string, IconFn>)[key] ?? DocumentIcon;
  return <Icon size={size} />;
}

export function WorkIconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: WorkIconKey) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
        gap: 6,
        padding: 6,
        border: "1px solid #7f9db9",
        background: "#fff",
      }}
    >
      {WORK_ICON_KEYS.map((key) => {
        const active = key === value;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            title={key.replace(/Icon$/, "")}
            style={{
              display: "grid",
              placeItems: "center",
              gap: 4,
              padding: 6,
              border: active ? "2px solid #0a3a8e" : "1px solid #d4d0c8",
              background: active ? "#eaf2ff" : "#fff",
              cursor: "pointer",
              minHeight: 60,
            }}
          >
            {renderWorkIcon(key, 24)}
            <span
              style={{
                fontSize: 10,
                color: active ? "#0a3a8e" : "#555",
                fontWeight: active ? 700 : 400,
                textAlign: "center",
                lineHeight: 1.1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {key.replace(/Icon$/, "")}
            </span>
          </button>
        );
      })}
    </div>
  );
}
