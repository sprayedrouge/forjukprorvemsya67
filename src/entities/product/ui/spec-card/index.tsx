import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import type { Spec } from '../../model/types';
import s from './SpecCard.module.css';

type SpecCardProps = {
  spec?: Spec;
  className?: string;
  style?: CSSProperties;
  coreClassName?: string;
  /** Replaces the default compact layout (used by the large bento tiles). */
  children?: ReactNode;
};

export function SpecCard({ spec, className, style, coreClassName, children }: SpecCardProps) {
  return (
    <article className={clsx(s.shell, className)} style={style} data-spec-card>
      <div className={clsx(s.core, coreClassName)}>
        {children ?? (spec && <SpecCardBody spec={spec} />)}
      </div>
    </article>
  );
}

export function SpecCardBody({ spec }: { spec: Spec }) {
  return (
    <>
      <SpecIcon src={spec.icon} />
      <h3 className={s.title}>{spec.title}</h3>
      {spec.value && (
        <p className={s.value}>
          {spec.value}
          {spec.unit && <small>{spec.unit}</small>}
        </p>
      )}
      {spec.text && <p className={s.text}>{spec.text}</p>}
      {spec.note && <p className={s.note}>{spec.note}</p>}
    </>
  );
}

export function SpecIcon({ src }: { src: string }) {
  return <span className={s.icon} style={{ '--icon': `url(${src})` } as CSSProperties} aria-hidden="true" />;
}

export const specCardStyles = s;
