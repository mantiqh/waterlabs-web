'use client';

import Image from 'next/image';
import React from 'react';

export const TheProblemSection: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #9DA5AD 7.11%, #043857 92.65%)',
      }}
    >
      {/*
        The Problem Section:
        - Outer: gradient #9DA5AD → #043857
        - Inner: white bg, border-radius: 0 60px 60px 0 (right-side rounding)
        - Desktop: padding 0 60px, inner padding 80px 0, gap 60px
        - Mobile: padding 40px 20px
      */}
      <div className="w-full bg-white rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="max-w-[1320px] mx-auto">

          {/* Desktop Layout: Image Left + Card Right */}
          <div className="hidden lg:flex flex-row items-stretch justify-between gap-[20px]">
            {/* Left: Large Image */}
            <div className="relative w-full lg:flex-[1.766] lg:max-w-[830px] min-w-0 min-h-[456px] rounded-[30px_10px_30px_30px] overflow-hidden">
              <Image
                src="/images/solutions/the-problem/img_the_problem.png"
                alt="Healthcare staff manually verifying patient eligibility"
                fill
                priority
                sizes="(max-width: 1440px) 60vw, 830px"
                className="object-cover object-center"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.4) 106.55%)',
                }}
              />
            </div>

            {/* Right: Content Card */}
            <div className="relative w-full lg:flex-1 lg:max-w-[470px] min-w-0 flex flex-col justify-center bg-[rgba(145,198,242,0.3)] rounded-[20px_10px_20px_20px] overflow-hidden">
              {/* Subtle Decorative Shape without blur */}
              <div
                className="absolute pointer-events-none rounded-[30px] border border-[rgba(244,246,249,0.2)] bg-[rgba(255,255,255,0.2)]"
                style={{
                  width: '812px',
                  height: '406px',
                  left: '64px',
                  top: '244px',
                }}
              />

              {/* Text Content */}
              <div className="relative z-10 flex flex-col items-start p-[24px] xl:p-[20px_32px] gap-[14px]">
                {/* Tag */}
                <div className="flex items-center gap-[8px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                  <span className="type-caption text-[#2A2A2A] tracking-[0.01em]">
                    The problem
                  </span>
                </div>

                {/* Headline */}
                <h5 className="type-h5 text-[#111111] tracking-[-0.01em]">
                  Which patient on tomorrow&apos;s schedule has coverage that changed{' '}
                  <span className="text-[#0F68D6]">since you checked?</span>
                </h5>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-[14px]">
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Most practices verify once at booking and never check again. Coverage changes after the appointment, and nobody finds out until the claim returns 60 days later.
                  </p>
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Caught before the visit, an eligibility error costs a phone call. Caught as a denial 60 days later, it costs many times that.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Layout: Single Card */}
          <div className="flex lg:hidden justify-center">
            <div className="relative w-full max-w-[362px] flex flex-col bg-[rgba(145,198,242,0.3)] rounded-[20px_10px_20px_20px] overflow-hidden">
              {/* Subtle Decorative Shape matching Image 5 */}
              <div
                className="absolute pointer-events-none rounded-[30px] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)]"
                style={{
                  width: '364px',
                  height: '182px',
                  right: '-40px',
                  bottom: '-19px',
                }}
              />

              {/* Text Content */}
              <div className="relative z-10 flex flex-col items-start p-[12px] gap-[20px]">
                {/* Tag */}
                <div className="flex items-center gap-[4px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                  <span className="type-caption text-[#2A2A2A] tracking-[0.01em]">
                    The problem
                  </span>
                </div>

                {/* Headline (in exactly 3 lines matching Figma and screenshot) */}
                <h5 className="type-h5 text-[#111111] tracking-[-0.01em]">
                  Which patient on tomorrow&apos;s
                  <br />
                  schedule has coverage that changed
                  <br />
                  <span className="text-[#0F68D6]">since you checked?</span>
                </h5>

                {/* Image */}
                <div className="relative w-full aspect-[338/185.7] rounded-[20px_10px_20px_20px] overflow-hidden">
                  <Image
                    src="/images/solutions/the-problem/img_the_problem_mobile%20(1).png"
                    alt="Healthcare staff manually verifying patient eligibility"
                    fill
                    sizes="(max-width: 1024px) 100vw, 338px"
                    className="object-cover object-center"
                  />
                  {/* Gradient overlay per Figma */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.4) 106.55%)',
                    }}
                  />
                </div>

                {/* Description Paragraphs */}
                <div className="flex flex-col gap-[14px]">
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Most practices verify once at booking and never check again. Coverage changes after the appointment, and nobody finds out until the claim returns 60 days later.
                  </p>
                  <p className="type-body-xxs text-[#2A2A2A] tracking-[0.01em]">
                    Caught before the visit, an eligibility error costs a phone call. Caught as a denial 60 days later, it costs many times that.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TheProblemSection;
