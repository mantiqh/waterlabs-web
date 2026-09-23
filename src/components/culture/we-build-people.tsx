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
      '/images/culture/we-build-people/img_Performance%20is%20a%20conversation_mobile%20%281%29.png',
    bgColor: '#63CCB7', // Mint
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
      '/images/culture/we-build-people/img_We%20build%20people%20for%20the%20role_mobile%20%281%29.png',
    bgColor: '#A9D154', // Lime Green
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'recognition',
    stepNumber: '03',
    title: 'We recognise the work that moves things forward.',
    description:
      'Water Ripples is our recognition program, built on a simple idea. Recognition belongs to the meaningful and outstanding actions that made the real difference. It rewards ownership, innovation, leadership, and team effort.',
    desktopImage:
      '/images/culture/we-build-people/img_We%20recognise%20the%20work%20that%20moves%20things%20forward.png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20recognise%20the%20work%20that%20moves%20things%20forward_mobile%20%281%29.png',
    bgColor: '#D6A85F', // Golden Ochre
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'career-step',
    stepNumber: '04',
    title: 'Your career has a next step, and we help you find it.',
    description:
      'We talk to you about where you want to go. Then we build the capabilities and open the opportunities that get you there.',
    desktopImage:
      '/images/culture/we-build-people/img_Your%20career%20has%20a%20next%20step%2C%20and%20we%20help%20you%20find%20it.png',
    mobileImage:
      '/images/culture/we-build-people/img_Your%20career%20has%20a%20next%20step%2C%20and%20we%20help%20you%20find%20it_mobile%20%281%29.png',
    bgColor: '#63CCB7', // Mint
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'engagement',
    stepNumber: '05',
    title: 'We act on engagement.',
    description:
      'We ask, listen, and close the loop. Feedback that goes nowhere is a survey. Ours turns into decisions.',
    desktopImage:
      '/images/culture/we-build-people/img_We%20act%20on%20engagement..png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20act%20on%20engagement_mobile%20%281%29.png',
    bgColor: '#A9D154', // Lime Green
    textColor: '#042849',
    descColor: '#111111',
  },
  {
    id: 'onboarding',
    stepNumber: '06',
    title: 'Onboarding doesn’t end on day one.',
    description:
      'Waterpulse keeps us close to your experience with structured check-ins at 30, 60, and 90 days. We use them to catch what is working and fix what is slipping early. We want you to see a future here, and that starts with knowing exactly how you are doing.',
    desktopImage:
      '/images/culture/we-build-people/img_Onboarding%20doesn%E2%80%99t%20end%20on%20day%20one..png',
    mobileImage:
      '/images/culture/we-build-people/img_We%20build%20people%20for%20the%20role_card_01_mobile.png',
    bgColor: '#D6A85F', // Golden Ochre
    textColor: '#042849',
    descColor: '#111111',
  },
];

export const WeBuildPeopleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const getCardStage = useCallback((progress: number) => {
    const totalTransitions = CULTURE_CARDS.length - 1; // 5 transitions
    if (progress <= 0) return 0;
    if (progress >= 1) return totalTransitions;

    const segment = Math.min(
      Math.floor(progress * totalTransitions),
      totalTransitions - 1
    );
    const progressInSegment =
      (progress - segment / totalTransitions) * totalTransitions;

    const smoothstep = (min: number, max: number, value: number) => {
      const x = Math.min(Math.max((value - min) / (max - min), 0), 1);
      return x * x * (3 - 2 * x);
    };

    // For segment 0 (Card 1), start animating immediately as user scrolls without dead zone
    const startRest = segment === 0 ? 0.0 : 0.06;
    const endRest = segment === 0 ? 0.88 : 0.94;
    const t = smoothstep(startRest, endRest, progressInSegment);
    return segment + t;
  }, []);

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
    const totalTransitions = CULTURE_CARDS.length - 1; // 5
    const targetProgress =
      index === 0
        ? 0.02
        : index === totalTransitions
        ? 0.98
        : (index + 0.5) / (totalTransitions + 1);
    const targetScrollY =
      window.scrollY + rect.top + targetProgress * scrollDistance;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  /**
   * Scroll-scrubbed physical card stack animation:
   * - The current active card is at the front.
   * - When scrolling down, the CURRENT card moves UP, slightly SIDEWAYS, TILTS, and FADES OUT.
   * - At the same time, the card underneath is revealed and moves into the front position.
   * - The interaction is strictly scroll-driven and fully reversible on scroll up.
   */
  const getCardStyle = (index: number) => {
    const stage = getCardStage(scrollProgress);
    const diff = index - stage;

    // Case 1: Card has already completed its exit
    if (diff <= -1.0) {
      return {
        transform: 'translate3d(28px, -90px, 0) rotate(2.5deg) scale(0.97)',
        opacity: 0,
        zIndex: 5,
        pointerEvents: 'none' as const,
      };
    }

    // Case 2: Outgoing card — visibly moving UP + SIDEWAYS + TILT + FADE
    if (diff < 0) {
      const exitProgress = -diff; // 0 -> 1 as stage moves from index to index + 1
      const translateY = -90 * exitProgress;
      const translateX = 28 * exitProgress;
      const rotate = 2.5 * exitProgress;
      const scale = 1 - 0.03 * exitProgress;
      const opacity = Math.max(0, 1 - exitProgress);

      return {
        transform: `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
        opacity,
        zIndex: 50 - index, // Stays above upcoming card while lifting off
      };
    }

    // Case 3: Front active card (at rest)
    if (diff <= 0.001) {
      return {
        transform: 'translate3d(0px, 0px, 0) rotate(0deg) scale(1)',
        opacity: 1,
        zIndex: 40 - index,
      };
    }

    // Case 4: Card underneath being revealed into the front position
    if (diff <= 1.0) {
      const revealProgress = 1 - diff; // 0 -> 1 as stage moves from index - 1 to index
      const translateY = 24 * (1 - revealProgress);
      const scale = 0.96 + 0.04 * revealProgress;
      const opacity = 0.88 + 0.12 * revealProgress;

      return {
        transform: `translate3d(0px, ${translateY.toFixed(2)}px, 0) rotate(0deg) scale(${scale.toFixed(3)})`,
        opacity,
        zIndex: 40 - index,
      };
    }

    // Case 5: Second card underneath in the stack
    if (diff <= 2.0) {
      const t = 2 - diff; // 0 -> 1 as stage moves towards index - 1
      const translateY = 48 - 24 * t;
      const scale = 0.92 + 0.04 * t;
      const opacity = 0.6 + 0.28 * t;

      return {
        transform: `translate3d(0px, ${translateY.toFixed(2)}px, 0) rotate(0deg) scale(${scale.toFixed(3)})`,
        opacity,
        zIndex: 30 - index,
      };
    }

    // Case 6: Waiting deep in the stack
    return {
      transform: 'translate3d(0px, 48px, 0) rotate(0deg) scale(0.92)',
      opacity: 0,
      zIndex: 10,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F6F9] px-[20px] md:px-[40px] lg:px-[60px]"
      style={{
        // 500vh provides a comfortable, responsive scroll journey across all 6 stacked cards
        minHeight: '500vh',
      }}
      aria-label="Culture at Waterlabs - How we work"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full flex flex-col justify-start pt-[16px] sm:pt-[20px] lg:pt-[24px] pb-0 overflow-visible"
      >
        {/* =================================================================
            SECTION HEADER: Tag + Eyebrow + Section Title
           ================================================================= */}
        <div className="w-full max-w-[1320px] mx-auto mb-[12px] sm:mb-[16px] lg:mb-[20px] flex flex-col gap-[8px] sm:gap-[10px] shrink-0">
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
            STACKED CARDS DECK: 6 Stacking Cards
           ================================================================= */}
        <div className="relative w-full max-w-[1320px] mx-auto h-[500px] sm:h-[540px] lg:h-[433px]">
          {CULTURE_CARDS.map((card, index) => {
            const dynamicStyle = getCardStyle(index);

            return (
              <div
                key={card.id}
                style={{
                  ...dynamicStyle,
                  transformOrigin: '50% 100%',
                  transition:
                    'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.12s ease-out',
                }}
                className="absolute inset-x-0 top-0 w-full h-[500px] sm:h-[540px] lg:h-[433px] rounded-[30px_0px_30px_30px] lg:rounded-[30px_10px_30px_30px] overflow-hidden shadow-[0_16px_40px_rgba(4,40,73,0.08)] bg-white border border-black/5 flex flex-col lg:flex-row will-change-transform cursor-pointer"
                onClick={() => scrollToCard(index)}
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
                  className="relative z-10 w-full lg:w-[480px] xl:w-[539px] flex-1 min-h-0 lg:h-full lg:flex-none p-[24px] sm:p-[32px] lg:p-[36px] xl:p-[40px] flex flex-col justify-center items-start rounded-[30px_0px_0px_0px] lg:!rounded-[30px_0px_60px_0px] shrink-0 overflow-y-auto no-scrollbar"
                  style={{
                    backgroundColor: card.bgColor,
                  }}
                >
                  <div className="w-full flex flex-col items-start gap-[12px] lg:gap-[16px] my-auto">
                    {/* Card Heading — Display/H2 */}
                    <h3
                      className="type-h2 max-w-[459px]"
                      style={{ color: card.textColor }}
                    >
                      {card.title}
                    </h3>

                    {/* Card Description — Body/Body-S */}
                    <p
                      className="type-body-s max-w-[459px]"
                      style={{ color: card.descColor }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Mobile / Tablet Image Box */}
                <div className="block lg:hidden relative w-full h-[225px] sm:h-[250px] shrink-0 rounded-[0px_10px_30px_30px] overflow-hidden">
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
      </div>
    </section>
  );
};

export default WeBuildPeopleSection;


