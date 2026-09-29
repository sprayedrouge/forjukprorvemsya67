'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import s from './Order.module.css';

// Deterministic bar widths, so server and client render the same barcode.
const bars = Array.from({ length: 42 }, (_, i) => 1 + ((i * 7 + (i % 5) * 3) % 5));

export function Order() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          `.${s.word}`,
          { xPercent: 12 },
          {
            xPercent: -10,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.order} id="order">
      <h2 className={s.word}>Order®</h2>
      <div className={s.panel}>
        <p className={s.spec}>
          <span>Item</span>
          <b>SC-01 / Black / Wireless</b>
        </p>
        <div aria-hidden="true">
          <span>Lot 2026 / Batch 04</span>
          <span className={s.barcode}>
            {bars.map((w, i) => (
              <i key={i} style={{ width: `${w * 0.2}rem` }} />
            ))}
          </span>
        </div>
        <a className={s.button} href="#order">
          <span>[ Place order ]</span>
          <span>&gt;&gt;&gt;</span>
        </a>
      </div>
    </section>
  );
}
