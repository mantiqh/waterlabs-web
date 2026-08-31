'use client';

import React from 'react';

import { CTA } from '@/components/CTA';

export const CTASection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* 
        The banner spans 100% full width edge-to-edge across the screen,
        with rounded-tr-[40px] lg:rounded-tr-[80px] at the top-right corner,
        and its inner content is cleanly centered within the 1320px container.
      */}
      <div 
        className="w-full rounded-tr-[40px] lg:rounded-tr-[80px] bg-[#003AA5] bg-cover bg-right-top bg-no-repeat px-[20px] py-[48px] sm:px-[32px] sm:py-[60px] lg:px-[60px] lg:py-[72px]"
        style={{
          backgroundImage: "url('/images/home/get-in-touch/img_get_in_touch%20(1).png')",
        }}
      >
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[32px] lg:gap-[48px]">
          
          {/* Left Text Block */}
          <div className="flex flex-col gap-[12px] lg:gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[6px] h-[6px] rounded-full bg-[#38BDF8] shrink-0" />
              <span className="type-body-xxs text-white/90">
                See it run on your payer mix.
              </span>
            </div>
            <h2 className="type-h2 text-white">
              Get in touch with us.
            </h2>
          </div>

          {/* Right CTA Buttons (Exactly 2 buttons: Get a demo & Talk to a specialist) */}
          <div className="flex items-center gap-[12px] sm:gap-[16px] flex-wrap">
            <CTA variant="light-bg">
              Get a demo
            </CTA>
            
            {/* Small Screen: Outline Button */}
            <CTA 
              variant="outline" 
              className="lg:hidden h-[38px] text-[14px] leading-[20px]"
            >
              Talk to a specialist
            </CTA>

            {/* Desktop: Default White Button */}
            <CTA 
              variant="dark-bg" 
              className="hidden lg:inline-flex"
            >
              Talk to a specialist
            </CTA>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
