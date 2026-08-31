'use client';

import Image from 'next/image';
import React, { useEffect,useRef, useState } from 'react';

const brandLogos = [
  { src: "/images/home/brand-slider-images/brightview_logo.png", alt: "BrightView" },
  { src: "/images/home/brand-slider-images/therapy_partners_group_logo.png", alt: "Therapy Partners Group" },
  { src: "/images/home/brand-slider-images/skincure_oncology.png", alt: "SkinCure Oncology" },
  { src: "/images/home/brand-slider-images/metro_anesthesia_logo.png", alt: "Metro Anesthesia" },
  { src: "/images/home/brand-slider-images/nch_north_country_healthcare_logo.png", alt: "NCH" },
  { src: "/images/home/brand-slider-images/healthcare_express_logo.png", alt: "Healthcare Express" },
  { src: "/images/home/brand-slider-images/angels_of_care_logo.png", alt: "Angels of Care" },
];

export const BrandSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotCount, setDotCount] = useState(0);

  // Track active slide and total dots based on scroll position
  useEffect(() => {
    const handleScrollAndResize = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      
      if (maxScroll <= 0) {
        setDotCount(0);
        return;
      }

      const itemNode = container.children[0] as HTMLElement;
      const itemWidth = itemNode ? itemNode.clientWidth + 56 : 196; // 140px width + 56px gap
      
      const totalSnaps = Math.ceil(maxScroll / itemWidth) + 1;
      setDotCount(totalSnaps);

      let current = Math.round(scrollLeft / itemWidth);
      if (scrollLeft >= maxScroll - 10) {
        current = totalSnaps - 1;
      }
      setActiveIndex(current);
    };

    const container = scrollContainerRef.current;
    if (container) {
      handleScrollAndResize();
      container.addEventListener('scroll', handleScrollAndResize, { passive: true });
      window.addEventListener('resize', handleScrollAndResize);
      return () => {
        container.removeEventListener('scroll', handleScrollAndResize);
        window.removeEventListener('resize', handleScrollAndResize);
      };
    }
  }, []);

  return (
    <section className="w-full bg-white rounded-tl-[30px] lg:rounded-tl-[80px] py-[40px] px-[20px] lg:py-[60px] lg:px-[60px]">
      <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[32px] lg:gap-[60px]">
        
        {/* Header Section */}
        <div className="shrink-0">
          <h2 className="type-h4">
            <span className="text-electric-blue block lg:inline">Trusted at the scale </span>
            <span className="text-[#2A2A2A] block lg:inline">healthcare runs at</span>
          </h2>
        </div>

        {/* Desktop Marquee Slider */}
        <div className="hidden lg:flex w-full overflow-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center gap-[170px] pr-[170px]">
            {/* Set 1 */}
            {brandLogos.map((logo, i) => (
              <div key={`d1-${i}`} className="relative h-[48px] w-auto shrink-0 flex items-center justify-center">
                <Image src={logo.src} alt={logo.alt} width={180} height={60} className="object-contain h-full w-auto" />
              </div>
            ))}
            {/* Set 2 for infinite loop */}
            {brandLogos.map((logo, i) => (
              <div key={`d2-${i}`} className="relative h-[48px] w-auto shrink-0 flex items-center justify-center">
                <Image src={logo.src} alt={logo.alt} width={180} height={60} className="object-contain h-full w-auto" />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center gap-[170px] pr-[170px]" aria-hidden="true">
             {/* Set 3 */}
             {brandLogos.map((logo, i) => (
              <div key={`d3-${i}`} className="relative h-[48px] w-auto shrink-0 flex items-center justify-center">
                <Image src={logo.src} alt={logo.alt} width={180} height={60} className="object-contain h-full w-auto" />
              </div>
            ))}
            {/* Set 4 */}
            {brandLogos.map((logo, i) => (
              <div key={`d4-${i}`} className="relative h-[48px] w-auto shrink-0 flex items-center justify-center">
                <Image src={logo.src} alt={logo.alt} width={180} height={60} className="object-contain h-full w-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Swipe Slider */}
        <div className="flex lg:hidden flex-col w-full gap-[32px]">
          <div 
            ref={scrollContainerRef}
            className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[56px] items-center [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brandLogos.map((logo, i) => (
              <div key={`m-${i}`} className="relative snap-center shrink-0 w-[140px] h-[40px] flex items-center justify-center">
                <Image src={logo.src} alt={logo.alt} width={140} height={40} className="object-contain h-full w-auto" />
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          {dotCount > 1 && (
            <div className="flex items-center gap-[6px]">
              {Array.from({ length: dotCount }).map((_, i) => (
                <div 
                  key={`dot-${i}`}
                  className={`h-[4px] rounded-[32px] transition-all duration-300 ${
                    activeIndex === i 
                      ? 'w-[24px] bg-electric-blue' 
                      : 'w-[8px] bg-[#D7DCE2]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default BrandSlider;
