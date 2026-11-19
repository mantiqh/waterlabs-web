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
    title: 'Coverage verification',
    description:
      'Our agents confirm the plan is active on the service date directly with the payer, not from a cached file.',
  },
  {
    title: 'Benefit detail',
    description:
      'Copays, coinsurance, deductibles, and out-of-pocket maximums are extracted directly so your front desk has the complete picture before the patient arrives.',
  },
  {
    title: 'Patient responsibility',
    description:
      'Estimated patient responsibility is calculated prior to the visit, reducing surprise bills and improving upfront collection rates.',
  },
  {
    title: 'Secondary and tertiary coverage',
    description:
      'When patients carry more than one plan, our agents identify and verify every layer of coverage automatically.',
  },
  {
    title: 'Re-verification',
    description:
      'If anything changes between booking and the service date, coverage is re-checked so nothing is stale when the patient arrives.',
  },
];

/* Desktop opacity for each step (first = active, rest progressively dim) */
const stepOpacities = [1, 0.7, 0.6, 0.4, 0.13];

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
          <h3 data-motion-reveal="lines" className="type-h3 text-[#F4F6F9]">
            How Waterlabs <span className="text-[#63CCB7]">closes the gap</span>
          </h3>

          {/* Mobile Image Placed Directly Below Title (Matching Figma) */}
          <div
            data-motion-reveal="image"
            className="relative aspect-[353/190] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden"
          >
            <Image
              data-motion-parallax
              src="/images/solutions/solutions-eligibility/how-waterlabs-closes/img_waterlab_closes_the_gap.png"
              alt="How Waterlabs closes the gap"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 353px"
              className="object-cover object-center"
            />
          </div>

          {/* Subheading */}
          <p data-motion-reveal="blur" className="type-body-xs max-w-[873px] text-[#D7DCE2]">
            Our agents verify every scheduled patient before the visit and again if anything changes
            between booking and the service date.
          </p>

          {/* Desktop Layout: Image+Description Left, Tab List Right */}
          <div className="hidden flex-row items-start justify-between gap-[24px] pt-[20px] lg:flex xl:gap-[40px]">
            {/* Left Column: Image + Description */}
            <div className="flex w-full shrink-0 flex-col gap-[24px] lg:w-[44%] lg:max-w-[590px] xl:w-[590px]">
              {/* Image */}
              <div
                data-solution-closes-image
                data-motion-reveal="image"
                className="relative aspect-[590/287] w-full overflow-hidden rounded-[20px_10px_20px_20px]"
              >
                <Image
                  data-motion-parallax
                  src="/images/solutions/solutions-eligibility/how-waterlabs-closes/img_waterlab_closes_the_gap.png"
                  alt={verificationSteps[activeStep].title}
                  fill
                  priority
                  sizes="(max-width: 1440px) 44vw, 590px"
                  className="object-cover object-center"
                />
              </div>

              {/* Description for active step */}
              <p className="type-body-xs grid min-h-[48px] text-[#D7DCE2]">
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

            {/* Right Column: Scrollable Tab List */}
            <div
              ref={listRef}
              data-solution-closes-list
              className="no-scrollbar flex h-[360px] min-w-0 flex-1 flex-col gap-[16px] overflow-clip pt-[8px] pr-[12px] xl:h-[380px] xl:gap-[24px]"
            >
              <div
                className="flex shrink-0 flex-col gap-[16px] xl:gap-[24px]"
                style={{ transform: 'translateY(var(--workflow-offset, 0px))' }}
              >
                {displaySteps.map((step) => {
                  const isActive = step.uniqueIndex === activeStep;
                  const diff = Math.abs(step.uniqueIndex - activeStep);
                  const opacity = isActive
                    ? 1
                    : diff < stepOpacities.length
                      ? (stepOpacities[diff] ?? 0.13)
                      : 0.13;

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

          {/* ========================================================================= */}
          {/* Mobile & Tablet Card Layout (<1024px)                                     */}
          {/* ========================================================================= */}
          <div className="flex w-full flex-col gap-[20px] lg:hidden">
            {/* Scrollable Container with Snap */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="no-scrollbar flex w-full snap-x snap-mandatory flex-row gap-[16px] overflow-x-auto pb-[10px]"
            >
              {verificationSteps.map((step, index) => (
                <div
                  key={index}
                  className="w-[280px] shrink-0 snap-start rounded-[16px] border border-white/10 bg-white/5 p-[16px] backdrop-blur-[12px] sm:w-[320px]"
                >
                  <h4 className="type-h5 mb-[8px] text-[#63CCB7]">{step.title}</h4>
                  <p className="type-body-xxs text-[#D7DCE2]">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicators (Figma Frame Carousel indicators) */}
            <div className="flex items-center justify-start gap-[5px] pt-[4px]">
              {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
                const isActive = activeDotIndex === i;
                const diff = Math.abs(activeDotIndex - i);
                const widthClass = isActive
                  ? 'w-[32px] bg-[#63CCB7]'
                  : diff === 1
                    ? 'w-[16px] bg-[#63CCB7]/20'
                    : 'w-[6px] bg-[#63CCB7]/20';

                return (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => scrollToDot(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-[5px] cursor-pointer rounded-[32px] border-none p-0 transition-all duration-300 outline-none ${widthClass}`}
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
