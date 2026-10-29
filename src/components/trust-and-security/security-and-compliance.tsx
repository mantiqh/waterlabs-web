'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export const SecurityAndComplianceSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const firstCard = carouselRef.current.children[0] as HTMLElement;
    const step = firstCard ? firstCard.offsetWidth + 16 : carouselRef.current.clientWidth;
    const index = Math.round(scrollLeft / step);
    setActiveCardIndex(Math.min(Math.max(index, 0), 1));
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index] as HTMLElement;
    if (card) {
      carouselRef.current.scrollTo({
        left: card.offsetLeft - carouselRef.current.offsetLeft,
        behavior: 'smooth',
      });
    }
    setActiveCardIndex(index);
  };

  return (
    <section
      id="security-and-compliance"
      className="relative m-0 w-full scroll-mt-[60px] overflow-hidden bg-gradient-to-b from-[#000000] from-50% to-[#DBE2F0] to-50% p-0"
    >
      {/* 
        Main White Card with right curves:
        - Desktop: rounded-tr-[60px] rounded-br-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tr-[30px] rounded-br-[30px], py-[40px] px-[20px]
        - Background behind the curve reveals the black background (#000000) of adjacent sections.
      */}
      <div className="w-full overflow-hidden rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] pt-[40px] pb-[60px] md:px-[40px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:pt-[80px] lg:pb-[100px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-[24px] lg:flex-row lg:gap-[40px]">
          {/* Invisible Spacer matching Data Sovereignty's left column (305px) */}
          <div
            className="pointer-events-none hidden w-[305px] shrink-0 lg:block"
            aria-hidden="true"
          />

          {/* Main Content Column aligned with 1st right section (Fluid responsive max 975px) */}
          <div className="flex w-full max-w-[975px] min-w-0 flex-col gap-0 lg:flex-1 lg:gap-[48px]">
            {/* 
              Top Feature Banner Card with 3D Shield (Figma Frame 2147203214)
              - Mobile: 362px x 320px, img_built_so_one_breach_cant_become_everyone_breach (1).png
              - Desktop: 975px x 381px, img_built_so_one_breach_cant_become_everyone_breach.png
              - Border Radius: 20px 10px 20px 20px
              - Padding: 20px (mobile) / 40px (desktop)
              - Background: #E7E7F4 with 3D shield graphic
              - Heading: General Sans, 32px / 40px (mobile) -> 52px / 60px (desktop), -0.01em, #111111 / #0F68D6 (Bold 700)
            */}
            <div className="relative isolate mb-[12px] flex h-[320px] w-full flex-col items-start justify-end overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#E7E7F4] p-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-[28px] lg:mb-0 lg:h-[381px] lg:p-[40px]">
              {/* Desktop Banner Graphic Background */}
              <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
                <Image
                  src="/images/trust-and-security/security-and-compliance/img_built_so_one_breach_cant_become_everyone_breach.png"
                  alt="Security Breach Containment"
                  fill
                  priority
                  className="object-cover object-right"
                />
              </div>

              {/* Mobile Banner Graphic Background */}
              <div className="pointer-events-none absolute inset-0 z-0 block sm:hidden">
                <Image
                  src="/images/trust-and-security/security-and-compliance/img_built_so_one_breach_cant_become_everyone_breach%20(1).png"
                  alt="Security Breach Containment Mobile"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              <h2 className="type-h2 relative z-10 max-w-[895px]">
                <span className="font-normal text-[#111111]">
                  Built so one breach
                  <br />
                  can&apos;t become
                </span>
                <br />
                <span className="font-bold text-[#0F68D6]">everyone&apos;s breach.</span>
              </h2>
            </div>

            {/* Intro Paragraph */}
            <p className="type-body-xs mb-[32px] text-[#111111] lg:mb-0">
              Certifications are the floor, not the story. The story is how the system contains a
              problem before it spreads.
            </p>

            {/* =====================================================================
                DESKTOP: 2 Alternating Cards (Figma Layout)
               ===================================================================== */}
            <div className="hidden w-full flex-col gap-[36px] lg:flex lg:gap-[48px]">
              {/* Card 1: Closely monitored agents (Image on Left, Text on Right) */}
              <div className="flex flex-row items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="relative aspect-[420/290] w-full shrink-0 overflow-hidden rounded-[16px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:w-[45%] xl:w-[420px] xl:rounded-[20px]">
                  <Image
                    src="/images/trust-and-security/security-and-compliance/img_closely_monitored_agents.png"
                    alt="Closely Monitored Agents"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[12px] lg:gap-[14px]">
                  <h4 className="type-h5 text-[#042849]">Closely monitored agents</h4>
                  <p className="type-body-xxs text-[#111111]">
                    No agent works without limits. Each sees and does only what its task requires.
                    Anything outside that boundary is captured, flagged, and escalated to a human. A
                    human stays in the loop on every exception.
                  </p>
                </div>
              </div>

              {/* Card 2: Business Associate Agreement, every time (Text on Left, Image on Right) */}
              <div className="flex flex-row-reverse items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="relative aspect-[420/290] w-full shrink-0 overflow-hidden rounded-[16px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:w-[45%] xl:w-[420px] xl:rounded-[20px]">
                  <Image
                    src="/images/trust-and-security/security-and-compliance/img_business_associate_agreement_every_time.png"
                    alt="Business Associate Agreement"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[12px] lg:gap-[14px]">
                  <h4 className="type-h5 text-[#042849]">
                    Business Associate Agreement, every time
                  </h4>
                  <p className="type-body-xxs text-[#111111]">
                    We sign a comprehensive BAA with every client before a single system connects.
                    Our compliance posture isn&apos;t an afterthought. It&apos;s the condition under
                    which we operate.
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================================
                MOBILE / TABLET: Horizontal Scrollable Cards with Dots Indicator
               ===================================================================== */}
            <div className="flex w-full flex-col gap-[16px] lg:hidden">
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="no-scrollbar flex w-full snap-x snap-mandatory flex-row gap-[16px] overflow-x-auto"
              >
                {/* Mobile Card 1 */}
                <div className="flex w-[calc(100%-28px)] min-w-[calc(100%-28px)] shrink-0 snap-start flex-col gap-[12px]">
                  <div className="relative aspect-[362/250] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <Image
                      src="/images/trust-and-security/security-and-compliance/img_closely_monitored_agents.png"
                      alt="Closely Monitored Agents"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="type-h5 text-[#042849]">Closely monitored agents</h4>
                    <p className="type-body-xxs text-[#111111]">
                      No agent works without limits. Each sees and does only what its task requires.
                      Anything outside that boundary is captured, flagged, and escalated to a human.
                      A human stays in the loop on every exception.
                    </p>
                  </div>
                </div>

                {/* Mobile Card 2 */}
                <div className="flex w-[calc(100%-28px)] min-w-[calc(100%-28px)] shrink-0 snap-start flex-col gap-[12px]">
                  <div className="relative aspect-[362/250] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
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
                      We sign a comprehensive BAA with every client before a single system connects.
                      Our compliance posture isn&apos;t an afterthought. It&apos;s the condition
                      under which we operate.
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
