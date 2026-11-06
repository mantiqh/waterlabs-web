'use client';

import { memo, useEffect, useRef, useState } from 'react';

import { ConnectedTimeline } from '@/components/ui/connected-timeline';
import { CURIECODE_PAGE_DATA } from '@/data/curiecode';
import {
  clampProgress,
  useReducedMotion,
  useScrollProgress,
} from '@/lib/hooks/use-scroll-progress';
import { cn } from '@/lib/utils';

import { ProductVideo } from './product-video';
import { SectionLabel } from './section-label';

const data = CURIECODE_PAGE_DATA.workflow;
const steps = data.steps;
const stepTimelineItems = steps.map((s) => s.details.map((label) => ({ label })));

const WorkflowStage = memo(function WorkflowStage({
  step,
  index,
  pinned,
  active,
  preloadNext,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  pinned: boolean;
  active: boolean;
  preloadNext?: boolean;
  progress: number;
}) {
  const { ref, progress: entryProgress } = useScrollProgress<HTMLUListElement>('focus', !pinned);
  const reduced = useReducedMotion();
  const value = reduced ? 1 : pinned ? progress : entryProgress;
  return (
    <article
      data-workflow-stage={index + 1}
      aria-hidden={pinned && !active ? true : undefined}
      className={cn(
        'grid min-w-0 items-center gap-5 lg:grid-cols-[minmax(0,512fr)_minmax(0,788fr)]',
        pinned && 'col-start-1 row-start-1',
        pinned && !active && 'invisible',
      )}
    >
      <div className="curiecode-workflow-copy contents lg:block">
        <div className="order-1">
          <SectionLabel dark>{`Step 0${index + 1}`}</SectionLabel>
          <h3 className="type-h6 text-aqua-mint mt-5 tracking-[-0.01em] lg:mt-10">{step.title}</h3>
          <p className="type-body-xxs text-light-gray mt-3 tracking-[0.01em] max-md:text-sm max-md:leading-5 lg:mt-4">
            {step.description}
          </p>
        </div>
        <ConnectedTimeline
          inactiveLabelColor="medium-gray"
          listRef={ref}
          items={stepTimelineItems[index]}
          progress={value}
          className="order-3 lg:mt-8"
        />
        <div
          aria-hidden="true"
          className="bg-charcoal order-4 h-px overflow-hidden lg:mt-10 lg:h-[3px] lg:rounded-full lg:bg-white/20"
        >
          <div
            data-workflow-progress
            className="bg-aqua-mint hidden h-full origin-left rounded-full lg:block"
            style={{ transform: `scaleX(${(index + value) / steps.length})` }}
          />
        </div>
      </div>
      <div className="order-2 lg:flex lg:justify-end">
        <ProductVideo
          id={step.media}
          label={step.title}
          active={!pinned || active}
          preloadInactive={preloadNext}
          className="curiecode-workflow-media"
        />
      </div>
    </article>
  );
});

export default function WorkflowSection() {
  const [canPin, setCanPin] = useState(false);
  const { ref, progress } = useScrollProgress<HTMLElement>('travel', canPin);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pinned = canPin && !reduced;
  const position = Math.min(progress * steps.length, steps.length - 0.0001);
  const active = Math.floor(position);

  useEffect(() => {
    const measure = () => {
      const content = contentRef.current;
      const header = headerRef.current;
      if (!content || !header) return;
      const scene = content.parentElement;
      const style = scene ? getComputedStyle(scene) : undefined;
      const headerStyle = getComputedStyle(header);
      const spacing =
        header.getBoundingClientRect().height +
        parseFloat(headerStyle.marginBottom) +
        parseFloat(style?.paddingTop || '0') +
        parseFloat(style?.paddingBottom || '0');
      content.style.setProperty(
        '--workflow-stage-height',
        `${Math.max(200, innerHeight - spacing)}px`,
      );
      const copyHeight = Math.max(
        0,
        ...Array.from(
          content.querySelectorAll<HTMLElement>('.curiecode-workflow-copy'),
          (copy) => copy.getBoundingClientRect().height,
        ),
      );
      const required = copyHeight + spacing;
      setCanPin(innerWidth >= 1024 && required <= innerHeight);
    };
    const observer = new ResizeObserver(measure);
    if (contentRef.current) observer.observe(contentRef.current);
    window.addEventListener('resize', measure);
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section
      ref={ref}
      data-workflow-mode={pinned ? 'scroll' : 'stack'}
      className="relative bg-black"
      style={pinned ? { height: '220svh' } : undefined}
    >
      <div
        className={cn(
          'bg-linear-to-b from-black from-50% to-white to-50%',
          pinned && 'sticky top-0',
        )}
      >
        <div
          className={cn(
            'curiecode-workflow-scene rounded-tl-[30px] rounded-bl-[30px] bg-black py-10 text-white lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:py-20',
            pinned && 'flex h-svh items-center',
          )}
        >
          <div ref={contentRef} className="layout-container min-w-0">
            <div ref={headerRef} className="curiecode-workflow-header mb-10">
              <SectionLabel dark>{data.eyebrow}</SectionLabel>
              <h2 className="type-h2 mt-5 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10">
                {data.title}
              </h2>
              <p className="type-body-xxs text-light-gray mt-5 tracking-[0.01em] max-md:text-sm max-md:leading-5">
                {data.description}
              </p>
            </div>
            <div className={cn('grid gap-y-10', pinned && 'gap-y-0')}>
              {steps.map((step, index) => (
                <WorkflowStage
                  key={step.media}
                  step={step}
                  index={index}
                  pinned={pinned}
                  active={index === active}
                  preloadNext={pinned && index === active + 1}
                  progress={clampProgress(position - index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
