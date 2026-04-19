import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container-wide", className)} {...props}>
      {children}
    </div>
  );
}
