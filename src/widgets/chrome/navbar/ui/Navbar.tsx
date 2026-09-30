import { ChromeButton } from '@/shared/ui';
import s from './Navbar.module.css';

export function Navbar() {
  return (
    <header className={s.nav}>
      <a className={s.logo} href="#top">
        <span className={s.orb} aria-hidden="true" />
        GoSlide
      </a>
      <nav className={s.pill} aria-label="Sections">
        <a className={s.link} href="#morph">Forms</a>
        <a className={s.link} href="#capsules">Specs</a>
        <a className={s.link} href="#ring">Voices</a>
        <ChromeButton href="#order" size="small">
          Order
        </ChromeButton>
      </nav>
    </header>
  );
}
