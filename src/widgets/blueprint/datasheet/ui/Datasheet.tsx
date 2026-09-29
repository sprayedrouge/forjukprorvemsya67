'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, scrambleText } from '@/shared/lib';
import { specs } from '@/entities/product';
import s from './Datasheet.module.css';

type Row = { param: string; value: string; note: string };

// "Hz" reads as a separate unit; "+ IPS" and "-bit ARM" already carry their own joiner.
const unitSuffix = (unit = '') => (/^[a-z]/i.test(unit) ? ` ${unit}` : unit);

const rows: Row[] = [
  { param: specs.dimensions.title, value: '40 × 63 × 125', note: 'mm, height × width × length' },
  { param: specs.sensor.title, value: specs.sensor.value ?? '', note: specs.sensor.text ?? '' },
  ...specs.compact.map((spec) =>
    spec.id === 'system'
      ? { param: spec.title, value: 'Windows 10+', note: 'PC with a USB 2.0 port' }
      : { param: spec.title, value: `${spec.value}${unitSuffix(spec.unit)}`, note: spec.note ?? '' },
  ),
  { param: 'Shell material', value: 'PCR plastic', note: 'Certified post-consumer recycled plastic' },
];

export function Datasheet() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        gsap.from(q(`.${s.heading}`), {
          clipPath: 'inset(0 100% 0 0)',
          ease: 'steps(10)',
          duration: 0.8,
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        });

        const trs = q(`.${s.row}`);
        gsap.set(trs, { clipPath: 'inset(0 100% 0 0)' });
        ScrollTrigger.batch(trs, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            batch.forEach((tr, i) => {
              gsap.to(tr, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, delay: i * 0.08, ease: 'steps(8)' });
              const value = tr.querySelector<HTMLElement>(`.${s.value}`);
              if (value) gsap.delayedCall(i * 0.08 + 0.2, () => scrambleText(value));
            }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.datasheet} id="data">
      <header className={s.head}>
        <h2 className={s.heading}>Data sheet</h2>
        <p className={s.caption}>Table 02 — specifications and compatibility. All values nominal.</p>
      </header>

      <table className={s.table}>
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Parameter</th>
            <th scope="col">Value</th>
            <th scope="col">Note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.param} className={s.row}>
              <td className={s.code}>SC-01.{String(i + 1).padStart(2, '0')}</td>
              <th scope="row" className={s.param}>
                {row.param}
              </th>
              <td className={s.value}>{row.value}</td>
              <td className={s.note}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
