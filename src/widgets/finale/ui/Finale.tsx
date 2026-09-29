'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK, SplitWords } from '@/shared/lib';
import { productImages } from '@/entities/product';
import { OrderButton } from '@/features/order-product';
import s from './Finale.module.css';

export function Finale() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const words = gsap.utils.toArray<HTMLElement>(`.${s.word}`);
        gsap.set(words, { yPercent: 110 });

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: `.${s.stage}`, start: 'top top', end: '+=140%', pin: true, anticipatePin: 1, scrub: 1 },
          })
          // The frame opens like a shutter from a small card to the full screen.
          .fromTo(
            `.${s.media}`,
            { clipPath: 'inset(24% 26% 24% 26% round 3.2rem)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0rem)', duration: 1 },
          )
          .fromTo(`.${s.media} img`, { scale: 1.35 }, { scale: 1, duration: 1.2 }, 0)
          .to(words, { yPercent: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, 0.55)
          .from('[data-finale-cta]', { autoAlpha: 0, y: 40, duration: 0.4, ease: 'power3.out' }, 0.95);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const scene = productImages.scene;

  return (
    <section ref={root} className={s.finale} id="order" data-anchor="end">
      <div className={s.stage}>
        <div className={s.media}>
          <Image src={scene.src} width={scene.width} height={scene.height} alt={scene.alt} sizes="100vw" />
        </div>
        <div className={s.copy}>
          <h2 className={s.title}>
            <SplitWords text="Smooth tracking." className={s.line} itemClassName={s.word} />
            <SplitWords text="Fast response." className={s.line} itemClassName={s.word} />
          </h2>
          <div data-finale-cta>
            <OrderButton size="large" label="Order Slide Control" />
          </div>
        </div>
      </div>
    </section>
  );
}
