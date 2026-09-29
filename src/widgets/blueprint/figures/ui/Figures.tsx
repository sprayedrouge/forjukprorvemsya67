'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import { gsap, useGSAP, MOTION_OK, formatNumber } from '@/shared/lib';
import { Halftone } from '@/shared/ui';
import { storyActs } from '@/entities/product';
import s from './Figures.module.css';

const views: Record<string, string> = {
  wireless: 'Top',
  weight: 'Profile',
  sensor: 'Base',
  response: 'Three-quarter',
};

const pad = (n: number) => String(n).padStart(2, '0');

export function Figures() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`${MOTION_OK} and (min-width: 861px)`, () => {
        const el = root.current!;
        el.classList.add(s.horizontal);

        const q = gsap.utils.selector(el);
        const track = q(`.${s.track}`)[0] as HTMLElement;
        const stage = q(`.${s.stage}`)[0] as HTMLElement;
        const counter = q('[data-count]')[0] as HTMLElement;
        const distance = () => track.scrollWidth - stage.clientWidth;

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(q(`.${s.progress} i`), { scaleX: self.progress });
              counter.textContent = pad(Math.min(storyActs.length, Math.round(self.progress * (storyActs.length - 1)) + 1));
            },
          },
        });

        // Each sheet reacts to its own entrance into the frame.
        q(`.${s.sheet}`).forEach((sheet) => {
          const sq = gsap.utils.selector(sheet);
          gsap.from(sq(`.${s.num}`), {
            xPercent: 60,
            ease: 'none',
            scrollTrigger: { trigger: sheet, containerAnimation: slide, start: 'left right', end: 'left 30%', scrub: true },
          });
          gsap.from(sq(`.${s.drawing}`), {
            rotate: 12,
            scale: 0.85,
            ease: 'none',
            scrollTrigger: { trigger: sheet, containerAnimation: slide, start: 'left right', end: 'center center', scrub: true },
          });
        });

        return () => el.classList.remove(s.horizontal);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.figures} id="figures" aria-label="Exploded views">
      <div className={s.stage}>
        <div className={s.head}>
          <span>[ Fig. 01–04 ]</span>
          <span>One shape, four sides</span>
          <span className={s.count}>
            <b data-count>01</b> / {pad(storyActs.length)}
          </span>
        </div>
        <div className={s.progress} aria-hidden="true">
          <i />
        </div>

        <div className={s.track}>
          {storyActs.map((act, i) => (
            <article key={act.id} className={s.sheet} aria-labelledby={`fig-${act.id}`}>
              <div className={s.info}>
                <span className={s.fig}>
                  Fig. {pad(i + 1)} / View: {views[act.id]}
                </span>
                <span className={s.num} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <h2 className={s.title} id={`fig-${act.id}`}>
                  {act.title}
                </h2>
                <p className={s.text}>{act.text}</p>
                <p className={s.stat}>
                  <b>{formatNumber(act.stat.value)}</b>
                  <span>
                    {act.stat.unit} / {act.stat.label}
                  </span>
                </p>
              </div>

              <div className={s.board}>
                <span className={clsx(s.cross, s.tl)} />
                <span className={clsx(s.cross, s.tr)} />
                <span className={clsx(s.cross, s.bl)} />
                <span className={clsx(s.cross, s.br)} />
                <span className={s.view}>SC-01 / Fig. {pad(i + 1)}</span>
                <Halftone
                  className={clsx(s.drawing, act.orientation === 'portrait' && s.portrait)}
                  src={act.image.src}
                  width={act.image.width}
                  height={act.image.height}
                  alt={act.image.alt}
                  sizes="(max-width: 860px) 80vw, 40vw"
                />
                <span className={s.scale}>
                  0 <i /> 50 mm
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
