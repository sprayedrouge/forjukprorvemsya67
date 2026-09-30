'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { productImages } from '@/entities/product';
import s from './Portal.module.css';

export function Portal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        el.classList.add(s.live);
        const q = gsap.utils.selector(el);
        const sheet = q(`.${s.sheet}`)[0] as HTMLElement;
        const aim = q('[data-aim]')[0] as HTMLElement;

        // Zoom towards the middle of the "I": its solid stroke becomes the whole screen.
        const setOrigin = () => {
          const a = aim.getBoundingClientRect();
          const b = sheet.getBoundingClientRect();
          const x = a.left + a.width / 2 - b.left;
          const y = a.top + a.height * 0.55 - b.top;
          gsap.set(sheet, { transformOrigin: `${x}px ${y}px` });
        };

        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: q(`.${s.stage}`)[0],
              start: 'top top',
              end: '+=180%',
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              invalidateOnRefresh: true,
              onRefreshInit: () => gsap.set(sheet, { scale: 1 }),
              onRefresh: setOrigin,
            },
          })
          .to(q(`.${s.hint}`), { autoAlpha: 0, duration: 0.1 }, 0)
          .to(sheet, { scale: 60, duration: 1, ease: 'power2.in' }, 0)
          .set(sheet, { autoAlpha: 0 }, 1)
          .fromTo(q(`.${s.photo} img`), { scale: 1.3 }, { scale: 1, duration: 1.2 }, 0)
          .from(q(`.${s.caption} > *`), { y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.3 }, 0.95);

        setOrigin();
        return () => el.classList.remove(s.live);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const scene = productImages.scene;

  return (
    <section ref={root} className={s.portal} id="portal" aria-label="Into the scene">
      <div className={s.stage}>
        <div className={s.photo}>
          <Image src={scene.src} width={scene.width} height={scene.height} alt={scene.alt} sizes="100vw" />
        </div>
        <div className={s.sheet} aria-hidden="true">
          <span className={s.word}>
            SL<span data-aim>I</span>DE
          </span>
        </div>
        <div className={s.caption}>
          <h2>Smooth tracking. Fast response.</h2>
          <p>Scroll into the picture — the mouse is waiting on the other side.</p>
        </div>
        <span className={s.hint}>Scroll to fly in ↓</span>
      </div>
    </section>
  );
}
