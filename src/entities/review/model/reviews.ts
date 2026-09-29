export type Review = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

/* Placeholder copy: replace with real customer reviews before launch. */
export const reviews: Review[] = [
  {
    id: 'mara',
    quote:
      'Every element is designed beautifully. Smooth tracking, a comfortable grip and responsive buttons — it works for my day job and for ranked at night.',
    author: 'Mara Lindqvist',
    role: 'Valorant, Diamond 2',
  },
  {
    id: 'tomas',
    quote: 'I switched from a 78 g wired mouse. After two days I stopped noticing there was anything in my hand.',
    author: 'Tomás Okafor',
    role: 'CS2 coach',
  },
  {
    id: 'yuki',
    quote: 'Charged it on a Sunday, looked at the battery again on Friday. Still green.',
    author: 'Yuki Brennan',
    role: 'Apex Legends streamer',
  },
];
