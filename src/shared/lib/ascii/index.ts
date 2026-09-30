'use client';

import { useEffect, useState } from 'react';
import { gsap } from '../gsap';

const RAMP = ' .,:;-=+*#%@';
const NOISE = '!<>-_\\/[]{}=+*^?#%@';
/** Monospace glyphs are roughly twice as tall as wide; halve rows to keep proportions. */
const CHAR_ASPECT = 0.5;

const cache = new Map<string, Promise<string>>();

function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Converts a transparent product shot into ASCII art. Transparent pixels become spaces;
 * the dark shell maps to the light end of the ramp and the RGB strip to dense glyphs,
 * so the silhouette reads on a dark screen.
 */
export function imageToAscii(src: string, cols: number) {
  const key = `${src}@${cols}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      load(src).then((img) => {
        const rows = Math.max(1, Math.round((img.height / img.width) * cols * CHAR_ASPECT));
        const canvas = document.createElement('canvas');
        canvas.width = cols;
        canvas.height = rows;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        ctx.drawImage(img, 0, 0, cols, rows);
        const { data } = ctx.getImageData(0, 0, cols, rows);
        let out = '';
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = (y * cols + x) * 4;
            const alpha = data[i + 3] / 255;
            if (alpha < 0.2) {
              out += ' ';
              continue;
            }
            const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
            const level = Math.min(1, 0.3 + lum * 1.4) * alpha;
            out += RAMP[Math.max(1, Math.round(level * (RAMP.length - 1)))];
          }
          out += '\n';
        }
        return out.replace(/\s+$/, '');
      }),
    );
  }
  return cache.get(key)!;
}

export function useAscii(src: string, cols: number) {
  const [art, setArt] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    imageToAscii(src, cols).then((a) => alive && setArt(a));
    return () => {
      alive = false;
    };
  }, [src, cols]);
  return art;
}

/**
 * Resolves ASCII art out of noise: every glyph locks in at its own random moment,
 * spaces and line breaks stay put so the silhouette never jumps.
 */
export function resolveAscii(el: HTMLElement, art: string, duration = 1.2) {
  const thresholds = Array.from(art, () => Math.random());
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      let out = '';
      for (let i = 0; i < art.length; i++) {
        const ch = art[i];
        out += ch === ' ' || ch === '\n' || thresholds[i] < state.p ? ch : NOISE[(Math.random() * NOISE.length) | 0];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = art;
    },
  });
}

export const asciiSize = (art: string) => {
  const lines = art.split('\n');
  return { cols: Math.max(...lines.map((l) => l.length)), rows: lines.length };
};
