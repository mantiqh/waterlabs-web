'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';

export const CareersHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white">
      {/* 
        Careers Hero Banner (Figma Frame 6 / Banner Specification):
        - Desktop: 1440px x 650px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px
        - Tablet (768px): 2-column layout, h-[560px] - h-[650px], vertically centered
        - Mobile: 402px x 659px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient(180deg, #0F68D6 2.92%, #B8B1A5 100%) with banner (1).png (desktop/tablet) / banner (2).png (mobile)
      */}
      <div className="relative w-full min-h-[620px] md:h-[560px] lg:h-[650px] bg-gradient-to-b from-[#0F68D6] from-30% to-[#B8B1A5] rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[28px] md:px-[28px] md:pb-[40px] lg:pt-[40px] lg:px-[32px] xl:px-[60px] lg:pb-[80px] flex flex-col justify-between gap-[20px] md:gap-0">
        
        {/* Background Banner Graphic anchored to bottom */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          {/* Desktop & Tablet Banner Graphic */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/careers/hero-section/banner%20(1).png"
              alt="Careers Background Banner"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
          {/* Mobile Banner Graphic */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/images/careers/hero-section/banner%20(2).png"
              alt="Careers Background Banner Mobile"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* =====================================================================
            TABLET & DESKTOP HERO CONTENT (Figma Frame 8 / Frame 12)
            - Tablet: vertically centered with md:my-auto md:items-center
            - Desktop: 1320px width, height 470px, gap: 20px, align-items: flex-end (lg:my-0 lg:items-end)
            - Left (Frame 12): 650px x 470px with pt-[32px] on desktop
              - Inner Frame 2147203284: 650px x 438px, justify-center
              - Heading: General Sans 48px / 56px, max-w-[650px]
            - Right (Rectangle 131): 650px x 441px team image card, rounded-tl-[80px] rounded-tr-[20px] rounded-br-[80px] rounded-bl-[20px]
           ===================================================================== */}
        <div className="hidden md:flex relative z-10 w-full max-w-[1320px] mx-auto flex-row md:items-center lg:items-end justify-between gap-[20px] md:my-auto lg:my-0 h-auto lg:h-[470px]">
          
          {/* Left Column (Frame 12 -> Frame 2147203284): Heading */}
          <div className="w-full md:w-1/2 max-w-[650px] h-auto lg:h-full pt-0 lg:pt-[32px] flex flex-col justify-center items-start">
            <div className="w-full h-auto lg:h-[438px] flex flex-col justify-center items-start">
              <h1 className="type-h3 tracking-[-0.01em] text-white max-w-[650px]">
                We&apos;re tackling one of healthcare&apos;s hardest problems: rebuilding how healthcare gets paid.
              </h1>
            </div>
          </div>

          {/* Right Column: Team Image Card (Rectangle 131) */}
          <div className="w-full md:w-1/2 max-w-[650px] shrink-0">
            <div className="relative w-full h-[300px] md:h-[340px] lg:h-[441px] rounded-tl-[60px] lg:rounded-tl-[80px] rounded-tr-[20px] rounded-br-[60px] lg:rounded-br-[80px] rounded-bl-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
              <Image
                src="/images/careers/hero-section/img_banner%20(1).png"
                alt="Waterlabs Team"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 650px"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>

        {/* =====================================================================
            MOBILE HERO CONTENT (Figma Frame 2147226740 / Frame 12)
            - Top: Heading (General Sans 36px / 48px)
            - Bottom: Team image card (362px x 246px, rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px])
           ===================================================================== */}
        <div className="flex md:hidden relative z-10 w-full flex-col justify-end items-start gap-[20px] mt-auto">
          
          {/* Top: Heading */}
          <div className="w-full">
            <h1 className="type-h3 tracking-[-0.01em] text-white">
              We&apos;re tackling one of healthcare&apos;s hardest problems: rebuilding how healthcare gets paid.
            </h1>
          </div>

          {/* Bottom: Team Image Card (Rectangle 132) */}
          <div className="w-full relative aspect-[362/246] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
            <Image
              src="/images/careers/hero-section/img_banner%20(1).png"
              alt="Waterlabs Team"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default CareersHeroSection;
