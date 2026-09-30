import { DesignTheme } from '@/shared/ui';
import { DesignSwitch } from '@/features/switch-design';
import { Navbar } from '@/widgets/arcade/navbar';
import { Hero } from '@/widgets/arcade/hero';
import { Tape } from '@/widgets/arcade/tape';
import { Levels } from '@/widgets/arcade/levels';
import { Loadout } from '@/widgets/arcade/loadout';
import { Chat } from '@/widgets/arcade/chat';
import { Coin } from '@/widgets/arcade/coin';
import { Footer } from '@/widgets/arcade/footer';
import s from './ArcadePage.module.css';

/** The same product as a game: levels to clear, a loadout, a lobby chat and a coin slot. */
export function ArcadePage() {
  return (
    <div className={s.root}>
      <DesignTheme design="arcade" />
      <Navbar />
      <main id="main">
        <Hero />
        <Tape />
        <Levels />
        <Loadout />
        <Chat />
        <Coin />
      </main>
      <Footer />
      <DesignSwitch current="arcade" tone="pop" />
    </div>
  );
}
