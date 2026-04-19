"use client";

/**
 * Decorative overlays on top of the static mountain wallpaper.
 *
 * Parallax (car-window) effect:
 *   - Clouds layer drifts slow (120s loop)
 *   - Trees layer scrolls faster (40s loop)
 *
 * Each layer is an SVG strip placed side-by-side twice inside a `ticker-row`
 * wrapper, animating `transform: translateX(0 → -50%)` for seamless loop.
 *
 * All pointer-events: none. All animations respect prefers-reduced-motion.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Twinkling stars on top of the static ones in the wallpaper */}
      {STAR_POSITIONS.map((s, i) => (
        <span
          key={i}
          className="xp-star"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: `${s.delay}s`,
            width: s.size,
            height: s.size,
          }}
        />
      ))}

      {/* Shooting star */}
      <span className="xp-shooting-star" />

      {/* CLOUDS — slow parallax drift (mid-sky band) */}
      <div
        className="xp-parallax-band"
        style={{
          top: "8%",
          height: "22%",
        }}
      >
        <div className="xp-cloud-scroll">
          <CloudStrip />
          <CloudStrip />
        </div>
      </div>

      {/* TREES — fast parallax scroll (foreground silhouette) */}
      <div
        className="xp-parallax-band"
        style={{
          bottom: "11%",
          height: "12%",
        }}
      >
        <div className="xp-tree-scroll">
          <TreeStrip />
          <TreeStrip />
        </div>
      </div>
    </div>
  );
}

/* Seamless cloud strip — 1920px wide, meant to be placed twice */
function CloudStrip() {
  return (
    <svg
      width="1920"
      height="240"
      viewBox="0 0 1920 240"
      shapeRendering="crispEdges"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* 6 pixel clouds at varied x/y */}
      {[
        { x: 80,   y: 40,  scale: 1.0 },
        { x: 420,  y: 90,  scale: 0.85 },
        { x: 760,  y: 30,  scale: 1.15 },
        { x: 1080, y: 80,  scale: 0.9 },
        { x: 1380, y: 20,  scale: 1.0 },
        { x: 1720, y: 70,  scale: 0.95 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y}) scale(${c.scale})`}>
          <PixelCloud />
        </g>
      ))}
    </svg>
  );
}

function PixelCloud() {
  // Chunky pixel cloud — 5x5 tile blocks. Darker base + lighter highlight.
  return (
    <g>
      {/* Darker outline */}
      <rect x="20" y="0"  width="80" height="10" fill="#6ea3d6"/>
      <rect x="10" y="10" width="110" height="10" fill="#6ea3d6"/>
      <rect x="0"  y="20" width="140" height="20" fill="#6ea3d6"/>
      <rect x="10" y="40" width="120" height="10" fill="#6ea3d6"/>
      <rect x="30" y="50" width="80"  height="10" fill="#6ea3d6"/>
      {/* Lighter highlight (top left) */}
      <rect x="30" y="5"  width="50" height="5" fill="#a8cdeb"/>
      <rect x="20" y="10" width="70" height="5" fill="#a8cdeb"/>
      <rect x="10" y="20" width="80" height="5" fill="#a8cdeb"/>
    </g>
  );
}

/* Seamless pine tree strip — 1920px wide, meant to be placed twice */
function TreeStrip() {
  // 60 trees at varying x positions + heights
  const trees = [] as Array<{ x: number; h: number; w: number; dark: boolean }>;
  // Deterministic pseudo-random distribution
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 70; i++) {
    const x = i * 28 + rand() * 12;
    const h = 40 + rand() * 50;
    const w = 16 + rand() * 10;
    trees.push({ x, h, w, dark: rand() > 0.35 });
  }
  return (
    <svg
      width="1920"
      height="120"
      viewBox="0 0 1920 120"
      shapeRendering="crispEdges"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Ground line */}
      <rect x="0" y="110" width="1920" height="10" fill="#030814"/>
      {trees.map((t, i) => (
        <g key={i} transform={`translate(${t.x},${110 - t.h})`}>
          <PineTree w={t.w} h={t.h} dark={t.dark} />
        </g>
      ))}
    </svg>
  );
}

function PineTree({ w, h, dark }: { w: number; h: number; dark: boolean }) {
  const fill = dark ? "#020510" : "#081530";
  const trunk = w * 0.18;
  // Pine shape: triangular silhouette made of 4 stacked wider-to-narrower bands
  const bandH = (h - 6) / 4;
  return (
    <g fill={fill}>
      {/* Trunk */}
      <rect x={(w - trunk) / 2} y={h - 6} width={trunk} height={6} />
      {/* Layered conical canopy — widest at base, narrowest at top */}
      <rect x={0}       y={h - 6 - bandH}     width={w}       height={bandH} />
      <rect x={w * 0.08} y={h - 6 - bandH * 2} width={w * 0.84} height={bandH} />
      <rect x={w * 0.18} y={h - 6 - bandH * 3} width={w * 0.64} height={bandH} />
      <rect x={w * 0.32} y={h - 6 - bandH * 4} width={w * 0.36} height={bandH} />
      {/* Tip */}
      <rect x={w * 0.42} y={0} width={w * 0.16} height={bandH} />
    </g>
  );
}

const STAR_POSITIONS: {
  left: string;
  top: string;
  size: number;
  delay: number;
}[] = [
  { left: "5%",  top: "6%",  size: 2, delay: 0.0 },
  { left: "12%", top: "14%", size: 3, delay: 0.7 },
  { left: "22%", top: "8%",  size: 2, delay: 1.4 },
  { left: "31%", top: "16%", size: 2, delay: 2.1 },
  { left: "40%", top: "10%", size: 3, delay: 0.4 },
  { left: "49%", top: "18%", size: 2, delay: 2.6 },
  { left: "58%", top: "9%",  size: 2, delay: 1.1 },
  { left: "67%", top: "14%", size: 3, delay: 0.2 },
  { left: "76%", top: "18%", size: 2, delay: 2.3 },
  { left: "84%", top: "8%",  size: 2, delay: 1.7 },
  { left: "92%", top: "15%", size: 3, delay: 0.5 },
  { left: "8%",  top: "26%", size: 2, delay: 1.9 },
  { left: "27%", top: "28%", size: 2, delay: 0.9 },
  { left: "46%", top: "26%", size: 2, delay: 2.4 },
  { left: "65%", top: "30%", size: 2, delay: 1.3 },
  { left: "89%", top: "28%", size: 3, delay: 0.3 },
];
