export type DesignId = 'cinematic' | 'blueprint';

export const designs: ReadonlyArray<{ id: DesignId; href: string; name: string; tagline: string }> = [
  { id: 'cinematic', href: '/cinematic', name: 'Cinematic', tagline: 'Dark room, RGB light, a four-act scroll film.' },
  { id: 'blueprint', href: '/blueprint', name: 'Blueprint', tagline: 'Printed spec sheet. Ink, paper, one red line.' },
];
