"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DotsGridIcon, TargetIcon } from "@/components/icons";
import { CyclingText } from "@/components/CyclingText";
import { AreaPopup } from "@/components/AreaPopup";
import {
  AREA_BLOCK_LABEL,
  AREA_SWITCHES,
  HERO_BUTTONS,
  ROLE_TITLES,
  type HeroButtonId,
} from "@/lib/content";

interface Props {
  activeAccordion: HeroButtonId | null;
  onToggleAccordion: (id: HeroButtonId) => void;
}

export function ProfileCard({ activeAccordion, onToggleAccordion }: Props) {
  const [openArea, setOpenArea] = useState<string | null>(null);
  const activePopup = AREA_SWITCHES.find((s) => s.id === openArea);

  return (
    <div className="h-full rounded-[10px] bg-[#c073a2] card-shadow">
      {/* Card head */}
      <div className="flex items-center justify-between gap-[10px] p-[14px] border-b border-[rgba(39,44,48,0.39)]">
        <div className="flex items-center gap-[10px]">
          <span className="inline-flex">
            <TargetIcon className="w-[25px] h-auto max-[1199px]:w-5" />
          </span>
          <p className="mb-0 text-[18px] max-[1199px]:text-[14px] font-medium uppercase">
            JERMAYA LEIJEN
          </p>
        </div>
        <span className="inline-flex">
          <DotsGridIcon className="h-auto w-[22px] max-[1199px]:w-[18px]" />
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-5 p-[11px_14px]">
        {/* Profile block */}
        <div className="rounded-[10px] bg-[#1d1d1d] pt-[11px] pb-[17px] px-[10px]">
          <div className="text-center">
            <Image
              src="/images/jermayaleijen.png"
              alt="Jermaya Leijen"
              width={400}
              height={400}
              priority
              className="mx-auto inline-block w-[38.284%] max-w-[129px] animate-zoom-loop"
              style={{ height: "auto" }}
            />
          </div>
          <div className="relative overflow-hidden mt-2">
            <CyclingText items={ROLE_TITLES} />
          </div>
        </div>

        {/* Contact slider block (simplified: single yellow button) */}
        <div className="rounded-[9px] bg-[rgba(0,0,0,0.14)] p-[11px_14px]">
          <a
            href="https://wa.me/+31623963836"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow block w-full rounded-md px-[14px] py-[15px] text-center text-[18px] max-[1199px]:text-[14px] max-[1199px]:py-[10px] font-semibold"
          >
            CONTACT
          </a>
        </div>

        {/* Area block */}
        <div className="relative rounded-[9px] bg-[rgba(0,0,0,0.14)] p-[18px_15px]">
          <div className="mb-[14px] text-[15px] max-[1199px]:text-[13px] font-medium text-white/70">
            {AREA_BLOCK_LABEL}
          </div>
          <div className="grid grid-cols-1 gap-[10px]">
            {AREA_SWITCHES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setOpenArea(s.id)}
                className="flex items-center justify-between gap-[10px] rounded-[9px] bg-[#c073a2] p-[17px_12px] text-left transition-colors hover:bg-[#875172]"
              >
                <span className="text-[14px] max-[1199px]:text-[12px] font-semibold text-white">
                  {s.label}
                </span>
                <span
                  className="inline-flex shrink-0 items-center"
                  aria-hidden="true"
                >
                  <span
                    className="relative inline-block h-9 w-[60px] max-[1199px]:h-7 max-[1199px]:w-[50px] rounded-full"
                    style={{ backgroundColor: "rgba(0,0,0,0.14)" }}
                  >
                    <span className="absolute top-1/2 left-1 h-[calc(100%-8px)] aspect-square -translate-y-1/2 rounded-full bg-white transition-all" />
                  </span>
                </span>
              </button>
            ))}
          </div>
          {activePopup && (
            <AreaPopup
              open={openArea !== null}
              onClose={() => setOpenArea(null)}
              title={activePopup.popupTitle}
            >
              <p className="text-[14px]">{activePopup.popupText}</p>
            </AreaPopup>
          )}
        </div>
      </div>

      {/* Card bottom */}
      <div className="rounded-b-[inherit] px-[16px] pt-[6px] pb-[19px]">
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 py-[5px]">
          {HERO_BUTTONS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => onToggleAccordion(b.id)}
              aria-expanded={activeAccordion === b.id}
              className={cn("btn-yellow-sm", activeAccordion === b.id && "translate-y-[4px]")}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
