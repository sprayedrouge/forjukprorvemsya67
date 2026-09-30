import s from './Navbar.module.css';

export function Navbar() {
  return (
    <header className={s.nav}>
      <a className={s.logo} href="#top">
        GoSlide
      </a>
      <nav className={s.links} aria-label="Sections">
        <a href="#portal">Story</a>
        <a href="#depth">Features</a>
        <a href="#specs">Specs</a>
        <a href="#notices">Reviews</a>
      </nav>
      <a className={s.buy} href="#buy">
        Order
      </a>
    </header>
  );
}
