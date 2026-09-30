'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useGSAP, ScrollTrigger } from '@/shared/lib';
import s from './Statusbar.module.css';

const windows = [
  { id: 'top', name: 'boot' },
  { id: 'inspect', name: 'inspect' },
  { id: 'specs', name: 'specs' },
  { id: 'logs', name: 'logs' },
  { id: 'shell', name: 'shell' },
];

export function Statusbar() {
  const [active, setActive] = useState('top');
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0, 5));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    windows.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        refreshPriority: -1,
        onToggle: (self) => self.isActive && setActive(id),
      });
    });
  });

  return (
    <header className={s.bar}>
      <span className={s.session}>[goslide]</span>
      <nav className={s.windows} aria-label="Sections">
        {windows.map((w, i) => (
          <a
            key={w.id}
            href={`#${w.id}`}
            className={clsx(active === w.id && s.active)}
            aria-current={active === w.id ? 'location' : undefined}
          >
            {i}:{w.name}
          </a>
        ))}
      </nav>
      <span className={s.right}>&quot;sc-01&quot; {time}</span>
    </header>
  );
}
