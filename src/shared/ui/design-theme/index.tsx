'use client';

import { useEffect } from 'react';
import type { DesignId } from '@/shared/config';

export const LAST_DESIGN_KEY = 'goslide:last-design';

/** Marks <html> with the active design so page background and overscroll match it. */
export function DesignTheme({ design }: { design: DesignId | 'select' }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.design = design;
    if (design !== 'select') {
      try {
        localStorage.setItem(LAST_DESIGN_KEY, design);
      } catch {
        // Storage can be blocked (private mode); remembering the choice is optional.
      }
    }
    return () => {
      delete root.dataset.design;
    };
  }, [design]);
  return null;
}
