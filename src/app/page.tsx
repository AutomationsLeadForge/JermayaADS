"use client";

import { useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { ActionCard } from "@/components/ActionCard";
import { InfoBlock } from "@/components/InfoBlock";
import { ExperienceAccordion } from "@/components/ExperienceAccordion";
import { RoadmapAccordion } from "@/components/RoadmapAccordion";
import { WaaromAccordion } from "@/components/WaaromAccordion";
import { Footer } from "@/components/Footer";
import { FloatingNav } from "@/components/FloatingNav";
import type { HeroButtonId } from "@/lib/content";

export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<HeroButtonId | null>(null);
  const toggle = (id: HeroButtonId) =>
    setActiveAccordion((prev) => (prev === id ? null : id));

  return (
    <>
      <main className="jml-container pb-[140px]">
        <div className="layout-grid">
          <div className="min-w-0">
            <ProfileCard
              activeAccordion={activeAccordion}
              onToggleAccordion={toggle}
            />
          </div>
          <div className="min-w-0">
            <ActionCard />
          </div>
          <div className="min-w-0">
            <InfoBlock />
          </div>
        </div>

        {activeAccordion === "ervaring" && <ExperienceAccordion />}
        {activeAccordion === "roadmap" && <RoadmapAccordion />}
        {activeAccordion === "waarom" && <WaaromAccordion />}

        <Footer />
      </main>
      <FloatingNav />
    </>
  );
}
