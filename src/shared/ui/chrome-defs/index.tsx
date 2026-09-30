/** Document-wide SVG paint servers and filters for the Chrome design. */
export const chromeIds = {
  metal: 'chrome-metal',
  iris: 'chrome-iris',
  liquid: 'chrome-liquid',
} as const;

export function ChromeDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* Polished metal: bright sky, dark horizon line, soft ground reflection */}
        <linearGradient id={chromeIds.metal} x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(0 0.5 0.5)">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.24" stopColor="#d3d8e1" />
          <stop offset="0.46" stopColor="#6b7385" />
          <stop offset="0.5" stopColor="#1f2330" />
          <stop offset="0.56" stopColor="#a9b0bf" />
          <stop offset="0.78" stopColor="#f2f4f8" />
          <stop offset="1" stopColor="#9aa3b5" />
        </linearGradient>
        {/* Pearl/oil-slick sheen laid over the metal */}
        <radialGradient id={chromeIds.iris} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#b8f3ff" />
          <stop offset="0.35" stopColor="#d9b8ff" />
          <stop offset="0.65" stopColor="#ffd6f0" />
          <stop offset="1" stopColor="#c8ffe0" />
        </radialGradient>
        {/* Liquid wobble: noise-driven displacement, animated via the map's scale */}
        <filter id={chromeIds.liquid} x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
