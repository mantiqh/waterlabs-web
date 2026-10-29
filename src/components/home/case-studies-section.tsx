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
    title: 'Reduction In Patient Intake Staffing across a multi-site Physical Therapy network.',
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
    title: 'Staffing reduction in Emergency Department Coding through Accurate, Autonomous Coding.',
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
        background: 'linear-gradient(348.94deg, #F4F6F9 7.84%, #062B4B 97.51%)',
      }}
    >
      {/* 
        Curved Container:
        Desktop: border-radius 60px 0px 0px 0px, padding 80px 60px, background #FFFFFF (Figma node 7487-16787)
        Mobile: border-radius 30px 0px 0px 0px, padding 40px 20px, background #FFFFFF (Figma node 7487-17168)
      */}
      <div className="w-full rounded-tl-[30px] rounded-tr-none rounded-br-none rounded-bl-none bg-white px-[20px] py-[40px] md:px-[40px] lg:rounded-tl-[60px] lg:px-[60px] lg:py-[80px]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-[24px] sm:gap-[32px] lg:gap-[40px]">
          {/* =========================================================
              HEADER ROW: Heading ("Proven results with Active Clients") + CTA Button
             ========================================================= */}
          <div className="flex w-full flex-col items-start justify-between gap-[16px] lg:flex-row lg:items-center lg:gap-[20px]">
            <h2 className="type-h2 max-w-[731px] tracking-[-0.01em]">
              {heading ? (
                heading
              ) : (
                <>
                  <span className="block text-[#0F68D6]">{headingLine1}</span>
                  <span className="block text-[#000000]">{headingLine2}</span>
                </>
              )}
            </h2>

            <div className="shrink-0">
              <Link href={ctaLink}>
                <CTA variant="light-bg">{ctaText}</CTA>
              </Link>
            </div>
          </div>

          {/* =========================================================
              DESKTOP VIEW (>= 1024px) - 3 Columns Row (1320px x 312px)
             ========================================================= */}
          <div className="hidden w-full grid-cols-3 gap-[20px] lg:grid">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex h-[312px] flex-col justify-between rounded-[20px_10px_20px_20px] border border-transparent bg-[rgba(145,198,242,0.1)] p-[32px] transition-all duration-300 hover:border-[#0F68D6]/20 hover:shadow-[0_8px_24px_rgba(15,104,214,0.06)]"
              >
                <div className="flex flex-col gap-[16px]">
                  {/* Metric Value */}
                  <span
                    className="type-h1 text-[68px] leading-[76px] tracking-[-0.01em]"
                    style={{
                      background: 'linear-gradient(90deg, #0F68D6 25.55%, #63CCB7 45.78%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {card.metric}
                  </span>

                  {/* Description */}
                  <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">{card.title}</p>
                </div>

                {/* Read Case Study Link */}
                <Link
                  href={card.link}
                  className="group type-cta inline-flex items-center gap-[10px] self-start font-medium text-[#000000] transition-colors hover:text-[#0F68D6]"
                >
                  <span>Read Case Study</span>
                  <ChevronRight className="h-[18.6px] w-[12.4px] text-[#0F68D6] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          {/* =========================================================
              MOBILE / TABLET VIEW (< 1024px) - Horizontal Snap Scroll
             ========================================================= */}
          <div className="flex w-full flex-col gap-[20px] lg:hidden">
            {/* Horizontal Scroll Track with sneak peek */}
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="no-scrollbar -mx-[20px] flex w-[calc(100%+40px)] snap-x snap-mandatory scroll-pl-[20px] gap-[12px] overflow-x-auto px-[20px] pb-[4px]"
            >
              {cards.map((card) => (
                <div
                  key={`mobile-${card.id}`}
                  className="flex h-[188px] w-[calc(100vw-54px)] max-w-[330px] shrink-0 snap-start flex-col justify-between rounded-[20px_10px_20px_20px] bg-[rgba(145,198,242,0.1)] p-[12px] sm:w-[330px]"
                >
                  <div className="flex flex-col gap-[12px]">
                    {/* Metric Value */}
                    <span
                      className="type-h1 text-[36px] leading-[48px] tracking-[-0.01em]"
                      style={{
                        background: 'linear-gradient(90deg, #0F68D6 25.55%, #63CCB7 45.78%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {card.metric}
                    </span>

                    {/* Description */}
                    <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">{card.title}</p>
                  </div>

                  {/* Read Case Study Link */}
                  <Link
                    href={card.link}
                    className="group type-cta inline-flex items-center gap-[10px] self-start font-medium text-[#000000] transition-colors hover:text-[#0F68D6]"
                  >
                    <span>Read Case Study</span>
                    <ChevronRight className="h-[18.6px] w-[12.4px] text-[#0F68D6] transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
              {/* Trailing spacer so right padding is respected when scrolled to end */}
              <div className="pointer-events-none w-[8px] shrink-0" aria-hidden="true" />
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

export default CaseStudiesSection;
