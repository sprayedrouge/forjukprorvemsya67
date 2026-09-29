import { gsap } from '../gsap';

const GLYPHS = '0123456789#/<>_-+';

/**
 * Mechanical "counter" reveal: characters flicker through glyphs and lock in left to right.
 * Spaces and punctuation lock immediately so the layout never jumps.
 */
export function scrambleText(el: HTMLElement, final = el.dataset.final ?? el.textContent ?? '', duration = 0.9) {
  el.dataset.final = final;
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration,
    ease: 'none',
    onUpdate: () => {
      const locked = Math.floor(state.p * final.length);
      let out = '';
      for (let i = 0; i < final.length; i++) {
        const ch = final[i];
        out += i < locked || !/[\w]/.test(ch) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}
