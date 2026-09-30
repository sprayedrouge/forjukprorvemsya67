'use client';

import { useRef, type CSSProperties } from 'react';
import clsx from 'clsx';
import { gsap, useGSAP, MOTION_OK } from '@/shared/lib';
import { reviews } from '@/entities/review';
import s from './Chat.module.css';

const colors = ['var(--pink)', 'var(--orange)', 'var(--lilac)'];
const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('');

const messages = [
  ...reviews.map((r, i) => ({ id: r.id, author: r.author, role: r.role, text: r.quote, mine: false, color: colors[i % 3] })),
  { id: 'goslide', author: 'GoSlide', role: 'team', text: 'gg. See you in the lobby.', mine: true, color: 'var(--lime)' },
];

export function Chat() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const msgs = q(`.${s.msg}`);
        const typing = q(`.${s.typing}`)[0];
        const log = q(`.${s.log}`)[0];

        gsap.set(msgs, { autoAlpha: 0, y: 30, scale: 0.9 });
        gsap.set(typing, { autoAlpha: 0 });

        // Messages arrive one by one, each preceded by a "typing…" beat.
        const tl = gsap.timeline({ paused: true });
        msgs.forEach((msg) => {
          tl.add(() => log.appendChild(typing))
            .to(typing, { autoAlpha: 1, duration: 0.2 })
            .to({}, { duration: 0.7 })
            .to(typing, { autoAlpha: 0, duration: 0.1 })
            .to(msg, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2.5)' });
        });

        gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 60%', once: true, onEnter: () => tl.play() } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.chat} id="chat">
      <div className={s.inner}>
        <h2 className={s.heading}>Player chat</h2>

        <div className={s.window}>
          <div className={s.bar}>
            <span># slide-control</span>
            <span className={s.online}>{messages.length} online</span>
          </div>
          <div className={s.log} aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={clsx(s.msg, m.mine && s.mine)} style={{ '--c': m.color } as CSSProperties}>
                <span className={s.avatar} aria-hidden="true">
                  {initials(m.author)}
                </span>
                <p className={s.bubble}>
                  <span className={s.name}>
                    {m.author} <span>· {m.role}</span>
                  </span>
                  {m.text}
                </p>
              </div>
            ))}
            <div className={clsx(s.bubble, s.typing)} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
