import type { Spec } from './types';

const icon = (name: string) => `/images/tech-icons/${name}.svg`;

export const specs = {
  dimensions: {
    id: 'dimensions',
    title: 'Dimensions',
    icon: icon('ruler-dimension-line'),
    text: 'H 40 · W 63 · L 125 mm',
  },
  sensor: {
    id: 'sensor',
    title: 'Sensor',
    icon: icon('memory-stick'),
    value: 'Super Hero 3',
    text: '>888 IPS · 100–20 000 DPI',
  },
  compact: [
    { id: 'rate', title: 'Max report rate', icon: icon('table-rows-split'), value: '5000', unit: 'Hz' },
    {
      id: 'battery',
      title: 'Battery',
      icon: icon('battery-full'),
      value: '95',
      unit: 'h',
      note: 'Battery life may vary based on user and computing conditions.',
    },
    { id: 'speed', title: 'Max speed', icon: icon('circle-gauge'), value: '888', unit: '+ IPS' },
    { id: 'mcu', title: 'Microprocessor', icon: icon('cpu'), value: '32', unit: '-bit ARM' },
    { id: 'system', title: 'System', icon: icon('monitor-cog'), text: 'PC with Windows® 10 or later and a USB 2.0 port.' },
    { id: 'warranty', title: 'Warranty', icon: icon('shield-check'), value: '2', unit: '-year limited' },
  ] satisfies Spec[],
} satisfies { dimensions: Spec; sensor: Spec; compact: Spec[] };
