import type { Metadata } from "next";
import { Header } from "@/components/redesign/Header";
import { Footer } from "@/components/redesign/Footer";
import { WorkHeader } from "@/components/redesign/WorkHeader";
import { WorkGrid } from "@/components/redesign/WorkGrid";
import { ClosingCta } from "@/components/redesign/ClosingCta";
import { SmoothScrollProvider } from "@/components/redesign/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Work — Jermaya Leijen",
  description:
    "A rolling list of SEA projects, scripts, products and consulting engagements by Jermaya Leijen.",
};

export default function MyWorkPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main id="main" className="flex-1">
        <WorkHeader />
        <WorkGrid />
        <ClosingCta
          eyebrow="02 — LET'S TALK"
          title="Want one of these for your thing?"
          sub="Book 20 minutes and we'll figure out if I'm the right person to help."
        />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
