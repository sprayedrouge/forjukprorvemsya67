import clsx from 'clsx';
import { siteConfig } from '@/shared/config';
import { Logo } from '@/shared/ui';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={clsx('container', s.row)}>
        <Logo />
        <nav className={s.links} aria-label="Footer">
          {siteConfig.nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </nav>
        <p className={s.copy}>© 2026 {siteConfig.name}</p>
      </div>
      <div className={s.wordmark} aria-hidden="true">
        {siteConfig.name}
      </div>
    </footer>
  );
}
