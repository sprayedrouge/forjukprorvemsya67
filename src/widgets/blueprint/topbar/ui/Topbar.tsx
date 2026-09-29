'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import s from './Topbar.module.css';

const nav = [
  { label: 'Figures', href: '#figures' },
  { label: 'Data', href: '#data' },
  { label: 'Reports', href: '#reports' },
];

function useUtcClock() {
  // Rendered empty on the server so hydration never mismatches.
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Topbar() {
  const time = useUtcClock();

  return (
    <header className={s.bar}>
      <a className={clsx(s.cell, s.brand)} href="#top">
        GoSlide<sup>®</sup>
      </a>
      <div className={clsx(s.cell, s.doc)}>Doc SC-01 / Rev 2.6 / Sheet 01 of 05</div>
      <nav className={clsx(s.cell, s.nav)} aria-label="Sections">
        {nav.map((link) => (
          <a key={link.href} href={link.href}>
            [ {link.label} ]
          </a>
        ))}
      </nav>
      <div className={clsx(s.cell, s.clock)} aria-label="Current UTC time">
        UTC {time}
      </div>
      <a className={clsx(s.cell, s.order)} href="#order">
        Order &gt;&gt;&gt;
      </a>
    </header>
  );
}
