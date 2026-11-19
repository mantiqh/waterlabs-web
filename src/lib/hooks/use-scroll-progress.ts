'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}

/** Reveal once after the labelled card settles inside the viewport. */
export function useViewportReveal<T extends HTMLElement>(
  attribute: 'data-metric-reveal' | 'data-bar-reveal',
  revealOnEntry = false,
) {
  const ref = useRef<T>(null);
  const revealed = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (reducedMotion || revealed.current) {
      revealed.current = true;
      element.removeAttribute(attribute);
      return;
    }

    element.setAttribute(attribute, 'pending');
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        if (!entry.isIntersecting || entry.intersectionRatio < (revealOnEntry ? 0.01 : 0.75))
          return;
        timer = setTimeout(() => {
          revealed.current = true;
          element.setAttribute(attribute, 'entered');
          observer.disconnect();
        }, 180);
      },
      revealOnEntry ? { threshold: 0.01 } : { threshold: 0.75, rootMargin: '0px 0px -120px 0px' },
    );
    observer.observe(element.closest('[data-metric-card]') ?? element);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [attribute, reducedMotion, revealOnEntry]);

  return ref;
}

export const clampProgress = (value: number) => Math.min(1, Math.max(0, value));
