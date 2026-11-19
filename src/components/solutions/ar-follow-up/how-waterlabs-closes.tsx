'use client';

import { gsap } from 'gsap/dist/gsap';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { mountScrollScene, type SceneMode,sceneScrollPosition } from '@/lib/motion/scroll-scene';

interface VerificationStep {
  title: string;
  description: string;
}

const verificationSteps: VerificationStep[] = [
  {
    title: 'Status checking',
    description:
      'Our agents check claim status directly with the payer on cycle, not waiting for a remittance to explain itself.',
  },
  {
    title: 'Payer follow-up',
    description:
      'The system works the portal, follows up on the claim, and documents what the payer said.',
  },
  {
    title: 'Aging bucket coverage',
    description:
      '30, 60, 90, and 120-plus are worked identically. Age does not determine priority.',
  },
  {
    title: 'Stall detection',
    description: 'Claims that have gone quiet are flagged before aging into the next bucket.',
  },
  {
    title: 'Escalation',
    description:
      'Our agents push what needs pushing and route anything requiring a human to your team.',
  },
  {
    title: 'Documentation',
    description: 'Every touch is logged, so the next action always starts from the last one.',
  },
];

/* Desktop opacity for each step (first = active, rest progressively dim) */
const stepOpacities = [1, 0.75, 0.6, 0.45, 0.3, 0.15];

const TOTAL_DOTS = 3;

export const HowWaterlabsClosesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sceneMode, setSceneMode] = useState<SceneMode>('pending');
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const posRef = useRef({ pos: 0 });

  // Repeated labels fill the visual list; navigation stops at the last real step.
  const displaySteps = useMemo(
    () =>
      Array.from({ length: 3 }).flatMap((_, copy) =>
        verificationSteps.map((step, index) => ({
          ...step,
          originalIndex: index,
          uniqueIndex: copy * verificationSteps.length + index,
        })),
      ),
    [],
  );

  const updateListOffset = useCallback((index: number) => {
    const container = listRef.current;
    const track = container?.firstElementChild;
    if (!container || !(track instanceof HTMLElement)) return;
    const items = Array.from(track.children).slice(0, verificationSteps.length);
    const first = items[0];
    if (!(first instanceof HTMLElement)) return;
    const offsets = items.map((item) => (item as HTMLElement).offsetTop - first.offsetTop);
    const target = offsets[index] ?? 0;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) {
      posRef.current.pos = target;
      track.style.setProperty('--workflow-offset', `${-target}px`);
    } else {
      gsap.to(posRef.current, {
        pos: target,
        duration: 0.42,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: () => {
          track.style.setProperty('--workflow-offset', `${-posRef.current.pos}px`);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const root =
      sectionRef.current.closest<HTMLElement>('[data-solution-sequence]') ?? sectionRef.current;
    return mountScrollScene(root, {
      count: verificationSteps.length,
      onIndex: (index) => {
        activeStepRef.current = index;
        setActiveStep(index);
        updateListOffset(index);
      },
      onMode: setSceneMode,
      kind: 'comparison',
      allowMobile: false,
    });
  }, [updateListOffset]);

  const scrollToStep = useCallback(
    (index: number) => {
      const realIdx = index % verificationSteps.length;
      activeStepRef.current = realIdx;
      setActiveStep(realIdx);
      updateListOffset(realIdx);
      if (!sectionRef.current) return;
      const root =
        sectionRef.current.closest<HTMLElement>('[data-solution-sequence]') ?? sectionRef.current;
      if (sceneMode === 'pinned') {
        const targetProgress = (realIdx + 0.5) / verificationSteps.length;
        const targetScrollY = sceneScrollPosition(root, targetProgress);
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });
      }
    },
    [sceneMode, updateListOffset],
  );

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const handleKey = (event: KeyboardEvent) => {
      if (!(event.target instanceof Node) || !container.contains(event.target)) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const next = Math.min(verificationSteps.length - 1, activeStepRef.current + 1);
        scrollToStep(next);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = Math.max(0, activeStepRef.current - 1);
        scrollToStep(prev);
      }
    };
    container.addEventListener('keydown', handleKey);
    return () => container.removeEventListener('keydown', handleKey);
  }, [scrollToStep]);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    if (scrollLeft <= 15) {
      setActiveDotIndex(0);
      return;
    }

    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 15) {
      setActiveDotIndex(TOTAL_DOTS - 1);
      return;
    }

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const scrollRatio = scrollLeft / maxScroll;
      const dotIndex = Math.min(
        TOTAL_DOTS - 1,
        Math.max(0, Math.round(scrollRatio * (TOTAL_DOTS - 1))),
      );
      setActiveDotIndex(dotIndex);
    }
  };

  const scrollToDot = (dotIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    if (dotIndex === 0) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dotIndex === TOTAL_DOTS - 1) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      const targetScroll = (dotIndex / (TOTAL_DOTS - 1)) * maxScroll;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
    setActiveDotIndex(dotIndex);
  };

  return (
    <section
      ref={sectionRef}
      data-scene-surface
      data-motion-section
      className="w-full overflow-hidden bg-white"
    >
      <div
        ref={cardRef}
        data-scene-content
        data-solution-closes-card
        data-motion-reveal="panel-rtl"
        className="ml-[20px] overflow-hidden rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[40px] [background:linear-gradient(180deg,#042849_16.18%,#63CCB7_178.86%)] md:ml-[40px] md:px-[36px] md:py-[60px] lg:ml-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[48px] lg:py-[80px] lg:[background:linear-gradient(174.65deg,#042849_59.28%,#63CCB7_206.84%)] xl:ml-[max(60px,calc((100vw-1320px)/2))] xl:px-[60px]"
      >
        <div
          data-motion-group
          data-motion-trigger="section"
          className="flex w-full max-w-[1320px] flex-col gap-[20px] lg:gap-[32px]"
        >
          {/* Heading */}
          <h3 data-motion-reveal="lines" data-motion-at="0.55" className="type-h3 text-[#F4F6F9]">
            How Waterlabs <br className="lg:hidden" />
            <span className="text-[#63CCB7]">closes the gap</span>
          </h3>

          {/* Mobile Image Placed Directly Below Title (Matching Figma) */}
          <div className="relative aspect-[353/190] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden">
            <Image
              data-motion-parallax
              src="/images/solutions/solutions-AR-follow-up/how-waterlabs-closes/img_waterlab_closes_the_gap%20(4).png"
              alt="How Waterlabs closes the gap"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 353px"
              className="object-cover object-center"
            />
          </div>

          {/* Subheading */}
          <p
            data-motion-reveal="blur"
            data-motion-at="0.65"
            className="type-body-xs max-w-[873px] text-[#D7DCE2]"
          >
            Our agents work every bucket with the same attention, including those a human team would
            triage away.
          </p>

          {/* Desktop Layout: Image+Description Left, Tab List Right */}
          <div className="hidden flex-row items-start justify-between gap-[24px] pt-[20px] lg:flex xl:gap-[40px]">
            {/* Left Column: Image + Description */}
            <div className="flex w-full shrink-0 flex-col gap-[24px] lg:w-[44%] lg:max-w-[590px] xl:w-[590px]">
              {/* Image */}
              <div
                data-solution-closes-image
                data-motion-reveal="image"
                data-motion-at="0.65"
                className="relative aspect-[590/287] w-full overflow-hidden rounded-[20px_10px_20px_20px]"
              >
                <Image
                  data-motion-parallax
                  src="/images/solutions/solutions-AR-follow-up/how-waterlabs-closes/img_waterlab_closes_the_gap%20(4).png"
                  alt={verificationSteps[activeStep].title}
                  fill
                  priority
                  sizes="(max-width: 1440px) 44vw, 590px"
                  className="object-cover object-center"
                />
              </div>

              {/* Description for active step */}
              <p
                data-motion-reveal="fade"
                data-motion-at="0.75"
                className="type-body-xs grid min-h-[48px] text-[#D7DCE2]"
              >
                {/* Shared grid cells reserve content height; only the active description fades in. */}
                {verificationSteps.map((step, index) => (
                  <span
                    key={index}
                    aria-hidden={index !== activeStep}
                    className={`transition-opacity duration-200 [grid-area:1/1] motion-reduce:transition-none ${index === activeStep ? 'visible' : 'invisible'}`}
                    style={{ opacity: index === activeStep ? 1 : 0 }}
                  >
                    {step.description}
                  </span>
                ))}
              </p>
            </div>

            {/* Right Column: Tab List */}
            <div
              ref={listRef}
              data-solution-closes-list
              data-motion-reveal="fade"
              data-motion-at="0.7"
              className="no-scrollbar flex h-[360px] min-w-0 flex-1 flex-col gap-[16px] overflow-clip pt-[8px] pr-[12px] xl:h-[380px] xl:gap-[20px]"
            >
              <div
                className="flex shrink-0 flex-col gap-[16px] transition-transform duration-300 ease-out xl:gap-[24px]"
                style={{ transform: 'translateY(var(--workflow-offset, 0px))' }}
              >
                {displaySteps.map((step) => {
                  const isActive = step.uniqueIndex === activeStep;
                  const diff = Math.abs(step.uniqueIndex - activeStep);
                  const opacity = isActive
                    ? 1
                    : diff < stepOpacities.length
                      ? (stepOpacities[diff] ?? 0.15)
                      : 0.15;

                  return (
                    <button
                      key={step.uniqueIndex}
                      disabled={step.uniqueIndex >= verificationSteps.length}
                      aria-hidden={step.uniqueIndex >= verificationSteps.length}
                      type="button"
                      aria-pressed={isActive}
                      className={`type-h4 shrink-0 cursor-pointer border-none bg-transparent p-0 text-left whitespace-normal transition-[opacity,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none ${
                        isActive ? 'text-[#63CCB7]' : 'text-white hover:text-[#D7DCE2]'
                      }`}
                      style={{
                        opacity,
                      }}
                      onClick={() => scrollToStep(step.uniqueIndex)}
                    >
                      {step.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile / Tablet: Horizontal Scroll Cards */}
          <div className="flex flex-col gap-[16px] lg:hidden">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="no-scrollbar flex w-full flex-row items-stretch gap-[12px] overflow-x-auto scroll-smooth pb-[4px]"
            >
              {verificationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[20px_10px_20px_20px] p-[20px] sm:w-[342px]"
                  style={{
                    background: 'rgba(17, 17, 17, 0.3)',
                  }}
                >
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="type-h5 text-[20px] leading-[28px] tracking-[-0.01em] text-[#91C6F2]">
                      {step.title}
                    </h4>
                    <p className="type-body-xs text-[14px] leading-[24px] text-[#D7DCE2]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="w-[8px] shrink-0" />
            </div>

            {/* Mobile Carousel Indicators */}
            <div className="flex flex-row items-center gap-[5px] pt-[8px]">
              {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
                const isActive = activeDotIndex === i;
                const diff = Math.abs(activeDotIndex - i);
                const widthClass = isActive
                  ? 'w-[32px] bg-white'
                  : diff === 1
                    ? 'w-[16px] bg-white/20'
                    : 'w-[6px] bg-white/20';

                return (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => scrollToDot(i)}
                    aria-label={`Go to step group ${i + 1}`}
                    className={`h-[6px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${widthClass}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWaterlabsClosesSection;
