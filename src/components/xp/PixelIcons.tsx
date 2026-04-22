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

export function NotepadIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Spiral binding (dots) */}
      <rect x="8" y="2" width="2" height="2" fill="#808080" />
      <rect x="14" y="2" width="2" height="2" fill="#808080" />
      <rect x="20" y="2" width="2" height="2" fill="#808080" />
      {/* Top red header */}
      <rect x="5" y="4" width="22" height="3" fill="#c62727" />
      <rect x="5" y="4" width="22" height="1" fill="#ff6a6a" />
      {/* Paper */}
      <rect x="5" y="7" width="22" height="22" fill="#fffbe6" />
      {/* Black frame */}
      <rect x="5" y="4" width="22" height="1" fill="#000" />
      <rect x="5" y="28" width="22" height="1" fill="#000" />
      <rect x="4" y="4" width="1" height="25" fill="#000" />
      <rect x="27" y="4" width="1" height="25" fill="#000" />
      {/* Red vertical margin line */}
      <rect x="8" y="8" width="1" height="20" fill="#c62727" />
      {/* Ruled blue lines */}
      <rect x="10" y="11" width="15" height="1" fill="#6aa8ff" />
      <rect x="10" y="15" width="15" height="1" fill="#6aa8ff" />
      <rect x="10" y="19" width="13" height="1" fill="#6aa8ff" />
      <rect x="10" y="23" width="15" height="1" fill="#6aa8ff" />
      {/* Ink on lines */}
      <rect x="10" y="10" width="6" height="1" fill="#000" />
      <rect x="10" y="14" width="10" height="1" fill="#000" />
      <rect x="10" y="18" width="4" height="1" fill="#000" />
      <rect x="10" y="22" width="8" height="1" fill="#000" />
    </Px>
  );
}

export function StatsIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Monitor frame */}
      <rect x="2" y="4" width="28" height="21" fill="#ece9d8" />
      <rect x="2" y="4" width="28" height="1" fill="#fff" />
      <rect x="2" y="24" width="28" height="1" fill="#808080" />
      <rect x="2" y="4" width="1" height="21" fill="#fff" />
      <rect x="29" y="4" width="1" height="21" fill="#808080" />
      {/* Screen */}
      <rect x="4" y="6" width="24" height="17" fill="#0a3a8e" />
      {/* Top bar on screen */}
      <rect x="4" y="6" width="24" height="2" fill="#1f5dd0" />
      {/* 2x2 dashboard tiles inside */}
      <rect x="6" y="10" width="9" height="5" fill="#ffd319" />
      <rect x="17" y="10" width="9" height="5" fill="#c62727" />
      <rect x="6" y="16" width="9" height="5" fill="#3ba419" />
      <rect x="17" y="16" width="9" height="5" fill="#ffffff" />
      {/* Pixel numbers / bars inside tiles */}
      <rect x="8" y="12" width="5" height="1" fill="#000" />
      <rect x="8" y="14" width="3" height="1" fill="#000" />
      <rect x="19" y="12" width="5" height="1" fill="#fff" />
      <rect x="19" y="14" width="3" height="1" fill="#fff" />
      <rect x="8" y="18" width="5" height="1" fill="#fff" />
      <rect x="8" y="20" width="3" height="1" fill="#fff" />
      <rect x="19" y="18" width="5" height="1" fill="#0a3a8e" />
      <rect x="19" y="20" width="3" height="1" fill="#0a3a8e" />
      {/* Stand */}
      <rect x="14" y="25" width="4" height="2" fill="#c8c2b0" />
      <rect x="10" y="27" width="12" height="2" fill="#ece9d8" />
      <rect x="10" y="29" width="12" height="1" fill="#808080" />
    </Px>
  );
}

export function GameIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Gamepad body */}
      <rect x="3" y="11" width="26" height="12" fill="#2b2b2b" />
      <rect x="3" y="11" width="26" height="1" fill="#555" />
      <rect x="3" y="22" width="26" height="1" fill="#111" />
      {/* Rounded shoulders */}
      <rect x="1" y="13" width="2" height="8" fill="#2b2b2b" />
      <rect x="29" y="13" width="2" height="8" fill="#2b2b2b" />
      <rect x="5" y="9" width="6" height="2" fill="#2b2b2b" />
      <rect x="21" y="9" width="6" height="2" fill="#2b2b2b" />
      {/* D-pad */}
      <rect x="6" y="15" width="6" height="2" fill="#d9d9d9" />
      <rect x="8" y="13" width="2" height="6" fill="#d9d9d9" />
      <rect x="6" y="15" width="1" height="2" fill="#fff" />
      <rect x="8" y="13" width="2" height="1" fill="#fff" />
      {/* Center screen/logo */}
      <rect x="14" y="15" width="4" height="2" fill="#0058e6" />
      <rect x="14" y="15" width="4" height="1" fill="#74a9ff" />
      {/* A / B buttons */}
      <rect x="20" y="14" width="3" height="3" fill="#c62727" />
      <rect x="24" y="16" width="3" height="3" fill="#3ba419" />
      <rect x="20" y="14" width="3" height="1" fill="#ff5a5a" />
      <rect x="24" y="16" width="3" height="1" fill="#7be063" />
      {/* Cable stub */}
      <rect x="15" y="23" width="2" height="3" fill="#111" />
      <rect x="13" y="26" width="6" height="2" fill="#555" />
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

export function KeyIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Ring */}
      <rect x="6" y="10" width="10" height="10" fill="#ffd94a" />
      <rect x="7" y="11" width="8" height="8" fill="#e6a800" />
      <rect x="9" y="13" width="4" height="4" fill="#ece9d8" />
      <rect x="6" y="10" width="10" height="1" fill="#000" />
      <rect x="6" y="19" width="10" height="1" fill="#000" />
      <rect x="6" y="10" width="1" height="10" fill="#000" />
      <rect x="15" y="10" width="1" height="10" fill="#000" />
      {/* Shaft */}
      <rect x="16" y="14" width="10" height="2" fill="#ffd94a" />
      <rect x="16" y="16" width="10" height="1" fill="#e6a800" />
      <rect x="16" y="14" width="10" height="1" fill="#000" />
      <rect x="16" y="17" width="10" height="1" fill="#000" />
      {/* Teeth */}
      <rect x="22" y="17" width="2" height="3" fill="#ffd94a" />
      <rect x="22" y="19" width="2" height="1" fill="#000" />
      <rect x="25" y="17" width="1" height="2" fill="#ffd94a" />
      <rect x="25" y="18" width="1" height="1" fill="#000" />
    </Px>
  );
}

export function AdminIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Shield */}
      <rect x="8" y="6" width="16" height="14" fill="#0a3a8e" />
      <rect x="7" y="7" width="1" height="12" fill="#0a3a8e" />
      <rect x="24" y="7" width="1" height="12" fill="#0a3a8e" />
      {/* Shield tip */}
      <rect x="10" y="20" width="12" height="2" fill="#0a3a8e" />
      <rect x="12" y="22" width="8" height="2" fill="#0a3a8e" />
      <rect x="14" y="24" width="4" height="2" fill="#0a3a8e" />
      {/* Highlight */}
      <rect x="8" y="6" width="16" height="1" fill="#5a9cff" />
      <rect x="8" y="6" width="1" height="12" fill="#5a9cff" />
      {/* Star */}
      <rect x="15" y="9" width="2" height="6" fill="#ffd94a" />
      <rect x="13" y="11" width="6" height="2" fill="#ffd94a" />
      <rect x="14" y="10" width="4" height="4" fill="#ffd94a" />
      <rect x="12" y="12" width="1" height="1" fill="#ffd94a" />
      <rect x="19" y="12" width="1" height="1" fill="#ffd94a" />
      {/* Outline */}
      <rect x="8" y="5" width="16" height="1" fill="#000" />
      <rect x="7" y="6" width="1" height="14" fill="#000" />
      <rect x="24" y="6" width="1" height="14" fill="#000" />
    </Px>
  );
}

/* ==================== PROJECT ICONS ==================== */

// 01 · Flavor Press — newspaper with AI sparkle
export function NewspaperAIIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Page */}
      <rect x="3" y="6" width="26" height="22" fill="#fff" />
      <rect x="3" y="6" width="26" height="1" fill="#000" />
      <rect x="3" y="27" width="26" height="1" fill="#000" />
      <rect x="3" y="6" width="1" height="22" fill="#000" />
      <rect x="28" y="6" width="1" height="22" fill="#000" />
      {/* Masthead */}
      <rect x="5" y="8" width="22" height="3" fill="#0a3a8e" />
      <rect x="5" y="8" width="22" height="1" fill="#3a6ea5" />
      {/* Column split */}
      <rect x="16" y="12" width="1" height="14" fill="#c0c0c0" />
      {/* Left text lines */}
      <rect x="6" y="13" width="9" height="1" fill="#000" />
      <rect x="6" y="15" width="9" height="1" fill="#808080" />
      <rect x="6" y="17" width="7" height="1" fill="#808080" />
      <rect x="6" y="19" width="9" height="1" fill="#808080" />
      <rect x="6" y="21" width="8" height="1" fill="#808080" />
      <rect x="6" y="23" width="9" height="1" fill="#808080" />
      {/* Right image + lines */}
      <rect x="18" y="13" width="9" height="5" fill="#d4a747" />
      <rect x="18" y="13" width="9" height="1" fill="#f1c24c" />
      <rect x="18" y="19" width="9" height="1" fill="#808080" />
      <rect x="18" y="21" width="7" height="1" fill="#808080" />
      <rect x="18" y="23" width="9" height="1" fill="#808080" />
      {/* AI sparkle top-right */}
      <rect x="23" y="3" width="4" height="1" fill="#ff8a2c" />
      <rect x="24" y="2" width="2" height="3" fill="#ff8a2c" />
      <rect x="25" y="1" width="1" height="5" fill="#ff8a2c" />
      <rect x="22" y="3" width="1" height="1" fill="#ffc072" />
      <rect x="27" y="3" width="1" height="1" fill="#ffc072" />
    </Px>
  );
}

// 02 · Qorting.nl — discount price tag
export function DiscountTagIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Tag body (angled corner) */}
      <rect x="6" y="5" width="18" height="18" fill="#e8442d" />
      <rect x="5" y="6" width="1" height="16" fill="#e8442d" />
      <rect x="4" y="7" width="1" height="14" fill="#e8442d" />
      <rect x="3" y="8" width="1" height="12" fill="#e8442d" />
      {/* Highlight */}
      <rect x="6" y="5" width="18" height="1" fill="#ff7a5f" />
      {/* Outline */}
      <rect x="6" y="4" width="18" height="1" fill="#000" />
      <rect x="6" y="23" width="18" height="1" fill="#000" />
      <rect x="24" y="5" width="1" height="18" fill="#000" />
      <rect x="5" y="5" width="1" height="1" fill="#000" />
      <rect x="4" y="6" width="1" height="1" fill="#000" />
      <rect x="3" y="7" width="1" height="1" fill="#000" />
      <rect x="2" y="8" width="1" height="12" fill="#000" />
      <rect x="3" y="20" width="1" height="1" fill="#000" />
      <rect x="4" y="21" width="1" height="1" fill="#000" />
      <rect x="5" y="22" width="1" height="1" fill="#000" />
      {/* Hole */}
      <rect x="8" y="12" width="4" height="4" fill="#fff" />
      <rect x="9" y="13" width="2" height="2" fill="#000" />
      {/* String */}
      <rect x="25" y="3" width="2" height="2" fill="#808080" />
      <rect x="27" y="1" width="2" height="2" fill="#808080" />
      {/* "%" glyph */}
      <rect x="15" y="9" width="2" height="2" fill="#fff" />
      <rect x="20" y="17" width="2" height="2" fill="#fff" />
      <rect x="14" y="13" width="1" height="1" fill="#fff" />
      <rect x="15" y="14" width="1" height="1" fill="#fff" />
      <rect x="16" y="15" width="1" height="1" fill="#fff" />
      <rect x="17" y="16" width="1" height="1" fill="#fff" />
      <rect x="18" y="17" width="1" height="1" fill="#fff" />
      <rect x="19" y="18" width="1" height="1" fill="#fff" />
    </Px>
  );
}

// 03 · Aanbiedingen-vergelijken — price scale / balance
export function ScaleIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Base */}
      <rect x="10" y="25" width="12" height="2" fill="#555" />
      <rect x="8" y="27" width="16" height="2" fill="#3a3a3a" />
      <rect x="8" y="27" width="16" height="1" fill="#000" />
      <rect x="10" y="25" width="12" height="1" fill="#000" />
      {/* Pole */}
      <rect x="15" y="7" width="2" height="18" fill="#555" />
      <rect x="15" y="7" width="1" height="18" fill="#808080" />
      {/* Fulcrum */}
      <rect x="13" y="6" width="6" height="3" fill="#ffd319" />
      <rect x="13" y="6" width="6" height="1" fill="#fff080" />
      <rect x="13" y="6" width="1" height="3" fill="#000" />
      <rect x="18" y="6" width="1" height="3" fill="#000" />
      {/* Cross beam */}
      <rect x="3" y="10" width="26" height="2" fill="#555" />
      <rect x="3" y="10" width="26" height="1" fill="#808080" />
      <rect x="3" y="9" width="26" height="1" fill="#000" />
      <rect x="3" y="12" width="26" height="1" fill="#000" />
      {/* Left chain */}
      <rect x="5" y="13" width="1" height="4" fill="#808080" />
      <rect x="8" y="13" width="1" height="4" fill="#808080" />
      {/* Left pan (heavier) */}
      <rect x="2" y="17" width="10" height="2" fill="#3ba419" />
      <rect x="2" y="17" width="10" height="1" fill="#5ad437" />
      <rect x="2" y="17" width="1" height="2" fill="#000" />
      <rect x="11" y="17" width="1" height="2" fill="#000" />
      <rect x="2" y="19" width="10" height="1" fill="#000" />
      {/* Right chain */}
      <rect x="23" y="13" width="1" height="3" fill="#808080" />
      <rect x="26" y="13" width="1" height="3" fill="#808080" />
      {/* Right pan (lighter) */}
      <rect x="20" y="16" width="10" height="2" fill="#0058e6" />
      <rect x="20" y="16" width="10" height="1" fill="#74a9ff" />
      <rect x="20" y="16" width="1" height="2" fill="#000" />
      <rect x="29" y="16" width="1" height="2" fill="#000" />
      <rect x="20" y="18" width="10" height="1" fill="#000" />
    </Px>
  );
}

// 04 · Claude Skills Collection — stacked books
export function BookStackIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Bottom book — Claude orange */}
      <rect x="3" y="21" width="26" height="6" fill="#ff8a2c" />
      <rect x="3" y="21" width="26" height="1" fill="#ffc072" />
      <rect x="3" y="26" width="26" height="1" fill="#b95500" />
      <rect x="3" y="21" width="1" height="6" fill="#000" />
      <rect x="28" y="21" width="1" height="6" fill="#000" />
      <rect x="3" y="27" width="26" height="1" fill="#000" />
      <rect x="6" y="22" width="1" height="4" fill="#b95500" />
      <rect x="25" y="22" width="1" height="4" fill="#b95500" />
      {/* Middle book — blue */}
      <rect x="5" y="14" width="22" height="6" fill="#0a3a8e" />
      <rect x="5" y="14" width="22" height="1" fill="#3a6ea5" />
      <rect x="5" y="19" width="22" height="1" fill="#052050" />
      <rect x="5" y="14" width="1" height="6" fill="#000" />
      <rect x="26" y="14" width="1" height="6" fill="#000" />
      <rect x="5" y="20" width="22" height="1" fill="#000" />
      <rect x="8" y="16" width="8" height="1" fill="#ffd319" />
      {/* Top book — green */}
      <rect x="7" y="7" width="18" height="6" fill="#3ba419" />
      <rect x="7" y="7" width="18" height="1" fill="#5ad437" />
      <rect x="7" y="12" width="18" height="1" fill="#1e5c0e" />
      <rect x="7" y="7" width="1" height="6" fill="#000" />
      <rect x="24" y="7" width="1" height="6" fill="#000" />
      <rect x="7" y="13" width="18" height="1" fill="#000" />
      {/* Red bookmark */}
      <rect x="21" y="4" width="2" height="6" fill="#c62727" />
      <rect x="21" y="4" width="2" height="1" fill="#ff7070" />
    </Px>
  );
}

// 05 · Google Ads AI System — robot with Google eye colors
export function AdsRobotIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Antenna */}
      <rect x="15" y="2" width="2" height="3" fill="#808080" />
      <rect x="14" y="1" width="4" height="1" fill="#fbbc05" />
      {/* Head */}
      <rect x="6" y="7" width="20" height="16" fill="#ece9d8" />
      <rect x="6" y="7" width="20" height="1" fill="#fff" />
      <rect x="6" y="22" width="20" height="1" fill="#808080" />
      <rect x="6" y="7" width="1" height="16" fill="#000" />
      <rect x="25" y="7" width="1" height="16" fill="#000" />
      <rect x="6" y="6" width="20" height="1" fill="#000" />
      <rect x="6" y="23" width="20" height="1" fill="#000" />
      {/* Screen */}
      <rect x="9" y="10" width="14" height="8" fill="#0a3a8e" />
      <rect x="9" y="10" width="14" height="1" fill="#4285f4" />
      {/* Google-color eyes */}
      <rect x="11" y="12" width="3" height="3" fill="#4285f4" />
      <rect x="18" y="12" width="3" height="3" fill="#ea4335" />
      <rect x="11" y="12" width="1" height="1" fill="#fff" />
      <rect x="18" y="12" width="1" height="1" fill="#fff" />
      {/* Mouth */}
      <rect x="12" y="16" width="8" height="1" fill="#fbbc05" />
      {/* Neck */}
      <rect x="12" y="23" width="8" height="3" fill="#c8c2b0" />
      <rect x="12" y="23" width="8" height="1" fill="#000" />
      <rect x="12" y="25" width="8" height="1" fill="#808080" />
      {/* Body base */}
      <rect x="8" y="26" width="16" height="3" fill="#808080" />
      <rect x="8" y="26" width="16" height="1" fill="#000" />
      <rect x="8" y="28" width="16" height="1" fill="#000" />
      <rect x="11" y="27" width="2" height="1" fill="#34a853" />
      <rect x="19" y="27" width="2" height="1" fill="#ea4335" />
    </Px>
  );
}

// 06 · Adsscripts.com — terminal window with green code
export function TerminalIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Window */}
      <rect x="3" y="5" width="26" height="22" fill="#0a0a0a" />
      <rect x="3" y="4" width="26" height="1" fill="#000" />
      <rect x="3" y="27" width="26" height="1" fill="#000" />
      <rect x="2" y="5" width="1" height="22" fill="#000" />
      <rect x="29" y="5" width="1" height="22" fill="#000" />
      {/* Title bar */}
      <rect x="3" y="5" width="26" height="4" fill="#c0c0c0" />
      <rect x="3" y="5" width="26" height="1" fill="#fff" />
      <rect x="3" y="8" width="26" height="1" fill="#808080" />
      {/* Traffic lights */}
      <rect x="5" y="6" width="2" height="2" fill="#c62727" />
      <rect x="8" y="6" width="2" height="2" fill="#ffd319" />
      <rect x="11" y="6" width="2" height="2" fill="#3ba419" />
      {/* Prompt + output */}
      <rect x="5" y="11" width="1" height="1" fill="#3ba419" />
      <rect x="7" y="11" width="1" height="1" fill="#3ba419" />
      <rect x="9" y="11" width="8" height="1" fill="#3ba419" />
      <rect x="5" y="14" width="3" height="1" fill="#3ba419" />
      <rect x="9" y="14" width="11" height="1" fill="#3ba419" />
      <rect x="5" y="17" width="3" height="1" fill="#3ba419" />
      <rect x="9" y="17" width="6" height="1" fill="#3ba419" />
      <rect x="5" y="20" width="1" height="1" fill="#3ba419" />
      <rect x="7" y="20" width="1" height="1" fill="#3ba419" />
      {/* Blinking cursor */}
      <rect x="9" y="20" width="4" height="2" fill="#3ba419" />
    </Px>
  );
}

// 07 · Shopify GraphQL Agentspace — shopping bag + GraphQL hex
export function ShopBagAIIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Handle */}
      <rect x="11" y="4" width="10" height="1" fill="#000" />
      <rect x="10" y="5" width="1" height="5" fill="#000" />
      <rect x="21" y="5" width="1" height="5" fill="#000" />
      <rect x="11" y="5" width="10" height="1" fill="#5c8a3a" />
      {/* Bag (Shopify green) */}
      <rect x="6" y="9" width="20" height="18" fill="#7ab55c" />
      <rect x="6" y="9" width="20" height="1" fill="#a2d47e" />
      <rect x="6" y="26" width="20" height="1" fill="#4b7030" />
      <rect x="6" y="9" width="1" height="18" fill="#000" />
      <rect x="25" y="9" width="1" height="18" fill="#000" />
      <rect x="6" y="27" width="20" height="1" fill="#000" />
      <rect x="6" y="8" width="20" height="1" fill="#000" />
      {/* GraphQL-style hex (pink) */}
      <rect x="13" y="14" width="6" height="6" fill="#e535ab" />
      <rect x="12" y="15" width="1" height="4" fill="#e535ab" />
      <rect x="19" y="15" width="1" height="4" fill="#e535ab" />
      <rect x="14" y="13" width="4" height="1" fill="#e535ab" />
      <rect x="14" y="20" width="4" height="1" fill="#e535ab" />
      <rect x="14" y="15" width="4" height="4" fill="#fff" />
      <rect x="15" y="16" width="2" height="2" fill="#e535ab" />
      {/* AI sparkle */}
      <rect x="22" y="21" width="2" height="2" fill="#fff" />
      <rect x="21" y="22" width="4" height="1" fill="#fff" />
      <rect x="23" y="20" width="1" height="4" fill="#fff" />
    </Px>
  );
}

// 08 · Multilingual Google Ads — globe
export function GlobeIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Sphere (stepped circle) */}
      <rect x="10" y="4" width="12" height="2" fill="#0058e6" />
      <rect x="8" y="6" width="16" height="2" fill="#0058e6" />
      <rect x="6" y="8" width="20" height="16" fill="#0058e6" />
      <rect x="8" y="24" width="16" height="2" fill="#0058e6" />
      <rect x="10" y="26" width="12" height="2" fill="#0058e6" />
      {/* Highlights */}
      <rect x="10" y="4" width="12" height="1" fill="#74a9ff" />
      <rect x="8" y="6" width="2" height="1" fill="#74a9ff" />
      <rect x="6" y="8" width="2" height="1" fill="#74a9ff" />
      {/* Outline */}
      <rect x="10" y="3" width="12" height="1" fill="#000" />
      <rect x="10" y="28" width="12" height="1" fill="#000" />
      <rect x="8" y="5" width="2" height="1" fill="#000" />
      <rect x="22" y="5" width="2" height="1" fill="#000" />
      <rect x="6" y="7" width="2" height="1" fill="#000" />
      <rect x="24" y="7" width="2" height="1" fill="#000" />
      <rect x="5" y="8" width="1" height="16" fill="#000" />
      <rect x="26" y="8" width="1" height="16" fill="#000" />
      <rect x="6" y="24" width="2" height="1" fill="#000" />
      <rect x="24" y="24" width="2" height="1" fill="#000" />
      <rect x="8" y="26" width="2" height="1" fill="#000" />
      <rect x="22" y="26" width="2" height="1" fill="#000" />
      {/* Equator + meridian (white) */}
      <rect x="6" y="15" width="20" height="2" fill="#fff" />
      <rect x="15" y="4" width="2" height="24" fill="#fff" />
      {/* Continent blobs */}
      <rect x="8" y="10" width="4" height="3" fill="#3ba419" />
      <rect x="13" y="8" width="2" height="5" fill="#3ba419" />
      <rect x="19" y="10" width="4" height="3" fill="#3ba419" />
      <rect x="9" y="19" width="5" height="4" fill="#3ba419" />
      <rect x="18" y="20" width="6" height="3" fill="#3ba419" />
    </Px>
  );
}

// 09 · MCC script infrastructure — spreadsheet
export function SpreadsheetIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Frame */}
      <rect x="3" y="4" width="26" height="24" fill="#fff" />
      <rect x="3" y="4" width="26" height="1" fill="#000" />
      <rect x="3" y="27" width="26" height="1" fill="#000" />
      <rect x="3" y="4" width="1" height="24" fill="#000" />
      <rect x="28" y="4" width="1" height="24" fill="#000" />
      {/* Header row (Excel green) */}
      <rect x="3" y="4" width="26" height="4" fill="#217346" />
      <rect x="3" y="4" width="26" height="1" fill="#2f9a5e" />
      <rect x="3" y="7" width="26" height="1" fill="#14502e" />
      <rect x="5" y="6" width="3" height="1" fill="#fff" />
      <rect x="11" y="6" width="4" height="1" fill="#fff" />
      <rect x="18" y="6" width="3" height="1" fill="#fff" />
      <rect x="23" y="6" width="4" height="1" fill="#fff" />
      {/* Column dividers */}
      <rect x="10" y="8" width="1" height="20" fill="#c0c0c0" />
      <rect x="17" y="8" width="1" height="20" fill="#c0c0c0" />
      <rect x="22" y="8" width="1" height="20" fill="#c0c0c0" />
      {/* Row dividers */}
      <rect x="3" y="12" width="26" height="1" fill="#c0c0c0" />
      <rect x="3" y="16" width="26" height="1" fill="#c0c0c0" />
      <rect x="3" y="20" width="26" height="1" fill="#c0c0c0" />
      <rect x="3" y="24" width="26" height="1" fill="#c0c0c0" />
      {/* Highlighted cells */}
      <rect x="4" y="9" width="6" height="3" fill="#ffeb9c" />
      <rect x="11" y="13" width="6" height="3" fill="#c6efce" />
      <rect x="18" y="17" width="4" height="3" fill="#c6efce" />
      <rect x="23" y="21" width="5" height="3" fill="#c6efce" />
      <rect x="11" y="25" width="6" height="2" fill="#ffc7ce" />
    </Px>
  );
}

// 10 · AI forecast agentspace — line chart with AI sparkle
export function ForecastChartIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Dashboard panel */}
      <rect x="3" y="5" width="26" height="22" fill="#0a3a8e" />
      <rect x="3" y="5" width="26" height="1" fill="#3a6ea5" />
      <rect x="3" y="26" width="26" height="1" fill="#052050" />
      <rect x="3" y="5" width="1" height="22" fill="#000" />
      <rect x="28" y="5" width="1" height="22" fill="#000" />
      <rect x="3" y="4" width="26" height="1" fill="#000" />
      <rect x="3" y="27" width="26" height="1" fill="#000" />
      {/* Grid */}
      <rect x="5" y="10" width="22" height="1" fill="#1f5dd0" />
      <rect x="5" y="15" width="22" height="1" fill="#1f5dd0" />
      <rect x="5" y="20" width="22" height="1" fill="#1f5dd0" />
      {/* Historical line (yellow) */}
      <rect x="5" y="22" width="2" height="1" fill="#ffd319" />
      <rect x="7" y="20" width="2" height="1" fill="#ffd319" />
      <rect x="9" y="21" width="2" height="1" fill="#ffd319" />
      <rect x="11" y="18" width="2" height="1" fill="#ffd319" />
      <rect x="13" y="19" width="2" height="1" fill="#ffd319" />
      <rect x="15" y="16" width="2" height="1" fill="#ffd319" />
      {/* Forecast line (green, ascending) */}
      <rect x="17" y="15" width="1" height="1" fill="#3ba419" />
      <rect x="18" y="14" width="1" height="1" fill="#3ba419" />
      <rect x="19" y="12" width="1" height="1" fill="#3ba419" />
      <rect x="20" y="12" width="1" height="1" fill="#3ba419" />
      <rect x="21" y="11" width="1" height="1" fill="#3ba419" />
      <rect x="22" y="9" width="1" height="1" fill="#3ba419" />
      <rect x="23" y="8" width="1" height="1" fill="#3ba419" />
      <rect x="24" y="7" width="1" height="1" fill="#3ba419" />
      {/* AI sparkle */}
      <rect x="25" y="5" width="2" height="2" fill="#fff" />
      <rect x="24" y="6" width="4" height="1" fill="#fff" />
      <rect x="26" y="4" width="1" height="4" fill="#fff" />
    </Px>
  );
}

// 11 · NeverLeafs — potted plant (terracotta + green)
export function PottedPlantIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Top leaves */}
      <rect x="13" y="4" width="6" height="3" fill="#3ba419" />
      <rect x="13" y="4" width="6" height="1" fill="#5ad437" />
      {/* Left leaf */}
      <rect x="5" y="9" width="10" height="4" fill="#3ba419" />
      <rect x="5" y="9" width="10" height="1" fill="#5ad437" />
      <rect x="4" y="10" width="1" height="2" fill="#3ba419" />
      <rect x="3" y="11" width="1" height="1" fill="#3ba419" />
      {/* Right leaf */}
      <rect x="17" y="7" width="10" height="5" fill="#3ba419" />
      <rect x="17" y="7" width="10" height="1" fill="#5ad437" />
      <rect x="27" y="9" width="1" height="3" fill="#3ba419" />
      {/* Small leaf sprout top */}
      <rect x="15" y="2" width="2" height="2" fill="#3ba419" />
      <rect x="15" y="2" width="2" height="1" fill="#5ad437" />
      {/* Stem */}
      <rect x="15" y="6" width="2" height="14" fill="#5c3c1a" />
      {/* Leaf veins (darker) */}
      <rect x="8" y="11" width="6" height="1" fill="#1e5c0e" />
      <rect x="18" y="10" width="8" height="1" fill="#1e5c0e" />
      {/* Pot rim */}
      <rect x="7" y="19" width="18" height="2" fill="#c76b3d" />
      <rect x="7" y="19" width="18" height="1" fill="#e29068" />
      {/* Pot body */}
      <rect x="8" y="21" width="16" height="7" fill="#a8552c" />
      <rect x="8" y="21" width="16" height="1" fill="#c76b3d" />
      <rect x="8" y="27" width="16" height="1" fill="#7a3c1c" />
      {/* Pot outline */}
      <rect x="7" y="18" width="18" height="1" fill="#000" />
      <rect x="6" y="19" width="1" height="2" fill="#000" />
      <rect x="25" y="19" width="1" height="2" fill="#000" />
      <rect x="7" y="21" width="1" height="7" fill="#000" />
      <rect x="24" y="21" width="1" height="7" fill="#000" />
      <rect x="7" y="28" width="18" height="1" fill="#000" />
    </Px>
  );
}

export function CVIcon(props: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Px {...props}>
      {/* Clipboard back */}
      <rect x="5" y="5" width="22" height="24" fill="#9b6b36" />
      <rect x="5" y="5" width="22" height="1" fill="#c89756" />
      <rect x="5" y="28" width="22" height="1" fill="#5c3c1a" />
      <rect x="5" y="5" width="1" height="24" fill="#000" />
      <rect x="26" y="5" width="1" height="24" fill="#000" />
      <rect x="5" y="28" width="22" height="1" fill="#000" />
      {/* Paper page */}
      <rect x="7" y="7" width="18" height="20" fill="#fff" />
      <rect x="7" y="7" width="18" height="1" fill="#000" />
      <rect x="7" y="26" width="18" height="1" fill="#000" />
      <rect x="7" y="7" width="1" height="20" fill="#000" />
      <rect x="24" y="7" width="1" height="20" fill="#000" />
      {/* Clip on top */}
      <rect x="13" y="3" width="6" height="2" fill="#c8c2b0" />
      <rect x="12" y="4" width="8" height="3" fill="#a8a495" />
      <rect x="12" y="3" width="1" height="3" fill="#000" />
      <rect x="19" y="3" width="1" height="3" fill="#000" />
      <rect x="13" y="3" width="6" height="1" fill="#000" />
      {/* Portrait (avatar box) */}
      <rect x="9" y="9" width="5" height="5" fill="#f1c27d" />
      <rect x="9" y="9" width="5" height="1" fill="#5b3c20" />
      <rect x="10" y="11" width="1" height="1" fill="#000" />
      <rect x="12" y="11" width="1" height="1" fill="#000" />
      <rect x="10" y="13" width="3" height="1" fill="#c62727" />
      {/* Text lines (CV content) */}
      <rect x="15" y="10" width="8" height="1" fill="#3a6ea5" />
      <rect x="15" y="12" width="6" height="1" fill="#808080" />
      <rect x="15" y="14" width="8" height="1" fill="#808080" />
      {/* Section divider */}
      <rect x="9" y="16" width="14" height="1" fill="#0058e6" />
      {/* Body lines */}
      <rect x="9" y="18" width="14" height="1" fill="#808080" />
      <rect x="9" y="20" width="10" height="1" fill="#808080" />
      <rect x="9" y="22" width="14" height="1" fill="#808080" />
      <rect x="9" y="24" width="8" height="1" fill="#808080" />
      {/* Gold star (stamp of approval) */}
      <rect x="21" y="22" width="2" height="3" fill="#ffd319" />
      <rect x="20" y="23" width="4" height="1" fill="#ffd319" />
    </Px>
  );
}
