'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

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

export const WhatWeHoldSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    // Card width 269px + gap 20px = 289px
    const cardWidth = 289;
    const newIndex = Math.min(
      VALUES.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
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
      className="w-full overflow-hidden"
      style={{
        background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
      }}
    >
      {/* 
        What we hold ourselves to Section:
        - Figma Desktop: node-id=6211-17492 (1440px x 924px, padding: 80px 60px, radius: 0 60px 60px 0)
        - Background: #F4F6F9 with extract watermark on bottom left (bg_what_we_hold_ourselves.png)
        - Top-right corner rounded (rounded-tr-[60px]) exposing the teal gradient of Our story above
      */}
      <div className="w-full bg-[#F4F6F9] bg-[url('/images/about-us/what-we-hold/bg_what_we_hold_ourselves.png')] bg-cover bg-left-bottom bg-no-repeat rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] pt-[40px] pb-[40px] px-[20px] md:pt-[60px] md:pb-[60px] md:px-[40px] lg:pt-[80px] lg:pb-[80px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Left Heading (35% / 537px) + Right Cards (62% / 769px)*/}
          {/* ========================================================================= */}
          <div className="hidden lg:flex flex-row items-start justify-between gap-[20px] w-full">
            {/* Left Column: Heading */}
            <div className="w-full lg:w-[35%] xl:w-[537px] pt-[32px] shrink-0">
              <h2 className="type-h2 text-[#111111] tracking-[-0.01em] text-[36px] leading-[44px] xl:text-[52px] xl:leading-[60px]">
                What we hold<br />
                ourselves to
              </h2>
            </div>

            {/* Right Column: 4 Value Cards with Icons */}
            <div className="w-full lg:w-[62%] xl:w-[769px] flex flex-col gap-[20px] xl:gap-[32px] pt-[32px]">
              {VALUES.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex flex-row items-start gap-[16px] xl:gap-[24px] pb-[20px] xl:pb-[24px] border-b border-[#91C6F2]"
                >
                  {/* 3D Glass Icon */}
                  <div className="w-[80px] h-[78px] xl:w-[102px] xl:h-[100px] shrink-0 flex items-start justify-center">
                    <Image
                      src={item.icon}
                      alt=""
                      width={item.width}
                      height={item.height}
                      className="w-auto h-[78px] xl:h-[100px] object-contain"
                    />
                  </div>

                  {/* Text Container */}
                  <div className="flex-1 flex flex-col items-start gap-[10px] xl:gap-[14px]">
                    <h5 className="type-h5 text-[#0F68D6] tracking-[-0.01em] text-[22px] leading-[30px] xl:text-[32px] xl:leading-[40px]">
                      {item.title}
                    </h5>
                    <p className="type-body-xs text-[#2A2A2A] text-[15px] leading-[22px] xl:text-[18px] xl:leading-[26px]">
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
          <div className="flex lg:hidden flex-col items-start gap-[20px] w-full">
            {/* Heading */}
            <h2 className="type-h2 text-[#111111] tracking-[-0.01em] text-[32px] leading-[40px]">
              What we hold<br />
              ourselves to
            </h2>

            {/* Horizontal Scroll Carousel */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="w-full flex flex-row items-start gap-[20px] overflow-x-auto scrollbar-none snap-x snap-mandatory pt-[8px] pb-[8px]"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {VALUES.map((item, index) => (
                <div
                  key={index}
                  className="w-[269px] shrink-0 flex flex-col items-start gap-[14px] pb-[20px] border-b border-[#91C6F2] snap-start"
                >
                  {/* Icon on Top for Mobile */}
                  <div className="w-[64px] h-[62px] flex items-center justify-start shrink-0">
                    <Image
                      src={item.icon}
                      alt=""
                      width={64}
                      height={62}
                      className="w-auto h-[62px] object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h5 className="type-h5 text-[#0F68D6] tracking-[-0.01em] text-[20px] leading-[28px]">
                    {item.title}
                  </h5>

                  {/* Description */}
                  <p className="type-body-xs text-[#2A2A2A] text-[14px] leading-[24px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex flex-row items-center gap-[5px] h-[5px] pt-[4px]">
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
