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
      <div className="relative w-full md:w-[calc(100%-40px)] lg:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] px-[20px] md:px-[40px] py-[40px] lg:py-[80px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-[60px] flex flex-col justify-between gap-[36px] lg:gap-[48px] overflow-hidden isolate bg-[#0F68D6]">
        
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
            <span className="type-body-xxs text-[#D7DCE2] tracking-[0.01em]">
              Front to Back. No Handoffs.
            </span>
          </div>

          {/* Main Title (Display/H2: 52px / 60px) */}
          <h2 className="type-h2 text-white max-w-[702px]">
            We offer end-to-end coverage:<br />
            from Eligibility to Coding.
          </h2>
        </div>

        {/* Bottom Content - 3 columns on desktop (Figma Frame: Icon and Image, gap: 32px, height: 329px) */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-[24px] lg:gap-[20px] xl:gap-[32px]">

          {/* Left Column */}
          <div className="w-full lg:w-auto lg:flex-1 min-w-0 xl:max-w-[315px] flex flex-col justify-center gap-[12px] lg:gap-[16px]">
            <span className="type-h6 text-white">
              Waterlabs covers every stage:
            </span>
            <h3 className="type-h3 text-white">
              Eligibility to<br className="hidden lg:block" /> Coding.
            </h3>
          </div>

          {/* Center Column - Interactive AI Diagram Card */}
          <div className="w-full lg:w-[42%] xl:w-[541px] min-w-0 shrink-0 flex justify-center">
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

          {/* Right Column - Descriptive Text */}
          <div className="w-full lg:w-auto lg:flex-1 min-w-0 xl:max-w-[315px] flex flex-col justify-center">
            <p className="type-body-s text-white">
              Waterlabs covers complete RCM cycle. Exceptions and customizations are handled seamlessly through the human-in-loop model. Agentic intelligence learns and evolves based on your scenarios.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EligibilitySection;

