'use client';

import Image from 'next/image';
import React from 'react';

export const WhosTrustingUsSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#374D5D] lg:from-[#36434B] to-[#F4F6F9]">
      {/* 
        Who's Trusting Us Section (Desktop: 4081-10784 / Mobile: 4081-11031):
        - Wrapper: Gradient #374D5D (mobile) / #36434B (desktop) -> #F4F6F9
        - Inner Container: White background with border-radius: 60px 0 0 60px (desktop) / 30px 0 0 30px (mobile)
        - Desktop: padding 80px 60px, gap 48px
        - Mobile: padding 40px 20px 20px, gap 32px
      */}
      <div className="w-full bg-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] pb-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col items-start gap-[32px] md:gap-[40px] lg:gap-[48px]">
          
          {/* Tag & Heading Block */}
          <div className="flex flex-col items-start gap-[8px] lg:gap-[14px] w-full max-w-none">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                Who&apos;s trusting us with their revenue.
              </span>
            </div>

            {/* Main Section Heading: Single line on desktop, two lines on mobile */}
            <h2 className="type-h4 lg:whitespace-nowrap">
              <span className="text-[#0F68D6]">16 functions. 20 systems.</span>
              <span className="hidden lg:inline">&nbsp;</span>
              <br className="block lg:hidden" />
              <span className="text-black">Every specialty.</span>
            </h2>
          </div>

          {/* Logo Row / Mobile Slider + Subheading */}
          <div className="w-full flex flex-col items-start justify-center gap-[20px]">
            {/* Logos: Horizontal slider on mobile with peek, space-between on desktop */}
            <div className="w-full flex flex-row flex-nowrap items-center justify-start lg:justify-between gap-[45px] lg:gap-[82px] py-[10px] overflow-x-auto no-scrollbar scroll-smooth">
              {/* HHA-eXchange */}
              <div className="relative w-[150px] h-[68px] sm:w-[220px] sm:h-[100px] lg:w-[324px] lg:h-[147px] shrink-0 flex items-center justify-center">
                <Image
                  src="/images/about-us/who's-trusting-us/hha_exchange_logo.png"
                  alt="HHA-eXchange"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 220px, 324px"
                />
              </div>

              {/* Qualifacts */}
              <div className="relative w-[166px] h-[60px] sm:w-[260px] sm:h-[95px] lg:w-[382px] lg:h-[139px] shrink-0 flex items-center justify-center">
                <Image
                  src="/images/about-us/who's-trusting-us/qualifacts_logo.png"
                  alt="Qualifacts"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 166px, (max-width: 1024px) 260px, 382px"
                />
              </div>

              {/* PCRCM */}
              <div className="relative w-[149px] h-[40px] sm:w-[200px] sm:h-[54px] lg:w-[277px] lg:h-[75px] shrink-0 flex items-center justify-center">
                <Image
                  src="/images/about-us/who's-trusting-us/pc_revenue_cycle_management.png"
                  alt="PC Revenue Cycle Management"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 149px, (max-width: 1024px) 200px, 277px"
                />
              </div>
            </div>

            {/* Sub-heading */}
            <h3 className="type-h5 text-[#0F68D6] pt-[8px] lg:pt-[12px]">
              All EHRs. All specialties.
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhosTrustingUsSection;
