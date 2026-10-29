'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

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

export const WeAreHiringSection = () => {
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
        Math.max(0, Math.round(scrollRatio * (TOTAL_DOTS - 1))),
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
    <section className="relative m-0 w-full bg-gradient-to-b from-white from-50% to-[#0F68D6] to-50% p-0">
      {/* 
        Gray Card with left curves:
        - Top-left curve reveals white background
        - Bottom-left curve reveals Section 4's blue color (#0F68D6)
      */}
      <div className="relative w-full rounded-tl-[30px] rounded-bl-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:py-[80px]">
        {/* Decorative Vector Graphic on Bottom Left */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 aspect-[1126/944] w-[280px] overflow-hidden sm:w-[380px] lg:w-[480px] xl:w-[563px]">
          <Image
            src="/images/careers/we-are-hiring/Vector.png"
            alt=""
            fill
            className="object-contain object-left-bottom"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-[20px] lg:flex-row lg:gap-[40px] xl:gap-[60px]">
          {/* Left Column: Heading Block (Sticky on Desktop) */}
          <div className="flex w-full min-w-0 shrink-0 flex-col gap-[12px] self-start lg:sticky lg:top-[120px] lg:w-[38%] lg:gap-[14px] xl:w-[537px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#0F68D6] lg:h-[8px] lg:w-[8px]" />
              <span className="body-xxs text-[#7D8690]">Where you fit</span>
            </div>

            {/* Heading */}
            <h2 className="type-h2 tracking-[-0.01em] text-[#111111]">We are hiring!</h2>
          </div>

          {/* Right Column: Desktop Vertical List (hidden on mobile/tablet) */}
          <div className="hidden w-full min-w-0 flex-col gap-[24px] lg:flex lg:w-[58%] xl:w-[769px] xl:gap-[32px]">
            {hiringRoles.map((role, index) => (
              <div
                key={`desktop-role-${index}`}
                className="flex flex-row items-center gap-[20px] border-b border-[#91C6F2] pb-[20px] xl:gap-[24px] xl:pb-[24px]"
              >
                {/* Role 3D Icon */}
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center xl:h-[99px] xl:w-[102px]">
                  <div className="relative h-full w-full">
                    <Image src={role.icon} alt={role.title} fill className="object-contain" />
                  </div>
                </div>

                {/* Role Text Content */}
                <div className="flex flex-1 flex-col gap-[6px] xl:gap-[14px]">
                  <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">{role.title}</h3>
                  <p className="type-body-xs max-w-[504px] text-[#2A2A2A]">{role.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet Horizontal Smooth Swipe Slider (Figma Frame 2147203300) */}
          <div className="flex w-full flex-col gap-[20px] lg:hidden">
            <div
              ref={mobileScrollRef}
              onScroll={handleScroll}
              className="no-scrollbar flex w-full snap-x snap-mandatory items-stretch gap-[20px] overflow-x-auto"
            >
              {hiringRoles.map((role, index) => (
                <div
                  key={`mobile-role-${index}`}
                  className="flex w-[269px] shrink-0 snap-start flex-col justify-start gap-[14px] border-b border-[#91C6F2] pb-[20px]"
                >
                  {/* Icon */}
                  <div
                    className="flex h-[62px] shrink-0 items-center justify-start"
                    style={{ width: `${role.iconWidthMobile}px` }}
                  >
                    <div className="relative h-full w-full">
                      <Image src={role.icon} alt={role.title} fill className="object-contain" />
                    </div>
                  </div>

                  {/* Text Container (Frame 2147226456) */}
                  <div className="flex flex-1 flex-col gap-[14px]">
                    <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">{role.title}</h3>
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
                    className={`h-[5px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${widthClass}`}
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
