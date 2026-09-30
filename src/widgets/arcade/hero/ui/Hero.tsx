'use client';

import { useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap, useGSAP, Draggable, MOTION_OK, SplitChars } from '@/shared/lib';
import { PopButton } from '@/shared/ui';
import { productImages } from '@/entities/product';
import s from './Hero.module.css';

// Tilt lives in GSAP, not CSS `rotate`, because GSAP owns these elements' transforms.
const stickers = [
  { cls: s.s1, text: '55 g!', tilt: -12 },
  { cls: s.s2, text: 'No wires', tilt: 8 },
  { cls: s.s3, text: '20K dpi', tilt: 10 },
  { cls: s.s4, text: 'P1 ready', tilt: -6 },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // Stickers can be grabbed and thrown in every mode: it is an interaction, not decoration.
      q(`.${s.sticker}`).forEach((el, i) => gsap.set(el, { rotation: stickers[i].tilt }));

      let z = 10;
      const drags = Draggable.create(q(`.${s.sticker}`), {
        type: 'x,y',
        bounds: root.current,
        inertia: true,
        onPress() {
          gsap.set(this.target, { zIndex: ++z });
          gsap.to(this.target, { scale: 1.12, duration: 0.25, ease: 'back.out(3)' });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: 'back.out(2.2)' } })
          .from(q(`.${s.char}`), { yPercent: 120, scale: 0.4, rotate: () => gsap.utils.random(-25, 25), duration: 0.8, stagger: 0.035 })
          .from(q(`.${s.product}`), { y: -400, rotate: 20, duration: 1.2, ease: 'bounce.out' }, 0.2)
          .from(q(`.${s.sticker}`), { scale: 0, duration: 0.7, stagger: 0.1, ease: 'elastic.out(1, 0.45)' }, 0.8)
          .from(q(`.${s.row} > *, .${s.hint}`), { y: 40, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 0.9);

        // Idle bob so the product feels alive.
        gsap.to(q(`.${s.product} img`), { y: -14, rotate: -2, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        gsap.to(q(`.${s.product}`), {
          yPercent: 30,
          rotate: 14,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      return () => {
        drags.forEach((d) => d.kill());
        mm.revert();
      };
    },
    { scope: root },
  );

  const img = productImages.angle;

  return (
    <section ref={root} className={s.hero} id="top">
      <p className={s.hint}>Psst — throw the stickers</p>

      <div className={s.product}>
        <Image src={img.src} width={img.width} height={img.height} alt={img.alt} priority sizes="46vw" />
      </div>

      {stickers.map((st) => (
        <span key={st.text} className={clsx(s.sticker, st.cls)} aria-hidden="true">
          {st.text}
        </span>
      ))}

      <h1 className={s.title}>
        <SplitChars text="Slide" className={s.line} itemClassName={s.char} />
        <SplitChars text="Control" className={s.line} itemClassName={s.char} />
      </h1>

      <div className={s.row}>
        <p className={s.lead}>
          The next evolution of our championship-winning mouse. 55 grams, no cable, and a sensor that doesn’t miss.
        </p>
        <div className={s.actions}>
          <PopButton href="#levels">Press start ↓</PopButton>
          <PopButton href="#coin" tone="cream">
            Insert coin
          </PopButton>
        </div>
      </div>
    </section>
  );
}
