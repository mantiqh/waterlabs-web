'use client';

import { useEffect, useRef, useState } from 'react';

import { HIMER_LIFECYCLE_DATA } from '@/data/himer';
import { cn } from '@/lib/utils';
import type { LifecycleTab } from '@/types/himer';

import { HimerVideo } from './himer-video';
import { MetricBar } from './metric-bar';
import { clampProgress, useReducedMotion, useScrollProgress } from './use-scroll-progress';

function LifecycleStage({
  tab,
  progress,
  pinned,
  active,
}: {
  tab: LifecycleTab;
  progress: number;
  pinned: boolean;
  active: boolean;
}) {
  const { ref, progress: entryProgress } = useScrollProgress<HTMLUListElement>('focus');
  const value = pinned ? progress : entryProgress;
  const bulletProgress = value * (tab.bullets.length - 1);
  return (
    <div
      id={`himer-${tab.id}`}
      data-lifecycle-stage={tab.id}
      aria-hidden={pinned && !active ? true : undefined}
      className={cn(
        'himer-lifecycle-stage grid min-w-0 grid-cols-1 items-center gap-5 lg:grid-cols-[minmax(0,513fr)_minmax(0,787fr)] lg:gap-5',
        pinned && 'col-start-1 row-start-1',
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
        <ul ref={ref} className="himer-bullets relative mt-6 max-md:order-5 max-md:mt-0 lg:mt-8">
          {tab.bullets.map((bullet, index) => (
            <li
              key={bullet}
              className="group relative pb-[18px] pl-3.5 text-sm leading-5 last:pb-0 md:pb-5 md:text-base"
            >
              <span
                aria-hidden="true"
                className="bg-aqua-mint/25 absolute top-[9px] bottom-[-9px] left-px w-px group-last:hidden"
              />
              <span
                aria-hidden="true"
                className="bg-aqua-mint absolute top-[9px] bottom-[-9px] left-px w-px origin-top shadow-[0_0_8px_#63ccb7] group-last:hidden"
                style={{ transform: `scaleY(${clampProgress(bulletProgress - index)})` }}
              />
              <span
                aria-hidden="true"
                className="absolute top-[9px] bottom-[-9px] left-px w-px group-last:hidden"
              >
                <span
                  className="bg-aqua-mint absolute -left-[2px] size-[5px] -translate-y-1/2 rounded-full shadow-[0_0_10px_3px_#63ccb780]"
                  style={{
                    top: `${clampProgress(bulletProgress - index) * 100}%`,
                    opacity: bulletProgress >= index && bulletProgress < index + 1 ? 1 : 0,
                  }}
                />
              </span>
              <span
                aria-hidden="true"
                className="bg-light-gray absolute top-[7px] -left-px size-[5px] rounded-full"
                style={{
                  backgroundColor: bulletProgress >= index ? 'var(--color-aqua-mint)' : undefined,
                  boxShadow:
                    Math.abs(bulletProgress - index) < 0.55 ? '0 0 10px 3px #63ccb780' : undefined,
                }}
              />
              <span
                className="type-body-xxs text-light-gray max-md:text-sm max-md:leading-5"
                style={{ opacity: 0.6 + 0.4 * clampProgress(bulletProgress - index + 1) }}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="mt-8 hidden h-[3px] overflow-hidden rounded-full bg-white/20 md:block lg:mt-10"
        >
          <div
            className="bg-aqua-mint h-full origin-left rounded-full"
            style={{ transform: `scaleX(${value})` }}
          />
        </div>
      </div>
      <HimerVideo
        active={!pinned || active}
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
    <div className="from-electric-blue relative bg-gradient-to-r to-black py-10 text-white lg:py-[60px]">
      <div className="layout-container flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 lg:max-w-[740px]">
          <h3 className="type-h3 max-md:text-2xl max-md:leading-8">
            {HIMER_LIFECYCLE_DATA.proof.headline}
          </h3>
          <p className="type-body-xxs text-light-gray mt-5 max-md:text-sm max-md:leading-5">
            {HIMER_LIFECYCLE_DATA.proof.subtext}
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-5">
          {HIMER_LIFECYCLE_DATA.proof.cards.map((card, index) => (
            <div
              key={card.label}
              data-metric-card
              className="flex min-h-[96px] flex-col justify-between rounded-2xl border border-white/10 bg-white/10 p-3 md:min-h-[132px] md:w-[228px] md:p-5"
            >
              <p className="type-h5 max-md:text-xl max-md:leading-7">{card.value}</p>
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
  );
}

export const HimerPlatformLifecycleSection = () => {
  const { ref, progress } = useScrollProgress<HTMLDivElement>('travel');
  const sceneRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const reducedMotion = useReducedMotion();
  const pinned = desktop && !reducedMotion;
  const stagePosition = Math.min(
    progress * HIMER_LIFECYCLE_DATA.tabs.length,
    HIMER_LIFECYCLE_DATA.tabs.length - Number.EPSILON * 4,
  );
  const activeStage = Math.min(2, Math.floor(stagePosition));

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const spacing = window.innerHeight <= 800 ? 72 : 120;
      sceneRef.current?.style.setProperty(
        '--lifecycle-stage-height',
        `${Math.max(200, window.innerHeight - headerHeight - spacing)}px`,
      );
      setDesktop(window.innerWidth >= 1024);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    if (headerRef.current) observer.observe(headerRef.current);
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
      <div
        ref={ref}
        className="from-electric-blue relative bg-gradient-to-r to-black"
        style={pinned ? { height: '400svh' } : undefined}
      >
        <div
          className={cn(
            'rounded-bl-[30px] bg-black py-10 lg:rounded-bl-[60px]',
            pinned && 'himer-lifecycle-scene sticky top-0 flex h-svh overflow-y-auto',
          )}
        >
          <div ref={sceneRef} className="layout-container min-w-0">
            <div ref={headerRef} className="himer-lifecycle-header mb-5 lg:mb-10">
              <h2 className="type-h2 max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
                {HIMER_LIFECYCLE_DATA.headline}
              </h2>
              <p className="type-body-xxs text-light-gray mt-5 max-md:text-sm max-md:leading-5">
                {HIMER_LIFECYCLE_DATA.subtext}
              </p>
            </div>
            <div className={cn('grid gap-y-[60px]', pinned && 'gap-y-0')}>
              {HIMER_LIFECYCLE_DATA.tabs.map((tab, index) => (
                <LifecycleStage
                  key={tab.id}
                  tab={tab}
                  pinned={pinned}
                  active={index === activeStage}
                  progress={clampProgress(stagePosition - index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ProductionProof />
    </section>
  );
};

export default HimerPlatformLifecycleSection;
