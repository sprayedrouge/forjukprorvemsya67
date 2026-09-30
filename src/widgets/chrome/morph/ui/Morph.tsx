'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, blobPath, formatNumber } from '@/shared/lib';
import { chromeIds } from '@/shared/ui';
import { storyActs } from '@/entities/product';
import s from './Morph.module.css';

const shapes = [3, 11, 27, 42].map((seed, i) => blobPath(seed, { points: 7 + (i % 3), variance: 0.38 }));
const tints = ['#eef0f5', '#efe9f7', '#e6f3f1', '#f5ebef'];
const pad = (n: number) => String(n).padStart(2, '0');

function Blob({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={clsx(s.blob, className)} viewBox="0 0 600 600" aria-hidden="true">
      <path data-metal d={d} fill={`url(#${chromeIds.metal})`} />
      <path data-iris className={s.iris} d={d} fill={`url(#${chromeIds.iris})`} />
    </svg>
  );
}

export function Morph() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        el.classList.add(s.live);
        const q = gsap.utils.selector(el);

        const stage = q(`.${s.stage}`)[0];
        const metal = q(`.${s.stageBlob} [data-metal]`)[0];
        const iris = q(`.${s.stageBlob} [data-iris]`)[0];
        const acts = q(`.${s.act}`);
        const parts = acts.map((act) => ({
          img: act.querySelector('img'),
          copy: act.querySelectorAll(`.${s.copy} > *`),
          stat: act.querySelector(`.${s.stat}`),
          num: act.querySelector<HTMLElement>(`.${s.num}`)!,
        }));

        parts.forEach((p, i) => {
          if (i === 0) return;
          gsap.set(p.img, { autoAlpha: 0, scale: 0.5, rotate: 25 });
          gsap.set(p.copy, { autoAlpha: 0, y: 50 });
          gsap.set(p.stat, { autoAlpha: 0, y: 50 });
        });

        let current = -1;
        const counters = parts.map(() => ({ v: 0 }));
        const activate = (i: number) => {
          if (i === current) return;
          current = i;
          setActive(i);
          const c = counters[i];
          gsap.fromTo(c, { v: 0 }, {
            v: storyActs[i].stat.value,
            duration: 1.2,
            ease: 'expo.out',
            onUpdate: () => {
              parts[i].num.textContent = formatNumber(c.v);
            },
          });
        };

        const HOLD = 1;
        const MOVE = 1.2;
        const starts: number[] = [];
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          onUpdate() {
            const t = tl.time();
            let i = 0;
            while (i + 1 < starts.length && t >= starts[i + 1] - MOVE / 2) i++;
            activate(i);
          },
        });

        parts.forEach((p, i) => {
          const at = i === 0 ? 0 : starts[i - 1] + HOLD + MOVE;
          starts.push(at);
          tl.to(p.img, { y: -20, rotate: '+=4', duration: HOLD, ease: 'sine.inOut' }, at);

          const next = parts[i + 1];
          if (!next) return;
          const cut = at + HOLD;
          // The metal melts into the next shape while the pearl light shifts hue.
          tl.to([metal, iris], { morphSVG: shapes[i + 1], duration: MOVE, ease: 'power3.inOut' }, cut)
            .to(stage, { backgroundColor: tints[i + 1], duration: MOVE }, cut)
            .to(p.img, { autoAlpha: 0, scale: 0.5, rotate: -25, duration: MOVE * 0.6 }, cut)
            .to(p.copy, { autoAlpha: 0, y: -40, stagger: 0.05, duration: MOVE * 0.5 }, cut)
            .to(p.stat, { autoAlpha: 0, y: -40, duration: MOVE * 0.5 }, cut)
            .to(next.img, { autoAlpha: 1, scale: 1, rotate: 0, y: 0, duration: MOVE * 0.7, ease: 'back.out(1.6)' }, cut + MOVE * 0.4)
            .to(next.copy, { autoAlpha: 1, y: 0, stagger: 0.06, duration: MOVE * 0.5 }, cut + MOVE * 0.5)
            .to(next.stat, { autoAlpha: 1, y: 0, duration: MOVE * 0.5 }, cut + MOVE * 0.55);
        });

        // The whole reflection slowly swings across the metal.
        // Paint servers live outside this section, so resolve by id rather than a scoped selector.
        tl.to(document.getElementById(chromeIds.metal), { attr: { gradientTransform: 'rotate(160 0.5 0.5)' }, ease: 'none', duration: tl.duration() }, 0);

        ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight * storyActs.length}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          animation: tl,
          invalidateOnRefresh: true,
        });
        ScrollTrigger.create({ trigger: el, start: 'top 70%', once: true, onEnter: () => activate(0) });

        return () => el.classList.remove(s.live);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.morph} id="morph" aria-label="Slide Control, four forms">
      <div className={s.stage}>
        <Blob d={shapes[0]} className={s.stageBlob} />

        {storyActs.map((act, i) => (
          <article key={act.id} className={s.act} aria-labelledby={`form-${act.id}`}>
            <div className={s.copy}>
              <span className={s.index}>
                {pad(i + 1)} / {pad(storyActs.length)} — {act.label}
              </span>
              <h2 className={s.title} id={`form-${act.id}`}>
                {act.title}
              </h2>
              <p className={s.text}>{act.text}</p>
            </div>
            <div className={s.visual}>
              <Blob d={shapes[i]} className={s.actBlob} />
              <Image src={act.image.src} width={act.image.width} height={act.image.height} alt={act.image.alt} sizes="40vw" />
            </div>
            <div className={s.stat}>
              <span className={s.num}>{formatNumber(act.stat.value)}</span>
              <span className={s.label}>
                {act.stat.unit} · {act.stat.label}
              </span>
            </div>
          </article>
        ))}

        <div className={s.dots} aria-hidden="true">
          {storyActs.map((act, i) => (
            <i key={act.id} className={clsx(i === active && s.on)} />
          ))}
        </div>
      </div>
    </section>
  );
}
