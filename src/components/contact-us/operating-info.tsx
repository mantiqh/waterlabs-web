'use client';

import React from 'react';

import { CTA } from '@/components/CTA';

interface LocationCardProps {
  tag: string;
  title: string;
  address: React.ReactNode;
  email: string;
  hours: string;
  buttonText: string;
  href: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  tag,
  title,
  address,
  email,
  hours,
  buttonText,
  href,
}) => {
  return (
    <div className="flex flex-col items-start gap-[8px] lg:gap-[14px] pb-[12px] lg:pb-0 border-b border-[#D7DCE2] lg:border-b-0 w-full lg:w-[418.67px]">
      {/* Text - Tag */}
      <div className="flex items-center gap-[4px] lg:gap-[8px] h-[16px] lg:h-[24px]">
        <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
        <span className="text-[12px] leading-[16px] lg:type-body-xxs tracking-[0.01em] text-[#7D8690]">
          {tag}
        </span>
      </div>

      {/* Content Container (Frame 2147226528) */}
      <div className="flex flex-row justify-between items-end lg:flex-col lg:items-start lg:justify-start gap-[12px] lg:gap-[16px] w-full flex-grow">
        {/* Text Block (Frame 2147226530 / 2147226531) */}
        <div className="flex flex-col items-start gap-[12px] flex-grow">
          <h3 className="text-[18px] leading-[26px] lg:type-h6 tracking-[-0.01em] text-[#0F68D6]">
            {title}
          </h3>
          <p className="text-[14px] leading-[20px] lg:type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
            {address}
          </p>
          <p className="text-[14px] leading-[20px] lg:type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
            {email}
          </p>
          <p className="text-[14px] leading-[20px] lg:type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
            {hours}
          </p>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <CTA variant="light-bg">
              {buttonText}
            </CTA>
          </a>
        </div>

        {/* Mobile Circular CTA Button (Fill - arrow - indicator: 34px x 34px) */}
        <div className="block lg:hidden shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={buttonText}
            className="w-[34px] h-[34px] rounded-full bg-[#0F68D6] flex items-center justify-center hover:bg-royal-blue transition-colors shrink-0"
          >
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[9px] h-[13px]">
              <path d="M2 2L7 7L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export const ContactUsOperatingInfo: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#8EBFE7] from-50% to-ghost-white to-50% overflow-hidden">
      {/* 
        Operating Info / Locations Section:
        - Desktop: 1440px, padding: 80px 60px, bg: white, border-radius: 0px 60px 60px 0px
        - Mobile: padding: 40px 20px, bg: white, border-radius: 0px 30px 30px 0px
        - Contains two location cards side by side on desktop (gap: 32px), stacked on mobile
      */}
      <div className="w-full bg-white rounded-r-[30px] lg:rounded-r-[60px] py-[40px] px-[20px] lg:py-[80px] lg:px-[60px]">
        <div className="relative z-10 w-full max-w-[1320px] mx-auto">
          {/* Frame 2147226790 / Frame 2147226529 */}
          <div className="flex flex-col lg:flex-row items-start gap-[32px] max-w-[869.33px]">
            <LocationCard
              tag="Operating Info - United States"
              title="Waterlabs Inc."
              address={
                <>
                  1201 Orange Street, Suite 600,<br className="hidden lg:inline" />{' '}
                  Wilmington, DE 19801
                </>
              }
              email="info@waterlabs.ai"
              hours="Mon-Fri: 9:00 AM - 6:00 PM EST"
              buttonText="Get Directions"
              href="https://maps.google.com/?q=1201+Orange+Street+Suite+600+Wilmington+DE+19801"
            />
            <LocationCard
              tag="Operating Info - India"
              title="Waterlabs Inc."
              address={
                <>
                  19th Floor, Tower A, Brigade Signature<br className="hidden lg:inline" />{' '}
                  Towers, Bangalore, KA – 560049
                </>
              }
              email="info@waterlabs.ai"
              hours="Mon-Fri: 9:00 AM - 6:00 PM IST"
              buttonText="Get Directions"
              href="https://maps.google.com/?q=Brigade+Signature+Towers+Bangalore"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsOperatingInfo;
