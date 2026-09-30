'use client';

import { useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { reviews } from '@/entities/review';
import s from './Logs.module.css';

const handle = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '_');

type Entry = { t: string; level: 'INFO' | 'MSG' | 'WARN'; body: ReactNode };

const entries: Entry[] = [
  { t: '+00:00:01', level: 'INFO', body: 'sensor calibrated · 20000 dpi · 888 ips' },
  ...reviews.map((r, i) => ({
    t: `+00:0${i + 1}:${String(12 + i * 17).padStart(2, '0')}`,
    level: 'MSG' as const,
    body: (
      <>
        <b>{handle(r.author)}</b> ({r.role})<q>{r.quote}</q>
      </>
    ),
  })),
  { t: '+00:04:40', level: 'WARN', body: 'battery at 94 h — nothing to worry about' },
];

export function Logs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(`.${s.line}`, {
          autoAlpha: 0,
          duration: 0.01,
          stagger: 0.45,
          scrollTrigger: { trigger: root.current, start: 'top 65%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.logs} id="logs">
      <p className={s.cmd}>
        <span>goslide@sc-01:~$</span> tail -f /var/log/goslide/players.log
      </p>
      <ol className={s.stream}>
        {entries.map((e, i) => (
          <li key={i} className={s.line}>
            <span className={s.time}>[{e.t}]</span>
            <span className={clsx(s.level, e.level === 'WARN' && s.warn)}>{e.level}</span>
            <span className={s.msg}>{e.body}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
