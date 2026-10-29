'use client';

import Image from 'next/image';
import { useState } from 'react';

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    width="13"
    height="19"
    viewBox="0 0 13 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <path
      d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z"
      fill="currentColor"
    />
    <path
      d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z"
      fill="currentColor"
    />
  </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    width="13"
    height="19"
    viewBox="0 0 13 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 rotate-180 ${className}`}
  >
    <path
      d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z"
      fill="currentColor"
    />
    <path
      d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z"
      fill="currentColor"
    />
  </svg>
);

const convictionsData = [
  {
    id: 0,
    title: 'A problem you manage remains a problem.',
    description:
      'Improvements over the past thirty years have made the revenue cycle more manageable but have not eliminated the work. Our goal is not to help organizations manage this better, but to resolve it.',
    image: '/images/philosophy/what-we-believe/img_Resolution_not_improvement.%20(1).png',
  },
  {
    id: 1,
    title: 'Repetition should not need a person.',
    description:
      'Most of a revenue cycle is the same work done over and over. A small part of it genuinely needs someone to think. Those two things have been tangled together for decades because there was no way to separate them. Now there is.',
    image:
      '/images/philosophy/what-we-believe/img_the_people_inside_the_problem_should_end_it.%20(1).png',
  },
  {
    id: 2,
    title: 'Knowledge should remain within the organization, not just with individuals.',
    description:
      'In most revenue cycles, critical expertise resides with long-tenured staff. When they leave, this knowledge is lost and must be relearned. Systems should retain organizational knowledge.',
    image:
      '/images/philosophy/what-we-believe/img_Knowledge_should_compound_in_the_system.%20(1).png',
  },
];

export const WhatWeBelieveSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isFirst = currentSlide === 0;
  const isLast = currentSlide === convictionsData.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#111111] from-50% to-[#2481ce] to-50% p-0">
      {/* 
        Top Frame Card:
        - Desktop: 1440px x 597px (inner max-w: 1320px), padding: 80px 60px, rounded-tl-[60px] rounded-bl-[60px]
        - Mobile: 402px x 579.46px, padding: 40px 20px, rounded-tl-[30px] rounded-bl-[30px]
        - Background: #F4F6F9
      */}
      <div className="w-full overflow-hidden rounded-tl-[30px] rounded-bl-[30px] bg-[#F4F6F9] px-[20px] py-[40px] md:px-[40px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:py-[60px] xl:px-[60px] xl:py-[80px]">
        <div className="mx-auto w-full max-w-[1320px]">
          {/* Desktop Layout (1024px+) */}
          <div className="hidden h-[437px] flex-row items-stretch justify-between gap-[16px] lg:flex xl:gap-[20px]">
            {/* Left Column: Heading, Subtitle & Syncing 3D Graphic */}
            <div className="flex h-full w-[38%] max-w-[512px] shrink-0 flex-col justify-between xl:w-[512px]">
              {/* Header Text Block */}
              <div className="flex flex-col gap-[10px] xl:gap-[14px]">
                <h2 className="type-h2 text-[#111111]">
                  What <span className="text-[#0F68D6]">we believe</span>
                </h2>
                <p className="type-body-xs text-[#111111]">
                  Three convictions sit under everything we build.
                </p>
              </div>

              {/* Left Image Card with Smooth Cross-Fade Animation */}
              <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[30px_10px_30px_10px] border-b border-[#91C6F2] xl:h-[287px] xl:rounded-[40px_10px_40px_10px]">
                {convictionsData.map((item, idx) => (
                  <div
                    key={`desktop-img-${item.id}`}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out will-change-[opacity] ${
                      currentSlide === idx
                        ? 'z-10 opacity-100'
                        : 'pointer-events-none z-0 opacity-0'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 1280px) 400px, 512px"
                      className="object-cover object-center"
                    />
                  </div>
                ))}
                {/* Overlay gradient */}
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent from-[52.42%] to-[#0F68D6]/[0.66] to-[109.85%]" />
              </div>
            </div>

            {/* Right Column: Interactive Card (Locked Width & Height with Smooth Sliding Track) */}
            <div
              className="relative flex h-full flex-1 shrink-0 flex-col justify-between overflow-hidden rounded-[30px_10px_30px_10px] p-[24px] xl:w-[788px] xl:rounded-[40px_10px_40px_10px] xl:p-[32px]"
              style={{
                background: 'linear-gradient(204.93deg, #63CCB7 5.28%, #0F68D6 98.54%)',
              }}
            >
              {/* Background Texture Graphic */}
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src="/images/philosophy/what-we-believe/img_card_background.png"
                  alt="Card background texture"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 1280px) 600px, 788px"
                  className="object-cover object-center opacity-90 mix-blend-overlay"
                />
              </div>

              {/* Top Text Content - Animated Carousel Track */}
              <div className="relative z-10 w-full overflow-hidden pt-[4px] xl:pt-[8px]">
                <div
                  className="flex w-full flex-row transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                  style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
                >
                  {convictionsData.map((item, idx) => (
                    <div
                      key={`desktop-slide-${item.id}`}
                      className={`flex w-full max-w-[680px] min-w-full shrink-0 flex-col justify-start gap-[10px] transition-opacity duration-500 xl:gap-[14px] ${
                        currentSlide === idx ? 'opacity-100' : 'pointer-events-none opacity-0'
                      }`}
                    >
                      <h3 className="type-h3 text-white">{item.title}</h3>
                      <p className="type-body-xs leading-relaxed text-[#F4F6F9]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Controls Row: Carousel Indicators + Arrow Buttons */}
              <div className="relative z-10 mt-auto flex w-full flex-row items-center justify-between pt-[16px]">
                {/* Carousel Pill Indicators */}
                <div className="flex items-center gap-[5px]">
                  {convictionsData.map((_, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-[6px] cursor-pointer rounded-[32px] border-none transition-all duration-300 outline-none ${
                          isActive
                            ? 'w-[28px] bg-white xl:w-[32px]'
                            : idx === (currentSlide + 1) % 3
                              ? 'w-[14px] bg-white/20 hover:bg-white/40 xl:w-[16px]'
                              : 'w-[6px] bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Left/Right Arrow Indicators */}
                <div className="flex items-center gap-[10px] xl:gap-[14px]">
                  {/* Prev Button */}
                  <button
                    type="button"
                    aria-label="Previous conviction"
                    onClick={handlePrev}
                    disabled={isFirst}
                    className={`flex h-[42px] w-[42px] items-center justify-center rounded-[64px] transition-all duration-300 outline-none xl:h-[48px] xl:w-[48px] ${
                      isFirst
                        ? 'cursor-not-allowed border border-white bg-transparent text-white'
                        : 'cursor-pointer border-none bg-white text-[#0F68D6] shadow-sm hover:scale-105 active:scale-95'
                    }`}
                  >
                    <ChevronLeft
                      className={`h-[16px] w-[11px] xl:h-[18px] xl:w-[12px] ${isFirst ? 'text-white' : 'text-[#0F68D6]'}`}
                    />
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    aria-label="Next conviction"
                    onClick={handleNext}
                    disabled={isLast}
                    className={`flex h-[42px] w-[42px] items-center justify-center rounded-[64px] transition-all duration-300 outline-none xl:h-[48px] xl:w-[48px] ${
                      isLast
                        ? 'cursor-not-allowed border border-white bg-transparent text-white'
                        : 'cursor-pointer border-none bg-white text-[#0F68D6] shadow-sm hover:scale-105 active:scale-95'
                    }`}
                  >
                    <ChevronRight
                      className={`h-[16px] w-[11px] xl:h-[18px] xl:w-[12px] ${isLast ? 'text-white' : 'text-[#0F68D6]'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Layout (<1024px, Figma node 3883-12296) */}
          <div className="flex w-full flex-col gap-[32px] lg:hidden">
            {/* Mobile Header Block */}
            <div className="flex w-full flex-col gap-[12px]">
              <h2 className="type-h2 text-[#111111]">
                What <span className="text-[#0F68D6]">we believe</span>
              </h2>
              <p className="type-body-xs text-[#111111]">
                Three convictions sit under everything we build.
              </p>
            </div>

            {/* Mobile Combined Card */}
            <div
              className="relative flex w-full flex-col gap-[12px] overflow-hidden rounded-[20px_10px_20px_20px] p-[12px]"
              style={{
                background: 'linear-gradient(204.93deg, #63CCB7 5.28%, #0F68D6 98.54%)',
              }}
            >
              {/* Card Mobile Background Texture */}
              <div className="pointer-events-none absolute inset-0">
                <Image
                  src="/images/philosophy/what-we-believe/banner-mobile.png"
                  alt="Card background texture mobile"
                  fill
                  priority
                  className="object-cover object-center opacity-90 mix-blend-overlay"
                />
              </div>

              {/* Mobile Card Top Image with Smooth Cross-Fade Animation */}
              <div className="relative h-[190px] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px]">
                {convictionsData.map((item, idx) => (
                  <div
                    key={`mobile-img-${item.id}`}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out will-change-[opacity] ${
                      currentSlide === idx
                        ? 'z-10 opacity-100'
                        : 'pointer-events-none z-0 opacity-0'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover object-center"
                    />
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent from-[52.42%] to-[#0F68D6]/[0.66] to-[109.85%]" />
              </div>

              {/* Mobile Card Bottom Content with Animated Track */}
              <div className="relative z-10 flex min-h-[190px] w-full flex-1 flex-col justify-between gap-[16px] px-[4px] pb-[4px]">
                {/* Title + Subtitle Track */}
                <div className="w-full overflow-hidden">
                  <div
                    className="flex w-full flex-row transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                    style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
                  >
                    {convictionsData.map((item, idx) => (
                      <div
                        key={`mobile-slide-${item.id}`}
                        className={`flex w-full min-w-full shrink-0 flex-col gap-[10px] transition-opacity duration-500 ${
                          currentSlide === idx ? 'opacity-100' : 'pointer-events-none opacity-0'
                        }`}
                      >
                        <h3 className="type-h3 text-white">{item.title}</h3>
                        <p className="type-body-xs leading-relaxed text-[#F4F6F9]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Mobile Indicators + Mobile Arrows */}
                <div className="mt-auto flex w-full flex-row items-center justify-between pt-[4px]">
                  {/* Mobile Pill Indicators (height: 5px) */}
                  <div className="flex items-center gap-[5px]">
                    {convictionsData.map((_, idx) => {
                      const isActive = idx === currentSlide;
                      return (
                        <button
                          key={idx}
                          type="button"
                          aria-label={`Slide ${idx + 1}`}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-[5px] cursor-pointer rounded-[32px] border-none transition-all duration-300 outline-none ${
                            isActive
                              ? 'w-[32px] bg-white'
                              : idx === (currentSlide + 1) % 3
                                ? 'w-[16px] bg-white/20 hover:bg-white/40'
                                : 'w-[6px] bg-white/20 hover:bg-white/40'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Mobile Arrows (34px x 34px) */}
                  <div className="flex items-center gap-[8px]">
                    {/* Prev */}
                    <button
                      type="button"
                      aria-label="Previous conviction"
                      onClick={handlePrev}
                      disabled={isFirst}
                      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[45px] transition-all duration-300 outline-none ${
                        isFirst
                          ? 'cursor-not-allowed border border-white bg-transparent text-white'
                          : 'cursor-pointer border-none bg-white text-[#0F68D6] shadow-sm active:scale-95'
                      }`}
                    >
                      <ChevronLeft
                        className={`h-[14px] w-[9px] ${isFirst ? 'text-white' : 'text-[#0F68D6]'}`}
                      />
                    </button>

                    {/* Next */}
                    <button
                      type="button"
                      aria-label="Next conviction"
                      onClick={handleNext}
                      disabled={isLast}
                      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[45px] transition-all duration-300 outline-none ${
                        isLast
                          ? 'cursor-not-allowed border border-white bg-transparent text-white'
                          : 'cursor-pointer border-none bg-white text-[#0F68D6] shadow-sm active:scale-95'
                      }`}
                    >
                      <ChevronRight
                        className={`h-[14px] w-[9px] ${isLast ? 'text-white' : 'text-[#0F68D6]'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieveSection;
