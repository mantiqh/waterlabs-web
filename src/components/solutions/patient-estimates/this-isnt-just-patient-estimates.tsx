'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

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
      'You can begin with patient estimates and add more features as needed.',
  },
  {
    icon: '/images/solutions/the-three-things/icon_go_live_fast.png',
    title: 'Go live fast',
    description: 'Your agents are live within 14 days.',
  },
  {
    icon: '/images/solutions/the-three-things/icon_data_remains_source.png',
    title: 'Data remains secure',
    description:
      'Our agents run on infrastructure Waterlabs owns and operates in the United States, under a BAA, on servers we control end to end.',
  },
];

const TOTAL_DOTS = 3;

export const ThisIsntJustPatientEstimatesSection = () => {
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
      <div className="w-full bg-ghost-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[60px] lg:py-[60px]">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[32px] lg:gap-[60px]">

          {/* ── GRADIENT CARD: HIMER AI OS ── */}

          {/* Desktop Layout */}
          <div
            className="hidden lg:flex w-full rounded-[20px] overflow-hidden flex-row items-center"
            style={{
              background: 'linear-gradient(116.88deg, #0F68D6 49.69%, #AE87E4 69.22%)',
            }}
          >
            {/* Left Column: Text Content */}
            <div className="w-full lg:w-[45%] xl:w-1/2 flex flex-col items-start gap-[12px] xl:gap-[20px] p-[24px] lg:p-[32px] xl:p-[60px] justify-center">
              <div className="flex items-center gap-[8px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
                <span className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                  This isn&apos;t just an estimate tool
                </span>
              </div>

              <h3 className="type-h3 text-white tracking-[-0.01em]">
                This is one application within a platform that manages the entire revenue cycle.
              </h3>

              <p className="type-body-xs text-[#F4F6F9]">
                Patient estimates operate on our proprietary HIMER AI OS, which also manages prior authorization, eligibility, denials, accounts receivable, cash posting, and coding. The eligibility check used by our estimate agent is the same one relied on by our verification agent later in the cycle.
              </p>

              <Link href="/products/himer">
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

          {/* Mobile / Tablet Layout */}
          <div
            className="flex lg:hidden w-full rounded-[20px] overflow-hidden flex-col"
            style={{
              background: 'linear-gradient(116.88deg, #0F68D6 49.69%, #AE87E4 69.22%)',
            }}
          >
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

            <div className="flex flex-col items-start p-[24px] sm:p-[32px] gap-[14px]">
              <div className="flex items-center gap-[4px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
                <span className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                  This isn&apos;t just an estimate tool
                </span>
              </div>

              <h3 className="type-h3 text-white tracking-[-0.01em]">
                This is one application within a platform that manages the entire revenue cycle.
              </h3>

              <p className="type-body-xxs text-[#D7DCE2] tracking-[0.01em]">
                Patient estimates operate on our proprietary HIMER AI OS, which also manages prior authorization, eligibility, denials, accounts receivable, cash posting, and coding. The eligibility check used by our estimate agent is the same one relied on by our verification agent later in the cycle.
              </p>

              <Link href="/products/himer">
                <CTA variant="dark-bg">
                  Explore HIMER AI OS
                </CTA>
              </Link>
            </div>
          </div>

          {/* ── THREE THINGS SECTION ── */}
          <div className="flex flex-col gap-[20px] lg:gap-[32px]">
            <h3 className="type-h3 text-black">
              <span className="text-electric-blue">The three things that usually</span>{' '}
              <br className="hidden lg:block" />
              stop people. None apply here.
            </h3>

            {/* Desktop: 3 cards */}
            <div className="hidden lg:flex flex-row gap-[20px]">
              {threeThingsCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-white rounded-[16px] p-[32px] flex flex-col gap-[24px] min-h-[320px]"
                >
                  <div className="w-[60px] h-[60px] relative shrink-0">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-[12px]">
                    <h5 className="type-h5 text-electric-blue">{card.title}</h5>
                    <p className="type-body-xs text-charcoal">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile / Tablet: Carousel with pagination dots */}
            <div className="flex lg:hidden flex-col gap-[16px]">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="w-full flex flex-row items-stretch gap-[16px] overflow-x-auto no-scrollbar scroll-smooth pb-[4px]"
              >
                {threeThingsCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-[16px] p-[24px] flex flex-col gap-[20px]"
                  >
                    <div className="w-[48px] h-[48px] relative shrink-0">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <h5 className="type-h5 text-electric-blue">{card.title}</h5>
                      <p className="type-body-xxs text-charcoal leading-[20px]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex flex-row items-center justify-center gap-[6px] pt-[4px]">
                {Array.from({ length: TOTAL_DOTS }).map((_, dotIdx) => {
                  const isDotActive = dotIdx === activeDotIndex;
                  return (
                    <button
                      key={dotIdx}
                      type="button"
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      onClick={() => scrollToDot(dotIdx)}
                      className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer ${
                        isDotActive
                          ? 'w-[32px] bg-[#0F68D6]'
                          : 'w-[6px] bg-[#D7DCE2] hover:bg-[#91C6F2]'
                      }`}
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

export default ThisIsntJustPatientEstimatesSection;
