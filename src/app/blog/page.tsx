import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/redesign/Header";
import { Footer } from "@/components/redesign/Footer";
import { Container } from "@/components/redesign/Container";
import { SectionLabel } from "@/components/redesign/SectionLabel";
import { ClosingCta } from "@/components/redesign/ClosingCta";
import { SmoothScrollProvider } from "@/components/redesign/SmoothScrollProvider";
import { BLOG_POSTS } from "@/lib/redesign-content";

export const metadata: Metadata = {
  title: "Blog — Jermaya Leijen",
  description:
    "Notes on Google Ads, automation, AI engineering, tracking and programmatic SEO from Jermaya Leijen.",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main id="main" className="flex-1">
        <section className="pt-10 pb-8 md:pt-14">
          <Container>
            <SectionLabel>01 — BLOG</SectionLabel>
            <h1 className="t-display-lg mt-8 max-w-[24ch]">
              {BLOG_POSTS.length} notes on SEA, AI, and automation.
            </h1>
            <p className="t-body-lg mt-6 max-w-[60ch] text-[var(--ink-muted)]">
              Most posts are on the Dutch blog at jermayads.nl — topics range
              from Performance Max to RAG content pipelines. Click through to
              read the full post.
            </p>
          </Container>
        </section>

        <section className="pb-16">
          <Container>
            <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {BLOG_POSTS.map((post) => (
                <li key={post.slug} className="group">
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[100px_1fr_auto] items-center gap-6 py-5 transition-colors hover:bg-[var(--surface)] md:grid-cols-[120px_120px_1fr_auto] md:gap-8"
                  >
                    <span className="t-mono-meta text-[var(--ink-muted)]">
                      {formatDate(post.date)}
                    </span>
                    <span className="t-meta text-[var(--ink-muted)] hidden md:block">
                      {post.tag}
                    </span>
                    <span className="t-display-sm md:text-[22px] text-[var(--ink)] leading-snug">
                      {post.title}
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2}
                      className="text-[var(--ember)] transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <ClosingCta
          eyebrow="02 — LET'S TALK"
          title="Got a post idea, a typo, or a question?"
          sub="The blog is one-way; WhatsApp and email are not. Both are open."
        />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
