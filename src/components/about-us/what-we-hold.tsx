'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface ValueItem {
  title: string;
  description: string;
  icon: string;
  width: number;
  height: number;
}

const VALUES: ValueItem[] = [
  {
    title: 'Accountability over activity',
    description:
      'Reporting effort is easy. We measure ourselves by actual revenue cycle outcomes and take responsibility for results. Success is our standard, and any shortcomings are ours to address.',
    icon: '/images/about-us/what-we-hold/icon_accountabiltity.png',
    width: 102,
    height: 99,
  },
  {
    title: 'Conviction before payment',
    description:
      'We prioritize demonstrating results over making promises. Our agents must prove their value in your operations before any compensation because verifiable outcomes are more valuable than unproven claims.',
    icon: '/images/about-us/what-we-hold/icon_convictiom_before_payment.png',
    width: 102,
    height: 100,
  },
  {
    title: 'Knowledge that stays',
    description:
      "Two decades of knowing how a payer behaves should not walk out on someone's last day. We build systems that hold what your people learn so expertise compounds instead of resetting.",
    icon: '/images/about-us/what-we-hold/icon_knowldege.png',
    width: 102,
    height: 100,
  },
  {
    title: 'Judgment belongs to people',
    description:
      'Machines are better at volume. People are better at consequence. We built for that distinction, which is why every decision with real weight still reaches a human being.',
    icon: '/images/about-us/what-we-hold/icon_judgement.png',
    width: 102,
    height: 100,
  },
];

export const WhatWeHoldSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    // Card width 269px + gap 20px = 289px
    const cardWidth = 289;
    const newIndex = Math.min(VALUES.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
    setActiveIndex(newIndex);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 289;
    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section
      className="w-full"
      style={{
        background:
          'linear-gradient(to bottom, transparent 0%, transparent 50%, #FFFFFF 50%, #FFFFFF 100%), linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
      }}
    >
      {/* 
        What we hold ourselves to Section:
        - Figma Desktop: node-id=6211-17492 (1440px x 924px, padding: 80px 60px, radius: 0 60px 60px 0)
        - Background: #F4F6F9 with extract watermark on bottom left (bg_what_we_hold_ourselves.png)
        - Top-right corner rounded (rounded-tr-[60px]) exposing the teal gradient of Our story above
        - Bottom-right corner rounded (rounded-br-[60px]) exposing pure white of The Founders below
      */}
      <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-[#F4F6F9] bg-[url('/images/about-us/what-we-hold/bg_what_we_hold_ourselves.png')] bg-cover bg-left-bottom bg-no-repeat px-[20px] pt-[40px] pb-[40px] md:px-[40px] md:pt-[60px] md:pb-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:pt-[80px] lg:pb-[80px]">
        <div className="mx-auto w-full max-w-[1320px]">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Left Heading (35% / 537px) + Right Cards (62% / 769px)*/}
          {/* ========================================================================= */}
          <div className="hidden w-full flex-row items-start justify-between gap-[20px] lg:flex">
            {/* Left Column: Heading (Sticky on Desktop) */}
            <div className="w-full shrink-0 self-start pt-[32px] lg:sticky lg:top-[120px] lg:w-[35%] xl:w-[537px]">
              <h2 className="type-h2 text-[36px] leading-[44px] tracking-[-0.01em] text-[#111111] xl:text-[52px] xl:leading-[60px]">
                What we hold
                <br />
                ourselves to
              </h2>
            </div>

            {/* Right Column: 4 Value Cards with Icons */}
            <div className="flex w-full flex-col gap-[20px] pt-[32px] lg:w-[62%] xl:w-[769px] xl:gap-[32px]">
              {VALUES.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full flex-row items-start gap-[16px] border-b border-[#91C6F2] pb-[20px] xl:gap-[24px] xl:pb-[24px]"
                >
                  {/* 3D Glass Icon */}
                  <div className="flex h-[78px] w-[80px] shrink-0 items-start justify-center xl:h-[100px] xl:w-[102px]">
                    <Image
                      src={item.icon}
                      alt=""
                      width={item.width}
                      height={item.height}
                      className="h-[78px] w-auto object-contain xl:h-[100px]"
                    />
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-1 flex-col items-start gap-[10px] xl:gap-[14px]">
                    <h5 className="type-h5 text-[22px] leading-[30px] tracking-[-0.01em] text-[#0F68D6] xl:text-[32px] xl:leading-[40px]">
                      {item.title}
                    </h5>
                    <p className="type-body-xs text-[15px] leading-[22px] text-[#2A2A2A] xl:text-[18px] xl:leading-[26px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Mobile Layout (< lg): Title -> Horizontal Scrollable Cards -> Indicators */}
          {/* ========================================================================= */}
          <div className="flex w-full flex-col items-start gap-[20px] lg:hidden">
            {/* Heading */}
            <h2 className="type-h2 text-[32px] leading-[40px] tracking-[-0.01em] text-[#111111]">
              What we hold
              <br />
              ourselves to
            </h2>

            {/* Horizontal Scroll Carousel */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="scrollbar-none flex w-full snap-x snap-mandatory flex-row items-stretch gap-[20px] overflow-x-auto pt-[8px] pb-[8px]"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {VALUES.map((item, index) => (
                <div
                  key={index}
                  className="flex w-[269px] shrink-0 snap-start flex-col items-start justify-start gap-[14px] border-b border-[#91C6F2] pb-[20px]"
                >
                  {/* Icon on Top for Mobile */}
                  <div className="flex h-[62px] w-[64px] shrink-0 items-center justify-start">
                    <Image
                      src={item.icon}
                      alt=""
                      width={64}
                      height={62}
                      className="h-[62px] w-auto object-contain"
                    />
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-1 flex-col gap-[14px]">
                    {/* Title */}
                    <h5 className="type-h5 text-[20px] leading-[28px] tracking-[-0.01em] text-[#0F68D6]">
                      {item.title}
                    </h5>

                    {/* Description */}
                    <p className="type-body-xs text-[14px] leading-[24px] text-[#2A2A2A]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex h-[5px] flex-row items-center gap-[5px] pt-[4px]">
              {VALUES.map((_, index) => {
                const isActive = index === activeIndex;
                const isNext = index === (activeIndex + 1) % VALUES.length;
                return (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-[5px] rounded-[32px] transition-all duration-300 ${
                      isActive
                        ? 'w-[32px] bg-[#0F68D6]'
                        : isNext
                          ? 'w-[16px] bg-[#0F68D6]/20'
                          : 'w-[6px] bg-[#0F68D6]/20'
                    }`}
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

export default WhatWeHoldSection;
