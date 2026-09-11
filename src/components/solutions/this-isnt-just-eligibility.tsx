'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import { CTA } from '@/components/CTA';

interface ThreeThingsCard {
  icon: string;
  title: string;
  description: string;
}

const threeThingsCards: ThreeThingsCard[] = [
  {
    icon: '/images/solutions/the-three-things/icon_start_small.png',
    title: 'Start small',
    description:
      'You may start with eligibility only and add stages when ready.',
  },
  {
    icon: '/images/solutions/the-three-things/icon_go_live_fast.png',
    title: 'Go live fast',
    description: 'Your agents are live and working in 14 days.',
  },
  {
    icon: '/images/solutions/the-three-things/icon_data_remains_source.png',
    title: 'Data remains secure',
    description:
      'Our agents run on infrastructure that Waterlabs owns and operates in the United States under a BAA, on servers we control end-to-end.',
  },
];

const TOTAL_DOTS = 3;

export const ThisIsntJustEligibilitySection: React.FC = () => {
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
        background: 'linear-gradient(180deg, #FFFFFF 0%, #0F68D6 100%)',
      }}
    >
      {/*
        "This isn't just an eligibility tool" + Three Things Section:
        - Outer: gradient #FFFFFF → #0F68D6
        - Inner: #F4F6F9, border-radius: 60px 0 0 60px (left-side rounding)
        - Desktop: padding 60px, gap 60px
        - Mobile: padding 40px 20px, gap 32px
      */}
      <div className="w-full bg-ghost-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[60px] lg:py-[60px]">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[32px] lg:gap-[60px]">

          {/* ── GRADIENT CARD: "It's one application on an OS" ── */}

          {/* Desktop Layout: hidden on mobile/tablet, visible on lg: */}
          <div
            className="hidden lg:flex w-full rounded-[20px] overflow-hidden flex-row items-center"
            style={{
              background: 'linear-gradient(116.88deg, #0F68D6 49.69%, #AE87E4 69.22%)',
            }}
          >
            {/* Left Column: Text Content */}
            <div className="w-full lg:w-[45%] xl:w-1/2 flex flex-col items-start gap-[12px] xl:gap-[20px] p-[24px] lg:p-[32px] xl:p-[60px] justify-center">
              {/* Tag */}
              <div className="flex items-center gap-[8px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
                <span className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                  This isn&apos;t just an eligibility tool
                </span>
              </div>

              {/* Heading */}
              <h3 className="type-h3 text-white tracking-[-0.01em]">
                It&apos;s one application on an operating system that manages the full revenue cycle.
              </h3>

              {/* Description */}
              <p className="type-body-xs text-[#F4F6F9]">
                Eligibility runs on our proprietary HIMER AI OS, which also manages prior authorization, denials, accounts receivable, cash posting, and coding. The coverage details our eligibility agent finds are the same as the details our authorization agent uses an hour later.
              </p>

              {/* CTA */}
              <Link href="/contact-us">
                <CTA variant="dark-bg">
                  Explore HIMER AI OS
                </CTA>
              </Link>
            </div>

            {/* Right Column: Image */}
            <div className="w-full lg:w-[55%] xl:w-1/2 self-stretch flex items-center justify-end overflow-hidden">
              <div className="relative w-full h-full min-h-[380px] xl:min-h-[500px]">
                <Image
                  src="/images/solutions/this-isn't-just-an-eligibility/img_this_isn't_just_an_eligibility_tool.png"
                  alt="HIMER AI OS platform overview"
                  fill
                  priority
                  sizes="(max-width: 1440px) 55vw, 653px"
                  className="object-cover object-[48%_center] rounded-r-[20px]"
                />
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Layout: visible below lg:, matches Figma Frame 2147226590 */}
          <div
            className="flex lg:hidden w-full rounded-[20px] overflow-hidden flex-col"
            style={{
              background: 'linear-gradient(116.88deg, #0F68D6 49.69%, #AE87E4 69.22%)',
            }}
          >
            {/* Top: Laptop Image (full width, natural height on mobile, increased height on md:, 20px radius on all corners) */}
            <div className="w-full overflow-hidden rounded-[20px] md:h-[380px] md:relative">
              <Image
                src="/images/solutions/this-isn't-just-an-eligibility/img_this_isn't_just_an_eligibility_tool_mobile (1).png"
                alt="HIMER AI OS platform overview"
                width={724}
                height={596}
                priority
                className="w-full h-auto md:h-full object-cover object-center rounded-[20px]"
              />
            </div>

            {/* Bottom: Text Content */}
            <div className="flex flex-col items-start p-[24px] sm:p-[32px] gap-[14px]">
              {/* Tag */}
              <div className="flex items-center gap-[4px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
                <span className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                  This isn&apos;t just an eligibility tool
                </span>
              </div>

              {/* Heading */}
              <h3 className="type-h3 text-white tracking-[-0.01em]">
                It&apos;s one application on an operating system that manages the full revenue cycle.
              </h3>

              {/* Description */}
              <p className="type-body-xxs text-[#D7DCE2] tracking-[0.01em]">
                Eligibility runs on our proprietary HIMER AI OS, which also manages prior authorization, denials, accounts receivable, cash posting, and coding. The coverage details our eligibility agent finds are the same as the details our authorization agent uses an hour later.
              </p>

              {/* CTA */}
              <Link href="/contact-us">
                <CTA variant="dark-bg">
                  Explore HIMER AI OS
                </CTA>
              </Link>
            </div>
          </div>

          {/* ── THREE THINGS SECTION ── */}
          <div className="flex flex-col gap-[20px] lg:gap-[32px]">
            {/* Heading */}
            <h3 className="type-h3 text-black">
              <span className="text-electric-blue">The three things that usually</span>{' '}
              <br className="hidden lg:block" />
              stop people. None of them apply here.
            </h3>

            {/* Desktop: 3 cards in a row */}
            <div className="hidden lg:flex flex-row gap-[20px]">
              {threeThingsCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-white rounded-[16px] p-[32px] flex flex-col gap-[24px] min-h-[320px]"
                >
                  {/* Icon */}
                  <div className="relative w-[80px] h-[80px] shrink-0">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      fill
                      sizes="80px"
                      className="object-contain object-left"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-[12px]">
                    <h5 className="type-h5 text-electric-blue">{card.title}</h5>
                    <p className="type-body-xxs text-[#2A2A2A]">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile / Tablet: Horizontal scroll cards */}
            <div className="flex lg:hidden flex-col gap-[12px]">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="w-full flex flex-row items-stretch gap-[12px] overflow-x-auto no-scrollbar scroll-smooth pb-[4px]"
              >
                {threeThingsCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="w-[269px] shrink-0 bg-white rounded-[16px] p-[20px] flex flex-col gap-[20px] min-h-[260px]"
                  >
                    {/* Icon */}
                    <div className="relative w-[62px] h-[62px] shrink-0">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        sizes="64px"
                        className="object-contain object-left"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-[8px]">
                      <h5 className="type-h5 text-electric-blue">{card.title}</h5>
                      <p className="type-body-xxs text-[#2A2A2A]">{card.description}</p>
                    </div>
                  </div>
                ))}
                <div className="w-[8px] shrink-0" />
              </div>

              {/* Carousel Indicators */}
              <div className="flex flex-row items-center gap-[5px]">
                {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
                  const isActive = activeDotIndex === i;
                  const diff = Math.abs(activeDotIndex - i);
                  const widthClass = isActive
                    ? 'w-[32px] bg-electric-blue'
                    : diff === 1
                      ? 'w-[16px] bg-electric-blue/20'
                      : 'w-[6px] bg-electric-blue/20';

                  return (
                    <button
                      key={`dot-${i}`}
                      type="button"
                      onClick={() => scrollToDot(i)}
                      aria-label={`Go to card group ${i + 1}`}
                      className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${widthClass}`}
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

export default ThisIsntJustEligibilitySection;
