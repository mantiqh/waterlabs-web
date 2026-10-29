'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

export const DataSovereigntySection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const firstCard = carouselRef.current.children[0] as HTMLElement;
    const step = firstCard ? firstCard.offsetWidth + 16 : carouselRef.current.clientWidth;
    const index = Math.round(scrollLeft / step);
    setActiveCardIndex(Math.min(Math.max(index, 0), 1));
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index] as HTMLElement;
    if (card) {
      carouselRef.current.scrollTo({
        left: card.offsetLeft - carouselRef.current.offsetLeft,
        behavior: 'smooth',
      });
    }
    setActiveCardIndex(index);
  };

  return (
    <section
      id="data-sovereignty"
      className="relative m-0 w-full scroll-mt-[60px] overflow-hidden bg-gradient-to-b from-white from-50% to-[#000000] to-50% p-0"
    >
      {/* 
        Container matching 1440px grid:
        - Desktop: px-[32px] xl:px-[60px], py-[40px] lg:py-[80px]
        - Mobile: px-[20px], py-[24px]
        - Right curve: rounded-br-[30px] lg:rounded-br-[60px] exposing black background of Our Own Cloud below
      */}
      <div className="w-full overflow-hidden rounded-br-[30px] bg-white px-[20px] pt-[20px] pb-[40px] md:px-[40px] lg:rounded-br-[60px] lg:px-[60px] lg:pt-[40px] lg:pb-[80px]">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-[24px] lg:flex-row lg:gap-[40px]">
          {/* Invisible Spacer matching Left Sidebar width (305px) */}
          <div
            className="pointer-events-none hidden w-[305px] shrink-0 lg:block"
            aria-hidden="true"
          />

          {/* Main Right Content Column (Fluid responsive max 975px) */}
          <div className="flex w-full max-w-[975px] min-w-0 flex-col gap-0 lg:flex-1 lg:gap-[48px]">
            {/* 
              Top Feature Banner Card (Figma Frame 2147203214)
              - Mobile: 362px x 320px, font 24px / 32px, img_engineered_for_rigorous.png
              - Desktop: 975px x 381px, font 40px / 48px, img_Engineered_for_rigorous_scrutiny_by_your_security_team.png
              - Border Radius: 20px 10px 20px 20px
              - Padding: 20px (mobile) / 40px (desktop)
            */}
            <div className="relative isolate mb-[36px] flex h-[320px] w-full flex-col items-start justify-end overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-[#000000] p-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] sm:p-[28px] lg:mb-0 lg:h-[381px] lg:p-[40px]">
              {/* Desktop Fingerprint Graphic Background */}
              <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
                <Image
                  src="/images/trust-and-security/data-sovereignty/img_Engineered_for_rigorous_scrutiny_by_your_security_team.png"
                  alt="Fingerprint Security Analysis"
                  fill
                  priority
                  className="object-cover object-right"
                />
              </div>

              {/* Mobile Fingerprint Graphic Background */}
              <div className="pointer-events-none absolute inset-0 z-0 block sm:hidden">
                <Image
                  src="/images/trust-and-security/data-sovereignty/img_engineered_for_rigorous.png"
                  alt="Fingerprint Security Analysis Mobile"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Heading: Engineered for rigorous scrutiny by your security team */}
              <h2 className="type-h4 relative z-10 max-w-[895px] text-white">
                Engineered for rigorous scrutiny
                <br className="hidden sm:inline" /> by your security team.
              </h2>
            </div>

            {/* Intro Heading + Description (Figma Design) */}
            <div className="mb-[12px] flex flex-col gap-[12px] lg:mb-0 lg:gap-[16px]">
              <h3 className="type-h2 max-w-[720px] text-[#0F68D6]">
                Your data stays yours. We only borrow the work.
              </h3>
              <p className="type-body-xs max-w-[650px] text-[#111111]">
                Waterlabs has a Zero-storage, Zero-retention model.
                <br className="hidden sm:inline" />
                Our agent stack runs on private infrastructure.
              </p>
            </div>

            {/* =====================================================================
                DESKTOP: 2 Alternating Feature Cards (Figma Layout)
               ===================================================================== */}
            <div className="hidden w-full flex-col gap-[36px] lg:flex lg:gap-[48px]">
              {/* Feature Card 1: We keep the lesson, not the patient (Image on Left, Text on Right) */}
              <div className="flex flex-row items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="relative aspect-[420/290] w-full shrink-0 overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:w-[45%] xl:w-[420px]">
                  <Image
                    src="/images/trust-and-security/data-sovereignty/img_we_keep_the_lesson_not_the_patient.png"
                    alt="We keep the lesson, not the patient"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[12px] lg:gap-[14px]">
                  <h4 className="type-h5 text-[#042849]">
                    We keep the lesson,
                    <br />
                    not the patient
                  </h4>
                  <p className="type-body-xxs text-[#111111]">
                    An agent works a case the way a person would, holding only what that case needs,
                    only for as long as it takes. When the case closes, the patient&apos;s
                    information is gone. What stays is how the problem got solved, stripped of who
                    it happened to. The workflow compounds. The patient disappears.
                  </p>
                </div>
              </div>

              {/* Feature Card 2: Nothing to mishandle (Text on Left, Image on Right) */}
              <div className="flex flex-row-reverse items-center justify-between gap-[20px] lg:gap-[28px] xl:gap-[40px]">
                <div className="relative aspect-[420/290] w-full shrink-0 overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:w-[45%] xl:w-[420px]">
                  <Image
                    src="/images/trust-and-security/data-sovereignty/img_nothing_to_mishandle.png"
                    alt="Nothing to mishandle"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[12px] lg:gap-[14px]">
                  <h4 className="type-h5 text-[#042849]">Nothing to mishandle</h4>
                  <p className="type-body-xxs text-[#111111]">
                    Other vendors promise to guard your data carefully. That&apos;s only as good as
                    their worst day. Here, there is nothing to guard. Because nothing is extracted.
                    Our data safety standards are structural.
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================================
                MOBILE / TABLET: Horizontal Scrollable Cards with Dots Indicator
               ===================================================================== */}
            <div className="flex w-full flex-col gap-[16px] lg:hidden">
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="no-scrollbar flex w-full snap-x snap-mandatory flex-row gap-[16px] overflow-x-auto"
              >
                {/* Mobile Card 1 */}
                <div className="flex w-[calc(100%-28px)] min-w-[calc(100%-28px)] shrink-0 snap-start flex-col gap-[12px]">
                  <div className="relative aspect-[362/250] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <Image
                      src="/images/trust-and-security/data-sovereignty/img_we_keep_the_lesson_not_the_patient.png"
                      alt="We keep the lesson, not the patient"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="type-h5 text-[#0F68D6]">We keep the lesson, not the patient</h4>
                    <p className="type-body-xxs text-[#111111]">
                      An agent works a case the way a person would, holding only what that case
                      needs, only for as long as it takes. When the case closes, the patient&apos;s
                      information is gone. What stays is how the problem got solved, stripped of who
                      it happened to. The workflow compounds. The patient disappears.
                    </p>
                  </div>
                </div>

                {/* Mobile Card 2 */}
                <div className="flex w-[calc(100%-28px)] min-w-[calc(100%-28px)] shrink-0 snap-start flex-col gap-[12px]">
                  <div className="relative aspect-[362/250] w-full overflow-hidden rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] bg-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <Image
                      src="/images/trust-and-security/data-sovereignty/img_nothing_to_mishandle.png"
                      alt="Nothing to mishandle"
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="type-h5 text-[#0F68D6]">Nothing to mishandle</h4>
                    <p className="type-body-xxs text-[#111111]">
                      Other vendors promise to guard your data carefully. That&apos;s only as good
                      as their worst day. Here, there is nothing to guard. Because nothing is
                      extracted. Our data safety standards are structural.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex flex-row items-center gap-[6px] self-start pt-[4px]">
                {[0, 1].map((idx) => {
                  const isActive = activeCardIndex === idx;
                  return (
                    <button
                      key={`data-sovereignty-dot-${idx}`}
                      type="button"
                      aria-label={`Slide ${idx + 1}`}
                      onClick={() => scrollToCard(idx)}
                      className={`h-[6px] rounded-[32px] transition-all duration-300 ${
                        isActive
                          ? 'w-[32px] bg-[#0F68D6]'
                          : 'w-[16px] bg-[#0F68D6]/20 hover:bg-[#0F68D6]/40'
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

export default DataSovereigntySection;
