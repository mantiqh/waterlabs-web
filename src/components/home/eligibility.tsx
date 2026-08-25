'use client';

import React from 'react';
import Image from 'next/image';
import { CTA } from '../CTA';

const EligibilitySection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F6F8F9] overflow-x-hidden">
      <div className="max-w-[1320px] mx-auto w-full px-[20px] lg:px-[60px] xl:px-[80px]">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-0">
          
          {/* LEFT SIDE (Blue with background image) */}
          <div className="w-full lg:col-span-7 relative z-10 flex flex-col pt-[60px] pb-[80px] lg:py-[120px] lg:pr-[80px]">
            
            {/* Background layer - Responsive using bg-image instead of Next Image */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full rounded-b-[40px] lg:rounded-b-none lg:rounded-tr-[60px] lg:rounded-br-[60px] z-[-1] lg:left-auto lg:right-0 lg:translate-x-0 bg-cover bg-top lg:bg-right bg-no-repeat bg-[url('/images/home/eligibility-images/we_offer_end_to_end_coverage_mobile.png')] lg:bg-[url('/images/home/eligibility-images/we_offer_end_to_end_coverage_desktop.png')]" />

            {/* Left Content */}
            <div className="w-full flex flex-col h-full">
              {/* Tag */}
              <div className="inline-flex items-center gap-[8px] bg-white/10 rounded-full px-[16px] py-[8px] mb-[32px] lg:mb-[40px] w-fit border border-white/20">
                <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                <span className="font-general-sans font-medium text-[14px] leading-[20px] text-[#D7DCE2]">
                  Front to Back. No Handoffs.
                </span>
              </div>

              {/* Title */}
              <h2 className="font-general-sans font-normal text-[36px] lg:text-[52px] leading-[1.15] tracking-[-0.01em] text-white mb-[60px] lg:mb-[80px]">
                We offer end-to-end coverage:<br className="hidden md:block" />
                from Eligibility to Coding.
              </h2>

              {/* Bottom block */}
              <div className="flex flex-col gap-[32px] lg:gap-[40px] mt-auto">
                <div className="flex flex-col gap-[8px]">
                  <span className="font-general-sans font-normal text-[20px] lg:text-[24px] text-white/80 leading-[1.33] tracking-[-0.01em]">
                    Waterlabs covers every stage:
                  </span>
                  <span className="font-general-sans font-medium text-[28px] lg:text-[48px] text-white leading-[1.16] tracking-[-0.01em]">
                    Eligibility to Coding.
                  </span>
                </div>
                
                {/* The "black one" image, now with correct border radius and responsive behavior */}
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
                
                <p className="font-general-sans font-normal text-[16px] lg:text-[24px] leading-[1.33] tracking-[-0.01em] text-[#D7DCE2] max-w-[500px]">
                  Waterlabs covers complete RCM cycle. Exceptions and customizations are handled seamlessly through the human-in-loop model. Agentic intelligence learns and evolves based on your scenarios.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Light Grey) */}
          <div className="w-full lg:col-span-5 flex flex-col pt-[80px] pb-[100px] lg:py-[120px] lg:pl-[60px] xl:pl-[80px]">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-[8px] bg-[#E1EAF4] rounded-full px-[16px] py-[8px] mb-[32px] lg:mb-[40px] w-fit">
              <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6]"></div>
              <span className="font-general-sans font-medium text-[14px] leading-[20px] text-[#0F68D6]">
                Every Stage, Owned.
              </span>
            </div>

            {/* Title */}
            <h2 className="font-general-sans font-normal text-[32px] lg:text-[48px] leading-[1.15] text-[#111111] mb-[24px] lg:mb-[32px] tracking-[-0.01em]">
              Run end-to-end.<br />
              Or start with one function.
            </h2>

            {/* Description */}
            <p className="font-secondary font-normal text-[16px] lg:text-[20px] leading-[1.6] text-[#2A2A2A] mb-[40px] lg:mb-[48px]">
              Automate only what you need. From Eligibility Verification to Claim Submissions and Payment Posting, seamlessly integrate intelligent automation into any part of your revenue cycle. Build your ideal RCM flow without disrupting your current operations.
            </p>

            {/* Button */}
            <div>
              <CTA variant="light-bg">Explore our solutions</CTA>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;
