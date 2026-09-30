/**
 * Motion preference = the OS setting, unless the visitor explicitly turned animations back on.
 * Windows ships "Animation effects" off on many machines, and Chrome reports that as
 * prefers-reduced-motion — so we honour it by default but let people opt back in.
 */
export const MOTION_KEY = 'goslide:motion';

export function isMotionForced() {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(MOTION_KEY) === 'on';
  } catch {
    return false;
  }
}

export function systemReducesMotion() {
  return typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function prefersReducedMotion() {
  return systemReducesMotion() && !isMotionForced();
}

/** Every animation reads the preference once on load, so a reload applies it everywhere. */
export function setMotionForced(on: boolean) {
  try {
    if (on) localStorage.setItem(MOTION_KEY, 'on');
    else localStorage.removeItem(MOTION_KEY);
  } catch {
    // Without storage the override can't persist; the reload still reflects the system setting.
  }
  location.reload();
}
