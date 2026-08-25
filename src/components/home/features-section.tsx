'use client';

import Image from 'next/image';
import React from 'react';

import { CTA } from '@/components/CTA';

const statsData = [
  {
    icon: "/images/home/features-images/icon_30_to_70_percent_reduction.png",
    stat: "30 to 70%",
    label: "Reduction in cost to collect",
  },
  {
    icon: "/images/home/features-images/Icon.png",
    stat: "95%+",
    label: "Clean claim rate",
  },
  {
    icon: "/images/home/features-images/r_days.png",
    stat: "15–35",
    unit: "days",
    label: "Reduction in A/R days",
  },
  {
    icon: "/images/home/features-images/icon_80_percent_touchless.png",
    stat: "~80%",
    label: "Touchless resolution rate",
  },
];

const FeaturesSection: React.FC = () => {
  const statsScrollRef = React.useRef<HTMLDivElement>(null);
  const [activeStatIndex, setActiveStatIndex] = React.useState(0);

  const handleStatsScroll = () => {
    const container = statsScrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const distance = Math.abs(scrollLeft - cardLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveStatIndex(closestIndex);
  };

  const scrollToStat = (index: number) => {
    const container = statsScrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (cards[index]) {
      const cardLeft = cards[index].offsetLeft - container.offsetLeft;
      container.scrollTo({ left: cardLeft, behavior: 'smooth' });
      setActiveStatIndex(index);
    }
  };

  return (
    <section className="w-full bg-[#01051A] lg:bg-[#07157D]">
      {/* 
        This white box creates the "bottom cut out" for the section above it,
        by curving inwards on the top-left while the blue gradient background shows through.
      */}
      <div className="w-full bg-white rounded-tl-[40px] lg:rounded-tl-[60px] px-[20px] py-[60px] lg:p-[80px]">
        
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[80px] lg:gap-[120px]">
          
          {/* Row 1: Title Block (2-column layout on desktop matching Figma) */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-[24px] lg:gap-[60px]">
            {/* Left Tag */}
            <div className="lg:w-[360px] shrink-0 pt-[8px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] rounded-full bg-electric-blue shrink-0"></div>
                <span className="font-secondary text-[14px] lg:text-[16px] text-[#7D8690] font-normal">
                  Every Stage, Owned.
                </span>
              </div>
            </div>
            
            {/* Right Heading & Subheading */}
            <div className="flex-1 flex flex-col gap-[20px] lg:gap-[24px]">
              <h2 className="display-h2 tracking-[-0.01em]">
                <span className="text-[#111111]">Run end-to-end.</span>
                <br />
                <span className="text-[#111111]">Or </span>
                <span className="text-electric-blue">start with one function.</span>
              </h2>
              <p className="body-s tracking-[0em] text-[#2A2A2A]">
                The agents stay accountable either way. Prior Authorization:<br className="hidden lg:block" />
                Submitted, tracked, followed up. 24/7, no human in the queue.
              </p>
            </div>
          </div>

          {/* Row 2: Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[32px]">
            {/* Card 1 */}
            <div className="flex flex-col bg-white rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-[24px] lg:p-[32px] justify-between">
              <div className="flex flex-col gap-[12px] mb-[20px] lg:mb-[24px]">
                <h3 className="font-primary font-normal text-[24px] lg:text-[32px] text-electric-blue lg:text-[#042849] leading-[1.2]">
                  Explore Eligibility & Benefits
                </h3>
                <p className="font-secondary font-normal text-[15px] lg:text-[18px] text-[#2A2A2A] leading-[1.4]">
                  Verified in real time. Coverage gaps caught before they cost you.
                </p>
              </div>
              <div className="relative w-full aspect-[1300/574] rounded-[16px] lg:rounded-[24px] overflow-hidden">
                <Image 
                  src="/images/home/features-images/img_explore_eligibility_and_benefits.png" 
                  alt="Explore Eligibility & Benefits" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-white rounded-[24px] lg:rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-[24px] lg:p-[32px] justify-between">
              <div className="flex flex-col gap-[12px] mb-[20px] lg:mb-[24px]">
                <h3 className="font-primary font-normal text-[24px] lg:text-[32px] text-electric-blue lg:text-[#042849] leading-[1.2]">
                  Improve Denial Prevention
                </h3>
                <p className="font-secondary font-normal text-[15px] lg:text-[18px] text-[#2A2A2A] leading-[1.4]">
                  Catch and fix claims before they leave, not after they come back.
                </p>
              </div>
              <div className="relative w-full aspect-[1300/574] rounded-[16px] lg:rounded-[24px] overflow-hidden">
                <Image 
                  src="/images/home/features-images/img_denial_prevention.png" 
                  alt="Improve Denial Prevention" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
          </div>

          {/* Row 3: Healthcare-grade by default */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[4px] h-[4px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#0F68D6]"></div>
                <span className="font-general-sans text-[14px] lg:text-[16px] text-[#7D8690] tracking-wide font-normal">Healthcare-grade by default.</span>
              </div>
              <h3 className="font-general-sans font-medium text-[32px] lg:text-[48px] leading-[1.2]">
                <span className="text-[#0F68D6]">Your patient data</span>{' '}
                <span className="text-[#111111]">never leaves your environment.</span>
              </h3>
              <p className="font-general-sans text-[16px] lg:text-[18px] text-[#7D8690] leading-[1.5]">
                Our agents work inside your systems. The data stays where it is. Nothing is copied, moved, or stored on our side. After Change Healthcare showed what concentration risk really costs, this isn&apos;t a feature. It&apos;s the baseline for working in healthcare.
              </p>
            </div>
            
            {/* Right Image */}
            <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-[32px] overflow-hidden">
                <Image src="/images/home/features-images/img_your_patient_data_never_leaves_your_environment.png" alt="Healthcare Grade" fill className="object-cover" />
            </div>
          </div>

          {/* Row 4: Our Stats & Case Study */}
          <div className="flex flex-col gap-[32px] lg:gap-[40px]">
            {/* Stats Header */}
            <div className="flex flex-col gap-[12px] lg:gap-[16px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] rounded-full bg-electric-blue shrink-0"></div>
                <span className="font-secondary text-[14px] lg:text-[16px] text-[#7D8690] font-normal">
                  Measured against HFMA. Drawn from production.
                </span>
              </div>
              <h3 className="font-primary font-normal text-[32px] lg:text-[48px] leading-[1.2] text-[#111111]">
                Our stats
              </h3>
            </div>

            {/* Desktop 4-Column Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-[24px]">
              {statsData.map((item, index) => (
                <div 
                  key={`desktop-stat-${index}`}
                  className="flex flex-col justify-between p-[32px] h-[300px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100"
                >
                  <div className="relative w-[80px] h-[80px]">
                    <Image src={item.icon} alt={item.label} fill className="object-contain" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <span className="font-primary font-normal text-[40px] lg:text-[48px] text-electric-blue leading-[1]">
                      {item.stat} {item.unit && <span className="text-[24px] lg:text-[28px]">{item.unit}</span>}
                    </span>
                    <span className="font-secondary font-normal text-[16px] lg:text-[18px] text-[#4B5563] leading-[1.3]">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Swipe Slider */}
            <div className="flex lg:hidden flex-col w-full gap-[20px]">
              <div 
                ref={statsScrollRef}
                onScroll={handleStatsScroll}
                className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[16px] items-stretch [&::-webkit-scrollbar]:hidden -mx-[20px] px-[20px]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {statsData.map((item, index) => (
                  <div 
                    key={`mobile-stat-${index}`}
                    className="shrink-0 snap-start w-[280px] sm:w-[320px] flex flex-col justify-between p-[28px] h-[280px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100"
                  >
                    <div className="relative w-[72px] h-[72px]">
                      <Image src={item.icon} alt={item.label} fill className="object-contain" />
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <span className="font-primary font-normal text-[36px] text-electric-blue leading-[1]">
                        {item.stat} {item.unit && <span className="text-[22px]">{item.unit}</span>}
                      </span>
                      <span className="font-secondary font-normal text-[15px] text-[#4B5563] leading-[1.3]">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Pagination Indicators */}
              <div className="flex items-center gap-[6px] mt-[4px]">
                {statsData.map((_, i) => (
                  <button 
                    key={`stat-dot-${i}`}
                    type="button"
                    onClick={() => scrollToStat(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-[4px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${
                      activeStatIndex === i 
                        ? 'w-[24px] bg-electric-blue' 
                        : 'w-[8px] bg-[#91C6F2]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Case Study Banner */}
            <div className="flex flex-col lg:flex-row items-center bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden lg:pr-[40px] lg:gap-[60px]">
              {/* Image Side */}
              <div className="relative w-full lg:w-[55%] aspect-[4/3] lg:aspect-auto lg:h-[400px]">
                <Image 
                  src="/images/home/features-images/img_60_outsourced_staff_3_in_house_managers.png" 
                  alt="Case Study" 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              {/* Content Side */}
              <div className="flex flex-col justify-center items-start gap-[24px] p-[32px] lg:p-0 lg:w-[45%]">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="font-general-sans font-normal text-[32px] text-[#042849] leading-[1.2]">
                    60 outsourced staff <br className="hidden lg:block" />
                    <span className="relative -top-[4px]">→</span> 3 in-house managers.
                  </h3>
                  <p className="font-general-sans font-normal text-[18px] text-[#111111]">
                    Multi-state anesthesia group.
                  </p>
                </div>
                <CTA variant="light-bg" className="mt-[8px]">
                  Read the case
                </CTA>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
