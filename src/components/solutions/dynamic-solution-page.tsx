'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import Navbar from '@/components/common/navbar';
import { CTA } from '@/components/CTA';
import { SolutionPageData } from '@/types/solution';

const DEFAULT_BANNER =
  '/images/solutions/solutions-priorauthorization/hero-section/banner%20(5).png';
const DEFAULT_HERO_IMG =
  '/images/solutions/solutions-priorauthorization/hero-section/img_banner%20(10).png';
const DEFAULT_PROBLEM_IMG =
  '/images/solutions/solutions-priorauthorization/the-problem/img_the_problem%20(3).png';
const DEFAULT_CLOSES_IMG =
  '/images/solutions/solutions-priorauthorization/how-waterlabs-closes/img_waterlab_closes_the_gap.png';
const DEFAULT_HUMAN_IMG =
  '/images/solutions/solutions-priorauthorization/human-in-the-loop/Frame%202147203302%20(3).png';
const DEFAULT_HUMAN_MOBILE =
  '/images/solutions/solutions-priorauthorization/human-in-the-loop/img_human_in_the_loop%20(1).png';
const DEFAULT_PLATFORM_IMG =
  "/images/solutions/solutions-priorauthorization/this-isn't-just-an-eligibility-tool/img_this_isn't_just_an_eligibility_tool%20(1).png";

const STEP_OPACITIES = [1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.15];
const TOTAL_DOTS = 3;
const CLOSES_TOTAL_DOTS = 4;

interface DynamicSolutionPageProps {
  data: SolutionPageData;
}

export default function DynamicSolutionPage({ data }: DynamicSolutionPageProps) {
  const steps = useMemo(() => data.closes.steps || [], [data.closes.steps]);

  // Closes section state
  const [activeStep, setActiveStep] = useState(0);
  const [activeListIndex, setActiveListIndex] = useState(() => (data.closes.steps || []).length);
  const [closesDotIndex, setClosesDotIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef(0);
  const isProgrammaticScroll = useRef(false);

  // Three things mobile state
  const [featuresDotIndex, setFeaturesDotIndex] = useState(0);
  const featuresScrollRef = useRef<HTMLDivElement>(null);

  // Repeat items for seamless, continuous looping scroll (5 sets to allow infinite bi-directional scrolling)
  const repeatedSteps = useMemo(() => {
    if (steps.length === 0) return [];
    const LOOP_COPIES = 5;
    return Array.from({ length: LOOP_COPIES }).flatMap((_, setIndex) =>
      steps.map((step, originalIndex) => ({
        ...step,
        originalIndex,
        uniqueIndex: setIndex * steps.length + originalIndex,
      })),
    );
  }, [steps]);

  // Position at middle set (copy 2) on mount
  useEffect(() => {
    if (steps.length === 0) return;
    const container = listRef.current;
    if (!container) return;

    const items = container.children;
    const N = steps.length;
    let singleCycleHeight = 0;
    if (items.length >= 2 * N) {
      const first = items[0] as HTMLElement;
      const nextSet = items[N] as HTMLElement;
      if (first && nextSet) {
        singleCycleHeight = nextSet.offsetTop - first.offsetTop;
      }
    }
    if (singleCycleHeight <= 0) {
      const first = container.firstElementChild as HTMLElement | null;
      singleCycleHeight = N * (first ? first.getBoundingClientRect().height + 16 : 56);
    }

    isProgrammaticScroll.current = true;
    container.scrollTop = 2 * singleCycleHeight;

    requestAnimationFrame(() => {
      isProgrammaticScroll.current = false;
    });
  }, [steps.length]);

  const scrollToStep = (index: number) => {
    if (!listRef.current || steps.length === 0) return;
    const container = listRef.current;
    const items = container.children;
    if (items[index]) {
      const targetItem = items[index] as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetItem.getBoundingClientRect();
      const targetTop = targetRect.top - containerRect.top + container.scrollTop;

      isProgrammaticScroll.current = true;
      container.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
      const N = steps.length;
      const realStep = index % N;
      activeStepRef.current = realStep;
      setActiveStep(realStep);
      setActiveListIndex(index);
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 400);
    }
  };

  const handleDesktopScroll = () => {
    if (isProgrammaticScroll.current || steps.length === 0) return;
    const container = listRef.current;
    if (!container) return;

    const items = container.children;
    const N = steps.length;
    let singleCycleHeight = 0;
    if (items.length >= 2 * N) {
      const first = items[0] as HTMLElement;
      const nextSet = items[N] as HTMLElement;
      if (first && nextSet) {
        singleCycleHeight = nextSet.offsetTop - first.offsetTop;
      }
    }
    if (singleCycleHeight <= 0) {
      const first = container.firstElementChild as HTMLElement | null;
      singleCycleHeight = N * (first ? first.getBoundingClientRect().height + 16 : 56);
    }

    // Seamless loop: with 5 copies, safe wrap range is between 1.2 * cycleH and 2.8 * cycleH
    // Middle copy (copy 2) starts at 2 * singleCycleHeight
    if (container.scrollTop >= 2.8 * singleCycleHeight) {
      container.scrollTop -= singleCycleHeight;
    } else if (container.scrollTop <= 1.2 * singleCycleHeight) {
      container.scrollTop += singleCycleHeight;
    }

    const containerTop = container.getBoundingClientRect().top;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < items.length; i++) {
      const child = items[i] as HTMLElement;
      if (!child) continue;
      const childRect = child.getBoundingClientRect();
      const distance = Math.abs(childRect.top - containerTop);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const newActiveStep = closestIndex % N;
    if (newActiveStep !== activeStepRef.current) {
      activeStepRef.current = newActiveStep;
      setActiveStep(newActiveStep);
      setActiveListIndex(closestIndex);
    }
  };

  const handleMobileScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    if (scrollLeft <= 15) {
      setClosesDotIndex(0);
      return;
    }
    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 15) {
      setClosesDotIndex(CLOSES_TOTAL_DOTS - 1);
      return;
    }

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const scrollRatio = scrollLeft / maxScroll;
      const dotIndex = Math.min(
        CLOSES_TOTAL_DOTS - 1,
        Math.max(0, Math.round(scrollRatio * (CLOSES_TOTAL_DOTS - 1))),
      );
      setClosesDotIndex(dotIndex);
    }
  };

  const scrollToClosesDot = (dotIndex: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    if (dotIndex === 0) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dotIndex === CLOSES_TOTAL_DOTS - 1) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      const targetScroll = (dotIndex / (CLOSES_TOTAL_DOTS - 1)) * maxScroll;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
    setClosesDotIndex(dotIndex);
  };

  const handleFeaturesScroll = () => {
    const container = featuresScrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    if (scrollLeft <= 15) {
      setFeaturesDotIndex(0);
      return;
    }
    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 15) {
      setFeaturesDotIndex(TOTAL_DOTS - 1);
      return;
    }

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const scrollRatio = scrollLeft / maxScroll;
      const dotIndex = Math.min(
        TOTAL_DOTS - 1,
        Math.max(0, Math.round(scrollRatio * (TOTAL_DOTS - 1))),
      );
      setFeaturesDotIndex(dotIndex);
    }
  };

  const scrollToFeaturesDot = (dotIndex: number) => {
    const container = featuresScrollRef.current;
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
    setFeaturesDotIndex(dotIndex);
  };

  return (
    <div className="flex w-full flex-col">
      {/* ── 01 · HERO SECTION ── */}
      <section className="relative w-full overflow-hidden bg-white">
        <div
          className="relative flex min-h-[683px] w-full flex-col justify-between gap-[20px] overflow-hidden rounded-bl-[60px] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[28px] md:pb-[60px] lg:h-[653px] lg:gap-[32px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]"
          style={{
            background: 'linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)',
          }}
        >
          {/* Background Banner Graphic */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[60px]">
            <Image
              src={data.hero.heroBanner || DEFAULT_BANNER}
              alt="Solutions Gradient Background"
              fill
              priority
              className="object-cover object-right-bottom md:object-bottom"
            />
          </div>

          {/* Top Navbar */}
          <div className="relative z-50 w-full">
            <Navbar />
          </div>

          {/* Desktop: Two-Column Hero Content */}
          <div className="relative z-10 mx-auto hidden w-full max-w-[1320px] flex-row items-center justify-between gap-[20px] lg:flex">
            {/* Left Column: Text Content */}
            <div className="flex w-full flex-col justify-center gap-[20px] pt-[32px] lg:max-w-[650px] lg:flex-1 lg:pt-0">
              {/* Tag / Eyebrow */}
              <div className="flex items-center gap-[8px]">
                <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
                <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                  {data.hero.eyebrow || `Agentic RCM Solutions · ${data.title}`}
                </span>
              </div>

              {/* Headline */}
              <h2 className="type-h1 tracking-[-0.01em] text-white">{data.hero.headline}</h2>

              {/* Description */}
              <p className="type-body-s max-w-[650px] text-[#F4F6F9]">{data.hero.description}</p>

              {/* CTA Button */}
              <div>
                <Link href={data.hero.ctaLink || '/contact-us'}>
                  <CTA variant="dark-bg" as="div">
                    {data.hero.ctaText || 'Get a Demo'}
                  </CTA>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="relative z-[2] aspect-[650/441] w-full overflow-hidden rounded-[20px] lg:max-w-[650px] lg:flex-1">
              <Image
                src={data.hero.heroImage || DEFAULT_HERO_IMG}
                alt={data.hero.heroImageAlt || data.hero.headline}
                fill
                priority
                sizes="(max-width: 1440px) 50vw, 650px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Mobile & Tablet: Stacked Hero Content */}
          <div className="relative z-10 flex w-full flex-col items-start gap-[20px] lg:hidden">
            {/* Tag */}
            <div className="flex items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
              <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                {data.hero.eyebrow || `Agentic RCM Solutions · ${data.title}`}
              </span>
            </div>

            {/* Headline */}
            <h2 className="type-h1 tracking-[-0.01em] text-white">{data.hero.headline}</h2>

            {/* Description */}
            <p className="type-body-s text-[#F4F6F9]">{data.hero.description}</p>

            {/* CTA Button */}
            <div>
              <Link href={data.hero.ctaLink || '/contact-us'}>
                <CTA variant="dark-bg" as="div">
                  {data.hero.ctaText || 'Get a Demo'}
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 · THE PROBLEM SECTION ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #9DA5AD 7.11%, #043857 92.65%)',
        }}
      >
        <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
          <div className="mx-auto max-w-[1320px]">
            {/* Desktop Layout: Image Left + Card Right */}
            <div className="hidden flex-row items-stretch justify-between gap-[20px] lg:flex">
              {/* Left: Large Image */}
              <div className="relative min-h-[456px] w-full min-w-0 overflow-hidden rounded-[30px_10px_30px_30px] lg:max-w-[830px] lg:flex-[1.766]">
                <Image
                  src={data.problem.image || DEFAULT_PROBLEM_IMG}
                  alt={data.problem.imageAlt || data.problem.headline}
                  fill
                  priority
                  sizes="(max-width: 1440px) 60vw, 830px"
                  className="object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(99, 204, 183, 0) 45.31%, rgba(15, 104, 214, 0.4) 106.55%)',
                  }}
                />
              </div>

              {/* Right: Content Card */}
              <div className="relative flex w-full min-w-0 flex-col justify-center overflow-hidden rounded-[20px_10px_20px_20px] bg-[rgba(145,198,242,0.3)] lg:max-w-[470px] lg:flex-1">
                <div
                  className="pointer-events-none absolute rounded-[30px] border border-[rgba(244,246,249,0.2)] bg-[rgba(255,255,255,0.2)]"
                  style={{
                    width: '812px',
                    height: '406px',
                    left: '64px',
                    top: '244px',
                  }}
                />

                <div className="relative z-10 flex flex-col items-start gap-[14px] p-[24px] xl:p-[20px_32px]">
                  {/* Tag */}
                  <div className="flex items-center gap-[8px]">
                    <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                    <span className="type-caption tracking-[0.01em] text-[#2A2A2A]">
                      {data.problem.tag || 'The problem'}
                    </span>
                  </div>

                  {/* Headline */}
                  <h5 className="type-h5 tracking-[-0.01em] text-[#111111]">
                    {data.problem.headline}{' '}
                    {data.problem.headlineHighlight && (
                      <span className="text-[#0F68D6]">{data.problem.headlineHighlight}</span>
                    )}
                  </h5>

                  {/* Description Paragraphs */}
                  <div className="flex flex-col gap-[14px]">
                    <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                      {data.problem.description}
                    </p>
                    {data.problem.descriptionSecondary && (
                      <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                        {data.problem.descriptionSecondary}
                      </p>
                    )}
                    {data.problem.quoteText && (
                      <div className="flex flex-col gap-[4px] border-t border-[rgba(4,40,73,0.12)] pt-[4px]">
                        <p className="type-body-xxs font-medium tracking-[0.01em] text-[#111111]">
                          &ldquo;{data.problem.quoteText}&rdquo;
                        </p>
                        {data.problem.quoteAuthor && (
                          <span className="type-caption font-medium text-[#0F68D6]">
                            &mdash; {data.problem.quoteAuthor}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Layout: Single Card */}
            <div className="flex justify-center lg:hidden">
              <div className="relative flex w-full max-w-[362px] flex-col overflow-hidden rounded-[20px_10px_20px_20px] bg-[rgba(145,198,242,0.3)] md:max-w-[460px]">
                <div
                  className="pointer-events-none absolute rounded-[30px] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)]"
                  style={{
                    width: '364px',
                    height: '182px',
                    right: '-40px',
                    bottom: '-19px',
                  }}
                />

                <div className="relative z-10 flex flex-col items-start gap-[20px] p-[12px]">
                  {/* Tag */}
                  <div className="flex items-center gap-[4px]">
                    <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#0F68D6]" />
                    <span className="type-caption tracking-[0.01em] text-[#2A2A2A]">
                      {data.problem.tag || 'The problem'}
                    </span>
                  </div>

                  {/* Headline */}
                  <h5 className="type-h5 tracking-[-0.01em] text-[#111111]">
                    {data.problem.headline}{' '}
                    {data.problem.headlineHighlight && (
                      <span className="text-[#0F68D6]">{data.problem.headlineHighlight}</span>
                    )}
                  </h5>

                  {/* Description Paragraphs */}
                  <div className="flex flex-col gap-[14px]">
                    <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                      {data.problem.description}
                    </p>
                    {data.problem.descriptionSecondary && (
                      <p className="type-body-xxs tracking-[0.01em] text-[#2A2A2A]">
                        {data.problem.descriptionSecondary}
                      </p>
                    )}
                    {data.problem.quoteText && (
                      <div className="flex flex-col gap-[4px] border-t border-[rgba(4,40,73,0.12)] pt-[4px]">
                        <p className="type-body-xxs font-medium tracking-[0.01em] text-[#111111]">
                          &ldquo;{data.problem.quoteText}&rdquo;
                        </p>
                        {data.problem.quoteAuthor && (
                          <span className="type-caption font-medium text-[#0F68D6]">
                            &mdash; {data.problem.quoteAuthor}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · HOW WATERLABS CLOSES ── */}
      <section className="w-full overflow-hidden bg-white">
        <div className="ml-[20px] overflow-hidden rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[40px] [background:linear-gradient(180deg,#042849_16.18%,#63CCB7_178.86%)] md:ml-[40px] md:px-[36px] md:py-[60px] lg:ml-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[48px] lg:py-[80px] lg:[background:linear-gradient(174.65deg,#042849_59.28%,#63CCB7_206.84%)] xl:ml-[max(60px,calc((100vw-1320px)/2))] xl:px-[60px]">
          <div className="flex w-full max-w-[1320px] flex-col gap-[20px] lg:gap-[32px]">
            {/* Heading */}
            <h3 className="type-h3 text-[#F4F6F9]">
              {data.closes.sectionTitle || 'How Waterlabs'} <br className="lg:hidden" />
              <span className="text-[#63CCB7]">
                {data.closes.sectionTitleHighlight || 'closes the gap'}
              </span>
            </h3>

            {/* Subheading */}
            {data.closes.subtitle && (
              <p className="type-body-xs max-w-[873px] text-[#D7DCE2]">{data.closes.subtitle}</p>
            )}

            {/* Desktop Layout: Image+Description Left, Step List Right */}
            {steps.length > 0 && (
              <div className="hidden flex-row items-start justify-between gap-[24px] pt-[20px] lg:flex xl:gap-[40px]">
                {/* Left Column: Image + Description */}
                <div className="flex w-full shrink-0 flex-col gap-[24px] lg:w-[44%] lg:max-w-[590px] xl:w-[590px]">
                  <div className="relative aspect-[590/287] w-full overflow-hidden rounded-[20px_10px_20px_20px]">
                    <Image
                      src={data.closes.image || DEFAULT_CLOSES_IMG}
                      alt={steps[activeStep]?.title || 'How Waterlabs closes the gap'}
                      fill
                      priority
                      sizes="(max-width: 1440px) 44vw, 590px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Description for active step */}
                  <p className="type-body-xs min-h-[48px] text-[#D7DCE2] transition-opacity duration-300">
                    {steps[activeStep]?.description}
                  </p>
                </div>

                {/* Right Column: Step List */}
                <div
                  ref={listRef}
                  onScroll={handleDesktopScroll}
                  className="no-scrollbar flex h-[360px] min-w-0 flex-1 flex-col gap-[16px] overflow-y-auto pt-[8px] pr-[12px] xl:h-[380px] xl:gap-[20px]"
                >
                  {repeatedSteps.map((step) => {
                    const diff = Math.abs(step.uniqueIndex - activeListIndex);
                    const opacity = diff < STEP_OPACITIES.length ? STEP_OPACITIES[diff] : 0.15;
                    const isActive = step.uniqueIndex === activeListIndex;

                    return (
                      <div
                        key={step.uniqueIndex}
                        style={{ opacity }}
                        onClick={() => scrollToStep(step.uniqueIndex)}
                        className="flex cursor-pointer items-center py-[4px] transition-opacity duration-300"
                      >
                        <span
                          className={`type-h4 tracking-[-0.01em] transition-colors duration-300 ${
                            isActive ? 'text-[#63CCB7]' : 'text-white'
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile / Tablet Layout */}
            {steps.length > 0 && (
              <div className="flex flex-col gap-[16px] pt-[8px] lg:hidden">
                <div
                  ref={scrollRef}
                  onScroll={handleMobileScroll}
                  className="no-scrollbar flex w-full snap-x snap-mandatory flex-row gap-[12px] overflow-x-auto scroll-smooth pr-[20px]"
                >
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex h-[314px] w-[342px] max-w-[calc(100vw-60px)] shrink-0 snap-start flex-col items-start overflow-hidden rounded-[20px_10px_20px_20px] bg-[rgba(17,17,17,0.3)]"
                    >
                      {/* Image container */}
                      <div className="relative h-[166px] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px]">
                        <Image
                          src={step.image || data.closes.image || DEFAULT_CLOSES_IMG}
                          alt={step.title}
                          fill
                          sizes="(max-width: 640px) 342px, 342px"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Content container */}
                      <div className="flex w-full flex-1 flex-col items-start justify-start gap-[12px] p-[12px]">
                        <h4 className="type-h5 line-clamp-1 tracking-[-0.01em] text-[#91C6F2]">
                          {step.title}
                        </h4>
                        <p className="type-body-xs line-clamp-3 leading-[24px] text-[#D7DCE2]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Carousel Indicators */}
                <div className="flex flex-row items-center gap-[5px] pt-[4px]">
                  {Array.from({ length: CLOSES_TOTAL_DOTS }).map((_, dotIdx) => {
                    const isActive = closesDotIndex === dotIdx;
                    const isAdjacent = Math.abs(closesDotIndex - dotIdx) === 1;
                    const widthClass = isActive
                      ? 'w-[32px] bg-white'
                      : isAdjacent
                        ? 'w-[16px] bg-white/20'
                        : 'w-[6px] bg-white/20';

                    return (
                      <button
                        key={dotIdx}
                        type="button"
                        aria-label={`Go to slide group ${dotIdx + 1}`}
                        onClick={() => scrollToClosesDot(dotIdx)}
                        className={`h-[6px] cursor-pointer rounded-full transition-all duration-300 ${widthClass}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 04 · STATS & HUMAN IN THE LOOP ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180.75deg, #1C5265 -2.97%, #FFFFFF 101.15%)',
        }}
      >
        <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-[40px] lg:gap-[60px]">
            {/* ── OUR STATS (Optional if stats are present) ── */}
            {data.statsAndHuman.stats && data.statsAndHuman.stats.length > 0 && (
              <div className="flex flex-col gap-[20px] lg:gap-[32px]">
                <h3 className="type-h3 text-electric-blue">
                  {data.statsAndHuman.statsTitle || 'Our Stats'}
                </h3>

                <div className="bg-ghost-white flex w-full flex-col gap-[24px] rounded-[20px] p-[20px] md:p-[32px] lg:flex-row lg:gap-[40px] lg:p-[40px]">
                  {data.statsAndHuman.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex flex-1 flex-col gap-[8px] lg:gap-[12px]">
                      <h3 className="type-h3 text-black">{stat.value}</h3>
                      <p className="type-body-xs text-charcoal">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── HUMAN IN THE LOOP ── */}
            <div className="flex flex-col items-center justify-between gap-[24px] lg:flex-row lg:gap-[32px]">
              {/* Left: Text Content */}
              <div className="flex w-full flex-col justify-center gap-[16px] lg:max-w-[644px] lg:flex-1 lg:gap-[20px]">
                <h3 className="type-h3 text-[#111111]">
                  {data.statsAndHuman.humanHeadingHighlight && (
                    <span className="text-[#0F68D6]">
                      {data.statsAndHuman.humanHeadingHighlight}{' '}
                    </span>
                  )}
                  {data.statsAndHuman.humanHeading
                    .replace(data.statsAndHuman.humanHeadingHighlight || '', '')
                    .trim()}
                </h3>

                {data.statsAndHuman.humanParagraphs.map((para, pIdx) => (
                  <p key={pIdx} className="type-body-xs max-w-[644px] text-[#111111]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Right: Image */}
              <div className="w-full lg:max-w-[644px] lg:flex-1">
                {/* Desktop Image */}
                <div className="relative hidden aspect-[644/309] w-full overflow-hidden rounded-[30px_10px_30px_30px] lg:block">
                  <Image
                    src={data.statsAndHuman.humanImage || DEFAULT_HUMAN_IMG}
                    alt={data.statsAndHuman.humanImageAlt || data.statsAndHuman.humanHeading}
                    fill
                    priority
                    sizes="(max-width: 1440px) 50vw, 644px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Mobile / Tablet Image */}
                <div className="relative block aspect-[362/156] w-full overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden">
                  <Image
                    src={
                      data.statsAndHuman.humanImageMobile ||
                      data.statsAndHuman.humanImage ||
                      DEFAULT_HUMAN_MOBILE
                    }
                    alt={data.statsAndHuman.humanImageAlt || data.statsAndHuman.humanHeading}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 644px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · PLATFORM (HIMER AI OS) & THE THREE THINGS ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #0F68D6 100%)',
        }}
      >
        <div className="bg-ghost-white w-full rounded-tl-[30px] rounded-bl-[30px] px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:py-[60px]">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-[32px] lg:gap-[60px]">
            {/* ── GRADIENT CARD: HIMER AI OS ── */}

            {/* Desktop Layout */}
            <div
              className="hidden w-full flex-row items-center overflow-hidden rounded-[20px] lg:flex"
              style={{
                background: 'linear-gradient(116.88deg, #0F68D6 49.69%, #AE87E4 69.22%)',
              }}
            >
              {/* Left Column: Text Content */}
              <div className="flex w-full flex-col items-start justify-center gap-[12px] p-[24px] lg:w-[45%] lg:p-[32px] xl:w-1/2 xl:gap-[20px] xl:p-[60px]">
                <div className="flex items-center gap-[8px]">
                  <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
                  <span className="type-body-xxs tracking-[0.01em] text-[#F4F6F9]">
                    {data.platformAndFeatures.platformEyebrow ||
                      `This isn't just a ${data.title.toLowerCase()} tool`}
                  </span>
                </div>

                <h3 className="type-h3 tracking-[-0.01em] text-white">
                  {data.platformAndFeatures.platformHeading}
                </h3>

                <p className="type-body-xs text-[#F4F6F9]">
                  {data.platformAndFeatures.platformDescription}
                </p>

                <Link href={data.platformAndFeatures.platformCtaLink || '/product/himer'}>
                  <CTA variant="dark-bg">
                    {data.platformAndFeatures.platformCtaText || 'Explore HIMER AI OS'}
                  </CTA>
                </Link>
              </div>

              {/* Right Column: Image */}
              <div className="flex w-full items-center justify-end self-stretch overflow-hidden lg:w-[55%] xl:w-1/2">
                <div className="relative h-full min-h-[380px] w-full xl:min-h-[500px]">
                  <Image
                    src={data.platformAndFeatures.platformImage || DEFAULT_PLATFORM_IMG}
                    alt="HIMER AI OS platform overview"
                    fill
                    priority
                    sizes="(max-width: 1440px) 55vw, 653px"
                    className="rounded-r-[20px] object-cover object-[48%_center]"
                  />
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Layout */}
            <div
              className="flex w-full flex-col overflow-hidden rounded-[20px] lg:hidden"
              style={{
                background: 'linear-gradient(116.88deg, #0F68D6 49.69%, #AE87E4 69.22%)',
              }}
            >
              <div className="w-full overflow-hidden rounded-[20px] md:relative md:h-[380px]">
                <Image
                  src={
                    data.platformAndFeatures.platformImageMobile ||
                    data.platformAndFeatures.platformImage ||
                    DEFAULT_PLATFORM_IMG
                  }
                  alt="HIMER AI OS platform overview"
                  width={724}
                  height={596}
                  priority
                  className="h-auto w-full rounded-[20px] object-cover object-center md:h-full"
                />
              </div>

              <div className="flex flex-col items-start gap-[14px] p-[24px] sm:p-[32px]">
                <div className="flex items-center gap-[4px]">
                  <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
                  <span className="type-body-xxs tracking-[0.01em] text-[#F4F6F9]">
                    {data.platformAndFeatures.platformEyebrow ||
                      `This isn't just a ${data.title.toLowerCase()} tool`}
                  </span>
                </div>

                <h3 className="type-h3 tracking-[-0.01em] text-white">
                  {data.platformAndFeatures.platformHeading}
                </h3>

                <p className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                  {data.platformAndFeatures.platformDescription}
                </p>

                <Link href={data.platformAndFeatures.platformCtaLink || '/product/himer'}>
                  <CTA variant="dark-bg">
                    {data.platformAndFeatures.platformCtaText || 'Explore HIMER AI OS'}
                  </CTA>
                </Link>
              </div>
            </div>

            {/* ── THREE THINGS SECTION ── */}
            {data.platformAndFeatures.threeThingsCards &&
              data.platformAndFeatures.threeThingsCards.length > 0 && (
                <div className="flex flex-col gap-[20px] lg:gap-[32px]">
                  <h3 className="type-h3 text-black">
                    {data.platformAndFeatures.threeThingsHeadingHighlight && (
                      <span className="text-electric-blue">
                        {data.platformAndFeatures.threeThingsHeadingHighlight}{' '}
                      </span>
                    )}
                    <br className="hidden lg:block" />
                    {data.platformAndFeatures.threeThingsHeading
                      ?.replace(data.platformAndFeatures.threeThingsHeadingHighlight || '', '')
                      .trim()}
                  </h3>

                  {/* Desktop: 3 cards */}
                  <div className="hidden flex-row gap-[20px] lg:flex">
                    {data.platformAndFeatures.threeThingsCards.map((card, idx) => (
                      <div
                        key={idx}
                        className="flex min-h-[320px] flex-1 flex-col gap-[24px] rounded-[16px] bg-white p-[32px]"
                      >
                        {card.icon ? (
                          <div className="relative h-[34px] w-[34px] shrink-0">
                            <Image
                              src={card.icon}
                              alt={card.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="bg-electric-blue/10 text-electric-blue flex h-[34px] w-[34px] items-center justify-center rounded-full font-bold">
                            {idx + 1}
                          </div>
                        )}
                        <div className="flex flex-col gap-[12px]">
                          <h5 className="type-h5 text-black">{card.title}</h5>
                          <p className="type-body-xxs text-charcoal">{card.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile / Tablet: Swipeable cards */}
                  <div className="flex flex-col gap-[16px] lg:hidden">
                    <div
                      ref={featuresScrollRef}
                      onScroll={handleFeaturesScroll}
                      className="no-scrollbar flex w-full snap-x snap-mandatory flex-row gap-[16px] overflow-x-auto scroll-smooth pr-[20px]"
                    >
                      {data.platformAndFeatures.threeThingsCards.map((card, idx) => (
                        <div
                          key={idx}
                          className="flex w-[280px] shrink-0 snap-start flex-col gap-[16px] rounded-[16px] bg-white p-[24px] sm:w-[320px]"
                        >
                          {card.icon ? (
                            <div className="relative h-[34px] w-[34px] shrink-0">
                              <Image
                                src={card.icon}
                                alt={card.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="bg-electric-blue/10 text-electric-blue flex h-[34px] w-[34px] items-center justify-center rounded-full font-bold">
                              {idx + 1}
                            </div>
                          )}
                          <div className="flex flex-col gap-[8px]">
                            <h5 className="type-body-s font-semibold text-black">{card.title}</h5>
                            <p className="type-body-xxs text-charcoal">{card.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Dots */}
                    <div className="flex items-center justify-center gap-[8px] pt-[8px]">
                      {Array.from({ length: TOTAL_DOTS }).map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          aria-label={`Go to features card ${dotIdx + 1}`}
                          onClick={() => scrollToFeaturesDot(dotIdx)}
                          className={`h-[8px] cursor-pointer rounded-full transition-all duration-300 ${
                            featuresDotIndex === dotIdx
                              ? 'bg-electric-blue w-[24px]'
                              : 'bg-electric-blue/30 w-[8px]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* ── 06 · CTA SECTION ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #111111 100%)',
        }}
      >
        <div className="bg-electric-blue w-full rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:px-[40px] md:py-[50px] lg:rounded-bl-[30px] lg:px-[60px] lg:py-[60px]">
          <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-[24px] lg:flex-row lg:items-center lg:gap-[20px]">
            {/* Heading */}
            <h2 className="type-h2 max-w-[1148px] text-white">{data.cta.headline}</h2>

            {/* CTA Button */}
            <div className="shrink-0">
              <Link href={data.cta.buttonLink || '/contact-us'}>
                <CTA variant="dark-bg">{data.cta.buttonText || 'Get a Demo'}</CTA>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
