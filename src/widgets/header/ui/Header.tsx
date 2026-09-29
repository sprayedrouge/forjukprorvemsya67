'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { gsap, useGSAP, ScrollTrigger, intro } from '@/shared/lib';
import { siteConfig } from '@/shared/config';
import { Logo } from '@/shared/ui';
import { OrderButton } from '@/features/order-product';
import { MobileMenu } from '@/features/toggle-menu';
import s from './Header.module.css';

export function Header() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      // Intro moves the inner bar; the outer header is left to the CSS hide-on-scroll transition.
      const bar = gsap.utils.selector(root)(`.${s.bar}`);
      gsap.set(bar, { autoAlpha: 0, y: -24 });
      const off = intro.onDone(() =>
        gsap.to(bar, { autoAlpha: 1, y: 0, duration: 1.2, delay: 0.9, ease: 'expo.out' }),
      );

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        // Toggle the class directly: a React state update on every scroll tick costs frames.
        onUpdate: (self) =>
          root.current?.classList.toggle(s.hidden, self.direction === 1 && self.scroll() > window.innerHeight * 0.6),
      });

      siteConfig.nav.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          // Measure after the pinned sections above have added their spacing.
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setActive(href),
          onLeaveBack: () => href === siteConfig.nav[0].href && setActive(null),
        });
      });

      return off;
    },
    { scope: root },
  );

  return (
    <header ref={root} className={s.header}>
      <div className={s.bar}>
        <Logo />
        <nav className={s.links} aria-label="Primary">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              className={clsx(s.link, active === link.href && s.active)}
              href={link.href}
              aria-current={active === link.href ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className={s.actions}>
          <OrderButton className={s.order} />
          <MobileMenu links={[...siteConfig.nav, { label: 'Order now', href: '#order' }]} />
        </div>
      </div>
    </header>
  );
}
