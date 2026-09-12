'use client';

import Link from 'next/link';
import React from 'react';

import { ChevronRight } from '@/components/CTA';

export const ComeTalkToUsSection: React.FC = () => {
  return (
    <section className="w-full bg-white pr-[20px] md:pr-[40px] lg:pr-[60px] min-[1440px]:pr-[calc((100vw-1320px)/2)] overflow-hidden">
      {/* 
        Come talk to us Section:
        - Background container flush with the left viewport edge
        - Rounded right corners (rounded-tr / rounded-br) aligned with the 1320px content grid
        - White margin on the right (matching grid margin of The Team and other sections)
        - Gradient background: linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)
      */}
      <div
        className="w-full rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] md:py-[60px] lg:py-[80px] pl-[20px] md:pl-[40px] lg:pl-[60px] min-[1440px]:pl-[calc((100vw-1320px)/2)] pr-[20px] md:pr-[32px] lg:pr-[40px] xl:pr-[60px]"
        style={{
          background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
        }}
      >
        <div className="w-full max-w-[1260px] ml-auto">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Side-by-side Row (Text Column + Photo Column)       */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex flex-row items-center justify-between gap-[20px] xl:gap-[20px] w-full">
            {/* Left Column: Heading, Description, CTA Button */}
            <div className="w-full lg:w-[48%] xl:w-[536px] flex flex-col justify-center items-start gap-[24px] xl:gap-[40px] shrink-0">
              {/* Heading: General Sans, responsive scaling */}
              <h2 className="type-h1 text-[#F4F6F9] tracking-[-0.01em] text-[40px] leading-[48px] xl:text-[68px] xl:leading-[76px]">
                Come talk to us.
              </h2>

              {/* Sub-stack: Paragraph + CTA */}
              <div className="flex flex-col items-start gap-[20px] xl:gap-[24px] w-full">
                {/* Paragraph: Inter, responsive sizing */}
                <p className="type-body-s text-white text-[16px] leading-[24px] xl:text-[20px] xl:leading-[28px] max-w-[536px]">
                  Whether it is one function that needs fixing or a revenue cycle that needs rethinking, the fastest way to find out what we can do is to look at your numbers.
                </p>

                {/* CTA Button: 44px height, px-20, py-10, Inter 16px/24px 500, #042849, blue chevron */}
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-[64px] bg-white px-[20px] py-[10px] gap-[10px] h-[44px] hover:bg-white/90 transition-all duration-200 group"
                >
                  <span className="type-cta text-[16px] leading-[24px] text-[#042849] font-medium">
                    Get in touch
                  </span>
                  <ChevronRight className="w-[12.4px] h-[18.6px] text-[#0F68D6] transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Photo (responsive width & aspect ratio, exact at xl+) */}
            <div
              className="w-full lg:w-[48%] xl:w-[704px] aspect-[704/417] xl:h-[417px] shrink-0 rounded-[40px_10px] bg-cover bg-center bg-no-repeat bg-[url('/images/about-us/come-talk-to-us/come_talk_to_us_img.png')]"
              role="img"
              aria-label="Waterlabs team in conversation with healthcare client"
            />
          </div>

          {/* ========================================================================= */}
          {/* Mobile Layout (< lg): Stacked Column (Title -> Photo -> Text -> CTA)      */}
          {/* ========================================================================= */}
          <div className="flex lg:hidden flex-col items-start gap-[20px] w-full max-w-[342px] mx-auto">
            {/* Heading: General Sans, 36px/48px, -0.01em, #F4F6F9 */}
            <h2 className="type-h1 text-[#F4F6F9] tracking-[-0.01em] text-[36px] leading-[48px]">
              Come talk to us.
            </h2>

            {/* Content Frame (Figma: Frame 2147203294, gap: 12px) */}
            <div className="flex flex-col items-start gap-[12px] w-full">
              {/* Middle: Photo (342px x 203px, border-radius: 20px 10px 20px 20px) */}
              <div
                className="w-full h-[203px] rounded-[20px_10px_20px_20px] bg-cover bg-center bg-no-repeat bg-[url('/images/about-us/come-talk-to-us/come_talk_to_us_img_mob.png')]"
                role="img"
                aria-label="Waterlabs team in conversation with healthcare client"
              />

              {/* Bottom Content: Paragraph + CTA (Figma: Frame 2147203307, gap: 24px) */}
              <div className="flex flex-col items-start gap-[24px] w-full">
                {/* Paragraph: Inter, 16px/26px, #FFFFFF */}
                <p className="type-body-s text-white text-[16px] leading-[26px]">
                  Whether it is one function that needs fixing or a revenue cycle that needs rethinking, the fastest way to find out what we can do is to look at your numbers.
                </p>

                {/* CTA Button: 38px height, px-12, py-10, Inter 14px/24px 500, #000000, dark chevron */}
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-[64px] bg-white px-[12px] py-[10px] gap-[10px] h-[38px] hover:bg-white/90 transition-all duration-200 group"
                >
                  <span className="font-['Inter'] font-medium text-[14px] leading-[24px] text-black">
                    Get in touch
                  </span>
                  <ChevronRight className="w-[9.7px] h-[14.6px] text-[#111111] transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComeTalkToUsSection;
