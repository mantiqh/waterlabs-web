'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';

export const SolutionsHeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/*
        Solutions Hero Banner:
        - Desktop: 1440×653, padding: 40px 60px 80px, gap: 32px
        - Mobile: 402×683, padding: 20px 20px 40px, gap: 20px
        - Background: linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)
        - Border-radius: 0 0 0 60px (desktop) / 0 0 0 60px (mobile)
      */}
      <div
        className="relative w-full min-h-[683px] lg:h-[653px] rounded-bl-[60px] pt-[20px] px-[20px] pb-[40px] md:pt-[28px] md:px-[40px] md:pb-[60px] lg:pt-[40px] lg:px-[60px] lg:pb-[80px] flex flex-col justify-between gap-[20px] lg:gap-[32px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)',
        }}
      >
        {/* Background Banner Graphic with abstract round lines */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-bl-[60px]">
          {/* Desktop & Tablet Banner Graphic */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/solutions/hero-section/img_banner_bg.png"
              alt="Solutions Gradient Background"
              fill
              priority
              className="object-cover object-right-bottom md:object-bottom"
            />
          </div>
          {/* Mobile Banner Graphic */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/images/solutions/hero-section/img_banner_bg%20_mobile(1).png"
              alt="Solutions Gradient Background Mobile"
              fill
              priority
              className="object-cover object-right-bottom md:object-bottom"
            />
          </div>
        </div>

        {/* Top Navbar */}
        <div className="relative z-50 w-full">
          <Navbar />
        </div>

        {/* Desktop: Two-Column Hero Content */}
        <div className="hidden lg:flex relative z-10 w-full max-w-[1320px] mx-auto flex-row items-center justify-between gap-[20px]">
          {/* Left Column: Text Content */}
          <div className="w-full lg:flex-1 lg:max-w-[650px] flex flex-col justify-center gap-[20px] pt-[32px] lg:pt-0">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
              <span className="type-body-xxs text-[#D7DCE2] tracking-[0.01em]">
                The Revenue Cycle &middot; Eligibility &amp; Benefits Verification
              </span>
            </div>

            {/* Headline */}
            <h2 className="type-h1 text-white tracking-[-0.01em]">
              Every patient verified before they arrive.
            </h2>

            {/* Description */}
            <p className="type-body-s text-[#F4F6F9] max-w-[650px]">
              Our agents check coverage, benefits, and patient responsibility ahead of the visit.
            </p>

            {/* CTA Button */}
            <div>
              <Link href="/contact-us">
                <CTA variant="dark-bg" as="div">
                  Get a Demo
                </CTA>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative w-full lg:flex-1 lg:max-w-[650px] aspect-[650/441] rounded-[20px] overflow-hidden z-[2]">
            <Image
              src="/images/solutions/hero-section/img_banner%20(5).png"
              alt="Patient eligibility verification digital cards"
              fill
              priority
              sizes="(max-width: 1440px) 50vw, 650px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Mobile & Tablet: Stacked Hero Content */}
        <div className="flex lg:hidden relative z-10 w-full flex-col items-start gap-[20px]">
          {/* Tag */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
            <span className="type-body-xxs text-[#D7DCE2] tracking-[0.01em]">
              The Revenue Cycle &middot; Eligibility &amp; Benefits <br className="block sm:hidden" />Verification
            </span>
          </div>

          {/* Headline */}
          <h2 className="type-h1 text-white tracking-[-0.01em]">
            Every patient verified before they arrive.
          </h2>

          {/* Description */}
          <p className="type-body-s text-[#F4F6F9]">
            Our agents check coverage, benefits, and patient responsibility ahead of the visit.
          </p>

          {/* CTA Button */}
          <div>
            <Link href="/contact-us">
              <CTA variant="dark-bg" as="div">
                Get a Demo
              </CTA>
            </Link>
          </div>

          {/* Hero Image (Mobile & Tablet) */}
          <div className="relative w-full aspect-[362/246] rounded-[20px] overflow-hidden z-[2]">
            <Image
              src="/images/solutions/hero-section/img_banner_mobile%20(6).png"
              alt="Patient eligibility verification digital cards"
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

export default SolutionsHeroSection;
