'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { Eyebrow } from '@/shared/ui';
import { QuoteCard, reviews } from '@/entities/review';
import { CarouselControls, useCarousel } from '@/features/switch-review';
import s from './Reviews.module.css';

export function Reviews() {
  const root = useRef<HTMLElement>(null);
  const firstRun = useRef(true);
  const { index, direction, next, prev } = useCarousel(reviews.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from([`.${s.intro} > *`, `.${s.panel}`], {
          y: 60,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      const items = gsap.utils.toArray<HTMLElement>(`.${s.item}`);
      const active = items[index];
      gsap.set(items.filter((el) => el !== active), { autoAlpha: 0 });
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        active,
        { autoAlpha: 0, x: 60 * direction, filter: 'blur(10px)' },
        { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' },
      );
    },
    { scope: root, dependencies: [index] },
  );

  return (
    <section ref={root} className={s.reviews} id="reviews">
      <div className={clsx('container', s.grid)}>
        <div className={s.intro}>
          <Eyebrow>Hear from players</Eyebrow>
          <h2 className={s.heading}>We listen, then we ship.</h2>
          <p className={s.lead}>
            We receive a lot of feedback and improve our products every day to deliver better quality, comfort and
            experience.
          </p>
        </div>

        <div className={s.panel}>
          <div className={s.viewport} aria-live="polite">
            {reviews.map((review, i) => (
              <div key={review.id} className={clsx(s.item, i === index && s.itemActive)} aria-hidden={i !== index}>
                <QuoteCard review={review} />
              </div>
            ))}
          </div>
          <CarouselControls index={index} total={reviews.length} onPrev={prev} onNext={next} />
        </div>
      </div>
    </section>
  );
}
