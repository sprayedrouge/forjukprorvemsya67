import { DesignTheme } from '@/shared/ui';
import { DesignSwitch } from '@/features/switch-design';
import { Runhead } from '@/widgets/editorial/runhead';
import { Cover } from '@/widgets/editorial/cover';
import { Features } from '@/widgets/editorial/features';
import { Letters } from '@/widgets/editorial/letters';
import { Backcover } from '@/widgets/editorial/backcover';
import s from './EditorialPage.module.css';

/** The product as a magazine issue: the cover turns, spreads unfold, letters, back cover. */
export function EditorialPage() {
  return (
    <div className={s.root}>
      <DesignTheme design="editorial" />
      <Runhead />
      <main id="main">
        <Cover />
        <Features />
        <Letters />
        <Backcover />
      </main>
      <DesignSwitch current="editorial" tone="serif" />
    </div>
  );
}
