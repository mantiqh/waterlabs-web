'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const productStatements = [
  {
    id: 0,
    leadText: 'Because knowledge should remain within the organization,',
    highlightText: 'every resolved exception is recorded and retained.',
    description:
      'When a similar case arises, the agent is equipped with the necessary information.',
    desktopImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(2).png',
    mobileImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(2).png',
  },
  {
    id: 1,
    leadText: 'Since a managed problem is still a problem,',
    highlightText: 'our agents address all cases, not just the most recent.',
    description: 'Every denial is appealed, and every outstanding item is processed.',
    desktopImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(3).png',
    mobileImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(3).png',
  },
  {
    id: 2,
    leadText: 'Repetitive tasks are automated,',
    highlightText: 'while judgment calls are handled by your staff.',
    description:
      'When an agent encounters an unresolved issue, they escalate the case, providing a complete record of all attempted solutions.',
    desktopImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(3).png',
    mobileImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(3).png',
  },
  {
    id: 3,
    leadText: 'And because we think the risk should sit with us,',
    highlightText: 'there is no license fee and no charge for building the agents.',
    description: 'Billing starts once they are live and working.',
    desktopImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(3).png',
    mobileImage:
      '/images/philosophy/how-that-shows-up/img_because_knowledge_should_compound_the_system_keeps_every_exception_it%20resolves_For_good.%20(3).png',
  },
];

export const HowThatShowsUpSection = () => {
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Sync window scroll with desktop statements progress
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth < 1024 || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.7;
      const end = -rect.height * 0.3;
      const total = start - end;
      const current = start - rect.top;

      if (current > 0 && current < total) {
        const progress = Math.min(Math.max(current / total, 0), 1);
        const index = Math.min(
          Math.floor(progress * productStatements.length),
          productStatements.length - 1,
        );
        setActiveDesktopIndex(index);

        if (desktopScrollRef.current) {
          const container = desktopScrollRef.current;
          const items = container.children;
          if (items[index]) {
            const targetItem = items[index] as HTMLElement;
            container.scrollTo({
              top: targetItem.offsetTop - container.offsetTop,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Handle Desktop vertical scroll
  const handleDesktopScroll = () => {
    if (!desktopScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = desktopScrollRef.current;
    if (scrollHeight <= clientHeight) return;
    const scrollFraction = scrollTop / (scrollHeight - clientHeight);
    const index = Math.min(
      Math.max(Math.round(scrollFraction * (productStatements.length - 1)), 0),
      productStatements.length - 1,
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
    <section ref={sectionRef} className="relative m-0 w-full overflow-hidden bg-[#F4F6F9] p-0">
      {/* 
        Outer Container Card (Frame 2147203276 / top frame):
        - Desktop: 1440px x 764px, rounded-tr-[60px] rounded-br-[60px], padding: 80px 60px, gap: 40px
        - Mobile: 402px x 672px, rounded-tr-[30px] rounded-br-[30px], padding: 20px 20px 40px, gap: 20px
        - Background: linear-gradient(239.93deg, #63CCB7 21.64%, #0F68D6 94.97%)
      */}
      <div
        className="flex w-full flex-col gap-[20px] overflow-hidden rounded-tr-[30px] rounded-br-[30px] px-[20px] py-[32px] md:px-[40px] md:py-[60px] lg:gap-[24px] lg:rounded-tr-[60px] lg:rounded-br-[60px] lg:px-[60px] lg:py-[60px]"
        style={{
          background: 'linear-gradient(239.93deg, #63CCB7 21.64%, #0F68D6 94.97%)',
        }}
      >
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-[20px] lg:gap-[24px]">
          {/* Main Card with Background Image (Frame 2147203302: 1320px x 500px, 16px top-left radius to eliminate corner sliver) */}
          <div className="relative flex h-[580px] w-full flex-col justify-end overflow-hidden rounded-[16px_10px_20px_20px] sm:h-[640px] md:h-[700px] lg:!h-[500px] lg:max-h-[500px] lg:justify-start lg:rounded-[16px_16px_16px_8px]">
            {/* Background Image - Mobile & Tablet */}
            <div className="pointer-events-none absolute inset-0 lg:hidden">
              {productStatements.map((statement, idx) => (
                <div
                  key={`mobile-bg-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeMobileIndex === idx ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <Image
                    src={statement.mobileImage}
                    alt={`How That Shows Up Visual ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>

            {/* Background Image - Desktop */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              {productStatements.map((statement, idx) => (
                <div
                  key={`desktop-bg-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeDesktopIndex === idx ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <Image
                    src={statement.desktopImage}
                    alt={`How That Shows Up Visual ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    sizes="1320px"
                    className="object-cover object-[60%_center] xl:object-center"
                  />
                </div>
              ))}
            </div>

            {/* Glassmorphic Card (Frame 2147203299: 537px x 500px on desktop) */}
            <div className="relative z-10 flex h-auto w-full flex-col justify-between gap-[14px] overflow-hidden rounded-[16px_8px_20px_20px] bg-white/[0.90] p-[20px] shadow-sm backdrop-blur-[12px] sm:p-[24px] lg:h-[500px] lg:max-h-[500px] lg:w-[360px] lg:rounded-[16px_8px_16px_8px] lg:p-[32px_32px_0px] xl:w-[537px]">
              {/* Heading Block */}
              <div className="flex flex-col gap-[10px] lg:gap-[14px]">
                {/* Main Heading */}
                <h2 className="type-h2 text-black">
                  How That Shows Up
                  <br />
                  in the Product
                </h2>
              </div>

              {/* Desktop Progress Bar & Vertically Scrollable Statements */}
              <div className="relative hidden flex-row items-start gap-[24px] pt-[4px] lg:flex">
                {/* Vertical Progress Bar (3px x 183px) */}
                <div className="relative mt-[4px] h-[183px] w-[3px] shrink-0 overflow-hidden rounded-[12px] bg-[#7D8690]/40">
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
                  className="no-scrollbar flex h-[183px] flex-1 snap-y snap-mandatory flex-col gap-[20px] overflow-y-auto pr-[8px] pb-[48px] select-none"
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
                  {/* Bottom spacer so the last statement has clear breathing room and is not blurry when scrolled to the end */}
                  <div className="pointer-events-none h-[28px] shrink-0" aria-hidden="true" />
                </div>
              </div>

              {/* Mobile Horizontal Snap Scroll / Swipe Container */}
              <div className="flex flex-col gap-[14px] pt-[2px] lg:hidden">
                <div
                  ref={mobileScrollRef}
                  onScroll={handleMobileScroll}
                  className="no-scrollbar flex w-full snap-x snap-mandatory flex-row overflow-x-auto"
                >
                  {productStatements.map((item) => (
                    <div key={item.id} className="w-full min-w-full snap-start pr-[8px]">
                      <p className="type-h6 text-black">
                        {item.leadText} <span className="text-[#0F68D6]">{item.highlightText}</span>{' '}
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
                        className={`h-[5px] cursor-pointer rounded-[32px] border-none transition-all duration-300 outline-none ${
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
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 hidden h-[20px] rounded-b-[8px] bg-gradient-to-t from-white/40 to-transparent lg:block" />
            </div>
          </div>

          {/* Bottom Tagline Row (Frame 2147226481: 1320px x 64px) */}
          <div className="flex w-full flex-row items-start gap-[8px] lg:gap-[12px]">
            <div className="mt-[10px] h-[8px] w-[8px] shrink-0 rounded-full bg-[#63CCB7] lg:mt-[12px]" />
            <p className="type-h6 flex-1 leading-normal text-white">
              HIMER AI OS runs the cycle. CurieCode handles the coding.
              <br className="hidden lg:inline" /> Both stay accountable for what they deliver, and
              we don&apos;t bill until they&apos;re live.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowThatShowsUpSection;
