'use client';

import Image from 'next/image';
import React from 'react';

export const WeBuildPeopleSection: React.FC = () => {
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
      <div className="relative w-full max-w-[1320px] mx-auto overflow-visible">
        
        {/* Layer 3: Deepest Golden Ochre Card (#D6A85F) - Decreased width, pulled out a bit more */}
        <div
          className="absolute left-[45px] right-[45px] sm:left-[80px] sm:right-[80px] lg:left-[145px] lg:right-[145px] -bottom-[54px] sm:-bottom-[66px] lg:-bottom-[80px] h-[90px] sm:h-[120px] lg:h-[184px] rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] z-0 shadow-sm pointer-events-none"
          style={{ backgroundColor: '#D6A85F' }}
        />

        {/* Layer 2: Middle Lime Green Card (#A9D154) - Decreased width, pulled out a bit more */}
        <div
          className="absolute left-[24px] right-[24px] sm:left-[45px] sm:right-[45px] lg:left-[80px] lg:right-[72px] -bottom-[28px] sm:-bottom-[34px] lg:-bottom-[44px] h-[90px] sm:h-[120px] lg:h-[184px] rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] z-10 shadow-sm pointer-events-none"
          style={{ backgroundColor: '#A9D154' }}
        />

        {/* Layer 1: Main Top Card (1320px x 433px Desktop) - 0px top-right radius on small screens */}
        <div className="relative z-20 w-full h-auto lg:h-[433px] rounded-[24px_0px_24px_24px] sm:rounded-[30px_0px_30px_30px] lg:rounded-[30px_10px_30px_30px] overflow-hidden shadow-sm flex flex-col lg:flex-row bg-[#63CCB7]">
          
          {/* Mint/Teal Content Card (#63CCB7) - Rendered on top on mobile, left column on desktop */}
          <div
            className="relative z-20 w-full lg:w-[480px] xl:w-[539px] h-auto lg:h-full p-[28px] sm:p-[36px] lg:p-[40px] flex flex-col justify-center items-start gap-[16px] lg:gap-[20px] rounded-[24px_0px_0px_0px] sm:rounded-[30px_0px_0px_0px] lg:rounded-[30px_0px_60px_0px] shrink-0"
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

          {/* Desktop Right Image Container (Preserves natural 1.91:1 ratio so all 3 women are fully visible) */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[820px] xl:w-[840px] h-full z-10 overflow-hidden">
            <Image
              src="/images/culture/we-build-people/we_build_people.png"
              alt="We build people for the role"
              fill
              priority
              sizes="840px"
              className="object-cover object-right"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default WeBuildPeopleSection;
