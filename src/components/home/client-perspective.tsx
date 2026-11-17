'use client';

import { gsap } from 'gsap/dist/gsap';
import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { CTA } from '@/components/CTA';
import { DEFAULT_HOME_DATA } from '@/data/home';
import { mountCarouselAutoplay, mountCarouselDrag } from '@/lib/motion/motion';
import type { TestimonialItem } from '@/types/home';

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export const TestimonialsSection = ({
  testimonials = DEFAULT_HOME_DATA.testimonials,
}: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const directionRef = useRef(1);
  const navigationIndexRef = useRef(0);
  const transitioningRef = useRef(false);
  const pendingNavigationRef = useRef<Array<{ index: number; direction: number }>>([]);
  const navigate = useCallback(
    (direction: number, target?: number) => {
      if (testimonials.length < 2) return;
      const previous = pendingNavigationRef.current.at(-1)?.index ?? navigationIndexRef.current;
      const index = target ?? (previous + direction + testimonials.length) % testimonials.length;
      if (index === previous) return;
      const request = {
        index,
        direction: target === undefined ? direction : Math.sign(index - previous),
      };
      if (transitioningRef.current) {
        pendingNavigationRef.current.push(request);
        return;
      }
      transitioningRef.current = true;
      navigationIndexRef.current = index;
      directionRef.current = request.direction;
      setCurrentIndex(index);
    },
    [testimonials.length],
  );
  useEffect(() => {
    if (!sectionRef.current || testimonials.length < 2) return;
    return mountCarouselAutoplay(sectionRef.current, () => navigate(1), 8000);
  }, [navigate, testimonials.length]);
  // Desktop Carousel State

  const trackRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(currentIndex);
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !testimonials.length) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const slides = Array.from(track.children) as HTMLElement[];
    const previous = previousIndexRef.current;
    const changed = previous !== currentIndex;
    const preservePosition = (anchor: HTMLElement, reorder: () => void) => {
      const before = anchor.getBoundingClientRect().left;
      reorder();
      const delta = before - anchor.getBoundingClientRect().left;
      if (track.offsetWidth)
        gsap.set(track, {
          xPercent: Number(gsap.getProperty(track, 'xPercent')) + (delta / track.offsetWidth) * 100,
        });
    };
    const resetOrder = () => slides.forEach((slide) => slide.style.removeProperty('order'));
    // Park the boundary slide beside the outgoing slide without changing its visible pose.
    // Requests are serialized, so no partially visible sibling is moved by normalization.
    preservePosition(slides[previous] ?? slides[0], () => {
      resetOrder();
      if (
        changed &&
        directionRef.current > 0 &&
        previous === slides.length - 1 &&
        currentIndex === 0
      )
        slides[0].style.order = '1';
      else if (
        changed &&
        directionRef.current < 0 &&
        previous === 0 &&
        currentIndex === slides.length - 1
      )
        slides[slides.length - 1].style.order = '-1';
    });
    const target = slides[currentIndex];
    const offset = target.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const tween = gsap.to(track, {
      xPercent: track.offsetWidth ? (-offset / track.offsetWidth) * 100 : -currentIndex * 100,
      duration: reduced.matches ? 0 : 0.9,
      ease: 'expo.out',
      overwrite: 'auto',
      onComplete: () => {
        resetOrder();
        // Canonical percentages also settle correctly if the desktop track was hidden mid-wrap.
        gsap.set(track, { xPercent: -currentIndex * 100 });
        const next = pendingNavigationRef.current.shift();
        transitioningRef.current = !!next;
        if (next) {
          directionRef.current = next.direction;
          navigationIndexRef.current = next.index;
          setCurrentIndex(next.index);
        }
      },
    });
    previousIndexRef.current = currentIndex;
    const copy = track.children[currentIndex]?.querySelectorAll('[data-testimonial-copy]');
    const reveal =
      changed && copy
        ? gsap.fromTo(
            copy,
            { y: reduced.matches ? 0 : 24, opacity: reduced.matches ? 1 : 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduced.matches ? 0 : 0.9,
              delay: reduced.matches ? 0 : 0.2,
              ease: 'expo.out',
              clearProps: 'transform,opacity',
            },
          )
        : undefined;
    const stopMotion = () => {
      if (reduced.matches) {
        tween.progress(1);
        reveal?.progress(1);
      }
    };
    reduced.addEventListener('change', stopMotion);
    return () => {
      tween.kill();
      reveal?.revert();
      reduced.removeEventListener('change', stopMotion);
    };
  }, [currentIndex, testimonials.length]);
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track?.parentElement) return;
    return mountCarouselDrag(
      track.parentElement,
      track,
      (direction) => navigate(direction),
      undefined,
      () => !transitioningRef.current,
    );
  }, [navigate]);

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
      container.scrollTo({
        left: cardLeft,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
      setActiveMobileIndex(index);
    }
  };

  // Desktop Navigation Handlers
  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate(1);
  };

  return (
    <section
      data-home-section="testimonial"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A60AF]"
    >
      <div className="w-full rounded-bl-[30px] bg-white px-[20px] pt-[16px] pb-[32px] sm:rounded-bl-[40px] sm:pt-[24px] sm:pb-[48px] md:px-[40px] lg:rounded-bl-[80px] lg:px-[60px] lg:pt-[60px] lg:pb-[100px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start">
          {/* Eyebrow: Client Perspective (Shown on both Mobile and Desktop) */}
          <div className="mb-[20px] inline-flex items-center gap-[6px] lg:mb-[32px] lg:gap-[8px]">
            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
            <span
              data-motion-reveal="scramble"
              data-motion-trigger="section"
              data-motion-start="top 70%"
              className="type-body-xxs tracking-[0.01em] text-[#7D8690]"
            >
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
                        data-motion-reveal="image"
                        data-motion-parallax
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
                ref={trackRef}
                data-testimonial-track
                data-active-index={currentIndex}
                className="flex w-full touch-pan-y"
              >
                {testimonials.map((item, idx) => (
                  <div
                    key={`desktop-testimonial-${item._key || idx}`}
                    aria-hidden={idx !== currentIndex}
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
                          data-motion-reveal="image"
                          data-motion-parallax
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
                    <div
                      data-motion-group
                      data-motion-together
                      data-motion-start="top 82%"
                      className="flex min-w-0 flex-1 flex-col justify-center bg-transparent"
                    >
                      <p
                        data-testimonial-copy
                        data-motion-reveal="blur"
                        data-motion-at="0"
                        className="type-body-s mb-[40px] text-[#111111]"
                      >
                        {item.quote}
                      </p>

                      <div
                        data-testimonial-copy
                        data-motion-reveal="fade"
                        data-motion-at="0"
                        data-motion-duration="1.1"
                        data-motion-y="18"
                        className="flex flex-col gap-[6px]"
                      >
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
                    onClick={() => {
                      navigate(1, i);
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={currentIndex === i ? 'true' : undefined}
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
                  data-motion-reveal="fade"
                  data-motion-magnetic
                  variant="light-arrow"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="h-[48px] w-[48px] rotate-180 cursor-pointer transition-all duration-300"
                />
                {/* Right Arrow */}
                <CTA
                  data-motion-reveal="fade"
                  data-motion-magnetic
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
