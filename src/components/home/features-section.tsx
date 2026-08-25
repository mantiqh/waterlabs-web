'use client';

import Image from 'next/image';
import React from 'react';

import { CTA } from '@/components/CTA';

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#0F68D6] to-[#91C6F2]">
      {/* 
        This white box creates the "bottom cut out" for the section above it,
        by curving inwards on the top-left while the blue gradient background shows through.
      */}
      <div className="w-full bg-white rounded-tl-[40px] lg:rounded-tl-[60px] px-[20px] py-[60px] lg:p-[80px]">
        
        <div className="max-w-[1320px] mx-auto flex flex-col gap-[80px] lg:gap-[120px]">
          
          {/* Row 1: Title Block */}
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[4px] h-[4px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#0F68D6]"></div>
              <span className="font-general-sans text-[14px] lg:text-[16px] text-[#7D8690] tracking-wide font-normal">Every Stage, Owned.</span>
            </div>
            
            <h2 className="font-general-sans font-medium text-[32px] leading-[1.2] lg:text-[56px] lg:leading-[1.1]">
              <span className="text-[#0F68D6]">Run end-to-end.</span>
              <br className="hidden lg:block" />
              <span className="text-[#111111]">Or start with one function.</span>
            </h2>
            <p className="font-general-sans text-[16px] lg:text-[20px] text-[#7D8690] max-w-[600px] leading-[1.4]">
              The agents stay accountable either way. Prior Authorization: Submitted, tracked, followed up. 24/7, no human in the queue.
            </p>
          </div>

          {/* Row 2: Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
            {/* Card 1 */}
            <div className="flex flex-col bg-[#F6F8F9] rounded-[32px] overflow-hidden">
              <div className="p-[32px] lg:p-[48px] flex flex-col gap-[12px]">
                <h3 className="font-general-sans font-medium text-[24px] lg:text-[32px] text-[#111111] leading-[1.2]">Explore Eligibility & Benefits</h3>
                <p className="font-general-sans text-[16px] lg:text-[18px] text-[#7D8690] leading-[1.4]">
                  Verified in real time. Coverage gaps caught before they cost you.
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] mt-auto">
                <Image src="/images/home/features-images/img_explore_eligibility_and_benefits.png" alt="Eligibility" fill className="object-cover" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-[#F6F8F9] rounded-[32px] overflow-hidden">
              <div className="p-[32px] lg:p-[48px] flex flex-col gap-[12px]">
                <h3 className="font-general-sans font-medium text-[24px] lg:text-[32px] text-[#111111] leading-[1.2]">Improve Denial Prevention</h3>
                <p className="font-general-sans text-[16px] lg:text-[18px] text-[#7D8690] leading-[1.4]">
                  Catch and fix claims before they leave, not after they come back.
                </p>
              </div>
              <div className="relative w-full aspect-[4/3] mt-auto">
                <Image src="/images/home/features-images/img_denial_prevention.png" alt="Denial Prevention" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Row 3: Healthcare-grade by default */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[4px] h-[4px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#0F68D6]"></div>
                <span className="font-general-sans text-[14px] lg:text-[16px] text-[#7D8690] tracking-wide font-normal">Healthcare-grade by default.</span>
              </div>
              <h3 className="font-general-sans font-medium text-[32px] lg:text-[48px] leading-[1.2]">
                <span className="text-[#0F68D6]">Your patient data</span>{' '}
                <span className="text-[#111111]">never leaves your environment.</span>
              </h3>
              <p className="font-general-sans text-[16px] lg:text-[18px] text-[#7D8690] leading-[1.5]">
                Our agents work inside your systems. The data stays where it is. Nothing is copied, moved, or stored on our side. After Change Healthcare showed what concentration risk really costs, this isn't a feature. It's the baseline for working in healthcare.
              </p>
            </div>
            
            {/* Right Image */}
            <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-[32px] overflow-hidden">
                <Image src="/images/home/features-images/img_your_patient_data_never_leaves_your_environment.png" alt="Healthcare Grade" fill className="object-cover" />
            </div>
          </div>

          {/* Row 4: Our Stats & Case Study */}
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[4px] h-[4px] lg:w-[6px] lg:h-[6px] rounded-full bg-[#0F68D6]"></div>
                <span className="font-general-sans text-[14px] lg:text-[16px] text-[#7D8690] tracking-wide font-normal">Measured against HFMA. Drawn from production.</span>
              </div>
              <h3 className="font-general-sans font-medium text-[32px] lg:text-[48px] leading-[1.2] text-[#111111]">
                Our stats
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
              {/* Stat 1 */}
              <div className="flex flex-col justify-between p-[32px] h-[300px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
                <div className="relative w-[80px] h-[80px]">
                  <Image src="/images/home/features-images/icon_30_to_70_percent_reduction.png" alt="Reduction in cost" fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <span className="font-general-sans font-normal text-[40px] lg:text-[48px] text-[#042849] leading-[1]">30 to 70%</span>
                  <span className="font-general-sans text-[16px] lg:text-[18px] text-[#4B5563] leading-[1.3]">Reduction in cost to collect</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col justify-between p-[32px] h-[300px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
                <div className="relative w-[80px] h-[80px]">
                  <Image src="/images/home/features-images/Icon.png" alt="Clean claim rate" fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <span className="font-general-sans font-normal text-[40px] lg:text-[48px] text-[#042849] leading-[1]">95%+</span>
                  <span className="font-general-sans text-[16px] lg:text-[18px] text-[#4B5563] leading-[1.3]">Clean claim rate</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col justify-between p-[32px] h-[300px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
                <div className="relative w-[80px] h-[80px]">
                  <Image src="/images/home/features-images/r_days.png" alt="Reduction in A/R days" fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <span className="font-general-sans font-normal text-[40px] lg:text-[48px] text-[#042849] leading-[1]">15–35 <span className="text-[24px] lg:text-[28px]">days</span></span>
                  <span className="font-general-sans text-[16px] lg:text-[18px] text-[#4B5563] leading-[1.3]">Reduction in A/R days</span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col justify-between p-[32px] h-[300px] bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
                <div className="relative w-[80px] h-[80px]">
                  <Image src="/images/home/features-images/icon_80_percent_touchless.png" alt="Touchless resolution rate" fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <span className="font-general-sans font-normal text-[40px] lg:text-[48px] text-[#042849] leading-[1]">~80%</span>
                  <span className="font-general-sans text-[16px] lg:text-[18px] text-[#4B5563] leading-[1.3]">Touchless resolution rate</span>
                </div>
              </div>
            </div>

            {/* Case Study Banner */}
            <div className="flex flex-col lg:flex-row items-center bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden lg:pr-[40px] lg:gap-[60px]">
              {/* Image Side */}
              <div className="relative w-full lg:w-[55%] aspect-[4/3] lg:aspect-auto lg:h-[400px]">
                <Image 
                  src="/images/home/features-images/img_60_outsourced_staff_3_in_house_managers.png" 
                  alt="Case Study" 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              {/* Content Side */}
              <div className="flex flex-col justify-center items-start gap-[24px] p-[32px] lg:p-0 lg:w-[45%]">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="font-general-sans font-normal text-[32px] text-[#042849] leading-[1.2]">
                    60 outsourced staff <br className="hidden lg:block" />
                    <span className="relative -top-[4px]">→</span> 3 in-house managers.
                  </h3>
                  <p className="font-general-sans font-normal text-[18px] text-[#111111]">
                    Multi-state anesthesia group.
                  </p>
                </div>
                <CTA variant="light-bg" className="mt-[8px]">
                  Read the case
                </CTA>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
