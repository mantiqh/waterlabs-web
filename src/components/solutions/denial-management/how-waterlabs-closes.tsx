'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

interface VerificationStep {
  title: string;
  description: string;
}

const verificationSteps: VerificationStep[] = [
  {
    title: 'Denial ingestion and classification',
    description:
      'Every denial is read on arrival and sorted by cause, not just by code.',
  },
  {
    title: 'Root cause identification',
    description:
      'Our agents trace the denial back to its origin, whether eligibility check, authorization, code, or documentation.',
  },
  {
    title: 'Appeal assembly',
    description:
      "The record, payer's criteria, and supporting documentation are pulled into a filed appeal.",
  },
  {
    title: 'Deadline management',
    description:
      'Every appeal window is tracked so nothing expires waiting to be addressed.',
  },
  {
    title: 'Full-pile coverage',
    description:
      'Low-value denials are worked too because our agents are not the constraint.',
  },
  {
    title: 'Prevention feedback',
    description:
      'What our agents learn goes back upstream so a denial that happened once is less likely to recur.',
  },
  {
    title: 'Write-back to your EHR',
    description:
      'Appeal status and outcome are recorded on the claim, where AR and billing will look for them.',
  },
];

/* Desktop opacity for each step (first = active, rest progressively dim) */
const stepOpacities = [1, 0.8, 0.65, 0.5, 0.38, 0.25, 0.15];

const TOTAL_DOTS = 3;

export const HowWaterlabsClosesSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeListIndex, setActiveListIndex] = useState(verificationSteps.length);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);
  const isProgrammaticScroll = useRef(false);

  // Repeat items for seamless, continuous looping scroll
  const repeatedSteps = useMemo(() => {
    const LOOP_COPIES = 3;
    return Array.from({ length: LOOP_COPIES }).flatMap((_, setIndex) =>
      verificationSteps.map((step, originalIndex) => ({
        ...step,
        originalIndex,
        uniqueIndex: setIndex * verificationSteps.length + originalIndex,
      }))
    );
  }, []);

  // Position at middle set on mount
  useEffect(() => {
    if (!listRef.current) return;
    const container = listRef.current;
    const items = container.children;
    const N = verificationSteps.length;
    if (items.length >= 2 * N) {
      const firstItem = items[0] as HTMLElement;
      const midItem = items[N] as HTMLElement;
      if (firstItem && midItem) {
        const cycleHeight = midItem.offsetTop - firstItem.offsetTop;
        container.scrollTop = cycleHeight;
      }
    }
  }, []);

  const scrollToStep = (index: number) => {
    if (!listRef.current) return;
    const container = listRef.current;
    const items = container.children;
    if (items[index]) {
      const targetItem = items[index] as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetItem.getBoundingClientRect();
      const targetTop = targetRect.top - containerRect.top + container.scrollTop;

      isProgrammaticScroll.current = true;
      container.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
      const realStep = index % verificationSteps.length;
      activeStepRef.current = realStep;
      setActiveStep(realStep);
      setActiveListIndex(index);
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
    }
  };

  const handleDesktopScroll = () => {
    if (isProgrammaticScroll.current || !listRef.current) return;
    const container = listRef.current;
    const items = container.children;
    const N = verificationSteps.length;
    if (items.length < 2 * N) return;

    const firstItem = items[0] as HTMLElement;
    const midItem = items[N] as HTMLElement;
    if (!firstItem || !midItem) return;

    const singleCycleHeight = midItem.offsetTop - firstItem.offsetTop;
    if (singleCycleHeight > 0) {
      if (container.scrollTop >= 2 * singleCycleHeight) {
        container.scrollTop -= singleCycleHeight;
      } else if (container.scrollTop <= 0.2 * singleCycleHeight) {
        container.scrollTop += singleCycleHeight;
      }
    }

    const containerRect = container.getBoundingClientRect();
    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLElement;
      if (!item) continue;
      const itemRect = item.getBoundingClientRect();
      const diff = Math.abs(itemRect.top - containerRect.top);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    const realStep = closestIndex % N;
    setActiveListIndex(closestIndex);
    if (realStep !== activeStepRef.current) {
      activeStepRef.current = realStep;
      setActiveStep(realStep);
    }
  };
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
    <section className="w-full bg-white overflow-hidden">
      <div
        className="ml-[20px] md:ml-[40px] lg:ml-[60px] xl:ml-[max(60px,calc((100vw-1320px)/2))] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] md:py-[60px] lg:py-[80px] px-[20px] md:px-[36px] lg:px-[48px] xl:px-[60px] overflow-hidden [background:linear-gradient(180deg,#042849_16.18%,#63CCB7_178.86%)] lg:[background:linear-gradient(174.65deg,#042849_59.28%,#63CCB7_206.84%)]"
      >
        <div className="w-full max-w-[1320px] flex flex-col gap-[20px] lg:gap-[32px]">
          {/* Heading */}
          <h3 className="type-h3 text-[#F4F6F9]">
            How Waterlabs{' '}
            <br className="lg:hidden" />
            <span className="text-[#63CCB7]">closes the gap</span>
          </h3>

          {/* Subheading */}
          <p className="type-body-xs text-[#D7DCE2] max-w-[873px]">
            Our agents work every denial regardless of value, so the pile stops being a triage problem.
          </p>

          {/* Desktop Layout: Image+Description Left, Tab List Right */}
          <div className="hidden lg:flex flex-row items-start justify-between gap-[24px] xl:gap-[40px] pt-[20px]">
            {/* Left Column: Image + Description */}
            <div className="w-full lg:w-[44%] xl:w-[590px] lg:max-w-[590px] shrink-0 flex flex-col gap-[24px]">
              {/* Image */}
              <div className="relative w-full aspect-[590/287] rounded-[20px_10px_20px_20px] overflow-hidden">
                <Image
                  src="/images/solutions/solutions-denialmanagement/how-waterlabs-closes/img_waterlab_closes_the_gap%20(3).png"
                  alt={verificationSteps[activeStep].title}
                  fill
                  priority
                  sizes="(max-width: 1440px) 44vw, 590px"
                  className="object-cover object-center"
                />
              </div>

              {/* Description for active step */}
              <p className="type-body-xs text-[#D7DCE2] min-h-[48px] transition-opacity duration-300">
                {verificationSteps[activeStep].description}
              </p>
            </div>

            {/* Right Column: Tab List */}
            <div
              ref={listRef}
              onScroll={handleDesktopScroll}
              className="flex-1 min-w-0 h-[360px] xl:h-[380px] overflow-y-auto no-scrollbar flex flex-col gap-[16px] xl:gap-[20px] pt-[8px] pr-[12px]"
            >
              {repeatedSteps.map((step) => {
                const isActive = step.uniqueIndex === activeListIndex;
                const distance = step.uniqueIndex - activeListIndex;
                const opacity = isActive
                  ? 1
                  : distance > 0
                  ? (stepOpacities[distance] ?? 0.15)
                  : 0.15;

                return (
                  <button
                    key={step.uniqueIndex}
                    type="button"
                    className={`text-left type-h4 transition-all duration-300 cursor-pointer bg-transparent border-none outline-none p-0 whitespace-normal ${
                      isActive ? 'text-[#91C6F2]' : 'text-[#7D8690]'
                    }`}
                    style={{
                      opacity,
                    }}
                    onClick={() => scrollToStep(step.uniqueIndex)}
                  >
                    {step.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet: Horizontal Scroll Cards */}
          <div className="flex lg:hidden flex-col gap-[16px]">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="w-full flex flex-row items-stretch gap-[12px] overflow-x-auto no-scrollbar scroll-smooth pb-[4px]"
            >
              {verificationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="w-[320px] sm:w-[342px] shrink-0 flex flex-col rounded-[20px_10px_20px_20px] overflow-hidden"
                  style={{
                    background: 'rgba(17, 17, 17, 0.3)',
                  }}
                >
                  {/* Card Image */}
                  <div className="relative w-full h-[166px] rounded-[20px_10px_20px_20px] overflow-hidden shrink-0">
                    <Image
                      src="/images/solutions/solutions-denialmanagement/how-waterlabs-closes/img_waterlab_closes_the_gap%20(3).png"
                      alt={step.title}
                      fill
                      sizes="342px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Card Text */}
                  <div className="flex flex-col gap-[8px] p-[12px]">
                    <h4 className="type-h5 text-[#91C6F2] text-[20px] leading-[28px] tracking-[-0.01em]">
                      {step.title}
                    </h4>
                    <p className="type-body-xs text-[#D7DCE2] text-[14px] leading-[24px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-[8px] shrink-0" />
            </div>

            {/* Mobile Carousel Indicators */}
            <div className="flex flex-row items-center gap-[5px] pt-[8px]">
              {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
                const isActive = activeDotIndex === i;
                const diff = Math.abs(activeDotIndex - i);
                const widthClass = isActive
                  ? 'w-[32px] bg-white'
                  : diff === 1
                  ? 'w-[16px] bg-white/20'
                  : 'w-[6px] bg-white/20';

                return (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => scrollToDot(i)}
                    aria-label={`Go to step group ${i + 1}`}
                    className={`h-[6px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${widthClass}`}
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

export default HowWaterlabsClosesSection;
