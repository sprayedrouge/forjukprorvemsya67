'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Mobile URL bar show/hide fires resize; re-measuring every pin then causes a visible hitch.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** gsap.matchMedia query: run cinematic motion only when the user allows it. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
