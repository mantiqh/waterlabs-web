'use client';

import Link from 'next/link';
import { useRef, useState, useSyncExternalStore } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';
import { CarouselIndicators } from '@/components/ui/carousel-indicators';
import { HIMER_CLAIM_JOURNEY_DATA } from '@/data/himer';

import { HimerVideo } from './himer-video';
import { useReducedMotion } from './use-scroll-progress';

const subscribeViewport = (notify: () => void) => {
  const query = window.matchMedia('(min-width: 720px)');
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};

export const HimerClaimJourneySection = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const paired = useSyncExternalStore(
    subscribeViewport,
    () => window.matchMedia('(min-width: 720px)').matches,
    () => false,
  );
  const cards = HIMER_CLAIM_JOURNEY_DATA.carouselCards;
  const perPage = paired ? 2 : 1;
  const totalSlides = Math.ceil(cards.length / perPage);
  const currentSlide = Math.min(totalSlides - 1, Math.floor(currentCard / perPage));
  const selectSlide = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index * perPage] as HTMLElement | undefined;
    if (track && card)
      track.scrollTo({
        left: card.offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft,
        behavior: reducedMotion ? 'instant' : 'smooth',
      });
  };
  const nextSlide = () => selectSlide((currentSlide + 1) % totalSlides);
  const prevSlide = () => selectSlide((currentSlide - 1 + totalSlides) % totalSlides);

  return (
    <section className="bg-ghost-white relative w-full text-black">
      {/*
        Signature Waterlabs Curved Container (Figma: Frame 2147227449 8301:11589 / top frame - color 8301:11590):
        - Desktop: rounded-tr-[60px] rounded-br-[60px], py-[80px]
        - Mobile: rounded-tr-[30px] rounded-br-[30px], py-[40px]
        - Background: bg-white (#FFFFFF)
      */}
      <div className="himer-surface relative z-10 w-full rounded-tr-[30px] rounded-br-[30px] bg-white py-16 md:py-20 lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:py-20">
        <div className="layout-container">
          {/* Header Row (Figma 8301:11594: Top-aligned items-start so headline and subtext share the exact same top level) */}
          <div className="mb-5 flex flex-col justify-between gap-5 md:mb-16 md:gap-6 lg:mb-16 lg:flex-row lg:items-start lg:gap-5">
            <div className="min-w-0 lg:w-1/2">
              <h2 className="type-h2 tracking-tight text-black max-md:text-[32px] max-md:leading-10 max-md:tracking-[-0.01em]">
                <span className="text-electric-blue">Every function of the</span>
                <br />
                <span>revenue cycle, on one system.</span>
              </h2>
            </div>
            <div className="min-w-0 lg:w-1/2">
              <p className="type-body-xxs text-charcoal max-md:text-sm max-md:leading-5">
                {HIMER_CLAIM_JOURNEY_DATA.subtext}
              </p>
            </div>
          </div>

          {/* Claim Journey Video / Animation Container */}
          <div className="mb-5 w-full overflow-hidden rounded-[20px] md:mb-12 md:rounded-[28px]">
            <HimerVideo
              desktopSrc={HIMER_CLAIM_JOURNEY_DATA.desktopVideo}
              mobileSrc={HIMER_CLAIM_JOURNEY_DATA.mobileVideo}
              aspectRatio={HIMER_CLAIM_JOURNEY_DATA.aspectRatio}
              mobileAspectRatio="362 / 376"
              containerClassName="rounded-[16px] md:rounded-[24px]"
            />
          </div>

          {/* Stage Cards Carousel */}
          <div className="relative">
            <div
              ref={trackRef}
              role="region"
              aria-label="Revenue cycle capabilities"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                const page =
                  event.key === 'ArrowRight'
                    ? Math.min(totalSlides - 1, currentSlide + 1)
                    : event.key === 'ArrowLeft'
                      ? Math.max(0, currentSlide - 1)
                      : event.key === 'Home'
                        ? 0
                        : event.key === 'End'
                          ? totalSlides - 1
                          : undefined;
                if (page === undefined) return;
                event.preventDefault();
                selectSlide(page);
              }}
              onScroll={() => {
                const track = trackRef.current;
                if (!track || track.children.length < 2) return;
                const first = track.children[0] as HTMLElement;
                const second = track.children[1] as HTMLElement;
                setCurrentCard(
                  Math.round(track.scrollLeft / (second.offsetLeft - first.offsetLeft)),
                );
              }}
              className="no-scrollbar focus-visible:outline-electric-blue relative flex w-[calc(100%+20px)] snap-x snap-mandatory items-center gap-5 overflow-x-auto overscroll-x-contain after:block after:w-8 after:shrink-0 after:content-[''] focus-visible:outline-2 md:w-full md:items-stretch md:after:hidden"
            >
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="bg-sky-blue/10 flex w-[calc(100%-52px)] shrink-0 snap-start flex-col rounded-[20px] p-5 md:w-[calc((100%-20px)/2)] md:p-8"
                >
                  <h3 className="type-h6 text-electric-blue mb-3 truncate leading-7 md:whitespace-normal">
                    {card.title}
                  </h3>
                  <div className="grid grid-cols-[minmax(0,1fr)_34px] items-end gap-3 md:grid-cols-[minmax(0,1fr)_48px]">
                    <p className="type-body-xxs text-charcoal max-md:text-sm max-md:leading-5">
                      {card.description}
                    </p>
                    {card.href && (
                      <Link
                        href={card.href}
                        aria-label={`Learn more about ${card.title}`}
                        className="shrink-0"
                      >
                        <CTA variant="fill-arrow" as="span" className="himer-carousel-arrow" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="mt-5 flex items-center justify-between">
              {/* Indicator dots / bars */}
              <CarouselIndicators
                current={currentSlide}
                total={totalSlides}
                onSelect={selectSlide}
                label="Capability slides"
                getItemLabel={(index) => `Go to slide ${index + 1}`}
              />

              {/* Prev / Next buttons */}
              <div className="hidden items-center gap-[14px] md:flex">
                {/* Left Button */}
                <button
                  type="button"
                  onClick={prevSlide}
                  className="border-electric-blue hover:bg-electric-blue group focus-visible:outline-electric-blue flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4"
                  aria-label="Previous card"
                >
                  <span className="text-sky-blue rotate-180 transition-colors duration-300 group-hover:text-white">
                    <ChevronRight />
                  </span>
                </button>

                {/* Right Button */}
                <button
                  type="button"
                  onClick={nextSlide}
                  className="bg-electric-blue hover:bg-electric-blue/90 group focus-visible:outline-electric-blue flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4"
                  aria-label="Next card"
                >
                  <span className="text-sky-blue transition-colors duration-300 group-hover:text-white">
                    <ChevronRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HimerClaimJourneySection;
