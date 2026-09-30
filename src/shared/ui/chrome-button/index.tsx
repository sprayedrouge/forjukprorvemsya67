import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import s from './ChromeButton.module.css';

type ChromeButtonProps = ComponentPropsWithRef<'a'> & {
  tone?: 'metal' | 'pearl';
  size?: 'small' | 'medium';
};

export function ChromeButton({ tone = 'metal', size = 'medium', className, ...rest }: ChromeButtonProps) {
  return <a className={clsx(s.btn, tone === 'pearl' && s.pearl, size === 'small' && s.small, className)} {...rest} />;
}
