import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { HandDrawnArrow } from "@/components/redesign/HandDrawnArrow";
import { HERO } from "@/lib/redesign-content";

export function Hero() {
  return (
    <section id="hello" className="pt-10 pb-16 md:pt-14 md:pb-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div className="relative">
            <SectionLabel>{HERO.eyebrow}</SectionLabel>

            {/* Personal greeting above the big headline */}
            <div className="mt-6 flex items-baseline gap-3">
              <span
                className="t-hand"
                style={{ fontSize: "1.75rem" }}
              >
                Hi, I&apos;m Jermaya.
              </span>
              <span className="t-meta text-[var(--ink-muted)] hidden sm:inline">
                (freelancer, Heesch NL)
              </span>
            </div>

            <h1 className="t-display-xl mt-4 text-[var(--ink)]">
              {HERO.headlineLines.map((line, i) => (
                <span
                  key={i}
                  className="block overflow-hidden pr-2"
                  style={{ lineHeight: 0.95 }}
                >
                  <span className="headline-line">{line}</span>
                </span>
              ))}
            </h1>
            <p className="t-body-lg mt-8 max-w-[60ch] text-[var(--ink-muted)]">
              {HERO.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={HERO.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {HERO.primaryCta.label}
                <ArrowUpRight size={18} strokeWidth={2} />
              </a>
              <a href={HERO.secondaryLink.href} className="ember-link t-body-sm">
                {HERO.secondaryLink.label}
              </a>
            </div>

            {/* Hand-drawn annotation from copy to portrait (desktop only) */}
            <div className="hidden md:block absolute right-[-110px] bottom-[140px] pointer-events-none">
              <HandDrawnArrow direction="down-right" className="w-24" />
              <span className="t-hand-sm absolute -top-6 -left-2 whitespace-nowrap">
                that&apos;s me →
              </span>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="aspect-[4/5] w-full overflow-hidden border-2 border-[var(--ink)] bg-[var(--surface)]">
              <Image
                src={HERO.portrait.src}
                alt={HERO.portrait.alt}
                width={500}
                height={620}
                priority
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 left-5 bg-[var(--paper)] px-3 py-1 border border-[var(--ink)]">
              <span className="t-meta text-[var(--ink-muted)]">
                Heesch, NL · {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
