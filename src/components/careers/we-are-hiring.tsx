'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const hiringRoles = [
  {
    icon: '/images/careers/we-are-hiring/icon_engineering_and_ai.png',
    iconWidthDesktop: 102,
    iconHeightDesktop: 99,
    iconWidthMobile: 64,
    iconHeightMobile: 62,
    title: 'Engineering & AI',
    description:
      'Build agentic systems that reason through messy, high-stakes work, on infrastructure we own.',
  },
  {
    icon: '/images/careers/we-are-hiring/icon_product_and_delviery.png',
    iconWidthDesktop: 102,
    iconHeightDesktop: 76,
    iconWidthMobile: 83,
    iconHeightMobile: 62,
    title: 'Product & Delivery',
    description:
      'Turn a hard problem into a system that runs. Build agents, write code. For those who seek purpose in their work.',
  },
  {
    icon: '/images/careers/we-are-hiring/icon_client_success.png',
    iconWidthDesktop: 102,
    iconHeightDesktop: 76,
    iconWidthMobile: 83,
    iconHeightMobile: 62,
    title: 'Client Success',
    description:
      'Stand behind a product you would vouch for. Help revenue teams go from swamped to thriving, and keep their systems stable.',
  },
  {
    icon: '/images/careers/we-are-hiring/icon_rcm_and_domain.png',
    iconWidthDesktop: 102,
    iconHeightDesktop: 76,
    iconWidthMobile: 83,
    iconHeightMobile: 62,
    title: 'RCM & Domain',
    description:
      'Bring what you learned the hard way, the payer quirks, the denial patterns, the stuff no textbook teaches, and finally put it to work building something that fixes the problem.',
  },
];

const TOTAL_DOTS = 3;

export const WeAreHiringSection: React.FC = () => {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const handleScroll = () => {
    const container = mobileScrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    // 1. If at start (Card 1)
    if (scrollLeft <= 15) {
      setActiveDotIndex(0);
      return;
    }

    // 2. If at end (Card 4)
    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 15) {
      setActiveDotIndex(TOTAL_DOTS - 1);
      return;
    }

    // 3. Proportional progress across middle positions
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
    const container = mobileScrollRef.current;
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
    <section className="relative w-full bg-gradient-to-b from-white from-50% to-[#0F68D6] to-50% overflow-hidden p-0 m-0">
      {/* 
        Gray Card with left curves:
        - Top-left curve reveals white background
        - Bottom-left curve reveals Section 4's blue color (#0F68D6)
      */}
      <div className="relative w-full bg-[#F4F6F9] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:px-[60px] overflow-hidden">
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-[20px] lg:gap-[40px] xl:gap-[60px]">
            
          {/* Left Column: Heading Block */}
          <div className="w-full lg:w-[38%] xl:w-[537px] lg:flex-1 min-w-0 shrink-0 flex flex-col gap-[12px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-caption text-[#7D8690]">
                Where You had Fit
              </span>
            </div>

            {/* Heading */}
            <h2 className="type-h2 tracking-[-0.01em] text-[#111111]">
              We are hiring!
            </h2>

            {/* Subheading */}
            <p className="font-secondary text-[14px] leading-[24px] text-[#111111]">
              We&apos;re hiring across roles, and your work matters.
            </p>
          </div>

          {/* Right Column: Desktop Vertical List (hidden on mobile/tablet) */}
          <div className="hidden lg:flex flex-col w-full lg:w-[62%] xl:w-[769px] lg:flex-1 min-w-0 gap-[24px] xl:gap-[32px]">
            {hiringRoles.map((role, index) => (
              <div
                key={`desktop-role-${index}`}
                className="flex flex-row items-center gap-[20px] xl:gap-[24px] pb-[20px] xl:pb-[24px] border-b border-[#91C6F2]"
              >
                {/* Role 3D Icon */}
                <div 
                  className="shrink-0 flex items-center justify-center w-[72px] h-[72px] xl:w-[102px] xl:h-[99px]"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={role.icon}
                      alt={role.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Role Text Content */}
                <div className="flex flex-col gap-[6px] xl:gap-[8px] flex-1">
                  <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">
                    {role.title}
                  </h3>
                  <p className="type-body-xs text-[#2A2A2A] max-w-[504px]">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet Horizontal Smooth Swipe Slider (Figma Frame 2147203300) */}
          <div className="flex lg:hidden flex-col w-full gap-[20px]">
            <div
              ref={mobileScrollRef}
              onScroll={handleScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[20px] items-stretch no-scrollbar"
            >
              {hiringRoles.map((role, index) => (
                <div
                  key={`mobile-role-${index}`}
                  className="shrink-0 snap-start w-[269px] flex flex-col justify-start gap-[14px] pb-[20px] border-b border-[#91C6F2]"
                >
                  {/* Icon */}
                  <div 
                    className="shrink-0 flex items-center justify-start h-[62px]"
                    style={{ width: `${role.iconWidthMobile}px` }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={role.icon}
                        alt={role.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Text Container (Frame 2147226456) */}
                  <div className="flex flex-col gap-[14px] flex-1">
                    <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">
                      {role.title}
                    </h3>
                    <p className="font-secondary text-[14px] leading-[24px] font-normal text-[#2A2A2A]">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicators (Figma Frame Carousel indicators) */}
            <div className="flex items-center gap-[5px] pt-[4px]">
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
                    key={`hiring-dot-${i}`}
                    type="button"
                    onClick={() => scrollToDot(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${widthClass}`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WeAreHiringSection;
