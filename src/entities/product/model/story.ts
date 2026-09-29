import { productImages } from './images';
import type { StoryAct } from './types';

export const storyActs: StoryAct[] = [
  {
    id: 'wireless',
    label: 'Wireless',
    word: 'Wireless',
    title: 'Cut the cord.',
    text: 'Quality is guaranteed by the latest wireless technology. One charge keeps you in the match for up to 95 hours.',
    stat: { value: 95, unit: 'h', label: 'battery life' },
    image: productImages.top,
    orientation: 'portrait',
  },
  {
    id: 'weight',
    label: 'Weight',
    word: '55 grams',
    title: 'Designed for comfort, built for control.',
    text: '125 mm long, 63 mm wide, 40 mm tall. A shape that disappears in your hand and stays exactly where you left it.',
    stat: { value: 55, unit: 'g', label: 'total weight' },
    image: productImages.side,
    orientation: 'landscape',
  },
  {
    id: 'sensor',
    label: 'Sensor',
    word: 'Sensor',
    title: 'Won’t miss a beat.',
    text: 'Tracking beyond 888 IPS and up to 20 000 DPI. You focus on not missing your shot; the sensor handles the rest.',
    stat: { value: 20000, unit: 'dpi', label: 'max resolution' },
    image: productImages.bottom,
    orientation: 'portrait',
  },
  {
    id: 'response',
    label: 'Response',
    word: 'Response',
    title: 'Every click, 5000 times a second.',
    text: 'A 32-bit ARM processor reports at up to 5000 Hz, so the moment you click and the moment the game sees it are the same moment.',
    stat: { value: 5000, unit: 'Hz', label: 'report rate' },
    image: productImages.angle,
    orientation: 'landscape',
  },
];
