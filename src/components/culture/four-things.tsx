'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

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
      'Own it. Deliver it. Improve it. We honor our commitments, learn from experience, and keep looking for ways to do better.',
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

export const FourThingsSection = () => {
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
    <section className="relative m-0 w-full bg-[#9983E2] p-0">
      {/* 
        Four Things Section Container (Figma top frame - color):
        - Desktop: 1440px width, padding: 80px 60px, rounded-tr-[60px]
        - Mobile: rounded-tr-[30px], padding: 40px 20px
        - Background: #F4F6F9
        - Top-right corner reveals the hero purple (#9983E2) seamlessly matching Figma
      */}
      <div className="relative w-full rounded-tr-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:px-[60px] lg:py-[80px]">
        {/* Vector Background Graphic at Left Bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 aspect-[1126/944] w-[280px] overflow-hidden sm:w-[380px] lg:w-[480px] xl:w-[563px]">
          <Image
            src="/images/culture/four-things/Vector.png"
            alt="Vector Graphic"
            fill
            className="object-contain object-left-bottom"
          />
        </div>

        {/* Content Container (1320px max width) */}
        <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-[32px] lg:flex-row lg:gap-[40px] xl:gap-[60px] 2xl:gap-[80px]">
          {/* =================================================================
              LEFT COLUMN: Heading Block (Sticky on Desktop matching ProductsSection)
             ================================================================= */}
          <div className="flex w-full min-w-0 shrink-0 flex-col gap-[14px] self-start lg:sticky lg:top-[120px] lg:w-[360px] xl:w-[440px] 2xl:w-[480px]">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
              <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">
                What we stand for
              </span>
            </div>

            {/* Main Section Heading (type-h2, semantic <h2>) */}
            <h2 className="type-h2 max-w-[476px] text-[#111111]">
              Four things we don&apos;t compromise on.
            </h2>
          </div>

          {/* =================================================================
              DESKTOP RIGHT COLUMN: Vertically Scrolling List of 4 Principles
             ================================================================= */}
          <div className="hidden w-full max-w-[760px] min-w-0 flex-col gap-[36px] lg:flex lg:flex-1 xl:gap-[44px]">
            {fourThingsData.map((item, index) => (
              <div
                key={`desktop-principle-${item.id}`}
                className={`flex flex-row items-start gap-[24px] pb-[32px] xl:pb-[36px] ${
                  index !== fourThingsData.length - 1
                    ? 'border-b border-[#91C6F2]'
                    : 'border-b border-[#91C6F2]'
                }`}
              >
                {/* 3D Glass Icon */}
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{ width: `${item.iconWidth}px`, height: `${item.iconHeight}px` }}
                >
                  <div className="relative h-full w-full">
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
                <div className="flex flex-1 flex-col gap-[14px]">
                  <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">{item.title}</h3>
                  <p className="type-body-xs max-w-[507px] leading-relaxed text-[#2A2A2A]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* =================================================================
              MOBILE / TABLET: Horizontal Snap Swipe Slider (same as Careers)
             ================================================================= */}
          <div className="flex w-full flex-col gap-[20px] lg:hidden">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="no-scrollbar flex w-full snap-x snap-mandatory items-stretch gap-[16px] overflow-x-auto pt-[8px] sm:gap-[20px]"
            >
              {fourThingsData.map((item) => (
                <div
                  key={`mobile-principle-${item.id}`}
                  className="flex w-[270px] shrink-0 snap-start flex-col justify-start gap-[14px] border-b border-[#91C6F2] pb-[20px] sm:w-[300px]"
                >
                  {/* Icon */}
                  <div className="flex h-[76px] w-[90px] shrink-0 items-center justify-start">
                    <div className="relative h-full w-full">
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
                  <div className="flex flex-1 flex-col gap-[10px]">
                    <h3 className="type-h5 tracking-[-0.01em] text-[#0F68D6]">{item.title}</h3>
                    <p className="type-body-xs leading-relaxed text-[#2A2A2A]">
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

export default FourThingsSection;
