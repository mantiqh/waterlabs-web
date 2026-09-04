'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export const DoWorkThatMattersSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F4F6F9] py-[40px] md:py-[60px] lg:py-[90px] px-[20px] md:px-[40px] lg:px-[60px] overflow-hidden">
      {/* 
        Do Work That Matters Section (Figma node: 5419-5394 / 5419-5397):
        - Container: 1320px x 462px, padding: 0 40px 0 0, gap: 60px, rounded-[20px], bg: #FFFFFF
        - Left Image (AdobeStock_588310218 2): 650px x 462px, border-radius: 8px 8px 32px 8px
        - Right Content (Frame 2147203147): 570px x 462px, padding: 50px 0px, gap: 24px
          - Frame 2147203133: gap 8px (Tag + Headline + Description)
          - Frame 7: CTA Button
      */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto rounded-[20px] p-0 flex flex-col lg:flex-row items-stretch lg:items-center justify-start gap-[24px] lg:gap-[32px] xl:gap-[44px] lg:pr-[40px] shadow-sm overflow-hidden min-h-[462px] bg-white">

        {/* Left Column: Speaker Image (650px x 462px on desktop, 8px top-right radius) */}
        <div className="w-full lg:w-[480px] xl:w-[650px] min-h-[300px] sm:min-h-[380px] lg:min-h-[462px] relative rounded-t-[20px] lg:rounded-t-none lg:rounded-l-[20px] lg:rounded-tr-[8px] lg:rounded-br-[32px] overflow-hidden shrink-0 self-stretch">
          <Image
            src="/images/culture/do-work-that-matters/do_work_that_matters.png"
            alt="Do work that matters, with people who'll back you"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 480px, 650px"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Content Block (570px x 462px in Figma, padding: 50px 0px, gap: 24px) */}
        <div className="w-full lg:flex-1 xl:w-[570px] xl:max-w-[570px] flex flex-col justify-center items-start gap-[20px] lg:gap-[24px] p-[24px] sm:p-[36px] lg:py-[50px] lg:px-0 bg-white">

          {/* Header & Body Block (Frame 2147203133: gap 8px) */}
          <div className="flex flex-col items-start gap-[8px] w-full max-w-[570px]">
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

            {/* Body Description: type-body-xs (Exact line breaks matching Figma Image 1) */}
            <p className="type-body-xs text-[#111111] max-w-[540px] pt-[2px]">
              We want curious people who take ownership and want to solve{' '}

              real problems. Whether you are early in your career or leading a{' '}

              team, there is room here to build something real.
            </p>
          </div>

          {/* CTA Button: Frame 7 (gap 24px from Frame 2147203133) */}
          <div>
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
