'use client';

import Image from 'next/image';
import React from 'react';

const EligibilitySection: React.FC = () => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        The main card spans from the left screen edge (0px) to the right edge of the top section's 1320px container.
        On screens >= 1440px, the inner content stays aligned with the centered 1320px container, while the blue background spreads left.
        On 1024px, it respects the 60px right margin matching the section above.
      */}
      <div className="relative w-full lg:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] px-[20px] py-[40px] lg:py-[80px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-[60px] flex flex-col justify-between gap-[36px] lg:gap-[48px] overflow-hidden isolate bg-[#0F68D6]">
        
        {/* Background Image (Figma spec) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Desktop Graphic */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src="/images/home/eligibility-images/we_offer_end_to_end_coverage_desktop.png"
              alt="Eligibility Background Pattern"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          {/* Mobile Graphic */}
          <div className="block lg:hidden absolute inset-0">
            <Image
              src="/images/home/eligibility-images/we_offer_end_to_end_coverage_mobile.png"
              alt="Eligibility Background Pattern Mobile"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Top Header Block (Figma Frame: Icon and Text, gap: 20px) */}
        <div className="relative z-10 w-full flex flex-col gap-[16px] lg:gap-[20px]">
          {/* Tagline */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-white shrink-0" />
            <span className="font-secondary font-normal text-[14px] lg:text-[16px] leading-[24px] text-[#D7DCE2] tracking-[0.01em]">
              Front to Back. No Handoffs.
            </span>
          </div>

          {/* Main Title (Display/H2: 52px / 60px) */}
          <h2 className="font-primary font-normal text-[32px] sm:text-[40px] lg:text-[52px] leading-[40px] lg:leading-[60px] tracking-[-0.01em] text-white max-w-[702px]">
            We offer end-to-end coverage:<br />
            from Eligibility to Coding.
          </h2>
        </div>

        {/* Bottom Content - 3 columns on desktop (Figma Frame: Icon and Image, gap: 32px, height: 329px) */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-[24px] lg:gap-[32px]">

          {/* Left Column (315px width) */}
          <div className="w-full lg:w-[315px] shrink-0 flex flex-col justify-center gap-[12px] lg:gap-[16px]">
            <span className="font-primary font-normal text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] tracking-[-0.01em] text-white">
              Waterlabs covers every stage:
            </span>
            <h3 className="font-primary font-normal text-[32px] sm:text-[36px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-white tracking-[-0.01em]">
              Eligibility to<br className="hidden lg:block" /> Coding.
            </h3>
          </div>

          {/* Center Column - Interactive AI Diagram Card (541px x 329px) */}
          <div className="w-full lg:w-[541px] shrink-0 flex justify-center">
            <div className="w-full max-w-[541px] relative rounded-[20px] overflow-hidden bg-black aspect-[541/329] flex items-center justify-center shadow-2xl">
              <Image
                src="/images/home/eligibility-images/img_eliigibility_to_coding.png"
                alt="Waterlabs AI - Patient Discovery, Document & Claim Handling, Revenue Collecting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 541px"
                className="object-contain p-[12px]"
              />
            </div>
          </div>

          {/* Right Column - Descriptive Text (315px width, Display/H6: 24px / 32px) */}
          <div className="w-full lg:w-[315px] shrink-0 flex flex-col justify-center">
            <p className="font-primary font-normal text-[15px] sm:text-[18px] lg:text-[20px] xl:text-[24px] leading-[24px] sm:leading-[26px] lg:leading-[30px] xl:leading-[32px] text-white tracking-[-0.01em]">
              Waterlabs covers complete RCM cycle. Exceptions and customizations are handled seamlessly through the human-in-loop model. Agentic intelligence learns and evolves based on your scenarios.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EligibilitySection;

