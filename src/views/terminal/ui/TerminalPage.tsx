import { DesignTheme } from '@/shared/ui';
import { DesignSwitch } from '@/features/switch-design';
import { Statusbar } from '@/widgets/terminal/statusbar';
import { Boot } from '@/widgets/terminal/boot';
import { Session } from '@/widgets/terminal/session';
import { Table } from '@/widgets/terminal/table';
import { Logs } from '@/widgets/terminal/logs';
import { Shell } from '@/widgets/terminal/shell';
import { Footer } from '@/widgets/terminal/footer';
import s from './TerminalPage.module.css';

/** The product as a terminal session: boot, inspect, query, tail, and a shell to play with. */
export function TerminalPage() {
  return (
    <div className={s.root}>
      <DesignTheme design="terminal" />
      <Statusbar />
      <main id="main">
        <Boot />
        <Session />
        <Table />
        <Logs />
        <Shell />
      </main>
      <Footer />
      <DesignSwitch current="terminal" tone="term" />
    </div>
  );
}
