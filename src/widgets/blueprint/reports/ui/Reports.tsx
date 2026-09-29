'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { reviews } from '@/entities/review';
import s from './Reports.module.css';

export function Reports() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%' } })
          .from(q(`.${s.heading}`), { clipPath: 'inset(0 100% 0 0)', ease: 'steps(10)', duration: 0.8 })
          .from(q(`.${s.report}`), { clipPath: 'inset(0 0 100% 0)', ease: 'steps(8)', duration: 0.5, stagger: 0.15 }, 0.3);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.reports} id="reports">
      <header className={s.head}>
        <h2 className={s.heading}>Field reports</h2>
        <p className={s.caption}>[ {reviews.length} entries / unedited ]</p>
      </header>
      <div className={s.grid}>
        {reviews.map((review, i) => (
          <figure key={review.id} className={s.report}>
            <span className={s.id}>Report / RPT-{String(i + 1).padStart(3, '0')}</span>
            <blockquote className={s.quote}>“{review.quote}”</blockquote>
            <figcaption className={s.author}>
              <b>{review.author}</b>
              {review.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
