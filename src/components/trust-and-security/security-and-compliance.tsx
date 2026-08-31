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
      className="relative w-full bg-gradient-to-b from-[#000000] from-50% to-[#DBE2F0] to-50% overflow-hidden p-0 m-0 scroll-mt-[60px]"
    >
      {/* 
        Main White Card with right curves:
        - Desktop: rounded-tr-[60px] rounded-br-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tr-[30px] rounded-br-[30px], py-[40px] px-[20px]
        - Background behind the curve reveals the black background (#000000) of adjacent sections.
      */}
      <div className="w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] pt-[40px] lg:pt-[80px] pb-[60px] lg:pb-[100px] px-[20px] md:px-[40px] lg:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start gap-[24px] lg:gap-[40px]">
          
          {/* Invisible Spacer matching Data Sovereignty's left column (305px) */}
          <div className="hidden lg:block w-[305px] shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Main Content Column aligned with 1st right section (Fluid responsive max 975px) */}
          <div className="w-full lg:flex-1 min-w-0 max-w-[975px] flex flex-col gap-[36px] lg:gap-[48px]">
            
            {/* 
              Top Feature Banner Card with 3D Shield (Figma Frame 2147203214)
              - Mobile: 362px x 320px, img_built_so_one_breach_cant_become_everyone_breach (1).png
              - Desktop: 975px x 381px, img_built_so_one_breach_cant_become_everyone_breach.png
              - Border Radius: 20px 10px 20px 20px
              - Padding: 20px (mobile) / 40px (desktop)
              - Background: #E7E7F4 with 3D shield graphic
              - Heading: General Sans, 32px / 40px (mobile) -> 52px / 60px (desktop), -0.01em, #111111 / #0F68D6 (Bold 700)
            */}
            <div className="relative w-full h-[320px] lg:h-[381px] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#E7E7F4] p-[20px] sm:p-[28px] lg:p-[40px] flex flex-col justify-end items-start overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] isolate">
              
              {/* Desktop Banner Graphic Background */}
              <div className="hidden sm:block absolute inset-0 pointer-events-none z-0">
                <Image
                  src="/images/trust-and-security/security-and-compliance/img_built_so_one_breach_cant_become_everyone_breach.png"
                  alt="Security Breach Containment"
                  fill
                  priority
                  className="object-cover object-right"
                />
              </div>

              {/* Mobile Banner Graphic Background */}
              <div className="block sm:hidden absolute inset-0 pointer-events-none z-0">
                <Image
                  src="/images/trust-and-security/security-and-compliance/img_built_so_one_breach_cant_become_everyone_breach%20(1).png"
                  alt="Security Breach Containment Mobile"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              <h2 className="relative z-10 type-h2 max-w-[895px]">
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
            <p className="type-body-xs text-[#111111]">
              Certifications are the floor, not the story. The story is how the system contains a problem before it spreads.
            </p>

            {/* =====================================================================
                DESKTOP: 2 Alternating Cards (Figma Layout)
               ===================================================================== */}
            <div className="hidden lg:flex flex-col gap-[36px] lg:gap-[48px] w-full">
              
              {/* Card 1: Closely monitored agents (Image on Left, Text on Right) */}
              <div className="flex flex-row items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-[16px] xl:rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                  <Image
                    src="/images/trust-and-security/security-and-compliance/img_closely_monitored_agents.png"
                    alt="Closely Monitored Agents"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="type-h5 text-[#042849]">
                    Closely monitored agents
                  </h4>
                  <p className="type-body-xxs text-[#111111]">
                    No agent works without limits. Each sees and does only what its task requires. Anything outside that boundary is captured, flagged, and escalated to a human. A human stays in the loop on every exception.
                  </p>
                </div>
              </div>

              {/* Card 2: Business Associate Agreement, every time (Text on Left, Image on Right) */}
              <div className="flex flex-row-reverse items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
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
                  <h4 className="type-h5 text-[#042849]">
                    Business Associate Agreement, every time
                  </h4>
                  <p className="type-body-xxs text-[#111111]">
                    We sign a comprehensive BAA with every client before a single system connects. Our compliance posture isn&apos;t an afterthought. It&apos;s the condition under which we operate.
                  </p>
                </div>
              </div>

            </div>

            {/* =====================================================================
                MOBILE / TABLET: Horizontal Scrollable Cards with Dots Indicator
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
                      alt="Closely Monitored Agents"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="type-h5 text-[#042849]">
                      Closely monitored agents
                    </h4>
                    <p className="type-body-xxs text-[#111111]">
                      No agent works without limits. Each sees and does only what its task requires. Anything outside that boundary is captured, flagged, and escalated to a human. A human stays in the loop on every exception.
                    </p>
                  </div>
                </div>

                {/* Mobile Card 2 */}
                <div className="w-full min-w-full snap-center flex flex-col gap-[16px]">
                  <div className="w-full relative aspect-[362/250] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-100">
                    <Image
                      src="/images/trust-and-security/security-and-compliance/img_business_associate_agreement_every_time.png"
                      alt="Business Associate Agreement"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="type-h5 text-[#042849]">
                      Business Associate Agreement, every time
                    </h4>
                    <p className="type-body-xxs text-[#111111]">
                      We sign a comprehensive BAA with every client before a single system connects. Our compliance posture isn&apos;t an afterthought. It&apos;s the condition under which we operate.
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
                      className={`h-[6px] rounded-[32px] transition-all duration-300 ${
                        isActive
                          ? 'w-[32px] bg-[#042849]'
                          : 'w-[16px] bg-[#042849]/20 hover:bg-[#042849]/40'
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
