'use client';

import Image from 'next/image';
import React from 'react';


const EligibilitySection: React.FC = () => {
  return (
    <section className="relative w-full ">
      <div className="max-w-[1320px] mx-auto w-full relative z-10">
        
        {/* Blue Background Layer */}
        {/* On mobile: full width centered. On desktop: anchored to right edge of container, extending 100vw to the left */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full rounded-[40px] lg:rounded-[0px] lg:rounded-tr-[60px] lg:rounded-br-[60px] z-[-1] lg:left-auto lg:right-0 lg:translate-x-0 bg-[#0F68D6] bg-cover bg-top lg:bg-right bg-no-repeat bg-[url('/images/home/eligibility-images/we_offer_end_to_end_coverage_mobile.png')] lg:bg-[url('/images/home/eligibility-images/we_offer_end_to_end_coverage_desktop.png')]" />

        {/* Content (Top block + 3-column bottom block) */}
        <div className="w-full flex flex-col pt-[60px] pb-[80px] lg:pt-[100px] lg:pb-[120px]">
          
          {/* Top Content */}
          <div className="w-full flex flex-col mb-[60px] lg:mb-[80px]">
            {/* Tag */}
            <div className="inline-flex items-center gap-[8px] bg-white/10 rounded-full px-[16px] py-[8px] mb-[32px] lg:mb-[40px] w-fit border border-white/20">
              <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
              <span className="font-general-sans font-medium text-[14px] leading-[20px] text-[#D7DCE2]">
                Front to Back. No Handoffs.
              </span>
            </div>

            {/* Title */}
            <h2 className="font-general-sans font-normal text-[36px] lg:text-[52px] xl:text-[56px] leading-[1.15] tracking-[-0.01em] text-white">
              We offer end-to-end coverage:<br className="hidden md:block" />
              from Eligibility to Coding.
            </h2>
          </div>

          {/* Bottom Content - 3 columns on desktop */}
          <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-[40px] lg:gap-[60px] items-center">
            
            {/* Left Column */}
            <div className="flex flex-col gap-[8px]">
              <span className="font-general-sans font-normal text-[20px] lg:text-[24px] text-white/80 leading-[1.33] tracking-[-0.01em]">
                Waterlabs covers every stage:
              </span>
              <span className="font-general-sans font-medium text-[28px] lg:text-[40px] xl:text-[48px] text-white leading-[1.16] tracking-[-0.01em]">
                Eligibility to <br className="hidden lg:block" />Coding.
              </span>
            </div>
            
            {/* Middle Column */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-[400px] rounded-[20px] overflow-hidden">
                <Image 
                  src="/images/home/eligibility-images/img_eliigibility_to_coding.png" 
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, 400px"
                  alt="RCM Cycle" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col">
              <p className="font-general-sans font-normal text-[16px] lg:text-[18px] xl:text-[20px] leading-[1.5] tracking-[-0.01em] text-[#D7DCE2]">
                Waterlabs covers complete RCM cycle. Exceptions and customizations are handled seamlessly through the human-in-loop model. Agentic intelligence learns and evolves based on your scenarios.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;
