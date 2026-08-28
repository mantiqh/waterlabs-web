'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ComplianceItem {
  id: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  title: string;
  description: string;
}

const complianceList: ComplianceItem[] = [
  {
    id: 'soc2',
    logo: '/images/trust-and-security/certifications/image 98.png',
    logoWidth: 65,
    logoHeight: 82,
    title: 'SOC 2 Type II',
    description: 'Our controls, tested over time. Not a one-day snapshot.',
  },
  {
    id: 'hipaa',
    logo: '/images/trust-and-security/certifications/Hippa_logo.png',
    logoWidth: 144,
    logoHeight: 79,
    title: 'HIPAA',
    description: 'The US baseline for handling protected health information.',
  },
  {
    id: 'iso27001',
    logo: '/images/trust-and-security/certifications/Iso_27001_logo.png',
    logoWidth: 79,
    logoHeight: 79,
    title: 'ISO 27001',
    description: 'The international standard for information security management. In progress; controls already live.',
  },
  {
    id: 'iso27017',
    logo: '/images/trust-and-security/certifications/ISO_27017_27018_logo.png',
    logoWidth: 166,
    logoHeight: 76,
    title: 'ISO 27017 / 27018',
    description: 'The standards for cloud security and protecting personal data in the cloud.',
  },
];

export const CertificationsSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveCardIndex(Math.min(Math.max(index, 0), complianceList.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const clientWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setActiveCardIndex(index);
  };

  return (
    <section 
      id="certifications" 
      className="relative w-full bg-gradient-to-b from-white from-50% to-[#000000] to-50% overflow-hidden p-0 m-0 scroll-mt-[60px]"
    >
      {/* 
        Main Soft Blue Container with left curves (Rectangle 132):
        - Background: #DBE2F0
        - Desktop: rounded-tl-[60px] rounded-bl-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tl-[30px] rounded-bl-[30px], py-[40px] px-[20px]
        - Top-left curve reveals white (#FFFFFF) from Security & Compliance
        - Bottom-left curve reveals black (#000000) from CTA Section
      */}
      <div className="w-full bg-[#DBE2F0] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] pt-[40px] lg:pt-[80px] pb-[40px] lg:pb-[80px] px-[20px] lg:px-[32px] xl:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start gap-[24px] xl:gap-[40px]">
          
          {/* Invisible Spacer matching Data Sovereignty's left column (260px on lg, 305px on xl) */}
          <div className="hidden lg:block w-[260px] xl:w-[305px] shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Main Content Column aligned with 1st right section (Fluid responsive max 975px) */}
          <div className="w-full lg:flex-1 min-w-0 max-w-[975px] flex flex-col gap-[32px] lg:gap-[40px]">
            
            {/* 
              1. TOP HEADLINE (Figma font/h4 token)
              - Font: General Sans, 40px / 48px, -0.01em
              - Color: #042849
            */}
            <h2 className="font-primary font-normal text-[24px] sm:text-[32px] lg:text-[40px] leading-[32px] sm:leading-[40px] lg:leading-[48px] tracking-[-0.01em] text-[#042849] max-w-[850px]">
              All infrastructure runs in the United States. For{' '}
              <br className="hidden lg:inline" />
              many clients that&apos;s not a preference, it&apos;s a{' '}
              <br className="hidden lg:inline" />
              requirement.
            </h2>

            {/* 
              2. UNIFIED WHITE CONTAINER (Figma Frame 2147203234)
              - Dimensions: 975px x 765.24px
              - Background: #FFFFFF, rounded-[20px]
              - Gap: 40px
            */}
            <div className="w-full bg-white rounded-[20px] overflow-hidden flex flex-col gap-[28px] lg:gap-[40px] pb-[28px] lg:pb-[36px] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

              {/* 
                Top Feature Banner Card (Figma Frame 2147203214)
                - Dimensions: 975px x 381px
                - Border Radius: 20px 10px 20px 20px
                - Padding: 40px
                - Background: linear-gradient(72.7deg, rgba(0, 0, 0, 0.55) 33.98%, rgba(0, 0, 0, 0) 61.41%), url(img_the_floor_cleared.png), #000000;
              */}
              <div className="relative w-full h-[320px] lg:h-[381px] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#000000] p-[20px] sm:p-[28px] lg:p-[40px] flex flex-col justify-end items-start overflow-hidden isolate">
                <div className="absolute inset-0 pointer-events-none z-0">
                  <Image
                    src="/images/trust-and-security/certifications/img_the_floor_cleared.png"
                    alt="Data Center Engineer"
                    fill
                    priority
                    className="object-cover object-[72%_center] lg:object-center opacity-90"
                  />
                  {/* Linear gradient overlay matching Figma 72.7deg */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
                </div>
                <div className="relative z-10 flex flex-col gap-[8px] lg:gap-[12px] max-w-[320px] sm:max-w-[440px] lg:max-w-[895px]">
                  <h3 className="font-primary text-[32px] sm:text-[40px] lg:text-[52px] leading-[38px] sm:leading-[48px] lg:leading-[60px] tracking-[-0.01em] text-[#F4F6F9]">
                    <span className="font-normal">
                      The floor,
                      <br />
                    </span>
                    <span className="text-[#63CCB7] font-bold">cleared.</span>
                  </h3>
                  <p className="font-secondary font-normal text-[14px] sm:text-[16px] lg:text-[18px] leading-[20px] sm:leading-[24px] lg:leading-[26px] tracking-normal text-[#D7DCE2]">
                    We comply with all required healthcare standards.
                  </p>
                </div>
              </div>

              {/* 
                Desktop: 4 Compliance Badge Columns (Figma Frame 2147203261 / Frame 2147203252)
              */}
              <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-[20px] xl:gap-[24px] w-full px-[24px]">
                {complianceList.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between h-full min-h-[220px] p-[14px_24px] gap-[32px]"
                  >
                    <div className="flex flex-col gap-[16px]">
                      {/* Badge Logo */}
                      <div className="h-[82px] flex items-center">
                        <Image
                          src={item.logo}
                          alt={item.title}
                          width={item.logoWidth}
                          height={item.logoHeight}
                          className="object-contain max-h-[82px] w-auto"
                        />
                      </div>

                      {/* Divider Line (Vector 7) */}
                      <div className="w-full h-[0px] border-t border-[#D7DCE2]" />

                      {/* Title */}
                      <h4 className="font-secondary font-normal text-[20px] leading-[28px] text-[#0F68D6]">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="font-secondary font-normal text-[16px] leading-[24px] tracking-[0.01em] text-[#111111]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 
                Mobile / Tablet: Horizontal Snap Carousel with Dots Indicator
              */}
              <div className="flex lg:hidden flex-col gap-[16px] w-full px-[16px]">
                <div 
                  ref={carouselRef}
                  onScroll={handleScroll}
                  className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar gap-[16px] w-full"
                >
                  {complianceList.map((item) => (
                    <div
                      key={`mob-${item.id}`}
                      className="w-full min-w-full snap-center flex flex-col justify-between min-h-[220px] p-[16px] bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                    >
                      <div className="flex flex-col gap-[14px]">
                        <div className="h-[60px] flex items-center">
                          <Image
                            src={item.logo}
                            alt={item.title}
                            width={item.logoWidth}
                            height={item.logoHeight}
                            className="object-contain max-h-[60px] w-auto"
                          />
                        </div>
                        <div className="w-full h-[0px] border-t border-[#D7DCE2]" />
                        <h4 className="font-secondary font-normal text-[18px] leading-[26px] text-[#0F68D6]">
                          {item.title}
                        </h4>
                        <p className="font-secondary font-normal text-[14px] leading-[22px] tracking-[0.01em] text-[#111111]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots Indicator */}
                <div className="flex flex-row items-center gap-[6px] self-start pt-[4px]">
                  {complianceList.map((_, idx) => {
                    const isActive = activeCardIndex === idx;
                    return (
                      <button
                        key={`badge-dot-${idx}`}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => scrollToCard(idx)}
                        className={`h-[5px] rounded-[32px] transition-all duration-300 ${
                          isActive
                            ? 'w-[32px] bg-[#0F68D6]'
                            : 'w-[16px] bg-[#0F68D6]/20 hover:bg-[#0F68D6]/40'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
