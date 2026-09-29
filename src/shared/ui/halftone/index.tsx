import type { CSSProperties } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import s from './Halftone.module.css';

type HalftoneProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function Halftone({ className, ...img }: HalftoneProps) {
  return (
    <div className={clsx(s.halftone, className)} style={{ '--mask': `url(${img.src})` } as CSSProperties}>
      <Image {...img} alt={img.alt} />
    </div>
  );
}
