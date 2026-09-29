import { Fragment } from 'react';

type SplitProps = {
  text: string;
  className?: string;
  itemClassName?: string;
};

/** Renders text as individually animatable characters, readable as one string by screen readers. */
export function SplitChars({ text, className, itemClassName }: SplitProps) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((ch, i) => (
        <span key={i} className={itemClassName} aria-hidden="true" style={{ display: 'inline-block' }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

/** Same idea per word; keeps natural wrapping. */
export function SplitWords({ text, className, itemClassName }: SplitProps) {
  const words = text.trim().split(/\s+/);
  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={itemClassName}>{word}</span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  );
}
