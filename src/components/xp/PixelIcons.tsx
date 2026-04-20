import type { SVGProps } from "react";

/**
 * Pixel-art icons rendered as inline SVG with crispEdges.
 * Native grid is 32x32 — they stay sharp scaled up to 48/64.
 */

function Px({
  children,
  size = 32,
  viewBox = "0 0 32 32",
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      shapeRendering="crispEdges"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ==================== SYSTEM ICONS ==================== */

export function ComputerIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Monitor shadow */}
      <rect x="5" y="7" width="22" height="14" fill="#000" />
      <rect x="4" y="6" width="22" height="14" fill="#ece9d8" />
      {/* Screen */}
      <rect x="6" y="8" width="18" height="10" fill="#0058e6" />
      <rect x="6" y="8" width="18" height="1" fill="#74a9ff" />
      {/* Chart inside screen */}
      <rect x="8" y="14" width="2" height="2" fill="#3ba419" />
      <rect x="11" y="12" width="2" height="4" fill="#ffc72e" />
      <rect x="14" y="10" width="2" height="6" fill="#3ba419" />
      <rect x="17" y="13" width="2" height="3" fill="#ffc72e" />
      <rect x="20" y="11" width="2" height="5" fill="#3ba419" />
      {/* Neck + base */}
      <rect x="13" y="20" width="6" height="2" fill="#c8c2b0" />
      <rect x="9" y="22" width="14" height="3" fill="#ece9d8" />
      <rect x="8" y="25" width="16" height="2" fill="#808080" />
      {/* Tower */}
      <rect x="24" y="10" width="6" height="16" fill="#ece9d8" />
      <rect x="25" y="13" width="4" height="1" fill="#808080" />
      <rect x="25" y="15" width="2" height="2" fill="#3ba419" />
    </Px>
  );
}

export function FolderIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Tab */}
      <rect x="3" y="8" width="10" height="2" fill="#d4a747" />
      <rect x="3" y="10" width="12" height="2" fill="#f1c24c" />
      {/* Body */}
      <rect x="3" y="12" width="26" height="15" fill="#ffd47a" />
      <rect x="3" y="12" width="26" height="1" fill="#fff0b8" />
      <rect x="3" y="26" width="26" height="1" fill="#b88624" />
      <rect x="3" y="27" width="26" height="1" fill="#000" />
      {/* Sides */}
      <rect x="3" y="8" width="1" height="20" fill="#000" />
      <rect x="28" y="12" width="1" height="16" fill="#000" />
      <rect x="3" y="8" width="10" height="1" fill="#000" />
      <rect x="13" y="9" width="1" height="1" fill="#000" />
    </Px>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Page */}
      <rect x="6" y="3" width="16" height="26" fill="#fff" />
      <rect x="6" y="3" width="16" height="1" fill="#000" />
      <rect x="6" y="28" width="16" height="1" fill="#000" />
      <rect x="6" y="3" width="1" height="26" fill="#000" />
      <rect x="21" y="3" width="1" height="5" fill="#000" />
      <rect x="22" y="7" width="1" height="22" fill="#000" />
      {/* Corner fold */}
      <rect x="21" y="3" width="2" height="5" fill="#e8e4d4" />
      <rect x="21" y="7" width="1" height="1" fill="#000" />
      {/* Text lines */}
      <rect x="9" y="8" width="10" height="1" fill="#3a6ea5" />
      <rect x="9" y="11" width="10" height="1" fill="#808080" />
      <rect x="9" y="14" width="8" height="1" fill="#808080" />
      <rect x="9" y="17" width="10" height="1" fill="#808080" />
      <rect x="9" y="20" width="6" height="1" fill="#808080" />
      <rect x="9" y="23" width="10" height="1" fill="#808080" />
    </Px>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Envelope base */}
      <rect x="3" y="8" width="26" height="17" fill="#fff" />
      <rect x="3" y="8" width="26" height="1" fill="#000" />
      <rect x="3" y="24" width="26" height="1" fill="#000" />
      <rect x="3" y="8" width="1" height="17" fill="#000" />
      <rect x="28" y="8" width="1" height="17" fill="#000" />
      {/* Flap (diagonal pixels) */}
      <rect x="4" y="9" width="2" height="1" fill="#74a9ff" />
      <rect x="6" y="10" width="2" height="1" fill="#74a9ff" />
      <rect x="8" y="11" width="2" height="1" fill="#74a9ff" />
      <rect x="10" y="12" width="2" height="1" fill="#74a9ff" />
      <rect x="12" y="13" width="2" height="1" fill="#74a9ff" />
      <rect x="14" y="14" width="4" height="2" fill="#0058e6" />
      <rect x="18" y="13" width="2" height="1" fill="#74a9ff" />
      <rect x="20" y="12" width="2" height="1" fill="#74a9ff" />
      <rect x="22" y="11" width="2" height="1" fill="#74a9ff" />
      <rect x="24" y="10" width="2" height="1" fill="#74a9ff" />
      <rect x="26" y="9" width="2" height="1" fill="#74a9ff" />
      {/* Stamp corner */}
      <rect x="24" y="11" width="3" height="3" fill="#c62727" />
      <rect x="24" y="11" width="3" height="1" fill="#ff7070" />
    </Px>
  );
}

export function PaintIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Canvas frame */}
      <rect x="3" y="3" width="26" height="22" fill="#ece9d8" />
      <rect x="3" y="3" width="26" height="1" fill="#000" />
      <rect x="3" y="24" width="26" height="1" fill="#000" />
      <rect x="3" y="3" width="1" height="22" fill="#000" />
      <rect x="28" y="3" width="1" height="22" fill="#000" />
      <rect x="4" y="4" width="24" height="20" fill="#fff" />
      {/* Portrait-ish blob (Jermaya as pixel art!) */}
      <rect x="12" y="7" width="8" height="8" fill="#f1c27d" />
      <rect x="11" y="8" width="1" height="6" fill="#8b5a2b" />
      <rect x="20" y="8" width="1" height="6" fill="#8b5a2b" />
      <rect x="12" y="6" width="8" height="1" fill="#5b3c20" />
      <rect x="14" y="11" width="1" height="1" fill="#000" />
      <rect x="17" y="11" width="1" height="1" fill="#000" />
      <rect x="14" y="14" width="4" height="1" fill="#c62727" />
      {/* Body */}
      <rect x="9" y="15" width="14" height="8" fill="#ece9d8" />
      <rect x="11" y="17" width="10" height="6" fill="#3a6ea5" />
      {/* Paint splash */}
      <rect x="24" y="19" width="3" height="3" fill="#c62727" />
      <rect x="5" y="19" width="3" height="3" fill="#3ba419" />
      {/* Brush */}
      <rect x="22" y="26" width="6" height="2" fill="#8b5a2b" />
      <rect x="20" y="26" width="2" height="2" fill="#c62727" />
    </Px>
  );
}

export function RecycleIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Body */}
      <rect x="7" y="9" width="18" height="20" fill="#8b96b5" />
      <rect x="7" y="9" width="18" height="2" fill="#a8b4d0" />
      <rect x="7" y="27" width="18" height="2" fill="#5c6a87" />
      <rect x="7" y="9" width="1" height="20" fill="#000" />
      <rect x="24" y="9" width="1" height="20" fill="#000" />
      <rect x="7" y="28" width="18" height="1" fill="#000" />
      {/* Vertical ridges */}
      <rect x="10" y="11" width="1" height="16" fill="#5c6a87" />
      <rect x="13" y="11" width="1" height="16" fill="#5c6a87" />
      <rect x="16" y="11" width="1" height="16" fill="#5c6a87" />
      <rect x="19" y="11" width="1" height="16" fill="#5c6a87" />
      <rect x="22" y="11" width="1" height="16" fill="#5c6a87" />
      {/* Lid */}
      <rect x="5" y="7" width="22" height="2" fill="#a8b4d0" />
      <rect x="5" y="7" width="22" height="1" fill="#000" />
      <rect x="5" y="8" width="1" height="1" fill="#000" />
      <rect x="26" y="8" width="1" height="1" fill="#000" />
      {/* Handle */}
      <rect x="13" y="5" width="6" height="2" fill="#8b96b5" />
      <rect x="13" y="5" width="6" height="1" fill="#000" />
      {/* Green recycle arrows (custom!) */}
      <rect x="13" y="15" width="6" height="2" fill="#3ba419" />
      <rect x="15" y="13" width="2" height="6" fill="#3ba419" />
    </Px>
  );
}

export function StartFlagIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props} size={props.size ?? 22} viewBox="0 0 22 22">
      <rect x="2" y="3" width="8" height="7" fill="#ff3d1f" />
      <rect x="11" y="3" width="8" height="7" fill="#67ff1a" />
      <rect x="2" y="11" width="8" height="7" fill="#1a7fff" />
      <rect x="11" y="11" width="8" height="7" fill="#ffd319" />
      <rect x="2" y="3" width="17" height="1" fill="#000" />
      <rect x="2" y="10" width="17" height="1" fill="#000" />
      <rect x="2" y="17" width="17" height="1" fill="#000" />
      <rect x="2" y="3" width="1" height="15" fill="#000" />
      <rect x="10" y="3" width="1" height="15" fill="#000" />
      <rect x="18" y="3" width="1" height="15" fill="#000" />
    </Px>
  );
}

export function WorkIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Briefcase body */}
      <rect x="3" y="10" width="26" height="18" fill="#9b6b36" />
      <rect x="3" y="10" width="26" height="1" fill="#c89756" />
      <rect x="3" y="27" width="26" height="1" fill="#5c3c1a" />
      <rect x="3" y="10" width="1" height="18" fill="#000" />
      <rect x="28" y="10" width="1" height="18" fill="#000" />
      <rect x="3" y="28" width="26" height="1" fill="#000" />
      {/* Center seam */}
      <rect x="15" y="10" width="2" height="18" fill="#5c3c1a" />
      {/* Handle */}
      <rect x="11" y="6" width="10" height="1" fill="#000" />
      <rect x="10" y="7" width="1" height="3" fill="#000" />
      <rect x="21" y="7" width="1" height="3" fill="#000" />
      <rect x="11" y="7" width="10" height="1" fill="#9b6b36" />
      {/* Clasp + dots */}
      <rect x="14" y="16" width="4" height="3" fill="#ffd319" />
      <rect x="14" y="16" width="4" height="1" fill="#fff0b8" />
      <rect x="15" y="17" width="1" height="1" fill="#000" />
      <rect x="16" y="17" width="1" height="1" fill="#000" />
    </Px>
  );
}

export function ContactIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return <MailIcon {...props} />;
}

export function AboutIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Head */}
      <rect x="11" y="5" width="10" height="1" fill="#5b3c20" />
      <rect x="10" y="6" width="12" height="1" fill="#5b3c20" />
      <rect x="10" y="6" width="1" height="9" fill="#000" />
      <rect x="21" y="6" width="1" height="9" fill="#000" />
      <rect x="11" y="15" width="10" height="1" fill="#000" />
      <rect x="11" y="7" width="10" height="8" fill="#f1c27d" />
      <rect x="11" y="7" width="10" height="1" fill="#8b5a2b" />
      <rect x="13" y="11" width="1" height="1" fill="#000" />
      <rect x="18" y="11" width="1" height="1" fill="#000" />
      <rect x="14" y="13" width="4" height="1" fill="#c62727" />
      {/* Neck */}
      <rect x="14" y="16" width="4" height="2" fill="#d4a587" />
      {/* Body / shirt */}
      <rect x="6" y="18" width="20" height="10" fill="#0058e6" />
      <rect x="6" y="18" width="20" height="1" fill="#74a9ff" />
      <rect x="6" y="18" width="1" height="10" fill="#000" />
      <rect x="25" y="18" width="1" height="10" fill="#000" />
      <rect x="6" y="28" width="20" height="1" fill="#000" />
      {/* Collar */}
      <rect x="13" y="18" width="2" height="2" fill="#fff" />
      <rect x="17" y="18" width="2" height="2" fill="#fff" />
    </Px>
  );
}

/* ==================== CUSTOM TECH ICONS ==================== */

export function GoogleAdsIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Big "G" for Google Ads — blue + yellow triangle */}
      <rect x="4" y="4" width="24" height="24" fill="#fff" />
      <rect x="4" y="4" width="24" height="1" fill="#000" />
      <rect x="4" y="27" width="24" height="1" fill="#000" />
      <rect x="4" y="4" width="1" height="24" fill="#000" />
      <rect x="27" y="4" width="1" height="24" fill="#000" />
      {/* Yellow triangle */}
      <rect x="8" y="9" width="3" height="3" fill="#fbbc05" />
      <rect x="11" y="12" width="3" height="3" fill="#fbbc05" />
      <rect x="14" y="15" width="3" height="3" fill="#fbbc05" />
      <rect x="17" y="18" width="3" height="3" fill="#fbbc05" />
      <rect x="8" y="20" width="12" height="3" fill="#fbbc05" />
      {/* Green right angle */}
      <rect x="20" y="9" width="3" height="11" fill="#34a853" />
      <rect x="20" y="20" width="3" height="3" fill="#34a853" />
      {/* Blue pie */}
      <rect x="8" y="22" width="16" height="2" fill="#4285f4" />
      <rect x="10" y="24" width="12" height="2" fill="#4285f4" />
    </Px>
  );
}

export function PythonIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Blue top snake */}
      <rect x="10" y="4" width="12" height="10" fill="#3776ab" />
      <rect x="10" y="4" width="12" height="1" fill="#6ba4d8" />
      <rect x="10" y="4" width="1" height="10" fill="#000" />
      <rect x="21" y="4" width="1" height="10" fill="#000" />
      <rect x="10" y="4" width="12" height="1" fill="#000" />
      {/* Neck */}
      <rect x="4" y="14" width="24" height="6" fill="#3776ab" />
      <rect x="4" y="14" width="24" height="1" fill="#000" />
      {/* Eye dot white */}
      <rect x="13" y="7" width="2" height="2" fill="#fff" />
      {/* Yellow bottom snake */}
      <rect x="10" y="18" width="12" height="10" fill="#ffd43b" />
      <rect x="10" y="27" width="12" height="1" fill="#c49c0e" />
      <rect x="10" y="18" width="1" height="10" fill="#000" />
      <rect x="21" y="18" width="1" height="10" fill="#000" />
      <rect x="10" y="27" width="12" height="1" fill="#000" />
      {/* Bottom eye */}
      <rect x="17" y="23" width="2" height="2" fill="#fff" />
      {/* Body seam */}
      <rect x="4" y="19" width="24" height="1" fill="#000" />
      <rect x="4" y="14" width="1" height="6" fill="#000" />
      <rect x="27" y="14" width="1" height="6" fill="#000" />
    </Px>
  );
}

export function CoffeeIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Steam */}
      <rect x="10" y="2" width="2" height="3" fill="#c4c4c4" opacity="0.8" />
      <rect x="14" y="0" width="2" height="4" fill="#c4c4c4" opacity="0.8" />
      <rect x="18" y="2" width="2" height="3" fill="#c4c4c4" opacity="0.8" />
      {/* Mug body */}
      <rect x="5" y="8" width="18" height="18" fill="#ece9d8" />
      <rect x="5" y="8" width="18" height="1" fill="#000" />
      <rect x="5" y="25" width="18" height="1" fill="#000" />
      <rect x="5" y="8" width="1" height="18" fill="#000" />
      <rect x="22" y="8" width="1" height="18" fill="#000" />
      {/* Coffee surface */}
      <rect x="6" y="9" width="16" height="3" fill="#4a2f1a" />
      <rect x="6" y="9" width="16" height="1" fill="#6b4226" />
      {/* Handle */}
      <rect x="23" y="12" width="3" height="2" fill="#ece9d8" />
      <rect x="25" y="14" width="2" height="8" fill="#ece9d8" />
      <rect x="23" y="20" width="3" height="2" fill="#ece9d8" />
      <rect x="23" y="12" width="3" height="1" fill="#000" />
      <rect x="26" y="13" width="1" height="10" fill="#000" />
      <rect x="23" y="22" width="3" height="1" fill="#000" />
      {/* Heart on mug */}
      <rect x="11" y="16" width="2" height="2" fill="#c62727" />
      <rect x="15" y="16" width="2" height="2" fill="#c62727" />
      <rect x="10" y="18" width="8" height="2" fill="#c62727" />
      <rect x="11" y="20" width="6" height="1" fill="#c62727" />
      <rect x="12" y="21" width="4" height="1" fill="#c62727" />
      <rect x="13" y="22" width="2" height="1" fill="#c62727" />
    </Px>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Circle mask (chunky) */}
      <rect x="8" y="4" width="16" height="2" fill="#24292e" />
      <rect x="6" y="6" width="20" height="2" fill="#24292e" />
      <rect x="5" y="8" width="22" height="16" fill="#24292e" />
      <rect x="6" y="24" width="20" height="2" fill="#24292e" />
      <rect x="8" y="26" width="16" height="2" fill="#24292e" />
      {/* Outline */}
      <rect x="8" y="4" width="16" height="1" fill="#000" />
      <rect x="8" y="27" width="16" height="1" fill="#000" />
      <rect x="5" y="8" width="1" height="16" fill="#000" />
      <rect x="26" y="8" width="1" height="16" fill="#000" />
      {/* Eyes */}
      <rect x="11" y="11" width="3" height="4" fill="#fff" />
      <rect x="18" y="11" width="3" height="4" fill="#fff" />
      <rect x="12" y="12" width="1" height="2" fill="#24292e" />
      <rect x="19" y="12" width="1" height="2" fill="#24292e" />
      {/* Cat mouth / tail */}
      <rect x="14" y="17" width="4" height="1" fill="#fff" />
      <rect x="11" y="22" width="10" height="2" fill="#000" />
      {/* Tail */}
      <rect x="22" y="22" width="3" height="4" fill="#24292e" />
      <rect x="22" y="26" width="3" height="1" fill="#000" />
    </Px>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      <rect x="3" y="3" width="26" height="26" fill="#0077b5" />
      <rect x="3" y="3" width="26" height="1" fill="#0a93dd" />
      <rect x="3" y="28" width="26" height="1" fill="#005580" />
      <rect x="3" y="3" width="1" height="26" fill="#000" />
      <rect x="28" y="3" width="1" height="26" fill="#000" />
      {/* "in" */}
      <rect x="7" y="9" width="3" height="3" fill="#fff" />
      <rect x="7" y="14" width="3" height="10" fill="#fff" />
      <rect x="13" y="14" width="3" height="10" fill="#fff" />
      <rect x="16" y="14" width="3" height="3" fill="#fff" />
      <rect x="19" y="17" width="3" height="7" fill="#fff" />
    </Px>
  );
}

export function CaseStudiesIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Page body */}
      <rect x="5" y="3" width="18" height="26" fill="#fff" />
      <rect x="5" y="3" width="18" height="1" fill="#000" />
      <rect x="5" y="28" width="18" height="1" fill="#000" />
      <rect x="5" y="3" width="1" height="26" fill="#000" />
      <rect x="22" y="3" width="1" height="5" fill="#000" />
      <rect x="23" y="7" width="1" height="22" fill="#000" />
      {/* Corner fold */}
      <rect x="22" y="3" width="2" height="5" fill="#e8e4d4" />
      <rect x="22" y="7" width="1" height="1" fill="#000" />
      {/* Title lines */}
      <rect x="8" y="6" width="10" height="1" fill="#002a7b" />
      <rect x="8" y="8" width="7" height="1" fill="#808080" />
      {/* Chart baseline */}
      <rect x="8" y="24" width="12" height="1" fill="#000" />
      {/* Ascending bars */}
      <rect x="9" y="20" width="2" height="4" fill="#c62727" />
      <rect x="12" y="17" width="2" height="7" fill="#ffb000" />
      <rect x="15" y="14" width="2" height="10" fill="#3ba419" />
      <rect x="18" y="11" width="2" height="13" fill="#0058e6" />
      {/* Arrow up on top-right of chart */}
      <rect x="24" y="18" width="4" height="1" fill="#3ba419" />
      <rect x="25" y="17" width="3" height="1" fill="#3ba419" />
      <rect x="26" y="16" width="2" height="1" fill="#3ba419" />
      <rect x="27" y="15" width="1" height="1" fill="#3ba419" />
    </Px>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      <rect x="4" y="6" width="24" height="24" fill="#fff" />
      <rect x="4" y="6" width="24" height="5" fill="#c62727" />
      <rect x="4" y="6" width="24" height="1" fill="#000" />
      <rect x="4" y="29" width="24" height="1" fill="#000" />
      <rect x="4" y="6" width="1" height="24" fill="#000" />
      <rect x="27" y="6" width="1" height="24" fill="#000" />
      {/* Rings */}
      <rect x="9" y="3" width="2" height="6" fill="#808080" />
      <rect x="21" y="3" width="2" height="6" fill="#808080" />
      <rect x="9" y="3" width="2" height="1" fill="#000" />
      <rect x="21" y="3" width="2" height="1" fill="#000" />
      {/* Date grid */}
      <rect x="7" y="14" width="2" height="2" fill="#808080" />
      <rect x="11" y="14" width="2" height="2" fill="#808080" />
      <rect x="15" y="14" width="2" height="2" fill="#808080" />
      <rect x="19" y="14" width="2" height="2" fill="#808080" />
      <rect x="23" y="14" width="2" height="2" fill="#808080" />
      <rect x="7" y="18" width="2" height="2" fill="#808080" />
      <rect x="11" y="18" width="2" height="2" fill="#0058e6" />
      <rect x="15" y="18" width="2" height="2" fill="#808080" />
      <rect x="19" y="18" width="2" height="2" fill="#808080" />
      <rect x="23" y="18" width="2" height="2" fill="#808080" />
      <rect x="7" y="22" width="2" height="2" fill="#808080" />
      <rect x="11" y="22" width="2" height="2" fill="#808080" />
      <rect x="15" y="22" width="2" height="2" fill="#808080" />
      <rect x="19" y="22" width="2" height="2" fill="#808080" />
      <rect x="23" y="22" width="2" height="2" fill="#808080" />
    </Px>
  );
}
