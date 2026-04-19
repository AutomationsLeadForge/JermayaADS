"use client";

/**
 * Classic marquee-style neon arrow — tube-stroke shaft + triangular head
 * framed by a chaser-light bulb border that sequences.
 * Inspired by 1950s American motel/casino directional signs.
 */

interface Props {
  style?: React.CSSProperties;
}

export function NeonArrow({ style }: Props) {
  return (
    <div
      role="img"
      aria-label="Connect with me — marquee arrow pointing at the coffee icon"
      className="xp-marquee-arrow"
      style={style}
    >
      <span className="xp-marquee-label">
        <span className="xp-marquee-star">★</span>
        CONNECT WITH ME
        <span className="xp-marquee-star">★</span>
      </span>
      <MarqueeArrowSvg />
    </div>
  );
}

/**
 * Arrow outline path: shaft on the left (10,50 → 150,50 & 150,70 → 10,70)
 * then triangular head expanding vertically (150,20 ... 230,60 tip ... 150,100).
 */
const ARROW_PATH =
  "M 10 50 L 150 50 L 150 20 L 230 60 L 150 100 L 150 70 L 10 70 Z";

// 18 bulb positions traced around the arrow perimeter.
const BULBS: Array<{ x: number; y: number; delay: number }> = [
  // Top edge of shaft (left → right)
  { x: 18,  y: 50, delay: 0.0 },
  { x: 48,  y: 50, delay: 0.1 },
  { x: 78,  y: 50, delay: 0.2 },
  { x: 108, y: 50, delay: 0.3 },
  { x: 138, y: 50, delay: 0.4 },
  // Upper diagonal of head (left → tip)
  { x: 160, y: 36, delay: 0.5 },
  { x: 185, y: 48, delay: 0.6 },
  { x: 210, y: 56, delay: 0.7 },
  // Tip
  { x: 228, y: 60, delay: 0.8 },
  // Lower diagonal of head (tip → left)
  { x: 210, y: 64, delay: 0.9 },
  { x: 185, y: 72, delay: 1.0 },
  { x: 160, y: 84, delay: 1.1 },
  // Bottom edge of shaft (right → left)
  { x: 138, y: 70, delay: 1.2 },
  { x: 108, y: 70, delay: 1.3 },
  { x: 78,  y: 70, delay: 1.4 },
  { x: 48,  y: 70, delay: 1.5 },
  { x: 18,  y: 70, delay: 1.6 },
  // Left end cap
  { x: 10,  y: 60, delay: 1.7 },
];

function MarqueeArrowSvg() {
  return (
    <svg
      width="240"
      height="120"
      viewBox="0 0 240 120"
      className="xp-marquee-svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* Outer diffuse pink glow */}
      <path
        d={ARROW_PATH}
        fill="none"
        stroke="#ff2bd6"
        strokeWidth="18"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.55"
        filter="url(#neonBlur)"
      />

      {/* Mid magenta tube */}
      <path
        d={ARROW_PATH}
        fill="none"
        stroke="#ff2bd6"
        strokeWidth="10"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Cyan inner tube */}
      <path
        d={ARROW_PATH}
        fill="none"
        stroke="#2bf6ff"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* White core highlight */}
      <path
        d={ARROW_PATH}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Chaser bulbs — soft halo behind each */}
      <g filter="url(#bulbGlow)">
        {BULBS.map((b, i) => (
          <circle
            key={`halo-${i}`}
            cx={b.x}
            cy={b.y}
            r="5"
            className="xp-marquee-bulb-halo"
            style={{ animationDelay: `${-b.delay}s` }}
            fill="#ffe819"
          />
        ))}
      </g>

      {/* Chaser bulbs — sharp centers */}
      <g>
        {BULBS.map((b, i) => (
          <circle
            key={`bulb-${i}`}
            cx={b.x}
            cy={b.y}
            r="2.6"
            className="xp-marquee-bulb"
            style={{ animationDelay: `${-b.delay}s` }}
            fill="#ffe819"
          />
        ))}
      </g>
    </svg>
  );
}
