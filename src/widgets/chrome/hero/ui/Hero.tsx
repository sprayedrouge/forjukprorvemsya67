'use client';

import { useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { ChromeButton, chromeIds } from '@/shared/ui';
import { productImages } from '@/entities/product';
import s from './Hero.module.css';

const sparkles = [
  { top: '18%', left: '12%', size: '2.4rem', dur: '3.2s', delay: '0s' },
  { top: '28%', left: '86%', size: '1.8rem', dur: '2.6s', delay: '0.8s' },
  { top: '62%', left: '8%', size: '1.4rem', dur: '3.6s', delay: '1.4s' },
  { top: '12%', left: '64%', size: '1.2rem', dur: '2.2s', delay: '0.3s' },
  { top: '70%', left: '90%', size: '2.8rem', dur: '4s', delay: '1s' },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const warp = document.querySelector(`#${chromeIds.liquid} feDisplacementMap`);
        const title = q(`.${s.title}`)[0] as HTMLElement;
        const liquid = { v: 90 };
        const setWarp = () => warp?.setAttribute('scale', liquid.v.toFixed(1));
        const melt = () => title.classList.add(s.warping);
        const solidify = () => title.classList.remove(s.warping);

        // Molten entrance: the title pours in distorted and settles into solid metal.
        gsap
          .timeline()
          .from(q(`.${s.title} span`), { yPercent: 40, autoAlpha: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' }, 0)
          .to(liquid, { v: 0, duration: 2.2, ease: 'elastic.out(1, 0.35)', onStart: melt, onUpdate: setWarp, onComplete: solidify }, 0)
          .from(q(`.${s.product}`), { y: 120, scale: 0.8, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0.4)
          .from(q(`.${s.row} > *`), { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, 0.9);

        // Touching the metal sends a ripple through it.
        const ripple = () =>
          gsap.fromTo(
            liquid,
            { v: 40 },
            { v: 0, duration: 1.4, ease: 'elastic.out(1, 0.3)', onStart: melt, onUpdate: setWarp, onComplete: solidify, overwrite: true },
          );
        title.addEventListener('pointerenter', ripple);

        gsap.to(q(`.${s.product} > img:first-child`), { y: -18, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
          .to(q(`.${s.title}`), { yPercent: -30, scale: 0.9, ease: 'none' }, 0)
          .to(q(`.${s.product}`), { yPercent: 20, scale: 1.15, ease: 'none' }, 0);

        return () => title.removeEventListener('pointerenter', ripple);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const img = productImages.angle;

  return (
    <section ref={root} className={s.hero} id="top">
      <div className={s.floor} aria-hidden="true" />
      {sparkles.map((sp, i) => (
        <span
          key={i}
          className={s.sparkle}
          aria-hidden="true"
          style={
            { top: sp.top, left: sp.left, '--size': sp.size, '--dur': sp.dur, '--delay': sp.delay } as CSSProperties
          }
        >
          ✦
        </span>
      ))}

      <h1 className={s.title}>
        <span>Slide</span>
        <span>Control</span>
      </h1>

      <div className={s.product}>
        <Image src={img.src} width={img.width} height={img.height} alt={img.alt} priority sizes="52vw" />
        <Image className={s.reflection} src={img.src} width={img.width} height={img.height} alt="" sizes="52vw" />
        <span className={s.halo} aria-hidden="true" />
      </div>

      <div className={s.row}>
        <p className={s.lead}>
          The next evolution of our championship-winning mouse, finished like liquid metal. 55 grams, no wires,
          20 000 DPI.
        </p>
        <div className={s.actions}>
          <ChromeButton href="#morph">Explore the forms</ChromeButton>
          <ChromeButton href="#order" tone="pearl">
            Order
          </ChromeButton>
        </div>
      </div>
    </section>
  );
}
