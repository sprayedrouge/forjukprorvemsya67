import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.row}>
        <p>© 2026 GoSlide — thanks for playing</p>
        <nav className={s.links} aria-label="Footer">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#top">Back to start ↑</a>
        </nav>
      </div>
      <div className={s.gg} aria-hidden="true">
        GG
      </div>
    </footer>
  );
}
