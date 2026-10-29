'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([0]);

  useEffect(() => {
    const handleDesktopScrollAnimation = () => {
      if (window.innerWidth < 1024) return;

      const newRevealed: number[] = [0];
      const windowHeight = window.innerHeight;

      paragraphRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.75) {
          if (!newRevealed.includes(index)) {
            newRevealed.push(index);
          }
        }
      });

      setRevealedIndices(newRevealed);
    };

    window.addEventListener('scroll', handleDesktopScrollAnimation, { passive: true });
    handleDesktopScrollAnimation();

    return () => {
      window.removeEventListener('scroll', handleDesktopScrollAnimation);
    };
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), paragraphsData.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const clientWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(index);
  };

  return (
    <section className="relative m-0 w-full overflow-hidden bg-gradient-to-b from-[#041E35] from-50% to-[#F4F6F9] to-50% p-0">
      {/* 
        Top Frame Card:
        - Spans w-full edge-to-edge
        - Background image applied directly with bg-cover bg-center
        - Rounded on right: rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px]
      */}
      <div
        className="flex w-full flex-col justify-center rounded-tr-[30px] rounded-br-[30px] bg-[#111111] bg-cover bg-center bg-no-repeat px-[20px] py-[40px] md:px-[40px] md:py-[60px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[80px]"
        style={{
          backgroundImage:
            "url('/images/philosophy/why-we-started-waterlabs/img_background_abstract_why_we_started_waterlabs.png')",
        }}
      >
        {/* Content Container (Max width 1320px centered) */}
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-[24px] lg:flex-row lg:gap-[40px]">
          {/* Left Column: Title */}
          <div className="flex w-full max-w-[640px] flex-col gap-[12px] lg:w-1/2 lg:gap-[14px]">
            {/* Title */}
            <div className="w-full max-w-[640px]">
              <h2 className="type-h2">
                <span className="text-[#F4F6F9]">
                  Why we
                  <br />
                </span>
                <span className="text-[#63CCB7]">started Waterlabs</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Desktop Stacked / Mobile Native Snap Carousel */}
          <div className="w-full max-w-[640px] lg:w-1/2">
            {/* Desktop View (3 Stacked Paragraphs with Scroll Revealing Animation) */}
            <div className="hidden max-w-[498px] flex-col gap-[40px] pt-[38px] lg:flex">
              {paragraphsData.map((item) => {
                const isRevealed = revealedIndices.includes(item.id);
                return (
                  <p
                    key={item.id}
                    ref={(el) => {
                      paragraphRefs.current[item.id] = el;
                    }}
                    className={`type-body-xxs leading-relaxed tracking-[0.01em] transition-all duration-700 ease-out ${
                      isRevealed ? 'text-[#D7DCE2] opacity-100' : 'text-[#7D8690] opacity-35'
                    }`}
                  >
                    {item.text}
                  </p>
                );
              })}
            </div>

            {/* Mobile / Tablet View (Native Smooth Snap Carousel with All-White Text) */}
            <div className="flex w-full flex-col gap-[20px] pt-[8px] lg:hidden">
              {/* Horizontal Snap Scroll Container */}
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="no-scrollbar flex w-full snap-x snap-mandatory flex-row overflow-x-auto"
              >
                {paragraphsData.map((item) => (
                  <div key={item.id} className="w-full min-w-full snap-start pr-[8px]">
                    <p className="type-body-xxs leading-relaxed tracking-[0.01em] text-white">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pill Indicators */}
              <div className="flex items-center gap-[5px] pt-[4px]">
                {paragraphsData.map((_, index) => {
                  const isActive = index === activeMobileIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Slide ${index + 1}`}
                      onClick={() => scrollToCard(index)}
                      className={`h-[5px] cursor-pointer rounded-[32px] transition-all duration-300 ${
                        isActive
                          ? 'w-[32px] bg-[#63CCB7]'
                          : index === (activeMobileIndex + 1) % 3
                            ? 'w-[16px] bg-[#63CCB7]/20 hover:bg-[#63CCB7]/40'
                            : 'w-[6px] bg-[#63CCB7]/20 hover:bg-[#63CCB7]/40'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeStartedWaterlabsSection;
