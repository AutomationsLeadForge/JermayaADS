"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ServicesIcon } from "@/components/icons";
import { SERVICE_LOGOS } from "@/lib/content";

const TEXT =
  "Altijd eager om te leren en te ontdekken. Voor mijn klanten en voor mijn eigen projecten. Eerlijk en oprecht, korte lijntjes en doorpakken. Benieuwd waarin ik je kan helpen?";

export function ServicesBlock() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((p) => (p + 1) % SERVICE_LOGOS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card-hover-border card-shadow rhombus-decor flex flex-col gap-[30px] rounded-[10px] bg-[#34373c] p-[20px_19px_30px]">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center text-[18px] max-[1199px]:text-[15px] font-medium">
          <span className="me-[13px] inline-flex">
            <ServicesIcon className="h-auto w-[22px] max-[1199px]:w-[18px]" />
          </span>
          DIENSTEN
        </div>
        <div
          className="relative aspect-square w-[30px] max-[575px]:w-[20px] overflow-hidden"
          aria-hidden="true"
        >
          {SERVICE_LOGOS.map((logo, i) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={60}
              height={60}
              className={cn(
                "absolute inset-0 aspect-square w-full transition-all duration-300 ease-in-out",
                i === idx
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-0 opacity-0 h-0 -z-10",
              )}
            />
          ))}
        </div>
      </div>
      <p className="mb-[15px] text-[14px] leading-[1.786]">{TEXT}</p>
    </div>
  );
}
