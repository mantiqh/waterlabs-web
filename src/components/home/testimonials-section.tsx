'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const testimonialsData = [
  {
    name: 'Terri Edwards',
    role: 'Vice President of Intake',
    quote:
      '“Our partnership has become a valuable extension of our front-office operations. The team provides critical support with eligibility verification, fax management, authorization processing and retrieval, plan of care tracking, and other essential administrative functions. Through a strong collaborative partnership, ongoing training, and continuous process improvement, we have achieved increased efficiency, reduced denials, lowered operational costs, and been able to leverage automation more effectively. Their commitment to our quality required, turnaround times and adaptability has made them a trusted partner in supporting our growth and success.”',
    image: '/images/home/features-images/AdobeStock_588310218%204.png',
  },
  {
    name: 'Lorem Ipsum',
    role: 'Lorem Ipsum',
    quote:
      '“Waterlabs has been a great partner for our billing, coding, and follow-up needs. Their team is responsive, helpful, and always willing to work with us when issues arise. Since partnering with Waterlabs, we have seen an increase in collections and improvement in our A/R. We truly work together as a team with the same goal of maximizing reimbursement and maintaining a clean, healthy A/R.”',
    image: '/images/home/features-images/img_testimonial_02.png',
  },
];

export const TestimonialsSection: React.FC = () => {
  // Desktop Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mobile / Tablet Smooth Snap-Scroll State (matching Our Stats slider)
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
    <section className="relative w-full bg-[#91C6F2] overflow-hidden">
      {/* 
        The main white card has rounded-bl-[30px] lg:rounded-bl-[80px] at the bottom-left corner,
        revealing the light blue background (#91C6F2) of the CalculateSection below it seamlessly without gaps.
      */}
      <div className="w-full bg-white rounded-bl-[30px] sm:rounded-bl-[40px] lg:rounded-bl-[80px] pt-[16px] sm:pt-[24px] lg:pt-[60px] pb-[32px] sm:pb-[48px] lg:pb-[100px] px-[20px] md:px-[40px] lg:px-[60px]">
        <div className="max-w-[1320px] mx-auto flex flex-col items-start lg:items-center">

          {/* ========================================================================= */}
          {/* Mobile / Tablet Smooth Snap Slider                                        */}
          {/* ========================================================================= */}
          <div className="flex lg:hidden flex-col w-full">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[24px] items-start [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonialsData.map((item, idx) => (
                <div
                  key={`mobile-testimonial-${idx}`}
                  className="shrink-0 snap-center w-full flex flex-col gap-[16px] items-start"
                >
                  {/* Left Image Side */}
                  <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden shrink-0 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>

                  {/* Content Side */}
                  <div className="flex flex-col justify-center w-full">
                    <p className="type-body-xxs text-[#111111] mb-[16px]">
                      {item.quote}
                    </p>

                    <div className="flex flex-col gap-[2px]">
                      <span className="type-h6 text-electric-blue">
                        {item.name}
                      </span>
                      <span className="type-body-xxs text-[#7D8690]">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Pagination Indicators */}
            <div className="flex items-center gap-[6px] mt-[16px]">
              {testimonialsData.map((_, i) => (
                <button
                  key={`mobile-dot-${i}`}
                  type="button"
                  onClick={() => scrollToMobileSlide(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-[4px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${activeMobileIndex === i
                      ? 'w-[24px] bg-electric-blue'
                      : 'w-[6px] bg-[#91C6F2]'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Desktop Carousel Container                                                */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex flex-col w-full">
            <div className="w-full overflow-hidden select-none">
              <div
                className="flex w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonialsData.map((item, idx) => (
                  <div
                    key={`desktop-testimonial-${idx}`}
                    className="w-full shrink-0 flex flex-row gap-[32px] xl:gap-[60px] items-start"
                  >
                    {/* Left Image Side */}
                    <div className="relative w-[340px] xl:w-[480px] aspect-[4/3] rounded-[20px] overflow-hidden shrink-0 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1280px) 340px, 480px"
                        className="object-cover"
                      />
                    </div>

                    {/* Right Content Side */}
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="type-body-s text-[#111111] mb-[40px]">
                        {item.quote}
                      </p>

                      <div className="flex flex-col gap-[6px]">
                        <span className="type-h5 text-electric-blue">
                          {item.name}
                        </span>
                        <span className="type-body-xxs text-[#7D8690]">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Carousel Indicators / Navigation */}
            <div className="flex items-center justify-between w-full mt-[48px]">
              {/* Dots */}
              <div className="flex items-center gap-[8px]">
                {testimonialsData.map((_, i) => (
                  <button
                    key={`desktop-dot-${i}`}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-[7px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${currentIndex === i
                        ? 'w-[40px] bg-electric-blue'
                        : 'w-[12px] bg-[#91C6F2]'
                      }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-[12px]">
                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className={`group w-[48px] h-[48px] rounded-full border border-electric-blue flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none ${currentIndex === 0
                      ? 'text-electric-blue bg-white hover:bg-[#EBF4FE]'
                      : 'text-white bg-electric-blue hover:bg-[#0D5BBF]'
                    }`}
                >
                  <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rotate-180">
                    <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor" />
                    <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor" />
                  </svg>
                </button>
                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className={`group w-[48px] h-[48px] rounded-full border border-electric-blue flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none ${currentIndex === testimonialsData.length - 1
                      ? 'text-electric-blue bg-white hover:bg-[#EBF4FE]'
                      : 'text-white bg-electric-blue hover:bg-[#0D5BBF]'
                    }`}
                >
                  <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor" />
                    <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor" />
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
