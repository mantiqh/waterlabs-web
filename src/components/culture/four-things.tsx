'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface PrincipleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}

const fourThingsData: PrincipleItem[] = [
  {
    id: 'integrity',
    title: 'Integrity',
    description:
      'Do the right thing, always. We are honest and transparent, and we build trust by doing what is right even when it is difficult.',
    icon: '/images/culture/four-things/icon_integrity.png',
    iconWidth: 102,
    iconHeight: 99,
  },
  {
    id: 'accountability',
    title: 'Accountability',
    description:
      'Own it. Deliver it. Improve it. We honour our commitments, learn from experience, and keep looking for ways to do better.',
    icon: '/images/culture/four-things/icon_accountability.png',
    iconWidth: 102,
    iconHeight: 100,
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description:
      'Great outcomes come from great teamwork. We listen, share, support each other, and use our collective strengths to get there.',
    icon: '/images/culture/four-things/icon_collaboration.png',
    iconWidth: 102,
    iconHeight: 100,
  },
  {
    id: 'commitment',
    title: 'Commitment',
    description:
      'Stay dedicated. Keep moving forward. We are committed to our people, our customers and our purpose, and we turn commitments into results.',
    icon: '/images/culture/four-things/icon_commitment.png',
    iconWidth: 102,
    iconHeight: 76,
  },
];

const TOTAL_DOTS = 4;

export const FourThingsSection: React.FC = () => {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const handleMobileScroll = () => {
    const container = mobileScrollRef.current;
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
    <section className="relative w-full bg-[#F4F6F9] p-0 m-0">
      {/* 
        Four Things Section Container (Figma top frame - color):
        - Desktop: 1440px width, padding: 80px 60px, rounded-tl-[60px] rounded-bl-[60px]
        - Mobile: rounded-tl-[30px] rounded-bl-[30px], padding: 40px 20px
        - Background: #F4F6F9
        - Left column stays fixed (sticky) on desktop while right side scrolls (matching Home page ProductsSection)
      */}
      <div className="relative w-full bg-[#F4F6F9] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
        
        {/* Subtle Background Watermark Graphic (Vector Ribbon Curve) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px]">
          <svg
            className="absolute -left-[180px] sm:-left-[120px] lg:-left-[80px] top-[140px] lg:top-[180px] w-[500px] sm:w-[650px] lg:w-[750px] h-[500px] sm:h-[650px] lg:h-[750px] opacity-70"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant looping curved ribbon matching Figma screenshot */}
            <path
              d="M100 480C140 420 220 340 320 380C420 420 480 340 440 240C400 140 280 120 200 180C120 240 60 380 140 460C220 540 360 520 420 420"
              stroke="#FFFFFF"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mix-blend-overlay"
            />
          </svg>
        </div>

        {/* Content Container (1320px max width) */}
        <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-[32px] lg:gap-[40px] xl:gap-[60px] 2xl:gap-[80px]">
          
          {/* =================================================================
              LEFT COLUMN: Heading Block (Sticky on Desktop matching ProductsSection)
             ================================================================= */}
          <div className="w-full lg:w-[360px] xl:w-[440px] 2xl:w-[480px] shrink-0 min-w-0 lg:sticky lg:top-[120px] self-start flex flex-col gap-[14px]">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                What we stand for
              </span>
            </div>

            {/* Main Section Heading (type-h2, semantic <h2>) */}
            <h2 className="type-h2 text-[#111111] max-w-[476px]">
              Four things we don&apos;t compromise on.
            </h2>
          </div>

          {/* =================================================================
              DESKTOP RIGHT COLUMN: Vertically Scrolling List of 4 Principles
             ================================================================= */}
          <div className="hidden lg:flex flex-col w-full lg:flex-1 min-w-0 max-w-[760px] gap-[36px] xl:gap-[44px]">
            {fourThingsData.map((item, index) => (
              <div
                key={`desktop-principle-${item.id}`}
                className={`flex flex-row items-start gap-[24px] pb-[32px] xl:pb-[36px] ${
                  index !== fourThingsData.length - 1 ? 'border-b border-[#91C6F2]' : 'border-b border-[#91C6F2]'
                }`}
              >
                {/* 3D Glass Icon */}
                <div
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: `${item.iconWidth}px`, height: `${item.iconHeight}px` }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      sizes="102px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-[14px] flex-1">
                  <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">
                    {item.title}
                  </h3>
                  <p className="type-body-xs text-[#2A2A2A] leading-relaxed max-w-[507px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* =================================================================
              MOBILE / TABLET: Horizontal Snap Swipe Slider (same as Careers)
             ================================================================= */}
          <div className="flex lg:hidden flex-col w-full gap-[20px]">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[16px] sm:gap-[20px] items-stretch no-scrollbar pt-[8px]"
            >
              {fourThingsData.map((item) => (
                <div
                  key={`mobile-principle-${item.id}`}
                  className="shrink-0 snap-start w-[270px] sm:w-[300px] flex flex-col justify-start gap-[14px] pb-[20px] border-b border-[#91C6F2]"
                >
                  {/* Icon */}
                  <div className="shrink-0 flex items-center justify-start h-[76px] w-[90px]">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        fill
                        sizes="90px"
                        className="object-contain object-left"
                      />
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col gap-[10px] flex-1">
                    <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">
                      {item.title}
                    </h3>
                    <p className="type-body-xs text-[#2A2A2A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicators */}
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
                    key={`principle-dot-${i}`}
                    type="button"
                    onClick={() => scrollToDot(i)}
                    aria-label={`Go to principle ${i + 1}`}
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

export default FourThingsSection;
