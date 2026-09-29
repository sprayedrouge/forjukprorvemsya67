import s from './Hazard.module.css';

const items = ['5000 Hz report rate', '20 000 dpi', '888+ ips', '55 g', '95 h battery', '32-bit ARM', 'No wires'];

export function Hazard() {
  const run = [...items, ...items, ...items, ...items];
  return (
    <div className={s.hazard} aria-hidden="true">
      <div className={s.stripe} />
      <div className={s.ticker}>
        {run.map((item, i) => (
          <span key={i}>
            <b>///</b> {item}
          </span>
        ))}
      </div>
      <div className={s.stripe} />
    </div>
  );
}
