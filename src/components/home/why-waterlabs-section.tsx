'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

export interface WhyWaterlabsCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const DEFAULT_CARDS: WhyWaterlabsCard[] = [
  {
    id: 'card-1',
    title: 'One AI partner across the entire cycle',
    description:
      'Most vendors automate one function and hand the rest back. Waterlabs runs the whole cycle on one system, live across 16 functional areas, 27 specialties and 16 PM systems. Nothing falls into the gaps, because there are no handoffs.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_One AI partner across the entire cycle.png',
  },
  {
    id: 'card-2',
    title: 'A patented operating system, not a GenAI wrapper',
    description:
      'Waterlabs is built on HIMER, our own agentic operating system, with patented products already in production. You are buying infrastructure we own and keep building on, not a layer sitting on someone else\'s model.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_A patented operating system, not a GenAI wrapper.png',
  },
  {
    id: 'card-3',
    title: '100+ agents in production, deployed in two weeks',
    description:
      'Custom agents are built and deployed through the OS in about two weeks, and more than 100 are already working inside client environments. Live automation, running at scale, today.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_100+ agents in production, deployed in two weeks.png',
  },
  {
    id: 'card-4',
    title: 'Six years of RCM knowledge, pre-loaded',
    description:
      'Waterlabs is built by RCM technology experts who have spent six years engineering deep healthcare billing domain intelligence into every agent. They hit production understanding your workflows, not training on your time.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_Six years of RCM knowledge, pre-loaded.png',
  },
  {
    id: 'card-5',
    title: 'A sovereign cloud, wired to 4,000+ payers',
    description:
      'Our infrastructure is vertically integrated, owned end-to-end, and directly integrated with more than 4,000 commercial and government payers. Your data never touches a public multi-tenant model or third-party cloud layer.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_A sovereign cloud, wired to 4,000+ payer.png',
  },
  {
    id: 'card-6',
    title: 'Proven results, priced on outcomes',
    description:
      'Clients see 30% to 70% savings in cost-to-collect with performance-aligned pricing that charges only on completed outcomes. You pay only for results delivered, not for software access or promises.',
    image:
      '/images/home/why-waterlabs-is-different/desktop/img_Proven results, priced on outcomes.png',
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === cards.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
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

    setCurrentIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
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
    <section className="relative w-full bg-gradient-to-t from-[#000000] via-[#000000]/60 to-[#F4F6F9] overflow-hidden">
      {/* 
        Curved Container:
        Desktop: border-radius 60px 0px 0px 60px, padding 80px 60px
        Mobile: border-radius 30px 0px 0px 30px, padding 40px 20px
        Background: #FFFFFF with decorative vector background image
      */}
      <div
        className="w-full bg-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:px-[60px] relative overflow-hidden bg-cover bg-left"
        style={{
          backgroundImage:
            "url('/images/home/why-waterlabs-is-different/desktop/bg_the_things_no_other_rcm_partner_can_say.png')",
        }}
      >
        {/* Inner Content: Aligned to right on desktop (982px content area) */}
        <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col lg:items-end">
          <div className="w-full max-w-[982px] flex flex-col gap-[32px] lg:gap-[40px]">
            {/* Header: Tag + Two-line Heading */}
            <div className="flex flex-col items-start gap-[12px] lg:gap-[20px] max-w-[573px]">
              {/* Tag / Eyebrow */}
              <div className="inline-flex items-center gap-[4px] lg:gap-[8px] h-[20px] lg:h-[24px]">
                <span className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">
                  {eyebrow}
                </span>
              </div>

              {/* Title: Line 1 in #0F68D6, Line 2 in #111111 */}
              <h2 className="type-h2 tracking-[-0.01em]">
                <span className="text-[#0F68D6] block">{headingLine1}</span>
                <span className="text-[#111111] block">{headingLine2}</span>
              </h2>
            </div>

            {/* =========================================================
                DESKTOP VIEW (>= 1024px) - Smooth Translating Carousel
               ========================================================= */}
            <div className="hidden lg:flex flex-col gap-[40px]">
              {/* Card Slider Track Area */}
              <div className="relative w-full overflow-visible">
                <div
                  className="flex gap-[24px] transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(calc(-${currentIndex * 612}px))`,
                  }}
                >
                  {cards.map((card, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <div
                        key={card.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`shrink-0 w-[588px] flex flex-col gap-[20px] cursor-pointer transition-all duration-500 ${
                          isActive
                            ? 'opacity-100 scale-100 pointer-events-auto'
                            : 'opacity-25 scale-[0.98] hover:opacity-50'
                        }`}
                      >
                        {/* Card Image */}
                        <div className="relative w-[588px] h-[304px] rounded-[20px_10px_20px_20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="588px"
                            className="object-cover"
                          />
                        </div>

                        {/* Card Content: Title in #0F68D6, Body in #2A2A2A */}
                        <div className="flex flex-col gap-[12px] max-w-[588px]">
                          <h3 className="type-h6 tracking-[-0.01em] text-[#0F68D6]">
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
              <div className="flex items-center justify-between w-full max-w-[927px] pt-[8px]">
                {/* Pagination Pill Indicators */}
                <div className="flex items-center gap-[5px]">
                  {cards.map((card, i) => {
                    const isActive = currentIndex === i;
                    const isAdjacent = Math.abs(currentIndex - i) === 1;
                    let widthClass = 'w-[6px] bg-[rgba(15,104,214,0.2)] hover:bg-[rgba(15,104,214,0.4)]';
                    if (isActive) {
                      widthClass = 'w-[32px] bg-[#0F68D6]';
                    } else if (isAdjacent) {
                      widthClass = 'w-[16px] bg-[rgba(15,104,214,0.2)] hover:bg-[rgba(15,104,214,0.4)]';
                    }
                    return (
                      <button
                        key={`dot-${card.id}`}
                        type="button"
                        onClick={() => setCurrentIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-[6px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${widthClass}`}
                      />
                    );
                  })}
                </div>

                {/* Left/Right Arrow Navigation Buttons using shared CTA component */}
                <div className="flex items-center gap-[14px]">
                  {/* Previous Arrow Button: Disabled on first card */}
                  <CTA
                    variant="light-arrow"
                    onClick={handlePrev}
                    disabled={isFirst}
                    aria-label="Previous card"
                    className={`w-[48px] h-[48px] rotate-180 transition-all duration-300 ${
                      isFirst
                        ? 'opacity-30 cursor-not-allowed pointer-events-none'
                        : 'cursor-pointer'
                    }`}
                  />

                  {/* Next Arrow Button: Disabled on last card */}
                  <CTA
                    variant="light-arrow"
                    onClick={handleNext}
                    disabled={isLast}
                    aria-label="Next card"
                    className={`w-[48px] h-[48px] transition-all duration-300 ${
                      isLast
                        ? 'opacity-30 cursor-not-allowed pointer-events-none'
                        : 'cursor-pointer'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* =========================================================
                MOBILE / TABLET VIEW (< 1024px) - Horizontal Snap Scroll
               ========================================================= */}
            <div className="flex lg:hidden flex-col gap-[20px]">
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="flex w-[calc(100%+40px)] -mx-[20px] md:w-[calc(100%+80px)] md:-mx-[40px] px-[20px] md:px-[40px] scroll-pl-[20px] md:scroll-pl-[40px] overflow-x-auto snap-x snap-mandatory gap-[12px] sm:gap-[20px] pb-[8px] no-scrollbar"
              >
                {cards.map((card) => (
                  <div
                    key={`mobile-${card.id}`}
                    className="shrink-0 snap-start w-[calc(100vw-54px)] sm:w-[330px] max-w-[340px] flex flex-col gap-[16px]"
                  >
                    {/* Card Image */}
                    <div className="relative w-full aspect-[330/265.6] rounded-[20px_10px_20px_20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 330px, 400px"
                        className="object-cover"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col gap-[8px]">
                      <h3 className="type-h6 tracking-[-0.01em] text-[#0F68D6]">
                        {card.title}
                      </h3>
                      <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Trailing space so the last card has padding when scrolled to end */}
                <div className="w-[4px] shrink-0 pointer-events-none" aria-hidden="true" />
              </div>

              {/* Mobile Carousel Indicators */}
              <div className="flex items-center gap-[5px] pt-[4px]">
                {cards.map((card, i) => {
                  const isHiddenOnMd = i === cards.length - 1;
                  const isActive = currentIndex === i;
                  const isAdjacent = Math.abs(currentIndex - i) === 1;
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
                      className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${widthClass} ${
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
