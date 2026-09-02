'use client';

import React from 'react';

import { CTA } from '@/components/CTA';

export const PhilosophyCTASection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50%">
      {/* 
        Top Frame Container (Figma Frame 2147226494 / Frame 1272628356):
        - Desktop: 1440px x 288px, background #0F68D6, rounded-tr-[60px] rounded-br-[60px], padding: 60px
        - Mobile: 402px x 246px, background #0F68D6, rounded-tr-[30px] rounded-br-[30px], padding: 40px 20px
      */}
      <div className="w-full bg-[#0F68D6] rounded-tr-[30px] rounded-bl-[0px] rounded-br-[30px] lg:rounded-tr-[20px] lg:rounded-bl-[20px] lg:rounded-br-[0px] py-[40px] px-[20px] md:py-[50px] md:px-[40px] lg:py-[60px] lg:px-[60px] overflow-hidden">
        
        {/* Content Container (Frame 2147226500: max-w-[1320px]) */}
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-[20px] lg:gap-[40px]">
          
          {/* Text Block (Heading + Subtext) */}
          <div className="flex flex-col gap-[8px] lg:gap-[12px] max-w-[900px]">
            <h3 className="type-h3 text-white">
              Explore our solution.
            </h3>
            <p className="type-body-m text-white/90">
              HIMER AI OS powers all our agents, embedding twenty years of revenue cycle expertise into agentic AI.
            </p>
          </div>

          {/* CTA Button */}
          <div className="shrink-0 flex items-center">
            <CTA variant="dark-bg">
              Discover the Platform
            </CTA>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PhilosophyCTASection;
