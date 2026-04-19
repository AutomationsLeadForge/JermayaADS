import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type Direction = "down-right" | "up-right" | "right" | "down-left";

interface Props extends SVGProps<SVGSVGElement> {
  direction?: Direction;
}

const PATHS: Record<Direction, string> = {
  "down-right":
    "M6 8 C 20 22, 44 26, 70 44 M 66 30 L 78 48 L 56 50",
  "up-right":
    "M8 72 C 22 58, 46 52, 76 34 M 60 24 L 80 30 L 70 50",
  right:
    "M6 40 C 24 32, 48 32, 84 40 M 72 28 L 86 40 L 72 52",
  "down-left":
    "M88 8 C 64 22, 40 28, 10 50 M 20 36 L 8 52 L 30 54",
};

export function HandDrawnArrow({
  direction = "down-right",
  className,
  ...props
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="64"
      viewBox="0 0 96 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("text-[var(--ember)]", className)}
      {...props}
    >
      <path
        d={PATHS[direction]}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
