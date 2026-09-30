'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { productImages, storyActs } from '@/entities/product';
import s from './Cover.module.css';

const pages = [12, 18, 24, 30];

export function Cover() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        el.classList.add(s.live);
        const q = gsap.utils.selector(el);
        const wide = matchMedia('(min-width: 861px)').matches;

        gsap.from(q(`.${s.masthead}, .${s.strip}, .${s.line}`), {
          y: 30,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.06,
          ease: 'expo.out',
        });

        // Closed, the magazine sits centred on its cover; turning the page slides the spread to centre.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: q(`.${s.stage}`)[0],
              start: 'top top',
              end: '+=130%',
              pin: true,
              anticipatePin: 1,
              scrub: 1,
            },
          })
          .fromTo(q(`.${s.book}`), { xPercent: wide ? -25 : 0 }, { xPercent: 0, duration: 1 }, 0)
          .to(q(`.${s.cover}`), { rotationY: wide ? -180 : -120, duration: 1, ease: 'power1.inOut' }, 0)
          .to(q(`.${s.shade}`), { opacity: 1, duration: 0.5 }, 0.1)
          .to(q(`.${s.shade}`), { opacity: 0, duration: 0.4 }, 0.6)
          .to(q(`.${s.cover}`), wide ? { duration: 0 } : { autoAlpha: 0, duration: 0.2 }, 0.8)
          .from(q(`.${s.toc} li`), { y: 20, autoAlpha: 0, stagger: 0.05, duration: 0.3 }, 0.55);

        return () => el.classList.remove(s.live);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const star = productImages.top;
  const ad = productImages.side;

  return (
    <section ref={root} className={s.issue} id="top" aria-label="Cover and contents">
      <div className={s.stage}>
        <div className={s.book}>
          <div className={`${s.page} ${s.cover}`}>
            <div className={`${s.face} ${s.front}`}>
              <div className={s.strip}>
                <span>No. 04</span>
                <span>The Control Issue</span>
                <span>Autumn 2026</span>
              </div>
              <h1 className={s.masthead}>GoSlide</h1>
              <div className={s.star}>
                <Image src={star.src} width={star.width} height={star.height} alt={star.alt} priority sizes="30vw" />
              </div>
              <div className={s.lines}>
                <div>
                  <p className={s.line}>
                    <small>Cover star</small>
                    <em>Slide</em> Control
                  </p>
                  <p className={s.line}>
                    <small>Weight</small>
                    55 grams of nerve
                  </p>
                </div>
                <div>
                  <p className={s.line}>
                    <small>Inside</small>
                    The sensor that <em>doesn’t</em> miss
                  </p>
                  <p className={s.line}>
                    <small>Report</small>
                    Why pros cut the cord
                  </p>
                </div>
              </div>
              <span className={s.barcode} aria-hidden="true" />
              <span className={s.shade} aria-hidden="true" />
            </div>
            <div className={`${s.face} ${s.back}`} aria-hidden="true">
              <span className={s.ad}>Advertisement</span>
              <Image className={s.adImg} src={ad.src} width={ad.width} height={ad.height} alt="" sizes="30vw" />
              <p className={s.adLine}>Designed for comfort, built for control.</p>
              <span className={s.ad}>GoSlide · SC-01</span>
            </div>
          </div>

          <nav className={`${s.page} ${s.contents}`} id="contents" aria-label="Contents">
            <h2 className={s.contentsTitle}>Contents</h2>
            <ol className={s.toc}>
              {storyActs.map((act, i) => (
                <li key={act.id}>
                  <a href={`#feature-${act.id}`}>
                    <b>p. {pages[i]}</b>
                    <span>
                      {act.title}
                      <em>{act.label}</em>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#letters">
                  <b>p. 36</b>
                  <span>
                    Letters<em>From the readers</em>
                  </span>
                </a>
              </li>
              <li>
                <a href="#buy">
                  <b>p. 42</b>
                  <span>
                    Where to buy<em>Back cover</em>
                  </span>
                </a>
              </li>
            </ol>
            <p className={s.hint}>Scroll to turn the page</p>
          </nav>
        </div>
      </div>
    </section>
  );
}
