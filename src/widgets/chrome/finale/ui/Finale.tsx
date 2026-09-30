'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK, blobPath } from '@/shared/lib';
import { ChromeButton, chromeIds } from '@/shared/ui';
import { productImages } from '@/entities/product';
import s from './Finale.module.css';

const forms = [5, 19, 33].map((seed) => blobPath(seed, { points: 9, variance: 0.26, radius: 250 }));

export function Finale() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const paths = q(`.${s.svg} path`);
        // A drop of liquid metal that never quite settles — paused while off screen,
        // since morphing a path every frame is main-thread work.
        gsap
          .timeline({
            repeat: -1,
            yoyo: true,
            defaults: { duration: 3, ease: 'sine.inOut' },
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
          })
          .to(paths, { morphSVG: forms[1] })
          .to(paths, { morphSVG: forms[2] });
        gsap.from(q(`.${s.drop}`), {
          scale: 0.2,
          autoAlpha: 0,
          duration: 1.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: { trigger: root.current, start: 'top 60%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const img = productImages.angle;

  return (
    <section ref={root} className={s.finale} id="order">
      <div className={s.drop}>
        <svg className={s.svg} viewBox="0 0 600 600" aria-hidden="true">
          <path d={forms[0]} fill={`url(#${chromeIds.metal})`} />
          <path className={s.iris} d={forms[0]} fill={`url(#${chromeIds.iris})`} />
        </svg>
        <div className={s.content}>
          <Image src={img.src} width={img.width} height={img.height} alt="" sizes="34rem" />
          <h2 className={s.title}>Pour yourself one</h2>
          <ChromeButton href="#order" tone="pearl">
            Order Slide Control
          </ChromeButton>
        </div>
      </div>
    </section>
  );
}
