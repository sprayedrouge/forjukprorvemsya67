export type ProductImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type StoryAct = {
  id: string;
  label: string;
  word: string;
  title: string;
  text: string;
  stat: { value: number; unit: string; label: string };
  image: ProductImage;
  /** Landscape shots sit wider in the frame than top-down ones. */
  orientation: 'portrait' | 'landscape';
};

export type Spec = {
  id: string;
  title: string;
  icon: string;
  value?: string;
  unit?: string;
  text?: string;
  note?: string;
};
