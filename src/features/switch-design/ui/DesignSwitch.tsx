'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { designs, type DesignId } from '@/shared/config';
import { isMotionForced, setMotionForced, systemReducesMotion } from '@/shared/lib';
import s from './DesignSwitch.module.css';

type DesignSwitchProps = {
  current: DesignId;
  tone: 'dark' | 'paper' | 'pop' | 'chrome' | 'term' | 'serif' | 'glass';
};

/** Shown only when the OS asks for reduced motion: lets the visitor turn animations back on. */
function MotionToggle() {
  const [state, setState] = useState<'hidden' | 'off' | 'on'>('hidden');

  useEffect(() => {
    if (isMotionForced()) setState('on');
    else if (systemReducesMotion()) setState('off');
  }, []);

  if (state === 'hidden') return null;
  const on = state === 'on';

  return (
    <button
      type="button"
      className={clsx(s.link, s.motion, on && s.motionOn)}
      aria-pressed={on}
      title={
        on
          ? 'Animations are on although your system asks for reduced motion. Click to follow the system again.'
          : 'Your system asks for reduced motion (on Windows: Settings → Accessibility → Visual effects → Animation effects). Click to turn animations on here.'
      }
      onClick={() => setMotionForced(!on)}
    >
      Motion: {on ? 'on' : 'off'}
    </button>
  );
}

/* Plain anchors on purpose: a full load gives each design a clean scroll and animation state. */
export function DesignSwitch({ current, tone }: DesignSwitchProps) {
  return (
    <nav className={clsx(s.switch, s[tone])} aria-label="Choose design">
      <a className={s.label} href="/">
        Design
      </a>
      {designs.map((d) => (
        <a
          key={d.id}
          className={clsx(s.link, d.id === current && s.current)}
          href={d.href}
          aria-current={d.id === current ? 'page' : undefined}
        >
          {d.name}
        </a>
      ))}
      <MotionToggle />
    </nav>
  );
}
