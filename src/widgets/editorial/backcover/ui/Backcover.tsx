'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { productImages } from '@/entities/product';
import s from './Backcover.module.css';

export function Backcover() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 60%' } })
          .from(q(`.${s.copy} > *`), { y: 50, autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' })
          .from(q(`.${s.product}`), { x: 120, rotate: 8, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0.2);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const img = productImages.angle;

  return (
    <section ref={root} className={s.back} id="buy">
      <div className={s.copy}>
        <span className={s.kicker}>Back cover · p. 42</span>
        <h2 className={s.title}>
          Available <em>now.</em>
        </h2>
        <p className={s.line}>Slide Control — black, wireless, 55 grams. Designed for comfort, built for control.</p>
        <a className={s.button} href="#buy">
          Order Slide Control
        </a>
      </div>
      <div className={s.product}>
        <Image src={img.src} width={img.width} height={img.height} alt="" sizes="45vw" />
      </div>
      <footer className={s.colophon}>
        <span>GoSlide · No. 04 · © 2026 · Printed on screen</span>
        <nav aria-label="Footer">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#top">Back to cover ↑</a>
        </nav>
      </footer>
    </section>
  );
}
