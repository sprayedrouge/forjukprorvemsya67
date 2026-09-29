import type { ProductImage } from './types';

export const productImages = {
  angle: {
    src: '/images/mouse-1.png',
    width: 624,
    height: 328,
    alt: 'Slide Control at a three-quarter angle, black shell with a cyan-to-magenta light strip',
  },
  top: { src: '/images/mouse-2.png', width: 320, height: 591, alt: 'Slide Control seen from above' },
  side: {
    src: '/images/mouse-3.png',
    width: 585,
    height: 259,
    alt: 'Slide Control in profile, light strip running along the side',
  },
  bottom: { src: '/images/mouse-4.png', width: 318, height: 546, alt: 'Underside of Slide Control with the optical sensor' },
  scene: {
    src: '/images/gallery1.jpg',
    width: 2620,
    height: 631,
    alt: 'Slide Control resting on a glowing mouse pad in a dark room',
  },
} satisfies Record<string, ProductImage>;
