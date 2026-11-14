'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

interface VerificationStep {
  title: string;
  description: string;
}

const verificationSteps: VerificationStep[] = [
  {
    title: 'Pre-submission scrubbing',
    description:
      'Each claim is validated against the payer’s most up-to-date rules, not outdated criteria.',
  },
  {
    title: 'Format and field validation',
    description:
      'Structural errors, such as transposed digits or incorrect fields, are identified before adjudication begins.',
  },
  {
    title: 'Payer-specific rule application',
    description:
      'Each payer’s requirements are applied individually, rather than using a generic ruleset.',
  },
  {
    title: 'Attachment and documentation checks',
    description:
      'We ensure all required documentation is included before submission, preventing unnecessary holds.',
  },
  {
    title: 'Submission and tracking',
    description:
      'Claims are filed and acknowledgments tracked to ensure nothing is lost between your system and the payer.',
  },
  {
    title: 'Rejection handling',
    description:
      'Rejected claims are corrected, resubmitted, and the resolution is applied to future submissions.',
  },
  {
    title: 'Write-back to your EHR',
    description:
      'Submission status, acknowledgments, and rejection history are recorded on each claim for easy access by billing and accounts receivable teams.',
  },
];

/* Desktop opacity for each step (first = active, rest progressively dim) */
const stepOpacities = [1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.15];

const TOTAL_DOTS = 3;

export const HowWaterlabsClosesSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);
  const selectStepRef = useRef<(index: number) => void>(() => {});

  // Repeated labels fill the visual list; navigation stops at the last real step.
  const repeatedSteps = useMemo(
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

  // One animation owns the visual position; there is no native scroll/reset feedback loop.
  useEffect(() => {
    const container = listRef.current;
    const track = container?.firstElementChild;
    const card = container?.closest('section')?.firstElementChild;
    if (
      !container ||
      !(track instanceof HTMLElement) ||
      !(card instanceof HTMLElement) ||
      !verificationSteps.length
    )
      return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let offsets: number[] = [];
    let position = 0;
    let target = 0;
    let frame = 0;
    let previousTime = 0;
    const paint = () => {
      track.style.setProperty('--workflow-offset', `${-position}px`);
      let nearest = 0;
      for (let index = 1; index < offsets.length; index++) {
        if (Math.abs(offsets[index] - position) < Math.abs(offsets[nearest] - position))
          nearest = index;
      }
      if (nearest !== activeStepRef.current) {
        activeStepRef.current = nearest;
        setActiveStep(nearest);
      }
    };
    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      position += (target - position) * (1 - Math.exp(-elapsed / 35));
      if (Math.abs(target - position) < 0.25) position = target;
      paint();
      if (position !== target) frame = requestAnimationFrame(tick);
      else {
        frame = 0;
        previousTime = 0;
      }
    };
    const finish = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      position = target;
      paint();
    };
    const animate = () => {
      if (motion.matches) finish();
      else if (!frame) frame = requestAnimationFrame(tick);
    };
    const updateBoundary = () => {
      const items = Array.from(track.children).slice(0, verificationSteps.length);
      const first = items[0];
      if (!(first instanceof HTMLElement)) return;
      offsets = items.map((item) => (item as HTMLElement).offsetTop - first.offsetTop);
      const end = offsets.at(-1) ?? 0;
      position = Math.min(position, end);
      target = Math.min(target, end);
      animate();
    };
    const advance = (delta: number) => {
      const next = Math.max(0, Math.min(offsets.at(-1) ?? 0, target + delta));
      // Release outward momentum once the boundary step is visible; the track can
      // finish its last fraction smoothly while the browser starts scrolling the page.
      const boundaryVisible =
        delta > 0
          ? activeStepRef.current === verificationSteps.length - 1
          : activeStepRef.current === 0;
      if (next === target && (position === target || boundaryVisible)) return false;
      target = next;
      animate();
      return true;
    };
    const handleWheel = (event: WheelEvent) => {
      if (
        window.innerWidth < 1024 ||
        event.ctrlKey ||
        !event.cancelable ||
        !event.deltaY ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      // Let the page reveal the full panel before directing wheel input to its steps.
      const viewTop = window.visualViewport?.offsetTop ?? 0;
      const viewHeight = window.visualViewport?.height ?? window.innerHeight;
      const panel = card.getBoundingClientRect();
      // A tall panel cannot fit: require its entire image/description/list row instead.
      const required =
        panel.height <= viewHeight ? panel : container.parentElement?.getBoundingClientRect();
      if (!required || required.top < viewTop - 1 || required.bottom > viewTop + viewHeight + 1)
        return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? container.clientHeight : 1;
      // At either end, leave the event untouched so browser momentum continues on the page.
      if (advance(event.deltaY * unit)) event.preventDefault();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (!(event.target instanceof Node) || !container.contains(event.target)) return;
      const delta =
        event.key === 'ArrowDown'
          ? 40
          : event.key === 'ArrowUp'
            ? -40
            : event.key === 'PageDown'
              ? container.clientHeight
              : event.key === 'PageUp'
                ? -container.clientHeight
                : 0;
      if (delta && advance(delta)) event.preventDefault();
    };
    selectStepRef.current = (index: number) => {
      target = offsets[index % verificationSteps.length] ?? 0;
      animate();
    };
    const handleFocus = (event: FocusEvent) => {
      const index = Array.from(track.children).findIndex(
        (item) => item === event.target || item.contains(event.target as Node),
      );
      if (index >= 0 && index < verificationSteps.length) selectStepRef.current(index);
    };
    const observer = new ResizeObserver(updateBoundary);
    observer.observe(container);
    for (const item of Array.from(track.children).slice(0, verificationSteps.length))
      observer.observe(item);
    updateBoundary();
    card.addEventListener('wheel', handleWheel, { passive: false });
    card.addEventListener('keydown', handleKey);
    track.addEventListener('focusin', handleFocus);
    motion.addEventListener('change', finish);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      card.removeEventListener('wheel', handleWheel);
      card.removeEventListener('keydown', handleKey);
      track.removeEventListener('focusin', handleFocus);
      motion.removeEventListener('change', finish);
      selectStepRef.current = () => {};
    };
  }, []);

  const scrollToStep = (index: number) => selectStepRef.current(index);

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
    <section className="w-full overflow-hidden bg-white">
      <div className="ml-[20px] overflow-hidden rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[40px] [background:linear-gradient(180deg,#042849_16.18%,#63CCB7_178.86%)] md:ml-[40px] md:px-[36px] md:py-[60px] lg:ml-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[48px] lg:py-[80px] lg:[background:linear-gradient(174.65deg,#042849_59.28%,#63CCB7_206.84%)] xl:ml-[max(60px,calc((100vw-1320px)/2))] xl:px-[60px]">
        <div className="flex w-full max-w-[1320px] flex-col gap-[20px] lg:gap-[32px]">
          {/* Heading */}
          <h3 className="type-h3 text-[#F4F6F9]">
            How Waterlabs <br className="lg:hidden" />
            <span className="text-[#63CCB7]">closes the gap</span>
          </h3>

          {/* Mobile Image Placed Directly Below Title (Matching Figma) */}
          <div className="relative aspect-[353/190] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden">
            <Image
              src="/images/solutions/solutions-claim-submission/how-waterlabs-closes/img_waterlab_closes_the_gap%20(5).png"
              alt="How Waterlabs closes the gap"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 353px"
              className="object-cover object-center"
            />
          </div>

          {/* Subheading */}
          <p className="type-body-xs max-w-[873px] text-[#D7DCE2]">
            Our agents verify each claim against the payer&apos;s current rules before submission
            and track it until receipt is confirmed.
          </p>

          {/* Desktop Layout: Image+Description Left, Tab List Right */}
          <div className="hidden flex-row items-start justify-between gap-[24px] pt-[20px] lg:flex xl:gap-[40px]">
            {/* Left Column: Image + Description */}
            <div className="flex w-full shrink-0 flex-col gap-[24px] lg:w-[44%] lg:max-w-[590px] xl:w-[590px]">
              {/* Image */}
              <div className="relative aspect-[590/287] w-full overflow-hidden rounded-[20px_10px_20px_20px]">
                <Image
                  src="/images/solutions/solutions-claim-submission/how-waterlabs-closes/img_waterlab_closes_the_gap%20(5).png"
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

            {/* Right Column: Tab List */}
            <div
              ref={listRef}
              className="no-scrollbar flex h-[360px] min-w-0 flex-1 flex-col gap-[16px] overflow-clip pt-[8px] pr-[12px] xl:h-[380px] xl:gap-[20px]"
            >
              <div
                className="flex shrink-0 flex-col gap-[16px] xl:gap-[20px]"
                style={{ transform: 'translateY(var(--workflow-offset, 0px))' }}
              >
                {repeatedSteps.map((step) => {
                  const isActive = step.uniqueIndex === activeStep;
                  const distance = step.uniqueIndex - activeStep;
                  const opacity = isActive
                    ? 1
                    : distance > 0
                      ? (stepOpacities[distance] ?? 0.15)
                      : 0.15;

                  return (
                    <button
                      key={step.uniqueIndex}
                      disabled={step.uniqueIndex >= verificationSteps.length}
                      aria-hidden={step.uniqueIndex >= verificationSteps.length}
                      type="button"
                      className={`type-h4 shrink-0 cursor-pointer border-none bg-transparent p-0 text-left whitespace-normal transition-all duration-300 outline-none disabled:pointer-events-none ${
                        isActive ? 'text-[#91C6F2]' : 'text-[#7D8690]'
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
                  <h5 className="type-h5 text-[#91C6F2]">{step.title}</h5>
                  <p className="type-body-xxs mt-[8px] leading-[20px] text-[#D7DCE2]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex flex-row items-center justify-center gap-[6px] pt-[8px]">
              {Array.from({ length: TOTAL_DOTS }).map((_, dotIdx) => {
                const isDotActive = dotIdx === activeDotIndex;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    aria-label={`Go to slide group ${dotIdx + 1}`}
                    onClick={() => scrollToDot(dotIdx)}
                    className={`h-[6px] cursor-pointer rounded-full transition-all duration-300 ${
                      isDotActive
                        ? 'w-[32px] bg-[#63CCB7]'
                        : 'w-[6px] bg-white/30 hover:bg-white/50'
                    }`}
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
