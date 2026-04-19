import { HandDrawnArrow } from "@/components/redesign/HandDrawnArrow";

const CURRENTLY = [
  "Running Performance Max accounts for two e-com clients",
  "Shipping OrangePY v2",
  "Re-reading Obviously Awesome",
  "Coffee: Flair 58, Ethiopia naturals",
];

export function CurrentlyPanel() {
  return (
    <aside className="relative">
      <span
        aria-hidden="true"
        className="absolute -top-6 -left-4 hidden md:block t-hand-sm"
      >
        This week ↓
      </span>
      <div className="pinned-note">
        <div className="flex items-baseline gap-3">
          <span className="t-meta text-[var(--ink-muted)]">Currently</span>
          <span
            aria-hidden="true"
            className="t-hand-sm text-[var(--ember)] translate-y-0.5"
          >
            (no secret)
          </span>
        </div>
        <ul className="mt-4 space-y-2.5">
          {CURRENTLY.map((line, i) => (
            <li
              key={line}
              className="flex gap-3 t-body-sm text-[var(--ink)]"
            >
              <span className="t-mono-meta text-[var(--ink-muted)] shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <HandDrawnArrow
        direction="down-left"
        className="hidden md:block absolute -right-12 -bottom-6 rotate-[-15deg] w-20"
      />
    </aside>
  );
}
