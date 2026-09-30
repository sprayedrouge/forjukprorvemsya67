'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { reviews } from '@/entities/review';
import s from './Letters.module.css';

export function Letters() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${s.letter}`, {
          y: 60,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 65%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.letters} id="letters">
      <header className={s.head}>
        <h2 className={s.title}>Letters</h2>
        <p className={s.note}>p. 36 · Lightly edited for length</p>
      </header>
      <div className={s.grid}>
        {reviews.map((r) => (
          <figure key={r.id} className={s.letter}>
            <span className={s.salute}>Dear editor,</span>
            <blockquote className={s.text}>{r.quote}</blockquote>
            <figcaption className={s.sign}>
              — <b>{r.author}</b>, {r.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
