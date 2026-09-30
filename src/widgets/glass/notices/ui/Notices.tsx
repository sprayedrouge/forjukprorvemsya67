'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { reviews } from '@/entities/review';
import s from './Notices.module.css';

const ago = ['now', '2m ago', '9m ago'];

export function Notices() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>(`.${s.notice}`);
        // Collapsed like a grouped notification stack, then fanned out as you scroll.
        gsap.fromTo(
          items,
          {
            y: (i) => -i * (items[0].offsetHeight + 12) + i * 14,
            scale: (i) => 1 - i * 0.05,
            autoAlpha: (i) => 1 - i * 0.25,
          },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'center 50%', scrub: 1 },
          },
        );
        items.forEach((item, i) => gsap.set(item, { zIndex: items.length - i }));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.notices} id="notices">
      <div>
        <h2 className={s.heading}>People are talking.</h2>
        <p className={s.sub}>A few messages from players who switched to Slide Control.</p>
      </div>
      <div className={s.stack}>
        {reviews.map((r, i) => (
          <figure key={r.id} className={s.notice}>
            <span className={s.app} aria-hidden="true" />
            <div className={s.top}>
              <span>GoSlide Reviews</span>
              <span>{ago[i]}</span>
            </div>
            <figcaption className={s.who}>
              {r.author} · {r.role}
            </figcaption>
            <blockquote className={s.text}>{r.quote}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
