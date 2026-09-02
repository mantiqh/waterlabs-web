'use client';

import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/common/navbar';

export const PhilosophyHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#111111] overflow-hidden">
      {/* 
        Philosophy Hero Banner (Figma Specifications):
        - Desktop: 1440px x 650px, border-radius: 0px 0px 0px 60px, padding: 40px 60px 80px, gap: 10px
        - Mobile: 402px x 600px, border-radius: 0px 0px 0px 30px, padding: 20px 20px 40px, gap: 48px
        - Desktop Background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), linear-gradient(0.13deg, #042849 -1.52%, #63CCB7 107.65%)
        - Mobile Background: linear-gradient(0.13deg, rgba(4, 40, 73, 0.6) -1.52%, rgba(99, 204, 183, 0.6) 107.65%), #000000
        - Strict: Centralized typography token only (type-h2), no <h1> tags
      */}
      <div
        className="relative w-full h-[600px] lg:h-[650px] rounded-bl-[30px] lg:rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[32px] md:px-[40px] md:pb-[60px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-start lg:justify-between gap-[48px] lg:gap-[10px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), linear-gradient(0.13deg, #042849 -1.52%, #63CCB7 107.65%)',
        }}
      >
        {/* Background Banner Graphics */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-bl-[30px] lg:rounded-bl-[60px]">
          {/* Desktop / Tablet Graphic */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/philosophy/hero-section/img_banner (4).png"
              alt="Philosophy Hero Banner Graphic"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          {/* Mobile Graphic */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/images/philosophy/hero-section/banner-mobile.png"
              alt="Philosophy Hero Banner Graphic Mobile"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Top Navbar (Figma Frame 9 / Component 1) */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Content Container (Figma Mobile Frame 2147226740 / Frame 12 | Desktop Frame 8 / Frame 12) */}
        <div className="relative z-10 w-full max-w-[362px] lg:max-w-[1320px] mx-auto flex flex-col justify-start lg:justify-center items-start pt-[0px] lg:pt-[32px] flex-1">
          <div className="w-full max-w-[362px] lg:max-w-[664px]">
            <h2 className="type-h1 lg:type-h2">
              <span className="text-white">
                Each year, health systems<br className="hidden lg:inline" />{' '}
                spend billions to collect<br className="hidden lg:inline" />{' '}
              </span>
              <span className="text-[#63CCB7]">
                revenue they have already<br className="hidden lg:inline" />{' '}
                earned.
              </span>
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhilosophyHeroSection;
