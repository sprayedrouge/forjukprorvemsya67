'use client';

import { createContext, useCallback, useContext } from 'react';
import type Lenis from 'lenis';

export const SmoothScrollContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(SmoothScrollContext);

type Target = number | string | HTMLElement;

/** Scrolls through Lenis when it is running, natively otherwise (reduced motion). */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (target: Target, options?: { offset?: number; immediate?: boolean }) => {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.6, ...options });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView();
    },
    [lenis],
  );
}
