'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, prefersReducedMotion } from '@/shared/lib';
import s from './Coin.module.css';

const palette = ['#cfff45', '#ff6fb5', '#4b6bff', '#ff8a2a', '#b9a6ff', '#fff6e5'];

function burst(x: number, y: number) {
  if (prefersReducedMotion()) return;
  for (let i = 0; i < 48; i++) {
    const bit = document.createElement('i');
    bit.className = s.confetti;
    bit.style.background = palette[i % palette.length];
    bit.style.left = `${x}px`;
    bit.style.top = `${y}px`;
    document.body.appendChild(bit);
    const angle = gsap.utils.random(-Math.PI, 0);
    const force = gsap.utils.random(260, 620);
    gsap
      .timeline({ onComplete: () => bit.remove() })
      .to(bit, {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force,
        rotation: gsap.utils.random(-540, 540),
        duration: 0.7,
        ease: 'power3.out',
      })
      .to(bit, { y: `+=${window.innerHeight}`, rotation: '+=360', duration: 1.6, ease: 'power1.in' })
      .to(bit, { autoAlpha: 0, duration: 0.3 }, '-=0.3');
  }
}

/* Checkout isn't wired yet: pressing the button celebrates, it doesn't charge. */
export function Coin() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${s.title}`, {
          scale: 0.6,
          rotate: -8,
          autoAlpha: 0,
          ease: 'elastic.out(1, 0.5)',
          duration: 1.4,
          scrollTrigger: { trigger: root.current, start: 'top 60%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.coin} id="coin">
      <h2 className={s.title}>
        Insert <span>coin</span>
      </h2>
      <button
        type="button"
        className={s.button}
        aria-label="Order Slide Control"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          burst(r.left + r.width / 2, r.top + r.height / 3);
        }}
      >
        <span className={s.cap}>Order</span>
      </button>
      <p className={s.sub}>Slide Control · Black · Wireless</p>
    </section>
  );
}
