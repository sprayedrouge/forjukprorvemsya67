'use client';

import { useRef, type CSSProperties } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { reviews } from '@/entities/review';
import s from './Ring.module.css';

// Two laps of the three reviews fill the ring without gaps.
const cards = [...reviews, ...reviews];
const step = 360 / cards.length;

export function Ring() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The ring turns with the page: one full revolution across the section.
        gsap.fromTo(
          `.${s.carousel}`,
          { rotationY: 40 },
          {
            rotationY: -320,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.ring} id="ring">
      <h2 className={s.heading}>Voices</h2>
      <div className={s.scene}>
        <div className={s.carousel}>
          {cards.map((review, i) => (
            <figure
              key={`${review.id}-${i}`}
              className={s.card}
              style={{ '--angle': `${i * step}deg` } as CSSProperties}
              aria-hidden={i >= reviews.length}
            >
              <blockquote className={s.quote}>“{review.quote}”</blockquote>
              <figcaption className={s.author}>
                <b>{review.author}</b>
                {review.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
