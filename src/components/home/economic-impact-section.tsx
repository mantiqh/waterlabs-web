'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { Progress } from '@/components/ui/progress';
import { mountScrollScene, type SceneMode } from '@/lib/motion/scroll-scene';

export interface EconomicImpactItem {
  id: string;
  traditional: string;
  waterlabs: string;
}

export const DEFAULT_ECONOMIC_ITEMS: EconomicImpactItem[] = [
  {
    id: 'cost-model',
    traditional: 'A high-cost, people-led model, layered management, annual salary hikes',
    waterlabs: '30 to 70% lower operating cost, minimal supervision, stable pricing.',
  },
  {
    id: 'hiring-ramp',
    traditional:
      '60 to 90 days to hire, train, and ramp staff, and constant rehiring against turnover',
    waterlabs: 'Deployed in two weeks, with agents that work 24x7x365 and do not turn over.',
  },
  {
    id: 'workforce-complexity',
    traditional: 'Most of the work done by a transactional workforce on low-complexity tasks',
    waterlabs:
      'Intelligent agents that navigate multiple systems, read the data, and make the decision.',
  },
  {
    id: 'scaling-capacity',
    traditional: 'Scaling means new locations and delivery sites, with limited oversight',
    waterlabs: 'Scale up or down on demand, no location constraints, full control.',
  },
  {
    id: 'quality-compliance',
    traditional: 'People-led quality swings that cost you collections and compliance',
    waterlabs: 'Consistent, predictable performance and better outcomes.',
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

export const EconomicImpactSection = ({
  eyebrow = 'The Economic Impact of Going Agentic',
  headingPart1 = 'What changes ',
  headingHighlight = 'when agents run',
  headingPart2 = ' the cycle instead of people.',
  items = DEFAULT_ECONOMIC_ITEMS,
  points = DEFAULT_POINTS,
}: EconomicImpactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneMode, setSceneMode] = useState<SceneMode>('pending');
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    return mountScrollScene(
      sectionRef.current.closest<HTMLElement>('[data-economic-sequence]') ?? sectionRef.current,
      {
        count: items.length,
        onIndex: setActiveIndex,
        onMode: setSceneMode,
        kind: 'comparison',
      },
    );
  }, [items]);

  return (
    <section
      data-home-section="economic"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#2BAAB3] to-[#042849] md:from-[#158AB6] lg:from-[#1275CB]"
    >
      {/* Pinned Sticky Viewport Container */}
      <div className="w-full overflow-hidden">
        {/* 
          Curved Container (Figma node 7487-16854 desktop, 7487-17246 mobile):
          - Desktop: background #FFFFFF, border-radius 60px 0px 0px 60px, padding 60px
          - Mobile: background #FFFFFF, border-radius 30px 0px 0px 30px, padding 32px 12px
        */}
        <div
          data-scene-surface
          className="w-full rounded-tl-[30px] rounded-bl-[30px] bg-white px-[12px] py-[32px] sm:px-[20px] md:px-[40px] lg:rounded-tl-[60px] lg:rounded-bl-[60px] lg:px-[60px] lg:py-[60px]"
        >
          {/* 
            Main Dark Card (Figma node 7487-16854: 1320x697 desktop, 378x757 mobile):
            - Background: linear gradients layered with desktop/mobile background artwork
            - Desktop border-radius: 24px, padding 40px, gap 40px, height 697px
            - Mobile border-radius: 20px 10px 20px 20px, padding 20px, gap 20px
          */}
          <div
            data-scene-content
            data-economic-card
            data-motion-scrub-scale
            className="relative isolate mx-auto flex w-full max-w-[1320px] flex-col justify-center gap-[20px] overflow-hidden rounded-[20px_10px_20px_20px] p-[20px] lg:min-h-[697px] lg:gap-[40px] lg:rounded-[24px] lg:p-[40px]"
            style={{
              background: 'linear-gradient(137.1deg, #042849 29.61%, #0A60AF 99.37%)',
            }}
          >
            {/* Background Image: Desktop glow artwork */}
            <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
              <Image
                src="/images/home/the-economic-impact-of-going-agentic/desktop/bg_the_eceonomic_impact_of_going_agentic.png"
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Background Image: Mobile artwork */}
            <div className="pointer-events-none absolute inset-0 z-0 block lg:hidden">
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
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  'linear-gradient(91.58deg, rgba(0, 0, 0, 0.9) 6.63%, rgba(0, 0, 0, 0) 84.7%)',
              }}
            />

            {/* Background Glow Shape: Figma background-shape */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 z-0 h-[260px] w-full opacity-70 blur-[18.9px]"
              style={{
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 31.57%, #0F68D6 132.23%)',
              }}
            />

            {/* =========================================================
                ROW 1: Top Comparison Glassmorphic Card (1240x489 desktop, 338x517 mobile)
               ========================================================= */}
            <div
              data-economic-comparison
              className="relative z-10 flex w-full flex-col items-start justify-between gap-[24px] overflow-hidden rounded-[20px_10px_20px_20px] border border-white/5 bg-black/40 p-[24px_16px] backdrop-blur-[25.35px] sm:p-[32px_20px] lg:min-h-[489px] lg:flex-row lg:items-center lg:gap-[32px] lg:rounded-[20px] lg:p-[32px] xl:gap-[40px]"
            >
              {/* Vector Path on Right Side (Figma vector-path) - Clean subtle blue/white lines matching design */}
              <div
                data-scene-logo
                className="pointer-events-none absolute top-[61px] right-0 z-0 hidden h-[428px] w-[224px] lg:block"
              >
                <Image
                  src="/images/home/the-economic-impact-of-going-agentic/desktop/vector-path.png"
                  alt=""
                  fill
                  className="object-contain object-right opacity-20 brightness-0 invert"
                  priority
                />
              </div>

              {/* LEFT COLUMN: Eyebrow Tag + Heading */}
              <div className="relative z-10 flex w-full shrink-0 flex-col items-start gap-[16px] lg:w-[48%] lg:gap-[20px] xl:w-[578px]">
                {/* Tag / Eyebrow */}
                <div className="inline-flex h-[20px] items-center gap-[4px] lg:h-[24px] lg:gap-[8px]">
                  <span className="h-[8px] w-[8px] shrink-0 animate-pulse rounded-full bg-[#63CCB7]" />
                  <span
                    data-motion-reveal="scramble"
                    data-motion-trigger="section"
                    data-motion-start="top 55%"
                    data-motion-at="0.3"
                    className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]"
                  >
                    {eyebrow}
                  </span>
                </div>

                {/* Heading */}
                <h2
                  data-motion-reveal="lines"
                  data-motion-trigger="section"
                  data-motion-start="top 55%"
                  data-motion-at="0.35"
                  className="type-h2 max-w-[463px] tracking-[-0.01em]"
                >
                  <span className="text-white">{headingPart1}</span>
                  <span className="text-[#91C6F2]">{headingHighlight}</span>
                  <span className="text-white">{headingPart2}</span>
                </h2>
              </div>

              {/* RIGHT COLUMN: Comparison Content with Scroll-Driven Vertical Reveal & Synchronized Progress */}
              <div className="relative z-10 flex w-full flex-col items-start gap-[20px] lg:w-[48%] lg:gap-[24px] xl:w-[578px]">
                {/* Dynamic Content Container with CSS Grid Stacking & Vertical Reveal */}
                <div
                  data-scene-panels
                  className="grid min-h-[170px] w-full grid-cols-1 grid-rows-1 overflow-hidden sm:min-h-[160px] lg:min-h-[160px]"
                >
                  {items.map((item, idx) => {
                    return (
                      <div
                        key={item.id}
                        className="col-start-1 row-start-1 flex w-full flex-col gap-[14px] lg:gap-[18px]"
                        data-scene-panel
                        aria-hidden={sceneMode === 'pinned' && idx !== activeIndex}
                      >
                        {/* Traditional Model */}
                        <div
                          data-motion-reveal={idx === 0 ? 'fade' : undefined}
                          data-motion-trigger="section"
                          data-motion-start="top 55%"
                          data-motion-at="0.6"
                          className="flex w-full flex-col gap-[6px] lg:gap-[10px]"
                        >
                          <div className="inline-flex h-[20px] items-center gap-[4px] lg:gap-[8px]">
                            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#D7DCE2]" />
                            <span className="type-body-xxs tracking-[0.01em] text-[#D7DCE2]">
                              Traditional model
                            </span>
                          </div>
                          <h3 className="type-h6 tracking-[-0.01em] text-white">
                            {item.traditional}
                          </h3>
                        </div>

                        {/* With Waterlabs */}
                        <div
                          data-motion-reveal={idx === 0 ? 'fade' : undefined}
                          data-motion-trigger="section"
                          data-motion-start="top 55%"
                          data-motion-at="0.72"
                          className="flex w-full flex-col gap-[6px] lg:gap-[10px]"
                        >
                          <div className="inline-flex h-[20px] items-center gap-[4px] lg:gap-[8px]">
                            <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#91C6F2]" />
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

                {/* Synchronized Shadcn Progress Bar Driven Directly by Scroll (Decorative) */}
                <div className="w-full max-w-[440px] pt-[4px]" aria-hidden="true">
                  <Progress
                    data-scene-progress
                    aria-hidden="true"
                    tabIndex={-1}
                    value={sceneMode === 'flow' ? 100 : 0}
                    className="h-[3px] w-full overflow-hidden rounded-full bg-[#2A2A2A]"
                    indicatorClassName="bg-[#63CCB7] !transition-none"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================
                ROW 2: Bottom Highlight Glassmorphic Bar (1240x88 desktop, 338x180 mobile)
               ========================================================= */}
            <div
              data-motion-group
              data-motion-start="top 82%"
              data-motion-reveal="fade"
              data-motion-at="0"
              data-motion-y="30"
              className="relative z-10 flex min-h-[88px] w-full items-center rounded-[20px_10px_20px_20px] border border-white/5 bg-[rgba(0,0,0,0.21)] p-[20px] backdrop-blur-[9.5px] lg:px-[32px] lg:py-[18px]"
            >
              <div className="grid w-full grid-cols-1 gap-x-[32px] gap-y-[12px] sm:grid-flow-col sm:grid-cols-[auto_minmax(0,1fr)] sm:grid-rows-2 xl:flex xl:flex-row xl:flex-wrap xl:items-center xl:justify-between xl:gap-x-[32px] xl:gap-y-[12px]">
                {points.map((point, index) => (
                  <div
                    key={point}
                    data-motion-reveal="slide"
                    data-motion-at={0.3 + index * 0.08}
                    className="flex max-w-full min-w-0 items-start gap-[8px] whitespace-normal sm:items-center"
                  >
                    <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#63CCB7] sm:mt-0 lg:h-[7px] lg:w-[7px]" />
                    <span className="type-body-xxs tracking-[0.01em] break-words text-white">
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
