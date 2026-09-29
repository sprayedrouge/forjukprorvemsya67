'use client';

import { useCallback, useState } from 'react';

export function useCarousel(length: number) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setIndex((i) => (i + step + length) % length);
    },
    [length],
  );

  return { index, direction, next: () => go(1), prev: () => go(-1) };
}
