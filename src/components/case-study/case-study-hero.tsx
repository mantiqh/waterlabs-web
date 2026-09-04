'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';
import { CaseStudy } from '@/types/case-study';

interface CaseStudyHeroProps {
  caseStudy: CaseStudy;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ caseStudy }) => {
  const { categoryTag, title, titleHighlight, subtitle, heroImage, heroImageAlt } = caseStudy;

  return (
    <section className="relative w-full bg-white">
      {/* 
        Case Study Banner (Figma Specifications):
        - Desktop (1440px x 690px):
          - padding: 40px 60px 80px, gap: 60px
          - background: #F4F6F9
          - border-radius: 0px 0px 0px 60px
        - Mobile (362px - 402px):
          - padding: 20px 20px 40px, gap: 40px
          - border-radius: 0px 0px 0px 30px
      */}
      <div className="relative w-full bg-[#F4F6F9] min-h-[600px] lg:min-h-[690px] rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[28px] md:px-[40px] md:pb-[50px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-between gap-[36px] lg:gap-[60px]">
        
        {/* Background Decorative Graphic Elements (Figma Specs) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-bl-[30px] lg:rounded-bl-[60px]" aria-hidden="true">
          {/* Desktop Decorative Vector (880px x 440px) */}
          <div
            className="hidden lg:block absolute w-[880px] h-[440px] left-[200px] -bottom-[215px] rounded-[41.88px] border border-[rgba(244,246,249,0.2)] bg-white/30 backdrop-blur-[9.2px]"
          />

          {/* Desktop Rotated Vector (2274px x 1137px) */}
          <div
            className="hidden lg:block absolute w-[2274px] h-[1137px] -left-[893px] top-[550px] border border-white/15 rounded-[30px] -rotate-[3.62deg]"
          />

          {/* Mobile Decorative Vector (539px x 270px) */}
          <div
            className="block lg:hidden absolute w-[539px] h-[270px] left-[82px] top-[42px] bg-white/50 border border-white/25 backdrop-blur-[6.6px] rounded-[30px] rotate-[16.52deg]"
          />
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Hero Main Content Row (Frame 2147203232: 1320px x 450px) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-[24px] lg:gap-[40px] flex-1 my-auto">
          
          {/* Left Column: Text Content (Frame 2147226949)
              On mobile: order-2 (text below image)
              On desktop: order-1 (text on left)
          */}
          <div className="w-full lg:w-1/2 lg:max-w-[640px] min-w-0 flex flex-col justify-center items-start gap-[12px] lg:gap-[16px] order-2 lg:order-1">
            
            {/* Tag / Eyebrow (Text - Tag) */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
                {categoryTag}
              </span>
            </div>

            {/* Headline & Subtitle Container (Frame 2147226938) */}
            <div className="w-full flex flex-col items-start gap-[8px] lg:gap-[12px]">
              {/* Headline: semantic <h2> with type-h2 and dynamic blue accent */}
              <h2 className="type-h2 text-[#111111]">
                {titleHighlight && title.includes(titleHighlight) ? (
                  <>
                    {title.split(titleHighlight)[0]}
                    <span className="text-[#0F68D6]">{titleHighlight}</span>
                    {title.split(titleHighlight)[1]}
                  </>
                ) : (
                  title
                )}
              </h2>

              {/* Subtitle / Excerpt: type-body-xs */}
              <p className="type-body-xs text-[#2A2A2A] max-w-[640px]">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right Column: Hero Image Card (Frame 2147226953: 640px x 450px)
              On mobile: order-1 (image on top), border-radius: 10px 20px 20px 20px
              On desktop: order-2 (image on right), border-radius: 10px 40px 10px 40px
          */}
          <div className="w-full lg:w-1/2 lg:max-w-[640px] aspect-[640/450] relative overflow-hidden shrink-0 order-1 lg:order-2 rounded-tl-[10px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[10px] lg:rounded-tr-[40px] lg:rounded-br-[10px] lg:rounded-bl-[40px] shadow-sm">
            <Image
              src={heroImage}
              alt={heroImageAlt || title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover object-center"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default CaseStudyHero;
