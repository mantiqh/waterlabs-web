'use client';

import React from 'react';

import Navbar from '@/components/common/navbar';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      {/* 
        Hero Banner Section (Desktop: 6211-17465 / Mobile: 6211-17810):
        - Desktop: 1440px width, 726px height, padding: 40px 60px 80px, border-radius: 0 0 0 60px
        - Mobile: 402px width, 581px height, padding: 20px 20px 40px, border-radius: 0 0 0 30px
        - Background: CSS background image with linear-gradient and vector artwork
        - Layout: Flex column justify-between, Navbar at top, Frame 2147203192 at bottom
      */}
      <div className="w-full min-h-[581px] lg:min-h-[640px] xl:h-[726px] bg-[#042849] bg-[url('/images/about-us/hero-section/img_banner_mob.png')] lg:bg-[url('/images/about-us/hero-section/img_banner.png')] bg-cover bg-center bg-no-repeat rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[32px] md:px-[40px] md:pb-[60px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-between items-start gap-[40px] lg:gap-[10px]">
        {/* Navbar */}
        <Navbar />

        {/* Hero Content Area (Figma: Frame 2147203192) */}
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-[12px] lg:gap-[20px]">
          {/* Heading */}
          <div className="w-full lg:w-[522px] shrink-0">
            <h2 className="type-h1 text-white tracking-[-0.01em]">
              We are building<br />
              the revenue cycle<br />
              that runs itself.
            </h2>
          </div>

          {/* Description */}
          <div className="w-full lg:max-w-[778px] flex-1">
            <p className="type-body-s text-[#F4F6F9]">
              <span className="hidden xl:inline">
                The US healthcare system loses billions every year to a revenue cycle run by<br />
                hand. Waterlabs builds the agentic AI that runs it instead. Our agents work every<br />
                stage, in every specialty, at health system scale.
              </span>
              <span className="inline xl:hidden">
                The US healthcare system loses billions every year to a revenue cycle run by hand. Waterlabs builds the agentic AI that runs it instead. Our agents work every stage, in every specialty, at health system scale.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

