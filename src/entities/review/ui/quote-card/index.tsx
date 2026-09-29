import clsx from 'clsx';
import type { Review } from '../../model/reviews';
import s from './QuoteCard.module.css';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('');

export function QuoteCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure className={clsx(s.quote, className)}>
      <blockquote className={s.text}>“{review.quote}”</blockquote>
      <figcaption className={s.author}>
        <span className={s.avatar} aria-hidden="true">
          {initials(review.author)}
        </span>
        <span>
          <b>{review.author}</b>
          {review.role}
        </span>
      </figcaption>
    </figure>
  );
}
