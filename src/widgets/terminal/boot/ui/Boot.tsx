'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap, useGSAP, MOTION_OK, useAscii, resolveAscii, asciiSize, prefersReducedMotion } from '@/shared/lib';
import { productImages } from '@/entities/product';
import s from './Boot.module.css';

const bootLines: Array<[string, string?]> = [
  ['GOSLIDE BIOS v2.6 (c) 2026'],
  ['Checking memory ........ ', '32-bit ARM ok'],
  ['Detecting HID devices ... ', 'SC-01 found'],
  ['Link ................... ', '2.4 GHz wireless, 5000 Hz'],
  ['Battery ................ ', '95 h remaining'],
  ['Sensor ................. ', 'SUPER HERO 3 calibrated'],
  ['Boot complete.'],
];

export function Boot() {
  const root = useRef<HTMLElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  const img = productImages.angle;
  const art = useAscii(img.src, 96);

  // Draw the ASCII product once computed — out of noise when motion is allowed.
  useEffect(() => {
    const el = asciiRef.current;
    if (!art || !el) return;
    const { cols, rows } = asciiSize(art);
    el.style.setProperty('--cols', String(cols));
    el.style.setProperty('--rows', String(rows));
    if (prefersReducedMotion()) el.textContent = art;
    else resolveAscii(el, art, 1.8);
  }, [art]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        // BIOS lines print one by one, then the title powers on like a warming tube.
        gsap
          .timeline()
          .from(q(`.${s.log} > span`), { autoAlpha: 0, duration: 0.01, stagger: 0.14 })
          .from(q(`.${s.title} span`), { autoAlpha: 0, scaleY: 0.02, duration: 0.25, stagger: 0.12, ease: 'power4.out' })
          .from(q(`.${s.lead}, .${s.prompt}`), { autoAlpha: 0, duration: 0.01, stagger: 0.2 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.boot} id="top">
      <div className={s.window}>
        <div className={s.titlebar}>
          <span>goslide@sc-01: ~</span>
          <span>120×40</span>
        </div>
        <div className={s.body}>
          <div className={s.left}>
            <pre className={s.log}>
              {bootLines.map(([label, value], i) => (
                <span key={i}>
                  {label}
                  {value && <b>{value}</b>}
                  {'\n'}
                </span>
              ))}
            </pre>
            <h1 className={s.title}>
              <span>Slide</span>
              <span>Control</span>
            </h1>
            <p className={s.lead}>
              The next evolution of our championship-winning mouse. Meet the new weapon of choice for the world’s top
              esports athletes.
            </p>
            <p className={s.prompt}>
              $ <a href="#inspect">scroll to inspect</a>
              <span className={s.cursor} aria-hidden="true" />
            </p>
          </div>
          <div className={s.art}>
            <pre
              ref={asciiRef}
              className={s.ascii}
              role="img"
              aria-label={img.alt}
              style={{ '--cols': 96, '--rows': 30 } as CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
