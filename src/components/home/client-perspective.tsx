'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { CTA } from '@/components/CTA';
import { DEFAULT_HOME_DATA } from '@/data/home';
import type { TestimonialItem } from '@/types/home';

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export const TestimonialsSection = ({
  testimonials = DEFAULT_HOME_DATA.testimonials,
}: TestimonialsSectionProps) => {
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
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="relative w-full bg-[#0A60AF] overflow-hidden">
      <div className="w-full bg-white rounded-bl-[30px] sm:rounded-bl-[40px] lg:rounded-bl-[80px] pt-[16px] sm:pt-[24px] lg:pt-[60px] pb-[32px] sm:pb-[48px] lg:pb-[100px] px-[20px] md:px-[40px] lg:px-[60px]">
        <div className="max-w-[1320px] mx-auto flex flex-col items-start w-full">
          {/* Eyebrow: Client Perspective (Shown on both Mobile and Desktop) */}
          <div className="inline-flex items-center gap-[6px] lg:gap-[8px] mb-[20px] lg:mb-[32px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
            <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">
              Client Perspective
            </span>
          </div>

          {/* Mobile / Tablet Smooth Snap Slider */}
          <div className="flex lg:hidden flex-col w-full">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="flex w-[calc(100%+20px)] -mr-[20px] overflow-x-auto snap-x snap-mandatory gap-[16px] items-start no-scrollbar pr-[20px]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((item, idx) => (
                <div
                  key={`mobile-testimonial-${item._key || idx}`}
                  className="shrink-0 snap-start w-[calc(100vw-60px)] sm:w-[340px] max-w-[360px] flex flex-col gap-[16px] items-start"
                >
                  {/* Left Image Side */}
                  {item.image && (
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
                  )}

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
              {testimonials.map((item, i) => (
                <button
                  key={`mobile-dot-${item._key || i}`}
                  type="button"
                  onClick={() => scrollToMobileSlide(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-[4px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${
                    activeMobileIndex === i
                      ? 'w-[24px] bg-electric-blue'
                      : 'w-[6px] bg-[#91C6F2]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Carousel Container */}
          <div className="hidden lg:flex flex-col w-full">
            <div className="w-full overflow-hidden select-none">
              <div
                className="flex w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((item, idx) => (
                  <div
                    key={`desktop-testimonial-${item._key || idx}`}
                    className="w-full shrink-0 flex flex-row gap-[32px] xl:gap-[60px] items-start"
                  >
                    {/* Left Image Side */}
                    {item.image && (
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
                    )}

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
                {testimonials.map((item, i) => (
                  <button
                    key={`desktop-dot-${item._key || i}`}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-[7px] rounded-[32px] transition-all duration-300 cursor-pointer p-0 border-none outline-none ${
                      currentIndex === i
                        ? 'w-[40px] bg-electric-blue'
                        : 'w-[12px] bg-[#91C6F2]'
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-[12px]">
                {/* Left Arrow */}
                <CTA
                  variant="light-arrow"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-[48px] h-[48px] rotate-180 transition-all duration-300 cursor-pointer"
                />
                {/* Right Arrow */}
                <CTA
                  variant="light-arrow"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-[48px] h-[48px] transition-all duration-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
