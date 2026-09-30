'use client';

import { useRef, type CSSProperties } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { specs } from '@/entities/product';
import s from './Specs.module.css';

const rows = [
  { icon: specs.dimensions.icon, label: specs.dimensions.title, value: '40 × 63 × 125 mm' },
  { icon: specs.sensor.icon, label: specs.sensor.title, value: `${specs.sensor.value}` },
  ...specs.compact.map((spec) => ({
    icon: spec.icon,
    label: spec.title,
    value: spec.value ? `${spec.value}${/^[a-z]/i.test(spec.unit ?? '') ? ' ' : ''}${spec.unit ?? ''}` : 'Windows 10+ · USB 2.0',
  })),
];

export function Specs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${s.row}`, {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.specs} id="specs">
      <h2 className={s.heading}>Tech specs</h2>
      <dl className={s.panel}>
        {rows.map((r) => (
          <div key={r.label} className={s.row}>
            <span className={s.icon} style={{ '--icon': `url(${r.icon})` } as CSSProperties} aria-hidden="true" />
            <dt className={s.label}>{r.label}</dt>
            <dd className={s.value}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
