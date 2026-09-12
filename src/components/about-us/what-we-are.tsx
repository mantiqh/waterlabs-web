'use client';

import React from 'react';

export const WhatWeAreSection: React.FC = () => {
  return (
    <section
      id="what-we-are"
      className="w-full overflow-hidden p-0 m-0"
      style={{
        background: 'linear-gradient(180deg, #042849 50%, #63CCB7 50%)',
      }}
    >
      {/* 
        Top Frame Container (Figma Desktop: 6211-17472 / Mobile: 6211-17835):
        - Desktop: 1440px width, 576px height, padding: 80px 60px 40px, border-radius: 0 60px 60px 0
        - Mobile: 402px width, 506px height, padding: 40px 20px, border-radius: 0 30px 30px 0
        - Background: White (#FFFFFF)
      */}
      <div className="w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] pt-[40px] pb-[40px] px-[20px] md:pt-[60px] md:pb-[40px] md:px-[40px] lg:pt-[80px] lg:pb-[40px] lg:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col justify-center">
          
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Side-by-side Row (830px image + 470px card)        */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex flex-row items-center justify-between gap-[20px] w-full">
            {/* Left Column: 3D Diagram (responsive width & aspect ratio, exact at xl+) */}
            <div
              className="w-full lg:w-[62%] xl:w-[830px] aspect-[830/456] xl:h-[456px] shrink-0 rounded-[20px] bg-cover bg-center bg-no-repeat bg-[url('/images/about-us/what-we-are/img_what_we_are.png')]"
              role="img"
              aria-label="Waterlabs 3D revenue cycle operations and agents diagram"
            />

            {/* Right Column: ICD content column (responsive width, exact at xl+) */}
            <div className="w-full lg:w-[35%] xl:w-[470px] lg:self-stretch xl:h-[456px] shrink-0 bg-[#91C6F2]/30 bg-[url('/images/about-us/what-we-are/bg_what_we_are_abstract.png')] bg-cover bg-bottom bg-no-repeat rounded-[20px_10px_20px_20px] overflow-hidden px-[24px] xl:px-[40px] py-[24px] xl:py-[20px] flex flex-col justify-center gap-[14px]">
              {/* Descriptor headline */}
              <h5 className="type-h5 text-[#0F68D6] tracking-[-0.01em]">
                What we are
              </h5>

              {/* Descriptor detail text */}
              <p className="type-body-xs text-[#2A2A2A]">
                Founded in 2024 and headquartered in India, Waterlabs builds the agents running revenue cycle operations, the system building more of them, and the memory making each agent better than the last. Hospitals, health systems, and specialist practices run their revenue cycle on Waterlabs today. 100 agents are in production.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Mobile / Tablet Layout (< lg): Single Unified Card                       */}
          {/* ========================================================================= */}
          <div className="lg:hidden w-full bg-[#91C6F2]/30 bg-[url('/images/about-us/what-we-are/bg_what_we_are_abstract.png')] bg-cover bg-bottom bg-no-repeat rounded-[20px_10px_20px_20px] overflow-hidden flex flex-col">
            {/* Top: ICD detail image (362px x 198.88px) */}
            <div
              className="w-full h-[199px] sm:h-[240px] md:h-[300px] rounded-[20px_10px_20px_20px] bg-cover bg-center bg-no-repeat bg-[url('/images/about-us/what-we-are/img_what_we_are_mob.png')]"
              role="img"
              aria-label="Waterlabs 3D revenue cycle operations and agents diagram"
            />

            {/* Bottom: ICD detail text container (padding: 12px, gap: 8px) */}
            <div className="flex flex-col p-[16px] md:p-[24px] gap-[8px]">
              <h5 className="type-h5 text-[#0F68D6] tracking-[-0.01em]">
                What we are
              </h5>
              <p className="type-body-xs text-[#2A2A2A]">
                Founded in 2024 and headquartered in India, Waterlabs builds the agents running revenue cycle operations, the system building more of them, and the memory making each agent better than the last. Hospitals, health systems, and specialist practices run their revenue cycle on Waterlabs today. 100 agents are in production.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatWeAreSection;
