'use client';

import { useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/shared/lib';
import { productImages, specs } from '@/entities/product';
import s from './Loadout.module.css';

const tint: Record<string, string> = {
  rate: 'var(--pink)',
  battery: 'var(--orange)',
  speed: 'var(--blue)',
  mcu: 'var(--lilac)',
  system: 'var(--cream)',
  warranty: 'var(--pink)',
};

const iconStyle = (src: string) => ({ '--icon': `url(${src})` }) as CSSProperties;

export function Loadout() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${s.card}`);
        gsap.set(cards, { scale: 0.6, autoAlpha: 0, rotation: () => gsap.utils.random(-10, 10) });
        ScrollTrigger.batch(cards, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { scale: 1, autoAlpha: 1, rotation: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(2.5)' }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const top = productImages.top;
  const side = productImages.side;

  return (
    <section ref={root} className={s.loadout} id="loadout">
      <header className={s.head}>
        <h2 className={s.heading}>Your loadout</h2>
      </header>

      <div className={s.grid}>
        <article className={clsx(s.card, s.dims)}>
          <span className={s.icon} style={iconStyle(specs.dimensions.icon)} aria-hidden="true" />
          <h3 className={s.label}>{specs.dimensions.title}</h3>
          <Image src={top.src} width={top.width} height={top.height} alt="" sizes="20rem" />
          <p className={s.note}>{specs.dimensions.text}</p>
        </article>

        <article className={clsx(s.card, s.sensor)}>
          <span className={s.icon} style={iconStyle(specs.sensor.icon)} aria-hidden="true" />
          <h3 className={s.label}>{specs.sensor.title}</h3>
          <p className={s.value}>{specs.sensor.value}</p>
          <p className={s.note}>{specs.sensor.text}</p>
        </article>

        {specs.compact.map((spec) => (
          <article
            key={spec.id}
            className={s.card}
            style={{ gridArea: spec.id, '--bg': tint[spec.id] } as CSSProperties}
          >
            <span className={s.icon} style={iconStyle(spec.icon)} aria-hidden="true" />
            <h3 className={s.label}>{spec.title}</h3>
            {spec.value ? (
              <p className={s.value}>
                {spec.value}
                <small> {spec.unit}</small>
              </p>
            ) : (
              <p className={clsx(s.note, s.long)}>{spec.text}</p>
            )}
            {spec.note && <p className={s.note}>{spec.note}</p>}
          </article>
        ))}

        <article className={clsx(s.card, s.eco)}>
          <Image src={side.src} width={side.width} height={side.height} alt="" sizes="30vw" />
          <div>
            <h3>Recycled plastics, second life.</h3>
            <p className={s.note}>
              The plastic parts include certified post-consumer recycled plastic, to help reduce our carbon footprint.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
