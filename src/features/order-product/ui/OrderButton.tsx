'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import { useMagnetic } from '@/shared/lib';

type OrderButtonProps = {
  size?: 'small' | 'large';
  label?: string;
  className?: string;
};

/* Checkout is not wired yet: the button scrolls to the order section. */
export function OrderButton({ size = 'small', label = 'Order now', className }: OrderButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, size === 'large' ? 0.3 : 0.2);

  if (size === 'small') {
    return (
      <Button ref={ref} href="#order" size="small" className={className}>
        {label}
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      href="#order"
      variant="rgb"
      size="large"
      className={className}
      lead={<Image src="/images/order-icon.svg" width={20} height={20} alt="" />}
    >
      {label}
    </Button>
  );
}
