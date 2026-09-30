'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { productImages } from '@/entities/product';
import s from './Buy.module.css';

export function Buy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${s.card}`, {
          y: 80,
          scale: 0.94,
          autoAlpha: 0,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const img = productImages.side;

  return (
    <section ref={root} className={s.buy} id="buy">
      <div className={s.card}>
        <Image src={img.src} width={img.width} height={img.height} alt="" sizes="45vw" />
        <div className={s.copy}>
          <h2 className={s.title}>Make it yours.</h2>
          <p className={s.swatch}>
            <i aria-hidden="true" /> Black · Wireless · 55 g
          </p>
          <div className={s.actions}>
            <a className={s.primary} href="#buy">
              Order Slide Control
            </a>
            <a className={s.secondary} href="/">
              See other designs
            </a>
          </div>
        </div>
      </div>
      <footer className={s.footer}>
        <span>© 2026 GoSlide</span>
        <nav aria-label="Footer">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#top">Back to top ↑</a>
        </nav>
      </footer>
    </section>
  );
}
