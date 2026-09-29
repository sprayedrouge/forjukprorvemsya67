'use client';

import { useRef, type PointerEvent } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/shared/lib';
import { Eyebrow } from '@/shared/ui';
import { SpecCard, SpecIcon, specCardStyles, specs, productImages } from '@/entities/product';
import s from './Specs.module.css';

export function Specs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${s.head} > *`, {
          y: 60,
          autoAlpha: 0,
          filter: 'blur(10px)',
          stagger: 0.1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: `.${s.head}`, start: 'top 85%' },
        });

        const cards = gsap.utils.toArray<HTMLElement>('[data-spec-card]');
        gsap.set(cards, { autoAlpha: 0, y: 90, rotateX: -12, transformOrigin: '50% 0%' });
        ScrollTrigger.batch(cards, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.3, stagger: 0.09, ease: 'expo.out' }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Spotlight borders: every card knows where the cursor is, even the neighbours.
  // Once per frame, all reads before all writes, so the browser never lays out mid-loop.
  const frame = useRef(0);
  const onPointerMove = (e: PointerEvent) => {
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const cards = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-spec-card]') ?? []);
      const rects = cards.map((card) => card.getBoundingClientRect());
      cards.forEach((card, i) => {
        card.style.setProperty('--x', `${clientX - rects[i].left}px`);
        card.style.setProperty('--y', `${clientY - rects[i].top}px`);
      });
    });
  };

  const top = productImages.top;
  const side = productImages.side;

  return (
    <section ref={root} className={s.specs} id="specs">
      <div className="container">
        <header className={s.head}>
          <Eyebrow>Specs and compatibility</Eyebrow>
          <h2 className={s.heading}>Everything, measured.</h2>
        </header>

        <div className={s.bento} onPointerMove={onPointerMove}>
          <SpecCard className={s.dims} coreClassName={s.dimsCore}>
            <SpecIcon src={specs.dimensions.icon} />
            <div className={s.dimsFigure}>
              <Image src={top.src} width={top.width} height={top.height} alt="" sizes="20rem" />
              <span className={s.lineLen}>
                <span>125 mm</span>
              </span>
              <span className={s.lineWid}>
                <span>63 mm</span>
              </span>
            </div>
            <div>
              <h3 className={specCardStyles.title}>{specs.dimensions.title}</h3>
              <p className={`${specCardStyles.text} mono`}>{specs.dimensions.text}</p>
            </div>
          </SpecCard>

          <SpecCard className={s.sensor}>
            <SpecIcon src={specs.sensor.icon} />
            <h3 className={specCardStyles.title}>{specs.sensor.title}</h3>
            <p className={s.display}>{specs.sensor.value}</p>
            <p className={`${specCardStyles.text} mono`}>{specs.sensor.text}</p>
          </SpecCard>

          <SpecCard className={s.eco} coreClassName={s.ecoCore}>
            <Image className={s.ecoImage} src={side.src} width={side.width} height={side.height} alt="" sizes="40vw" />
            <div className={s.ecoCopy}>
              <span className={s.badge}>Recycled plastics</span>
              <h3 className={s.ecoTitle}>A next life for old electronics.</h3>
              <p className={specCardStyles.text}>
                The plastic parts include certified post-consumer recycled plastic, to help reduce our carbon footprint.
              </p>
            </div>
          </SpecCard>

          {specs.compact.map((spec) => (
            <SpecCard key={spec.id} spec={spec} style={{ gridArea: spec.id }} />
          ))}
        </div>
      </div>
    </section>
  );
}
