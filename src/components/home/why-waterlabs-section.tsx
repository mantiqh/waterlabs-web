'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

export interface WhyWaterlabsCard {
  id: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
}

const DEFAULT_CARDS: WhyWaterlabsCard[] = [
  {
    id: 'card-1',
    title: 'One AI partner across the entire cycle',
    description:
      'Most vendors automate one function and hand the rest back. Waterlabs runs the whole cycle on one system, live across 16 functional areas, 27 specialties and 16 PM systems. Nothing falls into the gaps, because there are no handoffs.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_One AI partner across the entire cycle.png',
    mobileImage:
      '/images/home/why-waterlabs-is-different/mobile/img_One AI partner across the entire cycle (1).png',
  },
  {
    id: 'card-2',
    title: 'A patented operating system, not a GenAI wrapper',
    description:
      "Waterlabs is built on HIMER, our own agentic operating system, with patented products already in production. You are buying infrastructure we own and keep building on, not a layer sitting on someone else's model.",
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_A patented operating system, not a GenAI wrapper.png',
    mobileImage:
      '/images/home/why-waterlabs-is-different/mobile/img_A patented operating system, not a GenAI wrapper (1).png',
  },
  {
    id: 'card-3',
    title: '100+ agents in production, deployed in two weeks',
    description:
      'Custom agents are built and deployed through the OS in about two weeks, and more than 100 are already working inside client environments. This is not a pilot or a proof of concept. It is live automation, running at scale, today.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_100+ agents in production, deployed in two weeks.png',
    mobileImage:
      '/images/home/why-waterlabs-is-different/mobile/img_100+ agents in production, deployed in two weeks (1).png',
  },
  {
    id: 'card-4',
    title: 'Six years of RCM knowledge, pre-loaded',
    description:
      'Waterlabs is built by RCM and technology people who have spent years inside the problem. Payer policies, billing rules, and specialty nuance are in the system before deployment, which is why an agent is productive from its first day rather than its hundredth.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_Six years of RCM knowledge, pre-loaded.png',
    mobileImage:
      '/images/home/why-waterlabs-is-different/mobile/img_Six years of RCM knowledge, pre-loaded (1).png',
  },
  {
    id: 'card-5',
    title: 'A sovereign cloud, wired to 4,000+ payers',
    description:
      'Our infrastructure is vertically integrated and owned end to end, on our own sovereign cloud, with connectivity to more than 4,000 payers. Data safety here is structural, not a promise you have to take on trust.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_A sovereign cloud, wired to 4,000+ payer.png',
    mobileImage:
      '/images/home/why-waterlabs-is-different/mobile/img_A sovereign cloud, wired to 4,000+ payer (1).png',
  },
  {
    id: 'card-6',
    title: 'Proven results, priced on outcomes',
    description:
      'Clients see 30 to 70% savings in cost to collect, with higher and faster cash collections. You pay only on successful deployment. No proof of concept, no experimentation, pricing tied to what we actually deliver.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_Proven results, priced on outcomes.png',
    mobileImage:
      '/images/home/why-waterlabs-is-different/mobile/One AI partner across the entire cycle.png',
  },
];

export interface WhyWaterlabsSectionProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  cards?: WhyWaterlabsCard[];
}

export const WhyWaterlabsSection = ({
  eyebrow = 'Why Waterlabs is different',
  headingLine1 = 'The things no other RCM',
  headingLine2 = 'partner can say at once',
  cards = DEFAULT_CARDS,
}: WhyWaterlabsSectionProps) => {
  // Mobile / Tablet Snap-Scroll State
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Desktop Seamless Infinite Loop Carousel State
  const SETS = 3;
  const displayCards = useMemo(
    () =>
      Array.from({ length: SETS }).flatMap((_, setIdx) =>
        cards.map((c, cIdx) => ({
          ...c,
          uniqueKey: `set-${setIdx}-card-${c.id || cIdx}`,
        })),
      ),
    [cards],
  );

  // Initial visit/refresh starts at index 0 (matching Figma and user reference with no cards on left)
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // When transition is disabled to silently normalize the index, re-enable it on the next paint
  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  const desktopRealIndex = ((desktopIndex % cards.length) + cards.length) % cards.length;

  const handlePrev = () => {
    const N = cards.length;
    if (N === 0) return;

    if (desktopIndex === 0) {
      // Smoothly loop backwards: silently jump to middle set clone of card 0 (index N), then animate to N - 1
      setIsTransitioning(false);
      setDesktopIndex(N);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setDesktopIndex(N - 1);
        });
      });
      return;
    }

    setIsTransitioning(true);
    setDesktopIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setDesktopIndex((prev) => prev + 1);
  };

  const handleDotClick = (targetRealIndex: number) => {
    const N = cards.length;
    if (N === 0) return;
    const currentReal = ((desktopIndex % N) + N) % N;
    let diff = targetRealIndex - currentReal;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;

    if (desktopIndex + diff < 0) {
      setIsTransitioning(false);
      const normalizedCurrent = desktopIndex + N;
      setDesktopIndex(normalizedCurrent);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setDesktopIndex(normalizedCurrent + diff);
        });
      });
      return;
    }

    setIsTransitioning(true);
    setDesktopIndex((prev) => prev + diff);
  };

  const handleCardClick = (idx: number) => {
    if (idx === desktopIndex) return;
    setIsTransitioning(true);
    setDesktopIndex(idx);
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

    const N = cards.length;
    if (N === 0) return;

    // Keep active card within valid clone range without jumping when advancing from set 0
    if (desktopIndex >= 2 * N) {
      setIsTransitioning(false);
      setDesktopIndex((prev) => prev - N);
    } else if (desktopIndex < 0) {
      setIsTransitioning(false);
      setDesktopIndex((prev) => prev + N);
    }
  };

  const handleMobileScroll = () => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const containerPaddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const scrollLeft = container.scrollLeft;
    const cardElements = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    cardElements.forEach((el, index) => {
      const targetOffset = el.offsetLeft - container.offsetLeft - containerPaddingLeft;
      const distance = Math.abs(targetOffset - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    // On md: breakpoint (768px - 1023px), clamp to 4 so last visible dot (5th) is active
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024) {
      closestIndex = Math.min(closestIndex, cards.length - 2);
    }

    setMobileIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    setMobileIndex(index);
    const container = mobileScrollRef.current;
    if (!container) return;
    const cardElements = Array.from(container.children) as HTMLElement[];
    if (cardElements[index]) {
      const containerPaddingLeft = parseFloat(getComputedStyle(container).paddingLeft) || 0;
      container.scrollTo({
        left: cardElements[index].offsetLeft - container.offsetLeft - containerPaddingLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-t from-[#000000] via-[#000000]/60 to-[#F4F6F9]">
      {/* 
        Curved Container:
        Desktop: border-radius 60px 0px 0px 60px, padding 80px 60px
        Mobile: border-radius 30px 0px 0px 30px, padding 40px 20px
        Background: #FFFFFF with decorative vector background image
      */}
      <div className="relative w-full overflow-hidden rounded-tl-[30px] rounded-bl-[30px] bg-white px-[20px] py-[40px] md:px-[40px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:py-[80px]">
        {/* Desktop-only decorative vector watermark lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden bg-cover bg-left lg:block"
          style={{
            backgroundImage:
              "url('/images/home/why-waterlabs-is-different/desktop/bg_the_things_no_other_rcm_partner_can_say.png')",
          }}
        />
        {/* Inner Content: Aligned to right on desktop (982px content area) */}
        <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col lg:items-end">
          <div className="flex w-full max-w-[982px] flex-col gap-[32px] lg:gap-[40px]">
            {/* Header: Tag + Two-line Heading */}
            <div className="flex max-w-[573px] flex-col items-start gap-[12px] lg:gap-[20px]">
              {/* Tag / Eyebrow */}
              <div className="inline-flex h-[20px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
                <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">{eyebrow}</span>
              </div>

              {/* Title: Line 1 in #0F68D6, Line 2 in #111111 */}
              <h2 className="type-h2 tracking-[-0.01em]">
                <span className="block text-[#0F68D6]">{headingLine1}</span>
                <span className="block text-[#111111]">{headingLine2}</span>
              </h2>
            </div>

            {/* =========================================================
                DESKTOP VIEW (>= 1024px) - Seamless Infinite Looping Carousel
               ========================================================= */}
            <div className="hidden flex-col gap-[40px] lg:flex">
              {/* Card Slider Track Area */}
              <div className="relative min-h-[464px] w-full overflow-visible">
                <div
                  onTransitionEnd={handleTransitionEnd}
                  className="flex items-start gap-[21.14px]"
                  style={{
                    transform: `translateX(-${desktopIndex * 539.14}px)`,
                    transition: isTransitioning ? 'transform 500ms ease-out' : 'none',
                  }}
                >
                  {displayCards.map((card, idx) => {
                    const isActive = idx === desktopIndex;
                    return (
                      <div
                        key={card.uniqueKey}
                        onClick={() => handleCardClick(idx)}
                        className={`flex shrink-0 cursor-pointer flex-col transition-all duration-500 ${
                          isActive
                            ? 'pointer-events-auto w-[588px] gap-[20px] opacity-100'
                            : 'w-[518px] gap-[21.14px] opacity-25 hover:opacity-50'
                        }`}
                      >
                        {/* Card Image */}
                        <div
                          className={`relative overflow-hidden rounded-[20px_10px_20px_20px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ${
                            isActive ? 'h-[304px] w-[588px]' : 'h-[211.43px] w-[518px]'
                          }`}
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes={isActive ? '588px' : '518px'}
                            className="object-cover"
                          />
                        </div>

                        {/* Card Content: Title & Description */}
                        <div
                          className={`flex flex-col transition-all duration-500 ${
                            isActive
                              ? 'min-h-[140px] max-w-[588px] gap-[12px]'
                              : 'min-h-[140px] max-w-[518px] gap-[10.57px]'
                          }`}
                        >
                          <h3
                            className={`type-h6 tracking-[-0.01em] transition-colors duration-500 ${
                              isActive ? 'text-[#0F68D6]' : 'text-[#042849]'
                            }`}
                          >
                            {card.title}
                          </h3>
                          <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Carousel Controls: Width 927px with justify-between */}
              <div className="flex w-full max-w-[927px] items-center justify-between pt-[8px]">
                {/* Pagination Pill Indicators */}
                <div className="flex items-center gap-[5px]">
                  {cards.map((card, i) => {
                    const isActive = desktopRealIndex === i;
                    const isAdjacent =
                      Math.abs(desktopRealIndex - i) === 1 ||
                      Math.abs(desktopRealIndex - i) === cards.length - 1;
                    let widthClass =
                      'w-[6px] bg-[rgba(15,104,214,0.2)] hover:bg-[rgba(15,104,214,0.4)]';
                    if (isActive) {
                      widthClass = 'w-[32px] bg-[#0F68D6]';
                    } else if (isAdjacent) {
                      widthClass =
                        'w-[16px] bg-[rgba(15,104,214,0.2)] hover:bg-[rgba(15,104,214,0.4)]';
                    }
                    return (
                      <button
                        key={`dot-${card.id}`}
                        type="button"
                        onClick={() => handleDotClick(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-[6px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${widthClass}`}
                      />
                    );
                  })}
                </div>

                {/* Left/Right Arrow Navigation Buttons - Continuous Loop (Never disabled) */}
                <div className="flex items-center gap-[14px]">
                  {/* Previous Arrow Button */}
                  <CTA
                    variant="light-arrow"
                    onClick={handlePrev}
                    aria-label="Previous card"
                    className="h-[48px] w-[48px] rotate-180 cursor-pointer transition-all duration-300"
                  />

                  {/* Next Arrow Button */}
                  <CTA
                    variant="light-arrow"
                    onClick={handleNext}
                    aria-label="Next card"
                    className="h-[48px] w-[48px] cursor-pointer transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================
                MOBILE / TABLET VIEW (< 1024px) - Horizontal Snap Scroll
               ========================================================= */}
            <div className="flex flex-col gap-[20px] lg:hidden">
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="no-scrollbar -mx-[20px] flex w-[calc(100%+40px)] snap-x snap-mandatory scroll-pl-[20px] gap-[12px] overflow-x-auto px-[20px] pb-[8px] sm:gap-[20px] md:-mx-[40px] md:w-[calc(100%+80px)] md:scroll-pl-[40px] md:px-[40px]"
              >
                {cards.map((card) => (
                  <div
                    key={`mobile-${card.id}`}
                    className="flex w-[calc(100vw-54px)] max-w-[340px] shrink-0 snap-start flex-col gap-[16px] sm:w-[330px]"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[330/265.6] w-full overflow-hidden rounded-[20px_10px_20px_20px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <Image
                        src={card.mobileImage || card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 330px, 400px"
                        className={`object-cover ${
                          card.id === 'card-6' ? 'object-[75%_center]' : 'object-center'
                        }`}
                      />
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col gap-[8px]">
                      <h3 className="type-h6 tracking-[-0.01em] text-[#0F68D6]">{card.title}</h3>
                      <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Trailing space so the last card has padding when scrolled to end */}
                <div className="pointer-events-none w-[4px] shrink-0" aria-hidden="true" />
              </div>

              {/* Mobile Carousel Indicators */}
              <div className="flex items-center gap-[5px] pt-[4px]">
                {cards.map((card, i) => {
                  const isHiddenOnMd = i === cards.length - 1;
                  const isActive = mobileIndex === i;
                  const isAdjacent = Math.abs(mobileIndex - i) === 1;
                  let widthClass = 'w-[6px] bg-[rgba(15,104,214,0.2)]';
                  if (isActive) {
                    widthClass = 'w-[32px] bg-[#0F68D6]';
                  } else if (isAdjacent) {
                    widthClass = 'w-[16px] bg-[rgba(15,104,214,0.2)]';
                  }
                  return (
                    <button
                      key={`mobile-dot-${card.id}`}
                      type="button"
                      onClick={() => scrollToCard(i)}
                      aria-label={`Go to card ${i + 1}`}
                      className={`h-[5px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${widthClass} ${
                        isHiddenOnMd ? 'md:hidden' : ''
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWaterlabsSection;
