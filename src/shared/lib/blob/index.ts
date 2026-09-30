/** Small deterministic PRNG so server and client draw the same shapes. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type BlobOptions = { points?: number; radius?: number; variance?: number; cx?: number; cy?: number };

/**
 * Organic closed shape: points on a wobbly circle joined by a Catmull-Rom spline,
 * converted to cubic Béziers so SVG (and MorphSVG) can use it directly.
 */
export function blobPath(seed: number, { points = 8, radius = 240, variance = 0.3, cx = 300, cy = 300 }: BlobOptions = {}) {
  const rand = mulberry32(seed);
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    const r = radius * (1 - variance / 2 + rand() * variance);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  });
  const at = (i: number) => pts[(i + points) % points];
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(at(0)[0])},${f(at(0)[1])}`;
  for (let i = 0; i < points; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d} Z`;
}
