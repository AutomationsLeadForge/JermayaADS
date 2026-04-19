import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  external?: boolean;
}

export function EmberLink({
  children,
  external,
  className,
  href,
  ...props
}: Props) {
  const isExternal = external ?? Boolean(href?.startsWith("http"));
  return (
    <a
      href={href}
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className={cn(
        "ember-link inline-flex items-baseline gap-1.5 font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
