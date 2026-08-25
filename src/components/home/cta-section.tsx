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
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[32px] lg:gap-[48px]">
          
          {/* Left Text Block */}
          <div className="flex flex-col gap-[12px] lg:gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[6px] h-[6px] rounded-full bg-[#38BDF8] shrink-0" />
              <span className="font-secondary font-normal text-[14px] lg:text-[16px] text-white/90 leading-[1.4]">
                See it run on your payer mix.
              </span>
            </div>
            <h2 className="font-primary font-normal text-[36px] sm:text-[44px] lg:text-[56px] text-white leading-[1.12] tracking-[-0.01em]">
              Get in touch with us.
            </h2>
          </div>

          {/* Right CTA Buttons (Exactly 2 buttons: Get a demo & Talk to a specialist) */}
          <div className="flex items-center gap-[12px] sm:gap-[16px] flex-wrap">
            <CTA variant="light-bg">
              Get a demo
            </CTA>
            <CTA 
              variant="outline" 
              className="lg:bg-white lg:text-midnight-blue lg:border-transparent lg:[&_svg]:text-midnight-blue [@media(hover:hover)]:lg:hover:bg-gradient-to-br [@media(hover:hover)]:lg:hover:from-[#042849] [@media(hover:hover)]:lg:hover:from-[40%] [@media(hover:hover)]:lg:hover:to-[#1E5667] [@media(hover:hover)]:lg:hover:text-white [@media(hover:hover)]:lg:hover:[&_svg]:text-white"
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
