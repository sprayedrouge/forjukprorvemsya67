export type DesignId = 'cinematic' | 'blueprint' | 'arcade' | 'chrome' | 'terminal' | 'editorial' | 'glass';

export const designs: ReadonlyArray<{ id: DesignId; href: string; name: string; tagline: string }> = [
  { id: 'cinematic', href: '/cinematic', name: 'Cinematic', tagline: 'Dark room, RGB light, a four-act scroll film.' },
  { id: 'blueprint', href: '/blueprint', name: 'Blueprint', tagline: 'Printed spec sheet. Ink, paper, one red line.' },
  { id: 'arcade', href: '/arcade', name: 'Arcade', tagline: 'Candy colours, stickers to throw, four levels to clear.' },
  { id: 'chrome', href: '/chrome', name: 'Chrome', tagline: 'Liquid metal, pearl light, shapes that melt into each other.' },
  { id: 'terminal', href: '/terminal', name: 'Terminal', tagline: 'Green phosphor, an ASCII mouse, a shell you scroll through.' },
  { id: 'editorial', href: '/editorial', name: 'Editorial', tagline: 'A magazine issue: the cover turns, spreads unfold.' },
  { id: 'glass', href: '/glass', name: 'Soft Glass', tagline: 'Airy pastels, frosted glass, a word you fly through.' },
];
