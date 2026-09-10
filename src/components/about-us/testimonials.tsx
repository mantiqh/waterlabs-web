'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const testimonialsData = [
  {
    name: 'Terri Edwards',
    role: 'Vice President of Intake',
    quote:
      '“Our partnership has become a valuable extension of our front-office operations. The team provides critical support with eligibility verification, fax management, authorization processing and retrieval, plan of care tracking, and other essential administrative functions. Through a strong collaborative partnership, ongoing training, and continuous process improvement, we have achieved increased efficiency, reduced denials, lowered operational costs, and been able to leverage automation more effectively. Their commitment to our quality required, turnaround times and adaptability has made them a trusted partner in supporting our growth and success.”',
    image: '/images/about-us/testimonial/AdobeStock_588310218 3.png',
  },
  {
    name: 'Lorem Ipsum',
    role: 'Lorem Ipsum',
    quote:
      '“Waterlabs has been a great partner for our billing, coding, and follow-up needs. Their team is responsive, helpful, and always willing to work with us when issues arise. Since partnering with Waterlabs, we have seen an increase in collections and improvement in our A/R. We truly work together as a team with the same goal of maximizing reimbursement and maintaining a clean, healthy A/R.”',
    image: '/images/about-us/testimonial/img_testimonial_02.png',
  },
];

export const TestimonialsSection: React.FC = () => {
  // Desktop Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mobile / Tablet Smooth Snap-Scroll State
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handleMobileScroll = () => {
    const container = mobileScrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const distance = Math.abs(scrollLeft - cardLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveMobileIndex(closestIndex);
  };

  const scrollToMobileSlide = (index: number) => {
    const container = mobileScrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (cards[index]) {
      const cardLeft = cards[index].offsetLeft - container.offsetLeft;
      container.scrollTo({ left: cardLeft, behavior: 'smooth' });
      setActiveMobileIndex(index);
    }
  };

  // Desktop Navigation Handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* 
        Client Testimonials Section (Desktop: 4081-13402 / Mobile: 4081-13438):
        - Outer: White background
        - Inner: #F4F6F9 container with border-radius: 0 60px 60px 0 (desktop) / 0 30px 30px 0 (mobile)
        - Sneak peek on desktop and mobile matching design
      */}
      <div className="w-full bg-[#F4F6F9] rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] pl-[20px] pr-[12px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px] overflow-hidden">
        <div className="w-full max-w-[1320px] mx-auto flex flex-col items-start">
          
          {/* ========================================================================= */}
          {/* Mobile / Tablet Smooth Snap Slider with Sneak Peek                        */}
          {/* ========================================================================= */}
          <div className="flex lg:hidden flex-col w-full">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[14px] items-start no-scrollbar pb-[4px]"
            >
              {testimonialsData.map((item, idx) => (
                <div
                  key={`mobile-testimonial-${idx}`}
                  className="shrink-0 snap-start w-[calc(100vw-64px)] max-w-[340px] flex flex-col gap-[16px] items-start"
                >
                  {/* Left/Top Image Card */}
                  <div className="relative w-full h-[243px] rounded-[20px_10px_20px_20px] overflow-hidden shrink-0 bg-gradient-to-b from-[#7D8690] to-[#D7DCE2]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 640px) 100vw, 362px"
                      className="object-cover object-top mix-blend-luminosity"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-start w-full gap-[20px]">
                    <p className="type-body-s text-black leading-[26px]">
                      {item.quote}
                    </p>

                    <div className="flex flex-col gap-[8px]">
                      {/* Name with h5 HTML tag and type-h5 typography */}
                      <h5 className="type-h5 text-[#0F68D6]">
                        {item.name}
                      </h5>
                      <p className="type-body-xxs text-[#2A2A2A] font-medium">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Pagination Indicators */}
            <div className="flex items-center gap-[5px] mt-[20px]">
              {testimonialsData.map((_, i) => (
                <button
                  key={`mobile-dot-${i}`}
                  type="button"
                  onClick={() => scrollToMobileSlide(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${
                    activeMobileIndex === i
                      ? 'w-[32px] bg-[#0F68D6]'
                      : 'w-[16px] bg-[#0F68D6]/20'
                  }`}
                />
              ))}
              <div className="w-[6px] h-[5px] rounded-[32px] bg-[#0F68D6]/20" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Desktop Carousel with Sneak Peek                                          */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex flex-col w-full">
            <div className="w-full overflow-hidden select-none">
              <div
                className="flex w-full transition-transform duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] gap-[var(--slide-gap)] [--slide-peek:60px] [--slide-gap:24px] xl:[--slide-peek:100px] xl:[--slide-gap:40px]"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (100% - var(--slide-peek) + var(--slide-gap))))`,
                }}
              >
                {testimonialsData.map((item, idx) => {
                  const isCurrent = idx === currentIndex;
                  return (
                    <div
                      key={`desktop-testimonial-${idx}`}
                      className={`w-[calc(100%-var(--slide-peek))] shrink-0 flex flex-row gap-[var(--slide-gap)] items-start transition-opacity duration-500 ${
                        isCurrent ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      {/* Left Photo Card */}
                      <div className="relative w-[340px] xl:w-[536px] h-[320px] xl:h-[360px] rounded-[20px_10px_20px_20px] overflow-hidden shrink-0 bg-gradient-to-b from-[#7D8690] to-[#D7DCE2]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 1280px) 340px, 536px"
                          className="object-cover object-top mix-blend-luminosity"
                        />
                      </div>

                      {/* Right Content Side (Frame 2147203210) */}
                      <div className="flex flex-col items-start flex-1 min-w-0 gap-[16px] xl:gap-[20px]">
                        <p className="type-body-s text-black leading-[28px]">
                          {item.quote}
                        </p>

                        <div className="flex flex-col gap-[8px]">
                          {/* Name with h5 HTML tag and type-h5 typography */}
                          <h5 className="type-h5 text-[#0F68D6]">
                            {item.name}
                          </h5>
                          <p className="type-body-xxs text-[#2A2A2A] font-medium">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Carousel Indicators & Arrow Controls */}
            <div className="flex items-center justify-between w-full mt-[40px] lg:mt-[48px]">
              {/* Dots / Pills */}
              <div className="flex items-center gap-[5px]">
                {testimonialsData.map((_, i) => (
                  <button
                    key={`desktop-dot-${i}`}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-[6px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${
                      currentIndex === i
                        ? 'w-[32px] bg-[#0F68D6]'
                        : 'w-[16px] bg-[#0F68D6]/20'
                    }`}
                  />
                ))}
                <div className="w-[6px] h-[6px] rounded-[32px] bg-[#0F68D6]/20" />
              </div>

              {/* Navigation Arrows matching home/testimonials-section.tsx */}
              <div className="flex items-center gap-[14px]">
                {/* Left Arrow Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className={`w-[48px] h-[48px] rounded-full border border-[#0F68D6] flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none ${
                    currentIndex === 0
                      ? 'text-[#0F68D6] bg-white hover:bg-[#EBF4FE]'
                      : 'text-white bg-[#0F68D6] hover:bg-[#0D59B5]'
                  }`}
                >
                  <svg
                    width="13"
                    height="19"
                    viewBox="0 0 13 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 rotate-180"
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
                </button>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className={`w-[48px] h-[48px] rounded-full border border-[#0F68D6] flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none ${
                    currentIndex === testimonialsData.length - 1
                      ? 'text-[#0F68D6] bg-white hover:bg-[#EBF4FE]'
                      : 'text-white bg-[#0F68D6] hover:bg-[#0D59B5]'
                  }`}
                >
                  <svg
                    width="13"
                    height="19"
                    viewBox="0 0 13 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
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
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
