'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface VerificationStep {
  title: string;
  description: string;
}

const verificationSteps: VerificationStep[] = [
  {
    title: 'Coverage verification',
    description:
      'Our agents confirm the plan is active on the service date directly with the payer, not from a cached file.',
  },
  {
    title: 'Benefit detail',
    description:
      'Copays, coinsurance, deductibles, and out-of-pocket maximums are extracted directly so your front desk has the complete picture before the patient arrives.',
  },
  {
    title: 'Patient responsibility',
    description:
      'Estimated patient responsibility is calculated prior to the visit, reducing surprise bills and improving upfront collection rates.',
  },
  {
    title: 'Secondary and tertiary coverage',
    description:
      'When patients carry more than one plan, our agents identify and verify every layer of coverage automatically.',
  },
  {
    title: 'Re-verification',
    description:
      'If anything changes between booking and the service date, coverage is re-checked so nothing is stale when the patient arrives.',
  },
];

/* Desktop opacity for each step (first = active, rest progressively dim) */
const stepOpacities = [1, 0.7, 0.6, 0.4, 0.13];

const TOTAL_DOTS = 3;

export const HowWaterlabsClosesSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
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
    <section className="w-full bg-white overflow-hidden">
      {/*
        How Waterlabs Closes the Gap:
        - Outer: white bg (page level)
        - Inner dark panel: left margin aligned with upper section's content (20px / 40px / 60px / max(60px, (100vw-1320px)/2))
        - Border radius: rounded-tl-[30px] rounded-bl-[30px] (mobile) / rounded-tl-[60px] rounded-bl-[60px] (desktop)
        - Gradient:
            Mobile: linear-gradient(180deg, #042849 16.18%, #63CCB7 178.86%)
            Desktop: linear-gradient(174.65deg, #042849 59.28%, #63CCB7 206.84%)
      */}
      <div
        className="ml-[20px] md:ml-[40px] lg:ml-[60px] xl:ml-[max(60px,calc((100vw-1320px)/2))] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] md:py-[60px] lg:py-[80px] px-[20px] md:px-[36px] lg:px-[48px] xl:px-[60px] overflow-hidden [background:linear-gradient(180deg,#042849_16.18%,#63CCB7_178.86%)] lg:[background:linear-gradient(174.65deg,#042849_59.28%,#63CCB7_206.84%)]"
      >
        <div className="w-full max-w-[1320px] flex flex-col gap-[20px] lg:gap-[32px]">
          {/* Heading */}
          <h3 className="type-h3 text-[#F4F6F9]">
            How Waterlabs <span className="text-[#63CCB7]">closes the gap</span>
          </h3>

          {/* Subheading */}
          <p className="type-body-xs text-[#D7DCE2] max-w-[873px]">
            Our agents verify every scheduled patient before the visit and again if anything changes between booking and the service date.
          </p>

          {/* Desktop Layout: Image+Description Left, Tab List Right */}
          <div className="hidden lg:flex flex-row items-start justify-between gap-[24px] xl:gap-[40px] pt-[20px]">
            {/* Left Column: Image + Description */}
            <div className="w-full lg:w-[44%] xl:w-[590px] lg:max-w-[590px] shrink-0 flex flex-col gap-[24px]">
              {/* Image */}
              <div className="relative w-full aspect-[590/287] rounded-[20px_10px_20px_20px] overflow-hidden">
                <Image
                  src="/images/solutions/how-waterlabs-closes/img_coverage_verfication.png"
                  alt={verificationSteps[activeStep].title}
                  fill
                  priority
                  sizes="(max-width: 1440px) 44vw, 590px"
                  className="object-cover object-center"
                />
              </div>

              {/* Description for active step */}
              <p className="type-body-xs text-[#D7DCE2] min-h-[48px]">
                {verificationSteps[activeStep].description}
              </p>
            </div>

            {/* Right Column: Tab List */}
            <div className="flex-1 min-w-0 flex flex-col gap-[16px] xl:gap-[24px] pt-[8px]">
              {verificationSteps.map((step, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`text-left type-h4 transition-all duration-300 cursor-pointer bg-transparent border-none outline-none p-0 whitespace-normal ${
                      isActive ? 'text-[#91C6F2]' : 'text-[#7D8690]'
                    }`}
                    style={{
                      opacity: isActive ? 1 : stepOpacities[idx],
                    }}
                    onClick={() => setActiveStep(idx)}
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
                  {/* Card Image - Flush at top taking full width, with Figma radius */}
                  <div className="relative w-full h-[166px] rounded-[20px_10px_20px_20px] overflow-hidden shrink-0">
                    <Image
                      src="/images/solutions/how-waterlabs-closes/img_coverage_verfication_mobile%20(1).png"
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
