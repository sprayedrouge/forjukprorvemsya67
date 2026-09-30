'use client';

import { useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { productImages } from '@/entities/product';
import s from './Hero.module.css';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        // Depth lives in GSAP (z), since GSAP owns these transforms.
        q(`.${s.chip}`).forEach((chip, i) => gsap.set(chip, { z: [120, 140, 100][i] }));
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from(q(`.${s.copy} > *`), { y: 40, autoAlpha: 0, duration: 1.4, stagger: 0.1 })
          .from(q(`.${s.card}`), { y: 80, rotationX: 25, autoAlpha: 0, duration: 1.8 }, 0.2)
          .from(q(`.${s.chip}`), { scale: 0.6, autoAlpha: 0, duration: 1, stagger: 0.12, ease: 'back.out(2)' }, 0.8);
      });

      // The card leans toward the pointer and a glare slides across the glass.
      mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
        const card = root.current!.querySelector<HTMLElement>(`.${s.card}`)!;
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.8, ease: 'power3.out' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.8, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          ry((x - 0.5) * 22);
          rx((0.5 - y) * 22);
          card.style.setProperty('--gx', `${x * 100}%`);
          card.style.setProperty('--gy', `${y * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        root.current!.addEventListener('pointermove', move);
        root.current!.addEventListener('pointerleave', leave);
        return () => {
          root.current?.removeEventListener('pointermove', move);
          root.current?.removeEventListener('pointerleave', leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const img = productImages.angle;

  return (
    <section ref={root} className={s.hero} id="top">
      <div className={s.copy}>
        <span className={s.eyebrow}>New · Wireless</span>
        <h1 className={s.title}>Slide Control.</h1>
        <p className={s.lead}>
          The next evolution of our championship-winning mouse. Light enough to forget, precise enough to trust.
        </p>
        <div className={s.actions}>
          <a className={s.primary} href="#buy">
            Order now
          </a>
          <a className={s.secondary} href="#portal">
            Take a look
          </a>
        </div>
      </div>
      <div className={s.scene}>
        <div className={s.card}>
          <Image src={img.src} width={img.width} height={img.height} alt={img.alt} priority sizes="45vw" />
          <span className={s.glare} aria-hidden="true" />
          <span className={clsx(s.chip, s.c1)}>
            <b>55</b> g
          </span>
          <span className={clsx(s.chip, s.c2)}>
            <b>95</b> h battery
          </span>
          <span className={clsx(s.chip, s.c3)}>
            <b>20K</b> dpi
          </span>
        </div>
      </div>
    </section>
  );
}
