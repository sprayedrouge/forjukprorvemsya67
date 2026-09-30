'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, imageToAscii, resolveAscii, asciiSize, formatNumber, prefersReducedMotion } from '@/shared/lib';
import { storyActs } from '@/entities/product';
import s from './Session.module.css';

const views: Record<string, string> = { wireless: 'top', weight: 'profile', sensor: 'base', response: 'three-quarter' };

// The whole scroll story as one terminal transcript; scrolling "types" it out.
const blocks = storyActs.map((act) => {
  const view = views[act.id];
  const key = act.stat.label.replace(/\s+/g, '_');
  return [
    `$ goslide inspect --view ${view}`,
    `  rendering SC-01 [${view}] ............ done`,
    `  # ${act.title}`,
    `  ${act.text}`,
    `  ${key} = ${formatNumber(act.stat.value)} ${act.stat.unit}`,
  ].join('\n');
});
const transcript = blocks.join('\n\n');
const blockStarts = blocks.reduce<number[]>((acc, b, i) => [...acc, i === 0 ? 0 : acc[i - 1] + blocks[i - 1].length + 2], []);
const cols = (orientation: string) => (orientation === 'landscape' ? 90 : 52);
const bar = (i: number) => `[${'#'.repeat(i + 1)}${'·'.repeat(storyActs.length - i - 1)}]`;

export function Session() {
  const root = useRef<HTMLElement>(null);
  const logRef = useRef<HTMLPreElement>(null);
  const artRef = useRef<HTMLPreElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const arts = useRef<string[]>([]);
  const [act, setAct] = useState(0);

  const draw = (i: number, animate: boolean) => {
    const el = artRef.current;
    const art = arts.current[i];
    if (!el || !art) return;
    const { cols: c, rows } = asciiSize(art);
    el.style.setProperty('--cols', String(c));
    el.style.setProperty('--rows', String(rows));
    if (animate) resolveAscii(el, art, 0.8);
    else el.textContent = art;
  };

  useEffect(() => {
    Promise.all(storyActs.map((a) => imageToAscii(a.image.src, cols(a.orientation)))).then((list) => {
      arts.current = list;
      draw(0, !prefersReducedMotion());
    });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        el.classList.add(s.live);
        const log = logRef.current!;
        let current = 0;
        log.textContent = '';

        const counter = { v: storyActs[0].stat.value };
        const count = (i: number) =>
          gsap.fromTo(counter, { v: 0 }, {
            v: storyActs[i].stat.value,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (numRef.current) numRef.current.textContent = formatNumber(counter.v);
            },
          });

        ScrollTrigger.create({
          trigger: `.${s.stage}`,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.5}`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Finish typing a little before the pin releases so the last line can be read.
            const n = Math.min(transcript.length, Math.floor(self.progress * 1.1 * transcript.length));
            log.textContent = transcript.slice(0, n);
            log.scrollTop = log.scrollHeight;
            let i = 0;
            while (i + 1 < blockStarts.length && n >= blockStarts[i + 1]) i++;
            if (i !== current) {
              current = i;
              setAct(i);
              draw(i, true);
              count(i);
            }
          },
        });

        return () => {
          el.classList.remove(s.live);
          log.textContent = transcript;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const a = storyActs[act];

  return (
    <section ref={root} className={s.session} id="inspect" aria-label="Inspect Slide Control">
      <div className={s.stage}>
        <div className={s.window}>
          <div className={s.titlebar}>
            <span>goslide inspect — sc-01</span>
            <span>
              {bar(act)} {act + 1}/{storyActs.length}
            </span>
          </div>
          <div className={s.panes}>
            <pre className={s.log} ref={logRef}>
              {transcript}
            </pre>
            <div className={s.right}>
              <div className={s.art}>
                <pre ref={artRef} className={s.ascii} role="img" aria-label={a.image.alt} />
              </div>
              <div className={s.readout}>
                <span className={s.num} ref={numRef}>
                  {formatNumber(a.stat.value)}
                </span>
                <span className={s.meta}>
                  <b>{a.stat.unit}</b>
                  <br />
                  {a.stat.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
