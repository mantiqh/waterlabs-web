'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

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
        if (!entry.isIntersecting || entry.intersectionRatio < 0.75) return;
        timer = setTimeout(() => {
          revealed.current = true;
          element.setAttribute(attribute, 'entered');
          observer.disconnect();
        }, 180);
      },
      { threshold: 0.75, rootMargin: '0px 0px -120px 0px' },
    );
    observer.observe(element.closest('[data-metric-card]') ?? element);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [attribute, reducedMotion]);

  return ref;
}

export const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

/** Entry settles early; travel maps a sticky runway; focus follows the visible content itself. */
export function useScrollProgress<T extends HTMLElement>(
  mode: 'entry' | 'travel' | 'focus' = 'entry',
) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const value =
        mode === 'travel'
          ? -rect.top / Math.max(1, rect.height - viewport)
          : mode === 'focus'
            ? (viewport * 0.75 - rect.top) / Math.max(1, rect.height + viewport * 0.35)
            : (viewport * 0.85 - rect.top) / Math.max(1, viewport * 0.5);
      setProgress(clampProgress(value));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    if (ref.current) observer.observe(ref.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [mode]);

  return { ref, progress: reducedMotion ? 1 : progress };
}
