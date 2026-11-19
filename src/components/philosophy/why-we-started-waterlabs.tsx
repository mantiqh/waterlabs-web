'use client';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const paragraphsData = [
  {
    id: 0,
    desktopColor: 'text-[#D7DCE2]',
    text: "We spent twenty years working inside the revenue cycle before we built anything, which was long enough to watch every fix arrive and fall short. Software that vowed to end denials and didn't. Offshore teams where the answer to every problem was more training. RPA that stopped working the day a payer moved a button on a screen.",
  },
  {
    id: 1,
    desktopColor: 'text-[#7D8690]',
    text: 'These solutions increased speed but did not reduce the workload. The revenue cycle remains the most costly and manual process in health systems, often keeping staff at their desks late.',
  },
  {
    id: 2,
    desktopColor: 'text-[#7D8690]',
    text: 'For every dollar spent on care, nearly another dollar is spent collecting payment. This ratio has persisted for thirty years. We founded Waterlabs to change this, drawing on two decades of experience to create a lasting solution that erases the problem.',
  },
];

export const WhyWeStartedWaterlabsSection = () => {
  const [mobileProgress, setMobileProgress] = useState(0);
  const [mobileViewportHeight, setMobileViewportHeight] = useState<number>();
  const mobileSizerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const sizer = mobileSizerRef.current;
    if (!sizer) return;
    const observer = new ResizeObserver(() => {
      setMobileViewportHeight(Math.ceil(sizer.getBoundingClientRect().height));
    });
    observer.observe(sizer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      paragraphRefs.current.forEach((el, index) => {
        if (!el) return;
        if (index === 0) {
          gsap.set(el, { color: '#D7DCE2', opacity: 1 });
          return;
        }
        gsap.fromTo(
          el,
          { color: '#7D8690', opacity: 0.35 },
          {
            color: '#D7DCE2',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-motion-section
      className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#041E35] from-50% to-[#F4F6F9] to-50% p-0"
    >
      {/* 
        Top Frame Card:
        - Spans w-full edge-to-edge
        - Background image applied directly with bg-cover bg-center
        - Rounded on right: rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px]
      */}
      <div
        data-motion-reveal="panel-ltr"
        data-motion-start="top 100%"
        className="flex w-full flex-col justify-center rounded-tr-[30px] rounded-br-[30px] bg-[#111111] bg-cover bg-center bg-no-repeat px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]"
        style={{
          backgroundImage:
            "url('/images/philosophy/why-we-started-waterlabs/img_background_abstract_why_we_started_waterlabs.png')",
        }}
      >
        {/* Content Container (Max width 1320px centered) */}
        <div
          data-motion-group
          data-motion-trigger="section"
          data-motion-start="top 100%"
          className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[24px] lg:flex-row lg:gap-[40px]"
        >
          {/* Left Column: Title */}
          <div className="flex w-full max-w-[640px] flex-col gap-[12px] lg:w-1/2 lg:gap-[14px]">
            {/* Title */}
            <div className="w-full max-w-[640px]">
              <h2 data-motion-reveal="lines" className="type-h2">
                <span className="text-[#F4F6F9]">
                  Why we
                  <br />
                </span>
                <span className="text-[#63CCB7]">started Waterlabs</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Desktop Stacked / Mobile Scrollable Text */}
          <div className="w-full max-w-[640px] lg:w-1/2">
            {/* Desktop View (3 Stacked Paragraphs with Scroll Revealing Animation) */}
            <div className="hidden max-w-[498px] flex-col gap-[40px] pt-[38px] lg:flex">
              {paragraphsData.map((item, index) => (
                <p
                  key={item.id}
                  data-motion-reveal="blur"
                  data-motion-at={0.25 + index * 0.15}
                  ref={(el) => {
                    paragraphRefs.current[item.id] = el;
                  }}
                  className={`type-body-xxs leading-relaxed tracking-[0.01em] transition-colors duration-500 ${
                    index === 0 ? 'text-[#D7DCE2]' : 'text-[#7D8690]'
                  } motion-reduce:text-[#D7DCE2] motion-reduce:opacity-100`}
                >
                  {item.text}
                </p>
              ))}
            </div>

            {/* Mobile / Tablet View */}
            <div className="flex w-full flex-col gap-[20px] pt-[8px] lg:hidden">
              <div ref={mobileSizerRef} className="relative grid w-full grid-cols-1 grid-rows-1">
                {paragraphsData.map((item) => (
                  <p
                    key={item.id}
                    aria-hidden="true"
                    className="type-body-xxs invisible col-start-1 row-start-1 pr-[8px] leading-relaxed tracking-[0.01em]"
                  >
                    {item.text}
                  </p>
                ))}
                <div
                  role="region"
                  aria-label="Why we started Waterlabs"
                  tabIndex={0}
                  style={{ height: mobileViewportHeight }}
                  onScroll={(event) => {
                    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
                    const distance = scrollHeight - clientHeight;
                    setMobileProgress(
                      distance > 0 ? Math.max(0, Math.min(1, scrollTop / distance)) : 0,
                    );
                  }}
                  className="no-scrollbar absolute inset-0 flex w-full snap-y snap-mandatory flex-col overflow-y-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#63CCB7]"
                >
                  {paragraphsData.map((item) => (
                    <p
                      key={item.id}
                      className="type-body-xxs min-h-full shrink-0 snap-start pr-[8px] leading-relaxed tracking-[0.01em] text-white"
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>

              <div
                aria-hidden="true"
                className="h-[4px] w-full max-w-[440px] overflow-hidden rounded-full bg-[#63CCB7]/20"
              >
                <div
                  className="h-full w-full origin-left bg-[#63CCB7]"
                  style={{ transform: `scaleX(${mobileProgress})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeStartedWaterlabsSection;
