import { ChromeDefs, DesignTheme } from '@/shared/ui';
import { DesignSwitch } from '@/features/switch-design';
import { Navbar } from '@/widgets/chrome/navbar';
import { Hero } from '@/widgets/chrome/hero';
import { Morph } from '@/widgets/chrome/morph';
import { Capsules } from '@/widgets/chrome/capsules';
import { Ring } from '@/widgets/chrome/ring';
import { Finale } from '@/widgets/chrome/finale';
import { Footer } from '@/widgets/chrome/footer';
import s from './ChromePage.module.css';

/** The same product cast in liquid metal: shapes melt from one form into the next. */
export function ChromePage() {
  return (
    <div className={s.root}>
      <ChromeDefs />
      <DesignTheme design="chrome" />
      <Navbar />
      <main id="main">
        <Hero />
        <Morph />
        <Capsules />
        <Ring />
        <Finale />
      </main>
      <Footer />
      <DesignSwitch current="chrome" tone="chrome" />
    </div>
  );
}
