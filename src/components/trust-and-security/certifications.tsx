'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface ComplianceItem {
  id: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  title: string;
  description: string;
  customLogoClass?: string;
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
    description: 'The United States baseline for handling protected health information.',
  },
  {
    id: 'iso27001',
    logo: '/images/trust-and-security/certifications/Iso_27001_logo.png',
    logoWidth: 79,
    logoHeight: 79,
    title: 'ISO 27001',
    description:
      'The international standard for information security management. In progress; controls already live.',
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

export const CertificationsSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const cardWidth = 289;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(Math.max(index, 0), complianceList.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = 289;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveCardIndex(index);
  };

  return (
    <section
      id="certifications"
      className="relative m-0 w-full scroll-mt-[60px] overflow-hidden bg-gradient-to-b from-[#FFFFFF] from-50% to-[#000000] to-50% p-0"
    >
      {/* 
        Main Light Blue Card (Figma Rectangle 132):
        - Desktop: rounded-tl-[60px] rounded-bl-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tl-[30px] rounded-bl-[30px], py-[40px] px-[20px]
        - Background: #DBE2F0
      */}
      <div className="w-full overflow-hidden rounded-tl-[30px] rounded-bl-[30px] bg-[#DBE2F0] px-[20px] pt-[40px] pb-[60px] md:px-[40px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:pt-[80px] lg:pb-[100px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-[24px] lg:flex-row lg:gap-[40px]">
          {/* Invisible Spacer matching Data Sovereignty's left column (305px) */}
          <div
            className="pointer-events-none hidden w-[305px] shrink-0 lg:block"
            aria-hidden="true"
          />

          {/* Main Content Column (Fluid responsive max 975px) */}
          <div className="flex w-full max-w-[975px] min-w-0 flex-col gap-[32px] lg:flex-1 lg:gap-[48px]">
            {/* 
              1. Top Headline (Placed directly at top of #DBE2F0 section)
              - Token: font/h4 (General Sans, 40px / 48px, -0.01em, Regular 400, #042849)
            */}
            <h2 className="type-h4 max-w-[920px] text-[#042849]">
              All infrastructure runs in the United States. For <br className="hidden lg:inline" />
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
            <div className="flex w-full flex-col gap-[28px] overflow-hidden rounded-[20px] bg-white pb-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] lg:gap-[40px] lg:pb-[36px]">
              {/* 
                Top Feature Banner Card (Figma Frame 2147203214)
                - Mobile: 362px x 331px, img_the_floor_cleared (1).png
                - Desktop: 975px x 381px, img_the_floor_cleared.png
                - Border Radius: 20px 10px 20px 20px
                - Padding: 20px (mobile) / 40px (desktop)
                - Background: linear-gradient(72.7deg, rgba(0, 0, 0, 0.55) 33.98%, rgba(0, 0, 0, 0) 61.41%), url(img_the_floor_cleared.png), #000000;
              */}
              <div className="relative isolate flex h-[331px] w-full flex-col items-start justify-end overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#000000] p-[20px] sm:p-[28px] lg:h-[381px] lg:p-[40px]">
                {/* Desktop Banner Graphic Background */}
                <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
                  <Image
                    src="/images/trust-and-security/certifications/img_the_floor_cleared.png"
                    alt="Data Center Engineer"
                    fill
                    priority
                    className="object-cover object-[72%_center] lg:object-center"
                  />
                </div>

                {/* Mobile Banner Graphic Background */}
                <div className="pointer-events-none absolute inset-0 z-0 block sm:hidden">
                  <Image
                    src="/images/trust-and-security/certifications/img_the_floor_cleared%20(1).png"
                    alt="Data Center Engineer Mobile"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>

                <div className="relative z-10 flex max-w-[895px] flex-col gap-[8px] lg:gap-[12px]">
                  <h3 className="type-h2 text-[#F4F6F9]">
                    <span className="font-normal">
                      The floor,
                      <br />
                    </span>
                    <span className="font-bold text-[#63CCB7]">cleared.</span>
                  </h3>
                  <p className="type-body-xs text-[#D7DCE2]">
                    We comply with all required healthcare standards.
                  </p>
                </div>
              </div>

              {/* 
                Desktop: 4 Compliance Badge Columns (Figma Frame 2147203261 / Frame 2147203252)
              */}
              <div className="hidden w-full grid-cols-2 gap-0 px-[8px] lg:grid xl:grid-cols-4 xl:px-[16px]">
                {complianceList.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-start gap-[32px] px-[14px] py-[14px] xl:px-[20px]"
                  >
                    <div className="flex h-[82px] items-center justify-start">
                      <Image
                        src={item.logo}
                        alt={item.title}
                        width={item.logoWidth}
                        height={item.logoHeight}
                        className="max-h-[82px] w-auto object-contain"
                      />
                    </div>

                    {/* Horizontal Divider Vector 7 */}
                    <div className="h-0 w-full border-t border-[#D7DCE2]" />

                    <div className="flex w-full flex-col gap-[12px]">
                      <h4 className="type-body-s text-[#0F68D6]">{item.title}</h4>
                      <p className="type-body-xxs tracking-[0.01em] text-[#111111]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 
                Mobile / Tablet: Carousel for Compliance Cards (Figma Frame 2147203261 / 3883-11307)
              */}
              <div className="flex w-full flex-col gap-[20px] p-[20px] lg:hidden">
                <div
                  ref={carouselRef}
                  onScroll={handleScroll}
                  className="no-scrollbar flex w-full snap-x snap-mandatory flex-row gap-[20px] overflow-x-auto"
                >
                  {complianceList.map((item) => (
                    <div
                      key={`mobile-${item.id}`}
                      className="flex w-[269px] shrink-0 snap-start flex-col gap-[32px]"
                    >
                      <div className="flex h-[82px] items-center justify-start">
                        <Image
                          src={item.logo}
                          alt={item.title}
                          width={item.logoWidth}
                          height={item.logoHeight}
                          className="max-h-[82px] w-auto object-contain"
                        />
                      </div>

                      {/* Horizontal Divider Vector 7 */}
                      <div className="h-0 w-full border-t border-[#D7DCE2]" />

                      <div className="flex flex-col gap-[12px]">
                        <h4 className="type-body-s text-[#0F68D6]">{item.title}</h4>
                        <p className="type-body-xxs tracking-[0.01em] text-[#111111]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators (Figma node 3883-11307) */}
                <div className="flex flex-row items-center gap-[5px] self-start pt-[4px]">
                  {complianceList.map((_, idx) => {
                    const isActive = activeCardIndex === idx;
                    const isAdjacent = Math.abs(activeCardIndex - idx) === 1;
                    return (
                      <button
                        key={`compliance-dot-${idx}`}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => scrollToCard(idx)}
                        className={`h-[5px] rounded-[32px] transition-all duration-300 ${
                          isActive
                            ? 'w-[32px] bg-[#0F68D6]'
                            : isAdjacent
                              ? 'w-[16px] bg-[#0F68D6]/20 hover:bg-[#0F68D6]/40'
                              : 'w-[6px] bg-[#0F68D6]/20 hover:bg-[#0F68D6]/40'
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
