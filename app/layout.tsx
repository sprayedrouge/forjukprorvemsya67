import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SmoothScrollProvider } from '@/app';
import { siteConfig } from '@/shared/config';
import { fontVariables } from '@/shared/config/fonts';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: siteConfig.title,
  description: siteConfig.description,
  icons: { icon: '/images/logo.svg' },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.product}`,
    description: '55 g. 20 000 DPI. 5000 Hz. No wires.',
    images: ['/images/gallery1.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0b0e',
};

// Runs before first paint so the preloader covers the page only when motion is allowed.
const motionFlag = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('is-motion')`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
