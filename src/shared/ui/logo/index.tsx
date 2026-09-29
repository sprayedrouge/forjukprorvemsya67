import Image from 'next/image';
import { siteConfig } from '@/shared/config';
import s from './Logo.module.css';

export function Logo({ href = '#top' }: { href?: string }) {
  return (
    <a className={s.logo} href={href} aria-label={`${siteConfig.name}, back to top`}>
      <Image src="/images/logo.svg" width={28} height={28} alt="" priority />
      <span>{siteConfig.name}</span>
    </a>
  );
}
