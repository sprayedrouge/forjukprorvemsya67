import s from './Runhead.module.css';

export function Runhead() {
  return (
    <header className={s.head}>
      <a className={s.mast} href="#top">
        GoSlide
      </a>
      <span className={s.issue}>The Control Issue · No. 04 · Autumn 2026</span>
      <nav className={s.nav} aria-label="Sections">
        <a href="#contents">Contents</a>
        <a href="#letters">Letters</a>
        <a href="#buy">Where to buy</a>
      </nav>
    </header>
  );
}
