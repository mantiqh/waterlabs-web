'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CultureCard {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  bgColor: string;
  textColor: string;
  descColor: string;
}

const CULTURE_CARDS: CultureCard[] = [
  {
    id: 'performance',
    stepNumber: '01',
    title: 'Performance is a conversation.',
    description:
      'We set clear goals and give feedback you can use. We talk about where you are headed as much as where you have been. Reviews happen on schedule. Conversations about your growth happen whenever needed.',
    desktopImage:
      '/images/culture/we-build-people/img_Performance%20is%20a%20conversation..png',
    mobileImage:
      '/images/culture/we-build-people/img_Performance%20is%20a%20conversation_mobile%20(1).png',
    bgColor: '#63CCB7', // Mint / Teal
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'build-people',
    stepNumber: '02',
    title: 'We build people for the role.',
    description:
      'We identify capability gaps and invest in closing them through mentoring, coaching, leadership development, and stretch assignments that teach you faster than any training module. Development starts from an honest read of where you are, and it is planned against where you want to go.',
    desktopImage:
      '/images/culture/we-build-people/img_We%20build%20people%20for%20the%20role.png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20build%20people%20for%20the%20role_mobile%20(1).png',
    bgColor: '#A9D154', // Lime Green
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'recognition',
    stepNumber: '03',
    title: 'We recognise the work that moves things forward.',
    description:
      'Water Ripples is our recognition program, built on a simple idea. Recognition belongs to the meaningful and outstanding actions that made the real difference. It rewards ownership, innovation, leadership, and team effort. Spot recognition when something deserves it today, monthly and quarterly awards for sustained contribution, and half-yearly and annual recognition for the work that shaped a year. It catches moments that shape everything else and rarely show up on a scorecard.',
    desktopImage:
      '/images/culture/we-build-people/img_We%20recognise%20the%20work%20that%20moves%20things%20forward.png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20recognise%20the%20work%20that%20moves%20things%20forward_mobile%20(1).png',
    bgColor: '#D6A85F', // Golden Ochre
    textColor: '#042849',
    descColor: '#111111',
  },
];

export const WeBuildPeopleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const stickyHeight = stickyRef.current?.offsetHeight || window.innerHeight;
    const scrollDistance = rect.height - stickyHeight;

    if (scrollDistance <= 0) return;

    // How far the top of the section has scrolled past the top of the viewport
    const scrolled = -rect.top;
    const rawProgress = scrolled / scrollDistance;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

    setScrollProgress(clampedProgress);

    // Map progress to active card (0, 1, or 2)
    if (clampedProgress < 0.35) {
      setActiveCardIndex(0);
    } else if (clampedProgress < 0.7) {
      setActiveCardIndex(1);
    } else {
      setActiveCardIndex(2);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const stickyHeight = stickyRef.current?.offsetHeight || window.innerHeight;
    const scrollDistance = rect.height - stickyHeight;
    const targetProgress = index === 0 ? 0.05 : index === 1 ? 0.5 : 0.95;
    const targetScrollY =
      window.scrollY + rect.top + targetProgress * scrollDistance;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  /**
   * Helper to calculate transform, scale, opacity, zIndex, and clipPath for each card based on scrollProgress
   * Range [0, 1]:
   * - Next card emerges smoothly from behind the bottom peek and slides upward over the front card.
   * - Front card remains visible and sinks slightly into depth.
   */
  const getCardStyle = (index: number) => {
    // Transition thresholds
    const t1Start = 0.15;
    const t1End = 0.45;
    const t2Start = 0.55;
    const t2End = 0.85;

    // Smoothstep easing for natural acceleration and deceleration
    const smoothstep = (min: number, max: number, value: number) => {
      const x = Math.min(Math.max((value - min) / (max - min), 0), 1);
      return x * x * (3 - 2 * x);
    };

    if (index === 0) {
      if (scrollProgress < t1Start) {
        return {
          transform: 'translateY(0px) scale(1)',
          opacity: 1,
          zIndex: 30,
        };
      } else if (scrollProgress <= t1End) {
        const eased = smoothstep(t1Start, t1End, scrollProgress);
        const translateY = -16 * eased;
        const scale = 1 - 0.04 * eased;
        const opacity = 1 - 0.25 * eased;
        return {
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          zIndex: 20,
        };
      } else {
        const eased = smoothstep(t2Start, t2End, scrollProgress);
        const translateY = -16 - 6 * eased;
        const scale = 0.96 - 0.02 * eased;
        const opacity = 0.75 - 0.25 * eased;
        return {
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          zIndex: 10,
        };
      }
    }

    if (index === 1) {
      if (scrollProgress < t1Start) {
        // Peeking underneath Card 0
        return {
          transform: 'translateY(36px) scale(0.97)',
          opacity: 0.9,
          zIndex: 20,
        };
      } else if (scrollProgress <= t1End) {
        // Emerging from behind bottom peek and rising smoothly over Card 0
        const eased = smoothstep(t1Start, t1End, scrollProgress);
        const translateY = 36 * (1 - eased);
        const scale = 0.97 + 0.03 * eased;
        // Clip reveals upward: at eased=0 only bottom ~8.3% (36px peek) is visible; at eased=1 100% is visible
        const clipTop = (1 - eased) * 91.686;
        const clipPath =
          clipTop <= 0.2
            ? 'none'
            : `inset(${clipTop.toFixed(2)}% 0 0 0 round 30px 10px 0 0)`;

        return {
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity: 1,
          zIndex: 35,
          clipPath,
        };
      } else if (scrollProgress < t2Start) {
        // Active at front
        return {
          transform: 'translateY(0px) scale(1)',
          opacity: 1,
          zIndex: 35,
          clipPath: 'none',
        };
      } else if (scrollProgress <= t2End) {
        // Sinking behind Card 2
        const eased = smoothstep(t2Start, t2End, scrollProgress);
        const translateY = -16 * eased;
        const scale = 1 - 0.04 * eased;
        const opacity = 1 - 0.25 * eased;
        return {
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          zIndex: 20,
          clipPath: 'none',
        };
      } else {
        return {
          transform: 'translateY(-16px) scale(0.96)',
          opacity: 0.75,
          zIndex: 20,
          clipPath: 'none',
        };
      }
    }

    if (index === 2) {
      if (scrollProgress < t1Start) {
        // Deepest peek underneath Card 1 & Card 0
        return {
          transform: 'translateY(68px) scale(0.94)',
          opacity: 0.8,
          zIndex: 10,
        };
      } else if (scrollProgress <= t1End) {
        // Rising from deepest peek (68px) to second peek position (36px)
        const eased = smoothstep(t1Start, t1End, scrollProgress);
        const translateY = 68 - 32 * eased;
        const scale = 0.94 + 0.03 * eased;
        const opacity = 0.8 + 0.1 * eased;
        return {
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          zIndex: 15,
        };
      } else if (scrollProgress < t2Start) {
        // Peeking underneath Card 1 at 36px
        return {
          transform: 'translateY(36px) scale(0.97)',
          opacity: 0.9,
          zIndex: 25,
        };
      } else if (scrollProgress <= t2End) {
        // Emerging from behind bottom peek and rising smoothly over Card 1
        const eased = smoothstep(t2Start, t2End, scrollProgress);
        const translateY = 36 * (1 - eased);
        const scale = 0.97 + 0.03 * eased;
        const clipTop = (1 - eased) * 91.686;
        const clipPath =
          clipTop <= 0.2
            ? 'none'
            : `inset(${clipTop.toFixed(2)}% 0 0 0 round 30px 10px 0 0)`;

        return {
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity: 1,
          zIndex: 40,
          clipPath,
        };
      } else {
        // Active at top
        return {
          transform: 'translateY(0px) scale(1)',
          opacity: 1,
          zIndex: 40,
          clipPath: 'none',
        };
      }
    }

    return {};
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F6F9] px-[20px] md:px-[40px] lg:px-[60px]"
      style={{
        // 240vh provides a smooth, comfortable scroll journey through all 3 stacked cards
        minHeight: '240vh',
      }}
      aria-label="Culture at Waterlabs - How we work"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full flex flex-col justify-start pt-[16px] sm:pt-[24px] lg:pt-[36px] pb-0 overflow-visible"
      >
        {/* =================================================================
            SECTION HEADER: Tag + Eyebrow + Section Title
           ================================================================= */}
        <div className="w-full max-w-[1320px] mx-auto mb-[16px] sm:mb-[24px] lg:mb-[32px] flex flex-col gap-[8px] sm:gap-[10px] shrink-0">
          {/* Tag / Eyebrow */}
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
            <span className="type-body-xxs text-[#7D8690] tracking-[0.01em]">
              How we work
            </span>
          </div>

          {/* Main Section Heading */}
          <h2 className="type-h2 text-[#111111] uppercase tracking-[-0.01em]">
            CULTURE AT WATERLABS
          </h2>
        </div>

        {/* =================================================================
            STACKED CARDS DECK: 3 Stacking Cards
           ================================================================= */}
        <div className="relative w-full max-w-[1320px] mx-auto h-[460px] sm:h-[470px] lg:h-[460px]">
          {CULTURE_CARDS.map((card, index) => {
            const dynamicStyle = getCardStyle(index);

            return (
              <div
                key={card.id}
                style={{
                  ...dynamicStyle,
                  transition:
                    'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out, clip-path 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="absolute inset-x-0 top-0 w-full h-[460px] sm:h-[470px] lg:h-[460px] rounded-[24px_10px_24px_24px] sm:rounded-[30px_10px_30px_30px] overflow-hidden shadow-[0_16px_40px_rgba(4,40,73,0.08)] bg-white border border-black/5 flex flex-col lg:flex-row will-change-transform cursor-pointer"
                onClick={() => {
                  if (activeCardIndex !== index) {
                    scrollToCard(index);
                  }
                }}
              >
                {/* Desktop Full-Span Image (Transparent Left, Photo on Right) */}
                <div className="hidden lg:block absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                  <Image
                    src={card.desktopImage}
                    alt={card.title}
                    fill
                    priority={index === 0}
                    sizes="1320px"
                    className="object-cover object-[35%_center] xl:object-right"
                  />
                </div>

                {/* Mint/Lime/Gold Left Content Box (Frame 2147226448 geometry) */}
                <div
                  className="relative z-10 w-full lg:w-[480px] xl:w-[539px] flex-1 min-h-0 lg:h-full lg:flex-none p-[24px] sm:p-[32px] lg:p-[36px] xl:p-[40px] flex flex-col justify-center items-start max-lg:rounded-[24px_10px_0px_0px] sm:max-lg:rounded-[30px_10px_0px_0px] lg:!rounded-[30px_0px_60px_0px] shrink-0 overflow-hidden"
                  style={{
                    backgroundColor: card.bgColor,
                  }}
                >
                  <div className="w-full flex flex-col items-start gap-[10px] lg:gap-[14px]">
                    {/* Step Eyebrow */}
                    <span className="text-[12px] font-semibold tracking-wider text-[#042849]/70 uppercase shrink-0">
                      Principle {card.stepNumber}
                    </span>

                    {/* Card Heading */}
                    <h3
                      className={`max-w-[459px] font-medium leading-[1.18] shrink-0 ${
                        index === 2 ? 'type-h4' : 'type-h3 lg:type-h2'
                      }`}
                      style={{ color: card.textColor }}
                    >
                      {card.title}
                    </h3>

                    {/* Card Description */}
                    <p
                      className={`max-w-[459px] ${
                        index === 2
                          ? 'type-body-xs leading-normal sm:leading-relaxed'
                          : 'type-body-s leading-relaxed'
                      }`}
                      style={{ color: card.descColor }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Mobile / Tablet Image Box */}
                <div className="block lg:hidden relative w-full h-[160px] sm:h-[180px] shrink-0 rounded-[0px_0px_24px_24px] sm:rounded-[0px_0px_30px_30px] overflow-hidden">
                  <Image
                    src={card.mobileImage}
                    alt={card.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Dot Navigation */}
        <div className="flex sm:hidden items-center justify-center gap-[8px] mt-[48px] sm:mt-[56px]">
          {CULTURE_CARDS.map((card, idx) => (
            <button
              key={`dot-${card.id}`}
              onClick={() => scrollToCard(idx)}
              className={`h-[8px] rounded-full transition-all duration-300 ${
                activeCardIndex === idx
                  ? 'w-[28px] bg-[#0F68D6]'
                  : 'w-[8px] bg-[#CBD5E1]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeBuildPeopleSection;
