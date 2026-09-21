'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const WeBuildPeopleSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Start revealing when the container top enters lower viewport, fully reveal when middle
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight * 0.7), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full bg-[#F4F6F9] pt-[40px] md:pt-[60px] lg:pt-[80px] pb-[80px] sm:pb-[100px] lg:pb-[140px] px-[20px] md:px-[40px] lg:px-[60px] overflow-visible">
      {/* 
        We Build People Section (Figma node: 5419-5382):
        - Container: max-w-[1320px], height: 433px (desktop), background: #F4F6F9
        - Stacked Card Geometry (Figma Dimensions & Offsets):
          1. Layer 1 (Main Top Card, z-20): 1320px x 433px, rounded-[30px_10px_30px_30px]
          2. Layer 2 (Lime Green, z-10): 1217px x 184px, left: 58px, right: 45px, -bottom-[36px] (exact 36px protrusion below main card)
          3. Layer 3 (Golden Ochre, z-0): 1084px x 184px, left: 116px, right: 120px, -bottom-[67px] (exact 31px protrusion below lime green, 67px total below main card)
      */}
      <div ref={containerRef} className="relative w-full max-w-[1320px] mx-auto overflow-visible">
        
        {/* Layer 3: Deepest Golden Ochre Card (#D6A85F) - Progressively reveals on scroll */}
        <div
          className="absolute left-[45px] right-[45px] sm:left-[80px] sm:right-[80px] lg:left-[145px] lg:right-[145px] -bottom-[54px] sm:-bottom-[66px] lg:-bottom-[80px] h-[90px] sm:h-[120px] lg:h-[184px] rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] z-0 shadow-sm pointer-events-none transition-all duration-500 ease-out"
          style={{
            backgroundColor: '#D6A85F',
            transform: `translateY(${(1 - scrollProgress) * -36}px) scale(${0.96 + scrollProgress * 0.04})`,
            opacity: 0.4 + scrollProgress * 0.6,
          }}
        />

        {/* Layer 2: Middle Lime Green Card (#A9D154) - Progressively reveals on scroll */}
        <div
          className="absolute left-[24px] right-[24px] sm:left-[45px] sm:right-[45px] lg:left-[80px] lg:right-[72px] -bottom-[28px] sm:-bottom-[34px] lg:-bottom-[44px] h-[90px] sm:h-[120px] lg:h-[184px] rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] z-10 shadow-sm pointer-events-none transition-all duration-500 ease-out"
          style={{
            backgroundColor: '#A9D154',
            transform: `translateY(${(1 - scrollProgress) * -20}px) scale(${0.98 + scrollProgress * 0.02})`,
            opacity: 0.5 + scrollProgress * 0.5,
          }}
        />

        {/* Layer 1: Main Top Card (1320px x 433px Desktop) - border-radius: 30px 10px 30px 30px */}
        <div className="relative z-20 w-full h-auto lg:h-[433px] max-lg:rounded-[24px_0px_24px_24px] sm:max-lg:rounded-[30px_0px_30px_30px] lg:!rounded-[30px_10px_30px_30px] overflow-hidden shadow-sm flex flex-col lg:flex-row">
          
          {/* Desktop Background Image (Frame 2147203292: url(image.png) spanning full card) */}
          <div className="hidden lg:block absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <Image
              src="/images/culture/we-build-people/we_build_people.png"
              alt="We build people for the role"
              fill
              priority
              sizes="1320px"
              className="object-cover object-[75%_center]"
            />
          </div>

          {/* Mint/Teal Content Card (Frame 2147226448: 539px x 433px, border-radius: 30px 0px 60px 0px) */}
          <div
            className="relative z-20 w-full lg:w-[539px] h-auto lg:h-[433px] p-[28px] sm:p-[36px] lg:p-[40px] flex flex-col justify-center items-start gap-[16px] lg:gap-[20px] max-lg:rounded-[24px_0px_0px_0px] sm:max-lg:rounded-[30px_0px_0px_0px] lg:!rounded-[30px_0px_60px_0px] shrink-0"
            style={{ backgroundColor: '#63CCB7' }}
          >
            {/* Heading: type-h2, semantic <h2> */}
            <h2 className="type-h2 text-[#042849] max-w-[459px]">
              We build people for the role.
            </h2>

            {/* Description: type-body-s */}
            <p className="type-body-s text-[#111111] leading-relaxed max-w-[459px]">
              We identify capability gaps and invest in closing them through mentoring, coaching, leadership development, and stretch assignments that teach you faster than any training module. Development starts from an honest read of where you are, and it is planned against where you want to go.
            </p>
          </div>

          {/* Mobile/Tablet Image Container (Rendered below text card on small screens) */}
          <div className="block lg:hidden relative w-full h-[240px] sm:h-[320px] shrink-0 rounded-[0px_0px_24px_24px] sm:rounded-[0px_0px_30px_30px] overflow-hidden">
            <Image
              src="/images/culture/we-build-people/we_build_people.png"
              alt="We build people for the role"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default WeBuildPeopleSection;
