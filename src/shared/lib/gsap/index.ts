'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { isMotionForced } from '../motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP, Draggable, InertiaPlugin, MorphSVGPlugin);
  // Mobile URL bar show/hide fires resize; re-measuring every pin then causes a visible hitch.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * gsap.matchMedia queries. Evaluated once per page load: with the visitor's override on,
 * motion always matches and the reduced branch never does.
 */
const forced = isMotionForced();
export const MOTION_OK = forced ? 'all' : '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCED = forced ? 'not all' : '(prefers-reduced-motion: reduce)';

export { gsap, ScrollTrigger, useGSAP, Draggable };
