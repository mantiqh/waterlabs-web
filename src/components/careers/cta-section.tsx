'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export const CareersCTASection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 
        CTA Card with Top-Right rounded corner:
        - Desktop: rounded-tr-[80px], py-[80px] px-[60px], min-h-[508px]
        - Mobile: rounded-tr-[30px], py-[40px] px-[20px], min-h-[402px]
      */}
      <div className="relative w-full rounded-tr-[30px] lg:rounded-tr-[80px] py-[40px] px-[20px] lg:py-[80px] lg:px-[60px] min-h-[402px] lg:min-h-[508px] flex flex-col justify-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/careers/cta-section/img_come_do_the_most_meaningful_work_of_your_career.png"
            alt="Come do the most meaningful work of your career"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col items-start gap-[20px] lg:gap-[24px]">
          
          {/* Main Text Content Block */}
          <div className="w-full max-w-[687px] flex flex-col items-start gap-[14px] lg:gap-[20px]">
            
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              {/* Desktop Tag Text */}
              <span className="hidden lg:inline font-secondary font-normal text-[16px] leading-[24px] tracking-[0.01em] text-white">
                Don&apos;t just automate your revenue cycle. Apply intelligence to it.
              </span>
              {/* Mobile Tag Text */}
              <span className="inline lg:hidden font-secondary font-normal text-[12px] leading-[16px] tracking-[0.01em] text-white">
                See it run on your payer mix.
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-primary font-normal text-[28px] lg:text-[48px] leading-[36px] lg:leading-[56px] tracking-[-0.01em] text-white lg:text-[#91C6F2]">
              Come do the most meaningful work of your career. On a problem that matters.
            </h2>

            {/* Description Subheading */}
            <p className="font-secondary font-normal text-[14px] lg:text-[18px] leading-[24px] lg:leading-[26px] text-[#F4F6F9] max-w-[566px]">
              We work for impact. The applause follows. Your work matters. We&apos;ll help you turn it into results that are visible.
            </p>

          </div>

          {/* CTA Action Button */}
          <div className="mt-[4px] lg:mt-[8px]">
            <Link href="#open-roles">
              <CTA variant="dark-bg">
                See Open Roles
              </CTA>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CareersCTASection;
