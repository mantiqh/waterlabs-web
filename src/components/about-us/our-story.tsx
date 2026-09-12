'use client';

import React from 'react';

const STORY_PARAGRAPHS = [
  "Healthcare's revenue cycle has always scaled by adding people to it.",
  "Higher volumes have meant more staff. When experienced employees leave, their knowledge leaves too, requiring new hires to spend months relearning critical information.",
  "This challenge was widely recognized. The common solution was to outsource work to lower-cost locations, hire more staff, and accept ongoing knowledge loss.",
  "Waterlabs offers a different approach: codifying knowledge within the system instead of relying on individuals, so the system performs the work efficiently.",
];

export const OurStorySection: React.FC = () => {
  return (
    <section className="w-full bg-white pl-[20px] md:pl-[40px] lg:pl-[60px] min-[1440px]:pl-[calc((100vw-1320px)/2)] overflow-hidden">
      {/* 
        Our story Section:
        - Background container aligned on the left with the 1320px content grid
        - Rounded left corners (rounded-tl / rounded-bl)
        - Extends flush to the right edge of the viewport
        - Gradient background: linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)
      */}
      <div
        className="w-full rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[40px] md:py-[60px] lg:py-[80px] px-[20px] md:px-[32px] lg:px-[40px] xl:px-[60px]"
        style={{
          background: 'linear-gradient(261.06deg, #63CCB7 -3.05%, #0F68D6 70.56%)',
        }}
      >
        <div className="w-full max-w-[1260px]">
          {/* ========================================================================= */}
          {/* Desktop Layout (lg+): Title top, Row below (Paragraphs left + Photo right)*/}
          {/* ========================================================================= */}
          <div className="hidden lg:flex flex-col items-start gap-[24px] xl:gap-[40px] w-full">
            {/* Heading: General Sans, responsive scaling */}
            <h2 className="type-h1 text-[#F4F6F9] tracking-[-0.01em] text-[40px] leading-[48px] xl:text-[68px] xl:leading-[76px] w-full">
              Our story
            </h2>

            {/* Row: Left paragraphs (536px) + Right photo (704px x 417px) */}
            <div className="w-full flex flex-row items-center justify-between gap-[20px]">
              {/* Left Column: 4 story paragraphs */}
              <div className="w-full lg:w-[48%] xl:w-[536px] flex flex-col justify-between gap-[16px] xl:gap-[24px] xl:h-[417px] shrink-0">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p
                    key={index}
                    className="type-body-s text-white text-[16px] leading-[24px] xl:text-[20px] xl:leading-[28px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Right Column: Photo (responsive width & aspect ratio, exact at xl+) */}
              <div
                className="w-full lg:w-[48%] xl:w-[704px] aspect-[704/417] xl:h-[417px] shrink-0 rounded-[10px_40px] bg-cover bg-center bg-no-repeat bg-[url('/images/about-us/our-story/img_our_Story.png')]"
                role="img"
                aria-label="Waterlabs vision - architectural courtyard at sunrise"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Mobile Layout (< lg): Stacked Column (Title -> Photo -> Paragraphs)       */}
          {/* ========================================================================= */}
          <div className="flex lg:hidden flex-col items-start gap-[20px] w-full max-w-[342px] mx-auto">
            {/* Heading: General Sans, 36px/48px, -0.01em, #F4F6F9 */}
            <h2 className="type-h1 text-[#F4F6F9] tracking-[-0.01em] text-[36px] leading-[48px]">
              Our story
            </h2>

            {/* Content Frame (Figma: Frame 2147203294, gap: 12px) */}
            <div className="flex flex-col items-start gap-[12px] w-full">
              {/* Middle: Photo (342px x 203px, border-radius: 20px 10px 20px 20px) */}
              <div
                className="w-full h-[203px] rounded-[20px_10px_20px_20px] bg-cover bg-center bg-no-repeat bg-[url('/images/about-us/our-story/img_our_story_mob.png')]"
                role="img"
                aria-label="Waterlabs vision - architectural courtyard at sunrise"
              />

              {/* Bottom Content: Story Paragraphs (Figma: Frame 2147203307, gap: 24px) */}
              <div className="flex flex-col items-start gap-[16px] w-full pt-[4px]">
                {STORY_PARAGRAPHS.map((paragraph, index) => (
                  <p
                    key={index}
                    className="type-body-s text-white text-[16px] leading-[26px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
