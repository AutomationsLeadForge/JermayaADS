import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="t-meta text-[var(--ink)]">{children}</span>
      <span aria-hidden="true" className="section-rule" />
    </div>
  );
}
