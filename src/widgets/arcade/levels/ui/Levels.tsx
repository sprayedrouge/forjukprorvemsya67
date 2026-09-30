'use client';

import { useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, formatNumber } from '@/shared/lib';
import { storyActs } from '@/entities/product';
import s from './Levels.module.css';

const colors = ['var(--pink)', 'var(--blue)', 'var(--orange)', 'var(--lilac)'];
const pad = (n: number) => String(n).padStart(2, '0');

export function Levels() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${s.card}`);

        cards.forEach((card, i) => {
          // Score counts up once when the card lands on the pile.
          const num = card.querySelector<HTMLElement>('[data-score]')!;
          const target = storyActs[i].stat.value;
          const counter = { v: 0 };
          num.textContent = '0';
          ScrollTrigger.create({
            trigger: card,
            start: 'top 70%',
            once: true,
            onEnter: () =>
              gsap.to(counter, {
                v: target,
                duration: 1.2,
                ease: 'power3.out',
                onUpdate: () => {
                  num.textContent = formatNumber(counter.v);
                },
              }),
          });

          // As the next card slides over, this one sinks back into the pile.
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9,
            rotate: i % 2 ? 2 : -2,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
          });
        });

        gsap.from(`.${s.head} > *`, {
          y: 60,
          autoAlpha: 0,
          rotate: -3,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: `.${s.head}`, start: 'top 80%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.levels} id="levels">
      <header className={s.head}>
        <h2 className={s.heading}>
          Four levels. <em>One</em> mouse.
        </h2>
        <p className={s.caption}>Scroll to play. Every level unlocks another side of Slide Control.</p>
      </header>

      <div className={s.stack}>
        {storyActs.map((act, i) => (
          <article
            key={act.id}
            className={s.card}
            style={{ '--i': i, '--bg': colors[i % colors.length] } as CSSProperties}
            aria-labelledby={`level-${act.id}`}
          >
            <div className={s.copy}>
              <span className={s.badge}>
                Level {pad(i + 1)} / {pad(storyActs.length)}
                <span className={s.stars} aria-label={`${i + 1} of ${storyActs.length} stars`}>
                  {storyActs.map((_, j) => (
                    <i key={j} className={clsx(j <= i && s.on)}>
                      ★
                    </i>
                  ))}
                </span>
              </span>
              <h3 className={s.title} id={`level-${act.id}`}>
                {act.title}
              </h3>
              <p className={s.text}>{act.text}</p>
              <p className={s.score}>
                <small>Score · {act.stat.label}</small>
                <b>
                  <span data-score>{formatNumber(act.stat.value)}</span>
                  <span className={s.unit}>{act.stat.unit}</span>
                </b>
              </p>
            </div>
            <div className={s.art}>
              <span className={s.blob} aria-hidden="true" />
              <Image src={act.image.src} width={act.image.width} height={act.image.height} alt={act.image.alt} sizes="40vw" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
