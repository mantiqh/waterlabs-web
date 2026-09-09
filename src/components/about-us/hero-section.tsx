'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* 
        Hero Banner Section (Desktop: 4081-10784 / Mobile: 4081-11031):
        - Desktop: Full-width, 726px height, padding: 40px 60px 80px, border-radius: 0 0 60px 0
        - Mobile: 581px height, padding: 20px 20px 40px, border-radius: 0 0 30px 0
        - Background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%) over banner image
        - Layout: justify-between, Navbar at top, bottom content row at bottom
      */}
      <div className="relative w-full min-h-[581px] lg:h-[726px] bg-transparent rounded-br-[30px] lg:rounded-br-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[32px] md:px-[40px] md:pb-[60px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-between gap-[24px] lg:gap-[10px] overflow-hidden">
        
        {/* Background Banner Image */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-br-[30px] lg:rounded-br-[60px]">
          {/* Desktop Banner Graphic */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/about-us/hero-section/img_banner.png"
              alt="About Us Banner"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          {/* Mobile Banner Graphic */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/images/about-us/hero-section/img_banner_mob.png"
              alt="About Us Banner Mobile"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Bottom Content Row */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-[24px] lg:gap-[20px]">
          {/* Left Column: Heading (Semantic h2 with type-h1 styles) */}
          <div className="w-full lg:w-[551px] shrink-0">
            <h2 className="type-h1 text-white lg:tracking-[-0.01em]">
              <span className="block lg:whitespace-nowrap">More collections.</span>
              <span className="block lg:whitespace-nowrap">Less manual work.</span>
            </h2>
          </div>

          {/* Right Column: Description (Two paragraphs matching exact text placement) */}
          <div className="w-full lg:w-[749px] flex-1 flex flex-col gap-[20px] lg:gap-[24px]">
            <p className="type-body-s text-[#F4F6F9]">
              <span className="hidden lg:block">
                As healthcare revenue cycle experts, we make healthcare&apos;s revenue cycle<br />
                operate autonomously.
              </span>
              <span className="block lg:hidden">
                As healthcare revenue cycle experts, we make<br />
                healthcare&apos;s revenue cycle operate<br />
                autonomously.
              </span>
            </p>

            <p className="type-body-s text-[#F4F6F9]">
              <span className="hidden lg:block">
                Founded in 2019 by two operators who&apos;d spent twenty years inside the back-<br />
                office healthcare runs on.
              </span>
              <span className="block lg:hidden">
                Founded in 2019 by two operators who&apos;d spent<br />
                twenty years inside the back-office healthcare<br />
                runs on.
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
