'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, scrambleText } from '@/shared/lib';
import { Halftone } from '@/shared/ui';
import { productImages } from '@/entities/product';
import s from './Hero.module.css';

const meta = [
  ['Unit', 'SC-01'],
  ['Class', 'Wireless gaming mouse'],
  ['Mass', '55 g'],
  ['Status', 'In production'],
] as const;

const stats = [
  ['Mass, g', '55'],
  ['Resolution, dpi', '20 000'],
  ['Report rate, Hz', '5000'],
  ['Battery, h', '95'],
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);

        // Print run: lines wipe in like a plate passing under a roller, in hard steps.
        gsap
          .timeline({ defaults: { ease: 'steps(10)' } })
          .from(q(`.${s.line}`), { clipPath: 'inset(0 100% 0 0)', duration: 0.8, stagger: 0.2 })
          .from(q(`.${s.figure}`), { clipPath: 'inset(0 0 100% 0)', duration: 0.7 }, 0.45)
          .from(q(`.${s.body} > *`), { autoAlpha: 0, duration: 0.3, stagger: 0.08, ease: 'steps(3)' }, 0.6)
          .add(() => q('[data-scramble]').forEach((el) => scrambleText(el as HTMLElement)), 0.7);

        // Scroll: the two lines slide apart like shifted type on a press bed.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
          .to(q(`.${s.line}`)[0], { xPercent: -14 }, 0)
          .to(q(`.${s.line}`)[1], { xPercent: 8 }, 0)
          .to(q(`.${s.figure}`), { yPercent: -18, rotate: -4 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const img = productImages.side;

  return (
    <section ref={root} className={s.hero} id="top">
      <dl className={s.meta}>
        {meta.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd className={k === 'Status' ? s.live : undefined} data-scramble>
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <h1 className={s.headline}>
        <span className={s.line}>Slide</span>
        <span className={s.line}>
          Control<sup>®</sup>
        </span>
      </h1>

      <figure className={s.figure}>
        <figcaption className={s.tag}>
          <b>■</b> Fig. 00 / Profile / Scale 1:1
        </figcaption>
        <Halftone src={img.src} width={img.width} height={img.height} alt={img.alt} sizes="46vw" priority />
      </figure>

      <div className={s.body}>
        <p className={s.lead}>
          The next evolution of our championship-winning mouse. Meet the new <em>weapon of choice</em> for the world’s
          top esports athletes.
        </p>
        <dl className={s.stats}>
          {stats.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd data-scramble>{v}</dd>
            </div>
          ))}
        </dl>
        <a className={s.cta} href="#figures">
          <span>[ Read the sheet ]</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
