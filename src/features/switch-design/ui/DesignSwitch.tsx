import clsx from 'clsx';
import { designs, type DesignId } from '@/shared/config';
import s from './DesignSwitch.module.css';

type DesignSwitchProps = {
  current: DesignId;
  tone: 'dark' | 'paper';
};

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
    </nav>
  );
}
