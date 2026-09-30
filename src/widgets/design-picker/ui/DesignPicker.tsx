'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { designs, siteConfig, type DesignId } from '@/shared/config';
import { useAscii } from '@/shared/lib';
import { Halftone, LAST_DESIGN_KEY } from '@/shared/ui';
import { productImages } from '@/entities/product';
import s from './DesignPicker.module.css';

function useLastDesign() {
  const [last, setLast] = useState<DesignId | null>(null);
  useEffect(() => {
    try {
      const value = localStorage.getItem(LAST_DESIGN_KEY);
      if (designs.some((d) => d.id === value)) setLast(value as DesignId);
    } catch {
      // Unavailable storage just means no "last visited" mark.
    }
  }, []);
  return last;
}

const angle = productImages.angle;
const photo = (sizes = '40vw') => (
  <Image src={angle.src} width={angle.width} height={angle.height} alt="" sizes={sizes} />
);

function AsciiMouse() {
  const art = useAscii(angle.src, 64);
  return <pre className={s.ascii}>{art ?? ''}</pre>;
}

/* Each strip previews its design: same product, that design's own art direction. */
const previews: Record<DesignId, { label: string; visual: ReactNode; enter: string }> = {
  cinematic: { label: 'Dark', visual: photo(), enter: 'Enter →' },
  blueprint: {
    label: 'Paper',
    visual: (
      <Halftone src={productImages.side.src} width={productImages.side.width} height={productImages.side.height} alt="" sizes="40vw" />
    ),
    enter: '[ Enter ] >>>',
  },
  arcade: {
    label: 'Candy',
    visual: (
      <>
        {photo()}
        <span className={s.sticker}>55 g!</span>
      </>
    ),
    enter: 'Press start',
  },
  chrome: {
    label: 'Metal',
    visual: (
      <>
        <span className={s.drop} />
        {photo()}
      </>
    ),
    enter: 'Enter ✦',
  },
  terminal: { label: 'Phosphor', visual: <AsciiMouse />, enter: '$ open terminal_' },
  editorial: {
    label: 'Print',
    visual: (
      <span className={s.mag}>
        <span className={s.magMast}>GoSlide</span>
        <Image src={productImages.top.src} width={productImages.top.width} height={productImages.top.height} alt="" sizes="20vw" />
      </span>
    ),
    enter: 'Read the issue',
  },
  glass: {
    label: 'Light',
    visual: <span className={s.glassCard}>{photo()}</span>,
    enter: 'Take a look',
  },
};

export function DesignPicker() {
  const last = useLastDesign();
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (last) setOpen(designs.findIndex((d) => d.id === last));
  }, [last]);

  return (
    <main className={s.picker}>
      <h1 className={s.title}>
        {siteConfig.name} {siteConfig.product} — choose one of {designs.length} designs
      </h1>

      <div className={s.strips}>
        {designs.map((d, i) => {
          const p = previews[d.id];
          const num = String(i + 1).padStart(2, '0');
          return (
            <a
              key={d.id}
              className={clsx(s.strip, s[d.id], i === open && s.open)}
              href={d.href}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
            >
              <span className={s.spine} aria-hidden="true">
                <span>{num}</span>
                <span className={s.spineName}>{d.name}</span>
              </span>

              <span className={s.full}>
                <span className={s.top}>
                  <span>
                    {num} / {p.label}
                  </span>
                  {last === d.id && <span className={s.last}>Last visited</span>}
                </span>
                <span className={s.visual} aria-hidden="true">
                  {p.visual}
                </span>
                <span className={s.bottom}>
                  <span className={s.name}>{d.name}</span>
                  <span className={s.tagline}>{d.tagline}</span>
                  <span className={s.enter}>{p.enter}</span>
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </main>
  );
}
