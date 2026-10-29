'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

interface VerificationStep {
  title: string;
  description: string;
}

const verificationSteps: VerificationStep[] = [
  {
    title: 'Charge capture',
    description:
      'Our agents identify services that were performed but not charged, before a claim is built.',
  },
  {
    title: 'Code assignment',
    description:
      'The system reads the clinical record and assigns the diagnosis and procedure codes the documentation supports.',
  },
  {
    title: 'Compliance check',
    description: 'Coding is checked against rules before submission, not after payer objections.',
  },
  {
    title: 'Payer rule validation',
    description:
      "Codes are checked against the payer's policy so a technically correct code that the payer will reject is caught first.",
  },
  {
    title: 'Confidence escalation',
    description:
      'Anything our agents cannot clear confidently goes to a certified coder with reasoning attached.',
  },
  {
    title: 'Audit trail',
    description:
      'Every code carries the evidence that produced it, recorded as the code is assigned.',
  },
];

/* Desktop opacity for each step (first = active, rest progressively dim) */
const stepOpacities = [1, 0.75, 0.6, 0.45, 0.3, 0.15];

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
      })),
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
    if (realStep !== activeStepRef.current) {
      activeStepRef.current = realStep;
      setActiveStep(realStep);
    }
    setActiveListIndex(closestIndex);
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
        Math.max(0, Math.round(scrollRatio * (TOTAL_DOTS - 1))),
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
    <section className="w-full overflow-hidden bg-white">
      {/*
        How Waterlabs Closes the Gap:
        - Outer: white bg (page level)
        - Inner dark panel: left margin aligned with upper section's content
        - Border radius: rounded-tl-[30px] rounded-bl-[30px] (mobile) / rounded-tl-[60px] rounded-bl-[60px] (desktop)
        - Gradient:
            Mobile: linear-gradient(180deg, #042849 16.18%, #63CCB7 178.86%)
            Desktop: linear-gradient(174.65deg, #042849 59.28%, #63CCB7 206.84%)
      */}
      <div className="ml-[20px] overflow-hidden rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[40px] [background:linear-gradient(180deg,#042849_16.18%,#63CCB7_178.86%)] md:ml-[40px] md:px-[36px] md:py-[60px] lg:ml-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[48px] lg:py-[80px] lg:[background:linear-gradient(174.65deg,#042849_59.28%,#63CCB7_206.84%)] xl:ml-[max(60px,calc((100vw-1320px)/2))] xl:px-[60px]">
        <div className="flex w-full max-w-[1320px] flex-col gap-[20px] lg:gap-[32px]">
          {/* Heading */}
          <h3 className="type-h3 text-[#F4F6F9]">
            How Waterlabs <br className="lg:hidden" />
            <span className="text-[#63CCB7]">closes the gap</span>
          </h3>

          {/* Subheading */}
          <p className="type-body-xs max-w-[873px] text-[#D7DCE2]">
            Our agents work every encounter from the clinical record to a claim ready to move.
          </p>

          {/* Desktop Layout: Image+Description Left, Tab List Right */}
          <div className="hidden flex-row items-start justify-between gap-[24px] pt-[20px] lg:flex xl:gap-[40px]">
            {/* Left Column: Image + Description */}
            <div className="flex w-full shrink-0 flex-col gap-[24px] lg:w-[44%] lg:max-w-[590px] xl:w-[590px]">
              {/* Image */}
              <div className="relative aspect-[590/287] w-full overflow-hidden rounded-[20px_10px_20px_20px]">
                <Image
                  src="/images/solutions/solutions-charge-capture-&-coding/how-waterlabs-closes/img_waterlab_closes_the_gap%20(1).png"
                  alt={verificationSteps[activeStep].title}
                  fill
                  priority
                  sizes="(max-width: 1440px) 44vw, 590px"
                  className="object-cover object-center"
                />
              </div>

              {/* Description for active step */}
              <p className="type-body-xs min-h-[48px] text-[#D7DCE2] transition-opacity duration-300">
                {verificationSteps[activeStep].description}
              </p>
            </div>

            {/* Right Column: Tab List */}
            <div
              ref={listRef}
              onScroll={handleDesktopScroll}
              className="no-scrollbar flex h-[360px] min-w-0 flex-1 flex-col gap-[16px] overflow-y-auto pt-[8px] pr-[12px] xl:h-[380px] xl:gap-[20px]"
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
                    className={`type-h4 cursor-pointer border-none bg-transparent p-0 text-left whitespace-normal transition-all duration-300 outline-none ${
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
          <div className="flex flex-col gap-[16px] lg:hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="no-scrollbar flex w-full flex-row items-stretch gap-[12px] overflow-x-auto scroll-smooth pb-[4px]"
            >
              {verificationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[20px_10px_20px_20px] sm:w-[342px]"
                  style={{
                    background: 'rgba(17, 17, 17, 0.3)',
                  }}
                >
                  {/* Card Image */}
                  <div className="relative h-[166px] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px]">
                    <Image
                      src="/images/solutions/solutions-charge-capture-&-coding/how-waterlabs-closes/img_waterlab_closes_the_gap%20(1).png"
                      alt={step.title}
                      fill
                      sizes="342px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Card Text */}
                  <div className="flex flex-col gap-[8px] p-[12px]">
                    <h4 className="type-h5 text-[20px] leading-[28px] tracking-[-0.01em] text-[#91C6F2]">
                      {step.title}
                    </h4>
                    <p className="type-body-xs text-[14px] leading-[24px] text-[#D7DCE2]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* End spacer */}
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
                    className={`h-[6px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${widthClass}`}
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
