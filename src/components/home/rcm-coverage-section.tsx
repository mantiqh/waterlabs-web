'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { ChevronRight, CTA } from '@/components/CTA';

export interface RcmAgentItem {
  id: string;
  name: string;
  description: string;
  link: string;
}

export const DEFAULT_AGENTS: RcmAgentItem[] = [
  {
    id: 'eligibility',
    name: 'Eligibility & Benefits Agent',
    description:
      'Coverage is verified with the payer before the encounter and checked again if the plan changes before the service date. The gap that turns into a denial 60 days later is closed at the front door.',
    link: '/solutions/patient-estimates',
  },
  {
    id: 'prior-auth',
    name: 'Prior Authorization Agent',
    description:
      'The system decides whether an authorization is needed at order entry, submits the full package, and follows up with the payer around the clock until a determination lands on the chart. No tickler file, no one chasing status by phone.',
    link: '/solutions/prior-authorization',
  },
  {
    id: 'patient-pay',
    name: 'Patient Pay Agent',
    description:
      'A benefits-adjusted estimate is generated the moment a visit is booked, matched to the contracted rate for the specialty, and delivered to the patient before they arrive. The lookups that made pre-visit estimates impractical no longer happen.',
    link: '/solutions/patient-estimates',
  },
  {
    id: 'charge-capture',
    name: 'Charge Capture & Coding Agent',
    description:
      'Every encounter is coded from the clinical record to a claim ready to move, with services that were performed but never charged caught before the claim is built. Powered by CurieCode.',
    link: '/solutions/charge-capture-and-coding',
  },
  {
    id: 'claim-submission',
    name: 'Claim Submission & Scrubbing Agent',
    description:
      'Each claim is validated against the payer\'s current rules before it goes out, and rejections are corrected, resubmitted, and turned into a rule so the same one does not recur.',
    link: '/solutions/claim-submission-and-scrubbing',
  },
  {
    id: 'payment-posting',
    name: 'Payment Posting Agent',
    description:
      'Remittances are read and posted the day they land, at full volume, with underpayments against contracted rates flagged before they are posted and forgotten.',
    link: '/solutions/payment-posting',
  },
  {
    id: 'denial-management',
    name: 'Denial Management Agent',
    description:
      'Every denial is worked, not just the high-value ones, from root cause to filed appeal, recovering the low-balance claims that usually get written off because no one had the hours.',
    link: '/solutions/denial-management',
  },
  {
    id: 'ar-follow-up',
    name: 'AR Follow-up Agent',
    description:
      'Every aging bucket is worked with the same attention, including the claims past 120 days that a human team never reaches. Age stops deciding what gets pursued.',
    link: '/solutions/ar-follow-up',
  },
];

export interface RcmCoverageSectionProps {
  headingLine1?: string;
  headingLine2?: string;
  subtitle?: string;
  agents?: RcmAgentItem[];
}

export const RcmCoverageSection = ({
  headingLine1 = 'End - to - End',
  headingLine2 = 'RCM Coverage',
  subtitle = 'Take a single function or run the whole cycle. The agents stay accountable either way.',
  agents = DEFAULT_AGENTS,
}: RcmCoverageSectionProps) => {
  const [activeId, setActiveId] = useState<string>(agents[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Synchronize active agent with smooth scroll momentum on desktop (>= 1024px)
  useEffect(() => {
    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;
    let initialized = false;

    const updateLoop = () => {
      // Lerp smoothing factor for silky, fluid card transitions
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0005) {
        currentProgress += diff * 0.12;
      } else {
        currentProgress = targetProgress;
      }

      const activeIndex = Math.min(
        agents.length - 1,
        Math.max(0, Math.floor(currentProgress * agents.length))
      );

      setActiveId(agents[activeIndex].id);

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        rafId = requestAnimationFrame(updateLoop);
      } else {
        isRunning = false;
        rafId = null;
      }
    };

    const handleScroll = () => {
      if (typeof window === 'undefined' || window.innerWidth < 1024) return;

      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      targetProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      if (!initialized) {
        initialized = true;
        currentProgress = targetProgress;
        const initialIndex = Math.min(
          agents.length - 1,
          Math.max(0, Math.floor(currentProgress * agents.length))
        );
        setActiveId(agents[initialIndex].id);
        return;
      }

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateLoop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [agents]);

  const handleAgentClick = (index: number) => {
    setActiveId(agents[index].id);

    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const el = sectionRef.current;
      if (!el) return;

      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const targetProgress = (index + 0.5) / agents.length;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const targetScrollY = sectionTop + targetProgress * totalScrollable;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    }
  };

  const handleMobileScroll = () => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardElements = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;

    cardElements.forEach((el, index) => {
      const distance = Math.abs(el.offsetLeft - container.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024) {
      closestIndex = Math.min(closestIndex, agents.length - 2);
    }

    setCurrentIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
    const container = mobileScrollRef.current;
    if (!container) return;
    const cardElements = Array.from(container.children) as HTMLElement[];
    if (cardElements[index]) {
      container.scrollTo({
        left: cardElements[index].offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#000000] via-[#000000] to-[#0A4890] lg:h-[500vh]"
    >
      {/* Sticky Viewport Container on Desktop (>= 1024px) */}
      <div className="w-full lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        {/* 
          Curved Container:
          Desktop: border-radius 60px 0px 0px 60px, padding 80px 60px
          Mobile: border-radius 30px 0px 0px 30px, padding 40px 20px
          Background: #F4F6F9 with vector watermark texture on desktop
        */}
        <div
          className="w-full lg:min-h-screen lg:flex lg:flex-col lg:justify-center bg-[#F4F6F9] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:px-[40px] lg:py-[80px] lg:px-[60px] relative overflow-hidden"
        >
          {/* Desktop-only decorative vector watermark lines */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 pointer-events-none bg-cover bg-left-bottom bg-no-repeat z-0"
            style={{
              backgroundImage:
                "url('/images/home/end-to-end-RCM-coverage/desktop/bg_Why it matters content.png')",
            }}
          />
          <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-[32px] sm:gap-[40px] lg:gap-[24px]">
            
            {/* =========================================================
                LEFT COLUMN: Heading & Subtitle
               ========================================================= */}
            <div className="w-full lg:w-[536px] shrink-0 flex flex-col gap-[16px] lg:gap-[24px]">
              <h2 className="type-h2 tracking-[-0.01em]">
                <span className="text-[#000000] block">{headingLine1}</span>
                <span className="text-[#0F68D6] block">{headingLine2}</span>
              </h2>
              <p className="type-body-s text-[#042849] max-w-[536px]">
                {subtitle}
              </p>
            </div>

            {/* =========================================================
                DESKTOP RIGHT COLUMN: Interactive Accordion (>= 1024px)
               ========================================================= */}
            <div className="hidden lg:flex w-full lg:w-[760px] flex-col justify-center gap-[16px] min-h-[500px]">
              {agents.map((agent, index) => {
                const isActive = activeId === agent.id;

                return (
                  <div
                    key={agent.id}
                    className={`w-full rounded-[20px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'px-[24px] lg:px-[32px] py-[24px] lg:py-[32px] bg-[rgba(145,198,242,0.1)] backdrop-blur-[15.7px] border border-[rgba(15,104,214,0.12)] shadow-[0_8px_24px_rgba(15,104,214,0.04)]'
                        : 'px-[24px] lg:px-[32px] py-[8px] bg-transparent border border-transparent shadow-none backdrop-blur-none'
                    }`}
                  >
                    {/* Header Row: Title + Chevron Arrow */}
                    <button
                      type="button"
                      onClick={() => handleAgentClick(index)}
                      className="w-full text-left flex items-center gap-[12px] cursor-pointer p-0 bg-transparent border-none outline-none group"
                    >
                      <h3
                        className={`type-body-xs text-[18px] leading-[26px] transition-colors duration-300 ${
                          isActive
                            ? 'font-medium text-[#0F68D6]'
                            : 'text-[#7D8690] group-hover:text-[#0F68D6]'
                        }`}
                      >
                        {agent.name}
                      </h3>
                      <ChevronRight
                        className={`w-[12px] h-[18px] text-[#0F68D6] shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-1.5 pointer-events-none w-0 overflow-hidden'
                        }`}
                      />
                    </button>

                    {/* Collapsible Content: Description Body + CTA Button (reveals from bottom upward) */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                      }`}
                    >
                      <div
                        className={`overflow-hidden flex flex-col gap-[12px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'translate-y-0' : 'translate-y-4'
                        }`}
                      >
                        {/* Description Body */}
                        <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em] max-w-[696px] pt-[12px]">
                          {agent.description}
                        </p>

                        {/* CTA Button */}
                        <div className="pt-[8px]">
                          <Link href={agent.link}>
                            <CTA variant="light-bg">Know More</CTA>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          {/* =========================================================
              MOBILE / TABLET VIEW: Horizontal Carousel (< 1024px)
             ========================================================= */}
          <div className="flex lg:hidden flex-col gap-[20px] w-full">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex w-[calc(100%+20px)] -mr-[20px] md:w-[calc(100%+40px)] md:-mr-[40px] pr-[20px] md:pr-[40px] overflow-x-auto snap-x snap-mandatory gap-[16px] sm:gap-[20px] pb-[8px] no-scrollbar"
            >
              {agents.map((agent) => (
                <div
                  key={`mobile-${agent.id}`}
                  className="shrink-0 snap-start w-[calc(100vw-60px)] sm:w-[340px] max-w-[360px] min-h-[220px] p-[20px] rounded-[20px] bg-[rgba(145,198,242,0.1)] backdrop-blur-[15.7px] border border-[rgba(15,104,214,0.12)] flex flex-col justify-between gap-[12px] shadow-[0_8px_24px_rgba(15,104,214,0.04)]"
                >
                  {/* Card Header: Agent Title */}
                  <h3 className="type-body-m font-medium text-[#0F68D6] text-[18px] leading-[28px]">
                    {agent.name}
                  </h3>

                  {/* Card Bottom: Description & Circular Blue Arrow Button */}
                  <div className="flex flex-row items-end justify-between gap-[12px] w-full">
                    <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em] flex-1 line-clamp-4 text-[14px] leading-[20px]">
                      {agent.description}
                    </p>
                    <div className="shrink-0 pb-[2px]">
                      <Link href={agent.link} aria-label={`Know more about ${agent.name}`}>
                        <CTA
                          variant="fill-arrow"
                          className="[&_svg]:!text-white [&_svg]:!fill-white [&_path]:!fill-white"
                          aria-label={`Know more about ${agent.name}`}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {/* Trailing spacer for smooth edge alignment on last card */}
              <div className="w-[4px] shrink-0 pointer-events-none" aria-hidden="true" />
            </div>

            {/* Mobile Carousel Indicators */}
            <div className="flex items-center gap-[5px] pt-[4px]">
              {agents.map((agent, i) => {
                const isHiddenOnMd = i >= agents.length - 2;
                const isActive = currentIndex === i;
                const isAdjacent = Math.abs(currentIndex - i) === 1;
                let widthClass = 'w-[6px] bg-[rgba(15,104,214,0.2)]';
                if (isActive) {
                  widthClass = 'w-[32px] bg-[#0F68D6]';
                } else if (isAdjacent) {
                  widthClass = 'w-[16px] bg-[rgba(15,104,214,0.2)]';
                }
                return (
                  <button
                    key={`mobile-dot-${agent.id}`}
                    type="button"
                    onClick={() => scrollToCard(i)}
                    aria-label={`Go to ${agent.name}`}
                    className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${widthClass} ${
                      isHiddenOnMd ? 'md:hidden' : ''
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

export default RcmCoverageSection;
