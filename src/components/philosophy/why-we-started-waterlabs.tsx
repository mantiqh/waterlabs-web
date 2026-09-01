'use client';

import React, { useRef, useState } from 'react';

const paragraphsData = [
  {
    id: 0,
    desktopColor: 'text-[#D7DCE2]',
    text: "We spent twenty years inside the revenue cycle before we built anything. Long enough to watch every fix arrive and fall short. Tools that promised to end denials and didn't. Offshore reviews where the answer was always the same: we'll retrain the team. RPA that broke the moment a payer moved a button. Every wave automated the wrong thing, faster.",
  },
  {
    id: 1,
    desktopColor: 'text-[#7D8690]',
    text: "None of it touched the real problem. The revenue cycle is still the hardest, most expensive, most manual thing a health system runs. Everyone improved it. Nobody ended it. And a problem you manage better is still a problem you manage.",
  },
  {
    id: 2,
    desktopColor: 'text-[#7D8690]',
    text: "For every dollar healthcare spends on care, it spends nearly another chasing money it already earned. That ratio has held for thirty years. We started Waterlabs to correct it. Not to make the paperwork quicker, but to make it run without you. It shouldn't be a problem you manage. So we built the thing that ends it.",
  },
];

export const WhyWeStartedWaterlabsSection: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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
    <section className="relative w-full overflow-hidden p-0 m-0 bg-gradient-to-b from-[#041A2D] from-[5.62%] to-[#F4F6F9] to-[99.74%]">
      {/* 
        Top Frame Card:
        - Spans w-full edge-to-edge
        - Background image applied directly with bg-cover bg-center
        - Rounded on right: rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px]
      */}
      <div 
        className="w-full bg-[#111111] bg-cover bg-center bg-no-repeat rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[40px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px] flex flex-col justify-center"
        style={{
          backgroundImage: "url('/images/philosophy/why-we-started-waterlabs/img_background_abstract_why_we_started_waterlabs.png')",
        }}
      >
        {/* Content Container (Max width 1320px centered) */}
        <div className="w-full max-w-[1320px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-[24px] lg:gap-[40px]">
          
          {/* Left Column: Tag + Title */}
          <div className="w-full lg:w-1/2 max-w-[640px] flex flex-col gap-[12px] lg:gap-[14px]">
            
            {/* Tag */}
            <div className="flex items-center gap-[4px] lg:gap-[8px]">
              <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#63CCB7] shrink-0" />
              <span className="type-caption lg:type-body-xxs text-[#7D8690] tracking-[0.01em]">
                Why we exist
              </span>
            </div>

            {/* Title */}
            <div className="w-full max-w-[640px]">
              <h2 className="type-h2">
                <span className="text-[#F4F6F9]">
                  Why We<br />
                </span>
                <span className="text-[#63CCB7]">
                  Started Waterlabs
                </span>
              </h2>
            </div>

          </div>

          {/* Right Column: Desktop Stacked / Mobile Native Snap Carousel */}
          <div className="w-full lg:w-1/2 max-w-[640px]">
            
            {/* Desktop View (3 Stacked Paragraphs) */}
            <div className="hidden lg:flex flex-col gap-[40px] pt-[38px] max-w-[498px]">
              {paragraphsData.map((item) => (
                <p key={item.id} className={`type-body-xxs ${item.desktopColor} tracking-[0.01em] leading-relaxed`}>
                  {item.text}
                </p>
              ))}
            </div>

            {/* Mobile / Tablet View (Native Smooth Snap Carousel with All-White Text) */}
            <div className="flex lg:hidden flex-col gap-[20px] w-full pt-[8px]">
              {/* Horizontal Snap Scroll Container */}
              <div 
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar w-full"
              >
                {paragraphsData.map((item) => (
                  <div key={item.id} className="w-full min-w-full snap-start pr-[8px]">
                    <p className="type-body-xxs text-white tracking-[0.01em] leading-relaxed">
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
                      className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer ${
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
