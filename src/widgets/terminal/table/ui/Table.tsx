'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { specs } from '@/entities/product';
import s from './Table.module.css';

const rows: Array<[string, string]> = [
  [specs.dimensions.title, '40 × 63 × 125 mm'],
  [specs.sensor.title, `${specs.sensor.value} · >888 IPS`],
  ...specs.compact.map(
    (spec): [string, string] => [
      spec.title,
      spec.value ? `${spec.value}${/^[a-z]/i.test(spec.unit ?? '') ? ' ' : ''}${spec.unit ?? ''}` : 'Windows 10+ · USB 2.0',
    ],
  ),
  ['Shell', 'Certified PCR plastic'],
];

// Box-drawing table sized to its longest cell.
const w1 = Math.max(...rows.map(([k]) => k.length), 9) + 2;
const w2 = Math.max(...rows.map(([, v]) => v.length)) + 2;
const line = (l: string, m: string, r: string) => `${l}${'─'.repeat(w1)}${m}${'─'.repeat(w2)}${r}`;
const cell = (a: string, b: string) => `│ ${a.padEnd(w1 - 1)}│ ${b.padEnd(w2 - 1)}│`;
const lines = [
  line('┌', '┬', '┐'),
  cell('PARAMETER', 'VALUE'),
  line('├', '┼', '┤'),
  ...rows.map(([k, v]) => cell(k, v)),
  line('└', '┴', '┘'),
  `${rows.length} rows in set (0.00 sec)`,
];

export function Table() {
  const root = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const pre = preRef.current!;
        const state = { n: 0 };
        pre.textContent = '';
        // Rows print like a query result streaming in.
        gsap.to(state, {
          n: lines.length,
          duration: 1.4,
          ease: 'none',
          onUpdate: () => {
            pre.textContent = lines.slice(0, Math.round(state.n)).join('\n');
          },
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        });
        return () => {
          pre.textContent = lines.join('\n');
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.table} id="specs">
      <p className={s.cmd}>
        <span>goslide@sc-01:~$</span> goslide specs --format table
      </p>
      <pre ref={preRef} className={s.pre} aria-hidden="true">
        {lines.join('\n')}
      </pre>
      <table className="sr-only">
        <caption>Slide Control specifications</caption>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
