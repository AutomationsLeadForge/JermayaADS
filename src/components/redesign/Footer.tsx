import Image from "next/image";
import { Container } from "@/components/redesign/Container";
import { FOOTER, SITE_META } from "@/lib/redesign-content";

export function Footer() {
  const tickerLoop = [...FOOTER.tickerItems, ...FOOTER.tickerItems];

  return (
    <footer className="mt-24 border-t border-[var(--rule)] bg-[var(--paper)]">
      {/* Ticker */}
      <div className="overflow-hidden border-b border-[var(--rule)] py-5">
        <div className="ticker-row t-meta text-[var(--ink-muted)]">
          {tickerLoop.map((item, i) => (
            <span key={i} className="whitespace-nowrap pr-10">
              {item}
              <span aria-hidden="true" className="pl-10 text-[var(--ember)]">
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Columns */}
      <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-3">
        <div>
          <div className="font-[var(--font-display)] text-[40px] leading-none font-medium">
            {SITE_META.wordmark}
          </div>
          <p className="mt-4 t-body-sm text-[var(--ink-muted)] max-w-[40ch]">
            {SITE_META.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="t-meta text-[var(--ink-muted)]">Navigate</span>
          {FOOTER.columns.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="t-body text-[var(--ink)] hover:text-[var(--ember)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="t-meta text-[var(--ink-muted)]">Contact</span>
          <div className="flex gap-3">
            {FOOTER.columns.contact.map((tile) => (
              <a
                key={tile.id}
                href={tile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tile.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
              >
                <Image
                  src={tile.image}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* Personal P.S. strip */}
      <Container className="border-t border-[var(--rule)] py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <span className="t-hand text-[var(--ember)]">
            {FOOTER.ps}
          </span>
          <span className="t-body-sm text-[var(--ink-muted)]">
            {FOOTER.offTheClock}
          </span>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-[var(--rule)] py-6 md:flex-row md:items-center md:justify-between">
        <span className="t-meta text-[var(--ink-muted)]">
          {SITE_META.copyright}
        </span>
        <span className="t-meta text-[var(--ink-muted)]">
          {SITE_META.buildLine}
        </span>
      </Container>
    </footer>
  );
}
