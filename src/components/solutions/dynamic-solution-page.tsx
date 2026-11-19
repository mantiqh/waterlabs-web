'use client';

import { gsap } from 'gsap/dist/gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Navbar from '@/components/common/navbar';
import PageMotion from '@/components/common/page-motion';
import { CTA } from '@/components/CTA';
import { mountScrollScene, type SceneMode,sceneScrollPosition } from '@/lib/motion/scroll-scene';
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
const DEFAULT_PLATFORM_MOBILE_IMG =
  "/images/solutions/solutions-eligibility/this-isn't-just-an-eligibility-tool/img_this_isn't_just_an_eligibility_tool%20(2).png";

const STEP_OPACITIES = [1, 0.85, 0.7, 0.55, 0.4, 0.25, 0.15];
const TOTAL_DOTS = 3;
const CLOSES_TOTAL_DOTS = 4;

const HERO_GRADIENTS: Record<string, string> = {
  'eligibility-and-benefits-verification':
    'linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)',
  'prior-authorization': 'linear-gradient(180deg, #0F68D6 41.31%, #AE87E4 108.85%)',
  'charge-capture-and-coding': 'linear-gradient(180deg, #0F68D6 41.31%, #A9D154 108.85%)',
  'payment-posting': 'linear-gradient(180deg, #0F68D6 41.31%, #63CCB7 108.85%)',
  'denial-management': 'linear-gradient(180deg, #0F68D6 41.31%, #F3838C 108.85%)',
  'ar-follow-up': 'linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)',
  'claim-submission-and-scrubbing': 'linear-gradient(180deg, #0F68D6 41.31%, #A9D154 108.85%)',
  'patient-estimates': 'linear-gradient(180deg, #0F68D6 41.31%, #F3838C 108.85%)',
  // Common aliases
  eligibility: 'linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)',
  'prior-auth': 'linear-gradient(180deg, #0F68D6 41.31%, #AE87E4 108.85%)',
  coding: 'linear-gradient(180deg, #0F68D6 41.31%, #A9D154 108.85%)',
  'claim-submission': 'linear-gradient(180deg, #0F68D6 41.31%, #A9D154 108.85%)',
  denials: 'linear-gradient(180deg, #0F68D6 41.31%, #F3838C 108.85%)',
};

const HERO_BANNERS: Record<string, string> = {
  'eligibility-and-benefits-verification':
    '/images/solutions/solutions-eligibility/hero-section/img_banner_bg%20(3).png',
  'prior-authorization':
    '/images/solutions/solutions-priorauthorization/hero-section/banner%20(5).png',
  'charge-capture-and-coding':
    '/images/solutions/solutions-charge-capture-&-coding/hero-section/img_banner_bg%20(5).png',
  'payment-posting':
    '/images/solutions/solutions-payment-posting/hero-section/img_banner_bg%20(6).png',
  'denial-management':
    '/images/solutions/solutions-denialmanagement/hero-section/img_banner_bg%20(7).png',
  'ar-follow-up': '/images/solutions/solutions-AR-follow-up/hero-section/img_banner_bg%20(8).png',
  'claim-submission-and-scrubbing':
    '/images/solutions/solutions-claim-submission/hero-section/img_banner_bg%20(9).png',
  'patient-estimates':
    '/images/solutions/solutions-patient-estimates/hero-section/img_banner_bg%20(10).png',
  // Common aliases
  eligibility: '/images/solutions/solutions-eligibility/hero-section/img_banner_bg%20(3).png',
  'prior-auth': '/images/solutions/solutions-priorauthorization/hero-section/banner%20(5).png',
  coding:
    '/images/solutions/solutions-charge-capture-&-coding/hero-section/img_banner_bg%20(5).png',
  'claim-submission':
    '/images/solutions/solutions-claim-submission/hero-section/img_banner_bg%20(9).png',
  denials: '/images/solutions/solutions-denialmanagement/hero-section/img_banner_bg%20(7).png',
};

const HERO_IMAGES: Record<string, string> = {
  'eligibility-and-benefits-verification':
    '/images/solutions/solutions-eligibility/hero-section/img_banner%20(9).png',
  'prior-authorization':
    '/images/solutions/solutions-priorauthorization/hero-section/img_banner%20(10).png',
  'charge-capture-and-coding':
    '/images/solutions/solutions-charge-capture-&-coding/hero-section/img_banner%20(11).png',
  'payment-posting':
    '/images/solutions/solutions-payment-posting/hero-section/img_banner%20(12).png',
  'denial-management':
    '/images/solutions/solutions-denialmanagement/hero-section/img_banner%20(13).png',
  'ar-follow-up': '/images/solutions/solutions-AR-follow-up/hero-section/img_banner%20(14).png',
  'claim-submission-and-scrubbing':
    '/images/solutions/solutions-claim-submission/hero-section/img_banner%20(15).png',
  'patient-estimates':
    '/images/solutions/solutions-patient-estimates/hero-section/img_banner%20(16).png',
  // Common aliases
  eligibility: '/images/solutions/solutions-eligibility/hero-section/img_banner%20(9).png',
  'prior-auth': '/images/solutions/solutions-priorauthorization/hero-section/img_banner%20(10).png',
  coding: '/images/solutions/solutions-charge-capture-&-coding/hero-section/img_banner%20(11).png',
  'claim-submission':
    '/images/solutions/solutions-claim-submission/hero-section/img_banner%20(15).png',
  denials: '/images/solutions/solutions-denialmanagement/hero-section/img_banner%20(13).png',
};

interface DynamicSolutionPageProps {
  data: SolutionPageData;
}

export default function DynamicSolutionPage({ data }: DynamicSolutionPageProps) {
  const rawSteps = data.closes?.steps;
  const steps = useMemo(() => rawSteps || [], [rawSteps]);

  // Repeated labels fill the visual list; navigation stops at the last real step.
  const displaySteps = useMemo(
    () =>
      Array.from({ length: 3 }).flatMap((_, copy) =>
        steps.map((step, index) => ({
          ...step,
          originalIndex: index,
          uniqueIndex: copy * steps.length + index,
        })),
      ),
    [steps],
  );

  // Closes section state & refs
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [sceneMode, setSceneMode] = useState<SceneMode>('pending');
  const [closesDotIndex, setClosesDotIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);
  const posRef = useRef({ pos: 0 });

  // Three things mobile state
  const [featuresDotIndex, setFeaturesDotIndex] = useState(0);
  const featuresScrollRef = useRef<HTMLDivElement>(null);

  const heroGradient =
    data.hero.heroGradient ||
    HERO_GRADIENTS[data.slug] ||
    'linear-gradient(180deg, #0F68D6 41.31%, #B8B1A5 108.85%)';

  const heroBanner = data.hero.heroBanner || HERO_BANNERS[data.slug] || DEFAULT_BANNER;

  const heroImage = data.hero.heroImage || HERO_IMAGES[data.slug] || DEFAULT_HERO_IMG;

  const problemCornerColors: Record<string, string> = {
    'denial-management': '#D18097',
    'patient-estimates': '#D18097',
    'charge-capture-and-coding': '#91C066',
    'claim-submission-and-scrubbing': '#91C066',
    'payment-posting': '#55BABC',
  };

  const updateListOffset = useCallback(
    (index: number) => {
      const container = listRef.current;
      const track = container?.firstElementChild;
      if (!container || !(track instanceof HTMLElement)) return;
      const items = Array.from(track.children).slice(0, steps.length);
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
    },
    [steps.length],
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    const root =
      sectionRef.current.closest<HTMLElement>('[data-solution-sequence]') ?? sectionRef.current;
    return mountScrollScene(root, {
      count: steps.length,
      onIndex: (index) => {
        activeStepRef.current = index;
        setActiveStep(index);
        updateListOffset(index);
      },
      onMode: setSceneMode,
      kind: 'comparison',
      allowMobile: false,
    });
  }, [steps.length, updateListOffset]);

  const scrollToStep = useCallback(
    (index: number) => {
      const realIdx = index % steps.length;
      activeStepRef.current = realIdx;
      setActiveStep(realIdx);
      updateListOffset(realIdx);
      if (!sectionRef.current) return;
      const root =
        sectionRef.current.closest<HTMLElement>('[data-solution-sequence]') ?? sectionRef.current;
      if (sceneMode === 'pinned') {
        const targetProgress = (realIdx + 0.5) / steps.length;
        const targetScrollY = sceneScrollPosition(root, targetProgress);
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });
      }
    },
    [sceneMode, steps.length, updateListOffset],
  );

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const handleKey = (event: KeyboardEvent) => {
      if (!(event.target instanceof Node) || !container.contains(event.target)) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const next = Math.min(steps.length - 1, activeStepRef.current + 1);
        scrollToStep(next);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = Math.max(0, activeStepRef.current - 1);
        scrollToStep(prev);
      }
    };
    container.addEventListener('keydown', handleKey);
    return () => container.removeEventListener('keydown', handleKey);
  }, [scrollToStep, steps.length]);

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
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />

      {/* ── 01 · HERO SECTION ── */}
      <section data-motion-section="hero" className="relative w-full overflow-hidden bg-white">
        <div
          className="relative flex min-h-[683px] w-full flex-col justify-between gap-[20px] overflow-hidden rounded-bl-[60px] px-[20px] pt-[20px] pb-[40px] md:px-[40px] md:pt-[28px] md:pb-[60px] lg:h-[653px] lg:gap-[32px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]"
          style={{
            background: heroGradient,
          }}
        >
          {/* Background Banner Graphic */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-bl-[60px]">
            <Image
              src={heroBanner}
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
          <div
            data-motion-group
            data-motion-trigger="section"
            data-motion-start="top 100%"
            className="relative z-10 mx-auto hidden w-full max-w-[1320px] flex-row items-center justify-between gap-[20px] lg:flex"
          >
            {/* Left Column: Text Content */}
            <div className="flex w-full flex-col justify-center gap-[20px] pt-[32px] lg:max-w-[650px] lg:flex-1 lg:pt-0">
              {/* Tag / Eyebrow */}
              <div className="flex items-center gap-[8px]">
                <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
                <span
                  data-motion-reveal="scramble"
                  data-motion-start="top 100%"
                  className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]"
                >
                  {data.hero.eyebrow || `Agentic RCM Solutions · ${data.title}`}
                </span>
              </div>

              {/* Headline */}
              <h2
                data-motion-reveal="lines"
                data-motion-start="top 100%"
                className="type-h1 tracking-[-0.01em] text-white"
              >
                {data.hero.headline}
              </h2>

              {/* Description */}
              <p
                data-motion-reveal="blur"
                data-motion-start="top 100%"
                className="type-body-s max-w-[650px] text-[#F4F6F9]"
              >
                {data.hero.description}
              </p>

              {/* CTA Button */}
              <div>
                <Link href={data.hero.ctaLink || '/contact-us'}>
                  <CTA data-motion-reveal="fade" data-motion-magnetic variant="dark-bg" as="div">
                    {data.hero.ctaText || 'Get a Demo'}
                  </CTA>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div
              data-motion-reveal="image"
              className="relative z-[2] aspect-[650/441] w-full overflow-hidden rounded-[20px] lg:max-w-[650px] lg:flex-1"
            >
              <Image
                data-motion-parallax
                src={heroImage}
                alt={data.hero.heroImageAlt || data.hero.headline}
                fill
                priority
                sizes="(max-width: 1440px) 50vw, 650px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Mobile & Tablet: Stacked Hero Content */}
          <div
            data-motion-group
            data-motion-trigger="section"
            data-motion-start="top 100%"
            className="relative z-10 flex w-full flex-col items-start gap-[20px] lg:hidden"
          >
            {/* Tag */}
            <div className="flex items-center gap-[8px]">
              <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
              <span
                data-motion-reveal="scramble"
                data-motion-start="top 100%"
                className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]"
              >
                {data.hero.eyebrow || `Agentic RCM Solutions · ${data.title}`}
              </span>
            </div>

            {/* Headline */}
            <h2
              data-motion-reveal="lines"
              data-motion-start="top 100%"
              className="type-h1 tracking-[-0.01em] text-white"
            >
              {data.hero.headline}
            </h2>

            {/* Description */}
            <p
              data-motion-reveal="blur"
              data-motion-start="top 100%"
              className="type-body-s text-[#F4F6F9]"
            >
              {data.hero.description}
            </p>

            {/* CTA Button */}
            <div>
              <Link href={data.hero.ctaLink || '/contact-us'}>
                <CTA data-motion-reveal="fade" data-motion-magnetic variant="dark-bg" as="div">
                  {data.hero.ctaText || 'Get a Demo'}
                </CTA>
              </Link>
            </div>

            {/* Mobile Hero Image */}
            <div
              data-motion-reveal="image"
              className="relative z-[2] aspect-[362/246] w-full overflow-hidden rounded-[20px]"
            >
              <Image
                data-motion-parallax
                src={data.hero.heroImageMobile || data.hero.heroImage || heroImage}
                alt={data.hero.heroImageAlt || data.hero.headline}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Keep adjacent surfaces together while the comparison holds its position. */}
      <div data-solution-sequence data-motion-scene="comparison" data-scene-mode="pending">
        <div data-scene-sticky>
          {/* ── 02 · THE PROBLEM SECTION ── */}
      <section
        data-motion-section
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${problemCornerColors[data.slug] || (data.slug === 'prior-authorization' || data.slug === 'prior-auth' ? '#9782E2' : '#9DA5AD')} ${problemCornerColors[data.slug] ? '60px' : '7.11%'}, #042848 calc(100% - 60px))`,
        }}
      >
        <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
          <div className="mx-auto max-w-[1320px]">
            {/* Desktop Layout: Image Left + Card Right */}
            <div
              data-motion-group
              data-motion-trigger="section"
              className="hidden flex-row items-stretch justify-between gap-[20px] lg:flex"
            >
              {/* Left: Large Image */}
              <div
                data-motion-reveal="image"
                className="relative min-h-[456px] w-full min-w-0 overflow-hidden rounded-[30px_10px_30px_30px] lg:max-w-[830px] lg:flex-[1.766]"
              >
                <Image
                  data-motion-parallax
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
                    <span
                      data-motion-reveal="scramble"
                      className="type-caption tracking-[0.01em] text-[#2A2A2A]"
                    >
                      {data.problem.tag || 'The problem'}
                    </span>
                  </div>

                  {/* Headline */}
                  <h5
                    data-motion-reveal="lines"
                    className="type-h5 tracking-[-0.01em] text-[#111111]"
                  >
                    {data.problem.headline}{' '}
                    {data.problem.headlineHighlight && (
                      <span className="text-[#0F68D6]">{data.problem.headlineHighlight}</span>
                    )}
                  </h5>

                  {/* Description Paragraphs */}
                  <div data-motion-reveal="blur" className="flex flex-col gap-[14px]">
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
            <div
              data-motion-group
              data-motion-trigger="section"
              className="flex flex-col items-center justify-center lg:hidden"
            >
              {/* Mobile Problem Image above card */}
              {(data.problem.imageMobile || data.problem.image) && (
                <div
                  data-motion-reveal="image"
                  className="relative mb-[16px] aspect-[338/186] w-full max-w-[362px] overflow-hidden rounded-[20px] md:max-w-[460px]"
                >
                  <Image
                    data-motion-parallax
                    src={data.problem.imageMobile || data.problem.image || DEFAULT_PROBLEM_IMG}
                    alt={data.problem.imageAlt || data.problem.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 362px"
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
              )}

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
                    <span
                      data-motion-reveal="scramble"
                      className="type-caption tracking-[0.01em] text-[#2A2A2A]"
                    >
                      {data.problem.tag || 'The problem'}
                    </span>
                  </div>

                  {/* Headline */}
                  <h5
                    data-motion-reveal="lines"
                    className="type-h5 tracking-[-0.01em] text-[#111111]"
                  >
                    {data.problem.headline}{' '}
                    {data.problem.headlineHighlight && (
                      <span className="text-[#0F68D6]">{data.problem.headlineHighlight}</span>
                    )}
                  </h5>

                  {/* Description Paragraphs */}
                  <div data-motion-reveal="blur" className="flex flex-col gap-[14px]">
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
              {data.closes.sectionTitle || 'How Waterlabs'}{' '}
              <span className="text-[#63CCB7]">
                {data.closes.sectionTitleHighlight || 'closes the gap'}
              </span>
            </h3>

            {/* Mobile Image Placed Directly Below Title (Matching Figma) */}
            <div
              data-motion-reveal="image"
              data-motion-at="0.65"
              className="relative aspect-[353/190] w-full shrink-0 overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden"
            >
              <Image
                data-motion-parallax
                src={data.closes.image || DEFAULT_CLOSES_IMG}
                alt={data.closes.sectionTitle || 'How Waterlabs closes the gap'}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 353px"
                className="object-cover object-center"
              />
            </div>

            {/* Subheading */}
            {data.closes.subtitle && (
              <p
                data-motion-reveal="blur"
                data-motion-at="0.65"
                className="type-body-xs max-w-[873px] text-[#D7DCE2]"
              >
                {data.closes.subtitle}
              </p>
            )}

            {/* Desktop Layout: Image+Description Left, Step List Right */}
            {steps.length > 0 && (
              <div className="hidden flex-row items-start justify-between gap-[24px] pt-[20px] lg:flex xl:gap-[40px]">
                {/* Left Column: Image + Description */}
                <div className="flex w-full shrink-0 flex-col gap-[24px] lg:w-[44%] lg:max-w-[590px] xl:w-[590px]">
                  <div
                    data-solution-closes-image
                    data-motion-reveal="image"
                    data-motion-at="0.65"
                    className="relative aspect-[590/287] w-full overflow-hidden rounded-[20px_10px_20px_20px]"
                  >
                    <Image
                      data-motion-parallax
                      src={steps[activeStep]?.image || data.closes.image || DEFAULT_CLOSES_IMG}
                      alt={steps[activeStep]?.title || 'How Waterlabs closes the gap'}
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
                    {steps.map((step, index) => (
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

                {/* Right Column: Scrollable Step List */}
                <div
                  ref={listRef}
                  data-solution-closes-list
                  data-motion-reveal="fade"
                  data-motion-at="0.7"
                  className="no-scrollbar flex h-[360px] min-w-0 flex-1 flex-col gap-[16px] overflow-clip pt-[8px] pr-[12px] xl:h-[380px] xl:gap-[20px]"
                >
                  <div
                    className="flex shrink-0 flex-col gap-[16px] xl:gap-[20px]"
                    style={{ transform: 'translateY(var(--workflow-offset, 0px))' }}
                  >
                    {displaySteps.map((step) => {
                      const isActive = step.uniqueIndex === activeStep;
                      const diff = Math.abs(step.uniqueIndex - activeStep);
                      const opacity = isActive
                        ? 1
                        : diff < STEP_OPACITIES.length
                          ? STEP_OPACITIES[diff]
                          : 0.15;

                      return (
                        <button
                          key={step.uniqueIndex}
                          disabled={step.uniqueIndex >= steps.length}
                          aria-hidden={step.uniqueIndex >= steps.length}
                          type="button"
                          aria-pressed={isActive}
                          style={{ opacity }}
                          onClick={() => scrollToStep(step.uniqueIndex)}
                          className="flex shrink-0 cursor-pointer items-center border-0 bg-transparent py-[4px] text-left transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none"
                        >
                          <span
                            className={`type-h4 tracking-[-0.01em] transition-colors duration-300 ${
                              isActive ? 'text-[#63CCB7]' : 'text-white hover:text-[#D7DCE2]'
                            }`}
                          >
                            {step.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
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
                      className="flex w-[320px] max-w-[calc(100vw-60px)] shrink-0 snap-start flex-col items-start overflow-hidden rounded-[20px_10px_20px_20px] bg-[rgba(17,17,17,0.3)] p-[20px] sm:w-[342px]"
                    >
                      <h4 className="type-h5 tracking-[-0.01em] text-[#91C6F2]">{step.title}</h4>
                      <p className="type-body-xs mt-[8px] leading-[24px] text-[#D7DCE2]">
                        {step.description}
                      </p>
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
        data-motion-section
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180.75deg, #1C5265 -2.97%, #FFFFFF 101.15%)',
        }}
      >
        <div className="w-full rounded-tr-[30px] rounded-br-[30px] bg-white px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-[40px] lg:gap-[60px]">
            {/* ── OUR STATS (Optional if stats are present) ── */}
            {data.statsAndHuman?.stats && data.statsAndHuman.stats.length > 0 && (
              <div
                data-motion-group
                data-motion-trigger="section"
                data-motion-start="top 75%"
                className="flex flex-col gap-[20px] lg:gap-[32px]"
              >
                <h3 data-motion-reveal="lines" className="type-h3 text-electric-blue">
                  {data.statsAndHuman.statsTitle || 'Our Stats'}
                </h3>

                <div className="bg-ghost-white flex w-full flex-col gap-[24px] rounded-[20px] p-[20px] md:p-[32px] lg:flex-row lg:gap-[40px] lg:p-[40px]">
                  {data.statsAndHuman.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex flex-1 flex-col gap-[8px] lg:gap-[12px]">
                      <h3
                        data-motion-metric-value={stat.value}
                        data-motion-reveal="metric"
                        className="type-h3 text-black"
                      >
                        {stat.value}
                      </h3>
                      <p data-motion-reveal="blur" className="type-body-xs text-charcoal">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── HUMAN IN THE LOOP ── */}
            <div
              data-motion-group
              data-motion-trigger="section"
              className="flex flex-col items-center justify-between gap-[24px] lg:flex-row lg:gap-[32px]"
            >
              {/* Left: Text Content */}
              <div className="flex w-full flex-col justify-center gap-[16px] lg:max-w-[644px] lg:flex-1 lg:gap-[20px]">
                <h3 data-motion-reveal="lines" className="type-h3 text-[#111111]">
                  {data.statsAndHuman?.humanHeadingHighlight && (
                    <span className="text-[#0F68D6]">
                      {data.statsAndHuman.humanHeadingHighlight}{' '}
                    </span>
                  )}
                  {data.statsAndHuman?.humanHeading
                    ? data.statsAndHuman.humanHeading
                        .replace(data.statsAndHuman.humanHeadingHighlight || '', '')
                        .trim()
                    : null}
                </h3>

                {data.statsAndHuman?.humanParagraphs?.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    data-motion-reveal="blur"
                    className="type-body-xs max-w-[644px] text-[#111111]"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Right: Image */}
              <div className="w-full lg:max-w-[644px] lg:flex-1">
                {/* Desktop Image */}
                <div
                  data-motion-reveal="image"
                  className="relative hidden aspect-[644/309] w-full overflow-hidden rounded-[30px_10px_30px_30px] lg:block"
                >
                  <Image
                    data-motion-parallax
                    src={data.statsAndHuman.humanImage || DEFAULT_HUMAN_IMG}
                    alt={data.statsAndHuman.humanImageAlt || data.statsAndHuman.humanHeading}
                    fill
                    priority
                    sizes="(max-width: 1440px) 50vw, 644px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Mobile / Tablet Image */}
                <div
                  data-motion-reveal="image"
                  className="relative block aspect-[362/156] w-full overflow-hidden rounded-[20px_10px_20px_20px] lg:hidden"
                >
                  <Image
                    data-motion-parallax
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
        data-motion-section
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
              data-motion-group
              data-motion-trigger="section"
              className="hidden w-full flex-row items-stretch gap-[14px] overflow-hidden rounded-[20px] bg-size-[100%_100%] bg-center lg:flex"
              style={{
                backgroundImage: `url("/images/solutions/solutions-AR-follow-up/this-isn't-just-an-eligibility-tool/img_bg_gradient%20(1).png")`,
                backgroundColor: '#0F68D6',
              }}
            >
              {/* Left Column: Text Content */}
              <div className="flex w-full min-w-0 flex-col items-start justify-center gap-[12px] p-[24px] lg:w-[54.1667%] lg:shrink-0 lg:p-[32px] xl:gap-[14px] xl:p-[60px]">
                <div className="flex items-center gap-[8px]">
                  <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
                  <span
                    data-motion-reveal="scramble"
                    className="type-body-xxs tracking-[0.01em] text-[#F4F6F9]"
                  >
                    {data.platformAndFeatures.platformEyebrow ||
                      `This isn't just a ${data.title.toLowerCase()} tool`}
                  </span>
                </div>

                <h3 data-motion-reveal="lines" className="type-h3 tracking-[-0.01em] text-white">
                  {data.platformAndFeatures.platformHeading}
                </h3>

                <p data-motion-reveal="blur" className="type-body-xs text-[#F4F6F9]">
                  {data.platformAndFeatures.platformDescription}
                </p>

                <Link href={data.platformAndFeatures.platformCtaLink || '/product/himer'}>
                  <CTA as="div" data-motion-reveal="fade" data-motion-magnetic variant="dark-bg">
                    {data.platformAndFeatures.platformCtaText || 'Explore HIMER AI OS'}
                  </CTA>
                </Link>
              </div>

              {/* Right Column: Image */}
              <div
                data-motion-reveal="image"
                className="flex min-w-0 flex-1 items-center justify-end self-stretch overflow-hidden rounded-[20px]"
              >
                <div className="relative h-full min-h-[380px] w-full xl:min-h-[562px]">
                  <Image
                    data-motion-parallax
                    src={data.platformAndFeatures.platformImage || DEFAULT_PLATFORM_IMG}
                    alt="HIMER AI OS platform overview"
                    fill
                    priority
                    sizes="(max-width: 1440px) 55vw, 653px"
                    className="rounded-[20px] object-cover object-[48%_center]"
                  />
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Layout */}
            <div
              data-motion-group
              data-motion-trigger="section"
              className="flex w-full flex-col overflow-hidden rounded-[20px] bg-size-[100%_100%] bg-center lg:hidden"
              style={{
                backgroundImage: `url("/images/solutions/solutions-eligibility/this-isn't-just-an-eligibility-tool/img_bg_gradient%20(2).png")`,
                backgroundColor: '#0F68D6',
              }}
            >
              <div
                data-motion-reveal="image"
                className="w-full overflow-hidden rounded-[20px] md:relative md:h-[380px]"
              >
                <Image
                  data-motion-parallax
                  src={
                    data.platformAndFeatures.platformImageMobile ||
                    data.platformAndFeatures.platformImage ||
                    DEFAULT_PLATFORM_MOBILE_IMG
                  }
                  alt="HIMER AI OS platform overview"
                  width={724}
                  height={596}
                  priority
                  className="h-auto w-full rounded-[20px] object-cover object-center md:h-full"
                />
              </div>

              <div className="flex flex-col items-start gap-[14px] p-[32px]">
                <div className="flex items-center gap-[4px]">
                  <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
                  <span
                    data-motion-reveal="scramble"
                    className="type-body-xxs tracking-[0.01em] text-[#F4F6F9]"
                  >
                    {data.platformAndFeatures.platformEyebrow ||
                      `This isn't just a ${data.title.toLowerCase()} tool`}
                  </span>
                </div>

                <h3 data-motion-reveal="lines" className="type-h3 tracking-[-0.01em] text-white">
                  {data.platformAndFeatures.platformHeading}
                </h3>

                <p
                  data-motion-reveal="blur"
                  className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]"
                >
                  {data.platformAndFeatures.platformDescription}
                </p>

                <Link href={data.platformAndFeatures.platformCtaLink || '/product/himer'}>
                  <CTA as="div" data-motion-reveal="fade" data-motion-magnetic variant="dark-bg">
                    {data.platformAndFeatures.platformCtaText || 'Explore HIMER AI OS'}
                  </CTA>
                </Link>
              </div>
            </div>

            {/* ── THREE THINGS SECTION ── */}
            {data.platformAndFeatures.threeThingsCards &&
              data.platformAndFeatures.threeThingsCards.length > 0 && (
                <div
                  data-motion-group
                  data-motion-trigger="section"
                  className="flex flex-col gap-[20px] lg:gap-[32px]"
                >
                  <h3 data-motion-reveal="lines" className="type-h3 text-black">
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
                        data-motion-reveal="slide"
                        data-motion-at={0.15 + idx * 0.12}
                        className="flex min-h-[320px] flex-1 flex-col gap-[24px] rounded-[16px] bg-white p-[32px]"
                      >
                        {card.icon ? (
                          <div
                            data-motion-reveal="image"
                            className="relative h-[80px] w-[80px] shrink-0 xl:h-[102px] xl:w-[102px]"
                          >
                            <Image
                              data-motion-parallax
                              src={card.icon}
                              alt={card.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="bg-electric-blue/10 text-electric-blue flex h-[80px] w-[80px] items-center justify-center rounded-full font-bold xl:h-[102px] xl:w-[102px]">
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
                          data-motion-reveal="slide"
                          data-motion-at={0.15 + idx * 0.12}
                          className="flex w-[280px] shrink-0 snap-start flex-col gap-[16px] rounded-[16px] bg-white p-[24px] sm:w-[320px]"
                        >
                          {card.icon ? (
                            <div
                              data-motion-reveal="image"
                              className="relative h-[62px] w-[62px] shrink-0"
                            >
                              <Image
                                data-motion-parallax
                                src={card.icon}
                                alt={card.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="bg-electric-blue/10 text-electric-blue flex h-[62px] w-[62px] items-center justify-center rounded-full font-bold">
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
        data-motion-section
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #111111 100%)',
        }}
      >
        <div className="bg-electric-blue w-full rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[40px] md:px-[40px] md:py-[50px] lg:rounded-bl-[30px] lg:px-[60px] lg:py-[60px]">
          <div
            data-motion-group
            data-motion-trigger="section"
            data-motion-start="top 85%"
            className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-[24px] lg:flex-row lg:items-center lg:gap-[20px]"
          >
            {/* Heading */}
            <h2 data-motion-reveal="lines" className="type-h2 max-w-[1148px] text-white">
              {data.cta.headline}
            </h2>

            {/* CTA Button */}
            <div className="shrink-0">
              <Link href={data.cta.buttonLink || '/contact-us'}>
                <CTA
                  as="div"
                  data-motion-reveal="fade"
                  data-motion-at="0.15"
                  data-motion-magnetic
                  variant="dark-bg"
                >
                  {data.cta.buttonText || 'Get a Demo'}
                </CTA>
              </Link>
            </div>
          </div>
        </div>
      </section>
        </div>
      </div>
    </div>
  );
}
