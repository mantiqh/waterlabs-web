'use client';

import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export const SolutionsCTASection: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #111111 100%)',
      }}
    >
      {/*
        CTA Banner Section:
        - Outer: gradient #FFFFFF → #111111
        - Inner: #0F68D6, border-radius: 0 30px 30px 30px (desktop) / 0 30px 30px 0 (mobile)
        - Desktop: padding 60px, gap 20px
        - Mobile: padding 40px 20px, gap 24px
        - No images
      */}
      <div className="w-full bg-electric-blue rounded-tr-[30px] rounded-br-[30px] lg:rounded-bl-[30px] px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[50px] lg:py-[60px]">
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[24px] lg:gap-[20px]">

          {/* Heading */}
          <h2 className="type-h2 text-white max-w-[1148px]">
            Discover how this works on{' '}
            <br className="hidden lg:block" />
            your patient schedule.
          </h2>

          {/* CTA Button */}
          <div className="shrink-0">
            <Link href="/contact-us">
              <CTA variant="dark-bg">
                Get a Demo
              </CTA>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionsCTASection;
