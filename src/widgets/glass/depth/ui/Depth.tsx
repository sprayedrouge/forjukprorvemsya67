'use client';

import { useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK, formatNumber } from '@/shared/lib';
import { storyActs } from '@/entities/product';
import s from './Depth.module.css';

const tints = [
  'linear-gradient(135deg, #e3dcff, #fbe4f3)',
  'linear-gradient(135deg, #d9f1ff, #e8e3ff)',
  'linear-gradient(135deg, #ffe7da, #fbe4f3)',
  'linear-gradient(135deg, #dcf7ec, #d9f1ff)',
];
// Each card drifts at its own speed, so the grid reads as layers of glass.
const drift = [-40, -120, -70, -160]; // px

export function Depth() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${s.card}`);
        cards.forEach((card, i) => {
          gsap.from(card, {
            y: 100,
            autoAlpha: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          });
          gsap.to(card, {
            y: drift[i % drift.length],
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.depth} id="depth">
      <header className={s.head}>
        <h2 className={s.heading}>
          Four reasons it <span>feels</span> different.
        </h2>
      </header>
      <div className={s.grid}>
        {storyActs.map((act, i) => (
          <article key={act.id} className={s.card}>
            <div className={s.bubble} style={{ '--tint': tints[i] } as CSSProperties}>
              <Image src={act.image.src} width={act.image.width} height={act.image.height} alt={act.image.alt} sizes="40vw" />
            </div>
            <div className={s.meta}>
              <h3 className={s.title}>{act.title}</h3>
              <span className={s.stat}>
                {formatNumber(act.stat.value)}
                <small> {act.stat.unit}</small>
              </span>
            </div>
            <p className={s.text}>{act.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
