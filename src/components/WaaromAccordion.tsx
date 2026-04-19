"use client";

import Image from "next/image";
import { useRef } from "react";
import { CheckCircleIcon, SliderLeftIcon, SliderRightIcon } from "@/components/icons";
import { PDF_SLIDES, WAAROM_BULLETS, WAAROM_COPY } from "@/lib/content";

export function WaaromAccordion() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-pdf-slide]");
    const step = slide ? slide.offsetWidth + 16 : el.clientWidth;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section className="w-full mb-[14px]">
      <div className="card-shadow w-full rounded-[10px] bg-[#34373c] p-[23px_18px]">
        <div className="grid grid-cols-2 max-[991px]:grid-cols-1 justify-between gap-[15px]">
          <div>
            <h4 className="mb-[10px] text-[14px] font-medium uppercase text-[#c073a2]">
              {WAAROM_COPY.contentTitle}
            </h4>
            <h2 className="mb-[19px] text-[20px] font-medium leading-snug">
              {WAAROM_COPY.title}
            </h2>
            <div>
              {WAAROM_BULLETS.map((b, i) => (
                <div
                  key={b.label}
                  className={
                    "grid grid-cols-[18px_1fr] items-center gap-[10px]" +
                    (i !== WAAROM_BULLETS.length - 1 ? " mb-[12px]" : "")
                  }
                >
                  <span className="inline-flex">
                    <CheckCircleIcon />
                  </span>
                  <span className="text-[14px]">{b.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-[26px] w-full rounded-[10px] bg-[#2b2d31] p-[13px_20px]">
              <h2 className="mb-[10px] text-[20px] font-medium">
                {WAAROM_COPY.noteTitle}
              </h2>
              {WAAROM_COPY.noteParagraphs.map((p) => (
                <div
                  key={p}
                  className="mb-[15px] text-[14px] text-[#c2c3c5] last:mb-0"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div
              ref={scrollerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto"
            >
              {PDF_SLIDES.map((slide) => (
                <a
                  key={slide.file}
                  data-pdf-slide
                  href={slide.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full shrink-0 snap-start"
                  aria-label={slide.title || "PDF"}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title || "PDF thumbnail"}
                    width={800}
                    height={1000}
                    className="w-full h-auto rounded-md object-cover"
                    sizes="(max-width: 991px) 100vw, 30vw"
                  />
                </a>
              ))}
            </div>
            <div className="mt-[18px] flex w-full items-center justify-between">
              <div>
                {PDF_SLIDES[0] && (
                  <a
                    href={PDF_SLIDES[0].file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-yellow inline-flex items-center justify-center gap-[6px] rounded-md px-[14px] py-[12px] text-[14px] font-semibold text-[rgba(97,74,12,0.8)]"
                  >
                    Download PDF
                  </a>
                )}
              </div>
              <div className="flex gap-[18px]">
                <button
                  type="button"
                  aria-label="Previous PDF"
                  onClick={() => scroll("prev")}
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#ffc72e] text-[#614a0ccc] transition-all"
                  style={{ boxShadow: "0 5px rgba(0,0,0,0.49)" }}
                >
                  <SliderLeftIcon className="h-auto w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next PDF"
                  onClick={() => scroll("next")}
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#ffc72e] text-[#614a0ccc] transition-all"
                  style={{ boxShadow: "0 5px rgba(0,0,0,0.49)" }}
                >
                  <SliderRightIcon className="h-auto w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
