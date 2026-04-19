import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { WORK_PAGE_HEADER } from "@/lib/redesign-content";

export function WorkHeader() {
  return (
    <section className="pt-10 pb-10 md:pt-14 md:pb-14">
      <Container>
        <SectionLabel>{WORK_PAGE_HEADER.eyebrow}</SectionLabel>
        <h1 className="t-display-lg mt-8 max-w-[18ch]">
          {WORK_PAGE_HEADER.title}
        </h1>
        <p className="t-body-lg mt-6 max-w-[60ch] text-[var(--ink-muted)]">
          {WORK_PAGE_HEADER.intro}
        </p>
      </Container>
    </section>
  );
}
