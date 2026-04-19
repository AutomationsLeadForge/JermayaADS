"use client";

/**
 * Hand-drawn vintage curvy arrow, inspired by old doodle/notebook
 * illustrations. Multi-stroke sketchy style + hatch shading on the
 * outer curve. Tip lands at the lower-right so the container can
 * sit to the LEFT of the target icon.
 */

interface Props {
  label?: string;
  style?: React.CSSProperties;
}

export function VintageArrow({ label = "connect with me ☕", style }: Props) {
  return (
    <div
      role="img"
      aria-label={label}
      className="xp-vintage-arrow"
      style={style}
    >
      <span className="xp-vintage-arrow-label">{label}</span>
      <ArrowSvg />
    </div>
  );
}

function ArrowSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 170"
      width="200"
      height="155"
      aria-hidden="true"
      style={{ display: "block", marginTop: -4 }}
    >
      <g
        fill="none"
        stroke="#f5e2a8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Main curly arrow — sweeps from upper-left, loops up, comes down and points right */}
        <path
          d="M 18 40
             C 55 10, 130 10, 170 42
             C 200 72, 180 112, 138 112
             C 108 112, 92 135, 118 152
             C 142 168, 175 160, 195 148"
        />
        {/* Sketch echo for hand-drawn feel */}
        <path
          d="M 20 44
             C 55 14, 128 14, 168 46
             C 196 74, 178 110, 136 110
             C 108 110, 94 134, 120 150
             C 142 166, 173 158, 193 146"
          opacity="0.55"
          strokeWidth="2.2"
        />

        {/* Hatch shading along outer top curve */}
        <g strokeWidth="1.4" opacity="0.55">
          <line x1="50" y1="0" x2="54" y2="14" />
          <line x1="72" y1="-2" x2="74" y2="12" />
          <line x1="96" y1="-4" x2="96" y2="10" />
          <line x1="118" y1="-2" x2="120" y2="10" />
          <line x1="140" y1="2" x2="142" y2="14" />
          <line x1="158" y1="10" x2="164" y2="22" />
          <line x1="178" y1="22" x2="188" y2="32" />
          <line x1="192" y1="42" x2="204" y2="50" />
        </g>

        {/* Hatch on inner U-turn */}
        <g strokeWidth="1.4" opacity="0.5">
          <line x1="180" y1="86" x2="168" y2="88" />
          <line x1="168" y1="100" x2="158" y2="102" />
          <line x1="150" y1="112" x2="138" y2="110" />
        </g>

        {/* Arrowhead — filled triangle at tip (195, 148) pointing right */}
        <path
          d="M 214 140 L 190 132 L 198 156 Z"
          fill="#f5e2a8"
          stroke="#f5e2a8"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
