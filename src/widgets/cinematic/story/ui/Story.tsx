'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap, useGSAP, ScrollTrigger, MOTION_OK, formatNumber, useScrollTo } from '@/shared/lib';
import { storyActs } from '@/entities/product';
import s from './Story.module.css';

const HOLD = 1;
const MOVE = 1;
const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export function Story() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const jump = useRef<(i: number) => number | null>(() => null);
  const scrollTo = useScrollTo();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const el = root.current!;
        el.classList.add(s.cinematic);

        const acts = gsap.utils.toArray<HTMLElement>(`.${s.act}`);
        const parts = acts.map((act) => ({
          word: act.querySelector(`.${s.word}`),
          media: act.querySelector(`.${s.media}`),
          copy: act.querySelectorAll(`.${s.copy} > *`),
          stat: act.querySelector(`.${s.stat}`),
          num: act.querySelector<HTMLElement>(`.${s.num}`)!,
          counter: { v: 0 },
        }));

        parts.forEach((p, i) => {
          p.num.textContent = '0';
          if (i === 0) return;
          gsap.set(p.word, { autoAlpha: 0, scale: 1.15 });
          gsap.set(p.media, { autoAlpha: 0, yPercent: 45, rotate: 16, scale: 0.72, filter: 'blur(18px)' });
          gsap.set(p.copy, { autoAlpha: 0, y: 70 });
          gsap.set(p.stat, { autoAlpha: 0, y: 70 });
        });

        // Count the stat of the act that just took the stage.
        let active = -1;
        const activate = (i: number) => {
          if (i === active) return;
          active = i;
          setCurrent(i);
          const { num, counter } = parts[i];
          gsap.killTweensOf(counter);
          counter.v = 0;
          gsap.to(counter, {
            v: storyActs[i].stat.value,
            duration: 1.4,
            ease: 'expo.out',
            onUpdate: () => {
              num.textContent = formatNumber(counter.v);
            },
          });
        };

        const starts: number[] = [];
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          onUpdate() {
            const t = tl.time();
            let i = 0;
            while (i + 1 < starts.length && t >= starts[i + 1] - MOVE / 2) i++;
            if (active >= 0) activate(i);
          },
        });

        parts.forEach((p, i) => {
          // Start holding only once the previous transition has fully landed.
          const at = i === 0 ? 0 : starts[i - 1] + HOLD + MOVE * 1.3;
          starts.push(at);

          // Hold: the product drifts while the reader takes it in.
          tl.to(p.media, { rotate: '+=4', yPercent: '-=5', duration: HOLD, ease: 'none' }, at)
            .to(p.word, { xPercent: i % 2 ? 6 : -6, duration: HOLD, ease: 'none' }, at);

          const next = parts[i + 1];
          if (!next) return;

          const cut = at + HOLD;
          tl.to(p.media, { autoAlpha: 0, yPercent: -50, rotate: -18, scale: 0.72, filter: 'blur(18px)', duration: MOVE }, cut)
            .to(p.word, { autoAlpha: 0, scale: 0.88, duration: MOVE * 0.8 }, cut)
            .to(p.copy, { autoAlpha: 0, y: -60, stagger: 0.05, duration: MOVE * 0.6 }, cut)
            .to(p.stat, { autoAlpha: 0, y: -60, duration: MOVE * 0.6 }, cut)
            .to(next.media, { autoAlpha: 1, yPercent: 0, rotate: 0, scale: 1, filter: 'blur(0px)', duration: MOVE }, cut + MOVE * 0.25)
            .to(next.word, { autoAlpha: 1, scale: 1, duration: MOVE }, cut + MOVE * 0.3)
            .to(next.copy, { autoAlpha: 1, y: 0, stagger: 0.07, duration: MOVE * 0.7 }, cut + MOVE * 0.45)
            .to(next.stat, { autoAlpha: 1, y: 0, duration: MOVE * 0.7 }, cut + MOVE * 0.5);
        });

        tl.fromTo(`.${s.ring}`, { rotate: 0 }, { rotate: 300, ease: 'none', duration: tl.duration() }, 0);

        const st = ScrollTrigger.create({
          trigger: `.${s.stage}`,
          start: 'top top',
          end: () => `+=${window.innerHeight * acts.length * 1.1}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          animation: tl,
          invalidateOnRefresh: true,
        });

        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => activate(0),
        });

        jump.current = (i) => st.start + ((starts[i] + (i ? 0.15 : 0)) / tl.duration()) * (st.end - st.start);

        return () => {
          el.classList.remove(s.cinematic);
          jump.current = () => null;
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const goTo = (i: number) => {
    const y = jump.current(i);
    if (y !== null) scrollTo(y);
  };

  return (
    <section ref={root} className={s.story} id="story" aria-label="Slide Control, four sides">
      <div className={s.stage}>
        <div className={s.ring} aria-hidden="true" />

        {storyActs.map((act, i) => (
          <article key={act.id} className={s.act} aria-labelledby={`act-${act.id}`}>
            <div className={s.word} aria-hidden="true">
              {act.word}
            </div>
            <figure className={clsx(s.media, act.orientation === 'landscape' && s.landscape)}>
              <Image
                src={act.image.src}
                width={act.image.width}
                height={act.image.height}
                alt={act.image.alt}
                sizes="(max-width: 860px) 82vw, 40vw"
                loading="eager"
              />
            </figure>
            <div className={s.copy}>
              <span className={s.index}>
                {numerals[i]} / {numerals[storyActs.length - 1]}
              </span>
              <h2 className={s.title} id={`act-${act.id}`}>
                {act.title}
              </h2>
              <p className={s.text}>{act.text}</p>
            </div>
            <div className={s.stat}>
              <span className={s.num}>{formatNumber(act.stat.value)}</span>
              <span className={s.unit}>{act.stat.unit}</span>
              <span className={s.label}>{act.stat.label}</span>
            </div>
          </article>
        ))}

        <ol className={s.nav} aria-label="Story chapters">
          {storyActs.map((act, i) => (
            <li key={act.id}>
              <button
                type="button"
                className={clsx(current === i && s.current)}
                aria-current={current === i ? 'step' : undefined}
                onClick={() => goTo(i)}
              >
                {act.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
