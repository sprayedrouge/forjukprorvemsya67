import { DesignTheme } from '@/shared/ui';
import { DesignSwitch } from '@/features/switch-design';
import { Topbar } from '@/widgets/blueprint/topbar';
import { Hero } from '@/widgets/blueprint/hero';
import { Hazard } from '@/widgets/blueprint/hazard';
import { Figures } from '@/widgets/blueprint/figures';
import { Datasheet } from '@/widgets/blueprint/datasheet';
import { Reports } from '@/widgets/blueprint/reports';
import { Order } from '@/widgets/blueprint/order';
import { Colophon } from '@/widgets/blueprint/colophon';
import s from './BlueprintPage.module.css';

/** The same product told as a printed technical document. */
export function BlueprintPage() {
  return (
    <div className={s.root}>
      <DesignTheme design="blueprint" />
      <Topbar />
      <main id="main">
        <Hero />
        <Hazard />
        <Figures />
        <Datasheet />
        <Reports />
        <Order />
      </main>
      <Colophon />
      <DesignSwitch current="blueprint" tone="paper" />
    </div>
  );
}
