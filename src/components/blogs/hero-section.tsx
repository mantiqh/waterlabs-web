'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

export const BlogsHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white rounded-bl-[30px] lg:rounded-bl-[60px] overflow-hidden pt-[20px] lg:pt-[40px] px-[20px] md:px-[40px] lg:px-[60px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
      {/* Top Navbar */}
      <div className="relative z-50 w-full max-w-[1320px] mx-auto">
        <Navbar />
      </div>

      {/* 
        Featured Blog Hero Card:
        - Desktop (Figma: 5915-17114): 1320px x 517px, border-radius: 40px 20px
        - Mobile (Figma: 5915-17212): 362px x 448.5px, border-radius: 20px 10px 20px 20px
        - Background: CSS background image without absolute positioning
      */}
      <div className="w-full max-w-[1320px] mx-auto mt-[24px] lg:mt-[32px] xl:mt-[40px] rounded-[20px_10px_20px_20px] lg:rounded-[40px_20px_40px_20px] overflow-hidden shadow-[0_12px_40px_rgba(4,40,73,0.08)] bg-[#042849] bg-cover bg-center bg-no-repeat bg-[url('/images/blogs/hero-section/img_hero_bg_mobile.png')] md:bg-[url('/images/blogs/hero-section/img_hero_bg.png')]">
        
        {/* ========================================================================= */}
        {/* Desktop Layout (1024px+): Side-by-side (506px text / 810px image)         */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex flex-row items-stretch justify-between w-full h-[460px] xl:h-[517px]">
          {/* Left Column: Text Content & CTA (Frame 2147203266 / 2147226900) */}
          <div className="w-full lg:w-[48%] xl:w-[506px] shrink-0 p-[32px] xl:p-[40px] flex flex-col justify-center items-start gap-[20px]">
            <div className="flex flex-col items-start gap-[20px] w-full">
              {/* Tag / Eyebrow (Text - Tag) */}
              <div className="flex items-center gap-[8px]">
                <span className="type-caption text-[#D7DCE2]">Lorem</span>
                <span className="h-[14px] w-[1px] bg-[#D7DCE2]/40" />
                <span className="type-caption text-[#D7DCE2]">Lorem Ipsum</span>
              </div>

              {/* Title & Description (Frame 2147226899) */}
              <div className="flex flex-col items-start gap-[12px] w-full">
                <h5 className="type-h5 text-white tracking-[-0.01em]">
                  What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle
                </h5>
                <p className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                  Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves.
                </p>
              </div>
            </div>

            {/* CTA Button (Desktop - Fill CTA / Frame 2147226507) */}
            <div className="pt-[4px]">
              <Link href="/blogs/what-is-agentic-rcm" className="inline-block">
                <CTA variant="dark-bg" as="div">
                  Read Blog
                </CTA>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image (Frame 2147226502) - Full width & height without margin or layers */}
          <div className="flex-1 min-w-0 relative h-full rounded-[20px] overflow-hidden">
            <Image
              src="/images/blogs/hero-section/img_agentic_rcm_hero.png"
              alt="What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1280px) 50vw, 810px"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Mobile & Tablet Layout (< 1024px): Stacked Layout (Image Top / Text Bottom) */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col items-start w-full min-h-[500px] sm:min-h-[540px] justify-between">
          {/* Top Image (Frame 2147226503) */}
          <div className="relative w-full h-[210px] sm:h-[240px] rounded-[20px] overflow-hidden shrink-0">
            <Image
              src="/images/blogs/hero-section/img_agentic_rcm_hero.png"
              alt="What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 768px"
            />
          </div>

          {/* Bottom Content (Frame 2147203266) */}
          <div className="w-full p-[20px] sm:p-[24px] pb-[28px] sm:pb-[36px] flex flex-col items-start justify-between flex-1 gap-[20px]">
            {/* Tag / Eyebrow (Text - Tag) */}
            <div className="flex items-center gap-[6px]">
              <span className="type-caption text-[#D7DCE2]">Lorem</span>
              <span className="h-[12px] w-[1px] bg-[#D7DCE2]/40" />
              <span className="type-caption text-[#D7DCE2]">Lorem Ipsum</span>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col items-start gap-[10px] w-full">
              <h5 className="type-h5 text-white tracking-[-0.01em]">
                What Is Agentic RCM? The Definitive Guide to the Autonomous Revenue Cycle
              </h5>
              <p className="type-body-xxs text-[#F4F6F9] tracking-[0.01em]">
                Agentic RCM is revenue cycle management run by autonomous AI agents that do the work themselves.
              </p>
            </div>

            {/* CTA Button on mobile */}
            <div className="pt-[4px]">
              <Link href="/blogs/what-is-agentic-rcm" className="inline-block">
                <CTA variant="dark-bg" as="div">
                  Read Blog
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsHeroSection;
