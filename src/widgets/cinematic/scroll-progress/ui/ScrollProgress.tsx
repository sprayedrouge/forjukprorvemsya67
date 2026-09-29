'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/shared/lib';

export function ScrollProgress() {
  const bar = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  });

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: '0 0 auto', height: 2, zIndex: 'var(--z-nav)' as never, pointerEvents: 'none' }}
    >
      <i
        ref={bar}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--rgb-strip)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
