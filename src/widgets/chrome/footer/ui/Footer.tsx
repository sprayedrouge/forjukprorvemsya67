import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.mark} aria-hidden="true">
        GoSlide
      </div>
      <div className={s.row}>
        <p>© 2026 GoSlide</p>
        <nav className={s.links} aria-label="Footer">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
