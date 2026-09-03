'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const productStatements = [
  {
    id: 0,
    leadText: 'Because knowledge should remain within the organization,',
    highlightText: 'every resolved exception is recorded and retained.',
    description: 'When a similar case arises, the agent is equipped with the necessary information.',
    desktopImage: '/images/philosophy/how-that-shows-up/statement_0_desktop.png',
    mobileImage: '/images/philosophy/how-that-shows-up/statement_0_mobile.png',
  },
  {
    id: 1,
    leadText: 'Since a managed problem is still a problem,',
    highlightText: 'our agents address all cases, not just the most recent.',
    description: 'Every denial is appealed, and every outstanding item is processed.',
    desktopImage: '/images/philosophy/how-that-shows-up/statement_1.png',
    mobileImage: '/images/philosophy/how-that-shows-up/statement_1_mobile.png',
  },
  {
    id: 2,
    leadText: 'Repetitive tasks are automated,',
    highlightText: 'while judgment calls are handled by your staff.',
    description: 'When an agent encounters an unresolved issue, they escalate the case, providing a complete record of all attempted solutions.',
    desktopImage: '/images/philosophy/how-that-shows-up/statement_1.png',
    mobileImage: '/images/philosophy/how-that-shows-up/statement_1_mobile.png',
  },
  {
    id: 3,
    leadText: 'And because we think the risk should sit with us,',
    highlightText: 'there is no license fee and no charge for building the agents.',
    description: 'Billing starts once they are live and working.',
    desktopImage: '/images/philosophy/how-that-shows-up/statement_1.png',
    mobileImage: '/images/philosophy/how-that-shows-up/statement_1_mobile.png',
  },
];

export const HowThatShowsUpSection: React.FC = () => {
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Handle Desktop vertical scroll
  const handleDesktopScroll = () => {
    if (!desktopScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = desktopScrollRef.current;
    if (scrollHeight <= clientHeight) return;
    const scrollFraction = scrollTop / (scrollHeight - clientHeight);
    const index = Math.min(
      Math.max(Math.round(scrollFraction * (productStatements.length - 1)), 0),
      productStatements.length - 1
    );
    setActiveDesktopIndex(index);
  };

  const scrollToDesktopStatement = (index: number) => {
    if (!desktopScrollRef.current) return;
    const container = desktopScrollRef.current;
    const items = container.children;
    if (items[index]) {
      const targetItem = items[index] as HTMLElement;
      container.scrollTo({
        top: targetItem.offsetTop - container.offsetTop,
        behavior: 'smooth',
      });
      setActiveDesktopIndex(index);
    }
  };

  // Handle Mobile horizontal swipe / scroll
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    if (clientWidth === 0) return;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), productStatements.length - 1));
  };

  const scrollToMobileCard = (index: number) => {
    if (!mobileScrollRef.current) return;
    const clientWidth = mobileScrollRef.current.clientWidth;
    mobileScrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setActiveMobileIndex(index);
  };

  return (
    <section className="relative w-full overflow-hidden p-0 m-0 bg-[#F4F6F9]">
      {/* 
        Outer Container Card (Frame 2147203276 / top frame):
        - Desktop: 1440px x 764px, rounded-tr-[60px] rounded-br-[60px], padding: 80px 60px, gap: 40px
        - Mobile: 402px x 672px, rounded-tr-[30px] rounded-br-[30px], padding: 20px 20px 40px, gap: 20px
        - Background: linear-gradient(239.93deg, #63CCB7 21.64%, #0F68D6 94.97%)
      */}
      <div
        className="w-full rounded-tr-[30px] rounded-br-[30px] lg:rounded-tr-[60px] lg:rounded-br-[60px] py-[32px] px-[20px] md:py-[60px] md:px-[40px] lg:py-[80px] lg:px-[60px] flex flex-col gap-[20px] lg:gap-[40px] overflow-hidden"
        style={{
          background: 'linear-gradient(239.93deg, #63CCB7 21.64%, #0F68D6 94.97%)',
        }}
      >
        <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-[20px] lg:gap-[40px]">
          
          {/* Main Card with Background Image (Frame 2147203302: 1320px x 500px) */}
          <div className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] lg:h-[500px] rounded-[20px_10px_20px_20px] lg:rounded-[16px_16px_16px_8px] overflow-hidden flex flex-col justify-end lg:justify-start">
            
            {/* Background Image - Mobile & Tablet */}
            <div className="absolute inset-0 pointer-events-none lg:hidden">
              {productStatements.map((statement, idx) => (
                <div
                  key={`mobile-bg-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeMobileIndex === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={statement.mobileImage}
                    alt={`How That Shows Up Visual ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover object-top sm:object-[center_10%] md:object-[center_15%]"
                  />
                </div>
              ))}
            </div>

            {/* Background Image - Desktop */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              {productStatements.map((statement, idx) => (
                <div
                  key={`desktop-bg-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeDesktopIndex === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={statement.desktopImage}
                    alt={`How That Shows Up Visual ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    sizes="1320px"
                    className="object-cover object-[82%_center] xl:object-center"
                  />
                </div>
              ))}
            </div>

            {/* Glassmorphic Card (top-left 16px, top-right 8px radius on desktop, w-[360px] on 1024px) */}
            <div className="relative z-10 w-full lg:w-[360px] xl:w-[537px] h-auto lg:h-full bg-white/[0.90] backdrop-blur-[12px] rounded-[16px_8px_20px_20px] lg:rounded-[16px_8px_16px_8px] p-[20px] sm:p-[24px] lg:p-[28px] xl:p-[32px] flex flex-col justify-between gap-[14px] lg:gap-[20px] shadow-sm overflow-hidden">
              
              {/* Tag + Heading Block */}
              <div className="flex flex-col gap-[10px] lg:gap-[14px]">
                {/* Text - Tag */}
                <div className="flex items-center gap-[6px] lg:gap-[8px]">
                  <div className="w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] rounded-full bg-[#0F68D6] shrink-0" />
                  <span className="type-caption lg:type-body-xxs text-[#7D8690] tracking-[0.01em]">
                    In practice
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="type-h2 text-black">
                  How That Shows Up<br />in the Product
                </h2>
              </div>

              {/* Desktop Progress Bar & Vertically Scrollable Statements */}
              <div className="hidden lg:flex flex-row items-start gap-[24px] pt-[4px] relative">
                
                {/* Vertical Progress Bar (3px x 183px) */}
                <div className="w-[3px] h-[183px] relative rounded-[12px] bg-[#7D8690]/40 overflow-hidden shrink-0 mt-[4px]">
                  <div
                    className="absolute left-0 w-full rounded-[12px] bg-[#0F68D6] transition-all duration-300 ease-out"
                    style={{
                      height: '58%',
                      top: `${(activeDesktopIndex / Math.max(productStatements.length - 1, 1)) * 42}%`,
                    }}
                  />
                </div>

                {/* Vertical Scrollable Statements List */}
                <div
                  ref={desktopScrollRef}
                  onScroll={handleDesktopScroll}
                  className="flex flex-col gap-[20px] h-[183px] overflow-y-auto no-scrollbar snap-y snap-mandatory select-none flex-1 pr-[8px]"
                >
                  {productStatements.map((item, index) => {
                    const isActive = index === activeDesktopIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => scrollToDesktopStatement(index)}
                        className={`snap-start transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-20 hover:opacity-50'
                        }`}
                      >
                        <p className="type-h6 text-black">
                          {item.leadText}{' '}
                          <span className={isActive ? 'text-[#0F68D6]' : 'text-black'}>
                            {item.highlightText}
                          </span>{' '}
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Mobile Horizontal Snap Scroll / Swipe Container */}
              <div className="flex lg:hidden flex-col gap-[14px] pt-[2px]">
                <div
                  ref={mobileScrollRef}
                  onScroll={handleMobileScroll}
                  className="flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar w-full"
                >
                  {productStatements.map((item) => (
                    <div key={item.id} className="w-full min-w-full snap-start pr-[8px]">
                      <p className="type-h6 text-black">
                        {item.leadText}{' '}
                        <span className="text-[#0F68D6]">
                          {item.highlightText}
                        </span>{' '}
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Carousel Indicators */}
                <div className="flex items-center gap-[5px] pt-[2px]">
                  {productStatements.map((_, idx) => {
                    const isActive = idx === activeMobileIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`Slide ${idx + 1}`}
                        onClick={() => scrollToMobileCard(idx)}
                        className={`h-[5px] rounded-[32px] transition-all duration-300 cursor-pointer border-none outline-none ${
                          isActive
                            ? 'w-[32px] bg-[#0F68D6]'
                            : idx === (activeMobileIndex + 1) % productStatements.length
                            ? 'w-[16px] bg-[#0F68D6]/10 hover:bg-[#0F68D6]/30'
                            : 'w-[6px] bg-[#0F68D6]/10 hover:bg-[#0F68D6]/30'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Subtle bottom gradient fade on desktop card */}
              <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-white/90 to-transparent pointer-events-none rounded-b-[8px]" />

            </div>

          </div>

          {/* Bottom Tagline Row (Frame 2147226481: 1320px x 64px) */}
          <div className="w-full flex flex-row items-start gap-[8px] lg:gap-[12px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#63CCB7] shrink-0 mt-[10px] lg:mt-[12px]" />
            <p className="type-h6 text-white flex-1 leading-normal">
              HIMER AI OS runs the cycle. CurieCode handles the coding.<br className="hidden lg:inline" /> Both stay accountable for what they deliver, and we don&apos;t bill until they&apos;re live.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowThatShowsUpSection;
