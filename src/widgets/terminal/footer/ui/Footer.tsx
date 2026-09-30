import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <span>[process exited with code 0] · © 2026 GoSlide</span>
      <nav aria-label="Footer">
        <a href="#">privacy</a>
        <a href="#">terms</a>
        <a href="#top">cd ~</a>
      </nav>
    </footer>
  );
}
