'use client';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ConnectedTimeline, updateConnectedTimeline } from '@/components/ui/connected-timeline';
import { HIMER_LIFECYCLE_DATA } from '@/data/himer';
import { useScrollDriver } from '@/lib/hooks/use-scroll-driver';
import { clampProgress, useReducedMotion } from '@/lib/hooks/use-scroll-progress';
import { cn } from '@/lib/utils';
import type { LifecycleTab } from '@/types/himer';

import { HimerVideo } from './himer-video';
import { MetricBar } from './metric-bar';

const lifecycleBullets = HIMER_LIFECYCLE_DATA.tabs.map((tab) =>
  tab.bullets.map((label) => ({ label })),
);

function LifecycleStage({
  tab,
  index,
  pinned,
  active,
  preloadNext,
  onVideoReady,
}: {
  tab: LifecycleTab;
  index: number;
  pinned: boolean;
  active: boolean;
  preloadNext: boolean;
  onVideoReady: (desktopSrc: string) => void;
}) {
  const reducedMotion = useReducedMotion();
  const ref = useScrollDriver<HTMLUListElement>('focus', !pinned, (progress, element) => {
    updateConnectedTimeline(element, progress);
    const bar = element
      .closest('[data-lifecycle-stage]')
      ?.querySelector<HTMLElement>('[data-lifecycle-progress]');
    if (bar)
      bar.style.transform = `scaleX(${(index + progress) / HIMER_LIFECYCLE_DATA.tabs.length})`;
  });
  const value = reducedMotion ? 1 : 0;
  return (
    <div
      id={`himer-${tab.id}`}
      data-lifecycle-stage={tab.id}
      aria-hidden={pinned && !active ? true : undefined}
      className={cn(
        'himer-lifecycle-stage grid min-w-0 grid-cols-1 items-center gap-5 lg:grid-cols-[minmax(0,513fr)_minmax(0,787fr)] lg:gap-5',
        pinned && 'col-start-1 row-start-1 transition-opacity duration-300',
        pinned && !active && 'invisible opacity-0',
      )}
    >
      <div className="himer-lifecycle-copy contents md:block md:min-w-0">
        <h3 className="type-h5 text-aqua-mint max-md:order-1 max-md:text-xl max-md:leading-7">
          {tab.badge}
        </h3>
        <h4 className="type-body-m mt-5 text-white max-md:order-3 max-md:mt-0 max-md:text-lg max-md:leading-7 lg:mt-8">
          {tab.title}
        </h4>
        <p
          className={cn(
            'type-body-xxs text-ghost-white mt-3 max-md:order-4 max-md:mt-[-8px] max-md:text-sm max-md:leading-5',
            tab.id === 'govern' && 'max-md:min-h-20',
          )}
        >
          {tab.description}
        </p>
        <ConnectedTimeline
          listRef={ref}
          items={lifecycleBullets[index]}
          progress={value}
          className="himer-bullets mt-6 max-md:order-5 max-md:mt-0 lg:mt-8"
        />
        <div
          aria-hidden="true"
          className="mt-8 hidden h-[3px] overflow-hidden rounded-full bg-white/20 md:block lg:mt-10"
        >
          <div
            data-lifecycle-progress
            className="bg-aqua-mint h-full origin-left rounded-full"
            style={{ transform: `scaleX(${(index + value) / HIMER_LIFECYCLE_DATA.tabs.length})` }}
          />
        </div>
      </div>
      <HimerVideo
        active={!pinned || active}
        preloadInactive={preloadNext}
        onVideoReady={onVideoReady}
        desktopSrc={tab.desktopVideo}
        mobileSrc={tab.mobileVideo}
        aspectRatio="787 / 580"
        fit="cover"
        containerClassName="himer-lifecycle-media lg:justify-self-end max-md:order-2 border border-light-gray rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[30px] lg:rounded-tr-[20px] lg:rounded-br-[30px] lg:rounded-bl-[30px]"
        mobileAspectRatio="362 / 350"
        ariaLabel={`${tab.badge} demonstration`}
      />
    </div>
  );
}

function ProductionProof() {
  return (
    <div
      data-motion-section
      className="to-ghost-white bg-gradient-to-b from-black from-25% to-75% lg:bg-[linear-gradient(187.75deg,#000000_49.6%,#F4F6F9_97.3%)]"
    >
      <div className="relative rounded-tr-[30px] rounded-br-[30px] bg-[linear-gradient(271.8deg,#000000_1.7%,#0F68D6_200%)] py-10 text-white lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:bg-[linear-gradient(66.96deg,#0F68D6_-42.8%,#000000_96.5%)] lg:py-[60px]">
        <div className="layout-container flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div
            data-motion-group
            data-motion-trigger="section"
            data-motion-start="top 75%"
            className="min-w-0 lg:max-w-[740px]"
          >
            <h3 data-motion-reveal="lines" className="type-h3 max-md:text-2xl max-md:leading-8">
              {HIMER_LIFECYCLE_DATA.proof.headline}
            </h3>
            <p
              data-motion-reveal="blur"
              className="type-body-xxs text-light-gray mt-5 max-md:text-sm max-md:leading-5"
            >
              {HIMER_LIFECYCLE_DATA.proof.subtext}
            </p>
          </div>
          <div
            data-motion-group
            data-motion-trigger="section"
            data-motion-start="top 75%"
            className="grid shrink-0 grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5"
          >
            {HIMER_LIFECYCLE_DATA.proof.cards.map((card, index) => (
              <div
                key={card.label}
                data-metric-card
                className="flex min-h-[96px] flex-col justify-between rounded-2xl border border-white/10 bg-white/10 p-3 md:min-h-[132px] md:w-[228px] md:p-5"
              >
                <p className="type-h5 max-md:text-xl max-md:leading-7">
                  <span className="sr-only">{card.value}</span>
                  <span className="inline-flex overflow-hidden align-bottom">
                    <span aria-hidden="true" data-motion-metric-value className="inline-block">
                      {card.value}
                    </span>
                  </span>
                </p>
                <MetricBar
                  value={index === 0 ? 100 : 98.4}
                  threshold={index === 1 ? 96 : undefined}
                  className="bg-light-gray my-3 h-1 md:h-2"
                  fillClassName="from-electric-blue to-aqua-mint bg-gradient-to-r"
                />
                <p className="type-caption font-semibold text-white/80">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const HimerPlatformLifecycleSection = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [canPin, setCanPin] = useState(false);
  const [readyVideos, setReadyVideos] = useState<Set<string>>(() => new Set());
  const onVideoReady = useCallback((src: string) => {
    setReadyVideos((current) => {
      if (current.has(src)) return current;
      const next = new Set(current);
      next.add(src);
      return next;
    });
  }, []);
  const reducedMotion = useReducedMotion();
  const pinned = canPin && !reducedMotion;
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);
  const ref = useScrollDriver<HTMLDivElement>('travel', pinned, (progress) => {
    const count = HIMER_LIFECYCLE_DATA.tabs.length;
    const position = Math.min(progress * count, count - Number.EPSILON * 4);
    const next = Math.min(count - 1, Math.floor(position));
    if (next !== activeStageRef.current) {
      activeStageRef.current = next;
      setActiveStage(next);
    }
    sceneRef.current
      ?.querySelectorAll<HTMLElement>('[data-lifecycle-stage]')
      .forEach((stage, index) => {
        const value = clampProgress(position - index);
        const list = stage.querySelector<HTMLElement>('[data-connected-timeline]');
        const bar = stage.querySelector<HTMLElement>('[data-lifecycle-progress]');
        if (list) updateConnectedTimeline(list, value);
        if (bar) bar.style.transform = `scaleX(${(index + value) / count})`;
      });
  });

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pinned]);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const spacing = window.innerHeight <= 800 ? 224 : 240;
      sceneRef.current?.style.setProperty(
        '--lifecycle-stage-height',
        `${Math.max(200, window.innerHeight - headerHeight - spacing)}px`,
      );
      const scene = sceneRef.current?.parentElement;
      const header = headerRef.current;
      const copies = sceneRef.current?.querySelectorAll<HTMLElement>('.himer-lifecycle-copy');
      if (!scene || !header || !copies?.length || window.innerWidth < 1024) {
        setCanPin(false);
        return;
      }

      const sceneStyle = getComputedStyle(scene);
      const headerStyle = getComputedStyle(header);
      const requiredHeight =
        parseFloat(sceneStyle.paddingTop) +
        parseFloat(sceneStyle.paddingBottom) +
        headerHeight +
        parseFloat(headerStyle.marginBottom) +
        Math.max(200, ...Array.from(copies, (copy) => copy.getBoundingClientRect().height));
      setCanPin(requiredHeight <= window.innerHeight);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    if (headerRef.current) observer.observe(headerRef.current);
    sceneRef.current?.querySelectorAll('.himer-lifecycle-copy').forEach((copy) => {
      observer.observe(copy);
    });
    window.addEventListener('resize', schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section
      className="relative w-full bg-black text-white"
      aria-label="Build, manage and govern"
      data-lifecycle-mode={pinned ? 'scroll' : 'stack'}
    >
      <div ref={ref} className="relative" style={pinned ? { height: '400svh' } : undefined}>
        <div
          className={cn(
            'bg-gradient-to-b from-[#042645] to-[#062D5E] lg:from-[#010C1A] lg:to-[#0A438B]',
            pinned && 'sticky top-0',
          )}
        >
          <div
            className={cn(
              'rounded-tl-[30px] rounded-bl-[30px] bg-black py-10 lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:pt-[80px] lg:pb-20',
              pinned && 'himer-lifecycle-scene flex h-svh overflow-y-auto',
            )}
          >
            <div ref={sceneRef} className="layout-container min-w-0">
              <div ref={headerRef} className="himer-lifecycle-header mb-5 lg:mb-10">
                <h2 className="type-h2 tracking-[-0.01em]">{HIMER_LIFECYCLE_DATA.headline}</h2>
                <p className="type-body-xxs text-light-gray mt-5">{HIMER_LIFECYCLE_DATA.subtext}</p>
              </div>
              <div className={cn('grid gap-y-[60px]', pinned && 'gap-y-0')}>
                {HIMER_LIFECYCLE_DATA.tabs.map((tab, index) => (
                  <LifecycleStage
                    key={tab.id}
                    tab={tab}
                    index={index}
                    pinned={pinned}
                    active={index === activeStage}
                    preloadNext={
                      pinned &&
                      index === activeStage + 1 &&
                      readyVideos.has(HIMER_LIFECYCLE_DATA.tabs[activeStage].desktopVideo)
                    }
                    onVideoReady={onVideoReady}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductionProof />
    </section>
  );
};

export default HimerPlatformLifecycleSection;
