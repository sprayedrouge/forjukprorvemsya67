import Image from 'next/image';
import { PopButton } from '@/shared/ui';
import s from './Navbar.module.css';

const links = [
  { label: 'Levels', href: '#levels' },
  { label: 'Loadout', href: '#loadout' },
  { label: 'Chat', href: '#chat' },
];

export function Navbar() {
  return (
    <header className={s.nav}>
      <a className={s.logo} href="#top">
        <Image src="/images/logo.svg" width={28} height={28} alt="" />
        GoSlide
      </a>
      <nav className={s.links} aria-label="Sections">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <PopButton href="#coin" tone="lime" size="small">
        Insert coin
      </PopButton>
    </header>
  );
}
