import s from './Tape.module.css';

const top = ['Player 1 ready', 'No wires', '95 h battery', '55 grams'];
const bottom = ['5000 Hz', '20 000 dpi', '888+ ips', 'Super Hero 3'];

function Track({ words }: { words: string[] }) {
  const run = [...words, ...words, ...words, ...words];
  return (
    <div className={s.track}>
      {run.map((w, i) => (
        <span key={i}>
          {w} <b>★</b>
        </span>
      ))}
    </div>
  );
}

export function Tape() {
  return (
    <div className={s.tape} aria-hidden="true">
      <div className={s.band}>
        <Track words={top} />
      </div>
      <div className={s.band}>
        <Track words={bottom} />
      </div>
    </div>
  );
}
