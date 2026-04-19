"use client";

import Image from "next/image";
import { useRef } from "react";
import { FolderIcon, SliderLeftIcon, SliderRightIcon } from "@/components/icons";
import { PORTFOLIO_SLIDES } from "@/lib/content";

export function PortfolioSlider() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    const step = slide ? slide.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <div className="card-hover-border card-shadow flex w-full flex-col gap-5 rounded-[10px] bg-[#34373c] p-[18px_20px_14px]">
      <div className="flex items-center justify-between gap-[15px]">
        <div className="flex items-center gap-[10px] text-[18px] max-[1199px]:text-[15px] font-medium">
          <FolderIcon className="w-[25px] h-auto max-[1199px]:w-[20px]" />
          PORTFOLIO
        </div>
        <div className="flex gap-[18px]">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll("prev")}
            className="btn-dark-round flex items-center justify-center aspect-square w-[48px] max-[1199px]:w-[40px]"
          >
            <SliderLeftIcon className="w-4 h-auto" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll("next")}
            className="btn-dark-round flex items-center justify-center aspect-square w-[48px] max-[1199px]:w-[40px]"
          >
            <SliderRightIcon className="w-4 h-auto" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {PORTFOLIO_SLIDES.map((slide) => (
            <div
              key={slide.src}
              data-slide
              className="w-full shrink-0 snap-start"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={800}
                height={500}
                className="w-full h-auto rounded-[10px] object-cover"
                sizes="(max-width: 991px) 100vw, 40vw"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
