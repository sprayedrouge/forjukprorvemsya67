import { Icon } from '@/shared/ui';
import s from './CarouselControls.module.css';

type CarouselControlsProps = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
};

const pad = (n: number) => String(n).padStart(2, '0');

export function CarouselControls({ index, total, onPrev, onNext }: CarouselControlsProps) {
  return (
    <div className={s.controls}>
      <span className={s.count}>
        <b>{pad(index + 1)}</b> / {pad(total)}
      </span>
      <div className={s.arrows}>
        <button className={s.arrow} type="button" aria-label="Previous review" onClick={onPrev}>
          <Icon name="arrow-left" />
        </button>
        <button className={s.arrow} type="button" aria-label="Next review" onClick={onNext}>
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}
