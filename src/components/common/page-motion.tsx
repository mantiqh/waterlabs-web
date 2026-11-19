'use client';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { mountPageMotion } from '@/lib/motion/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface PageMotionProps {
  rootSelector?: string;
  entranceCover?: boolean;
}

export function PageMotion({
  rootSelector = '[data-motion-root]',
  entranceCover = false,
}: PageMotionProps) {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root =
      marker.current?.closest<HTMLElement>(rootSelector) ??
      document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;

    const nav =
      typeof performance !== 'undefined'
        ? (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)
        : undefined;
    if (
      nav?.type !== 'back_forward' &&
      typeof window !== 'undefined' &&
      !window.location.hash &&
      window.scrollY > 0
    ) {
      window.scrollTo(0, 0);
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;
    let cover: HTMLDivElement | undefined;
    let coverTween: gsap.core.Tween | undefined;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const removeCover = () => {
      coverTween?.kill();
      coverTween = undefined;
      cover?.remove();
      cover = undefined;
    };

    const onMotionChange = () => {
      if (motionPreference.matches) removeCover();
    };
    motionPreference.addEventListener('change', onMotionChange);

    const fallback = () => {
      if (!disposed) {
        root.dataset.motionState = 'static';
        removeCover();
      }
    };

    const timeout = window.setTimeout(fallback, 1400);

    const start = () => {
      if (disposed) return;
      clearTimeout(timeout);

      if (typeof window !== 'undefined' && !window.location.hash && window.scrollY > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (disposed) return;
          if (typeof window !== 'undefined' && !window.location.hash && window.scrollY > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
          ScrollTrigger.clearScrollMemory?.();
          ScrollTrigger.refresh();

          const heroEntry = root.querySelector<HTMLElement>(
            '[data-motion-section="hero"] [data-motion-reveal]',
          );
          const initial =
            root.dataset.motionState === 'pending' &&
            !!heroEntry &&
            getComputedStyle(heroEntry).visibility === 'hidden';

          if (initial && !motionPreference.matches && entranceCover) {
            cover = document.createElement('div');
            cover.dataset.motionEntranceCover = '';
            cover.setAttribute('aria-hidden', 'true');
            cover.className = 'pointer-events-none fixed inset-0 z-[200] bg-[#F4F6F9]';
            root.appendChild(cover);
          }

          try {
            cleanup = mountPageMotion(root, {
              footer: document.querySelector('footer') ?? undefined,
              initial,
            });

            if (cover) {
              coverTween = gsap.to(cover, {
                yPercent: -100,
                duration: 1.15,
                ease: 'expo.inOut',
                onComplete: removeCover,
              });
            }
          } catch (error) {
            removeCover();
            console.error('PageMotion initialization error:', error);
          } finally {
            root.dataset.motionState = 'ready';
          }
        });
      });
    };

    const banner = root.querySelector<HTMLElement>('[data-motion-banner]');
    const source = banner?.dataset.motionSrc;
    const renderedImage = banner?.querySelector('img');
    const image = renderedImage ?? (source ? new Image() : undefined);
    if (image && !renderedImage && source) image.src = source;
    const imageReady = image ? image.decode().catch(() => {}) : Promise.resolve();

    void Promise.all([document.fonts.ready, imageReady])
      .then(start)
      .catch((error) => {
        console.error('PageMotion deferred load error:', error);
        fallback();
      });

    return () => {
      disposed = true;
      clearTimeout(timeout);
      motionPreference.removeEventListener('change', onMotionChange);
      removeCover();
      cleanup?.();
    };
  }, [rootSelector, entranceCover]);

  return <span ref={marker} hidden />;
}

export default PageMotion;
