'use client';

import React from 'react';

export const BottomLineSection: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #111111 52.4%)',
      }}
    >
      {/* 
        Bottom Line / CTA Bar Section (Desktop: 4081-10784 / Mobile: 4081-11031):
        - Wrapper: Gradient #FFFFFF -> #111111
        - Inner Container: #000000 background with border-radius: 60px 0 0 60px (desktop) / 30px 0 0 0 (mobile)
        - Desktop: padding 60px, gap 60px
        - Mobile: padding 40px 20px, gap 32px
      */}
      <div className="w-full bg-black rounded-tl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] px-[20px] md:py-[50px] md:px-[40px] lg:py-[60px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[32px] lg:gap-[60px]">
          
          {/* Tag / Eyebrow Row */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
            <span className="type-body-xxs text-white tracking-[0.01em]">
              Don&apos;t just automate your revenue cycle. Apply intelligence to it.
            </span>
          </div>

          {/* Credentials / Feature Tags Block */}
          <div className="w-full flex flex-col gap-[14px]">
            {/* Row 1: Commercial Terms */}
            <div className="w-full pb-[14px] border-b border-white/50 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-[12px] sm:gap-[24px] lg:gap-[40px]">
              <span className="type-body-xs text-white">
                No development fee
              </span>
              <span className="type-body-xs text-white">
                Live in 14 days
              </span>
              <span className="type-body-xs text-white">
                Billing only after agents deliver
              </span>
            </div>

            {/* Row 2: Certifications & Standards */}
            {/* Mobile (small screens): 2 columns matching Image 2 & Figma Frame 2147203183 */}
            <div className="w-full flex sm:hidden flex-row items-start gap-[12px] pt-[4px]">
              <div className="flex-1 flex flex-col items-start gap-[12px]">
                <span className="type-body-xs text-white">
                  SOC 2 Type II
                </span>
                <span className="type-body-xs text-white">
                  HIPAA
                </span>
                <span className="type-body-xs text-white">
                  ISO 27001
                </span>
              </div>
              <div className="flex-1 flex flex-col items-start gap-[12px]">
                <span className="type-body-xs text-white">
                  ISO27017
                </span>
                <span className="type-body-xs text-white">
                  ISO27018
                </span>
                <span className="type-body-xs text-white">
                  US Infrastructure
                </span>
              </div>
            </div>

            {/* Desktop / Tablet: Untouched horizontal flex row */}
            <div className="w-full hidden sm:flex flex-row flex-wrap items-center gap-x-[24px] lg:gap-x-[40px] gap-y-[12px]">
              <span className="type-body-xs text-white">
                SOC 2 Type II
              </span>
              <span className="type-body-xs text-white">
                HIPAA
              </span>
              <span className="type-body-xs text-white">
                ISO 27001
              </span>
              <span className="type-body-xs text-white">
                ISO27017
              </span>
              <span className="type-body-xs text-white">
                ISO27018
              </span>
              <span className="type-body-xs text-white">
                US Infrastructure
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BottomLineSection;
