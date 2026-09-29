'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, intro, MOTION_OK, SplitChars } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { productImages } from '@/entities/product';
import s from './Hero.module.css';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const lines = q(`.${s.line}`);
        const chars = lines.map((line) => gsap.utils.toArray<HTMLElement>(`.${s.char}`, line));
        // Resolved up front: the intro callback fires later, outside this scope.
        const [image, glow, bottom] = [q(`.${s.image}`), q(`.${s.glow}`), q(`.${s.bottom}`)];

        // Entrance, released by the preloader.
        gsap.set(chars.flat(), { yPercent: 115 });
        // Entrance and scroll never share a target: the image enters, its wrapper reacts to scroll.
        gsap.set(image, { autoAlpha: 0, y: 140, rotate: -14, scale: 0.8 });
        gsap.set([glow, bottom], { autoAlpha: 0 });

        const off = intro.onDone(() => {
          gsap
            .timeline({ defaults: { ease: 'expo.out' } })
            .to(chars.flat(), { yPercent: 0, duration: 1.6, stagger: 0.035 }, 0.1)
            .to(image, { autoAlpha: 1, y: 0, rotate: 0, scale: 1, duration: 2 }, 0.35)
            .to(glow, { autoAlpha: 1, duration: 2.4, ease: 'power2.out' }, 0.5)
            .fromTo(bottom, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.4 }, 1);
        });

        // Idle hover float.
        gsap.to(`.${s.float}`, { y: -16, rotate: 1.5, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

        // Scroll: pin the hero, fling the letters apart and push the camera into the product.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=90%', pin: true, scrub: 0.8 },
        });
        chars.forEach((lineChars, li) => {
          const mid = (lineChars.length - 1) / 2;
          const w = () => lineChars[0].offsetWidth;
          tl.to(
            lineChars,
            {
              x: (i) => (i - mid) * w() * 0.9,
              y: (i) => (li === 0 ? -1 : 1) * Math.abs(i - mid) * w() * 0.18,
              rotate: (i) => (i - mid) * 7,
              autoAlpha: 0,
            },
            0,
          );
        });
        tl.to(`.${s.product}`, { scale: 1.45, rotate: -6, yPercent: -8 }, 0)
          .to(`.${s.bottom} > *`, { autoAlpha: 0, y: -40 }, 0)
          .to(`.${s.product}`, { autoAlpha: 0, scale: 1.7, filter: 'blur(12px)', duration: 0.35 }, 0.65);

        return off;
      });

      mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
        const tiltX = gsap.quickTo(`.${s.tilt}`, 'x', { duration: 1, ease: 'power3.out' });
        const tiltY = gsap.quickTo(`.${s.tilt}`, 'y', { duration: 1, ease: 'power3.out' });
        const tiltR = gsap.quickTo(`.${s.tilt}`, 'rotate', { duration: 1.2, ease: 'power3.out' });
        const el = root.current!;
        // Custom properties set on the section would restyle every letter; scope them to the glow.
        const glowEl = el.querySelector<HTMLElement>(`.${s.glow}`)!;

        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth;
          const ny = e.clientY / window.innerHeight;
          glowEl.style.setProperty('--mx', nx.toFixed(3));
          glowEl.style.setProperty('--my', ny.toFixed(3));
          tiltX((nx - 0.5) * 50);
          tiltY((ny - 0.5) * 30);
          tiltR((nx - 0.5) * 8);
        };
        el.addEventListener('pointermove', move);
        return () => el.removeEventListener('pointermove', move);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const img = productImages.angle;

  return (
    <section ref={root} className={s.hero} id="top">
      <div className={s.glow} aria-hidden="true" />

      <div className={s.stage}>
        <h1 className={s.title}>
          <SplitChars text="Slide" className={s.line} itemClassName={s.char} />
          <SplitChars text="Control" className={`${s.line} ${s.outline}`} itemClassName={s.char} />
        </h1>

        <div className={s.product}>
          <div className={s.tilt}>
            <div className={s.float}>
              <Image className={s.image} src={img.src} width={img.width} height={img.height} alt={img.alt} priority />
            </div>
          </div>
          <div className={s.shadow} aria-hidden="true" />
        </div>
      </div>

      <div className={s.bottom}>
        <div>
          <p className={s.kicker}>Wireless gaming mouse</p>
          <dl className={s.specs}>
            <div>
              <dt>Weight</dt>
              <dd>55 g</dd>
            </div>
            <div>
              <dt>Resolution</dt>
              <dd>100–20 000 DPI</dd>
            </div>
          </dl>
        </div>
        <Button href="#story" variant="glass" icon="arrow-down">
          Watch it move
        </Button>
        <span className={s.scrollHint} aria-hidden="true" />
      </div>
    </section>
  );
}
