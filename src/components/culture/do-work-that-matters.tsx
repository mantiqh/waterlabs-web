'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export const DoWorkThatMattersSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F4F6F9] py-[40px] md:py-[60px] lg:py-[90px] px-[20px] md:px-[40px] lg:px-[60px] overflow-hidden">
      {/* 
        Do Work That Matters Section (Figma node: 5419-5394 / 5419-5395):
        - Container (top frame - color): 1440px x 642px, padding: 90px 60px, bg: #F4F6F9, rounded-tl-[60px] rounded-bl-[60px]
        - Inner Card (Frame 2147203148): 1320px x 462px, rounded-[20px], padding: 0 40px 0 0, gap: 60px
        - Left Image (AdobeStock_588310218 2): 650px wide, fills the full left height and width (no white background around it)
          - rounded-[20px_8px_32px_20px] (32px inward curve at bottom-right)
        - Right Content (Frame 2147203147): 570px wide, padding: 50px 0, gap: 24px, bg: #FFFFFF
          - Tag: "Build what's next" (type-body-xxs text-[#7D8690])
          - Headline: "Do work that matters, with people who’ll back you." (type-h2 text-[#042849])
          - Description: type-body-xs text-[#111111]
          - CTA: Frame 7 "See Open Roles" -> /careers
      */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto rounded-[20px] p-0 flex flex-col lg:flex-row items-stretch justify-between shadow-sm overflow-hidden min-h-[462px] bg-white">
        
        {/* Left Column: Speaker Image (Fills 100% of left space flush with top, bottom, and left edges) */}
        <div className="w-full lg:w-[650px] min-h-[300px] sm:min-h-[380px] lg:min-h-[462px] relative rounded-t-[20px] lg:rounded-t-none lg:rounded-l-[20px] lg:rounded-br-[32px] overflow-hidden shrink-0 self-stretch">
          <Image
            src="/images/culture/do-work-that-matters/do_work_that_matters.png"
            alt="Do work that matters, with people who'll back you"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 650px"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Content Block (White background only here) */}
        <div className="w-full lg:w-[570px] lg:max-w-[570px] flex flex-col justify-center items-start gap-[20px] lg:gap-[24px] p-[24px] sm:p-[36px] lg:py-[50px] lg:pl-[20px] lg:pr-[40px] flex-1 bg-white">
          
          {/* Header Block (Frame 2147203133) */}
          <div className="flex flex-col items-start gap-[8px] w-full">
            {/* Tag / Eyebrow (Text - Tag) */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                Build what&apos;s next
              </span>
            </div>

            {/* Headline: type-h2, semantic <h2> */}
            <h2 className="type-h2 text-[#042849] max-w-[570px]">
              Do work that matters, with people who&apos;ll back you.
            </h2>
          </div>

          {/* Body Description: type-body-xs */}
          <p className="type-body-xs text-[#111111] leading-relaxed max-w-[570px]">
            We want curious people who take ownership and want to solve real problems. Whether you are early in your career or leading a team, there is room here to build something real.
          </p>

          {/* CTA Button: Frame 7 */}
          <div className="pt-[4px]">
            <Link href="/careers">
              <CTA variant="light-bg">
                See Open Roles
              </CTA>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DoWorkThatMattersSection;
