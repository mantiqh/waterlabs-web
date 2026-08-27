'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';

export const CareersHeroSection: React.FC = () => {
  return (
    <section className="relative w-full">
      {/* 
        Careers Hero Banner
        Desktop: min-h-[650px], rounded-bl-[60px], px-[40px] xl:px-[60px] pt-[40px] pb-[80px]
        Mobile: min-h-[659px], rounded-bl-[30px], px-[20px] pt-[20px] pb-[40px]
      */}
      <div 
        className="relative w-full min-h-[659px] lg:min-h-[650px] rounded-bl-[30px] lg:rounded-bl-[60px] overflow-hidden flex flex-col justify-between pt-[20px] px-[20px] pb-[40px] lg:pt-[40px] lg:px-[40px] xl:px-[60px] lg:pb-[80px] gap-[32px] lg:gap-0"
        style={{
          background: 'linear-gradient(180deg, #0F68D6 2.92%, #B8B1A5 100%)',
        }}
      >
        {/* Background Abstract Vector / Frosted Glass Overlay */}
        <div className="absolute -bottom-[10px] left-0 right-0 h-[220px] sm:h-[260px] lg:h-[320px] xl:h-[380px] pointer-events-none z-0 overflow-hidden backdrop-blur-[6px] lg:backdrop-blur-[13.2px]">
          <Image
            src="/images/careers/hero-section/img_abstract_banner.png"
            alt="Abstract Banner Shape"
            fill
            priority
            className="object-cover object-bottom"
            style={{
              filter: 'brightness(0) invert(1) opacity(0.45) drop-shadow(0 0 1px rgba(255, 255, 255, 0.4))',
            }}
          />
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-between gap-[24px] lg:gap-[32px] xl:gap-[40px] mt-[16px] lg:mt-[32px]">
          {/* Left Column: Heading */}
          <div className="w-full lg:w-1/2 max-w-[650px]">
            <h1 className="font-primary font-normal text-[32px] sm:text-[36px] lg:text-[38px] xl:text-[48px] leading-[42px] lg:leading-[48px] xl:leading-[56px] tracking-[-0.01em] text-white">
              We&apos;re tackling one of healthcare&apos;s hardest problems: rebuilding how healthcare gets paid.
            </h1>
          </div>

          {/* Right Column: Hero Image */}
          <div className="w-full lg:w-1/2 max-w-[650px]">
            <div className="relative w-full aspect-[362/246] lg:aspect-[650/441] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tl-[80px] lg:rounded-tr-[20px] lg:rounded-br-[80px] lg:rounded-bl-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <Image
                src="/images/careers/hero-section/img_banner%20(1).png"
                alt="Waterlabs Team"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHeroSection;
