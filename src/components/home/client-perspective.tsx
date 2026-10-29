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
    <section className="relative w-full overflow-hidden bg-[#0A60AF]">
      <div className="w-full rounded-bl-[30px] bg-white px-[20px] pt-[16px] pb-[32px] sm:rounded-bl-[40px] sm:pt-[24px] sm:pb-[48px] md:px-[40px] lg:rounded-bl-[80px] lg:px-[60px] lg:pt-[60px] lg:pb-[100px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start">
          {/* Eyebrow: Client Perspective (Shown on both Mobile and Desktop) */}
          <div className="mb-[20px] inline-flex items-center gap-[6px] lg:mb-[32px] lg:gap-[8px]">
            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
            <span className="type-body-xxs tracking-[0.01em] text-[#7D8690]">
              Client Perspective
            </span>
          </div>

          {/* Mobile / Tablet Smooth Snap Slider */}
          <div className="flex w-full flex-col lg:hidden">
            <div
              ref={mobileScrollRef}
              onScroll={handleMobileScroll}
              className="no-scrollbar -mr-[20px] flex w-[calc(100%+20px)] snap-x snap-mandatory items-start gap-[16px] overflow-x-auto pr-[20px]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((item, idx) => (
                <div
                  key={`mobile-testimonial-${item._key || idx}`}
                  className="flex w-[calc(100vw-60px)] max-w-[360px] shrink-0 snap-start flex-col items-start gap-[16px] sm:w-[340px]"
                >
                  {/* Left Image Side */}
                  {item.image && (
                    <div
                      className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px]"
                      style={{
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '20px',
                        borderBottomLeftRadius: '20px',
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="rounded-[20px_10px_20px_20px] object-cover"
                        style={{
                          borderTopLeftRadius: '20px',
                          borderTopRightRadius: '10px',
                          borderBottomRightRadius: '20px',
                          borderBottomLeftRadius: '20px',
                        }}
                      />
                    </div>
                  )}

                  {/* Content Side */}
                  <div className="flex w-full flex-col justify-center bg-transparent">
                    <p className="type-body-xxs mb-[16px] text-[#111111]">{item.quote}</p>

                    <div className="flex flex-col gap-[2px]">
                      <span className="type-h6 text-electric-blue">{item.name}</span>
                      <span className="type-body-xxs text-[#7D8690]">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Pagination Indicators */}
            <div className="mt-[16px] flex items-center gap-[6px]">
              {testimonials.map((item, i) => (
                <button
                  key={`mobile-dot-${item._key || i}`}
                  type="button"
                  onClick={() => scrollToMobileSlide(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-[4px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${
                    activeMobileIndex === i ? 'bg-electric-blue w-[24px]' : 'w-[6px] bg-[#91C6F2]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Carousel Container */}
          <div className="hidden w-full flex-col lg:flex">
            <div className="w-full overflow-hidden select-none">
              <div
                className="flex w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((item, idx) => (
                  <div
                    key={`desktop-testimonial-${item._key || idx}`}
                    className="flex w-full shrink-0 flex-row items-start gap-[32px] overflow-hidden xl:gap-[60px]"
                  >
                    {/* Left Image Side */}
                    {item.image && (
                      <div
                        className="relative aspect-[4/3] w-[340px] shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] xl:w-[480px]"
                        style={{
                          borderTopLeftRadius: '20px',
                          borderTopRightRadius: '10px',
                          borderBottomRightRadius: '20px',
                          borderBottomLeftRadius: '20px',
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 1280px) 340px, 480px"
                          className="rounded-[20px_10px_20px_20px] object-cover"
                          style={{
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '20px',
                            borderBottomLeftRadius: '20px',
                          }}
                        />
                      </div>
                    )}

                    {/* Right Content Side */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center bg-transparent">
                      <p className="type-body-s mb-[40px] text-[#111111]">{item.quote}</p>

                      <div className="flex flex-col gap-[6px]">
                        <span className="type-h5 text-electric-blue">{item.name}</span>
                        <span className="type-body-xxs text-[#7D8690]">{item.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Carousel Indicators / Navigation */}
            <div className="mt-[48px] flex w-full items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-[8px]">
                {testimonials.map((item, i) => (
                  <button
                    key={`desktop-dot-${item._key || i}`}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-[7px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${
                      currentIndex === i ? 'bg-electric-blue w-[40px]' : 'w-[12px] bg-[#91C6F2]'
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
                  className="h-[48px] w-[48px] rotate-180 cursor-pointer transition-all duration-300"
                />
                {/* Right Arrow */}
                <CTA
                  variant="light-arrow"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="h-[48px] w-[48px] cursor-pointer transition-all duration-300"
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
