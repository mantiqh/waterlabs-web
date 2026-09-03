'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';

export const CultureHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F4F6F9] overflow-hidden">
      {/* 
        Culture Hero Banner (Figma Specifications):
        - Desktop: 1440px x 653px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px, gap: 32px
        - Mobile: border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient(180deg, #0F68D6 41.31%, #AE87E4 108.85%)
        - Typography Rules:
          - No manual font breakpoints; centralized typography tokens (type-h1, type-body-s, type-body-xxs)
          - No <h1> tag (semantic <h2> with type-h1)
      */}
      <div
        className="relative w-full min-h-[620px] lg:h-[653px] rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[28px] md:px-[40px] md:pb-[50px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-between gap-[24px] lg:gap-[32px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0F68D6 41.31%, #AE87E4 108.85%)',
        }}
      >
        {/* Background Banner Graphic */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          <Image
            src="/images/culture/hero-section/banner%20(4).png"
            alt="Culture Hero Background"
            fill
            priority
            className="object-cover object-bottom mix-blend-overlay opacity-60"
          />
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Introduction Section (1320px x 441px) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-[24px] lg:gap-[40px] flex-1 my-auto">
          
          {/* Left Column: Introduction Content */}
          <div className="w-full lg:w-[650px] flex flex-col justify-center items-start gap-[16px] lg:gap-[20px]">
            
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
              <span className="type-body-xxs text-[#D7DCE2] tracking-[0.01em]">
                People &amp; Culture
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="type-h1 text-white">
              Built by people who stayed close to the problem.
            </h2>

            {/* Subtext Paragraph */}
            <p className="type-body-s text-[#F4F6F9] leading-relaxed max-w-[650px]">
              Waterlabs is a technology company with people at its centre. We built our culture like our product, around ownership. You get clear expectations, real feedback, and room to do work that matters. In return, we ask one thing. Own the outcome.
            </p>
          </div>

          {/* Right Column: Introduction Image Card */}
          <div className="relative w-full lg:w-[650px] h-[320px] sm:h-[400px] lg:h-[441px] rounded-[20px] overflow-hidden shrink-0 shadow-lg">
            <Image
              src="/images/culture/hero-section/Introduction image.png"
              alt="People at Waterlabs"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover object-center"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CultureHeroSection;
