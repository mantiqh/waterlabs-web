'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

export const OurOwnCloudSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveCardIndex(Math.min(Math.max(index, 0), 2));
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
      id="our-own-cloud" 
      className="relative w-full bg-white overflow-hidden p-0 m-0 scroll-mt-[60px]"
    >
      {/* 
        Main Black Card with left curves:
        - Desktop: rounded-tl-[60px] rounded-bl-[60px], py-[80px] px-[60px]
        - Mobile: rounded-tl-[30px] rounded-bl-[30px], py-[40px] px-[20px]
        - Background behind the curve reveals the white background (#FFFFFF) of adjacent sections.
      */}
      <div className="w-full bg-[#000000] rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] pt-[40px] lg:pt-[80px] pb-[60px] lg:pb-[100px] px-[20px] lg:px-[32px] xl:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start gap-[24px] xl:gap-[40px]">
          
          {/* Invisible Spacer matching Data Sovereignty's left column (260px on lg, 305px on xl) */}
          <div className="hidden lg:block w-[260px] xl:w-[305px] shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Main Content Column aligned with 1st right section (Fluid responsive max 975px) */}
          <div className="w-full lg:flex-1 min-w-0 max-w-[975px] flex flex-col gap-[36px] lg:gap-[48px]">
            
            {/* 
              Top Feature Card with 3D Blue Sphere (Figma Frame 2147203214)
              - Mobile: 362px x 320px, img_we_didnt_rent_a_cloud_we_built_one (1).png, border-radius: 20px 10px 20px 20px
              - Desktop: 975px x 381px, img_we_didnt_rent_a_cloud_we_built_one.png, border-radius: 20px 20px 20px 10px
              - Heading: General Sans, 32px / 40px (mobile) -> 52px / 60px (desktop), -0.01em, #042849 / #0F68D6 (Bold 700)
            */}
            <div className="relative w-full h-[320px] lg:h-[381px] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] lg:rounded-tr-[20px] lg:rounded-bl-[10px] p-[20px] sm:p-[28px] lg:p-[40px] flex flex-col justify-end items-start overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.3)] isolate">
              
              {/* Desktop Banner Graphic Background */}
              <div className="hidden sm:block absolute inset-0 pointer-events-none z-0">
                <Image
                  src="/images/trust-and-security/our-own-cloud/img_we_didnt_rent_a_cloud_we_built_one.png"
                  alt="Our Own Cloud Sphere"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Mobile Banner Graphic Background */}
              <div className="block sm:hidden absolute inset-0 pointer-events-none z-0">
                <Image
                  src="/images/trust-and-security/our-own-cloud/img_we_didnt_rent_a_cloud_we_built_one%20(1).png"
                  alt="Our Own Cloud Sphere Mobile"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              <h2 className="relative z-10 font-primary text-[32px] sm:text-[40px] lg:text-[52px] leading-[38px] sm:leading-[48px] lg:leading-[60px] tracking-[-0.01em] max-w-[322px] sm:max-w-[420px] lg:max-w-[895px]">
                <span className="text-[#042849] font-normal">
                  We didn&apos;t
                  <br />
                  rent a cloud.
                </span>
                <br />
                <span className="text-[#0F68D6] font-bold">We built one.</span>
              </h2>
            </div>

            {/* Intro Paragraph */}
            <p className="font-secondary font-normal text-[15px] sm:text-[16px] xl:text-[18px] leading-[24px] xl:leading-[26px] text-white">
              Most companies in this space run on someone else&apos;s cloud and trust the landlord. Waterlabs built and owns its own, a data center we run end to end, on our own hardware, housed entirely in the United States. Every agent, every model, every line that touches your workflow runs inside the infrastructure we control.
            </p>

            {/* =====================================================================
                DESKTOP: 3 Alternating Cards (Figma Layout)
               ===================================================================== */}
            <div className="hidden lg:flex flex-col gap-[36px] lg:gap-[48px] w-full">
              
              {/* Card 1: No Shared Walls (Image on Left, Text on Right) */}
              <div className="flex flex-row items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-[16px] xl:rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/images/trust-and-security/our-own-cloud/img_no_shared_walls.png"
                    alt="No Shared Walls"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[38px] xl:leading-[40px] tracking-[-0.01em] text-white">
                    No Shared Walls
                  </h4>
                  <p className="font-secondary font-normal text-[14px] sm:text-[15px] xl:text-[17px] leading-[22px] sm:leading-[24px] xl:leading-[26px] text-white/90">
                    Because we own the environment, we ensure that no client shares space with another. Your agents, your data path, your sealed world. The industry&apos;s biggest fear, one breach cascading across everyone on a shared platform, is the one thing this architecture makes impossible.
                  </p>
                </div>
              </div>

              {/* Card 2: Built to take a hit (Text on Left, Image on Right) */}
              <div className="flex flex-row-reverse items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-[16px] xl:rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/images/trust-and-security/our-own-cloud/img_built_to_take_a_hit.png"
                    alt="Built to take a hit"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[38px] xl:leading-[40px] tracking-[-0.01em] text-white">
                    Built to take a hit
                  </h4>
                  <p className="font-secondary font-normal text-[14px] sm:text-[15px] xl:text-[17px] leading-[22px] sm:leading-[24px] xl:leading-[26px] text-white/90">
                    The system watches itself and heals itself. Backups are continuous and mirrored. If something fails, work continues. Recovery is built in, not bolted on.
                  </p>
                </div>
              </div>

              {/* Card 3: Independently tested (Image on Left, Text on Right) */}
              <div className="flex flex-row items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="w-full lg:w-[45%] xl:w-[420px] shrink-0 relative aspect-[420/290] rounded-[16px] xl:rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <Image
                    src="/images/trust-and-security/our-own-cloud/img_independently_tested.png"
                    alt="Independently tested"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[14px] flex-1 min-w-0">
                  <h4 className="font-primary font-normal text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[32px] leading-[32px] sm:leading-[36px] lg:leading-[38px] xl:leading-[40px] tracking-[-0.01em] text-white">
                    Independently tested
                  </h4>
                  <p className="font-secondary font-normal text-[14px] sm:text-[15px] xl:text-[17px] leading-[22px] sm:leading-[24px] xl:leading-[26px] text-white/90">
                    The environment is independently penetration-tested, and we fix what the testers find. Security here is deep-rooted.
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
                  <div className="w-full relative aspect-[362/250] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                    <Image
                      src="/images/trust-and-security/our-own-cloud/img_no_shared_walls.png"
                      alt="No shared walls"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="font-primary font-normal text-[20px] leading-[28px] text-[#63CCB7]">
                      No shared walls
                    </h4>
                    <p className="font-secondary font-normal text-[14px] leading-[24px] text-white">
                      Because we own the environment, we ensure that no client shares space with another. Your agents, your data path, your sealed world. The industry&apos;s biggest fear, one breach cascading across everyone on a shared platform, is the one thing this architecture makes impossible.
                    </p>
                  </div>
                </div>

                {/* Mobile Card 2 */}
                <div className="w-full min-w-full snap-center flex flex-col gap-[16px]">
                  <div className="w-full relative aspect-[362/250] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                    <Image
                      src="/images/trust-and-security/our-own-cloud/img_built_to_take_a_hit.png"
                      alt="Built to take a hit"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="font-primary font-normal text-[20px] leading-[28px] text-[#63CCB7]">
                      Built to take a hit
                    </h4>
                    <p className="font-secondary font-normal text-[14px] leading-[24px] text-white">
                      The system watches itself and heals itself. Backups are continuous and mirrored, not tapes and manual restores. If something fails, work continues. Recovery is built in, not bolted on.
                    </p>
                  </div>
                </div>

                {/* Mobile Card 3 */}
                <div className="w-full min-w-full snap-center flex flex-col gap-[16px]">
                  <div className="w-full relative aspect-[362/250] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                    <Image
                      src="/images/trust-and-security/our-own-cloud/img_independently_tested.png"
                      alt="Independently tested"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="font-primary font-normal text-[20px] leading-[28px] text-[#63CCB7]">
                      Independently tested
                    </h4>
                    <p className="font-secondary font-normal text-[14px] leading-[24px] text-white">
                      The environment is independently penetration-tested, and we fix what the testers find. Security here is deep-rooted.
                    </p>
                  </div>
                </div>

              </div>

              {/* Dots Indicator (No scrollbar track line) */}
              <div className="flex flex-row items-center gap-[6px] self-start pt-[4px]">
                {[0, 1, 2].map((idx) => {
                  const isActive = activeCardIndex === idx;
                  return (
                    <button
                      key={`carousel-dot-${idx}`}
                      type="button"
                      aria-label={`Slide ${idx + 1}`}
                      onClick={() => scrollToCard(idx)}
                      className={`h-[6px] rounded-[32px] transition-all duration-300 ${
                        isActive
                          ? 'w-[32px] bg-white'
                          : 'w-[16px] bg-white/30 hover:bg-white/50'
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

export default OurOwnCloudSection;
