'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

export const TrustCTASection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#DBE2F0] overflow-hidden p-0 m-0">
      {/* 
        Main Dark CTA Card with top-right curve:
        - Desktop: Frame 1272628356 (width: 1440px, height: 444px, padding: 80px 60px, rounded-tr-[80px])
        - Mobile: padding: 40px 20px, rounded-tr-[30px] rounded-br-none, min-h-[350px]
        - Top-right curve reveals the #DBE2F0 background from the Certifications section.
      */}
      <div className="relative w-full min-h-[350px] lg:h-[444px] bg-[#000000] rounded-tr-[30px] rounded-br-none lg:rounded-tr-[80px] py-[40px] px-[20px] lg:py-[80px] lg:px-[60px] flex flex-col justify-center overflow-hidden">
        
        {/* Desktop Background Image & Gradient */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/trust-and-security/cta-section/img_trust_cta_desktop.png"
            alt="Trust & Security CTA Desktop Background"
            fill
            priority
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Mobile / Tablet Background Image */}
        <div className="block lg:hidden absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/trust-and-security/cta-section/cta-mobile.png"
            alt="Trust & Security CTA Mobile Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Content Container (Frame 21: max-w 1320px, height 284px on desktop) */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-[28px] lg:gap-[40px]">
          
          {/* Left Text Block (Frame 1272628347: width 873px) */}
          <div className="w-full max-w-[873px] flex flex-col justify-center items-start gap-[16px] lg:gap-[20px]">
            
            {/* Frame 17: Tagline */}
            <div className="flex items-center gap-[6px] lg:gap-[8px]">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
              <span className="font-secondary font-normal text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] text-white tracking-[0.01em]">
                Don&apos;t just automate your revenue cycle. Apply intelligence to it.
              </span>
            </div>

            {/* Display/H3 Heading with #91C6F2 accent for "Ours has answers." */}
            <h2 className="font-primary font-normal text-[28px] sm:text-[36px] lg:text-[48px] leading-[36px] sm:leading-[44px] lg:leading-[56px] tracking-[-0.01em]">
              <span className="text-white">
                Your security team<br className="hidden sm:inline" /> probably has questions.<br className="hidden sm:inline" />{' '}
              </span>
              <span className="text-[#91C6F2]">
                Ours has answers.
              </span>
            </h2>

            {/* Subtext (18px/26px #F4F6F9) */}
            <p className="font-secondary font-normal text-[14px] sm:text-[16px] lg:text-[18px] leading-[22px] sm:leading-[24px] lg:leading-[26px] text-[#F4F6F9]">
              Send us your questionnaire, your review, your hardest questions. Or <Link href="mailto:security@waterlabs.ai" className="underline hover:text-white transition-colors">contact us here</Link>.
            </p>

          </div>

          {/* Frame 3 / Frame 7: Right CTA Action Button (Blue pill with white text & light blue arrow) */}
          <div className="shrink-0 self-start lg:self-end pt-[8px] lg:pt-0">
            <Link href="mailto:security@waterlabs.ai">
              <CTA variant="light-bg">
                Talk to our security team
              </CTA>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustCTASection;
