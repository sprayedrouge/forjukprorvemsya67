import type { ComponentPropsWithRef, ReactNode } from 'react';
import clsx from 'clsx';
import { Icon, type IconName } from '../icon';
import s from './Button.module.css';

type ButtonProps = ComponentPropsWithRef<'a'> & {
  variant?: 'light' | 'glass' | 'rgb';
  size?: 'small' | 'medium' | 'large';
  icon?: IconName;
  lead?: ReactNode;
};

export function Button({
  variant = 'light',
  size = 'medium',
  icon = 'arrow-up-right',
  lead,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <a className={clsx(s.btn, s[variant], size !== 'medium' && s[size], className)} {...rest}>
      {lead && <span className={s.lead}>{lead}</span>}
      {children}
      <span className={s.orb}>
        <Icon name={icon} />
      </span>
    </a>
  );
}
