import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import s from './PopButton.module.css';

type PopButtonProps = ComponentPropsWithRef<'a'> & {
  tone?: 'ink' | 'cream' | 'lime';
  size?: 'small' | 'medium';
};

export function PopButton({ tone = 'ink', size = 'medium', className, ...rest }: PopButtonProps) {
  return <a className={clsx(s.btn, s[tone], size === 'small' && s.small, className)} {...rest} />;
}

export const popButtonStyles = s;
