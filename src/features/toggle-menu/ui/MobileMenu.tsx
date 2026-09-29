'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useLenis } from '@/shared/lib';
import s from './MobileMenu.module.css';

type MobileMenuProps = {
  links: ReadonlyArray<{ label: string; href: string }>;
};

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
    };
  }, [open, lenis]);

  // The header is transformed and blurred, which would trap a fixed overlay inside it.
  const overlay = (
    <div className={clsx(s.overlay, open && s.overlayOpen)} id="mobile-menu" inert={!open}>
      <nav className={s.links} aria-label="Mobile">
        {links.map((link, i) => (
          <a
            key={link.href}
            className={s.link}
            href={link.href}
            style={{ '--i': i } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );

  return (
    <div className={clsx(open && s.open)}>
      <button
        className={s.burger}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
