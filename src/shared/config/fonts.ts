import {
  Archivo,
  DM_Sans,
  Figtree,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
  Michroma,
  Newsreader,
  Unbounded,
  VT323,
} from 'next/font/google';

/* Cinematic */
export const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
export const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

/* Blueprint: variable width axis for condensed industrial headlines */
export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', preload: false });
export const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jet', preload: false });

/* Arcade: round wide display + friendly grotesk */
export const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', preload: false });
export const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm', preload: false });

/* Chrome: wide Y2K techno display + the original site's Manrope */
export const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma', preload: false });
export const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', preload: false });

/* Terminal: CRT pixel face + a readable mono for body output */
export const vt323 = VT323({ subsets: ['latin'], weight: '400', variable: '--font-vt', preload: false });
export const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-plex', preload: false });

/* Editorial: display serif with italics, a text serif for long reads, a grotesk for folios */
export const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-iserif', preload: false });
export const newsreader = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-news', preload: false });
export const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-isans', preload: false });

/* Soft Glass: friendly geometric sans */
export const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', preload: false });

export const fontVariables = [
  geist,
  geistMono,
  archivo,
  jetbrains,
  unbounded,
  dmSans,
  michroma,
  manrope,
  vt323,
  plexMono,
  instrumentSerif,
  newsreader,
  instrumentSans,
  figtree,
].map((f) => f.variable).join(' ');
