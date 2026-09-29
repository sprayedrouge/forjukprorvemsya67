'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, intro, useLenis, MOTION_OK } from '@/shared/lib';
import { siteConfig } from '@/shared/config';
import s from './Preloader.module.css';

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        if (intro.isDone()) {
          gsap.set(root.current, { autoAlpha: 0 });
          return;
        }
        lenis?.stop();
        window.scrollTo(0, 0);

        const counter = { v: 0 };
        const countEl = root.current!.querySelector('[data-count]')!;
        const ready = document.fonts?.ready ?? Promise.resolve();

        const tl = gsap.timeline({ paused: true });
        tl.to(counter, {
          v: 100,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            countEl.textContent = String(Math.round(counter.v));
          },
        })
          .to('[data-bar]', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
          .to(root.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.1,
            ease: 'expo.inOut',
            onStart: () => intro.finish(),
          })
          .set(root.current, { autoAlpha: 0 })
          .add(() => lenis?.start());

        ready.then(() => tl.play());
      });

      // Reduced motion: no loader, release the hero immediately.
      mm.add('(prefers-reduced-motion: reduce)', () => intro.finish());

      return () => mm.revert();
    },
    { scope: root, dependencies: [lenis] },
  );

  return (
    <div ref={root} className={s.loader} aria-hidden="true" style={{ clipPath: 'inset(0 0 0% 0)' }}>
      <div className={s.brand}>
        <Image src="/images/logo.svg" width={24} height={24} alt="" />
        {siteConfig.name}
      </div>
      <div className={s.count} data-count>
        0
      </div>
      <div className={s.bar}>
        <i data-bar />
      </div>
    </div>
  );
}
