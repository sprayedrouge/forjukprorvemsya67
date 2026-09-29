'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, SplitWords } from '@/shared/lib';
import s from './Manifesto.module.css';

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          `.${s.word}`,
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 60%', scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.manifesto} aria-label="About Slide Control">
      <p className={s.text}>
        <SplitWords text="The next evolution of our championship-winning mouse. Meet the new" itemClassName={s.word} />{' '}
        <SplitWords text="weapon of choice" itemClassName={`${s.word} ${s.accent}`} />{' '}
        <SplitWords text="for the world’s top esports athletes." itemClassName={s.word} />
      </p>
    </section>
  );
}
