'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface Principle {
  title: string;
  description: string;
  icon: string;
}

const principles: Principle[] = [
  {
    title: 'Actions and Accountability',
    description:
      "We measure ourselves by what's live in your environment, not what's promised in a deck. If the agents aren't delivering, we haven't done our job.",
    icon: '/images/about-us/what-we-believe/icon_accounts_and_accountability.png',
  },
  {
    title: 'Customer Outcomes',
    description:
      'More collections, fewer denials, cleaner claims. We win when your numbers move, not when we ship a feature.',
    icon: '/images/about-us/what-we-believe/icon_customer_outcomes.png',
  },
  {
    title: 'Continuous Improvement',
    description:
      'Every exception a human resolves, the system keeps for good. The work gets sharper with every claim.',
    icon: '/images/about-us/what-we-believe/icon_continous_improvement.png',
  },
  {
    title: 'Innovation',
    description:
      'We build agents that do the work, not dashboards that watch it. Autonomous where it counts, human where it matters.',
    icon: '/images/about-us/what-we-believe/icon_innovation.png',
  },
];

const TOTAL_DOTS = 3;

export const WhatWeBelieveSection: React.FC = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    if (scrollLeft <= 15) {
      setActiveDotIndex(0);
      return;
    }

    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 15) {
      setActiveDotIndex(TOTAL_DOTS - 1);
      return;
    }

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const scrollRatio = scrollLeft / maxScroll;
      const dotIndex = Math.min(
        TOTAL_DOTS - 1,
        Math.max(0, Math.round(scrollRatio * (TOTAL_DOTS - 1)))
      );
      setActiveDotIndex(dotIndex);
    }
  };

  const scrollToDot = (dotIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    if (dotIndex === 0) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dotIndex === TOTAL_DOTS - 1) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      const targetScroll = (dotIndex / (TOTAL_DOTS - 1)) * maxScroll;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
    setActiveDotIndex(dotIndex);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 50%, #000000 50%)',
      }}
    >
      {/* 
        What We Believe Section (Desktop: 4081-10784 / Mobile: 4081-11031 / 4081-10985 / 4081-11275):
        - Frame 15:
          - Desktop: 1440px width, padding: 80px 60px, gap: 40px, rounded: 0 60px 60px 0, bg: #F4F6F9
          - Mobile: 100% full width, padding: 40px 0px (cards full-bleed with px-[20px] inside), gap: 20px, rounded: 0 30px 30px 0, bg: #F4F6F9
      */}
      <div className="w-full bg-[#F4F6F9] rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[32px] md:gap-[40px]">
          
          {/* Header Block (Frame 21) - padded 20px on mobile */}
          <div className="px-[20px] md:px-0 flex flex-col lg:flex-row items-start lg:justify-start gap-[16px] lg:gap-[20px]">
            {/* Tag / Eyebrow (Text - Tag) */}
            <div className="flex items-center gap-[4px] lg:gap-[8px] lg:pt-[8px] lg:w-[427px] lg:shrink-0">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-caption lg:type-body-xxs text-[#7D8690] tracking-[0.01em]">
                What we believe
              </span>
            </div>

            {/* Title and Subtitle Block (Frame 2147203216) */}
            <div className="flex flex-col items-start gap-[12px] lg:gap-[20px] max-w-[828px]">
              <h2 className="type-h2 text-black">
                What makes <br />
                <span className="text-[#0F68D6]">Waterlabs stand out?</span>
              </h2>
              <p className="type-body-s text-[#2A2A2A]">
                Four operational principles we stand behind.
              </p>
            </div>
          </div>

          {/* Cards Track: Desktop 4 in a row, Mobile 100% full-width horizontal scroll (Frame 2147203152) */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full flex flex-row items-stretch gap-[12px] lg:gap-[20px] overflow-x-auto no-scrollbar scroll-smooth px-[20px] md:px-0 pb-[8px] lg:pb-0"
          >
            {principles.map((item, idx) => (
              <div
                key={idx}
                className="w-[269px] lg:w-full lg:flex-1 shrink-0 bg-white rounded-[16px] p-[20px] lg:p-[32px] flex flex-col justify-between items-start gap-[20px] lg:gap-[40px] min-h-[286px] lg:h-[418px] transition-shadow duration-300 hover:shadow-md"
              >
                {/* Principle Icon */}
                <div className="relative w-[83px] h-[62px] lg:w-[137px] lg:h-[102px] shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 1024px) 83px, 137px"
                  />
                </div>

                {/* Principle Text Content */}
                <div className="flex flex-col items-start gap-[8px] lg:gap-[12px] w-full">
                  <h3 className="type-h5 text-black">
                    {item.title}
                  </h3>
                  <p className="type-body-xxs text-[#2A2A2A] leading-[20px] lg:leading-[24px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            {/* End spacer for mobile scroll so the last card has 20px right margin when scrolled to the end */}
            <div className="w-[8px] shrink-0 md:hidden" />
          </div>

          {/* Mobile Indicator Pills: Exactly 3 pills matching Figma (Carousel indicators) */}
          <div className="px-[20px] md:px-0 flex md:hidden flex-row items-center gap-[5px] pt-[8px]">
            {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
              const isActive = activeDotIndex === i;
              const diff = Math.abs(activeDotIndex - i);
              const widthClass = isActive
                ? 'w-[32px] bg-[#0F68D6]'
                : diff === 1
                ? 'w-[16px] bg-[#0F68D6]/20'
                : 'w-[6px] bg-[#0F68D6]/20';

              return (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => scrollToDot(i)}
                  aria-label={`Go to principle group ${i + 1}`}
                  className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${widthClass}`}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieveSection;
