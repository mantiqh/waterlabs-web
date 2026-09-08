'use client';

import Link from 'next/link';
import React from 'react';

import { CTA } from '@/components/CTA';

interface CaseStudyCTAProps {
  tagText?: string;
  headline?: string;
  buttonText?: string;
  buttonHref?: string;
}

export const CaseStudyCTA: React.FC<CaseStudyCTAProps> = ({
  tagText = 'Talk to us.',
  headline = 'Schedule a 15-minute call to see how Waterlabs can impact your organization’s results.',
  buttonText = 'Get a Demo',
  buttonHref = '/contact-us',
}) => {
  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#F4F6F9] from-50% to-[#111111] to-50%">
      {/* 
        Case Study Bottom CTA Banner (Figma Frame 2147226494, node 5419-5637):
        - Frame dimensions: max-w-[1440px], padding: 60px (desktop)
        - Background: #0F68D6 (Electric Blue)
        - Border radius: 0px 30px 30px 30px (desktop)
        - Gap: 20px
      */}
      <div className="w-full bg-[#0F68D6] rounded-tl-[0px] rounded-tr-[24px] sm:rounded-tr-[30px] rounded-br-[24px] sm:rounded-br-[30px] rounded-bl-[24px] sm:rounded-bl-[30px] py-[40px] px-[20px] md:py-[48px] md:px-[40px] lg:py-[60px] lg:px-[60px]">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[28px] lg:gap-[20px]">
          
          {/* Left Column: Tag and Headline (Frame 2147226946) */}
          <div className="w-full lg:max-w-[1080px] flex-1 flex flex-col justify-center items-start gap-[12px] lg:gap-[16px]">
            
            {/* Text - Tag */}
            <div className="flex flex-row items-center gap-[8px]">
              {/* Ellipse 2: 8px x 8px, #91C6F2 */}
              <div className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
              {/* Tag Text: Body/Body-XXS token */}
              <span className="type-body-xxs tracking-[0.01em] text-[#F4F6F9]">
                {tagText}
              </span>
            </div>

            {/* Headline: Display/H2 token */}
            <h2 className="type-h2 text-white">
              {headline.includes('see how') ? (
                <>
                  <span className="block">Schedule a 15-minute call to see how</span>
                  <span className="block sm:whitespace-nowrap">Waterlabs can impact your organization’s results.</span>
                </>
              ) : (
                headline
              )}
            </h2>

          </div>

          {/* Right Column: CTA Action Button (Desktop - Fill CTA) */}
          <div className="shrink-0 flex items-center pt-[4px] lg:pt-0">
            <Link href={buttonHref}>
              <CTA variant="dark-bg">
                {buttonText}
              </CTA>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudyCTA;
