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
      <div className="w-full lg:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto bg-[#01191E] lg:bg-[#0E7FA8] rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] bg-cover bg-no-repeat bg-left-top bg-[url('/images/home/eligibility-images/we_offer_end_to_end_coverage_mobile.png')] lg:bg-[url('/images/home/eligibility-images/we_offer_end_to_end_coverage_desktop.png')] px-[20px] py-[60px] lg:pt-[80px] lg:pb-[80px] lg:pl-[max(60px,calc((100vw-1320px)/2))] lg:pr-[60px] flex flex-col gap-[36px] lg:gap-[48px]">


        {/* Top Header Block */}
        <div className="w-full flex flex-col gap-[16px] lg:gap-[20px]">
          {/* Tagline */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[6px] h-[6px] rounded-full bg-white shrink-0" />
            <span className="font-secondary font-normal text-[14px] lg:text-[16px] text-[#D7DCE2] leading-[1.4]">
              Front to Back. No Handoffs.
            </span>
          </div>

          {/* Main Title */}
          <h2 className="font-primary font-normal text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.12] tracking-[-0.01em] text-white">
            We offer end-to-end coverage:<br />
            from Eligibility to Coding.
          </h2>
        </div>

        {/* Bottom Content - 3 columns on desktop, vertical stack on mobile */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-[32px] lg:gap-[40px] items-center">

          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-[12px] lg:gap-[16px]">
            <span className="font-secondary font-normal text-[18px] lg:text-[22px] leading-[1.3] text-[#D7DCE2]">
              Waterlabs covers every stage:
            </span>
            <h3 className="font-primary font-normal text-[32px] sm:text-[36px] lg:text-[44px] xl:text-[48px] leading-[1.12] text-white tracking-[-0.01em]">
              Eligibility to<br className="hidden lg:block" /> Coding.
            </h3>
          </div>

          {/* Center Column - Interactive AI Diagram Card */}
          <div className="lg:col-span-4 flex justify-center w-full">
            <div className="w-full max-w-[420px] relative rounded-[20px] lg:rounded-[24px] overflow-hidden bg-black aspect-[1082/658] flex items-center justify-center shadow-lg">
              <Image
                src="/images/home/eligibility-images/img_eliigibility_to_coding.png"
                alt="Waterlabs AI - Patient Discovery, Document & Claim Handling, Revenue Collecting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain p-[8px]"
              />
            </div>
          </div>

          {/* Right Column - Descriptive Paragraph */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <p className="font-secondary font-normal text-[16px] lg:text-[18px] xl:text-[20px] leading-[1.5] text-[#D7DCE2] max-w-[440px]">
              Waterlabs covers complete RCM cycle. Exceptions and customizations are handled seamlessly through the human-in-loop model. Agentic intelligence learns and evolves based on your scenarios.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EligibilitySection;

