'use client';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { useReducedMotion } from './use-scroll-progress';

export function useScrollDriver<T extends HTMLElement>(
  mode: 'entry' | 'travel' | 'focus',
  enabled: boolean,
  update: (progress: number, element: T) => void,
) {
  const ref = useRef<T>(null);
  const updateRef = useRef(update);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    updateRef.current = update;
  }, [update]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;
    if (reducedMotion) {
      updateRef.current(1, element);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: mode === 'travel' ? 'top top' : mode === 'focus' ? 'top 75%' : 'top 85%',
      end: () => {
        const height = element.getBoundingClientRect().height;
        const distance =
          mode === 'travel'
            ? height - innerHeight
            : mode === 'focus'
              ? height + innerHeight * 0.35
              : innerHeight * 0.5;
        return `+=${Math.max(1, distance)}`;
      },
      onUpdate: (self) => updateRef.current(self.progress, element),
      onRefresh: (self) => updateRef.current(self.progress, element),
    });
    updateRef.current(trigger.progress, element);
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(element);
    return () => {
      observer.disconnect();
      trigger.kill();
    };
  }, [mode, enabled, reducedMotion]);

  return ref;
}
