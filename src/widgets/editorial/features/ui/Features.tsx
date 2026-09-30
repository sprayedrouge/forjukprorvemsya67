'use client';

import { useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap, useGSAP, MOTION_OK, formatNumber } from '@/shared/lib';
import { productImages, storyActs, featureCopy } from '@/entities/product';
import s from './Features.module.css';

const tones = ['#d9cfc0', '#c9d0c3', '#d6c3c0', '#c7c9d3'];
const pages = [12, 18, 24, 30];

/** Splits a headline into two balanced lines and italicises the last word, magazine-style. */
function Headline({ text }: { text: string }) {
  const words = text.replace(/\.$/, '').split(' ');
  const cut = Math.ceil(words.length / 2);
  const last = words.pop()!;
  const first = words.slice(0, cut);
  const rest = words.slice(cut);
  return (
    <>
      <span className={s.ln}>
        <span>{first.join(' ')}</span>
      </span>
      <span className={s.ln}>
        <span>
          {rest.join(' ')} <em>{last}.</em>
        </span>
      </span>
    </>
  );
}

export function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);

        gsap.fromTo(
          q(`.${s.essay} img`),
          { scale: 1.25 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: q(`.${s.essay}`)[0], start: 'top bottom', end: 'bottom top', scrub: true } },
        );
        gsap.from(q(`.${s.essayTitle}, .${s.essayNote}`), {
          y: 60,
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: q(`.${s.essay}`)[0], start: 'top 40%' },
        });

        q(`.${s.spread}`).forEach((spread) => {
          const sq = gsap.utils.selector(spread);
          // Curtain reveal on the plate, then the headline rises line by line.
          gsap.fromTo(
            sq(`.${s.plate}`),
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: spread, start: 'top 75%' } },
          );
          gsap.from(sq(`.${s.plate} img`), {
            scale: 1.2,
            duration: 1.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: spread, start: 'top 75%' },
          });
          gsap.from(sq(`.${s.headline} .${s.ln} > span`), {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: sq(`.${s.headline}`)[0], start: 'top 85%' },
          });
          gsap.from(sq(`.${s.deck}, .${s.body}, .${s.pull}, .${s.stat}`), {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: sq(`.${s.deck}`)[0], start: 'top 85%' },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const scene = productImages.scene;

  return (
    <section ref={root} className={s.features} aria-label="Features">
      <figure className={s.essay}>
        <Image src={scene.src} width={scene.width} height={scene.height} alt={scene.alt} sizes="100vw" />
        <figcaption className={s.essayCaption}>
          <h2 className={s.essayTitle}>
            The <em>Control</em> Issue
          </h2>
          <p className={s.essayNote}>A photo essay in four parts. Photography: GoSlide studio.</p>
        </figcaption>
      </figure>

      {storyActs.map((act, i) => {
        const copy = featureCopy[act.id];
        return (
          <article
            key={act.id}
            id={`feature-${act.id}`}
            className={clsx(s.spread, i % 2 === 1 && s.flip)}
            aria-labelledby={`headline-${act.id}`}
          >
            <figure className={s.figure}>
              <div className={s.plate} style={{ '--tone': tones[i] } as CSSProperties}>
                <Image src={act.image.src} width={act.image.width} height={act.image.height} alt={act.image.alt} sizes="45vw" />
                <figcaption className={s.figcaption}>{act.image.alt}.</figcaption>
                <span className={s.folio}>GoSlide · {pages[i]}</span>
              </div>
            </figure>
            <div className={s.article}>
              <span className={s.kicker}>
                Feature · {copy.kicker}
              </span>
              <h2 className={s.headline} id={`headline-${act.id}`}>
                <Headline text={act.title} />
              </h2>
              <p className={s.deck}>{copy.deck}</p>
              <div className={s.body}>
                {copy.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              <blockquote className={s.pull}>{copy.pull}</blockquote>
              <p className={s.stat}>
                <b>{formatNumber(act.stat.value)}</b>
                {act.stat.unit} · {act.stat.label}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
