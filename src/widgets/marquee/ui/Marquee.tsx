'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/shared/lib';
import s from './Marquee.module.css';

const phrases = [
  'Feel the power of precision',
  'Experience the touch of perfection',
  'Designed for comfort, built for control',
];

export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Lean into the scroll: the faster you scroll, the harder the line skews.
        const skew = gsap.quickTo(`.${s.skew}`, 'skewX', { duration: 0.5, ease: 'power3.out' });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => skew(gsap.utils.clamp(-14, 14, self.getVelocity() / -250)),
          onLeave: () => skew(0),
          onLeaveBack: () => skew(0),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const row = [...phrases, ...phrases];

  return (
    <div ref={root} className={s.marquee} aria-hidden="true">
      <div className={s.skew}>
        <div className={s.track}>
          {[...row, ...row].map((phrase, i) => (
            <span key={i} className={s.item}>
              {phrase}
              <i className={s.dot} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
