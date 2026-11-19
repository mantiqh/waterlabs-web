'use client';

import { gsap } from 'gsap/dist/gsap';
import { useLayoutEffect, useRef } from 'react';

import { mountPageMotion } from '@/lib/motion/motion';

export default function HomeMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const root = marker.current?.closest<HTMLElement>('[data-home-motion]');
    if (!root) return;
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
      if (!disposed) root.dataset.motionState = 'static';
    };
    const timeout = window.setTimeout(fallback, 1400);
    const start = () => {
      if (disposed) return;
      clearTimeout(timeout);
      const heroEntry = root.querySelector<HTMLElement>(
        '[data-home-section="hero"] [data-motion-reveal]',
      );
      const initial =
        root.dataset.motionState === 'pending' &&
        !!heroEntry &&
        getComputedStyle(heroEntry).visibility === 'hidden' &&
        scrollY < 10;
      if (initial && !motionPreference.matches) {
        cover = document.createElement('div');
        cover.dataset.homeEntranceCover = '';
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
        throw error;
      } finally {
        root.dataset.motionState = 'ready';
      }
    };
    const banner = root.querySelector<HTMLElement>('[data-motion-banner]');
    const source = banner?.dataset.motionSrc;
    const renderedImage = banner?.querySelector('img');
    const image = renderedImage ?? (source ? new Image() : undefined);
    if (image && !renderedImage && source) image.src = source;
    const imageReady = image ? image.decode().catch(() => {}) : Promise.resolve();
    void Promise.all([document.fonts.ready, imageReady]).then(start);
    return () => {
      disposed = true;
      clearTimeout(timeout);
      motionPreference.removeEventListener('change', onMotionChange);
      removeCover();
      cleanup?.();
    };
  }, []);
  return <span ref={marker} hidden />;
}
