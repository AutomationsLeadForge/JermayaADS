import type { Metadata } from "next";
import { Header } from "@/components/redesign/Header";
import { Footer } from "@/components/redesign/Footer";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { ClosingCta } from "@/components/redesign/ClosingCta";
import { SmoothScrollProvider } from "@/components/redesign/SmoothScrollProvider";
import { TOOLING_PARTNERS } from "@/lib/redesign-content";

export const metadata: Metadata = {
  title: "Tooling — Jermaya Leijen",
  description:
    "The SaaS, scripts and partner platforms I use to scale Google Ads, automate ops, and track profit instead of vanity metrics.",
};

export default function ToolingPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="pt-10 pb-12 md:pt-14 md:pb-16">
          <Container>
            <SectionLabel>01 — TOOLING</SectionLabel>
            <h1 className="t-display-lg mt-8 max-w-[22ch]">
              The stack. Honestly opinionated.
            </h1>
            <p className="t-body-lg mt-6 max-w-[60ch] text-[var(--ink-muted)]">
              I don&apos;t get paid to recommend tools I don&apos;t use. This
              is the set I actively run for clients and my own projects —
              grouped by what they replace (manual work, spreadsheets, or
              spray-and-pray attribution).
            </p>
          </Container>
        </section>

        {/* Grid */}
        <section className="pb-16">
          <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TOOLING_PARTNERS.map((partner) => (
                <article
                  key={partner.id}
                  className="flex flex-col gap-4 border border-[var(--ink)] bg-[var(--paper)] p-6 transition-colors hover:bg-[var(--surface)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="t-meta text-[var(--ink-muted)]">
                      {partner.categoryLabel}
                    </span>
                    {partner.partnerBadge ? (
                      <span className="rounded-sm border border-[var(--ember)] px-2 py-0.5 t-meta text-[var(--ember)]">
                        {partner.partnerBadge}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="t-display-sm text-[var(--ink)]">
                    {partner.name}
                  </h2>
                  <p className="t-body-sm text-[var(--ink-muted)]">
                    {partner.summary}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {partner.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 t-body-sm">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-[3px] w-[10px] bg-[var(--ember)] shrink-0"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <ClosingCta
          eyebrow="02 — INTEGRATION"
          title="Want one of these wired into your account?"
          sub="Setup, onboarding and the decision trees that make each tool worth its monthly bill — that's the engagement."
        />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
