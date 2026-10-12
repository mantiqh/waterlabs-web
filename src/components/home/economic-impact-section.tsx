'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Progress } from '@/components/ui/progress';

export interface EconomicImpactItem {
  id: string;
  traditional: string;
  waterlabs: string;
}

export const DEFAULT_ECONOMIC_ITEMS: EconomicImpactItem[] = [
  {
    id: 'cost-model',
    traditional:
      'A high-cost, people-led model, layered management, annual salary hikes',
    waterlabs:
      '30 to 70% lower operating cost, minimal supervision, stable pricing.',
  },
  {
    id: 'hiring-ramp',
    traditional:
      '60 to 90 days to hire, train, and ramp staff, and constant rehiring against turnover',
    waterlabs:
      'Deployed in two weeks, with agents that work 24x7x365 and do not turn over.',
  },
  {
    id: 'workforce-complexity',
    traditional:
      'Most of the work done by a transactional workforce on low-complexity tasks',
    waterlabs:
      'Intelligent agents that navigate multiple systems, read the data, and make the decision.',
  },
  {
    id: 'scaling-capacity',
    traditional:
      'Scaling means new locations and delivery sites, with limited oversight',
    waterlabs:
      'Scale up or down on demand, no location constraints, full control.',
  },
  {
    id: 'quality-compliance',
    traditional:
      'People-led quality swings that cost you collections and compliance',
    waterlabs:
      'Consistent, predictable performance and better outcomes.',
  },
];

export interface EconomicImpactSectionProps {
  eyebrow?: string;
  headingPart1?: string;
  headingHighlight?: string;
  headingPart2?: string;
  items?: EconomicImpactItem[];
  points?: string[];
}

const DEFAULT_POINTS = [
  'No development fee.',
  'No licensing cost',
  'No charge until the agents are live in your environment',
  'Billing starts only on completed output',
];

// Helper calculating vertical reveal styles for each item based on scroll progress
const getItemStyle = (
  idx: number,
  scrollProgress: number,
  totalItems: number
): React.CSSProperties => {
  const maxStep = totalItems - 1; // 4 steps between 5 items
  const step = scrollProgress * maxStep;
  const s = Math.max(0, Math.min(maxStep, step));

  const i = Math.min(Math.floor(s), maxStep - 1);
  const local = s - i; // 0.0 to 1.0 within current step segment

  // Item is completely before the active transition pair
  if (idx < i) {
    return {
      transform: 'translate3d(0, -28px, 0)',
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    };
  }

  // Item is completely after the active transition pair
  if (idx > i + 1) {
    return {
      transform: 'translate3d(0, 28px, 0)',
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    };
  }

  // Current item: resting then exiting upward
  if (idx === i) {
    if (local < 0.5) {
      return {
        transform: 'translate3d(0, 0px, 0)',
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
      };
    } else if (local < 0.75) {
      const t = (local - 0.5) / 0.25;
      const ease = t * t * (3 - 2 * t);
      return {
        transform: `translate3d(0, ${-28 * ease}px, 0)`,
        opacity: Math.max(0, 1 - ease),
        visibility: 'visible',
        pointerEvents: 'none',
      };
    } else {
      return {
        transform: 'translate3d(0, -28px, 0)',
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      };
    }
  }

  // Next item: waiting below then entering from below
  if (idx === i + 1) {
    if (local < 0.75) {
      return {
        transform: 'translate3d(0, 28px, 0)',
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      };
    } else {
      const t = (local - 0.75) / 0.25;
      const ease = t * t * (3 - 2 * t);
      return {
        transform: `translate3d(0, ${28 * (1 - ease)}px, 0)`,
        opacity: Math.min(1, ease),
        visibility: 'visible',
        pointerEvents: ease >= 0.5 ? 'auto' : 'none',
      };
    }
  }

  return {
    transform: 'translate3d(0, 0px, 0)',
    opacity: 1,
    visibility: 'visible',
  };
};

export const EconomicImpactSection = ({
  eyebrow = 'The Economic Impact of Going Agentic',
  headingPart1 = 'What changes ',
  headingHighlight = 'when agents run',
  headingPart2 = ' the cycle instead of people.',
  items = DEFAULT_ECONOMIC_ITEMS,
  points = DEFAULT_POINTS,
}: EconomicImpactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize scroll progress directly from user scroll position
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = sectionRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const totalScrollable = el.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        const currentScroll = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const progressPercent = Math.min(100, Math.max(0, scrollProgress * 100));

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#0F68D6] to-[#042849]"
      style={{ height: '300vh' }}
    >
      {/* Pinned Sticky Viewport Container */}
      <div className="sticky top-0 w-full overflow-hidden">
        {/* 
          Curved Container (Figma node 7487-16854 desktop, 7487-17246 mobile):
          - Desktop: background #FFFFFF, border-radius 60px 0px 0px 60px, padding 60px
          - Mobile: background #FFFFFF, border-radius 30px 0px 0px 30px, padding 32px 12px
        */}
        <div className="w-full bg-white rounded-tl-[30px] rounded-bl-[30px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] py-[32px] px-[12px] sm:px-[20px] md:px-[40px] lg:py-[60px] lg:px-[60px]">
          {/* 
            Main Dark Card (Figma node 7487-16854: 1320x697 desktop, 378x757 mobile):
            - Background: linear gradients layered with desktop/mobile background artwork
            - Desktop border-radius: 24px, padding 40px, gap 40px, height 697px
            - Mobile border-radius: 20px 10px 20px 20px, padding 20px, gap 20px
          */}
          <div
            className="relative w-full max-w-[1320px] mx-auto lg:h-[697px] rounded-[20px_10px_20px_20px] lg:rounded-[24px] overflow-hidden p-[20px] lg:p-[40px] flex flex-col justify-center gap-[20px] lg:gap-[40px] isolate"
            style={{
              background:
                'linear-gradient(137.1deg, #042849 29.61%, #0A60AF 99.37%)',
            }}
          >
            {/* Background Image: Desktop glow artwork */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
              <Image
                src="/images/home/the-economic-impact-of-going-agentic/desktop/bg_the_eceonomic_impact_of_going_agentic.png"
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Background Image: Mobile artwork */}
            <div className="block lg:hidden absolute inset-0 pointer-events-none z-0">
              <Image
                src="/images/home/the-economic-impact-of-going-agentic/mobile/bg_the_eceonomic_impact_of_going_agentic (2).png"
                alt=""
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Gradient Overlay: Figma linear-gradient(91.58deg, rgba(0, 0, 0, 0.9) 6.63%, rgba(0, 0, 0, 0) 84.7%) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background:
                  'linear-gradient(91.58deg, rgba(0, 0, 0, 0.9) 6.63%, rgba(0, 0, 0, 0) 84.7%)',
              }}
            />

            {/* Background Glow Shape: Figma background-shape */}
            <div
              aria-hidden="true"
              className="absolute right-0 bottom-0 w-full h-[260px] pointer-events-none z-0 opacity-70 blur-[18.9px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0) 31.57%, #0F68D6 132.23%)',
              }}
            />

            {/* =========================================================
                ROW 1: Top Comparison Glassmorphic Card (1240x489 desktop, 338x517 mobile)
               ========================================================= */}
            <div className="relative z-10 w-full lg:h-[489px] bg-black/40 backdrop-blur-[25.35px] rounded-[20px_10px_20px_20px] lg:rounded-[20px] p-[24px_16px] sm:p-[32px_20px] lg:p-[32px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[24px] lg:gap-[32px] xl:gap-[40px] border border-white/5 overflow-hidden">
              
              {/* Vector Path on Right Side (Figma vector-path) */}
              <div className="hidden lg:block absolute right-0 top-[61px] w-[224px] h-[428px] pointer-events-none z-0">
                <Image
                  src="/images/home/the-economic-impact-of-going-agentic/desktop/vector-path.png"
                  alt=""
                  fill
                  className="object-contain object-right"
                  priority
                />
              </div>

              {/* LEFT COLUMN: Eyebrow Tag + Heading */}
              <div className="relative z-10 w-full lg:w-[48%] xl:w-[578px] flex flex-col items-start gap-[16px] lg:gap-[20px] shrink-0">
                {/* Tag / Eyebrow */}
                <div className="inline-flex items-center gap-[4px] lg:gap-[8px] h-[20px] lg:h-[24px]">
                  <span className="w-[8px] h-[8px] rounded-full bg-[#63CCB7] shrink-0 animate-pulse" />
                  <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                    {eyebrow}
                  </span>
                </div>

                {/* Heading */}
                <h2 className="type-h2 tracking-[-0.01em] max-w-[463px]">
                  <span className="text-white">{headingPart1}</span>
                  <span className="text-[#91C6F2]">{headingHighlight}</span>
                  <span className="text-white">{headingPart2}</span>
                </h2>
              </div>

              {/* RIGHT COLUMN: Comparison Content with Scroll-Driven Vertical Reveal & Synchronized Progress */}
              <div className="relative z-10 w-full lg:w-[48%] xl:w-[578px] flex flex-col items-start gap-[20px] lg:gap-[24px]">
                
                {/* Dynamic Content Container with CSS Grid Stacking & Vertical Reveal */}
                <div className="grid grid-cols-1 grid-rows-1 w-full overflow-hidden min-h-[170px] sm:min-h-[160px] lg:min-h-[160px]">
                  {items.map((item, idx) => {
                    const style = getItemStyle(idx, scrollProgress, items.length);
                    return (
                      <div
                        key={item.id}
                        className="col-start-1 row-start-1 flex flex-col gap-[14px] lg:gap-[18px] w-full"
                        style={style}
                      >
                        {/* Traditional Model */}
                        <div className="flex flex-col gap-[6px] lg:gap-[10px] w-full">
                          <div className="inline-flex items-center gap-[4px] lg:gap-[8px] h-[20px]">
                            <span className="w-[8px] h-[8px] rounded-full bg-[#D7DCE2] shrink-0" />
                            <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                              Traditional model
                            </span>
                          </div>
                          <h3 className="type-h6 tracking-[-0.01em] text-white">
                            {item.traditional}
                          </h3>
                        </div>

                        {/* With Waterlabs */}
                        <div className="flex flex-col gap-[6px] lg:gap-[10px] w-full">
                          <div className="inline-flex items-center gap-[4px] lg:gap-[8px] h-[20px]">
                            <span className="w-[8px] h-[8px] rounded-full bg-[#91C6F2] shrink-0" />
                            <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                              With Waterlabs
                            </span>
                          </div>
                          <h3 className="type-h6 tracking-[-0.01em] text-[#91C6F2]">
                            {item.waterlabs}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Synchronized Shadcn Progress Bar Driven Directly by Scroll */}
                <div className="w-full max-w-[440px] pt-[4px]">
                  <Progress
                    value={progressPercent}
                    className="w-full h-[3px] bg-[#2A2A2A] rounded-full overflow-hidden"
                    indicatorClassName="bg-[#63CCB7] transition-transform duration-75 ease-out"
                  />
                </div>

              </div>
            </div>

            {/* =========================================================
                ROW 2: Bottom Highlight Glassmorphic Bar (1240x88 desktop, 338x180 mobile)
               ========================================================= */}
            <div className="relative z-10 w-full min-h-[88px] lg:h-[88px] bg-[rgba(0,0,0,0.21)] backdrop-blur-[9.5px] rounded-[20px_10px_20px_20px] p-[20px] lg:py-[18px] lg:px-[32px] flex items-center border border-white/5">
              <div className="grid grid-cols-1 sm:grid-flow-col sm:grid-rows-2 sm:grid-cols-[auto_1fr] xl:flex xl:flex-row xl:items-center xl:justify-between gap-x-[32px] gap-y-[12px] xl:gap-[32px] w-full">
                {points.map((point) => (
                  <div
                    key={point}
                    className="inline-flex items-center gap-[8px] whitespace-nowrap"
                  >
                    <span className="w-[5px] h-[5px] lg:w-[7px] lg:h-[7px] rounded-full bg-[#63CCB7] shrink-0" />
                    <span className="type-body-xxs tracking-[0.01em] text-white">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomicImpactSection;
