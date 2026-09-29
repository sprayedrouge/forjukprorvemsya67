'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, SmoothScrollContext } from '@/shared/lib';

/** Where an anchor lands: most sections at their top, pinned finales once fully revealed. */
function anchorOffset(el: HTMLElement) {
  if (el.dataset.anchor === 'end') return el.offsetTop + el.offsetHeight - window.innerHeight;
  return el;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href')!;
      const target = hash === '#top' ? 0 : hash.length > 1 ? document.querySelector<HTMLElement>(hash) : null;
      if (target === null) return;
      e.preventDefault();
      instance.scrollTo(typeof target === 'number' ? target : anchorOffset(target), { duration: 1.8 });
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    setLenis(instance);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <SmoothScrollContext value={lenis}>{children}</SmoothScrollContext>;
}
