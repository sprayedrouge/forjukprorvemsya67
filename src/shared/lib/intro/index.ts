/**
 * One-shot signal: the preloader has left the screen and the hero may play its entrance.
 * Lives in shared so widgets stay decoupled from each other.
 */
let done = false;
const listeners = new Set<() => void>();

export const intro = {
  isDone: () => done,
  finish() {
    if (done) return;
    done = true;
    listeners.forEach((fn) => fn());
    listeners.clear();
  },
  onDone(fn: () => void) {
    if (done) {
      fn();
      return () => {};
    }
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
