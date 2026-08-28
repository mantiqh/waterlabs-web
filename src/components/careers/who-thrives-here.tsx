'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const WhoThrivesHereSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#F4F6F9] from-50% to-[#F4F6F9] lg:to-white to-50% overflow-hidden p-0 m-0">
      {/* 
        Colored Gradient Card attached to the left screen edge:
        - Left side: spans from 0px (left screen edge)
        - Right side: Inset by 20px on mobile with rounded-tr-[30px] rounded-br-[30px], 60px on desktop with rounded-tr-[60px] rounded-br-[60px]
        - Proportional vertical padding (py-[40px] lg:py-[48px] xl:py-[64px]) with zero artificial empty space at the bottom
      */}
      <div 
        className="w-[calc(100%-20px)] lg:w-[calc(100%-40px)] xl:w-[min(calc(100vw-60px),calc(50vw+660px))] mr-auto rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] px-[20px] lg:py-[48px] xl:py-[64px] lg:pl-[max(40px,calc((100vw-1320px)/2))] lg:pr-[40px] xl:pr-[60px] flex flex-col justify-between gap-[32px] lg:gap-[40px] overflow-hidden"
        style={{
          background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
        }}
      >
        <div className="w-full max-w-[1260px] flex flex-col gap-[28px] lg:gap-[36px] xl:gap-[40px]">
          
          {/* Header Block: Tag + Title */}
          <div className="w-full flex flex-col gap-[8px] lg:gap-[14px]">
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#63CCB7] shrink-0" />
              <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-[#D7DCE2] tracking-[0.01em]">
                The Fit
              </span>
            </div>

            {/* Title */}
            <h2 className="font-primary font-normal text-[36px] lg:text-[48px] xl:text-[68px] leading-[48px] lg:leading-[56px] xl:leading-[76px] tracking-[-0.01em] text-[#F4F6F9]">
              Who Thrives Here
            </h2>
          </div>

          {/* Content Body: Two Responsive Columns */}
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[24px] lg:gap-[32px] xl:gap-[40px]">
            
            {/* Left Column: Mission Description & Email Contact */}
            <div className="w-full lg:w-1/2 xl:w-[536px] flex flex-col justify-between gap-[24px] lg:gap-[32px] xl:gap-[48px]">
              <p className="font-primary font-normal text-[20px] lg:text-[24px] xl:text-[32px] leading-[28px] lg:leading-[34px] xl:leading-[40px] tracking-[-0.01em] text-white">
                We are not for everyone, and that&apos;s deliberate. People who do their best work here are ambitious, driven, self-starters, and not afraid of ambiguity.
              </p>

              {/* Get in touch CTA */}
              <div className="flex flex-col gap-[8px] lg:gap-[12px]">
                <p className="font-secondary font-medium text-[16px] lg:text-[18px] xl:text-[20px] leading-[26px] xl:leading-[28px] text-white">
                  If this sounds like you, apply below.<br />
                  Or get in touch:
                </p>
                <Link
                  href="mailto:hiring@waterlabs.ai"
                  className="font-secondary font-medium text-[16px] lg:text-[18px] xl:text-[20px] leading-[26px] xl:leading-[28px] text-white no-underline hover:opacity-90 transition-opacity w-fit whitespace-nowrap"
                >
                  hiring@waterlabs.ai
                </Link>
              </div>
            </div>

            {/* Right Column: Team Culture Image */}
            <div className="w-full lg:w-1/2 xl:w-[704px]">
              <div className="relative w-full aspect-[342/203] lg:aspect-[704/417] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[40px] lg:rounded-tr-[10px] lg:rounded-br-[40px] lg:rounded-bl-[10px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
                <Image
                  src="/images/careers/who-thrives-here/img_who_thrives_here.png"
                  alt="Who Thrives Here Team"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 704px"
                  className="object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoThrivesHereSection;
