'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { designs, siteConfig, type DesignId } from '@/shared/config';
import { Halftone, LAST_DESIGN_KEY } from '@/shared/ui';
import { productImages } from '@/entities/product';
import s from './DesignPicker.module.css';

const byId = Object.fromEntries(designs.map((d) => [d.id, d])) as Record<DesignId, (typeof designs)[number]>;

function useLastDesign() {
  const [last, setLast] = useState<DesignId | null>(null);
  useEffect(() => {
    try {
      const value = localStorage.getItem(LAST_DESIGN_KEY);
      if (value === 'cinematic' || value === 'blueprint') setLast(value);
    } catch {
      // Unavailable storage just means no "last visited" mark.
    }
  }, []);
  return last;
}

export function DesignPicker() {
  const last = useLastDesign();
  const cinematic = byId.cinematic;
  const blueprint = byId.blueprint;
  const angle = productImages.angle;
  const side = productImages.side;

  return (
    <main className={s.picker}>
      <h1 className={s.title}>
        {siteConfig.name} {siteConfig.product} — choose a design
      </h1>

      <a className={clsx(s.panel, s.cinematic)} href={cinematic.href}>
        <div className={s.top}>
          <span>01 / Dark</span>
          {last === 'cinematic' && <span className={s.last}>Last visited</span>}
        </div>
        <div className={s.visual} aria-hidden="true">
          <Image src={angle.src} width={angle.width} height={angle.height} alt="" priority sizes="50vw" />
        </div>
        <div className={s.bottom}>
          <h2 className={s.name}>{cinematic.name}</h2>
          <p className={s.tagline}>{cinematic.tagline}</p>
          <span className={s.enter}>Enter →</span>
        </div>
      </a>

      <span className={s.or} aria-hidden="true">
        or
      </span>

      <a className={clsx(s.panel, s.blueprint)} href={blueprint.href}>
        <div className={s.top}>
          <span>02 / Paper</span>
          {last === 'blueprint' && <span className={s.last}>Last visited</span>}
        </div>
        <div className={s.visual} aria-hidden="true">
          <Halftone src={side.src} width={side.width} height={side.height} alt="" sizes="50vw" />
        </div>
        <div className={s.bottom}>
          <h2 className={s.name}>
            {blueprint.name}
            <sup>®</sup>
          </h2>
          <p className={s.tagline}>{blueprint.tagline}</p>
          <span className={s.enter}>[ Enter ] &gt;&gt;&gt;</span>
        </div>
      </a>
    </main>
  );
}
