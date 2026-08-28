'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

export const SecurityAndComplianceSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveCardIndex(Math.min(Math.max(index, 0), 1));
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
      id="security-and-compliance" 
      className="relative w-full bg-gradient-to-b from-[#000000] from-50% to-white to-50% overflow-hidden p-0 m-0 scroll-mt-[60px]"
    >
      {/* 
        Main White Card with right curves:
        - Desktop: rounded-tr-[60px] rounded-br-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tr-[30px] rounded-br-[30px], py-[40px] px-[20px]
        - Background behind the top-right curve reveals the black (#000000) of Our Own Cloud.
      */}
      <div className="w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] pt-[40px] lg:pt-[80px] pb-[60px] lg:pb-[100px] px-[20px] lg:px-[32px] xl:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start gap-[24px] xl:gap-[40px]">
          
          {/* Invisible Spacer matching Data Sovereignty's left column (260px on lg, 305px on xl) */}
          <div className="hidden lg:block w-[260px] xl:w-[305px] shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Main Content Column aligned with 1st right section (Fluid responsive max 975px) */}
          <div className="w-full lg:flex-1 min-w-0 max-w-[975px] flex flex-col gap-[36px] lg:gap-[48px]">
            
            {/* 
              Top Feature Banner Card with 3D Shield (Figma Frame 2147203214)
              - Dimensions: 975px x 381px
              - Border Radius: 20px 10px 20px 20px
              - Padding: 40px
              - Background: #E7E7F4 with 3D shield graphic
              - Heading: General Sans, 52px / 60px, -0.01em, #111111 / #0F68D6 (Bold 700)
            */}
            <div className="relative w-full h-[320px] lg:h-[381px] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#E7E7F4] p-[20px] sm:p-[28px] lg:p-[40px] flex flex-col justify-end items-start overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] isolate">
              <div className="absolute inset-0 pointer-events-none z-0">
                <Image
                  src="/images/trust-and-security/security-and-compliance/img_built_so_one_breach_cant_become_everyone_breach.png"
                  alt="Security Breach Containment"
                  fill
                  priority
                  className="object-cover object-[75%_12%] sm:object-[70%_20%] lg:object-right opacity-95"
                />
              </div>
              <h2 className="relative z-10 font-primary text-[32px] sm:text-[40px] lg:text-[52px] leading-[40px] sm:leading-[48px] lg:leading-[60px] tracking-[-0.01em] max-w-[320px] sm:max-w-[420px] lg:max-w-[620px]">
                <span className="text-[#111111] font-normal">
                  Built so one breach
                  <br />
                  can&apos;t become
                </span>
                <br />
                <span className="text-[#0F68D6] font-bold">everyone&apos;s breach.</span>
              </h2>
            </div>

            {/* Intro Paragraph */}
            <p className="font-secondary font-normal text-[14px] sm:text-[16px] xl:text-[18px] leading-[24px] xl:leading-[26px] text-[#111111]">
              Certifications are the floor, not the story. The story is how the system contains a problem before it spreads.
            </p>

            {/* =====================================================================
                DESKTOP: 2 Alternating Cards
               ===================================================================== */}
            <div className="hidden lg:flex flex-col gap-[40px] xl:gap-[48px] w-full">
              
              {/* Card 1: Closely monitored agents */}
              <div className="flex flex-row items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px] bg-white rounded-[20px] p-0">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-[16px] xl:rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                  <Image
                    src="/images/trust-and-security/security-and-compliance/img_closely_monitored_agents.png"
                    alt="Closely monitored agents"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[38px] xl:leading-[40px] tracking-[-0.01em] text-[#042849]">
                    Closely monitored agents
                  </h4>
                  <p className="font-secondary font-normal text-[14px] sm:text-[15px] xl:text-[17px] leading-[22px] sm:leading-[24px] xl:leading-[26px] text-[#111111]">
                    No agent works without limits. Each sees and does only what its task requires. Anything outside that boundary is captured, flagged, and escalated to a human. A human stays in the loop on every exception.
                  </p>
                </div>
              </div>

              {/* Card 2: Business Associate Agreement, every time */}
              <div className="flex flex-row-reverse items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px] bg-white rounded-[20px] p-0">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-[16px] xl:rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                  <Image
                    src="/images/trust-and-security/security-and-compliance/img_business_associate_agreement_every_time.png"
                    alt="Business Associate Agreement"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[38px] xl:leading-[40px] tracking-[-0.01em] text-[#042849]">
                    Business Associate Agreement, every time
                  </h4>
                  <p className="font-secondary font-normal text-[14px] sm:text-[15px] xl:text-[17px] leading-[22px] sm:leading-[24px] xl:leading-[26px] text-[#111111]">
                    BAA is standard with every Waterlabs engagement. By law, it puts accountability on us for what we handle. We sign it because we stand behind it.
                  </p>
                </div>
              </div>

            </div>

            {/* =====================================================================
                MOBILE / TABLET: Horizontal Snap Carousel with Dots Indicator
               ===================================================================== */}
            <div className="flex lg:hidden flex-col gap-[16px] w-full">
              <div 
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar gap-[16px] w-full"
              >
                
                {/* Mobile Card 1 */}
                <div className="w-full min-w-full snap-center flex flex-col gap-[16px]">
                  <div className="w-full relative aspect-[362/250] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                    <Image
                      src="/images/trust-and-security/security-and-compliance/img_closely_monitored_agents.png"
                      alt="Closely monitored agents"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="font-primary font-normal text-[20px] leading-[28px] text-[#0F68D6]">
                      Closely monitored agents
                    </h4>
                    <p className="font-secondary font-normal text-[14px] leading-[24px] text-[#111111]">
                      No agent works without limits. Each sees and does only what its task requires. Anything outside that boundary is captured, flagged, and escalated to a human. A human stays in the loop on every exception.
                    </p>
                  </div>
                </div>

                {/* Mobile Card 2 */}
                <div className="w-full min-w-full snap-center flex flex-col gap-[16px]">
                  <div className="w-full relative aspect-[362/250] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                    <Image
                      src="/images/trust-and-security/security-and-compliance/img_business_associate_agreement_every_time.png"
                      alt="Business Associate Agreement, every time"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="font-primary font-normal text-[20px] leading-[28px] text-[#0F68D6]">
                      Business Associate Agreement, every time
                    </h4>
                    <p className="font-secondary font-normal text-[14px] leading-[24px] text-[#111111]">
                      BAA is standard with every Waterlabs engagement. By law, it puts accountability on us for what we handle. We sign it because we stand behind it.
                    </p>
                  </div>
                </div>

              </div>

              {/* Dots Indicator (No scrollbar track line) */}
              <div className="flex flex-row items-center gap-[6px] self-start pt-[4px]">
                {[0, 1].map((idx) => {
                  const isActive = activeCardIndex === idx;
                  return (
                    <button
                      key={`carousel-dot-${idx}`}
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
    </section>
  );
};

export default SecurityAndComplianceSection;
