import { DesignTheme } from '@/shared/ui';
import { DesignSwitch } from '@/features/switch-design';
import { Navbar } from '@/widgets/glass/navbar';
import { Hero } from '@/widgets/glass/hero';
import { Portal } from '@/widgets/glass/portal';
import { Depth } from '@/widgets/glass/depth';
import { Specs } from '@/widgets/glass/specs';
import { Notices } from '@/widgets/glass/notices';
import { Buy } from '@/widgets/glass/buy';
import s from './GlassPage.module.css';

/** The product in soft light: a tilting glass card, a word you fly through, layers of glass. */
export function GlassPage() {
  return (
    <div className={s.root}>
      <div className={s.aura} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <DesignTheme design="glass" />
      <Navbar />
      <main id="main">
        <Hero />
        <Portal />
        <Depth />
        <Specs />
        <Notices />
        <Buy />
      </main>
      <DesignSwitch current="glass" tone="glass" />
    </div>
  );
}
