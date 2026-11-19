import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import type { MotionCleanup } from './motion';

gsap.registerPlugin(ScrollTrigger);

export type SceneMode = 'pending' | 'pinned' | 'flow';

export function sceneIndex(progress: number, count: number): number {
  return count ? Math.min(count - 1, Math.max(0, Math.floor(progress * count))) : -1;
}

export function sceneScrollPosition(root: HTMLElement, progress: number): number {
  const rect = root.getBoundingClientRect();
  const sceneTop = window.scrollY + rect.top;
  const stickyTop = Number.parseFloat(root.style.getPropertyValue('--scene-sticky-top')) || 0;
  return sceneTop - stickyTop + Math.min(1, Math.max(0, progress)) * window.innerHeight * 2;
}

export function canPinScene(
  width: number,
  height: number,
  contentHeight: number,
  reduced: boolean,
  count: number,
  allowMobile = false,
): boolean {
  if (reduced || count <= 1) return false;
  if (width >= 1024) {
    return height >= 400 && contentHeight + 16 <= height;
  }
  return allowMobile && contentHeight + 16 <= height;
}

export interface SceneOptions {
  count: number;
  onIndex: (index: number) => void;
  onMode: (mode: SceneMode) => void;
  kind?: 'accordion' | 'comparison';
  allowMobile?: boolean;
}

export function mountScrollScene(
  root: HTMLElement,
  { count, onIndex, onMode, kind = 'accordion', allowMobile }: SceneOptions,
): MotionCleanup {
  const content = root.querySelector<HTMLElement>('[data-scene-content]');
  const surface = root.querySelector<HTMLElement>('[data-scene-surface]');
  if (!content || !surface) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let trigger: ScrollTrigger | undefined;
  let logoMotion: gsap.core.Tween | undefined;
  let active = -1;
  let frame = 0;
  let disposed = false;
  const originalMode = root.dataset.sceneMode;
  const originalStickyHeight = root.style.getPropertyValue('--scene-sticky-height');
  const originalStickyTop = root.style.getPropertyValue('--scene-sticky-top');
  const sticky = root.querySelector<HTMLElement>('[data-scene-sticky]');
  const progress = root.querySelector<HTMLElement>('[data-scene-progress]');
  const indicator = progress?.firstElementChild;
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-scene-panel]'));
  const logo = kind === 'comparison' ? root.querySelector<HTMLElement>('[data-scene-logo]') : null;
  const context = gsap.context(() => {}, root);

  const select = (index: number, animate: boolean) => {
    if (index === active || index < 0) return;
    active = index;
    onIndex(index);
    context.add(() => {
      if (kind === 'comparison') {
        panels.forEach((panel, i) => {
          gsap.to(panel, {
            autoAlpha: i === index ? 1 : 0,
            y: i === index ? 0 : i < index ? -22 : 22,
            duration: animate ? 0.55 : 0,
            ease: 'expo.out',
            overwrite: true,
          });
        });
      } else {
        const copy = root.querySelectorAll('[data-scene-copy]')[index];
        if (copy)
          gsap.fromTo(
            copy,
            { y: animate ? 16 : 0, opacity: animate ? 0 : 1 },
            { y: 0, opacity: 1, duration: animate ? 0.7 : 0, ease: 'expo.out', overwrite: true },
          );
      }
    });
  };

  const update = () => {
    frame = 0;
    if (disposed) return;
    // Measure the compact scene, even after a short-screen/reduced-motion flow fallback.
    const previousMode = root.dataset.sceneMode;
    root.dataset.sceneMode = 'pending';
    root.dataset.sceneMeasuring = '';
    const padding = getComputedStyle(surface);
    const height =
      content.offsetHeight + parseFloat(padding.paddingTop) + parseFloat(padding.paddingBottom);
    const stickyHeight = sticky?.offsetHeight ?? height;
    const mobileNavHeight =
      kind === 'comparison' && innerWidth < 1024
        ? (document.querySelector<HTMLElement>('[data-home-nav] > header')?.offsetHeight ?? 0)
        : 0;
    delete root.dataset.sceneMeasuring;
    if (previousMode) root.dataset.sceneMode = previousMode;
    const pinned = canPinScene(
      innerWidth,
      window.visualViewport?.height ?? innerHeight,
      height + mobileNavHeight,
      reduced.matches,
      count,
      allowMobile ?? kind === 'comparison',
    );
    const mode: SceneMode = pinned ? 'pinned' : 'flow';
    if (kind === 'comparison') {
      if (pinned) {
        root.style.setProperty('--scene-sticky-height', `${stickyHeight}px`);
        // Hold the comparison in the center while its neighboring surfaces stay attached.
        const leadingHeight =
          surface.getBoundingClientRect().top - (sticky?.getBoundingClientRect().top ?? 0);
        const comparisonTop =
          innerWidth < 1024 ? mobileNavHeight : Math.max(0, (innerHeight - height) / 2);
        root.style.setProperty('--scene-sticky-top', `${comparisonTop - leadingHeight}px`);
      } else {
        root.style.removeProperty('--scene-sticky-height');
        root.style.removeProperty('--scene-sticky-top');
      }
    }
    if (root.dataset.sceneMode === mode && !!trigger === pinned) {
      trigger?.refresh();
      return;
    }
    trigger?.kill();
    trigger = undefined;
    logoMotion?.kill();
    logoMotion = undefined;
    root.dataset.sceneMode = mode;
    onMode(mode);
    active = -1;
    if (!pinned) {
      context.revert();
      panels.forEach((panel) => {
        panel.style.removeProperty('visibility');
        panel.style.removeProperty('opacity');
        panel.style.removeProperty('transform');
      });
      if (indicator instanceof HTMLElement) indicator.style.transform = 'translateX(0%)';
      progress?.setAttribute('aria-valuenow', '100');
      return;
    }
    if (logo) {
      context.add(() => {
        // Move the decorative logo with the comparison scroll, reversing on scroll-back.
        logoMotion = gsap.fromTo(
          logo,
          { yPercent: 0 },
          { yPercent: -20, duration: 1, ease: 'none', paused: true },
        );
      });
    }
    // CSS owns the sticky geometry. ScrollTrigger observes it without adding a pin spacer.
    trigger = ScrollTrigger.create({
      trigger: root,
      start:
        kind === 'comparison'
          ? () => `top ${root.style.getPropertyValue('--scene-sticky-top') || '0px'}`
          : 'top top',
      end: kind === 'comparison' ? () => `+=${innerHeight * 2}` : 'bottom bottom',
      onUpdate: (self) => {
        logoMotion?.progress(self.progress);
        select(sceneIndex(self.progress, count), true);
        if (indicator instanceof HTMLElement)
          indicator.style.transform = `translateX(${(self.progress - 1) * 100}%)`;
        progress?.setAttribute('aria-valuenow', String(Math.round(self.progress * 100)));
      },
      onRefresh: (self) => logoMotion?.progress(self.progress),
    });
    select(sceneIndex(trigger.progress, count), false);
  };
  const queue = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const resize = new ResizeObserver(queue);
  resize.observe(content);
  window.addEventListener('resize', queue);
  window.visualViewport?.addEventListener('resize', queue);
  reduced.addEventListener('change', queue);
  document.fonts.addEventListener('loadingdone', queue);
  update();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    trigger?.kill();
    context.revert();
    resize.disconnect();
    window.removeEventListener('resize', queue);
    window.visualViewport?.removeEventListener('resize', queue);
    reduced.removeEventListener('change', queue);
    document.fonts.removeEventListener('loadingdone', queue);
    if (originalMode) root.dataset.sceneMode = originalMode;
    else delete root.dataset.sceneMode;
    if (originalStickyHeight) root.style.setProperty('--scene-sticky-height', originalStickyHeight);
    else root.style.removeProperty('--scene-sticky-height');
    if (originalStickyTop) root.style.setProperty('--scene-sticky-top', originalStickyTop);
    else root.style.removeProperty('--scene-sticky-top');
  };
}
