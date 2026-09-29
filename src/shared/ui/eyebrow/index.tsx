import type { ReactNode } from 'react';
import s from './Eyebrow.module.css';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className={s.eyebrow}>{children}</span>;
}
