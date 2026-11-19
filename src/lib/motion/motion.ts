// Load GSAP's bundled declarations for the SSR/Node-compatible UMD entry points.
import type {} from 'gsap';
import { gsap } from 'gsap/dist/gsap';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

export type MotionCleanup = () => void;

export interface MotionMetric {
  value?: number;
  prefix: string;
  suffix: string;
  decimals: number;
  isRange?: boolean;
  min?: number;
  max?: number;
  isFraction?: boolean;
  fractionTotal?: number;
}

export function parseMotionMetric(text: string): MotionMetric | null {
  const trimmed = text.trim();

  // 1. Check Range: e.g. "30–70%", "30-70%", "$25–181", "60%–70%"
  const rangeMatch = trimmed.match(
    /^([$£€<+≈~≥≤>±~]|[-+][$£€])?\s*(\d+)(?:%|px)?\s*[–-]\s*([$£€<+≈~≥≤>±~]|[-+][$£€])?\s*(\d+)(.*)$/,
  );
  if (rangeMatch) {
    return {
      isRange: true,
      min: Number(rangeMatch[2]),
      max: Number(rangeMatch[4]),
      prefix: rangeMatch[1] ?? '',
      suffix: rangeMatch[5] ?? '',
      decimals: 0,
    };
  }

  // 2. Check Fraction: e.g. "30 / 30"
  const fractionMatch = trimmed.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (fractionMatch) {
    return {
      isFraction: true,
      value: Number(fractionMatch[1]),
      fractionTotal: Number(fractionMatch[2]),
      prefix: '',
      suffix: ` / ${fractionMatch[2]}`,
      decimals: 0,
    };
  }

  // 3. Standard Number / Currency / Multiplier / Unit: e.g. "95%", "100+", "4,000+", "$4.2M", "2 weeks", "24 hrs", "≈6,000", "+35%"
  const match = trimmed.match(
    /^([$£€<+≈~≥≤>±~]|[-+][$£€]|(?:Up to|Under|About|Approx\.?)\s+)?(-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?)(.*)$/i,
  );
  if (!match) return null;
  const suffix = match[3] ?? '';
  const suffixMatch = suffix.match(
    /^(\s*(?:%[+]?|[KMBkmbxX+]|hrs?|days?|weeks?|months?|x\s+\w+))\s*$/i,
  );
  if (suffix.trim() && !suffixMatch) return null;

  const rawNumber = match[2];
  const cleanNumber = rawNumber.replace(/,/g, '');
  const value = Number(cleanNumber);
  if (Number.isNaN(value)) return null;

  const decimals = cleanNumber.includes('.') ? cleanNumber.split('.')[1].length : 0;
  return {
    value,
    prefix: match[1] ?? '',
    suffix: suffixMatch ? suffixMatch[1] : suffix,
    decimals,
  };
}

function mountAmbient(root: HTMLElement): MotionCleanup {
  const hero = root.querySelector<HTMLElement>('[data-motion-ambient]');
  const driftLayer = hero?.querySelector<HTMLElement>('[data-motion-drift]');
  const pointerLayer = hero?.querySelector<HTMLElement>('[data-motion-pointer]');
  if (!hero || !driftLayer || !pointerLayer) return () => {};
  const drift = gsap.to(driftLayer, {
    x: 8,
    y: 6,
    scale: 1.025,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
  const pointerX = gsap.quickTo(pointerLayer, 'x', { duration: 1.2, ease: 'power3.out' });
  const pointerY = gsap.quickTo(pointerLayer, 'y', { duration: 1.2, ease: 'power3.out' });
  let inView = true;
  let rect = hero.getBoundingClientRect();
  const enabled = () => hero.dataset.motionPaused !== 'true' && inView && !document.hidden;
  const reset = () => {
    pointerX(0);
    pointerY(0);
  };
  const sync = () => {
    drift.paused(!enabled());
    if (!enabled()) reset();
  };
  const move = (event: PointerEvent) => {
    if (!enabled() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    pointerX(((event.clientX - rect.left) / rect.width - 0.5) * -36);
    pointerY(((event.clientY - rect.top) / rect.height - 0.5) * -24);
  };
  const measure = () => {
    rect = hero.getBoundingClientRect();
  };
  const intersection = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  });
  intersection.observe(hero);
  const attributes = new MutationObserver(sync);
  attributes.observe(hero, { attributes: true, attributeFilter: ['data-motion-paused'] });
  hero.addEventListener('pointerenter', measure);
  hero.addEventListener('pointermove', move);
  hero.addEventListener('pointerleave', reset);
  document.addEventListener('visibilitychange', sync);
  sync();
  return () => {
    intersection.disconnect();
    attributes.disconnect();
    hero.removeEventListener('pointerenter', measure);
    hero.removeEventListener('pointermove', move);
    hero.removeEventListener('pointerleave', reset);
    document.removeEventListener('visibilitychange', sync);
    drift.kill();
    pointerX.tween.kill();
    pointerY.tween.kill();
  };
}

function mountMagnetic(root: HTMLElement): MotionCleanup {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  const cleanups: MotionCleanup[] = [];
  root.querySelectorAll<HTMLElement>('[data-motion-magnetic]').forEach((button) => {
    const targets = Array.from(button.children).filter(
      (child) => child instanceof HTMLElement || child instanceof SVGElement,
    );
    if (!targets.length) return;
    let rect: DOMRect;
    const enter = () => {
      rect = button.getBoundingClientRect();
    };
    const move = (event: PointerEvent) => {
      if (!rect) return;
      gsap.to(targets, {
        x: (event.clientX - rect.left - rect.width / 2) * 0.14,
        y: (event.clientY - rect.top - rect.height / 2) * 0.18,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };
    const leave = () =>
      gsap.to(targets, {
        x: 0,
        y: 0,
        duration: 1.1,
        ease: 'elastic.out(1, 0.35)',
        overwrite: 'auto',
      });
    button.addEventListener('pointerenter', enter);
    button.addEventListener('pointermove', move);
    button.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      button.removeEventListener('pointerenter', enter);
      button.removeEventListener('pointermove', move);
      button.removeEventListener('pointerleave', leave);
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: 'transform' });
    });
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}

export function mountPageMotion(
  root: HTMLElement,
  { footer, initial = true }: { footer?: HTMLElement; initial?: boolean } = {},
): MotionCleanup {
  const media = gsap.matchMedia();
  const seen = new WeakSet<Element>();
  let firstSetup = true;
  media.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1024px)',
      mobile: '(max-width: 1023px)',
    },
    (match) => {
      const animateVisible = initial && firstSetup;
      firstSetup = false;
      if (!match.conditions?.motion) return;
      const restores: MotionCleanup[] = [];
      const context = gsap.context(() => {}, root);
      context.add(() => {
        const hosts = new Set<HTMLElement>();
        const groups = new Map<HTMLElement, gsap.core.Timeline>();
        // A sticky sequence moves with its neighboring sections. Observe their actual
        // viewport entry rather than a document scroll position calculated before pinning.
        const observeSequenceEntry = (element: HTMLElement, animation: gsap.core.Animation) => {
          if (element.hasAttribute('data-scene-content')) return false;
          if (
            !element.closest(
              '[data-economic-sequence], [data-philosophy-sequence], [data-motion-scene="comparison"]',
            )
          )
            return false;
          const observer = new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                animation.play();
                observer.disconnect();
              }
            },
            { rootMargin: '0px 0px -14% 0px' },
          );
          observer.observe(element);
          restores.push(() => observer.disconnect());
          return true;
        };
        root.querySelectorAll<HTMLElement>('[data-motion-reveal]').forEach((target) => {
          const kind = target.dataset.motionReveal;
          const section = target.closest<HTMLElement>(
            '[data-motion-section], [data-home-section], section',
          );
          const intro =
            section?.dataset.homeSection === 'hero' || section?.dataset.motionSection === 'hero';
          const excluded = kind === 'card' ? target.parentElement : target;
          if (
            !target.getClientRects().length ||
            seen.has(target) ||
            excluded?.closest('[inert], [aria-hidden="true"]:not([data-motion-banner])')
          )
            return;
          // The media frame rises; its image keeps ownership of native scroll parallax.
          const element = target instanceof HTMLImageElement ? target.parentElement : target;
          if (!element || hosts.has(element)) return;
          hosts.add(element);
          const rect = element.getBoundingClientRect();
          if (rect.right <= 0 || rect.left >= innerWidth) return;
          if ((rect.bottom < 0 && !intro) || (!animateVisible && rect.top < innerHeight)) {
            seen.add(target);
            return;
          }
          const originalWillChange = element.style.willChange;
          const originalOpacity = Number(getComputedStyle(element).opacity);
          const at = Number.parseFloat(target.dataset.motionAt ?? '');
          const duration = Number.parseFloat(target.dataset.motionDuration ?? '');
          let split: SplitText | undefined;
          let zoom: Animation | undefined;
          let startZoom: (() => void) | undefined;
          const timeline = gsap.timeline({
            paused: true,
            onStart: () => {
              seen.add(target);
              element.dataset.motionEntry = 'running';
              startZoom?.();
              element.style.willChange =
                kind === 'navbar-shell'
                  ? 'opacity'
                  : kind === 'panel' ||
                      kind === 'panel-ltr' ||
                      kind === 'panel-rtl' ||
                      kind === 'image'
                    ? 'clip-path'
                    : kind === 'blur'
                      ? 'transform,opacity,filter'
                      : 'transform,opacity';
            },
            onComplete: () => {
              split?.revert();
              gsap.set(element, {
                clearProps:
                  kind === 'navbar-shell'
                    ? 'opacity,visibility'
                    : kind === 'panel' ||
                        kind === 'panel-ltr' ||
                        kind === 'panel-rtl' ||
                        kind === 'image'
                      ? 'clip-path,opacity,visibility'
                      : kind === 'blur'
                        ? 'transform,opacity,visibility,filter'
                        : 'transform,opacity,visibility',
              });
              element.style.willChange = originalWillChange;
              element.dataset.motionEntry = 'complete';
            },
          });
          element.dataset.motionEntry = 'prepared';
          restores.push(() => {
            split?.revert();
            zoom?.cancel();
            element.style.willChange = originalWillChange;
            delete element.dataset.motionEntry;
          });
          gsap.set(element, kind === 'hero-media' ? { opacity: 0 } : { autoAlpha: 0 });
          if (kind === 'lines' || kind === 'words') {
            split = SplitText.create(element, {
              type: kind === 'words' ? 'lines,words' : 'lines',
              mask: 'lines',
              autoSplit: true,
            });
            const targets = (kind === 'words' ? split.words : split.lines)?.length
              ? kind === 'words'
                ? split.words
                : split.lines
              : [element];
            const textAnimation = gsap.fromTo(
              targets,
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: Number.isFinite(duration) ? duration : 1.15,
                stagger:
                  Number.parseFloat(target.dataset.motionStagger ?? '') ||
                  (kind === 'words' ? 0.035 : 0.1),
                ease: 'power3.out',
              },
            );
            timeline.to(element, { autoAlpha: 1, duration: 0.18 }, 0);
            timeline.add(textAnimation, 0);
          } else if (kind === 'blur') {
            // Descriptions reveal as a whole block, rather than as individual words.
            gsap.set(element, { y: 18, filter: 'blur(6px)' });
            timeline.to(element, {
              y: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: Number.isFinite(duration) ? duration : 1.1,
              ease: 'power3.out',
            });
          } else if (kind === 'image') {
            const image =
              target instanceof HTMLImageElement ? target : element.querySelector('img');
            const background = target.dataset.motionImage === 'background';
            if (!background) gsap.set(element, { clipPath: 'inset(14% 10% 14% 10% round 28px)' });
            startZoom = () => {
              if (!image) return;
              const matrix = new DOMMatrixReadOnly(getComputedStyle(image).transform);
              const baseScale = Math.hypot(matrix.a, matrix.b) || 1;
              // Individual scale is independent of the native scroll-parallax transform.
              zoom = image.animate(
                [{ scale: String(Math.max(1, 1.35 / baseScale)) }, { scale: '1' }],
                {
                  duration: 2000,
                  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                },
              );
            };
            timeline.set(element, { autoAlpha: 1, immediateRender: false }, 0).to(
              element,
              {
                ...(background ? { autoAlpha: 1 } : { clipPath: 'inset(0% 0% 0% 0% round 0px)' }),
                duration: 1.5,
                ease: 'expo.inOut',
              },
              0,
            );
          } else if (kind === 'banner') {
            gsap.set(element, { scale: 1.28 });
            timeline.set(element, { autoAlpha: 1 }, 0).to(
              element,
              {
                scale: 1,
                duration: 2.6,
                ease: 'expo.out',
              },
              0,
            );
          } else if (kind === 'panel' || kind === 'panel-ltr') {
            gsap.set(element, { clipPath: 'inset(0% 100% 0% 0%)' });
            timeline.set(element, { autoAlpha: 1 }, 0).to(
              element,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: Number.isFinite(duration) ? duration : 1.6,
                ease: 'expo.inOut',
              },
              0,
            );
            // A keyboard user can reach the CTA while its containing panel is revealing.
            const finish = () => timeline.progress(1);
            element.addEventListener('focusin', finish);
            restores.push(() => element.removeEventListener('focusin', finish));
          } else if (kind === 'panel-rtl') {
            gsap.set(element, { clipPath: 'inset(0% 0% 0% 100%)' });
            timeline.set(element, { autoAlpha: 1 }, 0).to(
              element,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: Number.isFinite(duration) ? duration : 1.6,
                ease: 'expo.inOut',
              },
              0,
            );
            const finish = () => timeline.progress(1);
            element.addEventListener('focusin', finish);
            restores.push(() => element.removeEventListener('focusin', finish));
          } else if (kind === 'slide') {
            gsap.set(element, { x: -16 });
            timeline.to(element, {
              x: 0,
              autoAlpha: originalOpacity,
              duration: 0.9,
              ease: 'power3.out',
            });
          } else if (kind === 'card') {
            gsap.set(element, { x: 220 });
            timeline.to(element, {
              x: 0,
              autoAlpha: originalOpacity,
              duration: 1.8,
              ease: 'expo.out',
            });
          } else if (kind === 'hero-media') {
            timeline.to(element, { opacity: 1, duration: 0.85, ease: 'power3.out' });
          } else if (kind === 'navbar-shell') {
            // Share the first item's start/ease; leave the mobile scroll-hide transform alone.
            timeline.to(element, { autoAlpha: 1, duration: 0.85, ease: 'power3.out' });
          } else if (kind === 'scramble') {
            const text = element.textContent ?? '';
            const label = element.getAttribute('aria-label');
            const role = element.getAttribute('role');
            element.setAttribute('aria-label', text);
            element.setAttribute('role', 'img');
            gsap.set(element, { y: 14 });
            timeline.to(element, { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power3.out' }, 0).to(
              element,
              {
                scrambleText: { text, chars: 'abcdefghijklmnopqrstuvwxyz', speed: 0.6 },
                duration: 0.7,
                ease: 'none',
              },
              0.05,
            );
            restores.push(() => {
              element.textContent = text;
              if (label === null) element.removeAttribute('aria-label');
              else element.setAttribute('aria-label', label);
              if (role === null) element.removeAttribute('role');
              else element.setAttribute('role', role);
            });
          } else {
            gsap.set(element, {
              y: Number.parseFloat(target.dataset.motionY ?? '') || (kind === 'navbar' ? -24 : 28),
            });
            timeline.to(element, {
              y: 0,
              autoAlpha: 1,
              duration: Number.isFinite(duration) ? duration : kind === 'navbar' ? 0.85 : 1,
              ease: 'power3.out',
            });
          }
          let group = target.hasAttribute('data-motion-independent')
            ? null
            : target.closest<HTMLElement>('[data-motion-group]');
          let ownViewport = false;
          if (group && !intro && !group.hasAttribute('data-motion-together')) {
            const anchor = group.dataset.motionTrigger === 'section' ? (section ?? group) : group;
            const percent = Number.parseFloat(
              (group.dataset.motionStart ?? 'top 82%').split(' ')[1],
            );
            const boundary = Number.isFinite(percent) ? percent / 100 : 0.82;
            const offset = Math.max(0, rect.top - anchor.getBoundingClientRect().top);
            // Long copy/mobile stacks must not finish below the fold just because their header entered.
            if (boundary * innerHeight + offset > innerHeight * 0.9) {
              group = null;
              ownViewport = true;
            }
          }
          if (group) {
            let sequence = groups.get(group);
            if (!sequence) {
              sequence = gsap.timeline({ paused: true });
              groups.set(group, sequence);
            }
            const isHome = section?.dataset.homeSection === 'hero';
            const foregroundStart = isHome ? 0.55 : 0.05;
            const position = Number.isFinite(at)
              ? at
              : !intro
                ? kind === 'scramble' ||
                  kind === 'panel' ||
                  kind === 'panel-ltr' ||
                  kind === 'panel-rtl'
                  ? 0
                  : kind === 'lines' || kind === 'words'
                    ? 0.1
                    : kind === 'image'
                      ? 0.15
                      : kind === 'blur'
                        ? 0.25
                        : 0.35
                : kind === 'navbar-shell'
                  ? foregroundStart
                  : kind === 'navbar'
                    ? foregroundStart +
                      0.04 +
                      Math.max(0, sequence.getChildren(false).length - 1) * 0.045
                    : kind === 'banner'
                      ? 0
                      : kind === 'scramble'
                        ? isHome
                          ? 0.95
                          : 0.65
                        : kind === 'lines' || kind === 'words'
                          ? isHome
                            ? 1.05
                            : 0.75
                          : kind === 'blur'
                            ? isHome
                              ? 1.25
                              : 0.95
                            : isHome
                              ? 1.45
                              : 1.15;
            sequence.add(timeline.paused(false), position);
          } else {
            const delay = ownViewport ? Math.min(Number.isFinite(at) ? at : 0.15, 0.2) : at;
            const animation =
              Number.isFinite(delay) && delay > 0
                ? gsap.timeline({ paused: true }).add(timeline.paused(false), delay)
                : timeline;
            if (observeSequenceEntry(element, animation)) return;
            ScrollTrigger.create({
              trigger: target.dataset.motionTrigger === 'section' ? (section ?? element) : element,
              start:
                target.dataset.motionTrigger === 'section' && section
                  ? () => {
                      const boundary =
                        Number.parseFloat((target.dataset.motionStart ?? 'top 82%').split(' ')[1]) /
                        100;
                      // A section cue must never spend an entry while this particular item is below view.
                      return Math.max(
                        section.getBoundingClientRect().top + scrollY - innerHeight * boundary,
                        element.getBoundingClientRect().top + scrollY - innerHeight * 0.86,
                      );
                    }
                  : (target.dataset.motionStart ?? (kind === 'image' ? 'top 86%' : 'top 82%')),
              once: true,
              animation,
              toggleActions: 'play none none none',
            });
          }
        });
        groups.forEach((animation, group) => {
          if (observeSequenceEntry(group, animation)) return;
          ScrollTrigger.create({
            trigger:
              group.getAttribute('data-motion-trigger') === 'section'
                ? (group.closest('[data-motion-section], [data-home-section], section') ?? group)
                : group,
            start: group.getAttribute('data-motion-start') ?? 'top 82%',
            once: true,
            animation,
            toggleActions: 'play none none none',
          });
        });
        root.querySelectorAll<HTMLElement>('[data-motion-metric-value]').forEach((target) => {
          if (!target.getClientRects().length) return;
          const text = target.textContent ?? '';
          const metric = parseMotionMetric(text);
          if (!target.hasAttribute('aria-label')) {
            target.setAttribute('aria-label', text);
          }
          restores.push(() => {
            target.textContent = text;
            target.removeAttribute('aria-label');
            gsap.set(target, { clearProps: 'all' });
          });
          const card = target.closest<HTMLElement>('[data-motion-reveal], [data-metric-card]');
          const section = target.closest<HTMLElement>(
            '[data-motion-section], [data-home-section], section',
          );
          const intro =
            section?.dataset.homeSection === 'hero' || section?.dataset.motionSection === 'hero';

          const parentContainer = card?.parentElement ?? target.parentElement;
          const cards = parentContainer
            ? Array.from(parentContainer.querySelectorAll<HTMLElement>('[data-metric-card]'))
            : [];
          const cardIndex =
            card && cards.length
              ? Math.max(0, cards.indexOf(card))
              : parentContainer
                ? Array.from(
                    parentContainer.querySelectorAll<HTMLElement>('[data-motion-metric-value]'),
                  ).indexOf(target)
                : 0;
          const explicitAt = Number.parseFloat(card?.dataset.motionAt ?? '');
          const delay = Number.isFinite(explicitAt)
            ? explicitAt
            : intro
              ? 0.75 + cardIndex * 0.12
              : cardIndex * 0.12;

          const startText = text.replace(/\d/g, '0');
          target.innerHTML = Array.from(startText)
            .map(
              (char) =>
                `<span class="metric-character inline-block" style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`,
            )
            .join('');
          const chars = Array.from(target.querySelectorAll<HTMLElement>('.metric-character'));
          gsap.set(chars, { yPercent: 110, opacity: 0 });

          const animateMetric = () => {
            const tl = gsap.timeline({ delay });

            // 1. Character-by-character staggered slide-up from bottom
            tl.to(chars, {
              yPercent: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.045,
              ease: 'power3.out',
            });

            // 2. Number roll
            if (metric) {
              if (metric.isRange && metric.min !== undefined && metric.max !== undefined) {
                const rangeVal = { min: 0, max: 0 };
                tl.to(
                  rangeVal,
                  {
                    min: metric.min,
                    max: metric.max,
                    duration: 2.0,
                    ease: 'expo.out',
                    onUpdate: () => {
                      target.textContent = `${metric.prefix}${Math.round(rangeVal.min)}–${Math.round(rangeVal.max)}${metric.suffix}`;
                    },
                    onComplete: () => {
                      target.textContent = text;
                      gsap.set(target, { clearProps: 'all' });
                    },
                  },
                  '-=0.15',
                );
              } else if (
                metric.isFraction &&
                metric.fractionTotal !== undefined &&
                metric.value !== undefined
              ) {
                const fracVal = { current: 0 };
                tl.to(
                  fracVal,
                  {
                    current: metric.value,
                    duration: 2.0,
                    ease: 'expo.out',
                    onUpdate: () => {
                      target.textContent = `${Math.round(fracVal.current)} / ${metric.fractionTotal}`;
                    },
                    onComplete: () => {
                      target.textContent = text;
                      gsap.set(target, { clearProps: 'all' });
                    },
                  },
                  '-=0.15',
                );
              } else if (metric.value !== undefined) {
                const value = { current: 0 };
                tl.to(
                  value,
                  {
                    current: metric.value,
                    duration: 2.0,
                    ease: 'expo.out',
                    onUpdate: () => {
                      target.textContent = `${metric.prefix}${value.current.toLocaleString(
                        'en-US',
                        {
                          minimumFractionDigits: metric.decimals,
                          maximumFractionDigits: metric.decimals,
                          useGrouping: text.includes(','),
                        },
                      )}${metric.suffix}`;
                    },
                    onComplete: () => {
                      target.textContent = text;
                      gsap.set(target, { clearProps: 'all' });
                    },
                  },
                  '-=0.15',
                );
              }
            } else {
              tl.add(() => {
                target.textContent = text;
                gsap.set(target, { clearProps: 'all' });
              });
            }
          };

          const group = target.closest<HTMLElement>('[data-motion-group]');
          const groupTrigger =
            group?.getAttribute('data-motion-trigger') === 'section'
              ? (group.closest('[data-motion-section], [data-home-section], section') ?? group)
              : (group ?? card ?? target);
          const groupStart =
            group?.getAttribute('data-motion-start') ?? (card ? 'top 85%' : 'top 88%');

          ScrollTrigger.create({
            trigger: groupTrigger,
            start: groupStart,
            once: true,
            onEnter: contextSafe(() => {
              animateMetric();
            }),
          });
        });
        const economicCard = root.querySelector('[data-motion-scrub-scale]');
        if (economicCard)
          gsap.from(economicCard, {
            scale: 0.9,
            borderRadius: 48,
            ease: 'none',
            scrollTrigger: {
              trigger: economicCard,
              start: 'top bottom',
              end: 'top 10%',
              scrub: true,
            },
          });
        const footerGrid = footer?.querySelector<HTMLElement>('.grid');
        const revealFooter = (
          target: Element | null | undefined,
          index: number,
          divider = false,
        ) => {
          if (!(target instanceof HTMLElement) || seen.has(target)) return;
          if (!animateVisible && target.getBoundingClientRect().top < innerHeight) {
            seen.add(target);
            return;
          }
          target.dataset.motionFooter = divider ? 'divider' : 'content';
          target.dataset.motionEntry = 'prepared';
          restores.push(() => {
            delete target.dataset.motionFooter;
            delete target.dataset.motionEntry;
          });
          const animation = gsap.fromTo(
            target,
            divider
              ? { scaleX: 0, transformOrigin: '0% 50%' }
              : { y: index < 0 ? 16 : 30, opacity: 0 },
            {
              paused: true,
              ...(divider ? { scaleX: 1, transformOrigin: '0% 50%' } : { y: 0, opacity: 1 }),
              duration: divider ? 1.4 : 1.1,
              delay: Math.max(0, index) * 0.08,
              ease: 'power3.out',
              onStart: () => {
                seen.add(target);
                target.dataset.motionEntry = 'running';
              },
              onComplete: () => {
                target.dataset.motionEntry = 'complete';
              },
              clearProps: 'transform,transformOrigin,opacity',
            },
          );
          ScrollTrigger.create({
            trigger: target,
            start: 'top 98%',
            once: true,
            onEnter: () => animation.play(),
          });
        };
        Array.from(footerGrid?.children ?? []).forEach((column, index) =>
          revealFooter(column, index),
        );
        revealFooter(footerGrid?.nextElementSibling, 0, true);
        revealFooter(footerGrid?.nextElementSibling?.nextElementSibling, -1);
        const dynamicDecks = root.querySelectorAll<HTMLElement>('[data-deck], .culture-card-stack');
        if (dynamicDecks.length) {
          let deckRaf: number | undefined;
          const deckObserver = new ResizeObserver(() => {
            if (deckRaf) cancelAnimationFrame(deckRaf);
            deckRaf = requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
          });
          dynamicDecks.forEach((d) => deckObserver.observe(d));
          restores.push(() => {
            if (deckRaf) cancelAnimationFrame(deckRaf);
            deckObserver.disconnect();
          });
        }
        // Final geometry and clamp-to-page-end positions depend on all prepared reveals.
        ScrollTrigger.refresh();
        function contextSafe(callback: () => void) {
          return () => {
            context.add(callback);
          };
        }
      });
      const ambientContext = gsap.context(() => {}, root);
      let ambientCleanup: MotionCleanup = () => {};
      let magneticCleanup: MotionCleanup = () => {};
      ambientContext.add(() => {
        ambientCleanup = mountAmbient(root);
        magneticCleanup = mountMagnetic(root);
      });
      return () => {
        ambientCleanup();
        magneticCleanup();
        ambientContext.revert();
        context.revert();
        restores.reverse().forEach((restore) => restore());
      };
    },
  );
  return () => media.revert();
}

export function mountWordHighlight(root: HTMLElement): MotionCleanup {
  const media = gsap.matchMedia();
  media.add(
    '(prefers-reduced-motion: no-preference)',
    () => {
      const words = root.querySelectorAll('[data-motion-word]');
      const statement = words[0]?.closest('p') ?? root;
      gsap.fromTo(
        words,
        { color: '#D7DCE2' },
        {
          color: '#2A2A2A',
          stagger: 0.5,
          ease: 'none',
          scrollTrigger: { trigger: statement, start: 'top 72%', end: 'bottom 38%', scrub: 0.6 },
        },
      );
    },
    root,
  );
  return () => media.revert();
}

export function mountCarouselAutoplay(
  root: HTMLElement,
  advance: () => void,
  interval: number,
): MotionCleanup {
  const media = gsap.matchMedia();
  media.add(
    '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
    () => {
      let visible = false;
      let hovered = false;
      let disposed = false;
      let timer: ReturnType<typeof setInterval> | undefined;
      const sync = () => {
        clearInterval(timer);
        if (disposed) return;
        if (
          visible &&
          !hovered &&
          !document.hidden &&
          !root.querySelector(':focus-visible') &&
          root.dataset.carouselPaused !== 'true'
        )
          timer = setInterval(advance, interval);
      };
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
          sync();
        },
        { threshold: [0, 0.5] },
      );
      observer.observe(
        root.querySelector('[data-why-track], [data-testimonial-track]')?.parentElement ?? root,
      );
      const attributes = new MutationObserver(sync);
      attributes.observe(root, { attributes: true, attributeFilter: ['data-carousel-paused'] });
      const enter = () => {
        hovered = true;
        sync();
      };
      const leave = () => {
        hovered = false;
        sync();
      };
      const blur = () => queueMicrotask(sync);
      root.addEventListener('pointerenter', enter);
      root.addEventListener('pointerleave', leave);
      root.addEventListener('focusin', sync);
      root.addEventListener('focusout', blur);
      document.addEventListener('visibilitychange', sync);
      return () => {
        disposed = true;
        clearInterval(timer);
        observer.disconnect();
        attributes.disconnect();
        root.removeEventListener('pointerenter', enter);
        root.removeEventListener('pointerleave', leave);
        root.removeEventListener('focusin', sync);
        root.removeEventListener('focusout', blur);
        document.removeEventListener('visibilitychange', sync);
      };
    },
    root,
  );
  return () => media.revert();
}

export function mountNavbarMotion(root: HTMLElement): MotionCleanup {
  const media = gsap.matchMedia();
  media.add(
    '(prefers-reduced-motion: no-preference)',
    () => {
      const context = gsap.context(() => {}, root);
      const header = root.querySelector('header') ?? root;
      const reveal = (panel: Element) => {
        const labels = Array.from(panel.querySelectorAll<HTMLElement>('[data-nav-reveal-text]'));
        gsap.killTweensOf(labels);
        context.add(() => {
          if (panel.getAttribute('data-nav-open') !== 'true') {
            gsap.set(labels, { yPercent: 110, opacity: 0 });
            return;
          }
          const visibleLabels = labels.filter((label) => !label.closest('[data-nav-open="false"]'));
          gsap.to(visibleLabels, {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.05,
            ease: 'power3.out',
            overwrite: true,
            clearProps: 'transform,opacity',
          });
        });
      };
      root.querySelectorAll('[data-nav-open]').forEach(reveal);
      const observer = new MutationObserver((records) =>
        records.forEach((record) => reveal(record.target as Element)),
      );
      observer.observe(root, {
        subtree: true,
        attributes: true,
        attributeFilter: ['data-nav-open'],
      });
      let lastY = scrollY;
      let hidden = false;
      const show = () => {
        if (!hidden) return;
        hidden = false;
        context.add(() =>
          gsap.to(header, { yPercent: 0, duration: 0.45, ease: 'expo.out', overwrite: 'auto' }),
        );
      };
      const scroll = () => {
        const current = scrollY;
        const nextHidden =
          innerWidth < 1024 &&
          current > 140 &&
          current > lastY &&
          !root.querySelector('[data-nav-open="true"]') &&
          !root.contains(document.activeElement);
        if (nextHidden !== hidden) {
          hidden = nextHidden;
          context.add(() =>
            gsap.to(header, {
              yPercent: hidden ? -130 : 0,
              duration: 0.45,
              ease: 'expo.out',
              overwrite: 'auto',
            }),
          );
        }
        lastY = current;
      };
      const resize = () => {
        if (innerWidth >= 1024) {
          hidden = false;
          gsap.killTweensOf(header, 'yPercent');
          context.add(() => gsap.set(header, { clearProps: 'transform,translate,rotate,scale' }));
        }
        lastY = scrollY;
      };
      window.addEventListener('scroll', scroll, { passive: true });
      window.addEventListener('resize', resize);
      const focus = (event: FocusEvent) => {
        show();
        const control = (event.target as Element).closest('a,button');
        const label = control?.querySelector('[data-nav-reveal-text]');
        if (label) {
          gsap.killTweensOf(label);
          context.add(() => gsap.set(label, { clearProps: 'transform,opacity' }));
        }
      };
      root.addEventListener('focusin', focus);
      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', scroll);
        window.removeEventListener('resize', resize);
        root.removeEventListener('focusin', focus);
        context.revert();
        // Interrupted/replaced tweens may no longer be registered for context restoration.
        root.querySelectorAll<HTMLElement>('[data-nav-reveal-text]').forEach((label) => {
          label.style.removeProperty('transform');
          label.style.removeProperty('opacity');
          label.style.removeProperty('translate');
          label.style.removeProperty('rotate');
          label.style.removeProperty('scale');
        });
      };
    },
    root,
  );
  return () => media.revert();
}

export function mountCarouselDrag(
  viewport: HTMLElement,
  track: HTMLElement,
  onNavigate: (direction: number) => void,
  restore?: () => void,
  canStart?: () => boolean,
): MotionCleanup {
  let gesture: { x: number; offset: number; moved: boolean; pointer: number } | undefined;
  let suppressClick = false;
  const restorePosition = () => {
    if (restore) restore();
    else
      gsap.to(track, {
        x: 0,
        duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.6,
        ease: 'expo.out',
        overwrite: true,
      });
  };
  const cancel = () => {
    const current = gesture;
    gesture = undefined;
    if (!current) return;
    if (viewport.hasPointerCapture(current.pointer))
      viewport.releasePointerCapture(current.pointer);
    if (current.moved) restorePosition();
  };
  const down = (event: PointerEvent) => {
    if (event.button !== 0 || event.pointerType !== 'mouse' || canStart?.() === false) return;
    suppressClick = false;
    gesture = {
      x: event.clientX,
      offset: Number(gsap.getProperty(track, 'x')),
      moved: false,
      pointer: event.pointerId,
    };
  };
  const move = (event: PointerEvent) => {
    if (!gesture || event.pointerId !== gesture.pointer) return;
    if (!(event.buttons & 1)) {
      cancel();
      return;
    }
    const delta = event.clientX - gesture.x;
    if (Math.abs(delta) > 8 && !gesture.moved) {
      gesture.moved = true;
      viewport.setPointerCapture(event.pointerId);
      gsap.killTweensOf(track);
    }
    if (gesture.moved) gsap.set(track, { x: gesture.offset + delta * 0.6 });
  };
  const release = (event: PointerEvent) => {
    if (!gesture || event.pointerId !== gesture.pointer) return;
    const current = gesture;
    gesture = undefined;
    if (!current) return;
    if (viewport.hasPointerCapture(current.pointer))
      viewport.releasePointerCapture(current.pointer);
    if (!current.moved) return;
    suppressClick = true;
    const delta = event.clientX - current.x;
    // Pixel tracks provide their own resting position; percentage tracks restore only drag offset.
    restorePosition();
    if (event.type !== 'pointercancel' && Math.abs(delta) > 70) onNavigate(delta < 0 ? 1 : -1);
  };
  const click = (event: MouseEvent) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  };
  const drag = (event: DragEvent) => event.preventDefault();
  viewport.addEventListener('pointerdown', down);
  viewport.addEventListener('pointermove', move);
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  viewport.addEventListener('lostpointercapture', cancel);
  viewport.addEventListener('click', click, true);
  viewport.addEventListener('dragstart', drag);
  return () => {
    if (gesture && viewport.hasPointerCapture(gesture.pointer))
      viewport.releasePointerCapture(gesture.pointer);
    viewport.removeEventListener('pointerdown', down);
    viewport.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', release);
    window.removeEventListener('pointercancel', release);
    viewport.removeEventListener('lostpointercapture', cancel);
    viewport.removeEventListener('click', click, true);
    viewport.removeEventListener('dragstart', drag);
    gsap.killTweensOf(track);
  };
}
