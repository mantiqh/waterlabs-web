'use client';

import Image from 'next/image';
import React from 'react';

export const WhatWeDoMattersSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#B8B1A5] from-50% to-[#F4F6F9] to-50% overflow-hidden">
      {/* 
        White Wrapper Frame with top-right and bottom-right rounded corners:
        - Desktop: rounded-tr-[60px] rounded-br-[60px]
        - Mobile: rounded-tr-[30px] rounded-br-[30px]
        - Reveals #B8B1A5 at the top-right and #F4F6F9 at the bottom-right.
      */}
      <div className="w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] pt-[40px] px-[20px] pb-[20px] lg:py-[80px] lg:px-[60px] overflow-hidden">
        
        {/* 
          Main Dark Card
          Desktop: 1320px x 650px, rounded-tl-[20px] rounded-tr-[20px] rounded-br-[40px] rounded-bl-[20px], p-[32px] lg:p-[48px]
          Mobile: rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px], p-[20px]
        */}
        <div 
          className="relative w-full max-w-[1320px] mx-auto min-h-[538px] lg:min-h-[650px] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] lg:rounded-br-[40px] lg:rounded-bl-[20px] p-[20px] sm:p-[28px] lg:p-[48px] flex flex-col justify-between gap-[32px] lg:gap-[40px] overflow-hidden bg-[#042849]"
        >
          {/* Background Architectural Image */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Image
              src="/images/careers/what-we-do-matters/img_why_do_we_matters_bg_image.png"
              alt="Architectural surfaces background"
              fill
              priority
              className="object-cover object-center opacity-90 mix-blend-overlay"
            />
          </div>

          {/* Top Header Block */}
          <div className="relative z-10 w-full flex flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#63CCB7] shrink-0" />
              <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#D7DCE2] tracking-[0.01em]">
                Why Waterlabs
              </span>
            </div>

            {/* Title */}
            <h2 className="font-primary font-normal text-[32px] lg:text-[52px] leading-[40px] lg:leading-[60px] tracking-[-0.01em] text-white">
              Why what we do matters.
            </h2>
          </div>

          {/* Bottom Content Area */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row items-start justify-between gap-[16px] lg:gap-[40px]">
            {/* Left Column: Subheading */}
            <div className="w-full lg:w-[508px] shrink-0">
              <h3 className="font-primary font-normal text-[20px] lg:text-[32px] leading-[28px] lg:leading-[40px] tracking-[-0.01em] text-white">
                This is a hard problem to solve.
              </h3>
            </div>

            {/* Right Column: Paragraph & Team Image */}
            <div className="w-full lg:w-[496px] flex flex-col gap-[16px]">
              <p className="font-secondary font-normal text-[14px] lg:text-[18px] leading-[24px] lg:leading-[26px] text-[#D7DCE2]">
                Revenue cycle is one of the hardest problems in healthcare. Here, the rules are complex, the exceptions are abundant, and the stakes are high. Whether you&apos;re defining software, running operations, or working with customers, you&apos;ll be solving problems that don&apos;t come in playbooks.
              </p>

              {/* Team Image with custom border-radius */}
              <div className="relative w-full aspect-[322/182] lg:aspect-[496/250] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[40px] lg:rounded-tr-[10px] lg:rounded-br-[40px] lg:rounded-bl-[10px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                <Image
                  src="/images/careers/what-we-do-matters/ing_this_is_a_hard_problem_to_solve.png"
                  alt="Problem Solving Team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 496px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatWeDoMattersSection;
