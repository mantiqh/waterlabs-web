'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';

export interface MetricCardItem {
  id: string;
  metric: string;
  title: string;
  link: string;
}

const DEFAULT_METRIC_CARDS: MetricCardItem[] = [
  {
    id: 'intake-staffing',
    metric: '93%',
    title:
      'Reduction In Patient Intake Staffing across a multi-site Physical Therapy network.',
    link: '/case-studies',
  },
  {
    id: 'revenue-upside',
    metric: '$72M',
    title:
      'Revenue Upside through Faster, More Accurate Claims Submission for a Rural Health system.',
    link: '/case-studies',
  },
  {
    id: 'coding-automation',
    metric: '90%',
    title:
      'Staffing reduction in Emergency Department Coding through Accurate, Autonomous Coding.',
    link: '/case-studies',
  },
];

export interface CaseStudiesSectionProps {
  headingLine1?: string;
  headingLine2?: string;
  heading?: string;
  ctaText?: string;
  ctaLink?: string;
  cards?: MetricCardItem[];
}

export const CaseStudiesSection = ({
  headingLine1 = 'Proven results',
  headingLine2 = 'with Active Clients',
  heading,
  ctaText = 'See all case studies',
  ctaLink = '/case-studies',
  cards = DEFAULT_METRIC_CARDS,
}: CaseStudiesSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardElements = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    cardElements.forEach((el, index) => {
      if (index >= cards.length) return;
      const targetOffset = el.offsetLeft - container.offsetLeft - 20;
      const distance = Math.abs(targetOffset - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    const container = mobileScrollRef.current;
    if (!container) return;
    const cardElements = Array.from(container.children) as HTMLElement[];
    if (cardElements[index]) {
      container.scrollTo({
        left: cardElements[index].offsetLeft - container.offsetLeft - 20,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(348.94deg, #F4F6F9 7.84%, #062B4B 97.51%)',
      }}
    >
      {/* 
        Curved Container:
        Desktop: border-radius 60px 0px 0px 0px, padding 80px 60px, background #FFFFFF (Figma node 7487-16787)
        Mobile: border-radius 30px 0px 0px 0px, padding 40px 20px, background #FFFFFF (Figma node 7487-17168)
      */}
      <div className="w-full bg-white rounded-tl-[30px] lg:rounded-tl-[60px] rounded-tr-none rounded-br-none rounded-bl-none py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[24px] sm:gap-[32px] lg:gap-[40px]">
          
          {/* =========================================================
              HEADER ROW: Heading ("Proven results with Active Clients") + CTA Button
             ========================================================= */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[16px] lg:gap-[20px] w-full">
            <h2 className="type-h2 tracking-[-0.01em] max-w-[731px]">
              {heading ? (
                heading
              ) : (
                <>
                  <span className="text-[#0F68D6] block">{headingLine1}</span>
                  <span className="text-[#000000] block">{headingLine2}</span>
                </>
              )}
            </h2>

            <div className="shrink-0">
              <Link href={ctaLink}>
                <CTA variant="light-bg">
                  {ctaText}
                </CTA>
              </Link>
            </div>
          </div>

          {/* =========================================================
              DESKTOP VIEW (>= 1024px) - 3 Columns Row (1320px x 312px)
             ========================================================= */}
          <div className="hidden lg:grid grid-cols-3 gap-[20px] w-full">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-[rgba(145,198,242,0.1)] rounded-[20px_10px_20px_20px] p-[32px] h-[312px] flex flex-col justify-between border border-transparent hover:border-[#0F68D6]/20 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(15,104,214,0.06)]"
              >
                <div className="flex flex-col gap-[16px]">
                  {/* Metric Value */}
                  <span
                    className="type-h1 text-[68px] leading-[76px] tracking-[-0.01em]"
                    style={{
                      background:
                        'linear-gradient(90deg, #0F68D6 25.55%, #63CCB7 45.78%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {card.metric}
                  </span>

                  {/* Description */}
                  <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                    {card.title}
                  </p>
                </div>

                {/* Read Case Study Link */}
                <Link
                  href={card.link}
                  className="group inline-flex items-center gap-[10px] text-[#000000] type-cta font-medium hover:text-[#0F68D6] transition-colors self-start"
                >
                  <span>Read Case Study</span>
                  <ChevronRight className="w-[12.4px] h-[18.6px] text-[#0F68D6] group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            ))}
          </div>

          {/* =========================================================
              MOBILE / TABLET VIEW (< 1024px) - Horizontal Snap Scroll
             ========================================================= */}
          <div className="flex lg:hidden flex-col gap-[20px] w-full">
            {/* Horizontal Scroll Track with sneak peek */}
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex w-[calc(100%+40px)] -mx-[20px] px-[20px] scroll-pl-[20px] overflow-x-auto snap-x snap-mandatory gap-[12px] pb-[4px] no-scrollbar"
            >
              {cards.map((card) => (
                <div
                  key={`mobile-${card.id}`}
                  className="shrink-0 snap-start w-[calc(100vw-54px)] sm:w-[330px] max-w-[330px] h-[188px] bg-[rgba(145,198,242,0.1)] rounded-[20px_10px_20px_20px] p-[12px] flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-[12px]">
                    {/* Metric Value */}
                    <span
                      className="type-h1 text-[36px] leading-[48px] tracking-[-0.01em]"
                      style={{
                        background:
                          'linear-gradient(90deg, #0F68D6 25.55%, #63CCB7 45.78%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {card.metric}
                    </span>

                    {/* Description */}
                    <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                      {card.title}
                    </p>
                  </div>

                  {/* Read Case Study Link */}
                  <Link
                    href={card.link}
                    className="group inline-flex items-center gap-[10px] text-[#000000] type-cta font-medium hover:text-[#0F68D6] transition-colors self-start"
                  >
                    <span>Read Case Study</span>
                    <ChevronRight className="w-[12.4px] h-[18.6px] text-[#0F68D6] group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              ))}
              {/* Trailing spacer so right padding is respected when scrolled to end */}
              <div className="w-[8px] shrink-0 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Mobile Carousel Indicators (Figma node 7487-17168: 32px / 16px / 6px) */}
            <div className="flex items-center gap-[5px] pt-[4px]">
              {cards.map((card, i) => {
                const isActive = activeIndex === i;
                const isAdjacent = Math.abs(activeIndex - i) === 1;
                let widthClass = 'w-[6px] bg-[rgba(15,104,214,0.2)]';
                if (isActive) {
                  widthClass = 'w-[32px] bg-[#0F68D6]';
                } else if (isAdjacent) {
                  widthClass = 'w-[16px] bg-[rgba(15,104,214,0.2)]';
                }
                return (
                  <button
                    key={`dot-${card.id}`}
                    type="button"
                    onClick={() => scrollToCard(i)}
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

export default CaseStudiesSection;
