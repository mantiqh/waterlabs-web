'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';

export const TrustHeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 
        Trust & Security Hero Banner (Figma Specification):
        - Desktop: 1440px x 650px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px
        - Tablet (768px): 2-column layout like desktop, h-[560px] - h-[650px]
        - Mobile: 402px x 490px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px
        - Background: linear-gradient(180deg, #0F68D6 41.31%, #9A84E3 100%) with banner.png
      */}
      <div className="relative w-full h-[490px] md:h-[560px] lg:h-[650px] bg-gradient-to-b from-[#0F68D6] from-40% to-[#9A84E3] rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[28px] md:px-[28px] md:pb-[40px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-between gap-[20px] md:gap-0 overflow-hidden isolate">
        
        {/* Background Banner Graphic aligned to bottom */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Desktop & Tablet Banner Graphic */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/trust-and-security/hero-section/banner.png"
              alt="Trust and Security Gradient Background"
              fill
              priority
              className="object-cover object-bottom"
            />
          </div>
          {/* Mobile Banner Graphic */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/images/trust-and-security/hero-section/banner%20(3).png"
              alt="Trust and Security Gradient Background Mobile"
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
            TABLET & DESKTOP HERO CONTENT (Figma Frame 12)
            - 1320px max-width, height 470px, gap: 20px, pt-[32px]
            - Left: Heading text, General Sans 52px / 60px (Display/H2), 650px width
            - Right (Frame 2147203200 / Rectangle 131): Doctor image card 650px x 441px, rounded-tl-[80px] rounded-tr-[20px] rounded-br-[80px] rounded-bl-[20px]
           ===================================================================== */}
        <div className="hidden md:flex relative z-10 w-full max-w-[1320px] mx-auto flex-row items-center justify-between gap-[20px] md:my-auto lg:my-0 h-auto lg:h-[470px] pt-0 lg:pt-[32px]">
          
          {/* Left Column: Heading (Display/H2: 52px / 60px in Figma, 650px x 120px) */}
          <div className="w-full md:w-1/2 max-w-[650px] h-auto lg:h-[441px] flex flex-col justify-center items-start">
            <h1 className="font-primary font-normal text-[32px] md:text-[36px] lg:text-[52px] leading-[40px] md:leading-[44px] lg:leading-[60px] tracking-[-0.01em] text-white max-w-[650px]">
              Your patient data never leaves your environment.
            </h1>
          </div>

          {/* Right Column: Doctor Image Card (Rectangle 131: 650px x 441px) */}
          <div className="w-full md:w-1/2 max-w-[650px] shrink-0">
            <div className="relative w-full h-[300px] md:h-[340px] lg:h-[441px] rounded-tl-[60px] lg:rounded-tl-[80px] rounded-tr-[20px] rounded-br-[60px] lg:rounded-br-[80px] rounded-bl-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/trust-and-security/hero-section/img_banner%20(2).png"
                alt="Healthcare Provider Reviewing MRI Scans"
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 650px"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>

        {/* =====================================================================
            MOBILE HERO CONTENT (< 768px Phone screens only - Figma Frame 2147226740 / Frame 12)
            - Full width matching Navbar, Gap: 12px, justify-end
            - Top: Doctor image card (rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px])
            - Bottom: Heading text (General Sans 32px / 40px, Display/H2 mobile spec)
           ===================================================================== */}
        <div className="flex md:hidden relative z-10 w-full flex-col justify-end items-start gap-[12px]">
          
          {/* Top: Doctor Image Card (Rectangle 131) */}
          <div className="w-full relative aspect-[362/245] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <Image
              src="/images/trust-and-security/hero-section/img_banner%20(2).png"
              alt="Healthcare Provider Reviewing MRI Scans"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Bottom: Heading */}
          <div className="w-full">
            <h1 className="font-primary font-normal text-[32px] leading-[40px] tracking-[-0.01em] text-white">
              Your patient data never leaves your environment.
            </h1>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustHeroSection;
