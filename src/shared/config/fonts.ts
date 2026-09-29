import { Archivo, Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google';

/* Cinematic */
export const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
export const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

/* Blueprint: variable width axis for condensed industrial headlines */
export const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', preload: false });
export const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jet', preload: false });

export const fontVariables = [geist, geistMono, archivo, jetbrains].map((f) => f.variable).join(' ');
