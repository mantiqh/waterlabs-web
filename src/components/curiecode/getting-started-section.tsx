'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import { CTA } from '@/components/CTA';
import { CURIECODE_PAGE_DATA } from '@/data/curiecode';

import { ProductVideo } from './product-video';
import { SectionLabel } from './section-label';

const data = CURIECODE_PAGE_DATA.gettingStarted;
const { steps, beats } = data;
const TABLET_MEDIA_QUERY = '(min-width: 720px)';

export default function GettingStartedSection() {
  const [active, setActive] = useState(0);
  const [seekTo, setSeekTo] = useState<{ seconds: number }>();
  const [isAccordion, setIsAccordion] = useState(false);
  const [lockedStackHeight, setLockedStackHeight] = useState<number>();
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stack = cardsRef.current;
    if (!stack) return;

    const media = window.matchMedia(TABLET_MEDIA_QUERY);
    let frame = 0;

    const measure = () => {
      frame = 0;
      const accordionActive = media.matches;
      setIsAccordion(accordionActive);
      if (!accordionActive) {
        setLockedStackHeight(undefined);
        return;
      }

      const cards = Array.from(stack.querySelectorAll<HTMLElement>('[data-getting-started-card]'));
      if (!cards.length) return;

      const rowGap = parseFloat(getComputedStyle(stack).rowGap || '0');
      let collapsedTotal = rowGap * (cards.length - 1);
      let maxOpenPanel = 0;

      for (const card of cards) {
        const style = getComputedStyle(card);
        const cardPad = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        const heading = card.querySelector('h3');
        const paragraph = card.querySelector<HTMLElement>('[data-step-panel] p');
        collapsedTotal += cardPad + (heading?.getBoundingClientRect().height ?? 0);
        if (paragraph) {
          const pStyle = getComputedStyle(paragraph);
          maxOpenPanel = Math.max(
            maxOpenPanel,
            parseFloat(pStyle.marginTop) + paragraph.getBoundingClientRect().height,
          );
        }
      }

      setLockedStackHeight(Math.ceil(collapsedTotal + maxOpenPanel));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(stack);
    media.addEventListener('change', schedule);
    window.addEventListener('resize', schedule);
    void document.fonts.ready.then(schedule);
    measure();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener('change', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section className="section-deferred relative overflow-hidden rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] bg-white py-10 lg:rounded-tl-[60px] lg:rounded-tr-[60px] lg:rounded-bl-[60px] lg:py-20">
      <Image
        src={data.backgroundImage}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none hidden object-cover object-right-bottom md:block"
      />
      <div className="layout-container relative">
        <SectionLabel>{data.eyebrow}</SectionLabel>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <h2 className="type-h2 tracking-[-0.01em] max-md:text-[32px] max-md:leading-10">
            {data.titleLines[0]} <br />
            <span className="text-electric-blue">{data.titleLines[1]}</span>
          </h2>
          <div>
            <p className="type-body-xs max-w-[430px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
              {data.description}
            </p>
            <Link href={data.cta.href} className="mt-5 inline-block">
              <CTA variant="light-bg" as="span" size="compact-mobile">
                {data.cta.label}
              </CTA>
            </Link>
          </div>
        </div>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,548fr)_minmax(0,732fr)] lg:gap-10">
          <div
            ref={cardsRef}
            className="flex flex-col gap-5"
            style={
              isAccordion && lockedStackHeight ? { height: `${lockedStackHeight}px` } : undefined
            }
          >
            {steps.map((step, index) => (
              <div
                key={step.title}
                data-getting-started-card
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'touch') setActive(index);
                }}
                className="bg-ghost-white rounded-[20px_10px_20px_20px] p-5"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isAccordion ? active === index : undefined}
                    aria-controls={`getting-started-${index}`}
                    onFocus={() => setActive(index)}
                    onClick={() => {
                      setActive(index);
                      setSeekTo({ seconds: beats[index] });
                    }}
                    className={`type-body-xxs focus-visible:outline-electric-blue max-md:text-electric-blue w-full cursor-pointer text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none ${active === index ? 'text-electric-blue' : 'text-black'}`}
                  >
                    {step.title}
                  </button>
                </h3>
                <div
                  id={`getting-started-${index}`}
                  data-step-panel
                  className={`grid transition-[grid-template-rows,opacity,visibility] ease-out motion-reduce:transition-none max-md:grid-rows-[1fr] max-md:opacity-100 ${active === index ? 'md:visible md:grid-rows-[1fr] md:opacity-100 md:delay-50 md:duration-200' : 'md:invisible md:grid-rows-[0fr] md:opacity-0 md:duration-200'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="type-body-xxs text-charcoal mt-4 max-w-[420px] tracking-[0.01em] max-md:text-sm max-md:leading-5">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ProductVideo
            id="getting-started"
            label="From sample charts to autonomous coding"
            seekTo={seekTo}
          />
        </div>
        <p className="type-caption text-charcoal mt-10 max-w-[548px] leading-5">
          {data.disclaimer}
        </p>
      </div>
    </section>
  );
}
