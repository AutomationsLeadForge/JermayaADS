import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/redesign/Header";
import { Footer } from "@/components/redesign/Footer";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { MetricChip } from "@/components/redesign/MetricChip";
import { SmoothScrollProvider } from "@/components/redesign/SmoothScrollProvider";
import { AUDIT_OFFER, TESTIMONIALS } from "@/lib/redesign-content";

export const metadata: Metadata = {
  title: "SEA Audit — Jermaya Leijen",
  description:
    "A paid, two-week Google Ads audit. Strategy, tracking, automation, and a 90-day plan — not a tool export.",
};

export default function AuditPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="pt-10 pb-16 md:pt-14 md:pb-20">
          <Container>
            <SectionLabel>{AUDIT_OFFER.eyebrow}</SectionLabel>
            <h1 className="t-display-xl mt-8 max-w-[20ch] text-[var(--ink)]">
              {AUDIT_OFFER.title}
            </h1>
            <p className="t-body-lg mt-6 max-w-[60ch] text-[var(--ink-muted)]">
              {AUDIT_OFFER.sub}
            </p>
            <p className="t-body mt-6 font-medium text-[var(--ember)]">
              {AUDIT_OFFER.priceLine}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={AUDIT_OFFER.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {AUDIT_OFFER.ctaLabel}
                <ArrowUpRight size={18} strokeWidth={2} />
              </a>
            </div>
          </Container>
        </section>

        {/* Authority */}
        <section className="section-y border-t border-[var(--rule)]">
          <Container>
            <SectionLabel>02 — TRACK RECORD</SectionLabel>
            <h2 className="t-display-md mt-8 max-w-[22ch]">
              {AUDIT_OFFER.authority.headline}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {AUDIT_OFFER.authority.stats.map((s) => (
                <MetricChip key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section className="section-y border-t border-[var(--rule)]">
          <Container>
            <SectionLabel>03 — HOW IT WORKS</SectionLabel>
            <h2 className="t-display-md mt-8 max-w-[22ch]">
              Four steps, three weeks wall-clock.
            </h2>
            <ol className="mt-12 grid grid-cols-1 divide-y divide-[var(--rule)] border-y border-[var(--rule)] md:grid-cols-4 md:divide-y-0 md:divide-x">
              {AUDIT_OFFER.process.map((step) => (
                <li key={step.number} className="flex flex-col gap-4 p-8">
                  <span className="t-mono-meta text-[var(--ink-muted)]">
                    {step.number}
                  </span>
                  <h3 className="t-display-sm">{step.label}</h3>
                  <p className="t-body-sm text-[var(--ink-muted)]">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* FAQ */}
        <section className="section-y border-t border-[var(--rule)]">
          <Container>
            <SectionLabel>04 — WHAT YOU GET</SectionLabel>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
              {AUDIT_OFFER.faqs.map((faq) => (
                <div key={faq.label}>
                  <h3 className="t-meta text-[var(--ember)]">{faq.label}</h3>
                  <p className="t-body mt-4 text-[var(--ink)]">{faq.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonial quote */}
        <section className="section-y border-t border-[var(--rule)] bg-[var(--surface)]">
          <Container>
            <SectionLabel>05 — PROOF</SectionLabel>
            <blockquote className="mt-10 max-w-[40ch] t-display-md">
              &ldquo;{TESTIMONIALS[1].quote}&rdquo;
            </blockquote>
            <p className="mt-6 t-meta text-[var(--ink-muted)]">
              — {TESTIMONIALS[1].author}, {TESTIMONIALS[1].company}
            </p>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="section-y border-t border-[var(--rule)]">
          <Container>
            <SectionLabel>06 — BOOK THE AUDIT</SectionLabel>
            <h2 className="t-display-lg mt-8 max-w-[22ch]">
              Twenty minutes to scope it. Three weeks to deliver it.
            </h2>
            <div className="mt-10">
              <a
                href={AUDIT_OFFER.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {AUDIT_OFFER.ctaLabel}
                <ArrowUpRight size={18} strokeWidth={2} />
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
