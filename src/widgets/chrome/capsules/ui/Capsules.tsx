'use client';

import { useRef, type CSSProperties } from 'react';
import clsx from 'clsx';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/shared/lib';
import { specs } from '@/entities/product';
import s from './Capsules.module.css';

type Item = { id: string; icon: string; label: string; value: string; wide?: boolean };

const items: Item[] = [
  { id: 'dimensions', icon: specs.dimensions.icon, label: specs.dimensions.title, value: '40 × 63 × 125 mm' },
  { id: 'sensor', icon: specs.sensor.icon, label: specs.sensor.title, value: specs.sensor.value ?? '' },
  ...specs.compact.map((spec) => ({
    id: spec.id,
    icon: spec.icon,
    label: spec.title,
    value: spec.value ? `${spec.value}${/^[a-z]/i.test(spec.unit ?? '') ? ' ' : ''}${spec.unit ?? ''}` : 'Windows 10+ · USB 2.0',
  })),
  {
    id: 'eco',
    icon: specs.dimensions.icon,
    label: 'Recycled plastics',
    value: 'Shell parts include certified post-consumer recycled plastic — a next life for old electronics.',
    wide: true,
  },
];

export function Capsules() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const caps = gsap.utils.toArray<HTMLElement>(`.${s.capsule}`);
        // Droplets: each capsule swells out of a bead of liquid.
        gsap.set(caps, { scale: 0.3, autoAlpha: 0, borderRadius: '50%' });
        ScrollTrigger.batch(caps, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              scale: 1,
              autoAlpha: 1,
              borderRadius: (i, el) => ((el as HTMLElement).classList.contains(s.wide) ? '4rem' : '999px'),
              duration: 1,
              stagger: 0.07,
              ease: 'elastic.out(1, 0.6)',
            }),
        });
        gsap.from(`.${s.heading}`, {
          letterSpacing: '0.4em',
          autoAlpha: 0,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: `.${s.heading}`, start: 'top 85%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.capsules} id="capsules">
      <header className={s.head}>
        <h2 className={s.heading}>Specifications</h2>
      </header>
      <ul className={s.grid} role="list">
        {items.map((item) => (
          <li key={item.id} className={clsx(s.capsule, item.wide && s.wide)}>
            <span className={s.gem} style={{ '--icon': `url(${item.icon})` } as CSSProperties} aria-hidden="true" />
            <span>
              <span className={s.label}>{item.label}</span>
              <span className={s.value}>{item.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
